import {useEffect} from 'react';
import {replace, useNavigate} from 'react-router-dom';
import { useAuth } from './Root';

function LandingRedirect(){

    const navigate = useNavigate();
    const {user,loading} = useAuth();

    console.log("user",user,"loading",loading)

    // if the user hasn't logged-in we redirect them to our landing page where they can signup/login, else we refer the logged-in user to their home page, 
    useEffect(() => {

        if(loading) return;
       
        if(user === null){
            navigate('/page',{replace:true}); // {replace : true} tells React router to replace present entry in the browser's history stack , instead of adding a new one, which would mean that if {replace:false} and you press the "back" button it would take you to the page where you have come from.  

           /*  refer to https://www.notion.so/browser-s-history-stack-replace-true-1d74197e5f78806b83e3d6cd7f47da6e?pvs=4 for more information..*/
        }else{
            navigate('/home',{replace:true});
        }
    },[user,loading]);

    // this would ensure that the component does not render any DOM 
    return null;
}


export default LandingRedirect;
