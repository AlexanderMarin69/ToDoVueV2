export default {
    SET_PASSWORD(state, password) {
        state.loginViewModel.password = password;
    },
    SET_USERNAME(state, username) {
        state.loginViewModel.username = username;
    },
    //SET_REMEMBER_ME(state, rememberMe) {
    //    //TODO auto set is false, set to "rememberMe" when function implemented
    //    state.loginViewModel.rememberMe = false;
    //},
    SET_ERRORS(state, errors) {
        state.errors = errors;
    },
    SET_CUSTOMER(state, customer) {
        state.customerViewModel = customer;
    },
    UPDATE_USER(state, customer) {
        state.customerViewModel = customer;
    },
    SET_FIRSTNAME(state, firstName) {
        state.customerViewModel.firstName = firstName; 
    },
    SET_LASTNAME(state, lastName) {
        state.customerViewModel.lastName = lastName;
    },
    SET_PHONENUMBER(state, phoneNumber) {
        state.customerViewModel.phoneNumber = phoneNumber;
    },
    SET_COMPANYNAME(state, companyName) {
        state.customerViewModel.companyName = companyName;
    },
    SET_DELIVERYADDRESS(state, deliveryAddress) {
        state.customerViewModel.SelectedDeliveryAddressId = deliveryAddress;
    },
    SET_INVOICEADDRESS(state, invoiceaddress) {
        state.customerViewModel.SelectedInvoiceAddressId = invoiceaddress;
    },
    SET_AS_LOGGED_IN(state, payload) {
    /*eslint no-debugger: */
        //debugger;
        state.isUserLoggedIn = payload;
    },
    SET_USERDATA(state, userData) {
        state.userData = userData;
    },
    SET_REDIRECT_URL(state, url) {
        state.redirectUrl = url;
    },
    SET_SELECTED_DELIVERYADDRESS(state, deliveryAddress) {
        state.customerViewModel.selectedDeliveryAddress = deliveryAddress;
    },
    ADD_TO_USERS(state, user) {
        state.users.push({ value: user.id, text: user.userName });
    },
    SET_SELECTED_USER(state, user) {
        state.selectedUser = user;
    },
}