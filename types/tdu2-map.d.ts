export interface TDU2MapConfig {
  maxBounds: [number, number];
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
