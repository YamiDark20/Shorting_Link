import axios from 'axios'

const linksUserAPI = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/links/users'
})

export const getAllLinksUser = () => { // use
    return linksUserAPI.get('')
}

// export const redirigirLinkOriginal = (infolinks) => {
//     return linksUserAPI.get('/' + infolinks.id_user)
// }

export const getLinksUser = (infolinks) => {
    return linksUserAPI.get('/' + infolinks.id_user)
}

export const getInfoLinkUser = (infolinks) => {
    return linksUserAPI.get('/' + infolinks.id_user+ '/' + infolinks.short_link)
}

export const createLinksUser = (infolinks) => {
    return linksUserAPI.post('', infolinks)
}

// export const verificarCoord = (coord) => { // use
//     return linksUserAPI.get('/verificar/?username=' + coord.username + "&email=" + coord.email + "&emailanterior=" + coord.emailanterior)
// }

export const updateLinksUser = (infolinks) => {
    return linksUserAPI.put('/' + infolinks.user_id + '/' + infolinks.short_link_anterior, {
        "short_link": infolinks.short_link,
        "user_id": infolinks.user_id,
        "descripcion": infolinks.descripcion,
        "link_original": infolinks.link_original,
    })
}

export const deleteLinksUser = (infolinks) => { // use
    return linksUserAPI.delete('/' + infolinks.user_id + '/' + infolinks.short_link)
}
