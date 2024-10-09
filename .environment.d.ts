declare namespace NodeJS {
  export interface ProcessEnv {
    readonly MAP_IBIZA_API_URL: string;
    readonly MAP_IBIZA_MAP_URL: string;

    readonly MAP_HAWAII_API_URL: string;
    readonly MAP_HAWAII_MAP_URL: string;
  }
}