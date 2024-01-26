import React from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {save} from "../service/productService";
import {useNavigate} from "react-router";
import * as Yup from 'yup';
import {NavLink} from "react-router-dom";


export function ProductCreate() {
    const navigate = useNavigate()
    return (
        <div>
            <h1>Create Product</h1>
            <NavLink className='btn btn-outline-primary m-2'  to='/'>List</NavLink>
            <Formik initialValues={{
                name: '',
                title: '',
                price: '',
                type_product_id_type:1
            }}
                    validationSchema={Yup.object({
                        title: Yup.string().required("không được để trống"),
                        price: Yup.number().required("không được để trống"),
                        name: Yup.string().required("không được để trống")
                    })}
                    onSubmit={(values) => {
                        const create = async () => {

                            await save(values)
                            alert('thành công')
                            navigate('/')
                        }
                        create()
                    }
                    }>
                <Form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ddd' }}>
                    <div className='mb-3'>
                        <label className="form-label" htmlFor="">Name</label>
                        <Field className="form-control border-2" type='text' name='name'/>
                        <ErrorMessage name='name' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                    </div>
                    <div className='mb-3'>
                        <label className="form-label" htmlFor="">Title</label>
                        <Field className="form-control" type='text' name='title'/>
                        <ErrorMessage name='title' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />


                    </div>
                    <div className='mb-3'>
                        <label className="form-label" htmlFor="">price</label>
                        <Field className="form-control" type='text' name='price'/>
                        <ErrorMessage name='price' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />

                    </div>
                    <button type='submit' className='btn btn-primary'>Submit</button>

                </Form>
            </Formik>
        </div>
    );
}

export default ProductCreate;