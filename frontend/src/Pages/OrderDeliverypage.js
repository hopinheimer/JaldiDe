import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Heading } from 'grommet';
import { Box } from 'grommet/components/Box';

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { currentOrders } from '../actions/deliveryActions';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import Countdown from 'react-countdown';
import { CircularProgress } from '@material-ui/core';

const Completionist = () => <div>Order is late! TIME UP!</div>;
const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    );
  }
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function OrderDeliverypage(props) {
  const deliverySignin = useSelector((state) => state.deliverySignin);
  const { deliveryInfo } = deliverySignin;

  const dispatch = useDispatch();
  const orderCurrent = useSelector((state) => state.orderCurrent);
  const { loading, orders, error } = orderCurrent;

  useEffect(() => {
    dispatch(currentOrders());
    return () => {
      //
    };
  }, []);

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return deliveryInfo && !loading ? (
    <div>
      {console.log(orders)}
      <Box round='medium' responsive='true' direction='column' pad='large'>
        <Heading margin='none' alignSelf='center' pad='small'>
          Welcome, {deliveryInfo.name}
        </Heading>
      </Box>

      <div className={classes.root}>
        <AppBar position='static' color='default' variant='fullWidth'>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
            variant='fullWidth'
            aria-label='full width tabs example'
          >
            <Tab label='Current Orders' {...a11yProps(0)} />
            <Tab label='All Orders' {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
          variant='fullWidth'
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            {/* Current Orders */}
            <List>
              {orders.map((order) => (
                // return(
                <div>
                  {console.log(new Date(order.time))}
                  <Divider />
                  <ListItem alignItems='flex-start' href='/'>
                    <ListItemText
                      primary={'Customer Name: ' + order.user}
                      secondary={
                        <React.Fragment>
                          <Typography variant='body2' color='textPrimary'>
                            Order ID : {order._id}
                          </Typography>
                          {/* 1000 = 1 sec */}
                          Time Left:{' '}
                          <Countdown
                            date={Date.parse(order.time) + 7200000}
                            renderer={renderer}
                          />
                        </React.Fragment>
                      }
                    />
                    <Button
                      variant='contained'
                      color='primary'
                      href={'/deliveryorder/' + order._id}
                    >
                      Details
                    </Button>
                  </ListItem>
                </div>

                // )
              ))}
            </List>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            {/* All Orders */}
          </TabPanel>
        </SwipeableViews>
      </div>
    </div>
  ) : (
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
  );
}
