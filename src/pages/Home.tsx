import './pages.css';
import { auth, db } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDocs, collection, addDoc,getDoc,doc ,query,where,deleteDoc} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link,useNavigate } from "react-router-dom";


interface Post {
    id: string;
    title: string;
    description: string;
    userId: string;
    username: string;
    user: any;
}



export const Home = () => {
    const navigate=useNavigate()
    const postRef = collection(db, "posts");
    const [user,loading] = useAuthState(auth);
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await getDocs(postRef);
            const fetchedPosts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[];
            setPosts(fetchedPosts);
            setTotalPages(Math.ceil(fetchedPosts.length / 3));
        };

        if (user) {
            fetchPosts();
        }
    }, [user]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * 3;
    const currentPosts = posts.slice(startIndex, startIndex + 3);
    function check(){
        
        if(!user&&!loading){
            taker()
            return (<div><h4>Please Login first</h4></div>)
        }
        return (<></>)
    }
    function taker(){
        setTimeout(()=>{navigate('/login')},2000)
    }

    return (
        <div id="home">
            <h1 className="main">Articles</h1>
            {/* Uncomment these lines if needed */}
            {/* <p>{user?.displayName}</p>
            {user?.photoURL && <img src={user.photoURL} alt="profile" width="100" height="100" />} */}

            {user ? (
                <PostCollection
                    postsList={currentPosts}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    user={user}
                />
            ):loading&&<h4 style={{textAlign:'center'}}>loading....</h4>}

            {check()}

            
        </div>
    );
};




const Post = (props: Post) => {
    const { id, title, description, user } = props;
    const excerpt = truncateText(description, 50);
    const link = `/post/${id}`;

    const[like,setLikes]=useState<number>(0)
    const[arraylikes,setArraylikes]=useState<any>(null)

    const likes = collection(db, "likes");
    const reqlikes=query(likes,where("postID", "==",id))
    async function getLikes(){
      
        const data = await getDocs(reqlikes);
        const fetchedLikes = data.docs.map((doc) => doc.data())
        /*let filtered=fetchedLikes.filter((item)=>{
            if(id===item.postID){
                return item;
            }
        })*/

        setLikes(fetchedLikes.length)
        setArraylikes(fetchedLikes)


        
    }
    useEffect(()=>{getLikes()},[like])

    const hasUserLiked=arraylikes?.find((like:any)=>like.userID===user.uid)

    const addLike = async () => {
        try {
            await addDoc(likes, {
                userID: user?.uid,
                postID: id
            });
        } catch (error) {
            alert('Error adding like:'+ error);
        }
        getLikes()
    };

    const remove_like=async ()=>{
        const likequery=query(likes,where('postID',"==",id),where('userID','==',user?.uid))
        try{
            let data:any=await getDocs(likequery)
            console.log(data.docs[0].id)
          
            const like_ref=doc(db,'likes',data.docs[0].id)
            await deleteDoc(like_ref)
            getLikes()
        }catch(error){
            console.error(error)
        }
        
    }

    return (
        <div className="post">
            <Link className="link" to={link}>
                <div className="post_content">
                    <h2 className="postTitle">{title}</h2>
                </div>
                <div className="post_content">
                    <p className="excerpt">{excerpt}</p>
                </div>
            </Link>
            {!hasUserLiked?<button onClick={()=>{addLike()}} className="thumbs-up-button">
                 like &#128077; {like}
            </button>:<button onClick={()=>{remove_like()}} className="thumbs-up-button">
                 unlike &#128078; {like}
            </button>}
        </div>
    );
};

function truncateText(text: string, wordLimit: number): string {
    const words = text.split(' '); // Split the text into words based on spaces
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(' ') + '...'; // Join the first 50 words and add an ellipsis
    }
    return text; // If the text has 50 words or fewer, return it unchanged
}



const PostCollection = (props: {
    postsList: Post[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    user:any;
}) => {
    const { postsList, currentPage, totalPages, onPageChange, user } = props;

    return (
        <div id="posts_list">
            {postsList.map((post) => (
                <Post
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    description={post.description}
                    userId={post.userId}
                    username={post.username}
                    user={user}
                />
            ))}
            <div id="toggler">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span> Page {currentPage} of {totalPages} </span>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};
