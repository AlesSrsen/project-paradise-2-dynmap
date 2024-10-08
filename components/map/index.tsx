'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { LatLngExpression, LatLngTuple, CRS, RasterCoords } from 'leaflet';
import * as L from 'leaflet';

import 'leaflet-rastercoords';
import MiniMap from 'leaflet-minimap';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { useEffect } from 'react';

import './index.css';

interface MapProps {
  posix: LatLngExpression | LatLngTuple;
  zoom?: number;
}

const TDU2_MAPS = {
  hawaii: {
    x: 11264,
    y: 9216,
    getCoords: () => [TDU2_MAPS.hawaii.x, TDU2_MAPS.hawaii.y],
    maxZoom: 8,
    minZoom: 0,
    url: '/hawaii/tiles/{z}/{x}/{y}.png',
    minimap: {
      minZoom: 0,
    },
  },
  ibiza: {
    x: 6912,
    y: 5817,
    getCoords: () => [TDU2_MAPS.ibiza.x, TDU2_MAPS.ibiza.y],
    maxZoom: 8,
    minZoom: 0,
    url: '/ibiza/tiles/{z}/{x}/{y}.png',
    minimap: {
      minZoom: 0,
    },
  },
};

const defaults = {
  zoom: 2,
};

const MyMapInfo = () => {
  const map = useMap();

  useEffect(() => {
    map.on('click', (event) => {
      console.log(event.latlng);
    });

    return () => {
      map.off();
    };
  }, [map]);

  return null;
};

const TDU2TileLayer = () => {
  const map = useMap();
  const tduMap = TDU2_MAPS.hawaii;

  const img = tduMap.getCoords();

  const rc = new RasterCoords(map, img);

  useEffect(() => {
    const tdu2MiniMapTileLayer = new L.TileLayer(tduMap.url, {
      minZoom: 0,
      maxZoom: tduMap.maxZoom,
      bounds: rc.getMaxBounds(),
    });
    const miniMapOptions: L.MapOptions = {};
    const miniMap = new MiniMap(tdu2MiniMapTileLayer, {
      toggleDisplay: true,
      mapOptions: miniMapOptions,
    }).addTo(map);

    map.setMaxBounds(rc.getMaxBounds());
    map.setMaxZoom(8);
    map.setView(rc.unproject([img[0] / 2, img[1] / 2]));

    return () => {
      miniMap.remove();
    };
  });

  return <TileLayer bounds={rc.getMaxBounds()} url={tduMap.url} />;
};

const Map = (Map: MapProps) => {
  const { zoom = defaults.zoom, posix } = Map;

  return (
    <MapContainer
      crs={CRS.Simple}
      center={[0, 0]}
      zoom={zoom}
      scrollWheelZoom={true}
      id="tdu-leaflet-map"
      attributionControl={false}
    >
      {/* <MyMapInfo /> */}
      <TDU2TileLayer />
      <Marker position={[0, 0]} draggable={false}>
        <Popup>Hey ! I study here</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
