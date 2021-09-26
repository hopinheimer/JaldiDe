import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Shoppage from './Pages/Shoppage';
import Navstuff from './components/Navstuff';
import Cartpage from './Pages/Cartpage';
import Placeorderpage from './Pages/Placeorderpage';
import UserSigninpage from './Pages/UserSigninpage';
import UserRegisterpage from './Pages/UserRegisterpage';
import SellerSigninpage from './Pages/SellerSigninpage';
import SellerRegisterpage from './Pages/SellerRegisterpage';
import Sellerinventorypage from './Pages/Sellerinventorypage';
import Sellerproductspage from './Pages/Sellerproductspage';
// import Userorderpage from './Pages/Userorderpage';
import Shippingpage from './Pages/Shipping';
import OrderManagement from './Pages/OrderManagement';
import OrderInfo from './Pages/OrderInfo';
import DeliveryLoginpage from './Pages/DeliveryLoginpage';
import OrderDeliverypage from './Pages/OrderDeliverypage';
import OrderDeliverydetailspage from './Pages/OrderDeliverydetailspage';
function App() {
  return (
    <BrowserRouter>
      <div>
        <Navstuff />
        <Route path='/user/signin' component={UserSigninpage} />
        <Route path='/user/register' component={UserRegisterpage} />
        <Route path='/seller/signin' component={SellerSigninpage} />
        <Route path='/seller/register' component={SellerRegisterpage} />
        <Route path='/delivery/signin' component={DeliveryLoginpage} />
        <Route path='/deliveryorder/:id' component={OrderDeliverydetailspage} />
        <Route path='/' exact={true} component={Homepage} />
        <Route path='/shop/:id' component={Shoppage} />
        <Route path='/delivery' component={OrderDeliverypage} />
        <Route path='/cart/:id?' component={Cartpage} />
        <Route path='/user/shipping' component={Shippingpage} />
        <Route path='/user/placeorder' component={Placeorderpage} />
        <Route path='/createshop/:id' component={Sellerinventorypage} />
        <Route path='/addproducts/:id' component={Sellerproductspage} />

        {/* <Route path='/userorder/:id' component={Userorderpage} /> */}
        <Route path='/seller/orders/' component={OrderManagement} />
        <Route
          path='/seller/orderdetails/:id/:sellerid'
          component={OrderInfo}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
