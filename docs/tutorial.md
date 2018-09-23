# Tutorial

[Introduction](#introduction)
[Basic gRPC calls](#basic-grpc-calls)
[Protofiles with imports](#protofiles-with-imports)

## Introduction

This tutorial will guide you through UnplugRPC features. It assumes that UnplungRPC is already installed and running.

## Basic gRPC calls

Let's start a small gRPC service and interact with it.

**1. Setup the route guide**

As example server, we will just re-use the [route guide service](https://grpc.io/docs/tutorials/basic/node.html) provided by grpc.io.

```bash
git clone -b v1.15.0 https://github.com/grpc/grpc
cd grpc/examples/node
npm install
node ./dynamic_codegen/route_guide/route_guide_server.js --db_path=./dynamic_codegen/route_guide/route_guide_db.json
```

You are now having a gRPC server up and running on port 50051.

**2. Add the host to UnplugRPC**

What UnplugRPC call _Host_ is a DNS name (or an IP) and a port on which a gRPC service is listening.

To add an host to UnplugRPC:

1. Open UnplugRPC and navigate to the _Hosts_ tab.
2. Create one Host with `host`: `localhost` and `port`: `50051`.

Once submitted, a success notification should appear at the right-top and corner.

**3. Add route_guide.proto to UnplugRPC**

UnplugRPC can interact with services which interface is available. To do so, store service protofile in UnplugRPC.

1. Browse to the _Add Protofile_ tab.
2. Fill `path` input with `route.proto`. This `path` value is where the file will be stored in the proto root folder.
3. Copy the [route guide protofile from Github](https://github.com/grpc/grpc/blob/v1.15.0/examples/protos/route_guide.proto)
4. Paste it in the `Protofile content` field.

Once submitted a success notification should appear.

**4. Simple RPC call**

Let's now use the route guide service. Browse to the _Use_ tab.

1. Select the host on which the service is running: `localhost:50051`.
2. Select the package you want to use: `routeguide`.
3. Select a service and a method to be called: `GetFeatures`.
4. On the left, the method expected request should appear, and an object skeleton on the right.
5. For a given latitude and longitude `GetFeature` returns if there is a point of interest at this point.
   Try with:

   ```
   {"latitude": 409146138, "longitude": -746188906}
   ```

6. The response should appear at the bottom of the page
7. You can retry it with: (which should not return any object)

   ```
   {"latitude": 0, "longitude": 0}
   ```

**5. Server streaming**

Let's now interact with the `ListFeatures` method, which for a given rectangle returns a stream of all feature included in that rectangle.

Try it with:

```
{ "lo": { "latitude": 400000000, "longitude": -750000000 },
"hi": { "latitude": 420000000, "longitude": -730000000 } }
```

When the response is a stream, it is **displayed** as an array of object.

**6. Client streaming**

UnplugRPC supports client streaming if you represent the request as an array of object. The UI will send it in one shot to the gateway, which will then stream each object of the array to the server, in the same order as the array.
Let's interact with the `RecordRoute` which returns some stats about a stream of points.

1. Select `RecordRoute` in the method.
2. Send:
   ```
   [
   { "latitude": 477482524, "longitude": -33702448 },
   { "latitude": 48117266, "longitude": -16777925 },
   { "latitude": 48856614, "longitude": 23522219 },
   { "latitude": 48135125, "longitude": 11581980 },
   { "latitude": 43604652, "longitude": 14442090 }
   ]
   ```

**7. Bi-directionnal streaming**

Not supported by UnplugRPC, which is why the `RouteChat` method is not available.

## Protofile with imports

**1. Introduction**

Let's say that we have the following service, importing Duration object from Google's definition, an annotated with gRPC-Gateway annotations:

```proto3
syntax = "proto3";

package timer;

import "google/api/annotations.proto";
import "google/protobuf/duration.proto";

service Timer {

  rpc addLap (LapRequest) returns (LapResponse) {
    option (google.api.http) = {
      post: "/get"
      body: "*"
    };
  };
}


message LapRequest {
  string userId=1;
  google.protobuf.Duration lapTime = 2;
}

message LapResponse {
  string message=1;
}
```

**2. Making it work**

1.  Add the protofile as you did in the previous part of the tutorial.
2.  UnplugRPC is not aware of the Duration object and will fail with `no such Type or Enum 'google.protobuf.Duration' in Type .time.LapRequest`.
3.  The solution is to add any required import before the file importing them.
4.  Add Duration.proto to UnplugRPC:
    1. Browse to _Add Protofile_ tab
    2. Fill `path` input with `google/protobuf/duration.proto`.
       It is critical to give a path matching the import, otherwise the import won't work.
    3. Copy and paste the content from [google/protobuf/duration.proto](https://github.com/protocolbuffers/protobuf/blob/master/src/google/protobuf/duration.proto)
       in the `Protofile content` field
    4. Submit, and a green notification should appear
    5. Submit the `timer.proto` again. This time it should succeed.

**Note:** ProtobufJs (which is used to parse `.proto` files), contains some of the most frequently used.
Therefore you will not need to import them. This is especially useful for `grpc-gateway` style protofile.

More details in [dcodeIO/protobuf.js](https://github.com/dcodeIO/protobuf.js/tree/master/google) repository.
