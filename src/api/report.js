import { API_BASE } from "./base";

export async function getReports(token) {
    try {
        const response = await fetch(`${API_BASE}/reports`, {
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