<template>
	<div class="map-bg">
			<div class="data-sort">
				<div class="data-chart">
					<div ref="echart_bar"></div>
					<p>企业入驻数</p>
				</div>
				<div class="backg">
					<p>.</p>
					<p>.</p>
					<p>.</p>
					<p>.</p>
				</div>
			</div>
			<div id="map" ref="echart_map"></div>
	</div>
</template>
<script>
import haibeizhoujson from './data.json'
export default {
  data() {
    return {
			chartMap:null,
			chartBar:null,
			timer:null,
			lableData:[],
			option:null,
			hoverOld:null,
			sortData:[],
			color:[['#4A00E0','#6190E8'],['#FFDA00',' #FFE266'],['#004CF5','#1497FB'],['#0FC600','#86FDE8'],['#FFFF00','#ff8700']]
		};
  },
  mounted() {
		this.lableData=[
			{name:'门源回族自治县',value:[421,1253,4562,],coords: [[101.618461, 37.376627],[101.618461, 37.8]]},
			{name:'祁连县',value:[234,124,3235,],coords: [[100.249778, 38.175409],[100.249778, 38.5]]},
			{name:'刚察县',value:[563,426,2346,],coords: [[100.138417, 37.326263],[99.4, 37.326263]]},
			{name:'海晏县',value:[645,352,5667,],coords: [[100.90049, 36.959542],[101.3, 36.959542]]},
		]
		this.lableData.forEach(res =>{
			this.sortData.push({name:res.name,value:res.value[2]})
		})
		this.sortData.sort(this.desc);
		this.sortData.forEach((res,i)=>{
			res.color = this.color[i]
		})
		this.init()
		this.initBarChart()
		// 调用时间方法
		this.labelsetInterval(this.option,this.lableData)
	},
	destroyed() {
		clearInterval(this.timer);        
    this.timer = null;
	},
  methods: {
		init(){
			this.chartMap = this.$echarts.init(this.$refs.echart_map);
			var img = require('../../../assets/img/b-200130.png')
			var geoCoordMap = [
				{'name':'门源回族自治县',value:[101.618461, 37.376627],data:{a:'123',b:'456',c:'789'}},
				{'name':'祁连县',value: [100.249778, 38.175409],data:{a:'123',b:'456',c:'789'}},
				{'name':'刚察县',value:[100.138417, 37.326263],data:{a:'123',b:'456',c:'789'}},
				{'name':'海晏县',value:[100.90049, 36.959542],data:{a:'123',b:'456',c:'789'}}
			]
			this.$echarts.registerMap('海北藏族自治州', haibeizhoujson);
			this.option = {
					geo: {
						map: '海北藏族自治州',
						show: true,
						roam: false,
						zoom: 1.38, //当前视角的缩放比例
						aspectScale: 0.76,
						layoutCenter: ['50%', '48%'], //地图位置
						layoutSize: '100%',
						itemStyle: {
							normal: {
								// areaColor: '#09d3fa',
								areaColor: 'rgba(11,89,163,0)',
							},
							emphasis: {
								// areaColor: 'rgba(0,243,255,1)',
								areaColor:"'rgba(11,89,163,0.5)",
								label: {
									show: false,
								},
							},
						},
						select: {
							label: {
								show: false,
							},
							itemStyle:{
								areaColor:"'rgba(11,89,163,0.5)"
							},
						},
					},
					series: [
						{
							type: 'map',
							mapType: '海北藏族自治州',
							roam: false,
							aspectScale: 0.76,
							layoutCenter: ['50%', '48%'], //地图位置
							layoutSize: '100%',
							zoom: 1.38, //当前视角的缩放比例
							roam: false, //是否开启平游或缩放
							scaleLimit: {
								//滚轮缩放的极限控制
								min: 1,
								max: 2,
							},
							itemStyle: {
								normal: {
									// areaColor: '#0b59a3',
									borderColor: 'rgba(8,216,247,0)',
									// areaColor: 'rgba(11,89,163,0)',
									areaColor: 'rgba(11,89,163,0.1)',
								},
								emphasis: {
									areaColor: 'rgba(11,89,163,0.5)',
									// areaColor: 'rgba(11,89,163,0)',
									borderColor: 'rgba(8,216,247,0)',
									label: {
										show: false,
									},
								},
							},
							select: {
								label: {
									show: false,
								},
								itemStyle:{
									areaColor:"'rgba(11,89,163,0.5)"
								},
							},
						},{
							type: 'effectScatter',
							coordinateSystem: 'geo',
							data: geoCoordMap,
							symbolSize: [15,15],
							showEffectOn: 'render',
							rippleEffect: {
								brushType: 'stroke'
							},
							hoverAnimation: true,
							label: {
								normal: {
									formatter: '{b}',
									position: 'right',
									show: true,
									textStyle: {
										color: "#fff",
										fontSize: 12,
									}
								}
							},
							itemStyle: {
								normal: {
									color: "#0bd013",
									shadowBlur: 10,
									shadowColor: "#6de172"
								}
							},
							select: {
								label: {
									show: false,
								},
								itemStyle:{
									areaColor:"'rgba(11,89,163,0.5)"
								},
							},
							zlevel: 1
						},
						{
							type: 'lines',
							label: {
									show: true,
									padding: [10, 30],
									color: '#fff',
									backgroundColor: {
										image: img
									},
									formatter(params) {
										let arr = ['{a|'+params.name+'}', '{b|'+"总营收：" + params.value[0] + "万元", "总订单：" + params.value[1] + "万元","企业入驻数：" + params.value[2]+'}'];
										return arr.join("\n")
									},
									rich:{
										a:{
											color:'#fff',
											fontSize:16
										},
										b:{
											color:'#00FFFF',
											fontSize:10
										}
									},
									textStyle: {
										lineHeight: 20,
										fontSize:12
									}
							},
							lineStyle: {
								type: 'solid',
								color: '#6de172',
								width: 1,
								opacity: 1,
							},
							data: [this.lableData[0]],
        		},
					]
			};
			var that = this
			this.chartMap.off('click');
			this.chartMap.on('mouseover', function(params) {
				clearInterval(that.timer);        
				that.timer = null;
				if(that.hoverOld == params.name) return
				that.hoverOld = params.name
				let data = that.lableData.filter((val) => val.name == params.name)
				that.initOption(that.option,data[0])
			});
			this.chartMap.on('mouseout', function(params) {
				that.labelsetInterval(that.option,that.lableData)
			});
			this.chartMap.setOption(this.option);
		},
		labelsetInterval(data,lableData){
			if(data){
				var i=0
				this.timer = setInterval(() => {
					this.initOption(data,lableData[i])
					i++
					if(i == lableData.length) i = 0
				}, 3000);
			}
		},
		initOption(data,val){
			data.series[2].data = []
			data.series[2].data.push(val)
			this.chartMap.clear();
			// document.getElementById('map').innerHTML = ""
			this.chartMap.setOption(this.option);
		},
		initBarChart(){
			this.chartBar = this.$echarts.init(this.$refs.echart_bar);
			let maxArr = (new Array(this.sortData.length)).fill(this.sortData[0].value);
			let option = {
				grid: [{
					top:'0%',
					left: 0,
					right:'0%',
					containLabel:false
				}],
				xAxis: {
					inverse: true,
					show: false,
					type: 'value'
				},
				yAxis: [{
					type: 'category',
					axisLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					data: this.sortData.map(item => item.name),
					axisLabel: {
						show:false
					}
				}],
				series: [
					//数字
					{
						z: 2,
						name: 'value',
						type: 'bar',
						barWidth: 10,
						zlevel: 1,
						data: this.sortData.map((item) => {
							var itemStyle = {
                color: {
									type: 'linear',
									x: 0,
									y: 0,
									x2: 1,
									y2: 0,
									colorStops: [
										{
											offset: 0,
											color: item.color[0], // 0% 处的颜色
										},
										{
											offset: 1,
											color: item.color[1], // 100% 处的颜色
										},
									],
                },
								barBorderRadius: 10,
            	}
							return {
								value: item.value,
								itemStyle: itemStyle
							};
						}),
						label: {
							show:true,
							position: 'insideTopLeft',
							padding:[-24,48,-24,-12],
							color: '#fff',
							formatter: '{c}',
							fontSize: 12,
							offset: [10, 0]
						}
					},{//名称
						z: 2,
						name: 'value',
						type: 'bar',
						barWidth: 10,
						zlevel: 1,
						data: this.sortData.map((item, i) => {
							var itemStyle = {
                color: {
									type: 'linear',
									x: 0,
									y: 0,
									x2: 1,
									y2: 0,
									colorStops: [
										{
											offset: 0,
											color: item.color[0], // 0% 处的颜色
										},
										{
											offset: 1,
											color: item.color[1], // 100% 处的颜色
										},
									],
                },
								barBorderRadius: 10,
            	}
							return {
								value: item.value,
								itemStyle: itemStyle
							};
						}),
						label: {
							show:true,
							position: 'insideTopRight',
							padding:[-24,12,-24,24],
							color: '#fff',
							formatter: '{b}',
							fontSize: 12,
							offset: [10, 0],
						}
					},{
            name: '背景',
            type: 'bar',
            barWidth: 10,
            barGap: '-100%',
            itemStyle: {
							normal: {
								color: 'rgba(0, 0, 0, 0)',
								barBorderRadius: 10,
							}
            },
            data: maxArr,
        	}
				]
			};
			this.chartBar.setOption(option);
		},
		desc(x,y){ 
			let colId = 'value'
       return (x[colId] > y[colId]) ? 1 : -1  
    }
	},
};
</script>

<style lang="less" scode>
	.map-bg{
		width: 100%;
		height: 100%;
		margin: 0 auto;
		background: url('../../../assets/img/map.png') center center no-repeat;
		background-size: contain;
		-webkit-filter: drop-shadow(0px 30px 15px #000);
		filter: drop-shadow(0px 30px 15px #000);
	}
	#map {
		width: 100%;
		height: 100%;
		margin: 0 auto;
	}
	.data-sort{
		width: 270px;
		height: 320px;
		position: absolute;
		top: 0px;
		right: 10px;
		.data-chart{
			width: 240px;
			height: 320px;
			float: left;
			div{
				width: 100%;
				height: 100%;
			}
			p{
				position: relative;
				color: #FEFFFF;
				line-height: 58px;
				opacity: 0.6;
				font-size: 12px;
				top: -90px;
				left: 190px;
			}
		}
		.backg{
			float: right;
			width: 10px;
			height: 245px;
			background: #335261;
			border-radius: 10px;
			position: relative;
			animation: animateDiv 2s 1;
			p{
				color: #fff;
				line-height: 58px;
				text-align: center;
				font-size: 30px;
				font-weight: bold;
			}
		}
			@keyframes animateDiv {
				0% {
					transform: scaleY(0.2);
					transform-origin: 100% 0%;
				}
				100% {
					transform: scaleY(1);
					transform-origin: 100% 0%;
				}
		}
	}
</style>