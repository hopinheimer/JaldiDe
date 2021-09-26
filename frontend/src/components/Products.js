import React from 'react';
//import { ProductCard } from 'react-ui-cards';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import cx from 'clsx';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 280,
    minWidth: 280,
    maxHeight: 400,
    minHeight: 420,
    padding: 12,
    borderRadius: 12,
  },
  media: {
    height: 190,
    borderRadius: 6,
  },
  gridContainer: {
    // paddingLeft:30,
    // paddingRight:30,
    // paddingTop: 50,
    padding: 20,
  },
  deco: {
    display: 'block',
  },
}));

export default function Products(props) {
  const styles = useStyles();
  // const classes = useStyles();
  const items = props.data;
  const shadowStyles = useOverShadowStyles({ inactive: false });
  const mediaStyles = useFourThreeCardMediaStyles();

  // const handleAddToCart = () => {
  //   props.history.push('/cart/');
  // };

  if (items) {
    return (
      <div className='card-container'>
        <Grid container alignItems='center' justify='center'>
          {props.data.map((product) => {
            return (
              <div key={product._id}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  lg={3}
                  xl={2}
                  className={styles.gridContainer}
                >
                  <Card className={cx(styles.root, shadowStyles.root)}>
                    <CardActionArea>
                      <CardMedia
                        className={cx(styles.media, mediaStyles.root)}
                        image={product.image}
                        title={product.pname}
                      />
                      <CardContent>
                        <Typography gutterBottom variant='h5' component='h2'>
                          {product.pname}
                        </Typography>
                        <Typography
                          variant='body2'
                          color='textSecondary'
                          component='p'
                        >
                          {product.pdesc}
                        </Typography>
                        <Typography gutterBottom variant='h6' component='p'>
                          Rs. {product.pprice}
                        </Typography>
                      </CardContent>
                    </CardActionArea>

                    <div>
                      <CardActions className={styles.deco}>
                        <Button
                          variant='outlined'
                          size='medium'
                          color='primary'
                          href={'/cart/' + props.id + '?product=' + product._id}
                        >
                          + Cart
                        </Button>
                        {/* <ButtonGroup
                    size="small"
                    variant="text"
                    color="primary"
                    aria-label="text primary button group"
                  >
                    
                    <Button>-1</Button>
                    <Button></Button>
                    <Button>+1</Button>
                  </ButtonGroup> */}
                      </CardActions>
                    </div>
                  </Card>
                </Grid>
              </div>
            );
          })}
        </Grid>
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
}
