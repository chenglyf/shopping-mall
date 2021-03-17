<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center" class="center">购物街</div>
    </nav-bar>
   <scroll ref="scroll"
           class="content"
           :probe-type="3"
           @scroll="contentScroll"
           :pull-up-load="true">
     <home-swiper :banners="banners"/>
     <recommend-view :recommends="recommends"/>
     <feature-view/>
     <tab-control
       class="tab-control"
       :titles="['新款','流行','精选']"
       @tabClick="tabClick"/>
     <goods-list :goods="showGoods"/>

   </scroll>
    <back-top
      @click.native="backClick"
      v-show="isShowBackTop"/>
  </div>
</template>

<script>
  //子组件的导入
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  //公共组件的导入
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";
  //方法的导入
  import { getHomeMultidata,getHomeGoods} from "network/home";


  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
    },
    data() {
      return {
       banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0,list: []},
          'new': {page: 0,list: []},
          'sell': {page: 0,list: []}
        },
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata()

      //2、请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')


    },
    mounted() {
      //3、监听图片加载完成
      this.$bus.$on('itemImageLoad',()=> {
        console.log('----')
        this.$refs.scroll.refresh()
        // console.log(this.$refs.scroll)
      })
    },
    methods: {
      //事件监听相关方法
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'

        }
      },
      backClick() {
        // console.log('返回顶部');
        this.$refs.scroll.scrollTo(0,0,500)
      },
      contentScroll(position) {
         this.isShowBackTop = -(position.y) >1000
      },

      //网络请求相关方法
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          // console.log(res)
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          // console.log(res)
          // this.$refs.scroll.finishPullUp()
        })
      },


    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
  .center {
    color: #fff;
  }
  .home-nav {
    background-color: #fb7299;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
    /*background-color: var(--color-tint);*/
  }
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  .content {
    /*overflow: hidden;*/
    top: 44px;
    position: absolute;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
