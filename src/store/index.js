import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        title: 'Kundvagn',
        cart: [
           
            
        ],
  },
    mutations: {
        SET_NEW_CART_ITEM(state, product) {
            state.cart.push({
                id: product.id,
                name: product.name,
                published: product.published
            })
            
            //state.extend({},  )
        },
        REMOVE_CART_ITEM(state, productId) {
            state.cart.pop(productId, 1)
        }
  },
    actions: {
        ADD_TO_CART({ commit, product }) {
            commit('SET_NEW_CART_ITEM', product);
        },
        REMOVE_PRODUCT_FROM_BASKET({ commit, productId }) {
            commit('REMOVE_CART_ITEM', productId)
            //splice(index, 1) remove object from cart with id
        },
  },
  modules: {
  }
})
export default store;