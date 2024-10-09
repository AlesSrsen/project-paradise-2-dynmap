import * as L from 'leaflet';

export const carIcon = L.icon({
  iconUrl: '/img/map/assets/car.png',
  iconSize:     [80, 80], // size of the icon
  // shadowSize:   [0,0], // size of the shadow
  iconAnchor:   [40, 40], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});