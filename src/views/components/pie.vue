<template>
  <div class="pie" ref="pie"></div>
</template>

<script>
export default {
  data() {
    return {
      piechart:null,
    };
  },
  mounted() {
		this.initChart()
  },
  methods: {
    // 初始化
    initChart() {
			this.piechart = this.$echarts.init(this.$refs.pie);
			let color = ['#0cff00','#ffda00', '#396afc'];
			var radiusMax=85;
			var startAngle=-90;
			let legend = []
			let chartData = [
				{
					name: '电商营收占比',
					value: 483,
					color:'#0cff00'
				},{
					name: '电商订单占比',
					value: 540,
					color:'#ffda00'
				},{
					name: '企业入驻占比',
					value: 339,
					color:'#396afc'
				}
			];
			let sum = 0;
			let pieSeries = [],legendData = [];
			// 数据处理
			chartData.forEach((v, i) => {
				sum = sum + v.value;
				legend.push(v.name)
			});
			// 图表option整理
			chartData.forEach((v, i) => {
				pieSeries.push({
					name:'各类产品信息统计',
					type: 'pie',
					clockWise: true,
					radius: [radiusMax-i*25+'%', radiusMax-i*25+2.1+'%'],
					hoverAnimation: false,
					startAngle:startAngle,
					center: ['50%', '58%'],
					labelLine: {
						show: false,
					},
					label: {
						show: false,
					},
					data: [
						// {
						// 	//画图标
						// 	value: 0,
						// 	label: {
						// 		position: 'inside',
						// 		backgroundColor: color[i],
						// 		borderRadius: 8,
						// 		padding: 8,
						// 	},
						// 	tooltip: {
						// 		show:false,
						// 		trigger: 'item',
						// 	},
            // },
						{
							value: v.value,
							name: v.name,
							symbol:'none', //这句就是去掉点的
							itemStyle: {
								normal: {
									borderWidth: 2,
									borderColor:color[i]
								}
							}
						},
						{
							value: sum - v.value,
							itemStyle: {
								color: 'rgba(0,0,0,0)',
							},
							tooltip: {
								show:false,
							},
						}
					]
				});
			});
			let option = {
				color:color,
				tooltip: {
					trigger: 'item',
					formatter(params){
						if(!params.name) return
						return params.name+' '+params.value+'('+params.percent+'%)'
					}
				},
				grid: {
					bottom: '1%',
					containLabel: false,
				},
				legend: [{
					left:-5,
					top: 0,
					itemWidth: 10,
					itemHeight: 10,
					textStyle: {
						fontSize:  10,
						color:  '#fff',
					},
					data: legend
				}],
				series: pieSeries,
			};
      this.piechart.setOption(option);
    },

  },
};
</script>
<style lang="scss">
.pie {
  width: 100%;
  height: 100%;
	margin: 0 auto;
	background: url('../../assets/img/bar-bg.png') no-repeat;
	background-size: 85%;
	background-position:15px 58px;
}
</style>
