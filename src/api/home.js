import { API_BASE } from './base'

export async function getHomeCustomers(token) {
    const response = await fetch(`${API_BASE}/home/getCustomer`, {
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

export async function getHomeServiceProvider(token) {
    const response = await fetch(`${API_BASE}/home/getServiceProvider`, {
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

export async function getHomeOperationData(token) {
    const response = await fetch(`${API_BASE}/home/getOperation`, {
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