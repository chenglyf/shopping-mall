<template>
  <div id="home">
<!--    导航栏-->
    <nav-bar class="home-nav">
      <div slot="center" >购物街</div>
    </nav-bar>
<!--    轮播图-->
    <home-swiper :banners="banners"/>
<!--    推荐信息-->
    <recommend-view :recommends="recommends"/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";

  import { getHomeMultidata} from "network/home";


  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView
    },
    data() {
      return {
       banners: [],
        recommends: []
      }
    },
    created() {
      //1.请求多个数据
      getHomeMultidata().then(res => {
        // console.log(res)
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: #fb7299;
    /*background-color: var(--color-tint);*/
  }

</style>
