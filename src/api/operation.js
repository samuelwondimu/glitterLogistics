import { API_BASE } from "./base";

// get operations
export async function getOperations(token) {
    const response = await fetch(`${API_BASE}/operation`, {
        method: 'GET',
        headers: {
            "Accept": "*/*",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    const data = await response.json();
    return data;
}

// create operations
export async function createOperation(operation, token) {
    try {
        const response = await fetch(`${API_BASE}/operation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(operation)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

// update operations
export async function updateOperations(token, operationData) {
    try {
        const response = await fetch(`${API_BASE}/operation`, {
            method: 'PUT',
            headers: {
                "Accept": "*/*",
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(operationData)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

// delete operations
export async function deleteOperation(token, id) {
    try {
        const response = await fetch(`${API_BASE}/operation/${id}`, {
            method: 'DELETE',
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

// update deactivate
export async function updateDeactivate(token, id) {
    const response = await fetch(`${API_BASE}/operation/deactivate/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    return await response.json();
}