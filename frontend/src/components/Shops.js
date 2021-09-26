import React from 'react';

import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 250,
    minWidth: 250,
    minHeight: 450,
    maxHeight: 500,
    margin: 0,
    borderRadius: 6,
    padding: 12,
  },
  media: {
    borderRadius: 6,
  },
  gridContainer: {
    // paddingLeft:30,
    // paddingRight:30,
    // paddingTop: 50,
    padding: 20,
  },
}));

//export default class Shops extends Component {
export default function Shops(props) {
  //render() {
  const styles = useStyles();
  const mediaStyles = useFourThreeCardMediaStyles();
  const textCardContentStyles = useN04TextInfoContentStyles();
  const shadowStyles = useOverShadowStyles({ inactive: false });
  return (
    <div>
      <Grid container alignItems='center' justify='center'>
        {props.shops.map((shop) => {
          return (
            <div key={shop._id}>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                lg={3}
                xl={2}
                className={styles.gridContainer}
              >
                <Card
                  className={cx(styles.root, shadowStyles.root)}
                  onClick={(event) =>
                    (window.location.href = '/shop/' + shop._id)
                  }
                >
                  <CardMedia
                    className={cx(styles.media, mediaStyles.root)}
                    image={shop.image}
                    alt={''}
                  />
                  <CardContent>
                    <TextInfoContent
                      classes={textCardContentStyles}
                      overline={shop.category}
                      heading={shop.name}
                      body={shop.description}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </div>
          );
        })}
      </Grid>
    </div>
  );
}
//}
