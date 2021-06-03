<template>
  <div>
    <div class="d-flex justify-space-between">
      <v-btn @click="backButton" class="ma-2">Go back</v-btn
      ><v-btn @click="clearData" class="ma-2">Clear Data</v-btn>
    </div>
    <div class="d-flex justify-space-between">
      <h3 class="ma-2">Hello, you selected {{ filteredCity }}</h3>
      <div>
        <!-- eslint-disable max-len -->
        <v-icon
          class="px-2 cp"
          :class="typeSelected === 'table' ? 'active' : ''"
          @click="toggleClicked('table')"
        >
          mdi-table</v-icon
        >
        <v-icon
          class="px-2 cp"
          :class="typeSelected === 'chart' ? 'active' : ''"
          @click="toggleClicked('chart')"
        >
          mdi-chart-line</v-icon
        >
      </div>
    </div>
    <v-data-table
      v-if="typeSelected == 'table'"
      :headers="headers"
      :items="filteredGridData"
      class="elevation-1"
      calculate-widths
      :disable-pagination="true"
      hide-default-footer
      ><template v-slot:[`item.aqi`]="{ item }">
        <v-chip :color="getColor(item.aqi)">
          {{ item.aqi }}
        </v-chip>
      </template></v-data-table
    >
    <div v-else><line-chart :chart-data="chartData"></line-chart></div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
// eslint-disable-next-line import/no-named-default
import { default as dayjs } from 'dayjs';
import { GridHeaders, getColor } from './constants';
import LineChart from './line-chart.vue';

@Component({ components: { LineChart } })
export default class CityView extends Vue {
  @Prop() filteredData;

  @Prop() filteredCity;

  private typeSelected = 'table';

  private headers = GridHeaders;

  private getColor = getColor;

  get filteredGridData(): any {
    return this.filteredData.map((x) => ({
      city: this.filteredCity,
      aqi: x.aqi.toFixed(2),
      timestamp: dayjs(parseFloat(x.timestamp)).format('DD MM YYYY hh:mm:ss a'),
    }));
  }

  get chartData():any {
    const labels = this.filteredData.map((x) => dayjs(parseFloat(x.timestamp)).format('DD MM YYYY hh:mm:ss a'));
    const data = this.filteredData.map((x) => x.aqi.toFixed(2));
    const datasets = [];
    datasets.push({
      label: 'AQI Data',
      // Data to be represented on y-axis
      data,
    });
    const datacollection = {
      // Data to be represented on x-axis
      labels,
      datasets,
    };
    return datacollection;
  }

  backButton(): any {
    this.$emit('backButtonClick');
  }

  clearData(): void {
    localStorage.removeItem(this.filteredCity);
  }

  toggleClicked(type: string): void {
    this.typeSelected = type;
  }
}
</script>
<style lang="sass" scoped>
.cp
    cursor: pointer

.active
    color: blue
</style>
