import axios from 'axios'

const etiquetasUserAPI = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/categoria/users'
})

export const getAllLinksUser = () => { // use
    return etiquetasUserAPI.get('')
}

// export const redirigirLinkOriginal = (infolinks) => {
//     return linksUserAPI.get('/' + infolinks.id_user)
// }

// export const getLinksUser = (infolinks) => {
//     return etiquetasUserAPI.get('/' + infolinks.id_user)
// }

export const getEtiquetasUser = (infoEtiqueta) => {
    return etiquetasUserAPI.get('/list/' + infoEtiqueta.user_id)
}

export const createEtiquetaUser = (infoEtiqueta) => {
    return etiquetasUserAPI.post('', infoEtiqueta)
}

// export const updateLinksUser = (infolinks) => {
//     return etiquetasUserAPI.put('/' + infolinks.id_user + '/' + infolinks.short_link, infolinks)
// }

export const deleteEtiquetaUser = (infoEtiqueta) => { // use
    return etiquetasUserAPI.delete('/' + infoEtiqueta.id)
}
