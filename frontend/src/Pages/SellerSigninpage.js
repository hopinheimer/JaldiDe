import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/sellerActions';
import SellerSteps from '../components/SellerSteps';
import TextField from '@material-ui/core/TextField';
import { CircularProgress } from '@material-ui/core';

export default function SellerSigninpage(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const sellerSignin = useSelector(state => state.sellerSignin);
    const { loading, sellerInfo, error } = sellerSignin;
    const dispatch = useDispatch();

    useEffect(() => 
    {
        if (sellerInfo) {
        props.history.push("/createshop/"+sellerInfo._id);
        }
        return () => {
        //
        };
    }, [sellerInfo]);

    const submitHandler = (e) => 
    {
        e.preventDefault();
        dispatch(signin(email, password));
    }

    return (
        <div>
            <SellerSteps step1 />
            <div className="form">
            <form onSubmit={submitHandler} >
            <ul className="form-container">
                <li>
                <h2>Seller Sign-In</h2>
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
                <button type="submit" className="button primary">Signin</button>
                </li>
                <li>
                New as a Seller on JaldiDe?
                </li>
                <li>
                <Link to="/seller/register" className="button secondary text-center" >Create your JaldiDe Seller account</Link>
                </li>
            </ul>
            </form>
        </div>
        </div>
    )
}
