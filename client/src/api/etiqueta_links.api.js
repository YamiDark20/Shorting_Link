import axios from 'axios'

const etiquetaLinksAPI = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/categoria/links'
})

export const getAllLinksOfEtiqueta = (info_categoria) => { // use
    return etiquetaLinksAPI.get('/list/' + info_categoria.id_categoria)
}


export const createEtiquetaLink = (info_categoria) => {
    return etiquetaLinksAPI.post('', info_categoria)
}
