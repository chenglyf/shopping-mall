<template>
  <div class="recommend">
    <div class='recommend-item' v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    text-align: center;
    width: 100%;
    font-size: 16px;
    padding: 15px 0 25px;
    border-bottom: 10px solid #eee;
  }
  .recommend-item {
    flex: 1;
  }
  a {
    text-decoration:none;
    color: #222222;
  }
  .recommend-item img {
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }
</style>
