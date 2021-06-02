<template>
  <div>
    <v-btn @click="backButton" class="ma-2">Go back</v-btn>
    <h3 class="ma-2">Hello, you selected {{ filteredCity }}</h3>
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
// eslint-disable-next-line import/no-named-default
import { default as dayjs } from 'dayjs';
import { GridHeaders } from './constants';

@Component
export default class CityView extends Vue {
  @Prop() filteredData;

  @Prop() filteredCity;

  private headers= GridHeaders;

  get filteredGridData(): any {
    const filteredItems = JSON.parse(localStorage.getItem(this.filteredCity)) || [];
    // eslint-disable-next-line no-debugger
    return filteredItems.map((x) => ({
      city: this.filteredCity,
      aqi: x.aqi.toFixed(2),
      timestamp: dayjs(parseFloat(x.timestamp)).fromNow(),
    }));
  }

  backButton(): any {
    this.$emit('backButtonClick');
  }
}
</script>
