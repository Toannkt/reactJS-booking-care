import axios from '../axios';

const  handleLoginApi = (yourEmail, yourPassword) => {
    return axios.post('/api/login' ,{email: yourEmail, password: yourPassword});
}

const getAllusers = (idInput) => {
    return axios.get(`/api/get-all-users?id=${idInput}`);
}

const createNewUserService = (data) => {
    console.log('check data from service: ', data);
    return axios.post('/api/create-new-user', data);
}

const deleteUserService = (userId) => {
    console.log(userId);
    return axios.delete('/api/delete-user', {
        data:{
            id: userId,
        }
    })
}

const editUserService = (data) => {
    return axios.put('/api/edit-user',data)
}
export {
    handleLoginApi,
    getAllusers,
    createNewUserService,
    deleteUserService,
    editUserService,
};
