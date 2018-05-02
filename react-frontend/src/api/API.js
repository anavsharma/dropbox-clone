const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'


const headers = {
    'Accept': 'application/json'
};


export const doLogin = (payload) =>
    fetch(`${api}/users/login`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(res => {
            console.log("inside do login");
            return res.status;
        }).catch(error => {
        console.log("This is error inside dologin");
        return error;
    });



export const doLogout = () =>
    fetch(`${api}/users/doLogout`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },

    })
        .then(res => {
            console.log("inside do logout");
            return res.status;
        }).catch(error => {
        console.log("This is error inside dologin");
        return error;
    });


export const doRegister = (payload) =>
    fetch(`${api}/users/doRegister`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res.status);
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const getImages = () =>
    fetch(`${api}/users/getFiles`, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const checkSession = () =>
    fetch(`${api}/files/check`, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        console.log("here it is in the check session");
        console.log("inside checkSession APi response")
        console.log(res.status);

        console.log("returning the status back");
        return res.status;
    }).catch(error => {
            console.log("This is error.");
            return error;
        });


export const uploadFile = (payload) =>
    fetch(`${api}/files/upload`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        body: payload
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const uploadFolder = (payload) =>
    fetch(`${api}/files/uploadFolder`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(payload)

    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const deleteFile = (payload) =>
    fetch(`${api}/files/delete`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const getGroups = () =>
    fetch(`${api}/users/groups`, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const deleteFolder = (payload) =>
    fetch(`${api}/files/deleteFolder`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const validateUser = (payload) =>
    fetch(`${api}/users/validateUser`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const share = (payload) =>
    fetch(`${api}/files/share`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const createGroup = (payload) =>
    fetch(`${api}/users/createGroup`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const addMember = (payload) =>
    fetch(`${api}/users/addMember`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const deleteGroup = (payload) =>
    fetch(`${api}/users/deleteGroup`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error");
        return error;
    });