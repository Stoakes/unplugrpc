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

## More documentation

1. [Tutorial](tutorial): Step by step UnplugRPC features discovery
2. [Usage](usage): How to use UnplugRPC with Docker, docker-compose, Kubernetes
3. [Postman integration](postman): How to use UnplugRPC as a gateway for Postman and test your gRPC endpoints with Postman
4. [API](api)
