// const baseUrl = "https://calendario-medico-api.herokuapp.com";
const baseUrl = process.env.REACT_APP_SCM_API_BASE_URL;

export const getPrivate = async (token: string, path:string) => {
    const res = await fetch(baseUrl + path, {
        headers: {
            Authorization: `${token}`
        }
    })
    return res.json()
}

export const postPrivate = async (token: string | null, path:string, obj: any) => {

    const res = await fetch(baseUrl + path, {
        method: 'POST',
        headers: {
            Authorization: token!,
            "content-type": "application/json"
        },
        body: JSON.stringify(obj)
    })
    return res.json()
}

export const getPublic = async (path:string) => {
    const res = await fetch(baseUrl + path, {
        headers: {
        }
    })
    return res.json()
}

export const postPublic = async (path:string, obj: any) => {

    const res = await fetch(baseUrl + path, {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(obj)
    })
    return res.json()
}

export const logout = async (token:string) => {
    await fetch(baseUrl + "/logout?token=" +token,{
        method: 'POST'
    })
}


