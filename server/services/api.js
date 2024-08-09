import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';

export const getUsers = () => fetch(API_URL).then(res => res.json());

export const getUser = (id) => fetch(`${API_URL}/${id}`).then(res => res.json());

export const createUser = (user) => fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
}).then(res => res.json());

export const updateUser = (id, user) => fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
}).then(res => res.json());

export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`/api/users/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};
// export const deleteUser = (id) => fetch(`${API_URL}/${id}`, {
//     method: 'DELETE'
// }).then(res => res.json());
