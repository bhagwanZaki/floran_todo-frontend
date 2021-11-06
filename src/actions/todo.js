import { CREATE_TODO,DELETE_TODO,GET_TODOS,COMPLETE, CREATE_CHART,BASE_URL } from "./types";
import axios from "axios";
import { tokenConfig } from "./auth";
import { createMeassage, returnErrors } from './messages';

const url = `${BASE_URL}api/todos/`
const charturl = `${BASE_URL}api/chart`

export const chartapi = () => (dispatch,getState) => {
    // 
    axios.get(charturl,{params:{'id':getState().auth.user.id}}).then(
        res => {
            dispatch({
                type: CREATE_CHART,
                payload: res.data
            });
        }
    )
} 

export const getTodos = () => (dispatch,getState)  =>{
    axios.get(url,tokenConfig(getState)).then(
        res => {
            console.log('type of data',typeof(res.data))
            dispatch({
                type: GET_TODOS,
                payload: res.data
            })
        }
    ).catch(err => dispatch(
        returnErrors(err.response.data, err.response.status)
        ));
}

export const createTodo = Todo => (dispatch,getState) => {
    axios.post(url,Todo,tokenConfig(getState)).then(
        res => {
            dispatch(createMeassage({ addLead: "New Todo Added"}));
            dispatch({
                type: CREATE_TODO,
                payload: res.data
            })
        }
    ).catch(err => dispatch(
        returnErrors(err.response.data, err.response.status)
        ));
}

export const deleteTodo = (id) => (dispatch,getState) => {
    axios.delete(url+`${id}/`,tokenConfig(getState)).then(
        res => {
            dispatch(createMeassage({ deleteLead: "Todo Deleted"}));
            dispatch({
                type: DELETE_TODO,
                payload: id
            });
        }
    ).catch(
        err => {
            console.log(err);
        }
    )
}

export const completeTodo = (id,completed,completed_at) => (dispatch,getState) => {
   
    const body = { completed,completed_at}
    axios.patch(url+`${id}/`,body,tokenConfig(getState)).then(
        res => {
            dispatch({
                type: COMPLETE,
                payload: res.data
            });
        }
    ).catch(
        err => {
            console.log(err);
        }
    )
}





