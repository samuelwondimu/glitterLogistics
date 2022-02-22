import { API_BASE } from "./base";

export async function createCustomer(customer, token) {

    const response = await fetch(`${API_BASE}/customer`, {
        method: 'POST',
        headers: {
            "Accept": "*/*",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(customer),
    });

    return await response.json();
}

export async function updateDeactivate(token, id) {
    const response = await fetch(`${API_BASE}/customer/deactivate/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return await response.json();
}

export async function getCustomers(token) {
    const response = await fetch(`${API_BASE}/customer/active`, {
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

export async function updateCustomer(token, customerData) {
    try {
        const response = await fetch(`${API_BASE}/customer`, {
            method: 'PUT',
            headers: {
                "Accept": "*/*",
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(customerData)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function deleteCustomer(token, id) {
    try {
        const response = await fetch(`${API_BASE}/customer/${id}`, {
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