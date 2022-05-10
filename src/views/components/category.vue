<template>
  <div class="category">
    <div class="cont">
      <p>{{title}}</p>
      <div ref="category" class="category"></div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    title:{
      type:String,
      default:null
    },
    sumNum:{
      type:Number,
      default:100
    },
    successNum:{
      type:Array,
      default:[10,100]
    },
    strColor:{
      type:String,
      default:'#014ff5'
    },
    endColor:{
      type:String,
      default:'#1394fb'
    }
  },
  data() {
    return {
      categoryChart:null
    };
  },
  mounted() {
    this.loadAAAss();
  },
  methods: {
    loadAAAss() {
      var that = this
      that.categoryChart = that.$echarts.init(this.$refs.category);
      var option = {
        // tooltip: {
        //   formatter: function (params) {
        //     if(!params.value[0]) return
        //       return params.value[0] + '~' + params.value[1];
        //   }
        // },
        grid: {
          top:'6%',
          left: '-7%',
          right: '6%',
          bottom: '2%',
          containLabel: true,
        },
        xAxis: {
          max: that.sumNum,
          type: 'value',
          boundaryGap: [0, 0.01],
          boundaryGap: true,
          data:10,
          minorTick: {
            show: true,
            length: 6,
            lineStyle: {
              width: 2,
              color: '#4E7490'
            },
            splitNumber: 5
          },
          axisLabel: {
            show: true,
            inside: false,
            margin: 15,
            color: '#fff'
          },
          axisTick: {
            show: true,
            length: 10,
            inside: false,
            lineStyle: {
              width: 2,
              color: '#fff'
            }
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          position: "top",
          offset: -10
        },
        yAxis: {
          type: 'category',
          data: ['数量'],
          show: false
        },
        series: [
          {
            name: '背景',
            type: 'bar',
            barWidth: 10,
            barGap: '-100%',
            data: [this.sumNum, this.sumNum],
            itemStyle: {
              color: 'rgba(29, 57, 101, 0.8)',
              borderWidth: 1,
              barBorderRadius: [10, 10, 10, 10],
            },
        },{
          zlevel: 1,
            type: 'custom',
            renderItem: function(params, api) {
              var start = api.coord([api.value(0), 0])
              var end = api.coord([api.value(1), 0])
              var height = 10
              let rectShape = that.$echarts.graphic.clipRectByRect({
                  x: start[0],
                  y: start[1] - height / 2,
                  width: end[0] - start[0],
                  height: height
                }, {
                  x: params.coordSys.x,
                  y: params.coordSys.y,
                  width: params.coordSys.width,
                  height: params.coordSys.height,
                })
              if(rectShape){
                rectShape.r=[10]
              }
              return {
                type: 'rect',
                shape: rectShape,
                style: api.style()
              }
            },
            data: [
              {
                itemStyle: {
                  normal:{
                    borderCap:"round",//线段末端为圆形
                    color: new that.$echarts.graphic.LinearGradient(
                      0, 0, 1, 0,
                      [
                        { offset: 0, color: that.strColor },
                        { offset: 1, color: that.endColor }
                      ]
                    )
                  }
                },
                name: '',
                value: this.successNum
              }
            ]
          }]
      };
      that.categoryChart.setOption(option);
    },
  },
};
</script>

<style lang='scss' scode>
.category {
  width: 100%;
  height: 100%;
  .cont{
    width: 100%;
    height: 100%;
    p{
      font-size: 18px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #FFFFFF;
    }
  }
}
</style>

