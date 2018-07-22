'use strict'

const requiredGrpc = require('grpc')
const express = require('express')
const colors = require('chalk')
const fs = require('fs')
const schema = require('protocol-buffers-schema')
const colorize = require('json-colorizer')

/**
 * generate middleware to proxy to gRPC defined by proto files
 * @param  {string[]} protoFiles Filenames of protobuf-file
 * @param  {string} grpcLocation HOST:PORT of gRPC server
 * @param  {ChannelCredentials}  gRPC credential context (default: grpc.credentials.createInsecure())
 * @param  {string} include      Path to find all includes
 * @return {Function}            Middleware
 */
const middleware = (protoFiles, grpcLocation, credentials = requiredGrpc.credentials.createInsecure(), debug = true, include, grpc = requiredGrpc) => {
  const router = express.Router()
  const clients = {}
 
  // remove include path from path
  const protos = protoFiles.map(p => include !== undefined ? 
    /*protoLoader.loadSync(p, {includeDirs: [include] }) :*/ grpc.load(p) :grpc.load(p))
  
  protoFiles
    .map(p => `${p}`)
    .map(p => schema.parse(fs.readFileSync(p)))
    .forEach((sch, index) => {
      const pkg = sch.package
      if (!sch.services) { return }
      sch.services.forEach(s => {
        const svc = s.name
        clients[pkg+'.'+svc] = new (protos[index][pkg])[svc](grpcLocation, credentials)

        // Map each method to POST <pkg_name>.<service_name>/<method_name>
        s.methods.forEach(m => {
          const url = '/'+pkg+'.'+svc+'/'+m.name;
          if (debug) {
              console.log(colors.green('POST'), colors.blue(url))
          }
          router.post(url, (req, res) => httpHandler(req, res, clients, pkg, svc, m, url, debug))
        })
      })
    })
  return router
}

/**
 * Logic transforming an incoming http request to a gRPC call
 * @param {*} req 
 * @param {*} res 
 * @param {*} clients 
 * @param {*} pkg 
 * @param {*} svc 
 * @param {*} m 
 * @param {*} url 
 * @param {*} debug 
 */
const httpHandler = (req, res, clients, pkg, svc, m, url, debug) => {
  const params = convertParams(req, url)
  if (debug) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    console.log(`GATEWAY: ${colors.yellow((new Date()).toISOString())} (${colors.cyan(ip)}):/${colors.blue(pkg.replace(/\./g, colors.white('.')))}.${colors.blue(svc)}/${colors.cyan(m.name)}(${colorize(params)})`)
  }

  try {
    clients[pkg+'.'+svc][m.name](params, {}, (err, ans) => {
      if (err) {
        console.error(colors.red(`${svc}.${m.name}`, err.message))
        console.trace()
        return res.status(500).json({ code: err.code, message: err.message })
      }
      res.json(convertBody(ans))
    })
  } catch (err) {
    console.error(colors.red(`${svc}.${m.name}: `, err.message))
    console.trace()
    res.json({error: err.message})
  }
}

/**
 * Parse express request params & query into params for grpc client
 * @param  {Request} req Express request object
 * @param  {string} url  gRPC url field (ie "/v1/hi/{name}")
 * @return {Object}      params for gRPC client
 */
const convertParams = (req, url) => {
  const gparams = getParamsList(url)
  const out = req.body
  gparams.forEach(p => {
    if (req.query && req.query[p]) {
      out[p] = req.query[p]
    }
    if (req.params && req.params[p]) {
      out[p] = req.params[p]
    }
  })
  return out
}

/**
 * Convert gRPC response to output, based on gRPC body field
 * @param  {Object} value   gRPC response object
 * @param  {string} bodyMap gRPC body field
 * @return {mixed}          mapped output for `res.send()`
 */
const convertBody = (value, bodyMap) => {
  bodyMap = bodyMap || '*'
  if (bodyMap === '*') {
    return value
  } else {
    return value[bodyMap]
  }
}

// interface
module.exports = middleware
module.exports.convertParams = convertParams
module.exports.convertBody = convertBody
module.exports.getParamsList = getParamsList
