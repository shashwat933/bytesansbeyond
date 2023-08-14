import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

const BlogDetails = () => {
    const navigate = useNavigate();
  
    const id = useParams().id;
    const [inputs, setInputs] = useState({

    })
    const getBlogDetail = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/blog/get-blog/${id}`);
            if (data && data.success) {
               
                setInputs({
                    title: data.blog.title,
                    description: data.blog.description,
                    image:data.blog.image
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getBlogDetail();


    }, [id])

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`http://localhost:8080/api/v1/blog/update-blog/${id}`,
                {
                    title: inputs.title,
                    description: inputs.description,
                    image: inputs.image,
                    user: id
                }

            )
            if (data && data.success) {
                toast.success('Blog updated');
                navigate('/my-blogs');
            }
        } catch (error) {
            console.log(error);
        }
    }
    const changeHandler = (e) => {
        setInputs(prevValue => (
            {
                ...prevValue,
                [e.target.name]: e.target.value
            }
        ))
    }
    return (
        <>
            <form className='laptop:hidden' onSubmit={submitHandler}>
                <Box width={'90%'}  padding={2} margin={'auto'}
                    boxShadow={'10px 10px 20px #ccc'} display={"flex"} flexDirection={'column'} marginTop={'30px'}
                >
                    <Typography variant='h3' textAlign={"center"} fontWeight={'bold'} padding={3} color={'gray'} >Edit Blog</Typography>
                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: 'bold' }}>Title</InputLabel>
                    <TextField placeholder='Enter the title' value={inputs.title} name="title" onChange={changeHandler} margin='normal' variant='outlined' required />
                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: 'bold' }}>Description</InputLabel>
                    
                    <TextField rows={4} multiline placeholder='Enter the description' value={inputs.description} name="description" onChange={changeHandler} margin='normal' variant='outlined' required />
                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: 'bold' }}>Image</InputLabel>
                    <TextField   placeholder='Enter the imageUrl' value={inputs.image} name="image" onChange={changeHandler} margin='normal' variant='outlined' required />
                    <Button type='submit' color='warning' variant='contained' sx={{ width: '50%', margin: '0 auto', height: "3rem", marginTop: "15px" }}  >Update</Button>


                </Box>


            </form>
            <form className='mobile1:hidden' onSubmit={submitHandler}>
                <Box width={'60%'} padding={2} margin={'auto'}
                    boxShadow={'10px 10px 20px #ccc'} display={"flex"} flexDirection={'column'} marginTop={'30px'}
                >
                    <Typography variant='h3' textAlign={"center"} fontWeight={'bold'} padding={3} color={'gray'} >Edit Blog</Typography>
                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: 'bold' }}>Title</InputLabel>
                    <TextField  placeholder='Enter the title' value={inputs.title} name="title" onChange={changeHandler} margin='normal' variant='outlined' required />
                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: 'bold' }}>Description</InputLabel>

                    <TextField rows={4} multiline placeholder='Enter the description' value={inputs.description} name="description" onChange={changeHandler} margin='normal' variant='outlined' required />
                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: 'bold' }}>Image</InputLabel>
                    <TextField placeholder='Enter the imageUrl' value={inputs.image} name="image" onChange={changeHandler} margin='normal' variant='outlined' required />
                    <Button type='submit' color='warning' variant='contained' sx={{ width: '50%', margin: '0 auto', height: "3rem", marginTop: "15px" }}  >Update</Button>


                </Box>


            </form>            

        </>
    )
}

export default BlogDetails