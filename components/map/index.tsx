'use client';

import { CRS } from 'leaflet';
import { MapContainer } from 'react-leaflet';

import { TDU2PlayerLayerGroup } from './TDU2PlayerLayerGroup';
import { TDU2TileLayer } from './TDU2TileLayer';

import { TDU2_MAPS } from '@/lib/constants';

import 'leaflet-rastercoords';

import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';

import './css/map.css';

const Map = ({ gameMap }: { gameMap: 'ibiza' | 'hawaii' }) => {
  const tduMap = TDU2_MAPS[gameMap];

  return (
    <MapContainer
      crs={CRS.Simple}
      center={[0, 0]}
      zoom={3}
      scrollWheelZoom={true}
      id="tdu-leaflet-map"
      attributionControl={false}
    >
      <TDU2TileLayer tduMap={tduMap} />
      <TDU2PlayerLayerGroup tduMap={tduMap} />
    </MapContainer>
  );
};

export default Map;
