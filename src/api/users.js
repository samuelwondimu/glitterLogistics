import { API_BASE } from './base';

// create users
export async function createUser(token, userData) {
    try {
        const response = await fetch(`${API_BASE}/useraccount`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userData)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

// get users
export async function getUsers(token) {
    const data = await fetch(`${API_BASE}/useraccount/active`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    const users = await data.json();
    return users;
}

// upload picture
export async function uploadPicture(File, token) {
    let fileName;
    let bodyContent = new FormData();
    bodyContent.append("", File);
    await fetch(`${API_BASE}/useraccount/savephoto`, {
        method: 'POST',
        body: bodyContent,
        headers: {
            "Accept": "*/*",
            'Authorization': `Bearer ${token}`
        },
    }).then(response => response.text()).then(data => {
        fileName = data;
    })
    return fileName;
}

// update users
export async function changeStatusUser(token, userid) {
    const response = await fetch(`${API_BASE}/useraccount/deactivate/${userid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    const data = await response.json();
    return data;
}

// delete users
export async function updateUser(token, userBody) {
    try {
        const response = await fetch(`${API_BASE}/useraccount`, {
            method: 'PUT',
            headers: {
                "Accept": "*/*",
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userBody)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

