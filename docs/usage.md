# Usages

## Docker usage

```bash
docker run -p 8000:8000 stoakes/unplugrpc
```

### Docker with mounted proto files

One way to add your protofiles to UnplugRPC is to use the API and send your protofiles content.
However, in case of multiple proto files, this task can become cumbersome.

To make protofile loading easier, UnplugRPC comes with two command line options to load files directly from the `data/protoFolder` directory. Thus, you only need to copy your protofiles in the protoFolder and restart the gateway with `--load-proto` or `--load-once` options.

With docker mount a folder containing your protofiles on `/app/data/protoFolder` and start unplugrpc with the
`--load-proto` (or `--load-once` if you wan this action to be performed only if database is empty).

```bash
docker run -p 8000:8000 -v <path/of_protos/on_host>:/app/data/protoFolder stoakes/unplugrpc npm start -- --load-proto
```

## Docker-compose usage

```yaml
# docker-compose.yaml
version: "2"

services:
  web:
    image: stoakes/unplugrpc
    ports:
      - 8000:8000
```

## Kubernetes usage

```bash
# Assuming you what you are doing
kubectl run unplugrpc --image stoakes/unplugrpc:latest --port 8000
kubectl expose deployment unplugrpc --type NodePort --port 8000
# Find which port is assigned to unplugrpc service
kubectl get service
# Visit unplugrpc at http://[EXTERNAL_IP]:[NODE_PORT]
```
