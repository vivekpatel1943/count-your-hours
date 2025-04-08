import {useEffect} from 'react';
import {replace, useNavigate} from 'react-router-dom';
import { useAuth } from './Root';

function LandingRedirect(){

    const navigate = useNavigate();
    const {user,loading} = useAuth();

    console.log("user",user,"loading",loading)

    useEffect(() => {

        if(loading) return;
       
        if(user === null){
            navigate('/page',{replace:true});
        }else{
            navigate('/home',{replace:true});
        }
    },[user,loading]);

    // this would ensure that the component does not render any DOM 
    return null;
}


export default LandingRedirect;
