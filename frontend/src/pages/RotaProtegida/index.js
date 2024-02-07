import { useEffect, useState } from "react";
import * as jwt_decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";

export default function RotaProtegida({ errorPage, targetPage }){
    const [page, setPage] = useState(<></>);
    const navigate = useNavigate();


    function renderPage(){
        const token = sessionStorage.getItem('token');
        if(!token) {
            setPage(errorPage)
            setTimeout(() => {
                navigate('/login')
            }, 5000)
            return
        }

        const decodeToken = jwt_decode.jwtDecode(token)
        const { exp } = decodeToken;

        if(exp+'000' - Date.now() < 0){
            setPage(errorPage);
            setTimeout(() => {
                navigate('/login')
            }, 5000)
            return
        }
        setPage(targetPage)
    }

    useEffect(() => {
        renderPage()
    }, [])
    
    return page;
}