<template>
  <div class="tosat" v-show="show">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props: {
      message: {
        type: String,
        default: ''
      },
      show: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .tosat {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50% );
    padding: 10px 15px;
    color: #fff;
    background-color: rgba(0,0,0,.5);
    border-radius: 20px;
  }

</style>
