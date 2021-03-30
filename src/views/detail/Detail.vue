<template>
 <div id="detail">
   <detail-nav-bar @titleClick="titleClick" ref="nav" class="detail-nav"/>
  <scroll class="swiper" ref="scroll" :probe-type="3" @scroll="contentScroll">
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
    <detail-param-info ref="params" :param-info="paramInfo"/>
    <detail-comment-info ref="comment" :comment-info="commentInfo"/>
    <goods-list ref="recommend" :goods="recommends"/>
  </scroll>
   <detail-bottom-bar @addCart="addToCart"/>
   <back-top @click.native="backClick" v-show="isShowBackTop"/>
   <toast :message="message" :show="show"/>
 </div>
</template>

<script>
  import DetailNavBar from "./childConps/DetailNavBar";
  import DetailSwiper from "./childConps/DetailSwiper";
  import DetailBaseInfo from "./childConps/DetailBaseInfo";
  import DetailShopInfo from "./childConps/DetilShopInfo";
  import DetailGoodsInfo from "./childConps/DetailGoodsInfo";
  import DetailParamInfo from "./childConps/DetailParamInfo";
  import DetailCommentInfo from "./childConps/DetailCommentInfo";
  import DetailBottomBar from "./childConps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";
  import Toast from "components/common/toast/Toast";

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
  import { debounce } from 'common/utils'
  import  {backTopMixin} from "common/mixin";


  export default {
    name: "Detail",
    components: {
      DetailShopInfo,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      Toast
    },
    mixins: [backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
        message: '',
        show: false

      }
    },
    created() {
      //1.保存传入的id
      this.iid = this.$route.params.iid
      // 2.根据id获取详情数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        const data = res.result;
        this.topImages = data.itemInfo.topImages
        //3、获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        // console.log(this.goods)

        //4、获取店铺信息
        this.shop = new Shop(data.shopInfo)
        //5、保存商品的详情数据
        this.detailInfo = data.detailInfo
        //6、获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

        //7、取出评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })
      //3、请求推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list
      })
    //  4、给getThemeTopY赋值
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTopYs)
      },100)
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      titleClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
      },
      contentScroll(position) {
        // console.log(position);
        //获取Y值
        const positionY = -position.y
        let length = this.themeTopYs.length
        for(let i = 0;i < length;i++) {
          if(this.currentIndex !== i && ((i <length -1 && positionY >= this
              .themeTopYs[i] &&positionY < this.themeTopYs[i+1]) ||
            (i === length -1 && positionY >= this.themeTopYs[i]))) {
            this.currentIndex =i
            // console.log(this.currentIndex)
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

      //  3、是否显示回到顶部
        this.isShowBackTop = (-position.y) > 1000
      },
      addToCart() {
        // console.log('加入购物车')
      //  1、获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid
        product.count = 1

      //  2、将商品加入到购物车
      //   this.$store.commit('addCart',product)
        this.$store.dispatch('addCart',product).then(res => {
          // console.log(res);
          this.show = true
          this.message = res
          setTimeout(() => {
            this.show = false
            this.message = ''
          },2000)

        })
      }

    },

  }
</script>

<style scoped>

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  #detail {
    height: 100vh;
    position: relative;
    z-index: 1;
    background-color: #fff;
  }

  .swiper {
    position: absolute;
    top: 44px;
    bottom: 58px;
    left: 0;
    right: 0;
  }
</style>
