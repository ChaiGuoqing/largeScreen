<template>
  <div id="myMap" class="myMap"></div>
</template>
<script>
import "./wordCloud/myMap"; //引入注册地图的js
let myChartMap = null; //地图
export default {
  data() {
    return {
      optionMap: {
        geo: {
          map: "海北藏族自治州",
          roam: true,
          zoom: 1.2,
          scaleLimit: {
            //缩放级别限制
            min: 1,
            // max: 12
          },
          aspectScale: 0.9, //地图的长宽比
          itemStyle: {
            borderWidth: 2,
            borderColor: "rgb(19, 250, 219)", //边框颜色
            areaColor: "#2a5582", //地图区域颜色
            shadowColor: "#fff",
            shadowOffsetX: 0,
            shadowOffsetY: 14,
          },
          label: {
            color: "#fff",
            fontWeight: "bold",
            show: true,
          },
          emphasis: {
            itemStyle: {
              show: "true",
              borderWidth: 4,
              borderColor: "rgb(19, 250, 219)", //边框颜色
              areaColor: "rgb(19, 184, 250)", //鼠标移上去的颜色
            },
            label: {
              color: "#fff",
              fontWeight: "bold",
              show: true,
            },
          },
        },
      },
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
    myChartMap = this.$echarts.init(document.getElementById("myMap"));
      myChartMap.setOption(this.optionMap);
      window.addEventListener("resize", () => {
        myChartMap.resize();
      });
    },
  },
};
</script>
<style scoped>
.myMap {
  width: 100%;
  height: 100%;
}
</style>
