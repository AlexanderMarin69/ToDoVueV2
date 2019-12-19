import AccountService from '@/services/account.js'
import router from '@/plugins/default.router.js'

export default {
    LOGIN({ commit }, data) {
    /*eslint no-debugger: */
        //commit('SET_LOADING', true, { root: true });
        return AccountService.login(data.vm)
            .then(() => {
                //commit('SET_LOADING', false, { root: true });
                commit('SET_AS_LOGGED_IN', true);
                //if (data.redirectUrl != '') {
                //    router.push(data.redirectUrl);
                //} else {
                //    router.push('/');
                //}
            }).catch((result) => {
                //commit('SET_ERRORS', result);
                console.log(result);
                //commit('SET_LOADING', false, { root: true });
                commit('SET_AS_LOGGED_IN', false);
            });
    },
    USER_IS_LOGGED_IN() {
        return AccountService.isUserLoggedIn()
            .then(result => {
            /*eslint no-console: 1*/
            // custom console
                console.log(result)
                return true;
            }).catch(result => {
                console.log(result)
                return false;
            })
    },
    GET_INLOGGED_USER({ commit }) {
        commit('SET_LOADING', true, { root: true });

        return AccountService.getUser()
            .then(result => {
                console.log(result.status)
                commit('SET_CUSTOMER', result.data);
                if (result.data)
                    commit('SET_AS_LOGGED_IN', true);
                commit('SET_LOADING', false, { root: true });
            }).catch((result) => {
                console.log(result)
                commit('SET_ERRORS', result.response.data);
                console.log(result.response.data);
                //commit('SET_LOADING', false, { root: true });
            });
    },
    CHANGE_PASSWORD( vm) {
        return AccountService.changePassword(vm)
            .then(result => {

                console.log(result);
                return true;
            }).catch(() => {
                return false;
            })
    },
    REGISTER_NEW_USER({ commit }, data) {
        return AccountService.register(data.vm)
            .then(() => {
                commit('SET_AS_LOGGED_IN', true);
                if (data.redirectUrl != '') {
                    router.push(data.redirectUrl);
                } else {
                    router.push('/');
                }
            }).catch(() => {
                commit('SET_AS_LOGGED_IN', false);
            })
    },
    UPDATE_USER({ commit }, vm) {
        commit('SET_LOADING', true, { root: true });
        return AccountService.updateUser(vm)
            .then(result => {
                console.log(result.status)
                commit('SET_CUSTOMER', result.data);
                commit('SET_LOADING', false, { root: true });

            }).catch((result) => {
                console.log(result)
                commit('SET_ERRORS', result.response.data);
                commit('SET_LOADING', false, { root: true });
            });
    },
    LOGOUT({ commit }) {
        return AccountService.logout()
            .then(() => {
                commit('SET_AS_LOGGED_IN', false);
            }).catch(() => {
                commit('SET_AS_LOGGED_IN', true);
            })
    },
    GET_USERDATA({ commit }) {
        return AccountService.getUser().then((result) => {
            commit('SET_USERDATA', result.data);
        }).catch(() => {
            commit('SET_ALERT', {
                status: true,
                message: "Något gick snett.*",
                type: "error",
                timeout: 3000
            }, { root: true })
        })
    }
}