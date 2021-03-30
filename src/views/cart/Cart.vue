<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
      <!--    商品列表-->
      <cart-list/>
      <!--    底部汇总-->
    <car-bottom-bar/>

  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import cartList from "./childConps/cartList";
  import CarBottomBar from "./childConps/CarBottomBar";


export default {
  name: "Cart",
  components: {
    NavBar,
    cartList,
    CarBottomBar
  },
  computed: {
    cartLength(state) {
      return this.$store.state.cartList.length
    },
  }
}

</script>

<style scoped>
  .nav-bar {
    background-color: #ff6699;
    color: #fff;
  }
  .cart {
    height: 100vh;
  }


</style>
