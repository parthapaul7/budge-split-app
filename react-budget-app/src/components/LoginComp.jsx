import React, { useState,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const LoginForm =({getLogin})=> {
    const {dispatch} = useContext(AppContext);
    const [form, setForm] = useState({});
    const navigate = useNavigate();
     
    const handleChange = (e) => {
        if(e.target.name === 'user') setForm({...form, username: e.target.value})
        if(e.target.name === 'pass') setForm({...form, password: e.target.value})
        console.log(form)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await getLogin(form.username, form.password)
        console.log(data)
        if(!data?.access) return alert('Invalid Credentials')
        localStorage.setItem('access', data.access)
        dispatch({type: 'SET_LOGGED_IN', payload: data.access})
        navigate('/')

    }

  return (
    <Form>
        <Form.Group className="mb-4">
          <Form.Label htmlhtmlFor="email" >Username</Form.Label>
          <Form.Control id="email" type='text' onChange={handleChange} vlaue={form.user} name="user" placeholder="Username" />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label htmlhtmlFor="pass" >Password</Form.Label>
          <Form.Control id="pass" type='password' onChange={handleChange} value={form.pass} name="pass" placeholder="Username" />
        </Form.Group>
        <Button type="submit" className='d-block mx-auto btn-success w-50' onClick={handleSubmit}>Login</Button>
    </Form>
  );
}

export default LoginForm;
