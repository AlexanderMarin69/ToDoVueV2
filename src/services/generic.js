import axios from "axios";

export default {
/* eslint-disable no-console */
    getAll: (apiAdress) => {
        
        return axios.get(`/api/${apiAdress}`)
            .then(result => {
                console.log(result.data);
                return result.data;
               
            }).catch(result => { console.log(result); });
    },
    get: (apiAdress, id) => {
        
        return axios.get(`/api/${apiAdress}/${id}`)
            .then(result => {
                console.log(result.data);
                return result.data;
            }).catch(result => { console.log(result); });
    },
    add: (apiAdress, vm) => {
       

        return axios.post(`/api/${apiAdress}/`, vm)

       
            .then(result => {
                console.log(result.status);
                return result;
            }).catch(result => { console.log(result); },
                (error) => { console.log(error) });
    },
    update: (apiAdress, entity) => {
        return axios.post(`/api/${apiAdress}/${entity.id}`, entity)
            .then(result => {
                console.log(result.status);
                return result;
            }).catch(result => { console.log(result); });
    },

    //update: (apiAdress, entity) => {
    //    return axios.post(`/api/${apiAdress}/${entity.id}`, entity)
    //        .then(result => {
    //            console.log(result.status);
    //            return result;
    //        }).catch(result => { console.log(result); });
    //},
    delete: (apiAdress, id) => {
        return axios.delete(`/api/${apiAdress}/${id}`)
            .then(result => {
                console.log(result.status);
                return result.status;
            }).catch(result => { console.log(result); });
    /* eslint-enable no-console */
    }
}