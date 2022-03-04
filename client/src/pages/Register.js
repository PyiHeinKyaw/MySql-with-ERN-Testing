import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Register = () => {

    const history = useHistory()

    const initialValues = {
        username: "",
        password: "",
        confirm_password: ""

    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).required(),
        password: Yup.string().min(6).required(),
        confirm_password: Yup.string().oneOf(
            [Yup.ref('password'), null], 'Passwords must match'
        )
    })

    const onSubmit = data => {
        axios.post("http://localhost:3030/auth/", data).then((response) => {
            if (response.data.error) {
                alert(response.data.error)
            }
            else {
                alert("Registration complete! Have fun here")
                history.push('/login')
            }
        })
    }

    return (
        <>
            <h1 className='page_name'>Register</h1>
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

                    <div className='form_row'>
                        <label>Confirm Password: </label>
                        <Field
                            autoComplete="off"
                            name="confirm_password"
                            placeholder="(Ex. Re-Type Your Password...)"
                            className="custom_input"
                            type="password"
                        />
                    </div>
                    <ErrorMessage name="confirm_password" component="div" className='error_row' />

                    <div className='form_row form_row_btn'>
                        <button type="submit">Register</button>
                    </div>
                </Form>
            </Formik>
        </>
    )
}

export default Register