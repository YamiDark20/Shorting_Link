import "../../css/link_create.css";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLinkUser, updatingLinkUser } from "../../redux/links_user_slice";
// import { addEtiquetaLink } from "../../redux/etiqueta_links_slice";
import { fetchAllCategoriasUser } from "../../redux/etiquetas_user_slice";

export const LinkCreatePage = ({toast, t, setIsToastVisible, id_user, info_link}) => {
    const dispatch = useDispatch();
    // const {id_link_create} = useSelector((state) => state.links_user);
    const {etiquetas_user, status_etiquetas_user, error} = useSelector((state) => state.etiquetas_user);
    const [short_link, setShortLink] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [link_original, setLinkOriginal] = useState("");
    const [categoria_id, setCategoriaId] = useState(-1);

    // const {links_user, status_links_user} = useSelector((state) => state.links_user);

    useEffect(() => {
        if(etiquetas_user.length == 0 && status_etiquetas_user == 'idle'){
            // console.log("enttiejdkk", users)
            dispatch(fetchAllCategoriasUser({"user_id": id_user}));
        }
        if(info_link != undefined){
            setShortLink(info_link.short_link)
            setDescripcion(info_link.descripcion)
            setLinkOriginal(info_link.link_original)
            setCategoriaId(info_link.categoria_id)
            // console.log(info_link, "oqoqiwowlsl")
        }
    }, []);

    const getErrorToastStyles = (screenWidth) => {
        if (screenWidth < 400) {
          return {
            fontSize: '10px',
            padding: '6px',
            background: "#101010",
            color: "#fff"
          };
        }else if (screenWidth > 400 && screenWidth < 590) {
          return {
            fontSize: '12px',
            padding: '6px',
            background: "#101010",
            color: "#fff"
          };
        } else if (screenWidth > 590 && screenWidth < 1000) {
          return {
            fontSize: '16px',
            padding: '6px',
            background: "#101010",
            color: "#fff"
          };
        } else if (screenWidth > 1000 && screenWidth < 1200) {
          return {
            fontSize: '18px',
            padding: '6px',
            background: "#101010",
            color: "#fff"
          };
        } else {
          return {
            fontSize: '20px',
            padding: '6px',
            background: "#101010",
            color: "#fff"
          };
        }
      };

    const crearLink = () => {
        // if(short_link == "" && descripcion == "" && link_original == ""){
        //     toast.error("Los campos short_link, descripcion y link_original estan vacio.", {
        //         duration: 600,
        //         position: 'bottom-right',
        //         style: getErrorToastStyles(window.innerWidth)
        //     })
        if(short_link == "" || descripcion == "" || link_original == ""){
            let campos = [[short_link, "short_link"], [descripcion, "descripcion"], [link_original, "link_original"]];
            let nuevosCamposVacios = []
            for (let index = 0; index < 3; index++) {
                if(campos[index][0] == ""){
                    nuevosCamposVacios.push(campos[index][1])
                }

            }
            console.log(nuevosCamposVacios, "ehduduukj")
            toast.error(`Los campos ${nuevosCamposVacios.join(', ')} estan vacio.`, {
                duration: 600,
                position: 'bottom-right',
                style: getErrorToastStyles(window.innerWidth)
            })
        }else if(/^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/.test(link_original)){
            dispatch(addLinkUser({
                "short_link": short_link,
                "user_id": id_user,
                "descripcion": descripcion,
                "link_original": link_original,
                "categoria_id": categoria_id
            })).unwrap()
            .then(() => {
                // dispatch(addEtiquetaLink({
                //     "categoria_id": categoria_id,
                //     "link_id": link_original
                // })).unwrap()
                // .then(() => {
                //     toast.success("Se ha creado correctamente el link acortado.", {
                //     position: 'bottom-right',
                //         style: getErrorToastStyles(window.innerWidth),
                //         className: 'toast'
                //     })
                //     setIsToastVisible(false)
                //     toast.dismiss(t.id)
                // })
                // .catch((error) => {
                //     console.log(error)
                //     toast.error(error.message, {
                //         duration: 600,
                //         position: 'bottom-right',
                //         style: getErrorToastStyles(window.innerWidth)
                //     })
                // });
                // console.log(id_link_create, "skdidooml")
                toast.success("Se ha creado correctamente el link acortado.", {
                position: 'bottom-right',
                    style: getErrorToastStyles(window.innerWidth),
                    className: 'toast'
                })
                setIsToastVisible(false)
                toast.dismiss(t.id)
            })
            .catch((error) => {
                console.log(error)
                toast.error(error.message, {
                    duration: 600,
                    position: 'bottom-right',
                    style: getErrorToastStyles(window.innerWidth)
                })
            });
        }else{
            toast.error("El link original no tiene el formato de una url. Debe comenzar con https:// o http://", {
                duration: 600,
                position: 'bottom-right',
                style: getErrorToastStyles(window.innerWidth)
            })
        }
    }

    const actualizarLink = () => {
        // if(short_link == "" && descripcion == "" && link_original == ""){
        //     toast.error("Los campos short_link, descripcion y link_original estan vacio.", {
        //         duration: 600,
        //         position: 'bottom-right',
        //         style: getErrorToastStyles(window.innerWidth)
        //     })
        if(short_link == "" || descripcion == "" || link_original == ""){
            let campos = [[short_link, "short_link"], [descripcion, "descripcion"], [link_original, "link_original"]];
            let nuevosCamposVacios = []
            for (let index = 0; index < 3; index++) {
                if(campos[index][0] == ""){
                    nuevosCamposVacios.push(campos[index][1])
                }

            }
            console.log(nuevosCamposVacios, "ehduduukj")
            toast.error(`Los campos ${nuevosCamposVacios.join(', ')} estan vacio.`, {
                duration: 600,
                position: 'bottom-right',
                style: getErrorToastStyles(window.innerWidth)
            })
        }else if(/^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/.test(link_original)){
            dispatch(updatingLinkUser({
                "id": info_link.id,
                "short_link_anterior": info_link.short_link,
                "short_link": short_link,
                "user_id": id_user,
                "descripcion": descripcion,
                "link_original": link_original,
                "categoria_id": categoria_id
            })).unwrap()
            .then(() => {
                // dispatch(addEtiquetaLink({
                //     "categoria_id": categoria_id,
                //     "link_id": link_original
                // })).unwrap()
                // .then(() => {
                //     toast.success("Se ha creado correctamente el link acortado.", {
                //     position: 'bottom-right',
                //         style: getErrorToastStyles(window.innerWidth),
                //         className: 'toast'
                //     })
                //     setIsToastVisible(false)
                //     toast.dismiss(t.id)
                // })
                // .catch((error) => {
                //     console.log(error)
                //     toast.error(error.message, {
                //         duration: 600,
                //         position: 'bottom-right',
                //         style: getErrorToastStyles(window.innerWidth)
                //     })
                // });
                // console.log(id_link_create, "skdidooml")
                toast.success("Se ha actualizado correctamente el link acortado.", {
                position: 'bottom-right',
                    style: getErrorToastStyles(window.innerWidth),
                    className: 'toast'
                })
                setIsToastVisible(false)
                toast.dismiss(t.id)
            })
            .catch((error) => {
                console.log(error)
                toast.error(error.message, {
                    duration: 600,
                    position: 'bottom-right',
                    style: getErrorToastStyles(window.innerWidth)
                })
            });
        }else{
            toast.error("El link original no tiene el formato de una url. Debe comenzar con https:// o http://", {
                duration: 600,
                position: 'bottom-right',
                style: getErrorToastStyles(window.innerWidth)
            })
        }
    }
    return (
        <div className='main_link_create'>
            <div className="div_titulo_link_create">
                {info_link != undefined ? <h1 className='titulo_link_create'>Actualizar Link Acortado</h1>:<h1 className='titulo_link_create'>Crear Link Acortado</h1>}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={() => {
                    setIsToastVisible(false)
                    toast.dismiss(t.id)
                }}><path fill="currentColor" fillRule="evenodd" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m0-1.2a8.8 8.8 0 1 0 0-17.6a8.8 8.8 0 0 0 0 17.6m.849-8.8l3.11 3.111l-.848.849L12 12.849l-3.111 3.11l-.849-.848L11.151 12l-3.11-3.111l.848-.849L12 11.151l3.111-3.11l.849.848z"/></svg>
            </div>
            <p className='label_short_link_create'>Short Link</p>
            <input type="text" className="short_link_create" placeholder='Ingrese short link' value={short_link} onChange={(e) => {
                const regex_short_link = /^[a-zA-Z0-9-_]+$/;
                if(regex_short_link.test(e.target.value)){
                    setShortLink(e.target.value)
                }
            }} />
            <p className='label_short_link_create'>Url Original</p>
            <input type="text" className="short_link_create" placeholder='https://' value={link_original} onChange={(e) => {
                // const regex_short_link = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
                // if(regex_short_link.test(e.target.value)){
                //     setShortLink(e.target.value)
                // }
                setLinkOriginal(e.target.value)
            }} />
            <p className='label_short_link_create'>Descripción</p>
            <textarea name="" id="" rows={4} placeholder="Ingrese una descripcion" value={descripcion} onChange={(e) => {
                const regex_short_link = /^[a-zA-Z0-9\s-_,.]+$/;
                if(regex_short_link.test(e.target.value)){
                    setDescripcion(e.target.value)
                }
            }}></textarea>
            {etiquetas_user.length == 0 ? <h2 className='label_no_existe_tag_create'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M17.868 4.504A1 1 0 0 0 17 4H3a1 1 0 0 0-.868 1.496L5.849 12l-3.717 6.504A1 1 0 0 0 3 20h14a1 1 0 0 0 .868-.504l4-7a1 1 0 0 0 0-.992zM16.42 18H4.724l3.145-5.504a1 1 0 0 0 0-.992L4.724 6H16.42l3.429 6z"/></svg> No existe ninguna etiqueta creada</h2>: (
                <div>
                    <p className='label_short_link_create'>Añada una etiqueta al link</p>
                    <select name="" id="" className="short_link_create" value={categoria_id} onChange={async (e) => { setCategoriaId(e.target.value) }}>
                        <option value={-1}>Seleccione una etiqueta</option>
                        {etiquetas_user.map(etiqueta_user => (
                            <option value={etiqueta_user.id}>{etiqueta_user.etiqueta}</option>
                        ))}
                    </select>
                </div>
            )}
            {/* <p className='label_short_link_create'>Añada una etiqueta al link</p> */}
            {/* <select name="" id="">
                <option value="tag1">Tag1</option>
                <option value="tag2">Tag2</option>
                <option value="tag3">Tag3</option>
            </select> */}
            {/* <h2 className='label_no_existe_tag_create'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M17.868 4.504A1 1 0 0 0 17 4H3a1 1 0 0 0-.868 1.496L5.849 12l-3.717 6.504A1 1 0 0 0 3 20h14a1 1 0 0 0 .868-.504l4-7a1 1 0 0 0 0-.992zM16.42 18H4.724l3.145-5.504a1 1 0 0 0 0-.992L4.724 6H16.42l3.429 6z"/></svg> No existe ninguna etiqueta creada</h2> */}
            <div className='opciones_link_create'>
                <button className='' onClick={() => {
                    if(info_link != undefined) {
                        actualizarLink()
                    }else{
                        crearLink()
                    }
                }}>Guardar</button>
                <button className=''  onClick={() => {
                    setIsToastVisible(false)
                    toast.dismiss(t.id)
                }}>Salir</button>
            </div>
        </div>
    )
}
