import { API_BASE } from "./base";

// get expense
export async function getExpense(token, id) {
    const response = await fetch(`${API_BASE}/expense`, {
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

export async function  getExpenseList(token) {
    const response = await fetch(`${API_BASE}/expenselist`, {
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

// create expense
export async function createExpense(expense, token) {
    try {
        const response = await fetch(`${API_BASE}/expense`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(expense)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

// update operations
export async function updateExpense(token, expenseData) {
    try {
        const response = await fetch(`${API_BASE}/expense`, {
            method: 'PUT',
            headers: {
                "Accept": "*/*",
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(expenseData)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

// delete operations
export async function deleteExpense(token, id) {
    try {
        const response = await fetch(`${API_BASE}/expense/${id}`, {
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

// update deactivate expense
export async function updateDeactivate(token, id) {
    const response = await fetch(`${API_BASE}/expense/deactivate/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return await response.json();
}