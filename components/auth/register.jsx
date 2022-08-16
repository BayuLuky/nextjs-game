import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Swal from "sweetalert2"
import { useRouter } from 'next/router'

const RegisterForm = (props) => {

    const router = useRouter()
    const formSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username tidak boleh kosong'),
        password: Yup.string()
            .required('Password tidak boleh kosong')
            .min(6, 'Password minimal 6 karakter'),
        fullname: Yup.string()
            .required('Fullname tidak boleh kosong'),
        email: Yup.string()
            .required('Email tidak boleh kosong'),
    })
    const validationOpt = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, reset, formState: { errors }} = useForm(validationOpt)

    const [btnSubmit, setBtnSubmit] = useState(false)

    const onFormSubmit = data => {
        setBtnSubmit(true)
        axios({
            url: `${process.env.NEXT_PUBLIC_APIURL}register`,
            method: 'POST',
            data, 
            headers: { 
                'Accept' : 'application/json',
                'Access-Control-Allow-Credentials' : true,
                'Access-Control-Allow-Origin' : '*'
            }
        }).then(response => {
            Swal.fire({
                title: "Berhasil ditambahkan",
                icon: "success",
                customClass: {
                    confirmButton: "btn btn-success"
                }
            }).then((result)=>{
                if (result.isConfirmed) {
                    setBtnSubmit(false)
                    router.push('/login')
                  }
            })
        }).catch(error => {
            Swal.fire({
                title: "Terjadi kesalahan!",
                icon: "error",
                customClass: {
                    confirmButton: "btn btn-success"
                }
            })
            setBtnSubmit(false)
        })
    }

    return (
    <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
            <div className="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
                <form className="form w-100" onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="text-center mb-10">
                        <h1 className="text-dark mb-3">Sign In</h1>
                    </div>
                    
                    <div className="fv-row mb-10">
                        <label className="form-label fs-6 fw-bolder text-dark">Fullname</label>
                        <input 
                            type="text" 
                            {...register('fullname')}
                            className={`form-control form-control-lg form-control-solid ${errors.fullname ? 'is-invalid' : ''}`}
                            placeholder="Your Fullname" />
                        <div className="invalid-feedback">{errors.fullname?.message}</div>
                    </div>
                    <div className="fv-row mb-10">
                        <label className="form-label fs-6 fw-bolder text-dark">Email</label>
                        <input 
                            type="text" 
                            {...register('email')}
                            className={`form-control form-control-lg form-control-solid ${errors.email ? 'is-invalid' : ''}`}
                            placeholder="Your Email" />
                        <div className="invalid-feedback">{errors.email?.message}</div>
                    </div>
                    <div className="fv-row mb-10">
                        <label className="form-label fs-6 fw-bolder text-dark">Username</label>
                        <input 
                            type="text" 
                            {...register('username')}
                            className={`form-control form-control-lg form-control-solid ${errors.username ? 'is-invalid' : ''}`}
                            placeholder="Your Username" />
                        <div className="invalid-feedback">{errors.username?.message}</div>
                    </div>

                    <div className="fv-row mb-10">
                        <div className="d-flex flex-stack mb-2">
                            <label className="form-label fw-bolder text-dark fs-6 mb-0">Password</label>
                        </div>
                        <input 
                            type="password" 
                            {...register('password')}
                            className={`form-control form-control-lg form-control-solid ${errors.password ? 'is-invalid' : ''}`}
                            placeholder="Your password" />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>
                    
                    <div className="text-center">
                        <button 
                            type="submit" 
                            className="btn btn-lg btn-primary w-100 mt-5" 
                            disabled={btnSubmit}
                            data-kt-indicator={btnSubmit ? 'on' : 'off'}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )

}

export default RegisterForm
