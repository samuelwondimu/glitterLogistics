import { API_BASE } from "./base";

// get commodity
export async function getCommodity(token, id) {
    const response = await fetch(`${API_BASE}/commodity/active`, {
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

// create commodity
export async function createCommodity(commodity, token) {
    try {
        const response = await fetch(`${API_BASE}/commodity`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(commodity)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

// update operations
export async function updateCommodity(token, commodityData) {
    try {
        const response = await fetch(`${API_BASE}/commodity`, {
            method: 'PUT',
            headers: {
                "Accept": "*/*",
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(commodityData)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

// delete operations
export async function deleteCommodity(token, id) {
    try {
        const response = await fetch(`${API_BASE}/commodity/${id}`, {
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

// update deactivate commodity
export async function updateConfirmDelete(token, id) {
    const response = await fetch(`${API_BASE}/commodity/deactivate/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return await response.json();
}