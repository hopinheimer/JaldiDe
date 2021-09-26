import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';
import TextField from '@material-ui/core/TextField';
import CheckoutSteps from '../components/CheckoutSteps';
import { CircularProgress } from '@material-ui/core';

export default function UserSigninpage(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  return (
    <div>
      {redirect === 'shipping' ? (
        <CheckoutSteps step1></CheckoutSteps>
      ) : (
        console.log('hi')
      )}

      <div className='form'>
        <form onSubmit={submitHandler}>
          <ul className='form-container'>
            <li>
              <h3>User Sign-In</h3>
            </li>
            <li>
              {loading && <div>
                {/* Loading */}
                <div style={{padding:'80px'}}>
                <CircularProgress color='primary' style={{display: "block", margin:"auto"}} size={40}/>
                </div>
              </div>}
              {error && <div>{error}</div>}
            </li>
            <li>
              <TextField
                required
                name='email'
                id='email'
                label='Email'
                defaultValue=''
                variant='outlined'
                onChange={(e) => setEmail(e.target.value)}
              />
            </li>
            <li>
              <TextField
                required
                type='password'
                id='password'
                name='password'
                onChange={(e) => setPassword(e.target.value)}
                label='Password'
                defaultValue=''
                variant='outlined'
              />
            </li>
            <li>
              <button type='submit' className='button primary'>
                Signin
              </button>
            </li>
            <li>New to JaldiDe?</li>
            <li>
              <Link
                to={
                  redirect === '/'
                    ? 'register'
                    : 'register?redirect=' + redirect
                }
                className='button secondary text-center'
              >
                Create your JaldiDe account
              </Link>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
