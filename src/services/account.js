"use strict";

import axios from "axios";

export default {
    register: (vm) => {
        return axios.post('/api/account/register', vm);
    },
    changePassword: (vm) => {
        return axios.post('/api/account/ChangePassword', vm);
    },
    login: (vm) => {
        return axios.post('/api/account/login', vm);
    },
    isUserLoggedIn: () => {
        return axios.get('/api/account/isuserloggedin', { withCredentials: true });
    },
    logout: () => {
        return axios.post('/api/account/logout', { withCredentials: true });
    },
    getUser: () => {
        return axios.get('/api/account/GetLoggedUser', { withCredentials: true });
    },
    updateUser: (vm) => {
        return axios.post('/api/account/updateUser', vm);
    },
    impersonate: (id) => {
        return axios.get(`api/account/impersonateUser/${id}`, { withCredentials: true });
    },
    stopImpersonation: () => {
        return axios.post('api/account/StopImpersonation', { withCredentials: true });
    },
    getAllCustomerUsers: () => {
        return axios.get('api/account/GetAllCustomerUsers', { withCredentials: true });
    }
}