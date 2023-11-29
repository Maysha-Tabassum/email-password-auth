import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        setError('');
        setSuccess('');
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setError('please use at least 2 uppercase letters')
            return;
        }
        else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
            setError('please use at least 2 numbers')
            return;
        }
        else if (password.length < 6) {
            setError('please use at least 6 characters')
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedInUser = result.user
                console.log(loggedInUser);
                event.target.reset();
                setSuccess('User Loggedin Successfully.')

            })
            .catch(error => {
                console.error(error.message);
                setError(error.message)
            })
    }
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <h3>Plealse Login</h3>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <p><small>New to this website? Please <Link to='/register'>Register</Link></small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Login;