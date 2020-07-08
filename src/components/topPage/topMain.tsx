import React, { FC } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Pager from '@material-ui/core/Paper';
import SerachIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import pencil from '../../assets/images/pencil.png';

const useStyle = makeStyles(() =>
  createStyles({
    background: {
      backgroundImage: `url(${pencil})`,
      backgroundSize: 'cover',
      height: '100vh',
    },
    pager: {
      position: 'relative',
      marginLeft: 'auto',
      marginRight: 'auto',
      top: '33%',
      width: '45%',
    }
  })
)

const TopMain: FC = () => {
  const classes = useStyle();
  return (
    <div className={classes.background}>
      <Pager className={classes.pager}>
        <IconButton type="submit">
          <SerachIcon />
        </IconButton>
      </Pager>
    </div>

  );
}

export default TopMain;
