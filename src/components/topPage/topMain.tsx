import React, { FC, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Pager from '@material-ui/core/Paper';
import SerachIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
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
  const [keyword, setKeyword] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  }
  return (
    <div className={classes.background}>
      <Pager className={classes.pager}>
        <IconButton type="submit">
          <SerachIcon />
        </IconButton>
        <InputBase onChange={handleChange} placeholder="無料素材を検索" />
      </Pager>
    </div>

  );
}

export default TopMain;
