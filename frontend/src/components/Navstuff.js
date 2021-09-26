import React, { useEffect } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import image from '../img/logo2.webp';
import { useSelector } from 'react-redux';
import { Cart } from 'grommet-icons';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Cookie from 'js-cookie';
import IconButton from '@material-ui/core/IconButton';

import ReactGA from 'react-ga';
import { withRouter } from 'react-router-dom';

ReactGA.initialize('UA-177931070-1');

function Navstuff(props) {
  //Google Analytics
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  });

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const sellerSignin = useSelector((state) => state.sellerSignin);
  const { sellerInfo } = sellerSignin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const logout = () => {
    Cookie.set('userInfo', null);
    Cookie.set('sellerInfo', null);
    Cookie.set('cartItems', null);
  };

  const login = () => {
    if (sellerInfo || userInfo) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div style={{ position: 'sticky', top: '0', zIndex: '99999' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: '2vh',
          position: '',
          justifyContent: 'space-around',
          backgroundColor: '#ffce7f',
          alignContent: 'center',
          fontWeight: '200',
        }}
      >
        <div style={{ fontSize: '1.5vh' }}>2 Hours Delivery </div>

        <div style={{ fontSize: '1.5vh' }}>Your Local Stores now Online</div>
        <div style={{ fontSize: '1.5vh' }}>+91 7874517814</div>
      </div>

      <Navbar bg='white' variant='light' expand='lg'>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Brand href='/'>
          <img
            alt=''
            src={image}
            width='175'
            height='70'
            className='d-inline-block align-top'
          />
        </Navbar.Brand>

        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            {'  '}
            {sellerInfo ? (
              <>
                <Nav.Link href='/seller/signin'>Manage Inventory</Nav.Link>
                <Nav.Link href='/seller/orders'>Manage Orders</Nav.Link>
              </>
            ) : (
                <Nav.Link href='/seller/register'>Create Your Own Shop</Nav.Link>
              )}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className='justify-content-end'>
          {userInfo || sellerInfo ? (
            console.log('hi')
          ) : (
              <Button href='/user/register'>sign up</Button>

              // <Link to='/users/signin'>Sign In</Link>
            )}{' '}
          {userInfo || sellerInfo ? (
            <>
              <h5>
                {' '}
                Hi,{!sellerInfo ? <>{userInfo.name}</> : <>{sellerInfo.name}</>}
              </h5>
              <Button
                onClick={logout}
                href='/'
                variant='outlined'
                style={{ margin: 20 }}
              >
                Logout
              </Button>
            </>
          ) : (
              <Dropdown drop='down' margin='20'>
                <Dropdown.Toggle variant='success' id='collasible-nav-dropdown'>
                  Sign In
              </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href='/seller/signin'>Seller</Dropdown.Item>
                  <Dropdown.Item href='/user/signin'>User</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}{' '}
          {sellerInfo ? <div></div> : <div></div>}
        </Navbar.Collapse>
        <Link to='/cart'>
          <IconButton>
            <Badge badgeContent={cartItems.length} color='secondary'>
              {' '}
              <Cart></Cart>
            </Badge>
          </IconButton>
        </Link>
      </Navbar>
    </div>
  );
}

export default withRouter(Navstuff);
