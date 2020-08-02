import React, { FC, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import firebase from '../../firebase';
import { TitleData } from '../../types/types';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      width: "80%",
      textAlign: "center",
      marginTop: "2%",
    },
    titleImage: {
      height: "218px",
      width: "218px",
    }
  }),
);

const ImageItemList: FC = () => {
  const [data, setData] = useState<TitleData[]>([]);
  const { keyword } = useParams();
  const classes = useStyles();
  const history = useHistory();

  const getDate = async (searchWord: string | undefined) => {
    const db = firebase.firestore();
    const titleDataFef = db.collection("titleData");
    const searchedData = titleDataFef.where("keyword", "array-contains", searchWord);
    const snapShot = await searchedData.get();
    const temporaryData: object[] = [];
    snapShot.docs.map(doc => {
      temporaryData.push(doc.data());
    });
    setData(temporaryData as TitleData[]);
  }
  useEffect(() => {
    getDate(keyword);
  }, []);

  return (
    <div className={classes.root}>
      {data.map((title) => (
        <div>
          <Button onClick={() => history.push("/download/" + title.title)}>
            <img className={classes.titleImage} src={title.image} alt={title.title} />
          </Button>
          <h3>{title.title}</h3>
        </div>
      ))}
    </div>
  )
}

export default ImageItemList;
