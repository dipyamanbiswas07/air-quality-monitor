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
    sortable: false,
    value: 'timestamp',
  },
];

export const websocketURL = 'ws://city-ws.herokuapp.com';
