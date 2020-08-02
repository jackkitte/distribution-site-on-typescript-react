import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import firebase from '../firebase';
import TopHeader from '../components/topPage/topHeader';
import { TitleData } from '../types/types';

const useStyles = makeStyles(() =>
  createStyles({
    main: {
      textAlign: "center",
      marginTop: "5%",
    },
    titleImage: {
      height: "436px",
      width: "436px",
    }
  })
);

const DownloadPage: FC = () => {
  const { keyword } = useParams();
  const classes = useStyles();
  const [data, setData] = useState<TitleData[]>([]);

  const getDate = async (searchWord: string | undefined) => {
    const db = firebase.firestore();
    const titleDataFef = db.collection("titleData");
    const searchedData = titleDataFef.where("keyword", "array-contains", searchWord);
    const snapShot = await searchedData.get();
    const temporaryData: object[] = [];
    snapShot.docs.map(doc => {
      temporaryData.push(doc.data());
    })
    setData(temporaryData as TitleData[]);
  }
  useEffect(() => {
    getDate(keyword);
  }, []);

  const displayImage = () => {
    return (
      <div>
        {data.map((title) => (
          <div>
            <img className={classes.titleImage} src={title.image} alt={title.title} />
          </div>
        ))}
      </div>
    )
  }

  const downloadButton = () => {
    return (
      <div>
        {data.map((title) => (
          <Button variant="contained" href={title.downloadUrl}>
            無料ダウンロード
          </Button>
        ))}
      </div>
    )
  }

  return (
    <div>
      <TopHeader />
      <div className={classes.main}>
        {displayImage()}
        {downloadButton()}
      </div>
    </div>
  )
}

export default DownloadPage;