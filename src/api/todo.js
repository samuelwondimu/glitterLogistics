import { API_BASE } from "./base";

export async function getTodos(token) {
    try {
        const response = await fetch(`${API_BASE}/todo/active`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function createTodoapi(todo, token) {
    try {
        const response = await fetch(`${API_BASE}/todo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(todo)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function updateTodoapi(token, taskID) {
    try {
        const response = await fetch(`${API_BASE}/todo/completed/${taskID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}