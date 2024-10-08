# docker build . -t project-paradise-2-tiling:latest
# docker run --rm -it -v ./public:/app/images project-paradise-2-tiling /bin/bash
FROM ubuntu:24.04

RUN : && \
  apt-get update && \
  DEBIAN_FRONTEND=noninteractive TZ=Etc/UTC apt-get install -y --no-install-recommends wget tzdata python3.12 python3-gdal && \
  :

RUN mkdir /app
WORKDIR /app

RUN : && \
  wget --no-check-certificate https://github.com/commenthol/gdal2tiles-leaflet/raw/refs/heads/master/gdal2tiles.py && \
  wget --no-check-certificate https://github.com/commenthol/gdal2tiles-leaflet/raw/refs/heads/master/gdal2tiles-multiprocess.py && \
  :

ENTRYPOINT [ ]

# # ibiza
# mkdir -p images/ibiza/tiles
# python3 gdal2tiles-multiprocess.py -l -p raster -z 0-8 -w none images/ibiza/ibiza.png images/ibiza/tiles

# # hawaii
# mkdir -p images/hawaii/tiles
# python3 gdal2tiles-multiprocess.py -l -p raster -z 0-8 -w none images/hawaii/hawaii.png images/hawaii/tiles
