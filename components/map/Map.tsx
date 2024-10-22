'use client';

import { CRS } from 'leaflet';
import { MapContainer } from 'react-leaflet';

import { TDU2PlayerLayerGroup } from './TDU2PlayerLayerGroup';
import { TDU2TileLayer } from './TDU2TileLayer';

import { TDU2MapOptions } from '@/types/tdu2-map';

import 'leaflet-rastercoords';

import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';

import './css/map.css';
import { useSetLeafletMapRef } from './providers/MapRefContextProvider';

const Map = ({ tduMap }: { tduMap: TDU2MapOptions }) => {
  const mapRef = useSetLeafletMapRef();

  return (
    <MapContainer
      crs={CRS.Simple}
      center={[0, 0]}
      zoom={3}
      scrollWheelZoom={true}
      id="tdu-leaflet-map"
      attributionControl={false}
      ref={mapRef}
    >
      <TDU2TileLayer tduMap={tduMap} />
      <TDU2PlayerLayerGroup tduMap={tduMap} />
    </MapContainer>
  );
};

export default Map;
