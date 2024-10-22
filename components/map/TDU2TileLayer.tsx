'use client';

import { TileLayer, useMap } from 'react-leaflet';
import { RasterCoords } from 'leaflet';
import * as L from 'leaflet';

import 'leaflet-rastercoords';

import MiniMap from 'leaflet-minimap';
import 'leaflet-minimap/dist/Control.MiniMap.min.css';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { useEffect } from 'react';
import { TDU2MapOptions } from '@/types/tdu2-map';

export const TDU2TileLayer = ({ tduMap }: { tduMap: TDU2MapOptions }) => {
  const map = useMap();
  const tduMapInfo = tduMap.map;

  const img = tduMapInfo.maxBounds;

  const rc = new RasterCoords(map, img, 256, false);

  useEffect(() => {
    const largeMapBounds = rc.getMaxBounds();
    const paddedBounds = largeMapBounds.pad(1);
    map.setMaxBounds(paddedBounds);
    map.setMaxZoom(8);
    map.setView(rc.unproject([img[0] / 2, img[1] / 2]));

    const tdu2MiniMapTileLayer = new L.TileLayer(tduMapInfo.url, {
      minZoom: 0,
      maxZoom: tduMapInfo.maxZoom,
      bounds: rc.getMaxBounds(),
    });
    const miniMapOptions: L.MapOptions = {
      minZoom: 0,
      maxZoom: tduMapInfo.maxZoom,
      // maxBounds: paddedBounds,
    };
    const miniMap = new MiniMap(tdu2MiniMapTileLayer, {
      toggleDisplay: true,
      mapOptions: miniMapOptions,
    }).addTo(map);

    return () => {
      miniMap.remove();
    };
  });

  return <TileLayer bounds={rc.getMaxBounds()} url={tduMapInfo.url} />;
};
