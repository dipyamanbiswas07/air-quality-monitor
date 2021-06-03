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
      ><template v-slot:item.aqi="{ item }">
        <v-chip :color="getColor(item.aqi)">
          {{ item.aqi }}
        </v-chip>
      </template></v-data-table
    >
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
// eslint-disable-next-line import/no-named-default
import { default as dayjs } from 'dayjs';
import WebsocketService from '../plugins/websocket';
import CityView from '../components/city-view.vue';
import { GridHeaders, getColor } from '../components/constants';

@Component({
  components: {
    CityView,
  },
})
export default class Home extends Vue {
  private items = [];

  private filteredCity = '';

  private filteredData = [];

  private headers = GridHeaders;

  private getColor = getColor;

  get gridData(): any {
    const gridData = this.items.map((x) => ({
      city: x.city,
      aqi: x.metrics[0].aqi.toFixed(2),
      timestamp: dayjs(parseFloat(x.metrics[0].timestamp)).fromNow(),
    }));
    return gridData;
  }

  setStorage(item): void {
    const metrics = { aqi: item.aqi, timestamp: item.timestamp };
    const currentData = JSON.parse(localStorage.getItem(item.city)) || [];
    currentData.push(metrics);
    localStorage.setItem(item.city, JSON.stringify(currentData));
    if (item.city === this.filteredCity) {
      this.filteredData = currentData;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  created(): any {
    const ws: any = new WebsocketService();
    const connection = ws.initializeWebsocket('wss://city-ws.herokuapp.com');

    connection.onmessage = (event: any) => {
      // eslint-disable-next-line no-debugger
      const newData = JSON.parse(event.data).map((x) => ({
        ...x,
        timestamp: Date.now(),
      }));
      newData.forEach((item): void => {
        const cityAdded = this.items.find((x: any) => x.city === item.city);
        const metrics = { aqi: item.aqi, timestamp: item.timestamp };
        this.setStorage(item);

        if (cityAdded) {
          cityAdded.metrics = [];
          cityAdded.metrics.push(metrics);
        } else {
          this.items.push({
            city: item.city,
            metrics: [metrics],
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
    this.filteredData = JSON.parse(localStorage.getItem(val.city)) || [];
  }
}
</script>
