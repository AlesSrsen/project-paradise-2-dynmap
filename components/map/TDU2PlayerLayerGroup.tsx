'use client';

import { RasterCoords } from 'leaflet';
import { Popup, useMap } from 'react-leaflet';

import 'leaflet-rastercoords';

import { scaleApiMapPosition } from '@/lib/map/utils';
import { jsonFetcher } from '@/lib/utils';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';
import { LayerGroup, Marker } from 'react-leaflet';
import useSWR from 'swr';
import { TDU2MapOptions } from '@/lib/constants';

interface PlayerApiData {
  liveplayers: [
    {
      name: string;
      x: number;
      z: number;
    }
  ];
}

export const TDU2PlayerLayerGroup = ({
  tduMap,
}: {
  tduMap: TDU2MapOptions;
}) => {
  const { data, error, isLoading } = useSWR(tduMap.api.url, jsonFetcher, {
    refreshInterval: 1000,
  });

  const map = useMap();
  const tduMapInfo = tduMap.map;

  const img = tduMapInfo.maxBounds;

  const rc = new RasterCoords(map, img);

  const playerApiData: PlayerApiData = data;
  return (
    !error &&
    !isLoading && (
      <LayerGroup>
        {playerApiData &&
          playerApiData.liveplayers.map((player) => {
            return (
              <Marker
                position={rc.unproject(scaleApiMapPosition(player.x, player.z))}
                key={player.name}
              >
                <Popup>
                  <div>
                    <b>Name: </b> {player.name}
                    <br />
                    <b>x: </b> {player.x}
                    <br />
                    <b>z: </b> {player.z}
                  </div>
                </Popup>
              </Marker>
            );
          })}
      </LayerGroup>
    )
  );
};
