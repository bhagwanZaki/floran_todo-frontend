/* eslint-disable import/no-anonymous-default-export */
import { GET_TODOS,DELETE_TODO,CREATE_TODO, COMPLETE,CREATE_CHART } from "../actions/types";

const initialState = {
    todos: [],
    label_data : [],
    todo_data: [].reverse()
}

export default function(state=initialState,action){
    switch (action.type) {
        case GET_TODOS:
            return {
                ...state,
                todos : action.payload
            };
        case CREATE_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload]
            };
        case DELETE_TODO:
            return {
                ...state,
                todos : state.todos.filter(todo => todo.id !== action.payload)
            };
        case COMPLETE:
            // return state
            return {
                ...state,
                todos: state.todos.map((todo) => todo.id === action.payload.id ? action.payload:todo)
            }
        case CREATE_CHART:
            return {
                ...state,
                todo_data: action.payload.data,
                label_data: action.payload.label
            }
    
        default:
            return state
    }
}