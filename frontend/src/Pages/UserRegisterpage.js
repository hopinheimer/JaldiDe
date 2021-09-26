import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { CircularProgress } from '@material-ui/core';

export default function UserRegisterpage(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      props.history.push('/user/signin?redirect=shipping');
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password, rePassword));
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
              <h2>Create Account</h2>
            </li>
            <li>
              {loading && (
                <div>
                  {/* Loading */}
                  <div style={{ padding: '80px' }}>
                    <CircularProgress
                      color='primary'
                      style={{ display: 'block', margin: 'auto' }}
                      size={40}
                    />
                  </div>
                </div>
              )}
              {error && <div>{error}</div>}
            </li>
            <li>
              <label htmlFor='name'>Name</label>
              <input
                type='name'
                name='name'
                id='name'
                onChange={(e) => setName(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                name='email'
                id='email'
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                name='password'
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor='rePassword'>Re-Enter Password</label>
              <input
                type='password'
                id='rePassword'
                name='rePassword'
                onChange={(e) => setRePassword(e.target.value)}
              ></input>
            </li>
            <li>
              <button type='submit' className='button primary'>
                Register
              </button>
            </li>
            <li>
              Already have an account?{' '}
              <Link
                to={redirect === '/' ? 'signin' : 'signin?redirect=' + redirect}
              >
                Sign-in
              </Link>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
