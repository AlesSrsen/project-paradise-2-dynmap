export interface TDU2MapConfig {
  x: number;
  y: number;
  getCoords: () => [number, number];
  maxZoom: number;
  minZoom: number;
  url: string;
  minimap: {
    minZoom: number;
  };
}

export interface ApiConfig {
  url?: string;
}

export interface TDU2MapOptions {
  map: TDU2MapConfig;
  api: ApiConfig;
}

export interface TDU2Maps {
  ibiza: TDU2MapOptions;
  hawaii: TDU2MapOptions;
}

export const TDU2_MAPS: TDU2Maps = {
  ibiza: {
    map: {
      x: 6912,
      y: 5817,
      getCoords: () => [TDU2_MAPS.ibiza.map.x, TDU2_MAPS.ibiza.map.y],
      maxZoom: 8,
      minZoom: 0,
      url: process.env.NEXT_PUBLIC_MAP_IBIZA_MAP_URL ?? '/img/map/ibiza/tiles/{z}/{x}/{y}.png',
      minimap: {
        minZoom: 0,
      },
    },
    api: {
      url:  process.env.NEXT_PUBLIC_MAP_IBIZA_API_URL,
    },
  },
  hawaii: {
    map: {
      x: 11264,
      y: 9216,
      getCoords: () => [TDU2_MAPS.hawaii.map.x, TDU2_MAPS.hawaii.map.y],
      maxZoom: 8,
      minZoom: 0,
      url: process.env.NEXT_PUBLIC_MAP_HAWAII_MAP_URL ?? '/img/map/hawaii/tiles/{z}/{x}/{y}.png',
      minimap: {
        minZoom: 0,
      },
    },
    api: {
      url: process.env.NEXT_PUBLIC_MAP_HAWAII_API_URL,
    },
  },
};

export const MAP_SCALE = 6;