<template>
<!-- 柱状图 -->
  <div class="columnar-home" id="seller_ref" ref="seller_ref"></div>
</template>

<script>
// import chalk from "../../../map/chalk.js";
// import dark from "../../../map/dark";
// import westeros from "../../../map/westeros";
export default {
  data() {
    return {
      a: "westeros",
      b: "dark",
      chartInstance: null,
      // 服务器返回的数据
      allData: null,
      currentPage: 1, //当期页数显示
      totalPage: 0, //一共有多少页
      timerId: null, //定时器标识
      option:null
    };
  },
  mounted() {
    this.getData();
  },
  //   结束定时器
  destroyed() {
    clearInterval(this.timerId);
  },
  methods: {
    // 获取服务器数据
    getData() {
      this.allData = [
        { name: "上海市", value: 120 },
        { name: "徐州市", value: 176 },
        { name: "杭州市", value: 90 },
        { name: "武汉市", value: 100 },
        { name: "南京市", value: 70 },
        { name: "苏州市", value: 50 },
        { name: "潍坊市", value: 170 },
        { name: "烟台市", value: 70 },
        { name: "青岛市", value: 30 },
        { name: "成都市", value: 90 },
        { name: "汕头市", value: 50 },
        { name: "济南市", value: 200 },
        { name: "北京市", value: 55 },
        { name: "重庆市", value: 130 },
        { name: "广州市", value: 25 },
        { name: "深圳市", value: 70 },
        { name: "西安市", value: 140 },
        { name: "天津市", value: 160 },
        { name: "长沙市", value: 50 },
        { name: "郑州市", value: 20 },
        { name: "东莞市", value: 10 },
        { name: "沈阳市", value: 170 },
        { name: "昆明市", value: 40 },
        { name: "宁波市", value: 50 },
        { name: "无锡市", value: 60 },
        { name: "珠海市", value: 50 },
        { name: "镇江市", value: 80 },
        { name: "海口市", value: 90 },
        { name: "扬州市", value: 100 },
        { name: "临沂市", value: 110 },
      ];
      //   对数据排序
      this.allData.sort((a, b) => {
        return a.value - b.value; //从小到大
      });
      // 每5个元素显示一页
      if( this.allData.length){
        this.totalPage = this.allData.length % 10 === 0? this.allData.length / 10 : Math.trunc(this.allData.length/ 10)  + 1;
      }
      //   如有接口，在此位置调用
      this.updateChart();
      // this.startInterval()
    },
    // 更新图表
    updateChart() {
      this.chartInstance = this.$echarts.init(this.$refs.seller_ref);
      const showData = this.allData.slice(0, 10);
      this.currentPage++
      const sellerNames = showData.map((item) => {
        return item.name;
      });
      const sellerValues = showData.map((item) => {
        return item.value;
      });
      let that = this
      that.option = {
        // 间距从这里入手
        grid: {
          top: 10,
          left: "3%",
          right: "17%",
          bottom: "1%",
          containLabel: true, //距离包含坐标轴的文字
        },
        xAxis: {
          type: "value",
          // 隐藏x轴
          show: false
        },
        yAxis: {
          type: "category",
          data: sellerNames,
          max: 9,
          splitNumber: 0.5,
          // 隐藏白线和y轴，但是不隐藏刻度，想要全部隐藏直接show： false
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            type: "bar",
            label: {
              show: true,
              position: "right",
              textStyle: {
                color: "white",
              },
              // formatter关键字，这里一些复杂的数据处理还可以写成函数，有a,b,c不同含义的代表数据
              formatter: "{c}万件"
            },
            data: sellerValues,
            itemStyle: {
              normal: {
                barBorderRadius: [0, 60, 60, 0],
                color: function (params) {
                  // 打印params可以看到->这里使前三项颜色不同于其他项
                  if (params.dataIndex < 7) {
                    return new that.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: "rgb(2, 83, 246, 1)",
                      },
                      {
                        offset: 1,
                        color: "rgb(20, 149, 251, 1)",
                      },
                    ])
                  } else {
                    return new that.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: "rgb(15, 255, 5, 1)",
                      },
                      {
                        offset: 1,
                        color: "rgb(131, 253, 226, 1)",
                      },
                    ])
                  }
                },
              }
            },
            barWidth:6
          },
        ],
      };
      //   对图表对象进行鼠标事件的监听
      that.chartInstance.off('click');
      // 鼠标悬停，停止动画
      that.chartInstance.on("mouseover", function(params)  {
        clearInterval(that.timerId);        
				that.timer = null;
      });
      // 移开鼠标，动画恢复
      that.chartInstance.on("mouseout", function(params) {
        that.startInterval()
      });
      that.chartInstance.clear();//清空
      that.chartInstance.setOption(that.option);
      //   启动定时器
      this.startInterval();
    },
    // 定时器
    startInterval() {
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null
      }
      var that = this
      that.timerId = setInterval(function(params) {
        const start = (that.currentPage - 1) * 10;
        const end = that.currentPage * 10;
        const showData = that.allData.slice(start, end);
        console.log(that.currentPage)
        // console.log(showData)
        const sellerNames = showData.map((item) => {
          return item.name;
        });
        const sellerValues = showData.map((item) => {
          return item.value;
        });
        that.option.yAxis.data = sellerNames
        that.option.series[0].data = sellerValues
        that.currentPage++;
        if (that.currentPage > that.totalPage) {
          that.currentPage = 1;
        }
        that.chartInstance.clear();//清空
        that.chartInstance.setOption(that.option);
      }, 3000);
    },
  },
};
</script>

<style lang="scss">
.columnar-home {
  width: 100%;
  height: 100%;
}
</style>
