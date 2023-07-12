import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useNavigate } from 'react-router-dom';
import { LOGIN_USER } from "../Queries/index";
import { Paper, TextField } from '@material-ui/core';
import './Login.css'
import { useAuth } from '../auth/AuthContext';

interface User {
    id: string;
    name: string;
    email: string;
    token: string;
}

const LoginForm: React.FC = () => {
    const [LoginUser] = useMutation<{ LoginUser: User }>(LOGIN_USER);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { handleLogin } = useAuth();

    const handleSignIn = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            const response = await LoginUser({
                variables: {
                    email,
                    password,
                },
            });
            const token = response.data?.LoginUser.token;
            if (token) {
                alert('User Logged In Successfully!');
                handleLogin(token);
                navigate('/home');
              }
        } catch (error) {
            //eslint-disable-next-line no-console
            console.error('Login error:', error); 
        }
    };

    
    // const handleForget = ({ email }: { email: string }) => {
    //     console.log({ email });
    // };

    // const logoComponent: React.ReactNode = React.Children.only(
    //     <>
    //     <img
    //       src="https://images.carriercms.com/image/upload/h_150,q_100,f_auto/v1573562016/common/logos/carrier-corp-logo.png"
    //       alt="Logo"
    //       height="120px"
    //     />
    //     </>
    //   );

    return (
        <>
            <div className="app-container">
                <Paper className="paper" elevation={3}>
                    <h2>SIGN IN</h2>

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
                    <button className='button' style={{ margin: '20px' }} onClick={handleSignIn}>SignIn</button>
                    <br></br>
                    <p>If not having Account  <a href="/register"> SignUp Here</a></p>
                </Paper>

            </div>

            {/* <DialogAuth
                hideTabs
                open={true}
                // logoComponent={logoComponent}
                textFieldVariant="outlined"
                onClose={() => { }}
                handleSignUp={handleSignUp}
                handleForget={handleForget}
                handleSignIn={handleSignIn}
                handleSocial={{
                    Linkedin: () => { },
                    Github: () => { },
                    Facebook: () => { },
                    Google: () => { }
                }}
            /> */}
        </>
    );
};


export default LoginForm;





