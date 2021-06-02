<template>
  <div>
    <table>
      <tr>
        <th>City</th>
        <th>AQI</th>
        <th>Timestamp</th>
      </tr>
      <tr v-for="item in gridData" :key="item.city">
        <td>{{ item.city }}</td>
        <td>{{ item.data.aqi.toFixed(2) }}</td>
        <td>{{ item.data.timestamp }}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  private items = [];

  get gridData(): any {
    const gridData = this.items.map((x) => ({
      city: x.city,
      data: x.metrics[x.metrics.length - 1],
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
