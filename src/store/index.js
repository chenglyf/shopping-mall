import Vue from "vue";
import Vuex from 'vuex'
//1、安装插件
Vue.use(Vuex)

//2、创建store对象
const store = new Vuex.Store({
  state: {
    cartList: [],
    checked: true
  },
  mutations: {
    addCounter(state,payload) {
      payload.count++
    },
    addToCart(state,payload) {
      payload.checked = true
      state.cartList.push(payload)
    }
  },
  actions: {
    addCart(context, payload) {
      return new Promise((resolve, reject) => {
        //查找之前数组中是否友该商品
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
        //判断oldproduct
        if (oldProduct) {
          // oldProduct.count += 1
          context.commit('addCounter', oldProduct)
          resolve('当前商品数量+1')
        } else {
          payload.count + 1
          // context.state.cartList.push(payload)
          context.commit('addToCart', payload)
          resolve('添加了新的商品')

        }
      })
    }
  }
})
//3、挂载到Vue实例上
export default store
