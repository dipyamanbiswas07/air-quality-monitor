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
      <city-view
        :filteredData="filteredData"
        :filteredCity="filteredCity"
        @backButtonClick="backButtonClick"
      ></city-view>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import WebsocketService from '../plugins/websocket';
import CityView from '../components/city-view.vue';
import { GridHeaders } from '../components/constants';

@Component({
  components: {
    CityView,
  },
})
export default class Home extends Vue {
  private items = [];

  private filteredCity = '';

  private headers=GridHeaders;

  get filteredData(): any {
    if (this.filteredCity !== '') {
      return this.items.find((x) => x.city === this.filteredCity);
    }
    return [];
  }

  get gridData(): any {
    const gridData = this.items.map((x) => ({
      city: x.city,
      aqi: x.metrics[0].aqi.toFixed(2),
      timestamp: x.metrics[0].timestamp,
    }));
    return gridData;
  }

  // eslint-disable-next-line class-methods-use-this
  created(): any {
    const ws: any = new WebsocketService();
    const connection = ws.initializeWebsocket('ws://city-ws.herokuapp.com');

    connection.onmessage = (event: any) => {
      // eslint-disable-next-line no-debugger
      const newData = JSON.parse(event.data).map((x) => ({
        ...x,
        timestamp: Date.now(),
      }));
      newData.forEach((item): void => {
        const cityAdded = this.items.find((x: any) => x.city === item.city);
        if (cityAdded) {
          cityAdded.metrics = [];
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

  backButtonClick(): void {
    this.filteredCity = '';
  }

  rowClick(val): void {
    // eslint-disable-next-line no-debugger
    this.filteredCity = val.city;
  }
}
</script>
