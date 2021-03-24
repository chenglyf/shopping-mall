<template>
  <div class="check-button" :class="{check:isCheck}">
    <img src="~assets/img/cart/tick.svg">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isCheck: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style scoped>
  .check-button {
   /*background-color: pink;*/
    border-radius: 50%;
    border: 2px solid pink;
  }
  .check {
    boder-color: #ff6699;
    background-color: #ff6699;
  }
</style>
