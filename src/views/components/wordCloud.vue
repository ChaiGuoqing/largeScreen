<template>
	<div id="cloudWords" @click="openData"></div>
</template>
<script>
import CloudWords from './wordCloud/index'
export default {
  data() {
    return {
			cloudWords: null,
			words : ['冬虫夏草', '沙果', '牦牛肉干', '奶制品', '奶皮', '羔羊肉', '红景天', '青稞酒', '藏毯', '菜籽油', '黄蘑姑', '人参果'],
 			colors:['#68A2FF','#0CDFEF','#78EA7E','#FFDA00','#D0DEEE','#6EC0FF','#47B0FF','#A48BEB','#FFDA00','#939FB0', '#FFC97A', '#7BD280'],
			wordsData:[]
    };
  },
  mounted() {
		this.getWindowInfo()
		window.addEventListener('resize', this.getWindowInfo);
		this.wordsData = [
			{name:'牦牛肉干',address:'刚察',sales:'5623',sortNum:'0'},
			{name:'羊肉',address:'刚察',sales:'5341',sortNum:'0'},
			{name:'羔羊肉',address:'海晏',sales:'2875',sortNum:'1'},
			{name:'藏毯',address:'海晏',sales:'2183',sortNum:'0'},
			{name:'青稞酒',address:'门源',sales:'2001',sortNum:'1'},
			{name:'牦牛肉干',address:'门源',sales:'1872',sortNum:'0'},
			{name:'黄蘑姑',address:'刚察',sales:'1287',sortNum:'0'},
		]
	},
	destroyed() {
    clearInterval(this.timerId);
    // 在组建销毁时，将监听器取消
    window.removeEventListener("resize", this.getWindowInfo);
  },
  methods: {
		init(){
			this.cloudWords = new CloudWords({
				el: '#cloudWords',
				words: this.words,
				colors: this.colors,
				minSize: 14,
				maxSize: 40,
				onClick (elem) {
					console.log(elem)
				}
			})
		},
		getWindowInfo(){
			const windowInfo = {
				width: window.innerWidth,
				hight: window.innerHeight
			}
			this.cloudWords = null
			document.getElementById('cloudWords').innerHTML = ''
			this.init()
		},
		openData(){
			this.$parent.clickDialog(this.wordsData,'ciyun','海北州热销产品')
		}
	},
};
</script>

<style lang="less" scode>
	#cloudWords {
		width: 90%;
		height: 90%;
		margin: 0 auto;
	}
</style>