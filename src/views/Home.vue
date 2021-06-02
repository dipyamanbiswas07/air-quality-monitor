<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="gridData"
      :items-per-page="15"
      class="elevation-1"
      calculate-widths
      :disable-pagination="true"
      hide-default-footer
    ></v-data-table>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  private items = [];

  private headers = [
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

  get gridData(): any {
    const gridData = this.items.map((x) => ({
      city: x.city,
      aqi: x.metrics[x.metrics.length - 1].aqi.toFixed(2),
      timestamp: x.metrics[x.metrics.length - 1].timestamp,
    }));
    return gridData;
  }

  created() {
    const connection = new WebSocket('ws://city-ws.herokuapp.com');
    connection.onmessage = (event: any) => {
      // eslint-disable-next-line no-debugger
      const newData = JSON.parse(event.data).map((x) => ({
        ...x,
        timestamp: Date.now(),
      }));
      newData.forEach((item): void => {
        const cityAdded = this.items.find((x: any) => x.city === item.city);
        if (cityAdded) {
          cityAdded.metrics.push({ aqi: item.aqi, timestamp: item.timestamp });
        } else {
          this.items.push({
            city: item.city,
            metrics: [{ aqi: item.aqi, timestamp: item.timestamp }],
          });
        }
      });
    };
  }
}
</script>
