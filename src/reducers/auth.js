import { AUTH_ERROR,USER_LOADED,USER_LOADING,LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state=initialState,action){
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state, 
                isLoading:true
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading:false,
                user: action.payload
        }

        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token')
            return {
                    ...state,
                    token: null,
                    user: null,
                    isAuthenticated: false,
                    isLoading: false
                }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token',action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            }
        default:
            return state;
    }
}