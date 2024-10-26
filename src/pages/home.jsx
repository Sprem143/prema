import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import '../App.css'
import { useState, useEffect } from 'react';
export default function Home(){

    const [name,setName]=useState('');
    const [post,setPost]=useState('');
    const [savedPost,setSavedPost]= useState([{}]);

    useEffect(()=>{
        fetchposts();
    },[])
    const fetchposts=async()=>{
      const result=  await axios.get('https://prema-backend.onrender.com')
        .then(console.log("All post fetched successfully"))
        .catch((err)=>{
            console.log(err);
        })
        console.log(result)
        setSavedPost(result.data)
    }
    const savepost=async()=>{
        try{
      let result= await axios.post('https://prema-backend.onrender.com', {name:name,post:post},{
        headers:{
            'Content-Type':'application/json'
        }
      })
     alert(result.data);
     window.location.reload();
        }catch(err){
            console.log(err);
            alert("Error while saving Post")
        }
    }
    return(
        <>
        <div className="formContainer mt-4">
        <Form className='postform p-4'>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name</Form.Label>
        <Form.Control type="Name" placeholder="Prema" onChange={(e)=>setName(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Post</Form.Label>
        <Form.Control as="textarea" rows={3} onChange={(e)=>setPost(e.target.value)} />
      </Form.Group>
      <Button variant='info' className='ps-3 pe-3' onClick={savepost}>Submit</Button>
    </Form>

        </div>

        <ul>
            {
                savedPost.map((post)=>(
                    <li className='text-white'>{post.name} : {post.post}</li>
                ))
            }
        </ul>
          
        </>
    )
}