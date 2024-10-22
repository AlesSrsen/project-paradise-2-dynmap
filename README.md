# Project Paradise 2 Dynmap

This project implements a public API exposed by the Project Paradise 2 servers, to show the position of the players on the map.

## Development

For development it is necessary to use CORS proxy, since the API server has origin only for itself.

First launch the CORS proxy:

```bash
docker compose up -d
```

Then start the Next.js project:

```bash
# Install dependencies if not installed yet
npm i
# Run the development server
npm run dev
```

## Deployment

Deployment is done using Docker Image. You can build and push the image with the following command:

```bash
docker build --platform linux/amd64 -t alessrsen/project-paradise-2-dynmap:latest -t "alessrsen/project-paradise-2-dynmap:$(git rev-parse --short=8 HEAD)" .
docker push --all-tags alessrsen/project-paradise-2-dynmap
```

Sync public files to the server

```bash
rsync -arv public [ssh-host]:[path]/project-paradise-2-dynmap
```

> [!NOTE]  
> Public files are not in this repository, they will be made available to download once I find free hosting for the images.

Public files should be cached - for caching use definition in `devops/nginx/npm.nginx.conf`

`docker-compose.yaml` with CORS proxy is prepared in `devops/delpoyment/docker-compose.yaml`