'use client';

import { RasterCoords } from 'leaflet';
import { Popup, useMap } from 'react-leaflet';

import 'leaflet-rastercoords';

import { scaleApiMapPosition } from '@/lib/map/utils';
import { jsonFetcher } from '@/lib/utils';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';
import { LayerGroup, Marker as ReactMarker } from 'react-leaflet';
import useSWR from 'swr';
import { TDU2MapOptions } from '@/types/tdu2-map';
import { useSetPlayerMarkersMapRef } from './providers/MapRefContextProvider';
import { PlayerApiData } from '@/types/api-data';

export const TDU2PlayerLayerGroup = ({
  tduMap,
}: {
  tduMap: TDU2MapOptions;
}) => {
  const {
    data: playerApiData,
    error,
    isLoading,
  } = useSWR<PlayerApiData>(tduMap.api.url, jsonFetcher, {
    refreshInterval: 1000,
  });

  const playerMarkers = useSetPlayerMarkersMapRef();

  const map = useMap();

  const tduMapInfo = tduMap.map;

  const img = tduMapInfo.maxBounds;

  const rc = new RasterCoords(map, img, undefined, false);

  // TODO: Extract the logic regarding Marker refs into useSetPlayerMarkersMapRef
  // Unset markers which don't belong to any players
  if (playerApiData) {
    const playerNames = playerApiData!.liveplayers.map((player) => player.name);
    playerMarkers.current.forEach((marker, key) => {
      if (!playerNames.includes(key)) {
        playerMarkers.current.delete(key);
      }
    });
  }

  return (
    !error &&
    !isLoading &&
    playerApiData && (
      <LayerGroup>
        {playerApiData &&
          playerApiData.liveplayers.map((player) => {
            return (
              <ReactMarker
                position={rc.unproject(scaleApiMapPosition(player.x, player.z))}
                key={player.name}
                ref={(marker) => {
                  // TODO: Extract the logic regarding Marker refs into useSetPlayerMarkersMapRef
                  if (marker) playerMarkers.current.set(player.name, marker);
                }}
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
              </ReactMarker>
            );
          })}
      </LayerGroup>
    )
  );
};
