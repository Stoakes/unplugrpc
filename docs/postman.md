# Postman integration

Postman is . The purpose of the UnplugRPC UI is to provide a quick way to interact with gRPC endpoints, not to provide as many features as Postman does.

However, by using UnplugRPC as a gateway/proxy, you can interact with your gRPC endpoints with Postman.

## UnplugRPC as a gateway

1.  Open Postman
2.  Upload all your protofiles or copy them to the UnplugRPC protofolder and launch UnplugRPC with the `refresh option` (coming soon).
3.  A gRPC method `method` of the service `service` in the package `package` can be used by doing a POST query to the url `http://localhost:8000/package.service/method` and passing the host through the `X-Host` header.
4.  Set `Content-Type: 'application/json'`
5.  Submit and check the result.

If you are dealing with a client-side streaming method, encapsulate your objects into an array. They will be send by UnplugRPC gateway as a stream of objects.
