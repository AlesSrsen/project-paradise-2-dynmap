'use client';

import useSWR from 'swr';
import { TDU2MapOptions } from '@/types/tdu2-map';
import { jsonFetcher } from '@/lib/utils';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import {
  useLeafletMapRef,
  usePlayerMarkersMapRef,
} from '@/components/map/providers/MapRefContextProvider';
import { PlayerApiData } from '@/types/api-data';
import { useState, useEffect } from 'react';

export function PlayerList({
  tduMap,
  className,
}: {
  tduMap: TDU2MapOptions;
  className?: string;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error, isLoading } = useSWR<PlayerApiData>(
    tduMap.api.url,
    jsonFetcher,
    {
      refreshInterval: 1000,
    }
  );

  const [playerNameTooltipOpen, setPlayerNameTooltipOpen] = useState<
    string | null
  >(null);

  const markersRef = usePlayerMarkersMapRef();
  const mapRef = useLeafletMapRef();

  const markers = markersRef?.current;
  const map = mapRef?.current;

  useEffect(() => {
    if (data) {
      for (const player of data.liveplayers) {
        if (markers) {
          const marker = markers.get(player.name);
          if (marker) {
            marker.on('popupopen', () => {
              setPlayerNameTooltipOpen(player.name);
            });
            marker.on('popupclose', () => {
              setPlayerNameTooltipOpen(null);
            });
          }
        }
      }
    }
    return () => {
      if (markers) {
        markers.forEach((marker) => {
          marker.off('popupopen');
          marker.off('popupclose');
        });
      }
    };
  });

  return (
    <div className={`${className ? className + ' ' : ''}bg-white rounded`}>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="py-2 px-2">
            Players: {!isLoading && data ? data.liveplayers.length : ''}
          </AccordionTrigger>
          {isLoading ? (
            <AccordionContent className="px-2">Loading...</AccordionContent>
          ) : (
            data &&
            data.liveplayers.map((player) => {
              return (
                <AccordionContent
                  key={player.name}
                  className={
                    'px-2' +
                    (playerNameTooltipOpen === player.name
                      ? ' bg-gray-200'
                      : '')
                  }
                  onClick={() => {
                    if (markers) {
                      const marker = markers.get(player.name);
                      if (marker && map) {
                        map.closePopup();
                        map.panTo(marker.getLatLng());
                        marker.openPopup();
                      }
                    }
                  }}
                >
                  {player.name}
                </AccordionContent>
              );
            })
          )}
        </AccordionItem>
      </Accordion>
    </div>
  );
}
