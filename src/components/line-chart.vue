<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Line } from 'vue-chartjs';
import {
  Component, Prop, Watch, Mixins,
} from 'vue-property-decorator';

@Component
export default class LineChart extends Mixins(Line) {
    @Prop() chartData: any;

    private options = {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        line: {
          tension: 0.2,
        },
      },
      tooltips: {
        titleFontSize: 10,
        bodyFontSize: 10,
      },
    };

    @Watch('chartData') ondatachange() {
      // eslint-disable-next-line no-underscore-dangle
      this.$data._chart.destroy();
      this.renderChart(this.chartData, this.options);
    }

    mounted() {
      // renderChart function renders the chart with the datacollection and options object.
      this.renderChart(this.chartData, this.options);
    }
}
</script>
