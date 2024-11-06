import MaterialSymbolsLink from '../../svg/MaterialSymbolsLink.svg';
import SimpleLineIconsOptions from '../../svg/SimpleLineIconsOptions.svg';
import "../../css/dashboard.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllLinksUser } from "../../redux/links_user_slice";
import { getInfoLinkOfEtiqueta } from "../../api/etiqueta_links.api";
import {LinkCreatePage} from './link_create'
import {LinkDeletePage} from './link_delete'
import {ListEtiquetas} from './list_etiquetas'
import {InfoUser} from './info_user'
// import { redirigirLinkOriginal } from "../../api/links.api";
import { useState, useEffect } from 'react';
import {toast} from 'react-hot-toast'
import Cookies from 'js-cookie';
import { authCallbackUser } from '../../api/auth_user.api';
import { useLocation } from 'react-router-dom';
import { set_User } from '../../redux/user_slice';
export const DashboardPage = ({theme, isToastVisible, setIsToastVisible}) => {

    const [optionSelected, setOptionSelected] = useState(true);
    const dispatch = useDispatch();
    const location = useLocation();
    const {links_user, status_links_user, error} = useSelector((state) => state.links_user);
    const {etiqueta_links, status_etiqueta_links, etiqueta_selected} = useSelector((state) => state.etiqueta_links);
    const {users} = useSelector((state) => state.user);
    // const [isToastVisible, setIsToastVisible] = useState(false);
    const [isEtiquetasVisible, setIsEtiquetasVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(links_user.length == 0 && status_links_user == 'idle'){
            // console.log("enttiejdkk", users, Cookies.get('id_user'))
            // if(users[0] != undefined){
            dispatch(fetchAllLinksUser({"id_user": Cookies.get('id_user')}));
            // }
        }
        console.log(theme, "wqqassddd")

        async function loadURLAuth(){
            // console.log(Cookies.get('id_user'), "ajskkskdkd")
            // if(Cookies.get('id_user') === undefined){
                const res = await authCallbackUser({
                    "located": location.search
                });


                Cookies.set('name', res.data.user.name, {
                    secure: true,
                    sameSite: 'strict',
                    expires: 1
                })
                Cookies.set('email', res.data.user.email, {
                    secure: true,
                    sameSite: 'strict',
                    expires: 1
                })

                Cookies.set('id_user', res.data.user.id, {
                    secure: true,
                    sameSite: 'strict',
                    expires: 1
                })
                Cookies.set('token', res.data.access_token, {
                    secure: true,
                    sameSite: 'strict',
                    expires: 1
                })
                dispatch(fetchAllLinksUser({"id_user": Cookies.get('id_user')}));
                setLoading(false);
                // setData(res.data);
                console.log(res.data);
            }
        // }
        loadURLAuth()
    });

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

    const convertirFecha = (fechaISO) => {
        // Crear un objeto Date a partir de la cadena ISO 8601
        const fecha = new Date(fechaISO);

        // Obtener las partes de la fecha
        const dia = fecha.getDate();
        const mes = fecha.getMonth() + 1; // Los meses en JavaScript comienzan en 0
        const anio = fecha.getFullYear();

        // Formatear la fecha como "día-mes-año"
        return `${dia}-${mes}-${anio}`;
      }

    const crear_link = () => {
        setIsToastVisible(true);
        return toast(
            (t) => (
                <LinkCreatePage toast={toast} t={t} setIsToastVisible={setIsToastVisible} id_user={Cookies.get('id_user')} />
            ),
            {
                duration: Infinity,
                style: {
                    position: "relative",
                    top: "14vh",
                    // right: "30vw",
                    backgroundColor: '#141414',
                    color: "#fff",
                    width: "65vw", // Establece el ancho deseado
                    maxWidth: "90%", // Asegúrate de que el toast no exceda el ancho de la pantalla
                    height:'0%',
            }}
        );
    };

    const actualizar_link = async (link_id_update) => {
        try {
            // console.log("fa5ss6d66ddggg")
            const res = await getInfoLinkOfEtiqueta({"link_id": link_id_update})
            // console.log(res.data, "maoooall")
            if(res.data.length == 0){
                let mensaje_error = "";
                for (const key in res.data) {
                    // console.log(etiquetas_user.data[key], "maoooall")
                    mensaje_error += res.data[key][0];
                }
                throw new Error(mensaje_error);
            }else{
                // console.log(res.data, "maoooall")
                setIsToastVisible(true);
                return toast(
                    (t) => (
                        <LinkCreatePage toast={toast} t={t} setIsToastVisible={setIsToastVisible} id_user={Cookies.get('id_user')} info_link={res.data[0]} />
                    ),
                    {
                        duration: Infinity,
                        style: {
                            position: "relative",
                            top: "14vh",
                            // right: "30vw",
                            backgroundColor: '#141414',
                            color: "#fff",
                            width: "65vw", // Establece el ancho deseado
                            maxWidth: "90%", // Asegúrate de que el toast no exceda el ancho de la pantalla
                            height:'0%',
                    }}
                );
            }
        } catch (error) {
            // error_login = true
            console.log(error, "eroeodkdkll")
        }
        // setIsToastVisible(true);
        // return toast(
        //     (t) => (
        //         <LinkCreatePage toast={toast} t={t} setIsToastVisible={setIsToastVisible} id_user={users[0].id} />
        //     ),
        //     {
        //         duration: Infinity,
        //         style: {
        //             position: "relative",
        //             top: "14vh",
        //             // right: "30vw",
        //             backgroundColor: '#141414',
        //             color: "#fff",
        //             width: "65vw", // Establece el ancho deseado
        //             maxWidth: "90%", // Asegúrate de que el toast no exceda el ancho de la pantalla
        //             height:'0%',
        //     }}
        // );
    };



    const delete_link = (info_link) => {
        setIsToastVisible(true);
        return toast(
            (t) => (
                <LinkDeletePage toast={toast} t={t} setIsToastVisible={setIsToastVisible} info_link={info_link} />
            ),
            {
                duration: Infinity,
                style: {
                    position: "relative",
                    top: "35vh",
                    backgroundColor: "#101010",
                    color: "#fff"
            }}
        );
    };
    if (Cookies.get('token') !== undefined){

        return (
            <div className={`main_dash ${isToastVisible ? 'active' : ''}`}>
                <div className="bienvenida_dash">
                    <p className='titulo_selected_dash'>{optionSelected ? (etiqueta_selected == "" ? 'Links Acortados':'Links Acortados (' + etiqueta_selected + ')'): 'Opciones del Usuario'}</p>
                    <div>
                        <p className={`links_dash ${theme == 'dark' ? "dark_dash": "light_dash"}`} onClick={() => setOptionSelected(true)}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className='icon'><path fill="currentColor" d="M11 17H7q-2.075 0-3.537-1.463T2 12t1.463-3.537T7 7h4v2H7q-1.25 0-2.125.875T4 12t.875 2.125T7 15h4zm-3-4v-2h8v2zm5 4v-2h4q1.25 0 2.125-.875T20 12t-.875-2.125T17 9h-4V7h4q2.075 0 3.538 1.463T22 12t-1.463 3.538T17 17z"/></svg> Links</p>

                        <p className={`opciones_dash ${theme == 'dark' ? "dark_dash": "light_dash"}`} onClick={() => setOptionSelected(false)}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024" className='icon'><path fill="currentColor" d="M899.4 638.2h-27.198c-2.2-.6-4.2-1.6-6.4-2c-57.2-8.8-102.4-56.4-106.2-112.199c-4.401-62.4 31.199-115.2 89.199-132.4c7.6-2.2 15.6-3.8 23.399-5.8h27.2c1.8.6 3.4 1.6 5.4 1.8c52.8 8.6 93 46.6 104.4 98.6c.8 4 2 8 3 12v27.2c-.6 1.8-1.6 3.6-1.8 5.4c-8.4 52-45.4 91.599-96.801 103.6c-5 1.2-9.6 2.6-14.2 3.8zM130.603 385.8l27.202.001c2.2.6 4.2 1.6 6.4 1.8c57.6 9 102.6 56.8 106.2 113.2c4 62.2-32 114.8-90.2 131.8c-7.401 2.2-15 3.8-22.401 5.6h-27.2c-1.8-.6-3.4-1.6-5.2-2c-52-9.6-86-39.8-102.2-90.2c-2.2-6.6-3.4-13.6-5.2-20.4v-27.2c.6-1.8 1.6-3.6 1.8-5.4c8.6-52.2 45.4-91.6 96.8-103.6c4.8-1.201 9.4-2.401 13.999-3.601m370.801.001h27.2c2.2.6 4.2 1.6 6.4 2c57.4 9 103.6 58.6 106 114.6c2.8 63-35.2 116.4-93.8 131.4c-6.2 1.6-12.4 3-18.6 4.4h-27.2c-2.2-.6-4.2-1.6-6.4-2c-57.4-8.8-103.601-58.6-106.2-114.6c-3-63 35.2-116.4 93.8-131.4c6.4-1.6 12.6-3 18.8-4.4"/></svg> Opciones</p>
                    </div>
                </div>
                {/* Contenido de la Opcion "Links"*/}
                <div className={`options_helping_dash ${theme == 'light' ? "light": "dark"} ${optionSelected ? "active": "unactive"}`}>
                    <input type="text" className={`input_search_link ${theme == 'light' ? "light": "dark"}`} placeholder='Busca un link' />
                    <div className='options_links_dash'>
                        <button type="button" className={`btnoptionbasic ${ theme == 'light' ? "light": "dark"}`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7l8.7 5l8.7-5M12 22V12"/></g></svg> {links_user.length == 0 ? "00": (links_user.length <= 9 ? "0" + links_user.length.toString(): links_user.length)} / 30</button>
                        <button type="button" className={`btnoptionbasic ${ theme == 'light' ? "light": "dark"}`} onClick={() => setIsEtiquetasVisible(true)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M17.868 4.504A1 1 0 0 0 17 4H3a1 1 0 0 0-.868 1.496L5.849 12l-3.717 6.504A1 1 0 0 0 3 20h14a1 1 0 0 0 .868-.504l4-7a1 1 0 0 0 0-.992zM16.42 18H4.724l3.145-5.504a1 1 0 0 0 0-.992L4.724 6H16.42l3.429 6z"/></svg> Selecciona una etiqueta</button>
                        <button type="button" className={`btncrear ${theme == 'light' ? "light": "dark"}`} onClick={() => crear_link()}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5v2H5v14h14v-5z"/><path fill="currentColor" d="M21 7h-4V3h-2v4h-4v2h4v4h2V9h4z"/></svg> Crear un link</button>
                    </div>
                </div>

                {isEtiquetasVisible ? <ListEtiquetas setIsEtiquetasVisible={setIsEtiquetasVisible} isEtiquetasVisible={isEtiquetasVisible} theme={theme} id_user={Cookies.get('id_user')} setIsToastVisible={setIsToastVisible} />: null}
                <div className={`div_central_dash ${theme == 'light' ? "light": "dark"} ${optionSelected ? "active": "unactive"}`}>
                    {etiqueta_links.length == 0 ? (links_user.map(link_user => (
                        <div className={`content_div_central ${theme == 'light' ? "light": "dark"}`}>
                            <div className='short_link_dash'>
                                {/* <p onClick={() => window.location.href = `http://127.0.0.1:8000/api/${users[0].id}/${link_user.short_link}`}>{link_user.short_link}</p> */}
                                <a href={`http://127.0.0.1:8000/api/${Cookies.get('id_user')}/${link_user.short_link}`}>{link_user.short_link}</a>
                                <div className='opciones_link_short_dash'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`icon_option_link ${theme == 'light' ? "light": "dark"}`} onClick={() => {
                                        navigator.clipboard.writeText(`http://127.0.0.1:8000/api/${Cookies.get('id_user')}/${link_user.short_link}`)
                                        toast.success("Se ha copiado el link con exito", {
                                            position: 'bottom-right',
                                            style: getErrorToastStyles(window.innerWidth)
                                        })
                                    }}><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M7 9.667A2.667 2.667 0 0 1 9.667 7h8.666A2.667 2.667 0 0 1 21 9.667v8.666A2.667 2.667 0 0 1 18.333 21H9.667A2.667 2.667 0 0 1 7 18.333z"/><path d="M4.012 16.737A2 2 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1"/></g></svg>

                                    <svg xmlns="http://www.w3.org/2000/svg" className={`icon_option_link ${theme == 'light' ? "light": "dark"}`} viewBox="0 0 24 24" onClick={() => actualizar_link(link_user.id)}><path fill="currentColor" d="m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zM11 20h1.975l.35-2.65q.775-.2 1.438-.587t1.212-.938l2.475 1.025l.975-1.7l-2.15-1.625q.125-.35.175-.737T17.5 12t-.05-.787t-.175-.738l2.15-1.625l-.975-1.7l-2.475 1.05q-.55-.575-1.212-.962t-1.438-.588L13 4h-1.975l-.35 2.65q-.775.2-1.437.588t-1.213.937L5.55 7.15l-.975 1.7l2.15 1.6q-.125.375-.175.75t-.05.8q0 .4.05.775t.175.75l-2.15 1.625l.975 1.7l2.475-1.05q.55.575 1.213.963t1.437.587zm1.05-4.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5M12 12"/></svg>

                                    <svg xmlns="http://www.w3.org/2000/svg" className={`icon_option_link ${theme == 'light' ? "light": "dark"}`} viewBox="-3 -2 24 24"  onClick={() => {
                                        delete_link({
                                            "user_id": Cookies.get('id_user'),
                                            "short_link": link_user.short_link,
                                            "id": link_user.id
                                        })
                                    }}><path fill="currentColor" d="M6 2V1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h4a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-.133l-.68 10.2a3 3 0 0 1-2.993 2.8H5.826a3 3 0 0 1-2.993-2.796L2.137 7H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm10 2H2v1h14zM4.141 7l.687 10.068a1 1 0 0 0 .998.932h6.368a1 1 0 0 0 .998-.934L13.862 7zM7 8a1 1 0 0 1 1 1v7a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v7a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1"/></svg>
                                </div>
                            </div>
                            <p className='link_original_dash'>{link_user.link_original}</p>

                            <div className='detalles_link_dash'>
                                <div className='div_description_dash'>
                                    <p className='p_descripcion'>{link_user.descripcion}</p>
                                </div>
                                <p className='fecha_link'>{convertirFecha(link_user.created_at)}</p>
                            </div>
                        </div>
                    ))):(etiqueta_links.map(link_user => (
                        <div className={`content_div_central ${theme == 'light' ? "light": "dark"}`}>
                            <div className='short_link_dash'>
                                <a href={`http://127.0.0.1:8000/api/${Cookies.get('id_user')}/${link_user.short_link}`}>{link_user.short_link}</a>
                                <div className='opciones_link_short_dash'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`icon_option_link ${theme == 'light' ? "light": "dark"}`} onClick={() => {
                                        navigator.clipboard.writeText(`http://127.0.0.1:8000/api/${Cookies.get('id_user')}/${link_user.short_link}`)
                                        toast.success("Se ha copiado el link con exito", {
                                            position: 'bottom-right',
                                            style: getErrorToastStyles(window.innerWidth)
                                        })
                                    }}><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M7 9.667A2.667 2.667 0 0 1 9.667 7h8.666A2.667 2.667 0 0 1 21 9.667v8.666A2.667 2.667 0 0 1 18.333 21H9.667A2.667 2.667 0 0 1 7 18.333z"/><path d="M4.012 16.737A2 2 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1"/></g></svg>

                                    <svg xmlns="http://www.w3.org/2000/svg" className={`icon_option_link ${theme == 'light' ? "light": "dark"}`} viewBox="0 0 24 24"><path fill="currentColor" d="m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zM11 20h1.975l.35-2.65q.775-.2 1.438-.587t1.212-.938l2.475 1.025l.975-1.7l-2.15-1.625q.125-.35.175-.737T17.5 12t-.05-.787t-.175-.738l2.15-1.625l-.975-1.7l-2.475 1.05q-.55-.575-1.212-.962t-1.438-.588L13 4h-1.975l-.35 2.65q-.775.2-1.437.588t-1.213.937L5.55 7.15l-.975 1.7l2.15 1.6q-.125.375-.175.75t-.05.8q0 .4.05.775t.175.75l-2.15 1.625l.975 1.7l2.475-1.05q.55.575 1.213.963t1.437.587zm1.05-4.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5M12 12"/></svg>

                                    <svg xmlns="http://www.w3.org/2000/svg" className={`icon_option_link ${theme == 'light' ? "light": "dark"}`} viewBox="-3 -2 24 24"  onClick={() => {
                                        delete_link({
                                            "user_id": Cookies.get('id_user'),
                                            "short_link": link_user.short_link,
                                            "id": link_user.link_id
                                        })
                                    }}><path fill="currentColor" d="M6 2V1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h4a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-.133l-.68 10.2a3 3 0 0 1-2.993 2.8H5.826a3 3 0 0 1-2.993-2.796L2.137 7H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm10 2H2v1h14zM4.141 7l.687 10.068a1 1 0 0 0 .998.932h6.368a1 1 0 0 0 .998-.934L13.862 7zM7 8a1 1 0 0 1 1 1v7a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v7a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1"/></svg>
                                </div>
                            </div>
                            <p className='link_original_dash'>{link_user.link_original}</p>

                            <div className='detalles_link_dash'>
                                <div className='div_description_dash'>
                                    <p className='p_descripcion'>{link_user.descripcion}</p>
                                </div>
                                <p className='fecha_link'>{convertirFecha(link_user.created_at)}</p>
                            </div>
                        </div>
                    )))}

                    {/* {links_user.map(link_user => (
                        <div className={`content_div_central ${theme == 'light' ? "light": "dark"}`}>
                            <div className='short_link_dash'>
                                <a href={`http://127.0.0.1:8000/api/${users[0].id}/${link_user.short_link}`}>{link_user.short_link}</a>
                                <div className='opciones_link_short_dash'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`icon_option_link ${theme == 'light' ? "light": "dark"}`} onClick={() => {
                                        navigator.clipboard.writeText(`http://127.0.0.1:8000/api/${users[0].id}/${link_user.short_link}`)
                                        toast.success("Se ha copiado el link con exito", {
                                            position: 'bottom-right',
                                            style: getErrorToastStyles(window.innerWidth)
                                        })
                                    }}><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M7 9.667A2.667 2.667 0 0 1 9.667 7h8.666A2.667 2.667 0 0 1 21 9.667v8.666A2.667 2.667 0 0 1 18.333 21H9.667A2.667 2.667 0 0 1 7 18.333z"/><path d="M4.012 16.737A2 2 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1"/></g></svg>

                                    <svg xmlns="http://www.w3.org/2000/svg" className={`icon_option_link ${theme == 'light' ? "light": "dark"}`} viewBox="0 0 24 24"><path fill="currentColor" d="m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zM11 20h1.975l.35-2.65q.775-.2 1.438-.587t1.212-.938l2.475 1.025l.975-1.7l-2.15-1.625q.125-.35.175-.737T17.5 12t-.05-.787t-.175-.738l2.15-1.625l-.975-1.7l-2.475 1.05q-.55-.575-1.212-.962t-1.438-.588L13 4h-1.975l-.35 2.65q-.775.2-1.437.588t-1.213.937L5.55 7.15l-.975 1.7l2.15 1.6q-.125.375-.175.75t-.05.8q0 .4.05.775t.175.75l-2.15 1.625l.975 1.7l2.475-1.05q.55.575 1.213.963t1.437.587zm1.05-4.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5M12 12"/></svg>

                                    <svg xmlns="http://www.w3.org/2000/svg" className={`icon_option_link ${theme == 'light' ? "light": "dark"}`} viewBox="-3 -2 24 24"  onClick={() => {
                                        delete_link({
                                            "user_id": users[0].id,
                                            "short_link": link_user.short_link,
                                            "id": link_user.id
                                        })
                                    }}><path fill="currentColor" d="M6 2V1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h4a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-.133l-.68 10.2a3 3 0 0 1-2.993 2.8H5.826a3 3 0 0 1-2.993-2.796L2.137 7H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm10 2H2v1h14zM4.141 7l.687 10.068a1 1 0 0 0 .998.932h6.368a1 1 0 0 0 .998-.934L13.862 7zM7 8a1 1 0 0 1 1 1v7a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v7a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1"/></svg>
                                </div>
                            </div>
                            <p className='link_original_dash'>{link_user.link_original}</p>

                            <div className='detalles_link_dash'>
                                <div className='div_description_dash'>
                                    <p className='p_descripcion'>{link_user.descripcion}</p>
                                </div>
                                <p className='fecha_link'>{convertirFecha(link_user.created_at)}</p>
                            </div>
                        </div>
                    ))} */}
                </div>

                {/* Contenido de la Opcion "Opciones"*/}
                {/* <div className={`div_central_dash ${theme == 'light' ? "light": "dark"} ${optionSelected ? "unactive": "active"}`}> */}
                    {/* <p className='titulo_selected_dash'>Links Acortados</p> */}
                {!optionSelected ? <InfoUser theme={theme}/>: null}
                {/* </div> */}
            </div>
        )
    }
}
