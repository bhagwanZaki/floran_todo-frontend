import axios from 'axios';
import { returnErrors } from './messages';
import { USER_LOADED,USER_LOADING,AUTH_ERROR,LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL,BASE_URL  } from "./types";

const url = `${BASE_URL}api/auth/`


// settting up config
export const tokenConfig = getState => {
    const token = getState().auth.token;

    //header
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // if token, add to headers config
    if(token){
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config
}

// check the token and laad the user
export const loadUser = () => (dispatch,getState) => {
    // User loading
    dispatch({ type: USER_LOADING });

    axios.get(`${url}user`,tokenConfig(getState)).then(
        res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        }
    ).catch(
        err => {
            dispatch(returnErrors(err.response.data,err.response.data));
            dispatch({
                type:AUTH_ERROR
            })
        }
    )
}

export const login = (username,password) => dispatch =>{
    //headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //Request Body

    const body = JSON.stringify({
        username,
        password
    })
   

    axios.post(`${url}login`,body,config)
    .then(res => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: LOGIN_FAIL
        });
    })
}


//logout user
export const logout = () => (dispatch,getState) => {

    axios.post(`${url}logout`,null,tokenConfig(getState)).then(
        res => {
            dispatch({
                type: LOGOUT_SUCCESS,
            })
        }
    ).catch(
        err => {
            dispatch(returnErrors(err.response.data,err.response.data));
            dispatch({
                type:AUTH_ERROR
            })
        }
    )
}



// register 
export const register = ({ username, password , email}) => dispatch =>{
    //headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //Request Body

    const body = JSON.stringify({
        username,
        password,
        email
    })
   

    axios.post(`${url}register`,body,config).then(res => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: REGISTER_FAIL
        });
    })
}