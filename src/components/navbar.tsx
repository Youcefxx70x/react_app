import './components.css'
import { Link } from "react-router-dom"
import {auth} from '../config/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'



export const Navbar=()=>{
    const [user]=useAuthState(auth)

    
    
 



    return(
        <div id="navbar">
            <div id="link_ct"><Link  className="link" to="/"><h3>Home</h3></Link> {user?<><Link  className="link" to="/logout"><h3>Log out</h3></Link><Link to="/create_post" className="link"><h3> Create Post </h3></Link></>:<Link  className="link" to="/login"><h3>Login</h3></Link>}</div>
            <div id="profile_view">
                
                {user?.photoURL&&<img id="pdp"src={user.photoURL} alt="profile" />}
                <p id="username">{user?.displayName}</p>
            </div>
            
        


        </div>)
}