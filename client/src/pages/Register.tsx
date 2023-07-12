import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { REGISTER_USER } from "../Queries/index"; 
import { Paper, TextField } from '@material-ui/core';


interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [registerUser] = useMutation<{ registerUser: User }>(REGISTER_USER);

  const handleSignUp = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
        const response = await registerUser({
            variables: {
                name,
                email,
                password,
            },
        });

        const user = response.data?.registerUser;
        if (user) {
            alert("User Created Succussfully...!")
            console.log('User registered:', user);

        }
    } catch (error) {
        console.error('Registration error:', error);
    }
};


  return (
          <div className="app-container">
              <Paper className="paper" elevation={3}>
                  <h2>SIGN UP</h2>
                  <TextField
                      className='textfield'
                      required
                      variant="outlined"
                      id="outlined-required"
                      label="User Name"
                      onChange={(e) => { setName(e.target.value) }}
                  />
                  <TextField
                      className='textfield'
                      required
                      variant="outlined"
                      id="outlined-required"
                      label="Email"
                      margin='normal'
                      onChange={(e) => { setEmail(e.target.value) }}
                  />
                  <TextField
                      className='textfield'
                      id="outlined-password-input"
                      label="Password"
                      variant="outlined"
                      type="password"
                      margin='normal'
                      autoComplete="current-password"
                      onChange={(e) => { setPassword(e.target.value) }}
                  />
                  <button className='button' style={{ margin: '20px' }} onClick={handleSignUp}>SignUp</button>
                  <br></br>
                  <p>If having Account  <a href="/"> SignIn Here</a></p>
              </Paper>

          </div>
  );
};

export default RegisterForm;

