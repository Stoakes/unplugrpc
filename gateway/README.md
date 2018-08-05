# UnplugRPC gateway

Expose your gRPC endpoints through a HTTP API.

## Install

```bash
npm install
cp data/db.json.dist data/db.json
npm run build
npm start
```

## Usage

 1. Install the gateway
 2. Launch it
 3. Go to [http://localhost:8000](http://localhost:8000)


**CLI**

```
Usage: gateway [options]

Options:
  -?, --help, -h    Show help                                          [boolean]
  --port, -p        The port to serve your JSON proxy on         [default: 8080]
  -I, --include     Path to resolve imports from
  --quiet, -q       Suppress logs                                      [boolean]
```

## Development

Here is a list of helpers during the development:

 1. `npm run test` Launch jest tests
 2. `npm run lint` Launch linter
 3. `npm run lint-fix` Fix linter errors (when possible)
 4. `npm run watch` Launch watcher which will compile files to `dist` folder when a file is changed.
 5. `npm run dev` Launch the server with CORS accepted, useful on development when using the UI on another port.

To develop on the gateway:
```bash
# Compile the UI once
npm run build:ui
npm run watch
# Do your things, when ready, in another terminal:
npm run dev
```