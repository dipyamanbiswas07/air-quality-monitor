<template>
  <div>
    <v-btn @click="backButton" class="ma-2">Go back</v-btn>
    <div>Hello you selected {{ filteredCity }}</div>
    <v-data-table
      :headers="headers"
      :items="filteredGridData"
      class="elevation-1"
      calculate-widths
      :disable-pagination="true"
      hide-default-footer
    ></v-data-table>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { GridHeaders } from './constants';

@Component
export default class CityView extends Vue {
  @Prop() filteredData;

  @Prop() filteredCity;

  private headers= GridHeaders;

  get filteredGridData(): any {
    // eslint-disable-next-line no-debugger
    debugger;
    return this.filteredData.metrics.map((x) => ({
      city: this.filteredCity,
      aqi: x.aqi.toFixed(2),
      timestamp: x.timestamp,
    }));
  }

  backButton(): any {
    this.$emit('backButtonClick');
  }
}
</script>
