# Usages

## Docker usage

```bash
docker run -p 8000:8000 stoakes/unplugrpc
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
