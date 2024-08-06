import Header from "./Header" 
import Nav from "./Nav"
import Home from "./Home"
import Missing from "./Missing"
import NewPost from "./NewPost"
import PostPage from "./PostPage"
import About from "./About"
import Footer from "./Footer"
import { useEffect, useState } from "react"
import Post from "./Post"
import PageLayout from "./PageLayout";
import "./index.css"
import { format } from "date-fns"
import { useNavigate } from "react-router-dom"
import {Routes,Route } from "react-router-dom"


function App() {
    const[posts, setPosts]=useState([
        
        {
            id:1,
            title:"My First Post",
            datetime:"July 01,2021 11:17:36  AM",
            body :"Made a video about Tesla Q1 result"
        },
        {
            id:2,
            title:"My 2nd Post",
            datetime:"July 01,2021 11:17:36  AM",
            body :"Made a video about Tesla Q1 result"
        },
        {
            id:3,
            title:"My 3nd Post",
            datetime:"July 01,2021 11:17:36  AM",
            body :"learning REact"
        },
        {
            id:4,
            title:"My 4nd Post",
            datetime:"July 01,2021 11:17:36  AM",
            body :"Made a video about Tesla Q1 result"
        },
    ])
    const [search, setSearch]=useState('')
    const [searchResults,setSearchResults]=useState([])
    const [postTitle, setPostTitle]= useState('');
    const [postBody, setPostBody]= useState('');
    const navigate= useNavigate()

    useEffect(() => {
        const filteredResults = posts.filter((post)=>((post.body).toLowerCase()).includes(search.toLowerCase())
        || ((post.title).toLowerCase()).includes(search.toLowerCase()));

        setSearchResults(filteredResults.reverse());
    },[posts, search]) 


    const handleSubmit=(e)=>{
        e.preventDefault();
        const id=posts.length ? posts[posts.length - 1].id + 1 : 1;
        const datetime=format(new Date(),'MMMM dd,yyyy,pp');
        const newPost={ id, title:postTitle, datetime,
            body:postBody};
            const allPosts=[...posts, newPost];
            setPosts(allPosts);
            setPostTitle('');
            setPostBody('');
                  
    }

    const handleDelete=(id)=>{
        const postsList=posts.filter(post => post.id !== id);
        setPosts(postsList);
        navigate("/")
    }
    return ( 
        <div className = "App" > 
           <Header title="Social Media App" />
            <Nav 
                search={search}
                setSearch={setSearch}
                />
                <Routes>
                <Route path="/" element={<Home posts={searchResults}  />}/>
                
                <Route path="post">

                    <Route index element={<NewPost 
                    handleSubmit={handleSubmit}
                    postTitle={postTitle}
                    setPostTitle={setPostTitle}
                    postBody={postBody}
                    setPostBody={setPostBody}
                    />}/>
                    <Route path=":id" element ={<PostPage posts={posts} handleDelete={handleDelete}/>} />
                    </Route>
                
                <Route path="about" element={<About />} />

                <Route path="*" element={<Missing />} />           
                
                </Routes>
            <Footer /> 
        </div>
    );

}
export default App;