// const baseUrl = "https://calendario-medico-api.herokuapp.com";
const baseUrl = process.env.REACT_APP_SCM_API_BASE_URL;

export const getPrivate = async (token: string, path: string) => {
    if (await checkToken(token)) {
        const res = await fetch(baseUrl + path, {
            headers: {
                Authorization: `${token}`
            }
        })
        return res.json()
    } else {
        throw new Error("invalid token. login again")
    }
}

export const postPrivate = async (token: string | null, path: string, obj: any) => {
    if (await checkToken(token!)) {
        const res = await fetch(baseUrl + path, {
            method: 'POST',
            headers: {
                Authorization: token!,
                "content-type": "application/json"
            },
            body: JSON.stringify(obj)
        })
        return res.json()
    } else {
        throw new Error("invalid token. login again")
    }
}

export const getPublic = async (path: string) => {
    const res = await fetch(baseUrl + path, {
        headers: {}
    })
    return res.json()
}

export const postPublic = async (path: string, obj: any) => {

    const res = await fetch(baseUrl + path, {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(obj)
    })
    return res.json()
}

export const logout = async (token: string) => {
    await fetch(baseUrl + "/logout?token=" + token, {
        method: 'POST'
    })
}

const checkToken = async (token: string) => {
    const res = await fetch(baseUrl + "/checktoken?token=" + token, {
        headers: {
            Authorization: token
        }
    })
    const json = await res.json()
    console.log(json)
    return json.Valid
}


