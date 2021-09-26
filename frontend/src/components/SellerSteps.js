import React from 'react';

const SellerSteps = (props) => {
  return (
    <div className='checkout-step'>
      <div className={props.step1 ? 'active' : ''}>Signup as Seller</div>
      <div className={props.step2 ? 'active' : ''}>Create your Shop </div>
      <div className={props.step3 ? 'active' : ''}>Manage Products</div>
    </div>
  );
};

export default SellerSteps;
