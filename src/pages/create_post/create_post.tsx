
import {auth} from '../../config/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import {Form} from './form'


export const CreatePost=()=>{
    const [user]=useAuthState(auth)

    return(<Form/>)
}