'use client';

import { Map as LeafletMap, Marker } from 'leaflet';
import {
  useContext,
  createContext,
  useState,
  ReactNode,
  MutableRefObject,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useCallback,
} from 'react';

type MapContextState = {
  playerMarkersMapRef: MutableRefObject<Map<string, Marker>> | undefined;
  mapRef: MutableRefObject<LeafletMap | null> | undefined;
};

type MapContextValue = {
  state: MapContextState;
  setState: Dispatch<SetStateAction<MapContextState>>;
};

const mapContextInitialValue: MapContextValue = {
  state: { playerMarkersMapRef: undefined, mapRef: undefined },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setState: (state: SetStateAction<MapContextState>) => {}, // NOOP default callback
};

const MapRefContext = createContext(mapContextInitialValue);

export const MapContextProvider = ({ children }: { children: ReactNode }) => {
  const [mapContextState, setMapContextState] = useState(
    mapContextInitialValue.state
  );

  return (
    <MapRefContext.Provider
      value={{ state: mapContextState, setState: setMapContextState }}
    >
      {children}
    </MapRefContext.Provider>
  );
};

const useMapRef = () => {
  return useContext(MapRefContext);
};

export const useSetPlayerMarkersMapRef = () => {
  const { setState } = useMapRef();
  const playerMarkersMapRef = useRef<Map<string, Marker>>(new Map());

  useEffect(() => {
    setState((prev) => ({ ...prev, playerMarkersMapRef }));
  }, [setState]);

  return playerMarkersMapRef;
};

export const usePlayerMarkersMapRef = () => {
  const { state } = useMapRef();
  return state.playerMarkersMapRef;
};

export const useSetLeafletMapRef = () => {
  const { setState } = useMapRef();
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    console.debug('Setting mapRef', mapRef);
  }, [mapRef, setState]);

  return useCallback(
    (node: LeafletMap | null) => {
      if (node !== null) {
        mapRef.current = node;
        if (mapRef && mapRef.current) {
          setState((prev) => ({ ...prev, mapRef }));
        }
      }
    },
    [mapRef, setState]
  );
};

export const useLeafletMapRef = () => {
  const { state } = useMapRef();
  return state.mapRef;
};
