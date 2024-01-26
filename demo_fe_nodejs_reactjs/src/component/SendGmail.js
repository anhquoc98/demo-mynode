import React from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {sendGmail} from "../service/productService";
import {useNavigate} from "react-router";
import * as Yup from "yup";
import Swal from 'sweetalert2'

function SendGmail() {
    const navigate = useNavigate()
    return (
        <>
            <h1>Tạo tài khoản gmail</h1>
            <Formik initialValues={{
                email: '',
                password: ''
            }}
                    validationSchema={Yup.object({
                        email: Yup.string().required("không được để trống").email("nhập đúng email: abc@xxx.com"),
                        password: Yup.string().transform(value => value.toLowerCase()).required("không được để trống"),

                    })}
                    onSubmit={ async (values) => {
                           try{
                               await sendGmail(values)
                               Swal.fire({
                                   title: 'Thành công!',
                                   text: 'Đã gửi email thành công',
                                   icon: 'success'
                               })
                               navigate('/')
                           }catch (error) {
                               Swal.fire({
                                   title: 'Lỗi!',
                                   text: error.message,
                                   icon: 'error'
                               })
                           }

                    }}
            >
                <Form
                    style={{display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ddd'}}>
                    <div className='mb-3'>
                        <label className="form-label" htmlFor="">Email</label>
                        <Field className="form-control border-2" type='text' name='email'/>
                        <ErrorMessage name='email' render={msg => <div style={{color: 'red'}}>{msg}</div>}/>
                    </div>
                    <div className='mb-3'>
                        <label className="form-label" htmlFor="">Password</label>
                        <Field className="form-control" type='password' name='password'/>
                        <ErrorMessage name='password' render={msg => <div style={{color: 'red'}}>{msg}</div>}/>


                    </div>
                    <button type='submit' className='btn btn-primary'>Submit</button>

                </Form>
            </Formik>
        </>
    );
}

export default SendGmail;