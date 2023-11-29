import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);


const Register = () => {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (event) => {
        //1. prevent page refresh
        event.preventDefault();
        setError('');
        setSuccess('');

        //2. collect form data
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password)

        //3. validation
        if (!/(?=.*[A-Z])/.test(password)) {
            setError('please add at least one uppercase')
            return;
        }
        else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
            setError('please add at least two numbers')
            return;
        }
        else if (password.length < 6) {
            setError('please add least 6 characters in your password')
            return;
        }

        //4. create user in fb
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                event.target.reset();
                setSuccess('User has been created Successfully');
                emailVerification(result.user);

            })
            .catch(error => {
                console.error(error.message)
                setError(error.message)
            })
    }
    const emailVerification = (user) => {
        sendEmailVerification(user)
            .then(result => {
                console.log(result);
                alert('Please verify your email address.')
            })
    }

    const handleEmailChange = (event) => {
        // console.log(event.target.value);
        // setEmail(event.target.value)
    }

    const handlePasswordBlur = (event) => {
        console.log(event.target.value);
    }

    return (
        <div className='w-80 mx-auto'>
            <h3 className='mt-4'>Please Register.</h3>
            <form onSubmit={handleSubmit} action="">
                <input className='w-50 mb-4 rounded ps-2' onChange={handleEmailChange} type="email" name="email" id="email" placeholder='Your Email' required />
                <br />
                <input className='w-50 mb-4 rounded ps-2' onBlur={handlePasswordBlur} type="password" name="password" id="password" placeholder='Your Password' required />
                <br />
                <input className='btn btn-primary' type="submit" value="Register" />
            </form>
            <p><small>Already have an account? Please <Link to='/login'>Login</Link></small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Register;