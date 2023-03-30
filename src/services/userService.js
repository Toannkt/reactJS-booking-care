import axios from '../axios';

const handleLoginApi = (yourEmail, yourPassword) => {
    return axios.post('/api/login', { email: yourEmail, password: yourPassword });
};

const getAllusers = (idInput) => {
    return axios.get(`/api/get-all-users?id=${idInput}`);
};

const createNewUserService = (data) => {
    // console.log('check data from service: ', data);
    return axios.post('/api/create-new-user', data);
};

const deleteUserService = (userId) => {
    // console.log(userId);
    return axios.delete('/api/delete-user', {
        data: {
            id: userId,
        },
    });
};

const getAllCodeService = (type) => {
    return axios.get(`/api/allcodes?type=${type}`);
};

const editUserService = (data) => {
    return axios.put('/api/edit-user', data);
};

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctor = () => {
    return axios.get('/api/get-all-doctor');
};

const createDetailDoctor = (data) => {
    return axios.post('/api/create-detail-doctors', data);
};

const getDetailDoctor = (id) => {
    return axios.get(`/api/get-detail-doctor?id=${id}`);
};
export {
    handleLoginApi,
    getAllusers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctor,
    createDetailDoctor,
    getDetailDoctor,
};
