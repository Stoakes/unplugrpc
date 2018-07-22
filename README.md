# UnplugRPC

UnplugRPC is a tool to expose your gRPC endpoints through an HTTP API, making theim more accessible. It has no production purpose, but is suited for manual manipulation or tests of a gRPC service. It can be used as Postman for gRPC.

## Install

```bash
# Assuming NodeJs is installed
git clone https://github.com/Stoakes/unplugrpc.git
cd unplugrpc/gateway
npm install
npm run build
npm start
```

## Electron app

## Docker image

Coming later on.

## Licence

## Credits

Some of the gateway code is inspired from [konsumer/grpc-dynamic-gateway](https://github.com/konsumer/grpc-dynamic-gateway), which is a re-implementation of [grpc-gateway](https://github.com/grpc-ecosystem/grpc-gateway) in NodeJS.

UI template is [creativetimofficial/light-bootstrap-dashboard-react](https://github.com/creativetimofficial/light-bootstrap-dashboard-react).
