<template>
  <!-- 仪表盘 -->
  <div class="meter-home" ref="meter_ref" ></div>
</template>
<script>
export default {
  data() {
    return {
      chart:null,
      expressData:[]
    };
  },
  mounted() {
    this.initChart();
    this.expressData=[
      {name:'祁连县',value:[
        {address:'玉石类',sales:'469',upYoy:'2.1%',upChain:'10%'},
        {address:'畜牧肉类',sales:'258',upYoy:'3.1%',upChain:'19%'},
        {address:'酒类',sales:'274',upYoy:'5%',upChain:'14%'},
        {address:'菌菇类',sales:'200',upYoy:'10%',upChain:'12%'},
        {address:'奶制品',sales:'200',upYoy:'10%',upChain:'12%'},
        {address:'食品保健类',sales:'200',upYoy:'10%',upChain:'12%'},
        {address:'其它',sales:'69',upYoy:'7%',upChain:'7%'}
      ]},{
        name:'门源回族自治县',value:[
        {address:'玉石类',sales:'469',upYoy:'2.1%',upChain:'10%'},
        {address:'畜牧肉类',sales:'258',upYoy:'3.1%',upChain:'19%'},
        {address:'酒类',sales:'274',upYoy:'5%',upChain:'14%'},
        {address:'菌菇类',sales:'200',upYoy:'10%',upChain:'12%'},
        {address:'奶制品',sales:'200',upYoy:'10%',upChain:'12%'},
        {address:'食品保健类',sales:'200',upYoy:'10%',upChain:'12%'},
        {address:'其它',sales:'69',upYoy:'7%',upChain:'7%'}
      ]},{
        name:'刚察县',value:[
        {address:'玉石类',sales:'469',upYoy:'2.1%',upChain:'10%'},
        {address:'畜牧肉类',sales:'258',upYoy:'3.1%',upChain:'19%'},
        {address:'酒类',sales:'274',upYoy:'5%',upChain:'14%'},
        {address:'菌菇类',sales:'200',upYoy:'10%',upChain:'12%'},
        {address:'奶制品',sales:'200',upYoy:'10%',upChain:'12%'},
        {address:'食品保健类',sales:'200',upYoy:'10%',upChain:'12%'},
        {address:'其它',sales:'69',upYoy:'7%',upChain:'7%'}
      ]},{
        name:'海晏县',value:[
        {address:'玉石类',sales:'469',upYoy:'2.1%',upChain:'10%'},
        {address:'畜牧肉类',sales:'258',upYoy:'3.1%',upChain:'19%'},
        {address:'酒类',sales:'274',upYoy:'5%',upChain:'14%'},
        {address:'菌菇类',sales:'200',upYoy:'10%',upChain:'12%'},
        {address:'奶制品',sales:'200',upYoy:'10%',upChain:'12%'},
        {address:'食品保健类',sales:'200',upYoy:'10%',upChain:'12%'},
        {address:'其它',sales:'69',upYoy:'7%',upChain:'7%'}
      ]},
    ]
  },
  methods: {
    // 初始化
    initChart() {
      this.chart = this.$echarts.init(this.$refs.meter_ref);
      const legendData = ['祁连县','门源回族自治县','刚察县','海晏县']; //图例
      let splitColor='#30586c';
      var option =  {
        color:['#396afc','#ffda00','#0cff00','#A48BEB'],
        tooltip: {
          show: false // 弹层数据去掉
        },
        legend: {
          top: 14,
          padding:0,
          itemGap: 10, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
          textStyle: {
            fontSize: 10,
            color: '#fff',
          },
          icon:'rect',
          itemWidth:10,
          itemHeight:10,
          data:legendData
        },
        radar: {
          center: ['48%', '55%'], // 外圆的位置
          radius: '55%',
          name: {
            textStyle: {
              color: '#fff',
              fontSize: 10,
              fontFamily: 'PingFangSC-Regular,PingFang SC',
              fontStyle: 'normal',
            }
          },
          // TODO:
          indicator: [
            { text: "畜牧肉类", max: 200 },
            { text: "玉石类", max: 200 },
            { text: "酒类", max: 200 },
            { text: "菌菇类", max: 200 },
            { text: "食品保健类", max: 200 },
            { text: "奶制品", max: 200 },
            { text: "其他", max: 200 },
          ],
          splitArea: {
            // 坐标轴在 grid 区域中的分隔区域，默认不显示。
            show: true,
            areaStyle: {
              // 分隔区域的样式设置。
              color: ['rgba(0,0,0,0)'] // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
            }
          },
          axisLine: {
            // 指向外圈文本的分隔线样式
            lineStyle: {
              color: splitColor
            }
          },
          splitLine: {
            lineStyle: {
              type: 'solid',
              color:splitColor, // 分隔线颜色
              width: 1 // 分隔线线宽
            }
          }
        },
        series: [
          {
            type: 'radar',
            symbolSize: 0,
            data: [
              {
                value: [200, 100, 180, 170, 160,150,100],
                name: '祁连县',
                lineStyle: {
                  normal:{
                    width:1,
                    color: '#396afc',
                  }
                },
                areaStyle: {
                  color: 'rgba(57, 106, 252, 0.2)'
                },
              },{
                value: [140, 170, 150, 160, 130,180,110],
                name: '门源回族自治县',
                lineStyle: {
                  normal:{
                    width:1,
                    color: '#ffda00',
                  }
                },
                areaStyle: {
                  color: 'rgba(255, 218, 0, 0.2)'
                },
              },
              {
                // TODO:
                value: [110, 190, 140, 130, 180,100,190],
                name: '刚察县',
                lineStyle: {
                  normal:{
                    width:1,
                    color: '#0cff00',
                  }
                },
                areaStyle: {
                  color: 'rgba(12, 255, 0, 0.2)'
                },
              },
              {
                // TODO:
                value: [80, 90, 40, 30, 100,160,140],
                name: '海晏县',
                lineStyle: {
                  normal:{
                    width:1,
                    color: '#A48BEB',
                  }
                },
                areaStyle: {
                  color: 'rgba(164, 139, 235, 0.2)'
                },
              }
            ]
          }
        ]
      }
      var that = this
      that.chart.setOption(option);
      that.chart.on("click", function(param){
        that.openData()
      });
    },
    openData(){
			this.$parent.clickDialog(this.expressData,'product',`各类产品销量`,0)
		}
  },
};
</script>
<style lang="scss" scoped>
.meter-home {
  width: 100%;
  height: 100%;
  color: rgb(164, 139, 235);
}
</style>
