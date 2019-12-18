import Vue from 'vue';
import Vuex from 'vuex';
import actions from "./modules/login/actions"
import mutations from "./modules/login//mutations"
import loginModule from "./modules/login/index"
Vue.use(Vuex)

const store = new Vuex.Store({
    //strict: true,
    modules: {
        login: loginModule,
    },
    state: {
        title: 'Kundvagn',
        cart: [


        ],
        loginViewModel: {
            password: '',
            username: '',
        },
        userData: {},
        redirectUrl: '',
        customerViewModel: {},
        errors: {},
        isUserLoggedIn: false,
        users: [],
        selectedUser: ''
    },
    //  mutations: {
    //      SET_NEW_CART_ITEM(state, product) {
    //          state.cart.push({
    //              id: product.id,
    //              name: product.name,
    //              published: product.published
    //          })

    //          //state.extend({},  )
    //      },
    //      REMOVE_CART_ITEM(state, productId) {
    //          state.cart.pop(productId, 1)
    //      }
    //},
    //  actions: {
    //      ADD_TO_CART({ commit, product }) {
    //          commit('SET_NEW_CART_ITEM', product);
    //      },
    //      REMOVE_PRODUCT_FROM_BASKET({ commit, productId }) {
    //          commit('REMOVE_CART_ITEM', productId)
    //          //splice(index, 1) remove object from cart with id
    //      },
    //},
    //modules: {
    //}
    mutations,
    actions,

});


if (module.hot) {
    // accept actions and mutations as hot modules
    //module.hot.accept(['./modules/windows/index',
    //                    './modules/door/index',
    //                    './modules/doorleaves/index',
    //                    './modules/maindoor/index',
    //                    './modules/login/index',
    //                    './modules/deliveryAddress/index'],
    module.hot.accept(['./modules/login/index']);

    () => {
        // require the updated modules
        // have to add .default here due to babel 6 module output
        //const newModuleWindows = require('./modules/windows/index').default
        //const newModuleDoor = require('./modules/door/index').default
        //const newModuleDoorLeaves = require('./modules/doorleaves/index').default
        //const newModuleMainDoor = require('./modules/maindoor/index').default
        //const newModuleLogin = require('./modules/login/index').default
        //const newModuleDeliveryAddress = require('./modules/deliveryAddress/index').default

        const newModuleLogin = require('./modules/login/index').default
    
        // swap in the new modules and mutations
        store.hotUpdate({
            modules: {
                //windows: newModuleWindows,
                //door: newModuleDoor,
                //doorLeaves: newModuleDoorLeaves,
                //mainDoor: newModuleMainDoor,
                login: newModuleLogin,
            }
        })
    }
}
export default store;