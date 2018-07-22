#!/usr/bin/env node
'use strict'

const fs = require('fs')
const grpcGateway = require('./src/gateway.js')
const yargs = require('yargs')
const express = require('express')
const bodyParser = require('body-parser')
const grpc = require('grpc')
const path = require('path');

const argv = yargs.usage('Usage: $0 [options]')
  .help('?')
  .alias('?', 'help')
  .alias('?', 'h')

  .default('port', process.env.PORT || 8000)
  .describe('port', 'The port to serve your JSON proxy on')
  .alias('port', 'p')

  .default('grpc', process.env.GRPC_HOST || 'localhost:50051')
  .describe('grpc', 'The host & port to connect to, where your gprc-server is running')
  .alias('grpc', 'g')

  .describe('I', 'Path to resolve imports from')
  .alias('I', 'include')

  .describe('ca', 'SSL CA cert for gRPC')
  .describe('key', 'SSL client key for gRPC')
  .describe('cert', 'SSL client certificate for gRPC')

  .boolean('quiet')
  .describe('quiet', 'Suppress logs')
  .alias('quiet', 'q')
  .argv

let credentials
if (argv.ca || argv.key || argv.cert) {
  if (!(argv.ca && argv.key && argv.cert)) {
    console.log('SSL requires --ca, --key, & --cert\n')
    yargs.showHelp()
    process.exit(1)
  }
  credentials = grpc.credentials.createSsl(
    fs.readFileSync(argv.ca),
    fs.readFileSync(argv.key),
    fs.readFileSync(argv.cert)
  )
} else {
  credentials = grpc.credentials.createInsecure()
}

// Protofiles folder checks: existence, and preload existing files
const protofilesPath = path.dirname(__filename)+"/protofiles/"
const readFolder = (path) => {
  let files = [];
  fs.readdirSync(path).forEach(file => {
    if(file.endsWith('.proto')) {
      files.push(path+''+file);
    }
  });
  return files;
}
// Include path check
let includePath = undefined
if (argv.include !== undefined) {
  if(argv.include.endsWith('/')) {
    argv.include = argv.include.substring(0, argv.include.length - 1) // remove"/"
  }
  includePath = process.cwd()+'/'+argv.include;
  if(!fs.existsSync(includePath)){
    console.log('Path '+includePath+' does not exist.')
    process.exit(1)
  }
}

// Build gateway with existing files
let router = grpcGateway(readFolder(protofilesPath), argv.grpc, credentials, !argv.quiet, includePath)

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api', router)
app.post('/new', (req, res) => { // API point to add a new proto file.
    if(!req.hasOwnProperty('protoName') || !req.hasOwnProperty('proto')) {
      res.status(400)
      res.json({error: 'Some properties are missing'});
      return; 
    }
    fs.writeFile(+req.body.protoName, req.body.proto, function(err) {
    if(err) {
      console.log(err);
      res.send('error')
    }
    console.log("The file "+path.dirname(__filename)+"/protofiles/"+req.body.protoName+" was saved!");
    // drop routes, and reload them. yeah!
    app._router.stack = [];
    app.use(grpcGateway(readFolder(protofilesPath), argv.grpc, credentials, !argv.quiet))
    res.send('ok')
  }); 
})
app.use('/',express.static('build'));

app.listen(argv.port, () => {
  if (!argv.quiet) {
    console.log(`Listening on http://localhost:${argv.port}, proxying to gRPC on ${argv.grpc}`)
  }
})

