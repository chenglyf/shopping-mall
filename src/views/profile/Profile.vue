<template>
  <div class="profile">
    <nav-bar class="nav-bar">
      <div slot="center">我的档案</div>
    </nav-bar>
    <user-info/>
    <account-info/>
    <list-info :list-data="orderList"/>
    <list-info :list-data="serviceList"/>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import UserInfo from "./childComps/UserInfo";
  import AccountInfo from "./childComps/AccountInfo";
  import ListInfo from "./childComps/ListInfo";
export default {
  name: "Profile",
  components: {
    NavBar,
    UserInfo,
    AccountInfo,
    ListInfo,
  },
  data() {
    return {
      orderList: [
        {icon: 'message.svg', info: '我的消息'},
        {icon: 'pointer.svg', info: '积分商城'},
        {icon: 'vip.svg', info: '会员卡'},
      ],
      serviceList: [
        {icon: 'cart.svg', info: '我的购物车'},
        {icon: 'shopping.svg', info: '下载购物APP'},
      ]
    }
  }
}
</script>

<style scoped>
  .nav-bar {
    background-color: #ff6699;
    color: #fff;
  }
  .profile {
    background-color: #f2f2f2;
  }


</style>
