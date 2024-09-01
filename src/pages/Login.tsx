import {auth,provider} from '../config/firebase'
import {signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export const Login=()=>{
    const navigate=useNavigate()
    async function signer(){
        let result = await signInWithPopup(auth,provider)
        console.log(result)
        navigate('/')

    }
                
    return(
        <div id="login">

            <h1>hello this my login</h1>

          
        
           

            {!auth.currentUser&&<div className='g-sign-in-button'>
                <div className="content-wrapper">
                    <div className='logo-wrapper'>
                        <button onClick={signer} id="login_btn"><div><img src='https://developers.google.com/identity/images/g-logo.png' alt="google logo"/></div>
                            <span className='text-container'>
                                <span>Sign in with Google</span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>}

        </div>)
}