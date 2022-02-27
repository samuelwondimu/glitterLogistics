import { API_BASE } from "./base";

export async function createServiceProvider(serviceProvider, token) {
    try {
        const response = await fetch(`${API_BASE}/serviceprovider`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(serviceProvider)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getServceProvider(token) {
    const response = await fetch(`${API_BASE}/serviceprovider/`, {
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

export async function editServiceProvider(token, serviceData) {
    try {
        const response = await fetch(`${API_BASE}/serviceprovider`, {
            method: 'PUT',
            headers: {
                "Accept": "*/*",
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(serviceData)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function deleteServiceProvider(token, id) {
    try {
        const response = await fetch(`${API_BASE}/serviceprovider/${id}`, {
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