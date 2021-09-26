import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/sellerActions';
import SellerSteps from '../components/SellerSteps';
import { CircularProgress } from '@material-ui/core';

export default function SellerRegisterpage(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [sphone, setPhone] = useState('');
  const sellerRegister = useSelector((state) => state.sellerRegister);
  const { loading, sellerInfo, error } = sellerRegister;
  const dispatch = useDispatch();

  useEffect(() => {
    if (sellerInfo) {
      props.history.push('/createshop/' + sellerInfo._id);
    }
    return () => {
      //
    };
  }, [sellerInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password, rePassword, sphone));
  };

  return (
    <div>
      <div>
        <SellerSteps step1 />
      </div>
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
              <label htmlFor='name'>Phone Number</label>
              <input
                type='name'
                name='sphone'
                id='sphone'
                onChange={(e) => setPhone(e.target.value)}
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
              Already have an account? <Link to='/seller/signin'>Sign-in</Link>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
