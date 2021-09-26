import React from 'react';

const CheckoutSteps = (props) => {
  return (
    <div className='checkout-step'>
      <div className={props.step1 ? 'active' : ''}>Signin</div>
      <div className={props.step2 ? 'active' : ''}>Shipping</div>

      <div className={props.step3 ? 'active' : ''}>PlaceOrder</div>
    </div>
  );
};

export default CheckoutSteps;
