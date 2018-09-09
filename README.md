# UnplugRPC

[![Travis-ci status](https://travis-ci.org/Stoakes/unplugrpc.svg?branch=master)](https://travis-ci.org/Stoakes/unplugrpc)
[![Licence](https://img.shields.io/badge/Licence-GNU%20AGPL%20v3-red.svg)](LICENCE)

UnplugRPC is a gateway to expose your gRPC endpoints through an HTTP API, making them more accessible.
It has no production purpose, but is suited for manual manipulation or tests of gRPC services.

With its user interface UnplugRPC can be used as a small Postman for gRPC.
If you are looking for all the Postman features, see the doc for more details about UnplugRPC API.

## Install

```bash
# Assuming NodeJs 8 and Yarn are installed
git clone https://github.com/Stoakes/unplugrpc.git
cd unplugrpc/gateway
npm install
npm run build
npm start
```

[Detailled installation available in the documentation](docs)

## Docker image

```bash
docker run -p 8000:8000 stoakes/unplugrpc
# Then open your browser at http://localhost:8000
```

## Run on Kubernetes cluster

```bash
# Assuming you what you are doing
kubectl run unplugrpc --image stoakes/unplugrpc:latest --port 8000
kubectl expose deployment unplugrpc --type NodePort --port 8000
# Find which port is assigned to unplugrpc service
kubectl get service
# Visit unplugrpc at http://[EXTERNAL_IP]:[NODE_PORT]
```

## Credits

Some of the gateway code is inspired from [konsumer/grpc-dynamic-gateway](https://github.com/konsumer/grpc-dynamic-gateway), which is a re-implementation of [grpc-gateway](https://github.com/grpc-ecosystem/grpc-gateway) in NodeJS.

UI template is [creativetimofficial/light-bootstrap-dashboard-react](https://github.com/creativetimofficial/light-bootstrap-dashboard-react).
