import "../../css/home.css";
// import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
// import { set_User } from "../../redux/user_slice";
export const HomePage = ({theme}) => {

    const navigate = useNavigate();
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
                    <a href="" className="create_link">Crear un link</a>
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
