import {useForm} from 'react-hook-form' 
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import './form.css'
import {collection,addDoc} from 'firebase/firestore'
import {db} from '../../config/firebase'
import {auth} from '../../config/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'


interface formData{
    title:string;
    description:string;
}

export const Form=()=>{
    const [user]=useAuthState(auth)
    const navigate =useNavigate()

    
    const schema=yup.object().shape({
        title:yup.string().required('the title is required'),
        description:yup.string().min(100,'the text should have at the very least 100 letters').required('the description is required'),
    })

    const postref=collection(db,"posts")

    const {register,handleSubmit ,formState:{errors}}=useForm({resolver:yupResolver(schema)})

    function errorHandler(errors:any,input:any){

        console.log("errors",errors)
        console.log("element", input)
        //let inp = Object.keys(errors).find(key => key === input);
        //console.log("key",inp)

        return (
        <p style={{color:'red'}}>{errors[input].message}</p>
                )
    }

    function post_handler(data:formData){
        async function poster(data:formData){
            await addDoc(postref,{
                title:data.title,
                description:data.description,
                username:user?.displayName,
                userId:user?.uid,
            

            })
        }
        poster(data)
        navigate('/')

    }

    return (
    <form onSubmit={handleSubmit((data:formData)=>post_handler(data))}>
        
        <label>Title</label>
        <input type="text" placeholder="title" id="title" style={errors.title&&{border:'5px solid red'}} {...register('title')}/>
        {errors.title&&errorHandler(errors,'title')}
        <br/>
        <label>Description</label>
        <textarea  placeholder="description" id="description" style={errors.description&&{border:'5px solid red'}} {...register('description')}/>
        {errors.description&&errorHandler(errors,'description')}
        <input type="submit" value="send" id="submit"/>
    </form>)
}