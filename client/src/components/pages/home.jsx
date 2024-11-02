import "../../css/home.css";
import { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getAuthUser } from "../../api/auth_user.api";
export const HomePage = ({theme}) => {

    const navigate = useNavigate();
    const [loginUrl, setLoginUrl] = useState(null);

    useEffect(() => {
        async function loadURLAuth(){
            // if(tiposcoordinador.length == 0){
                const res = await getAuthUser();
                setLoginUrl(res.data.url);
                console.log(res.data)
            // }
        }
        loadURLAuth()
        // fetch('http://localhost:80/api/auth', {
        //     headers : {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'
        //     }
        // })
        //     .then((response) => {
        //         if (response.ok) {
        //             return response.json();
        //         }
        //         throw new Error('Something went wrong!');
        //     })
        //     .then((data) => setLoginUrl( data.url ))
        //     .catch((error) => console.error(error));
    }, []);
    // const dispatch = useDispatch();
    // const {users} = useSelector((state) => state.user);
    return (
        <div className={`main`}>
            <header className="bienvenida">
                <p>Bienvenido a ShortURL. Si detecta algun problema o bug, sientase libre de <a href="">crear un issue</a> en Github.</p>
            </header>
            <div className="linea"></div>
            <div className={`div_central ${theme == 'light' ? "light": "dark"}`}>
                <div className="mensaje_central">
                    <h1>Crea links cortos en un click.</h1>
                    <p>ShortURL crea enlaces cortos personalizados con facilidad. Nuestra plataforma open-source te brinda control total sobre tus links.</p>
                </div>
                <div className="enlaces_central">
                    <a href={loginUrl} className="create_link">Crear un link</a>
                    <a href="" className="codigo">Codigo Fuente</a>
                </div>
            </div>
            {/* <footer>
                <p>Hecho por leonel araujo</p>
            </footer> */}
            {/* <p>home Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, laboriosam reiciendis labore voluptatum mollitia aliquid, velit numquam similique doloremque quo voluptatem molestias, illo debitis dicta recusandae aspernatur id iusto autem!</p><p>home Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, laboriosam reiciendis labore voluptatum mollitia aliquid, velit numquam similique doloremque quo voluptatem molestias, illo debitis dicta recusandae aspernatur id iusto autem!</p> */}
        </div>
    )
}
