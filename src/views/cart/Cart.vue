<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
      <!--    商品列表-->
      <cart-list/>
      <!--    底部汇总-->

  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import cartList from "./childConps/cartList";


export default {
  name: "Cart",
  components: {
    NavBar,
    cartList
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
