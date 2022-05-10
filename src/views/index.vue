<template>
  <div>
		<div class="header" @mouseenter="enter" @mouseleave ="leave">
			<screenfull v-show="showSeen" class="screen-class"></screenfull>
      <span class="header-time"> 日期：{{nowDate}} {{nowTime}} {{nowWeek}} </span>
			<p class="header-title">海北州电商大数据平台</p>
		</div>
		<div class="content">
			<!-- 左边 -->
			<div class="col-left">
				<div class="xpanel2 xpanel-wrapper-30">
					<div class="title">各类产品信息</div>
					<div class="xpanel-l-t">
						<div class="xpanel-l-t xpanel-l-t-l">
							<dashboard ref="dashboard"></dashboard>
						</div>
						<div class="xpanel-l-t xpanel-l-t-r">
							<pie ref="piechart"></pie>
						</div>
					</div>
				</div>
				<div class="xpanel2 xpanel-wrapper-30 left-top">
					<div class="title">电商入驻总数（进农村）数量/增长速度</div>
					<div class="xpanel-l-m">
						<histogram ref="histogram"></histogram>
					</div>
				</div>
				<div class="xpanel2 xpanel-wrapper-30 left-top">
					<div class="title">海北州电商订单量/销售额</div>
					<div class="xpanel-l-b">
						<lineChart ref="line_chart"></lineChart>
					</div>
				</div>
			</div>
			<!-- 中间 -->
			<div class="col-m">
				<div class="xpanel-wrapper-13">
					<el-row :gutter="15">
						<el-col :span="8">
							<div class="xpanel-c-b">
								<div class="num-title">
									<img src="../assets/icon/shouru.svg"/>
									<span>总营收</span>
								</div>
								<div class="num">
									<countNum :startVal='100' :endVal='2630' :duration='3000'></countNum>
								</div>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="xpanel-c-b">
								<div class="num-title">
									<img src="../assets/icon/dingdan.svg"/>
									<span>总订单</span>
								</div>
								<div class="num">
									<countNum :startVal='1000' :endVal='146000' :duration='3000'></countNum>
								</div>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="xpanel-c-b">
								<div class="num-title">
									<img src="../assets/icon/qiyekehu.svg"/>
									<span>企业入驻数</span>
								</div>
								<div class="num">
									<countNum :startVal='1000' :endVal='270021' :duration='3000'></countNum>
								</div>
							</div>
						</el-col>
					</el-row>
				</div>
				<div class="xpanel-wrapper-84">
					<div class="map">
						<echartMap ref="chart_map"></echartMap>
					</div>
				</div>
				<div class="xpanel-wrapper-17">
					<div class="line">
						<div>
							<category ref="category_1" :title="'电商企业营收区间'" :sumNum="1500" :successNum="[200,845]"></category>
						</div>
						<div>
							<category ref="category_2" :strColor="'#14ff0f'" :endColor="'#84fde4'" :sumNum="100" :successNum="[10,70]"></category>
						</div>
					</div>
				</div>
			</div>
			<!-- 右边 -->
			<div class="col-right">
				<div class="xpanel2 xpanel-wrapper-63">
					<div class="title">各地区快递寄递量及销往地排名</div>
					<div class="xpanel-r-t">
						<div class="xpanel-r-t-1">
							<annular ref="annular"></annular>
						</div>
						<div class="xpanel-r-t-2">
							<seller ref="seller"></seller>
						</div>	
					</div>
				</div>
				<div class="xpanel2 xpanel-wrapper-30 left-top">
					<div class="title">海北州热销产品</div>
					<div class="xpanel-r-b">
						<wordCloud></wordCloud>
					</div>
				</div>
			</div>
			<el-dialog
				:title="title"
				:visible.sync="centerDialogVisible"
				v-if="centerDialogVisible"
				width="40%">
				<div v-if="dialogType == 'ciyun'">
					<el-table :data="gridData" :header-cell-style="{'text-align':'center'}">
						<el-table-column type="index" width="50" align="center"> </el-table-column>
						<el-table-column property="name" align="center">
							<template slot="header">
								<img class="icon-class1" src="../assets/icon/mingcheng.png" />
								<span>名称</span>
							</template>
						</el-table-column>
						<el-table-column property="address" align="center">
							<template slot="header">
								<img class="icon-class" src="../assets/icon/chandi.png" />
								<span>产地</span>
							</template>
						</el-table-column>
						<el-table-column property="sales" align="center">
							<template slot="header">
								<img class="icon-class" src="../assets/icon/xiaoshouliang.png" />
								<span>销售量</span>
							</template>
						</el-table-column>
						<el-table-column property="sortNum" width="200" align="center">
							<template slot="header">
								<img class="icon-class" src="../assets/icon/paiming.png" />
								<span>排名增长情况</span>
							</template>
							<template slot-scope="scope" align="center">
								<span v-if="scope.row.sortNum == '0'">
									<img class="table-img" src="../assets/img/shang.png" />
								</span>
								<span v-else>
									<img class="table-img" src="../assets/img/xia.png" />
								</span>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<div v-if="dialogType == 'ruzhu' || dialogType == 'dingdan' || dialogType== 'product'">
					<el-carousel :autoplay="false" indicator-position="none" @change="imgchange" :key="clickNum" ref="carousel"  :initial-index="clickNum">
						<el-carousel-item v-for="item in gridData.length" :key="item">
							<el-table :data="dialogType== 'product'?  gridData[item-1].value :gridData[item-1]" style="width: 100%">
								<el-table-column prop="address" :label="dialogType == 'product'?'品类':''" align="center">
									<template slot-scope="scope">
										<img v-if="dialogType != 'product'" class="icon-class" :src="imgArr[scope.$index].url" />
										<span style="margin-left: 10px">{{ scope.row.address }}</span>
									</template>
								</el-table-column>
								<el-table-column prop="sales" align="center">
									<template slot="header">
										<img class="icon-class" src="../assets/icon/xiaoshouliang.png" />
										<span>销售量</span>
									</template>
								</el-table-column>
								<el-table-column prop="upYoy" align="center">
									<template slot="header">
										<img class="icon-class" src="../assets/icon/paiming.png" />
										<span>同比增长</span>
									</template>
								</el-table-column>
								<el-table-column prop="upChain" label="环比增长" align="center">
									<template slot="header">
										<img class="icon-class" src="../assets/icon/huanbizengzhang.png" />
										<span>环比增长</span>
									</template>
								</el-table-column>
							</el-table>
						</el-carousel-item>
					</el-carousel>
				</div>
				<div v-if="dialogType == 'express'">
					<el-table :data="gridData" style="width: 100%">
						<el-table-column prop="date" label="" align="center">
							<template slot-scope="scope">
								<span style="margin-left: 10px">{{ scope.row.date }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="sales" align="center">
							<template slot="header">
								<img class="icon-class" src="../assets/icon/xiaoshouliang.png" />
								<span>销售量</span>
							</template>
						</el-table-column>
						<el-table-column prop="upYoy" align="center">
							<template slot="header">
								<img class="icon-class" src="../assets/icon/paiming.png" />
								<span>同比增长</span>
							</template>
						</el-table-column>
						<el-table-column prop="upChain" align="center">
							<template slot="header">
								<img class="icon-class" src="../assets/icon/huanbizengzhang.png" />
								<span>环比增长</span>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</el-dialog>
		</div>
  </div>
</template>
<script>
import screenfull from './components/screenfull/screenfull.vue';
import countNum from './components/countTo.vue';
import wordCloud from './components/wordCloud.vue'
import pie from './components/pie.vue'
import seller from './components/seller.vue'
import annular from './components/annular.vue'
import dashboard from './components/dashboard.vue'
import lineChart from './components/lineChart.vue'
import histogram from './components/histogram.vue'
import echartMap from './components/map/echartMap.vue'
import category from './components/category.vue'
export default {
	components:{
		wordCloud,
		pie,
		countNum,
		echartMap,
		seller,
		annular,
		dashboard,
		histogram,
		lineChart,
		category,
		screenfull
	},
	data() {
    return {
      // 时间变量
      timer: null,
      nowWeek: "",
      nowDate: "",
      nowTime: "",
			centerDialogVisible:false,
			gridData:[],
			dialogType:'dingdan',
			title:'',
			baseTitle:null,
			clickNum:0, // 折线图点击的月份
			imgArr:[
				{url:require('../assets/icon/gangcha.png')},
				{url:require('../assets/icon/qilian.png') },
				{url:require('../assets/icon/menyuan.png')},
				{url:require('../assets/icon/haiyan.png') }
			],
			showSeen:false
    };
  },
  mounted() {
    // 调用时间方法
    this.timer = setInterval(() => {
      this.setNowTimes();
    }, 1000);
		var that = this
		window.addEventListener('resize', ()=> {
			that.$refs.chart_map.chartMap.resize();
			that.$refs.chart_map.chartBar.resize();
			that.$refs.dashboard.chart.resize();
			that.$refs.histogram.barChart.resize();
			that.$refs.line_chart.chartInstance.resize();
			that.$refs.category_1.categoryChart.resize()
			that.$refs.category_2.categoryChart.resize()
			that.$refs.annular.pieChart.resize();
			that.$refs.piechart.piechart.resize()
			that.$refs.seller.chartInstance.resize();
		})
  },
	destroyed(){
		clearInterval(this.timer);        
    this.timer = null;
	},
  methods: {
    setNowTimes() {
      //获取当前时间
      let myDate = new Date();
      let wk = myDate.getDay();
      let yy = String(myDate.getFullYear());
      let mm = myDate.getMonth() + 1;
      let dd = String(
        myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.getDate()
      );
      let hou = String(
        myDate.getHours() < 10 ? "0" + myDate.getHours() : myDate.getHours()
      );
      let min = String(
        myDate.getMinutes() < 10
          ? "0" + myDate.getMinutes()
          : myDate.getMinutes()
      );
      let sec = String(
        myDate.getSeconds() < 10
          ? "0" + myDate.getSeconds()
          : myDate.getSeconds()
      );
      let weeks = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];
      let week = weeks[wk];
      this.nowDate = yy + "-" + mm + "-" + dd + "";
      this.nowTime = hou + ":" + min + ":" + sec;
      this.nowWeek = week;
    },
		clickDialog(data,type,title,i){
			this.gridData = []
			this.centerDialogVisible = true
			this.gridData = type =='express'? data.filter(res => res.name == i)[0].value : data;
			this.dialogType = type
			this.baseTitle = title
			this.title = type == 'ciyun'? title: (type =='express'? i+title :(type== 'product'?data[0].name+title:i+1+title))
			this.clickNum = i
		},
		//弹框左右点击按钮 动态切换dialog title
		imgchange(val){
			this.title = this.dialogType== 'product'?this.gridData[val].name+this.baseTitle: val+1 + this.baseTitle
		},
		enter() {
			this.showSeen = true;
		},
		leave() {
			this.showSeen = false;
		}
	},	
}
</script>

<style lang="scss" scode>
	@import "../assets/css/app.css";
	.map{
		height: 100%;
		width: 100%;
	}
	.line{
		height: 170px;
		width: 410px;
		position: absolute;
		bottom: 50px;
		div{
			height: 90px;
		}
	}
	.icon-class1{
		width: 14px;
		height: 20px;
		vertical-align: middle;
		padding-right: 10px;
	}
	.icon-class{
		width: 20px;
		height: 20px;
		vertical-align: middle;
		padding-right: 10px;
	}
	.table-img{
		width: 18px;
		height: 30px;
	}
	.content{
		.el-dialog__wrapper {
			.el-dialog {
				background: url('../assets/img/background_dia.png') center no-repeat;
				background-size:100% 100% ;
				background-color: transparent!important;
				margin-top: 21vh !important;
				.el-dialog__header{
					background-color: transparent !important;
					padding:40px 30px 40px 100px !important;
				}
				.el-dialog__title{
					color: #FFFFFF !important;
					font-size: 32px !important;
					font-weight: bold;
				}
				.el-dialog__headerbtn{
					font-size: 45px;
					top: 40px;
				}
				.el-dialog__body{
					background-color: transparent!important;
					color: #FFFFFF !important;
				}
				.el-table tr{
					background-color: transparent!important;

				}
				.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf{
					border:none;
				}
				.el-table, .el-table__expanded-cell{
					background-color: transparent!important;
				}
				.el-table th.el-table__cell{
					background-color: transparent!important;
					font-size: 21px !important;
				}
				.el-table thead{
					color: #fff !important;
				}
				.el-table{
					color: #fff !important;
					font-size: 21px !important;
				}
				.el-table tbody tr:hover > td {
					background-color: transparent !important;
				}
				.el-table--border::after, .el-table--group::after, .el-table::before{
					background-color: transparent !important;
				}
				.el-table th.el-table__cell>.cell{
					font-size: 21px !important;
				}
				.el-carousel__arrow{
					background-color: rgba(31,45,61,1);
					height: 50px;
   				width: 50px;
		      top: 30%;
				  font-size: 35px;
				}
				.el-carousel__arrow--left{
					left: 0;
				}
				.el-carousel__arrow--right{
					right: 0;
				}
				.el-carousel__container{
					height: 400px;
				}
			}
		}
	}
	.screen-class{
		position: absolute;
		width: 100%;
		top: 0;
		z-index: 9;
	}
</style>