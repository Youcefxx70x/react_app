import {getDoc,doc} from 'firebase/firestore'
import {auth,db} from '../config/firebase'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './pages.css'

export const Post=(props:any)=>{
    const { id } = useParams<{ id: string }>();
    let postref:any // Get the postId from the URL
    if(id){postref=doc(db,"posts",id)}
    const [post,setPost]=useState<any>({})

    async function getter(){
        let data=await getDoc(postref)
        console.log(data.data())
        setPost(data.data())
    }

    useEffect(()=>{getter()},[])

    return(
        <div id="article">
            <div id="post_title"><h1>{post?.title}</h1>
            <p>By {post?.username}</p>
            </div>

            <div id="post_description">
                <p>{post.description}</p>
            </div>
        </div>)
}