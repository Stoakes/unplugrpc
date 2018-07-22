# UnplugRPC gateway

Expose your gRPC endpoints through a HTTP API.

## Install

```bash
npm install
npm start
```

## Usage

 1. Install the gateway
 2. Launch it
 3. Go to [http://localhost:8000](http://localhost:8000)

# cli

```
Usage: grpc-dynamic-gateway [options] DEFINITION.proto [DEFINITION2.proto...]

Options:
  -?, --help, -h    Show help                                          [boolean]
  --port, -p        The port to serve your JSON proxy on         [default: 8080]
  --grpc, -g        The host & port to connect to, where your gprc-server is
                    running                         [default: "localhost:50051"]
  -I, --include     Path to resolve imports from
  --ca              SSL CA cert for gRPC
  --key             SSL client key for gRPC
  --cert            SSL client certificate for gRPC
  --mountpoint, -m  URL to mount server on                        [default: "/"]
  --quiet, -q       Suppress logs                                      [boolean]
```
