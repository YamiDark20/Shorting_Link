import axios from 'axios'

const auth_userAPI = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/auth'
})

export const getAuthUser = () => { // use
    return auth_userAPI.get('')
}

export const authCallbackUser = (info) => { // use
    return auth_userAPI.get('/callback' + info.located)
}

// export const verificarUsername = (user) => {  // use
//     return userAPI.get('/verificar/username/?username=' + user.username)
// }

// export const getAllUser = () => {
//     return userAPI.get('/list/')
// }

// export const getUser = (user) => { // use
//     return userAPI.get('/detail/?username=' + user.username)
// }

// export const createUser = (user) => { // use
//     return userAPI.post('/list/', user)
// }

// export const updateUser = (user) => { // use
//     return userAPI.put('/detail/?username=' + user.username, user)
// }

// export const deleteUser = (user) => { // use
//     return userAPI.delete('/detail/?username=' + user.username)
// }
