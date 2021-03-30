<template>
  <div class="bottom-bar">
   <div class="content">
     <check-button
       class="check-button"
       :isCheck="checkAll"
       @click.native="checkClick"/>
     <span>全选</span>
   </div>
    <div class="price">
      合计： {{totalPrice}}
    </div>
    <div class="calculate">
      去结算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/common/checkButton/CheckButton";
  export default {
    name: "CarBottomBar",
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue,item)=> {
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      checkLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      checkAll() {
        if(this.$store.state.cartList.length === 0)return false
          // return !this.$store.state.cartList.find(item => !item.checked)
        for (let item of this.$store.state.cartList) {
          if(!item.checked){
            return false
          }
        }
        return true
      }

    },
    methods: {
      checkClick() {
        // console.log('---');
        if(this.checkAll) {
          return this.$store.state.cartList.forEach(item => item.checked = false)
        }else{
          return this.$store.state.cartList.forEach(item => item.checked = true)

        }

      }

    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    background-color: #eee;
    position: relative;
    line-height: 40px;
    display: flex;
    /*bottom: 40px;*/
  }
  .content {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 25px;
    margin-right: 5px;
  }
  .price {
    margin-left: 20px;
  }
  .calculate {
    margin-left: auto;
    background-color: #ff6699;
  }

</style>
