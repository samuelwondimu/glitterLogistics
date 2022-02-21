import { API_BASE } from "./base";

export function login(username, password) {
    const data = { username: username, password: password };
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    }
    fetch(`${API_BASE}/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: headersList
    }).then(response => response.text()).then(data => {
        localStorage.setItem("token", data);
        const token = localStorage.getItem("token");
        console.log("TOKEN", token);
        return token
    });
}

export async function getCurrenUser(token) {
    try {
        const response = await fetch(`${API_BASE}/useraccount/userdata`, {
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