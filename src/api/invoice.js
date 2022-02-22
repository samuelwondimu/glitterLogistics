import { API_BASE } from "./base";

// get invoice
export async function getInvoice(token, id) {
    const response = await fetch(`${API_BASE}/invoice/${id}`, {
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

// create invoice
export async function createInvoice(invoice, token) {
    try {
        const response = await fetch(`${API_BASE}/invoice`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(invoice)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

// update operations
export async function updateInvoice(token, invoiceData) {
    try {
        const response = await fetch(`${API_BASE}/invoice`, {
            method: 'PUT',
            headers: {
                "Accept": "*/*",
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(invoiceData)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

// delete operations
export async function deleteInvoice(token, id) {
    try {
        const response = await fetch(`${API_BASE}/invoice/${id}`, {
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

// update deactivate invoice
export async function updateDeactivate(token, id) {
    const response = await fetch(`${API_BASE}/invoice/deactivate/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return await response.json();
}