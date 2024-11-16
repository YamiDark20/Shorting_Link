import axios from 'axios'

const userAPI = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/users/'
})

export const updateUser = (user) => { // use
    return userAPI.put('' + user.id, user)
}

// export const getToken = (user) => { // use
//     return userAPI.post('/login/', user)
// }

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
