import axios from '../axios';

const  handleLoginApi = (yourEmail, yourPassword) => {
    return axios.post('/api/login' ,{email: yourEmail, password: yourPassword});
}

export {
    handleLoginApi
};
