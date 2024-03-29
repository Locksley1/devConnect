import axios from 'axios';

const X_AUTH_TOKEN = 'x-auth-token';

const setJWT = (token) => {
    if (token)
        axios.defaults.headers.common[X_AUTH_TOKEN] = token;
    else
        delete axios.defaults.headers.common[X_AUTH_TOKEN ];
};

export default setJWT;