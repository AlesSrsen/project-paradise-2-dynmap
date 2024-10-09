import { MAP_SCALE } from "../constants";

export function scaleApiMapPosition(x: number, z: number): [number, number] {
  return [x/MAP_SCALE, z/MAP_SCALE]
}