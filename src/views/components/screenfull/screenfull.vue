<template>
  <div class="screen-full">
    <div class="btn-class" v-show="!isFullscreen" @click="handleFullScreen">
      <img src="../../../assets/icon/full_icon.png" />
      <span>全屏模式</span>
    </div>
    <div class="btn-class" v-show="isFullscreen" @click="handleFullScreen">
      <img src="../../../assets/icon/exit_icon.png" />
      <span>退出全屏</span>
    </div>
  </div>
</template>
<script>
import screenfull from "screenfull";  //引入依赖
export default {
  name: "ScreenFull",
  data() {
    return {
      isFullscreen: false, //是否全屏
    };
  },
  mounted() {
		this.init();
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    handleFullScreen() {
      if (!screenfull.isEnabled) {
        this.$message.info("您的浏览器版本过低，不支持全屏浏览");
        return false;
      }
      screenfull.toggle();
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen;
    },
    init() {
			console.log(1)
      if (screenfull.isEnabled) {
        screenfull.on("change", this.change);
      }
    },
    destroy() {
      if (screenfull.isEnabled) {
        screenfull.off("change", this.change);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.screen-full{
	color: #fff;
	width: 100%;
	height: 75px;
  padding: 15px 60px;
  background:linear-gradient(to top, rgba(0,99,151, 0.1), rgba(0,99,151, 1));
	animation: animateDiv 0.5s 1;
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
  .btn-class{
    vertical-align: middle;
    width: 120px !important;
    cursor: pointer;
    float: right;
    img{
      width: 32px;
      height: 24px;
      vertical-align: middle;
      margin-right: 10px;
      z-index: 99;
    }
    span{
      font-weight: 500;
      color: #E4EEFF;
      line-height: 22px;
      font-size: 16px;
      vertical-align: middle;
    }
  }
}
</style>