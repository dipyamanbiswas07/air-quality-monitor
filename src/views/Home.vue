/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
<template>
  <v-container>
    <v-data-table
      v-if="filteredCity === ''"
      :headers="headers"
      :items="gridData"
      class="elevation-1"
      calculate-widths
      :disable-pagination="true"
      hide-default-footer
      @click:row="rowClick"
    ></v-data-table>
    <div v-else>
      <v-btn @click="backButton">Go back</v-btn>
      <span>Hello you selected {{ filteredCity }}</span>
      <v-data-table
        :headers="headers"
        :items="filteredGridData"
        class="elevation-1"
        calculate-widths
        :disable-pagination="true"
        hide-default-footer
        @click:row="rowClick"
      ></v-data-table>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  private items = [];

  private filteredCity = '';

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

  get filteredData(): any {
    if (this.filteredCity !== '') {
      return this.items.find((x) => x.city === this.filteredCity);
    }
    return [];
  }

  get filteredGridData(): any {
    return this.filteredData.metrics.map((x) => ({
      city: this.filteredCity,
      ...x,
    }));
  }

  get gridData(): any {
    const gridData = this.items.map((x) => ({
      city: x.city,
      aqi: x.metrics[x.metrics.length - 1].aqi.toFixed(2),
      timestamp: x.metrics[x.metrics.length - 1].timestamp,
    }));
    return gridData;
  }

  created(): any {
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

  // eslint-disable-next-line class-methods-use-this
  rowClick(val): void {
    // eslint-disable-next-line no-debugger
    this.filteredCity = val.city;
  }

  backButton(): void {
    this.filteredCity = '';
  }
}
</script>
