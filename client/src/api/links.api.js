import axios from 'axios'

const linksUserAPI = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/'
})

// export const getAllLinksUser = () => { // use
//     return linksUserAPI.get('')
// }

export const redirigirLinkOriginal = (infolinks) => {
    return linksUserAPI.get('/' + infolinks.id_user + '/' + infolinks.short_link)
}
