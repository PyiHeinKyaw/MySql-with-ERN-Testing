import React, { useContext } from 'react'
import { AuthContext } from '../../helpers/AuthContext'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Login = () => {

    const history = useHistory()
    const { setAuthState } = useContext(AuthContext)

    const initialValues = {
        username: "",
        password: "",
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().trim().min(3).required(),
        password: Yup.string().min(6).required(),
    })

    const onSubmit = data => {
        axios.post("http://localhost:3030/auth/login", data).then((response) => {
            if (response.data.error) {
                setAuthState({ username: "", id: 0, status: false })
                alert(response.data.error)
            }
            else {
                localStorage.setItem("accessToken", response.data.token)
                setAuthState({ username: response.data.username, id: response.data, status: true })
                history.push('/')
            }
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
                            name="password"
                            placeholder="(Ex. Your Password...)"
                            className="custom_input"
                            type="password"
                        />
                    </div>
                    <ErrorMessage name="password" component="div" className='error_row' />

                    <div className='form_row form_row_btn'>
                        <button type="submit">Submit</button>
                    </div>
                </Form>
            </Formik></>
    )
}

export default Login