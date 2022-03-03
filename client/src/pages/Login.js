import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Login = () => {

    const history = useHistory()

    const initialValues = {
        username: "",
        password: "",
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).required(),
        password: Yup.string().min(6).required(),
    })

    const onSubmit = data => {
        axios.post("http://localhost:3030/auth/login", data).then((response) => {
            console.log(response)
        })
    }

    return (
        <>
            <h1 className='page_name'>Login</h1>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                    <div className='form_row'>
                        <label>Username: </label>
                        <Field
                            autoComplete="off"
                            id="inputCreatePost"
                            name="username"
                            placeholder="(Ex. John...)"
                            className="custom_input"
                        />
                    </div>
                    <ErrorMessage name="username" component="div" className='error_row' />
                    <div className='form_row'>
                        <label>Password: </label>
                        <Field
                            autoComplete="off"
                            id="inputCreatePost"
                            name="password"
                            placeholder="(Ex. Your Password...)"
                            className="custom_input"
                            type="password"
                        />
                    </div>
                    <ErrorMessage name="password" component="div" className='error_row' />

                    <div className='form_row form_row_btn'>
                        <button type="submit">Login</button>
                    </div>
                </Form>
            </Formik></>
    )
}

export default Login