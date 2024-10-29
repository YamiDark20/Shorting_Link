import "../../css/link_delete.css";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSelectedEtiqueta } from "../../redux/etiquetas_user_slice";

export const EtiquetaDeletePage = ({toast, t, setIsToastVisible, info_etiqueta}) => {
    const dispatch = useDispatch();
    const {etiquetas_user, status_etiquetas_user, error} = useSelector((state) => state.etiquetas_user);
    // const [short_link, setShortLink] = useState("");
    // const [descripcion, setDescripcion] = useState("");
    // const [link_original, setLinkOriginal] = useState("");

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

    // const crearLink = () => {
    //     if(short_link == "" || descripcion == "" || link_original == ""){
    //         let campos = [[short_link, "short_link"], [descripcion, "descripcion"], [link_original, "link_original"]];
    //         let nuevosCamposVacios = []
    //         for (let index = 0; index < 3; index++) {
    //             if(campos[index][0] == ""){
    //                 nuevosCamposVacios.push(campos[index][1])
    //             }

    //         }
    //         console.log(nuevosCamposVacios, "ehduduukj")
    //         toast.error(`Los campos ${nuevosCamposVacios.join(', ')} estan vacio.`, {
    //             duration: 600,
    //             position: 'bottom-right',
    //             style: getErrorToastStyles(window.innerWidth)
    //         })
    //     }else if(/^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/.test(link_original)){
    //         dispatch(addLinkUser({
    //             "short_link": short_link,
    //             "user_id": id_user,
    //             "descripcion": descripcion,
    //             "link_original": link_original
    //         })).unwrap()
    //         .then(() => {
    //             toast.success("Se ha creado correctamente el link acortado.", {
    //             position: 'bottom-right',
    //             //   style: getErrorToastStyles(window.innerWidth),
    //             className: 'toast'
    //             })
    //             setIsToastVisible(false)
    //             toast.dismiss(t.id)
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //             toast.error(error.message, {
    //                 duration: 600,
    //                 position: 'bottom-right',
    //                 style: getErrorToastStyles(window.innerWidth)
    //             })
    //         });
    //     }else{
    //         toast.error("El link original no tiene el formato de una url. Debe comenzar con https:// o http://", {
    //             duration: 600,
    //             position: 'bottom-right',
    //             style: getErrorToastStyles(window.innerWidth)
    //         })
    //     }
    // }
    return (
        <div className='main_link_delete'>
            <p className='mensaje_delete'>¿Estas seguro de que quieres eliminar la etiqueta seleccionada?</p>
            <div className='div_botones_delete'>
                <button className='boton_confirmar_delete' onClick={async () => {
                    dispatch(deleteSelectedEtiqueta(info_etiqueta)).unwrap()
                    .then(() => {
                        setIsToastVisible(false);
                        toast.dismiss(t.id)
                        toast.success("Se ha eliminado correctamente la etiqueta del usuario", {
                            position: 'bottom-right',
                            style: getErrorToastStyles(window.innerWidth)
                        })
                    })
                    .catch((error) => {
                        toast.error(error.message, {
                            position: 'bottom-right',
                            style: getErrorToastStyles(window.innerWidth)
                        })
                    });
                }}>Si</button>
                <button className='boton_cancelar_delete'  onClick={() => {
                    setIsToastVisible(false);
                    toast.dismiss(t.id)
                }}>No</button>
            </div>
        </div>
    )
}
