import React, { useContext, useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../helpers/AuthContext'

const CreatePost = () => {

    let history = useHistory()

    const { authState } = useContext(AuthContext)

    useEffect(() => {
        if (!authState.status) {
            history.push('/login')
        }
    }, []);

    const initialValues = {
        title: "",
        postText: "",
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required(),
    })

    const onSubmit = data => {
        axios.post("http://localhost:3030/posts", data, {
            headers: { accessToken: localStorage.getItem("accessToken") }
        }).then((response) => {
            history.push('/')
        })
    }

    return (
        <>
            <h1 className='page_name'>Add New Post</h1>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                    <div className='form_row'>
                        <label>Title: </label>
                        <Field
                            autoComplete="off"
                            id="inputCreatePost"
                            name="title"
                            placeholder="(Ex. Title...)"
                            className="custom_input"
                        />
                    </div>
                    <ErrorMessage name="title" component="div" className='error_row' />
                    <div className='form_row'>
                        <label>Post: </label>
                        <Field
                            autoComplete="off"
                            id="inputCreatePost"
                            name="postText"
                            placeholder="(Ex. Content...)"
                            className="custom_input"
                        />
                    </div>
                    <ErrorMessage name="postText" component="div" className='error_row' />
                    <div className='form_row form_row_btn'>
                        <button type="submit">Create Post</button>
                    </div>
                </Form>
            </Formik>
        </>
    )
}

export default CreatePost