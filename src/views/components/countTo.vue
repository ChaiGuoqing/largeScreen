<template>
	<div id="count-to">
		<countTo :startVal='startVal' :endVal='endVal' :duration='3000'></countTo>
	</div>
</template>
<script>
import countTo from 'vue-count-to';
export default {
	props:{
		endVal:{
			type:Number,
			default:0
		},
		startVal:{
			type:Number,
			default:0
		}
	},
	components:{
		countTo
	},
  data() {
    return {};
  },
  mounted() {},
	destroyed() {},
	methods: {},
};
</script>

<style lang="less" scode>
	#count-to {
		width: 100%;
		height: 100%;
		font-size: 36px;
		font-family: Source Han Sans CN;
		font-weight: 800;
		color: #86FDE8;
	}
</style>