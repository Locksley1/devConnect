import React, {Fragment, useState} from 'react'
import {Link} from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const email = formData.email;
    const password = formData.password;

    const onChange = event => setFormData({
        ...formData,
        [event.target.name]: event.target.value
    });

    const onSubmit = async event => {
        event.preventDefault();
        console.log('SUCCESS');
    }
     
    return (
        <Fragment>
            <h1 className="large text-primary">Login</h1>
            <p className="lead"><i className="fas fa-user"></i> Login To Your Account</p>
            <form className="form" onSubmit={event => onSubmit(event)}>
                <div className="form-group">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email" 
                        value={email} 
                        onChange={event => onChange(event)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={password} 
                        onChange={event => onChange(event)} 
                        required
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">Don't have an account? <Link to="/register">Register</Link></p>
        </Fragment>
    )
}

export default Login
