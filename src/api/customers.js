import { API_BASE } from "./base";

export async function getCustomers(token) {
    try {
        const response = await fetch(`${API_BASE}/customer`, {
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