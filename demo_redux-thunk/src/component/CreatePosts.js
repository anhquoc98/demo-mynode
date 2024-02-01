import React from 'react';
import {Field, Form, Formik} from "formik";
import * as postsService from "../service/postsService";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {createPosts} from "../redux/action/posts";

function PostsCreate() {
    let navigate = useNavigate()
    let dispatch=useDispatch();
    return (
        <>
            <Formik initialValues={{
                title: '',
                slug: '',
                category: '',
                thumbnail_url: ''
            }}
                    onSubmit={async (values) => {
                       dispatch(createPosts(values))
                        alert('create success')
                        navigate('/')
                    }
                    }>
                <Form className='container w-50'>
                    <h2 style={{textAlign: 'center'}}>Create New Posts</h2>
                    <div className='mb-3 '>
                        <label htmlFor="title">Title</label>
                        <Field type='text' className='form-control' name='title'/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="slug">Slug</label>
                        <Field type='text' className='form-control' name='slug'/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="category">Category</label>
                        <Field type='text' className='form-control' name='category'/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="thumbnail_url">Thumbnail_url</label>
                        <Field type='text' className='form-control' name='thumbnail_url'/>
                    </div>
                    <div style={{textAlignLast:"center"}}>
                        <button className='btn btn-primary' >Create</button>

                    </div>
                </Form>
            </Formik>
        </>
    );
}

export default PostsCreate;