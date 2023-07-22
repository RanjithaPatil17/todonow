import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

// "api/todo/list"
class TodoService {
    getTodoList() {
        return axios.get(API_URL + 'todo/list', { headers: authHeader() });
    }
    createTodo(data: any) {
        return axios.post(API_URL + 'todo/create', data,{ headers: authHeader() });
    }
    updateTodo(id: string, data: any) {
        return axios.put(API_URL + `todo/${id}/update`,data, { headers: authHeader() });
    }
    deleteTodo(id: string) {
        return axios.delete(API_URL + `todo/${id}/delete`, { headers: authHeader() });
    }
}

export default new TodoService();