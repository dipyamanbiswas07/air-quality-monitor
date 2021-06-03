export const GridHeaders = [
  {
    text: 'City',
    align: 'start',
    sortable: false,
    value: 'city',
  },
  {
    text: 'AQI',
    align: 'start',
    sortable: true,
    value: 'aqi',
  },
  {
    text: 'Timestamp',
    align: 'start',
    sortable: true,
    value: 'timestamp',
  },
];

export const WEBSOCKET_URL = 'wss://city-ws.herokuapp.com';

export function getColor(aqi: number) {
  if (aqi > 400) return 'red darken-4';
  if (aqi > 300) return 'red lighten-1';
  if (aqi > 200) return 'orange';
  if (aqi > 100) return 'yellow';
  if (aqi > 50) return 'green lighten-2';
  return 'green';
}
