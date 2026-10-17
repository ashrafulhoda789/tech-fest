
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverFetch = async (path, options = {}) => {
    const res = await fetch(`${baseUrl}${path}`, {
        cache: 'no-store',
        ...options
    });

    return res.json();

}

export const protectedServerFetch = async (path, options = {}) => {
    let adminUser = {};

    if (typeof window !== 'undefined') {
        adminUser = JSON.parse(localStorage.getItem('admin_user') || '{}');
    }

    const res = await fetch(`${baseUrl}${path}`, {
        cache: 'no-store',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminUser.id || 'admin_session'}`,
            ...(options.headers || {})
        }
    });

    return res.json();
}

export const publicMutation = async (path, data, method = 'POST') => {

    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return res.json();
};

export const serverMutation = async (path, data, method = 'POST') => {
    let adminUser = {};

    if (typeof window !== 'undefined') {
        adminUser = JSON.parse(localStorage.getItem('admin_user') || '{}');
    }
    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminUser.id || 'admin_session'}`
        },
        body: JSON.stringify(data)
    });


    return res.json();
}

