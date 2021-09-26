import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/deliveryActions';
import TextField from '@material-ui/core/TextField';
import { CircularProgress } from '@material-ui/core';

export default function DeliveryLoginpage(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const deliverySignin = useSelector((state) => state.deliverySignin);
  const { loading, deliveryInfo, error } = deliverySignin;
  const dispatch = useDispatch();

  useEffect(() => {
    if (deliveryInfo) {
      props.history.push('/delivery');
    }
    return () => {
      //
    };
  }, [deliveryInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  return (
    <div>
      <div className='form'>
        <form onSubmit={submitHandler}>
          <ul className='form-container'>
            <li>
              <h2>Delivery Sign-In</h2>
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
          </ul>
        </form>
      </div>
    </div>
  );
}
