<template>
  <div ref="line_ref" class="line-home"></div>
</template>

<script>
export default {
  data(){
    return{
      chartInstance:null,
      saleData:[]
    }
  },
  mounted() {
    this.updateChart();
    this.saleData=[
      [
        {address:'刚察',sales:'251',upYoy:'2.1%',upChain:'10%'},
        {address:'祁连',sales:'239',upYoy:'11%',upChain:' 12%'},
        {address:'门源',sales:'269',upYoy:'2.8%',upChain:' 8%'},
        {address:'海晏',sales:'289',upYoy:'3.6%',upChain:'11%'},
      ],
      [
        {address:'刚察',sales:'260',upYoy:'2.3%',upChain:'8%'},
        {address:'祁连',sales:'209',upYoy:'10%',upChain:'15%'},
        {address:'门源',sales:'359',upYoy:'4.1%',upChain:'12%'},
        {address:'海晏',sales:'389',upYoy:'5.1%',upChain:'16%'},
      ],
      [
        {address:'刚察',sales:'201',upYoy:'1.5%',upChain:'8%'},
        {address:'祁连',sales:'199',upYoy:'10%',upChain:'13%'},
        {address:'门源',sales:'369',upYoy:'4.2%',upChain:'13%'},
        {address:'海晏',sales:'289',upYoy:'3.6%',upChain:'9%'},
      ],
      [
        {address:'刚察',sales:'241',upYoy:'3.1%',upChain:'11%'},
        {address:'祁连',sales:'339',upYoy:'13%',upChain:'13%'},
        {address:'门源',sales:'469',upYoy:'5%',upChain:'18%'},
        {address:'海晏',sales:'279',upYoy:'3.5%',upChain:'8%'},
      ]
    ]
  },
  methods: {
    updateChart() {
      this.chartInstance = this.$echarts.init(this.$refs.line_ref);
      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          textStyle: {
            color: '#fff',
          },
          top:10,
          data: ["销售额", "订单量"],
        },
        grid: {
          top: "24%",
          left: "4%",
          right: "6%",
          bottom: "5%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLabel: {
              textStyle: {
                color: "#FFF"
              },
              fontSize:10
            },
            data: ["1月", "2月", "3月", "4月"],
          },
        ],
        yAxis: [
          {
            type: "value",
            offset:5 ,
            axisTick: {
              show: false,  //刻度线
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                color: "#FFF",
                fontSize:10
              }
            }
          },
        ],
        series: [
          {
            name: "销售额",
            type: "line",
            showAllSymbol: true,
            symbol: 'circle',
            symbolSize: 5,
            lineStyle: {
              color: '#e8dd00'
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#fff',
                fontSize:10
              }
            },
            itemStyle: {
              color: '#e8dd00',
              borderColor: '#e8dd00',
              borderWidth: 2
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(255, 218, 0, 0.3)',
                    },{
                      offset: 1,
                      color: 'rgba(255, 218, 0, 0)',
                    },
                  ],
                  false
                ),
              },
            },
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134],
          },
          {
            name: "订单量",
            type: "line",
            showAllSymbol: true,
            symbol: 'circle',
            symbolSize: 5,
            lineStyle: {
              color: '#09b91a'
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#fff',
                fontSize:10
              }
            },
            itemStyle: {
              color: '#09b91a',
              borderColor: '#09b91a',
              borderWidth: 2
            },
            areaStyle: {
               normal: {
                  color: new this.$echarts.graphic.LinearGradient(
                    0, 0,  0, 1,
                    [
                      {
                        offset: 0,
                        color: 'rgba(12,255,0,0.3)',
                      },{
                        offset: 1,
                        color: 'rgba(12,255,0,0)',
                      },
                    ],
                    false
                  ),
                },
            },
            emphasis: {
              focus: "series",
            },
            data: [220, 182, 191, 234],
          }
        ],
      };
      this.chartInstance.setOption(option);
      var that = this
      that.chartInstance.getZr().off('click');
      that.chartInstance.getZr().on('click', function (params) {
        const pointInPixel = [params.offsetX, params.offsetY]
        // 判断给定的点是否在指定的坐标系或者系列上
        if ( that.chartInstance.containPixel('grid', pointInPixel)) {
          // 获取到点击的 x轴 下标  转换为逻辑坐标
          const xIndex =  that.chartInstance.convertFromPixel({ seriesIndex: 0 }, pointInPixel)[0]
          that.openData(xIndex)
        }
      });
    },
    openData(xIndex){
			this.$parent.clickDialog(this.saleData,'dingdan',`月份海北州电商销售额`,xIndex)
		}
  },
};
</script>

<style lang='scss'>
.line-home{
    width: 100%;
    height: 100%;
}
</style>