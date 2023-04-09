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

const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data);
};

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-data?doctorId=${doctorId}&date=${date}`);
};

const getExtraInforDoctorById = (id) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${id}`);
};

// const getProfileDoctorById = (id) => {
//     return axios.get(`/api/get-profile-doctor-by-id?doctorId=${id}`);
// };

const postPatientBookAppointment = (data) => {
    return axios.post('/api/patient-book-appointment', data);
};

const postVerifyBookAppointment = (data) => {
    return axios.post('/api/verify-book-appointment', data);
};
const createSpecialty = (data) => {
    return axios.post('/api/create-specialty', data);
};

const getAllSpecialty = () => {
    return axios.get('/api/get-specialty');
};

const getAllDetailSpecialty = (data) => {
    console.log('data', data);
    return axios.get(`/api/get-detail-specialty?id=${data.id}&location=${data.location}`);
};

const createClinic = (data) => {
    return axios.post(`/api/create-clinic`, data);
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
    saveBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraInforDoctorById,
    // getProfileDoctorById,
    postPatientBookAppointment,
    postVerifyBookAppointment,
    createSpecialty,
    getAllSpecialty,
    getAllDetailSpecialty,
    createClinic,
};
