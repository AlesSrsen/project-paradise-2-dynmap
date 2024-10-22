import { TDU2Maps } from "@/types/tdu2-map";

export const TDU2_MAPS: TDU2Maps = {
  ibiza: {
    map: {
      maxBounds: [6912, 5817],
      maxZoom: 8,
      minZoom: 0,
      url: process.env.MAP_IBIZA_MAP_URL ?? '/img/map/ibiza/tiles/{z}/{x}/{y}.png',
      minimap: {
        minZoom: 0,
      },
    },
    api: {
      url:  process.env.MAP_IBIZA_API_URL,
    },
  },
  hawaii: {
    map: {
      maxBounds: [11264, 9216],
      maxZoom: 8,
      minZoom: 0,
      url: process.env.MAP_HAWAII_MAP_URL ?? '/img/map/hawaii/tiles/{z}/{x}/{y}.png',
      minimap: {
        minZoom: 0,
      },
    },
    api: {
      url: process.env.MAP_HAWAII_API_URL,
    },
  },
};

export const MAP_SCALE = 6;