import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navigator = () => {
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:3001/getType', { withCredentials: true }).then(response => {
            console.log(response.data)
            if (response.data !== 'notLoggedIn')
                navigate('/' + response.data);
        })
    }, []);
    return(<></>)
}

export default Navigator;