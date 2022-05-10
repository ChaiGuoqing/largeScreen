<template>
  <div class="barsout">
    <div id="annular" class="barchart"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pieChart:null,
      expressData:[]
    };
  },
  mounted() {
    this.loadAAAss();
    this.expressData=[
      {name:'祁连县',value:[
        {date:'一月',sales:'469',upYoy:'2.1%',upChain:'10%'},
        {date:'二月',sales:'258',upYoy:'3.1%',upChain:'19%'},
        {date:'三月',sales:'274',upYoy:'5%',upChain:'14%'},
        {date:'四月',sales:'200',upYoy:'10%',upChain:'12%'},
        {date:'五月',sales:'69',upYoy:'7%',upChain:'7%'}
      ]},
      {name:'门源回族自治县',value:[
        {date:'一月',sales:'469',upYoy:'2.1%',upChain:'10%'},
        {date:'二月',sales:'258',upYoy:'3.1%',upChain:'19%'},
        {date:'三月',sales:'274',upYoy:'5%',upChain:'14%'},
        {date:'四月',sales:'200',upYoy:'10%',upChain:'12%'},
        {date:'五月',sales:'69',upYoy:'7%',upChain:'7%'}
      ]},
      {name:'刚察县',value:[
        {date:'一月',sales:'469',upYoy:'2.1%',upChain:'10%'},
        {date:'二月',sales:'258',upYoy:'3.1%',upChain:'19%'},
        {date:'三月',sales:'274',upYoy:'5%',upChain:'14%'},
        {date:'四月',sales:'200',upYoy:'10%',upChain:'12%'},
        {date:'五月',sales:'69',upYoy:'7%',upChain:'7%'}
      ]},
      {name:'海晏县',value:[
        {date:'一月',sales:'469',upYoy:'2.1%',upChain:'10%'},
        {date:'二月',sales:'258',upYoy:'3.1%',upChain:'19%'},
        {date:'三月',sales:'274',upYoy:'5%',upChain:'14%'},
        {date:'四月',sales:'200',upYoy:'10%',upChain:'12%'},
        {date:'五月',sales:'69',upYoy:'7%',upChain:'7%'}
      ]},
    ]
  },
  methods: {
    loadAAAss() {
      var that = this
      var chartDom = document.getElementById("annular");
      that.pieChart = that.$echarts.init(chartDom);
      let color = [ 
        {
          x:0,
          y:0,
          x2:0,
          y2:1,
          colorStops:[
            {
              color:'#e0c609',
              offset:0
            },
            {
              color:'#274d44',
              offset:1
            }
          ]
        },{
          x:0,
          y:0,
          x2:0,
          y2:1,
          colorStops:[
            {
              color:'#4ebde2',
              offset:0
            },
            {
              color:'#185773',
              offset:1
            }]
        },{
          x:0,
          y:0,
          x2:0,
          y2:1,
          colorStops:[
            {
              color:'#0bde0c',
              offset:0
            },{
              color:'#075a41',
              offset:1
            }]
        },{
          x:0,
          y:0,
          x2:0,
          y2:1,
          colorStops:[
            {
              color:'#3566f0',
              offset:0
            },
            {
              color:'#0e3d69',
              offset:1
            }]
        }
      ]
      var option =  {
        color:color,
        series: [{
          type: 'pie',
          data:[
            { value: 1048, name: '海晏县' },
            { value: 735, name: '祁连县' },
            { value: 580, name: '门源回族自治县' },
            { value: 484, name: '刚察县' },
          ],
          center: ["50%", "50%"],
          radius: ['35%', '60%'],
          avoidLabelOverlap: false,
          emphasis: {
            label: {
              show: true,
              fontSize: '12',
              color:'#fff'
            }
          },
          label:{
            normal:{
              formatter:function(parmas){
                let str = ''
                if(parmas.name && parmas.name.length>4){
                  str = parmas.name.replace(/[^\x00-\xff]/g,"$&\x01").replace(/.{9}\x01?/g,"$&\n\n").replace(/\x01/g,"")
                  return str+' '+parmas.value+'万件'
                }
                return parmas.name+' '+parmas.value+'万件'
              },
              textStyle:{
                fontSize:12,
                color:'#fff'
              }
            }
          }
        }]
      }
      var that = this
      that.pieChart.setOption(option);
      that.pieChart.on("click", function(param){
        that.openData(param.name)
      });
    },
    openData(name){
			this.$parent.clickDialog(this.expressData,'express',`快递寄递量`,name)
		}
  },
};
</script>

<style lang='scss' scode>
.barchart {
  width: 100%;
  height: 100%;
}
.barsout {
  width: 100%;
  height: 100%;
}
</style>

