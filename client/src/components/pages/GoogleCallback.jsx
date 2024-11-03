import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import { authCallbackUser, logoutUser } from '../../api/auth_user.api';
import { set_User, vaciar_User, fetchAuthCallbackUser } from "../../redux/user_slice";
import { useDispatch, useSelector } from 'react-redux';

function GoogleCallback() {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [user, setUser] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {users, token} = useSelector((state) => state.user);

    // On page load, we take "search" parameters
    // and proxy them to /api/auth/callback on our Laravel API
    useEffect(() => {
        dispatch(fetchAuthCallbackUser({
            "located": location.search
        })).unwrap()
        .then(() => {
            // setData(users);
            setLoading(false);
        });
        // async function loadURLAuth(){
        //         const res = await authCallbackUser({
        //             "located": location.search
        //         });
        //         dispatch(set_User(res.data));
        //         setLoading(false);
        //         setData(res.data);
        //         console.log(res.data);
        //     // }
        // }
        // loadURLAuth()


        // fetch(`http://127.0.0.1:8000/api/auth/callback${location.search}`, {
        //     headers : {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'
        //     }
        // })
        //     .then((response) => {
        //         return response.json();
        //     })
        //     .then((data) => {
        //         setLoading(false);
        //         setData(data);
        //     });
    }, []);

    // Helper method to fetch User data for authenticated user
    // Watch out for "Authorization" header that is added to this call
    function fetchUserData() {
        fetch(`http://localhost:80/api/user`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + data.access_token,
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setUser(data);
            });
    }

    const handleLogout = async () => {
        try {
            // await axios.post('http://localhost:8000/api/logout', {}, {
            //     headers: {
            //         'Authorization': `Bearer ${localStorage.getItem('token')}` // Asegúrate de incluir el token
            //     }
            // });
            const res = await logoutUser({
                "token": token
            });
            dispatch(vaciar_User())
            // Elimina el token del almacenamiento local o del estado
            // localStorage.removeItem('token');
            console.log('Logged out successfully');
            navigate('/home')
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    if (loading) {
        return <DisplayLoading/>
    } else {
        if (user != null) {
            return <DisplayData data={user}/>
        } else {
            return (
                <div>
                    <DisplayData data={users}/>
                    <div style={{marginTop:10}}>
                        <button onClick={fetchUserData}>Fetch User</button>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            );
        }
    }
}

function DisplayLoading() {
    return <div>Loading....</div>;
}

function DisplayData(data) {
    return (
        <div>
            <samp>{JSON.stringify(data, null, 2)}</samp>
        </div>
    );
}

export default GoogleCallback;

