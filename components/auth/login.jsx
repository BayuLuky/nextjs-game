import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Swal from "sweetalert2";
import { useRouter } from 'next/router';

const LoginForm = (props) => {
    
    const router = useRouter()
    const formSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username tidak boleh kosong'),
        password: Yup.string()
            .required('Password tidak boleh kosong')
            .min(6, 'Password minimal 6 karakter'),
    })
    const validationOpt = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, reset, formState: { errors }} = useForm(validationOpt)

    const [btnSubmit, setBtnSubmit] = useState(false)

    const onFormSubmit = data => {
        setBtnSubmit(true)
        axios({
            url: `${process.env.NEXT_PUBLIC_APIURL}login`,
            method: 'POST',
            data, 
            headers: { 
                'Accept' : 'application/json',
                'Access-Control-Allow-Credentials' : true,
                'Access-Control-Allow-Origin' : '*'
            }
        }).then(response => {
            setBtnSubmit(false)
            if(response.status === 200) {
                const dataUser = response.data.data
                const user = {
                    id: dataUser.id,
                    name: dataUser.fullname,
                    email: dataUser.email,
                    username: dataUser.username
                }
                
                const accessToken = response.data.data.accessToken
                
                console.log('dat',accessToken)
                window.localStorage.setItem('game_identifier', response.data.data.accessToken)
                if(props.setReduxStore) {
                    props.setReduxStore(user, accessToken, true)
                }

                router.push('/home')
            }
        }).catch(error => {
            Swal.fire({
                title: "Username atau Password salah!!!",
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

export default LoginForm
