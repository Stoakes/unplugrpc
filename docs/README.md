# UnplugRPC documentation

## Install & use locally

1. Install NodeJs 8.10 or newer.
   On Linux & OS X, the easier is probably to use [nvm](https://github.com/creationix/nvm).
2. Install [Yarn package manager](https://yarnpkg.com/docs/install/)
3. Dependency are ready, run the following script:

   ```bash
   git clone https://github.com/Stoakes/unplugrpc.git
   cd unplugrpc/gateway
   npm install
   npm run build
   npm start
   ```

4. UnplugRPC is ready. Browse to [http://localhost:8000](http://localhost:8000).
5. If you are more interested by using UnplugRPC as a gateway,
   have a look at [Postman integration](postman) or [UnplugRPC API](api).

**Looking for more ?** Let's setup a small gRPC service and use it through UnplugRPC.

Assuming you have Golang installed.

1. Install gRPC `go get google.golang.org/grpc`
2. Launch its route guide server: `cd $GOPATH/src/google.golang.org/grpc/examples/route_guide && go run server/server.go &`
3. Open UnplugRPC and navigate to the _Hosts_ tab.
4. Create one Host, with `host`: `localhost` and `port`: `10000`. Submit, and a success notification should appear
   at the right-top and corner.
5. Navigate to the _Add Protofile_ tab.
6. Fill `path` text input with `route.proto`. This `path` value is mostly important when a protofile is included by another, which is not the case here.
7. Copy the [route guide protofile from Github](https://github.com/grpc/grpc-go/blob/master/examples/route_guide/routeguide/route_guide.proto) and paste it in the
   `Protofile content` field.
8. Submit the form, a success notification should appear.
9. Navigate to the _Use_ tab.
10. Select the host you previously created.
11. Select the package you want to use; in our case the `routeguide` package.
12. Select a service and a method. (`RouteChat` method is not available because UnplugRPC does not support bi-directionnal methods yet.)
13. Based on the request object, create your own request and submit it. The result should appear at the bottom of the page.

**Examples**

_Copied from grpc.io_

- `routeguide.RouteGuide/GetFeatures`: Simple RPC: Return the feature of a point.

  ```
  {"latitude": 409146138, "longitude": -746188906}
  ```

- `routeguide.RouteGuide/ListFeatures`: Server streaming: Return features between 40, -75 and 42, -73.

  ```
  { "lo": { "latitude": 400000000, "longitude": -750000000 },
    "hi": { "latitude": 420000000, "longitude": -730000000 } }
  ```

- `routeguide.RouteGuide/RecordRoute`: Client streaming: Return the distance and features visited of a route.

  ```
  [
    { "latitude": 477482524, "longitude": -33702448 },
    { "latitude": 48117266, "longitude": -16777925 },
    { "latitude": 48856614, "longitude": 23522219 },
    { "latitude": 48135125, "longitude": 11581980 },
    { "latitude": 43604652, "longitude": 14442090 }
  ]
  ```

## Features

## More documentation

1. [Usage](usage): How to use UnplugRPC with Docker, docker-compose, Kubernetes
2. [Postman integration](postman): How to use UnplugRPC as a gateway for Postman and test your gRPC endpoints with Postman
3. [API](api)
