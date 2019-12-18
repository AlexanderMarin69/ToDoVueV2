import actions from "./actions";
import mutations from "./mutations";

export default {
    namespaced: true,
    state: {
        loginViewModel: {
            password: '',
            username: '',            
            rememberMe: false
        },
        userData: {},
        redirectUrl: '',
        customerViewModel: {},
        errors: {},
        isUserLoggedIn: false,
        users: [],
        selectedUser: ''
    },
    actions,
    mutations
}