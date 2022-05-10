<template>
  <div id="hist" class="hist-home"></div>
</template>
<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      barChart:null,
      dialogData:[]
    };
  },
  mounted() {
    this.loadEcharts();
    this.dialogData=[
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
    loadEcharts() {
      var chartDom = document.getElementById("hist");
      this.barChart = echarts.init(chartDom);
      var option = {
        color: "#ffffff",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          top:10,
          textStyle: {
            color: '#fff',
            fontSize: 12
          },
        },
        dataZoom: {
          show: false,
          start: 0,
          end: 100
        },
        grid: {
          top:'35%',
          left: "3%",
          right: "4%",
          bottom: "5%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["一月", "二月", "三月", "四月","五月"],
            splitLine: {
              show: false //去掉网格线
            },
            axisLine: {
              lineStyle: {
                color: "#FFF"
              }
            },
            axisLabel: {
              textStyle: {
                color: "#FFF",
                fontSize:10
              }
            }
          }
        ],
        yAxis: [
          //y坐标 左边 右边
          {
            type: "value",
            scale: true,
            name: "户",
            max: 800,
            min: 0,
            splitLine: {
              show: false //去掉网格线
            },
            axisLine: {
              lineStyle: {
                color: "#FFF"
              }
            },
            axisLabel: {
              textStyle: {
                color: "#FFF"
              },
              fontSize:12
            }
          },
          {
            type: "value",
            scale: true,
            name: "%",
            max: 400,
            min: 0,
            splitLine: {
              show: false //去掉网格线
            },
            axisLine: {
              lineStyle: {
                color: "#FFF"
              }
            },
            axisLabel: {
              textStyle: {
                color: "#FFF",
                fontSize:10
              }
            }
          }
        ],
        series: [
          {
            name: "入住总数", //头部标题
            type: "bar", //柱状图
            // 特殊属性 ad 可让柱子叠加
            stack: "Ad",
            emphasis: {
              focus: "series"
            },
            label: {
              normal: {
                show: true,
                position:'inside',
              }
            }, 
            data: [220, 182, 291, 234, 200],
            itemStyle: {
              //坐标轴渐变颜色
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#0cf205" },
                { offset: 0.5, color: "#0ab41d" },
                { offset: 1, color: "#063f4a" }
              ]) 
            }
          },
          {
            name: "进农数", //头部标题
            type: "bar", //柱状图
            stack: "Ad",
            emphasis: {
              focus: "series"
            },
            label: {
              show: true, //开启显示
              position: 'top', //在上方显示
              textStyle: { //数值样式
                color: '#fff',
                fontSize: 12
              }
            },
            itemStyle: {
              //坐标轴渐变颜色
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#3364e7" },
                { offset: 0.5, color: "#2c56c7" },
                { offset: 1, color: "#13437b" }
              ])
            },
            data: [120, 132, 201, 134,300]
          },
          {
            name: "增速", //头部标题
            type: "line", //折线图
            emphasis: {
              focus: "series"
            },
            data: [20, 150, 400, 200,200],
            itemStyle: {
              color: "#88fee9"
            },
            label: {
              show: true, //开启显示
              position: 'inside', //在上方显示
              textStyle: { //数值样式
                color: '#000',
                fontSize: 12
              }
            },
          }
        ]
      };
      var that = this
      option && that.barChart.setOption(option);
      that.barChart.getZr().off('click');
      that.barChart.getZr().on('click', params => {
        let pointInPixel = [params.offsetX, params.offsetY]
        if (that.barChart.containPixel('grid', pointInPixel)) {
          let xIndex = that.barChart.convertFromPixel({ seriesIndex: 0 }, [params.offsetX, params.offsetY])[0]
          console.log(xIndex)
          that.openData(xIndex)
        }
      })
    },
    openData(xIndex){
			this.$parent.clickDialog(this.dialogData,'ruzhu',`月份电商入驻总数`,xIndex)
		}
  }
};
</script>

<style lang="scss" scoped>
.hist-home{
  width: 100%;
  height: 100%;
}
</style>

