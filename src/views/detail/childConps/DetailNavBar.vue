<template>
  <nav-bar>
    <div slot="left" @click="backClick" class="left">
      <img src="~assets/img/common/back.svg">
    </div>
      <div slot="center" class="center">
       <div
         v-for="(item,index) in titles"
         class=title
         @click="itemClick(index)" :class="{active: index === currentIndex}">
         {{item }}</div>
      </div>
  </nav-bar>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品','详情','评论','推荐'],
        currentIndex: 0
      }

    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit('titleClick',index)
      },
      backClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .center {
    display: flex;
  }
  .title {
    flex: 1;
  }
  .left img {
    margin-top: 10px;
  }
  .active {
    color: #ff6699;
  }
</style>
