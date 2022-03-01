import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

const CreatePost = () => {

    const initialValues = {
        title: "",
        postText: "",
        username: ""
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required(),
        username: Yup.string().min(3).max(15).required()
    })

    const onSubmit = data => {
        axios.post("http://localhost:3030/posts", data).then(() => {
            console.log('IT WORKS')
        })
    }

    return (
        <div>
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
                    <div className='form_row form_row_btn'>
                        <button type="submit">Create Post</button>
                    </div>
                </Form>
            </Formik>
        </div >
    )
}

export default CreatePost