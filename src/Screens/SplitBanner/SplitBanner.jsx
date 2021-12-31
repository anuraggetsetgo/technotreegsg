import React, { useEffect, useState } from "react";
import { Grid, makeStyles, Typography, useMediaQuery } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import Splash from "../Splash/Splash";
import axios from "axios";
import PreloadImage from "../../Utils/Preloadimg";
const useStyles = makeStyles(() => ({
  imageContainer: {
    position: "absolute",
    left: "550px",
    right: "0",
    top: "0",
    bottom: "0",
    height: "100vh",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100vh",
    objectFit: "cover",
  },
  noText: {
    display: "block",
  },
  bannerTextContainer: {
    top: "35vh",
    left: "10%",
    bottom: "0",
    margin: "auto",
    position: "absolute",
    maxWidth: "350px",
    color: "white",
  },
  title: {
    fontSize: "2.2rem",
  },
  subtitle: {
    marginTop: "-5px",
    fontSize: "1.5rem",
  },
  hashtag: {
    marginTop: "20px",
    fontSize: "1.2rem",
    color: "yellow",
  },
}));

const SplitBanner = () => {
  const classes = useStyles();
  const localData = JSON.parse(window.localStorage.getItem("bannerData"));
  const [filterData, setFilterData] = useState(localData);
  const [isLoading, setIsLoading] = useState(false);
  const path = useLocation().pathname;
  // console.log(path);
  const matches = useMediaQuery("(max-width: 830px)");

  const getBannerImg = () => {
    setIsLoading(true)
    fetch(
      "https://api.getsetgo.fitness/base_ind/API/v1/get-corporate-promotions"
    )
      .then((res) => res.json())
      .then((json) => {
        window.localStorage.setItem("bannerData", JSON.stringify(json));
        setIsLoading(false);
      }).catch((err) => {
        setIsLoading(true)
      })
  };

  const filterImage = () => {
    const tempData = localData && localData.filter((img) => {
      return img.route === path;
    });
    setFilterData(tempData && (tempData.length ? tempData : [localData[0]]));
    // console.log([localData[0]])
  };

  useEffect(() => {
    getBannerImg();
  }, []);

  useEffect(() => {
    filterImage();
    if (path === "/logout") {
      localStorage.removeItem("bannerData");
      getBannerImg();
    }
  }, [path, isLoading]);

  return isLoading ? (
    <>
      <Splash />
    </>
  ) : (
    <Grid className={classes.imageContainer}>
      {filterData && filterData.map((bannerimg) => (
        <Grid key={bannerimg.route} style={{ position: "relative" }}>
          <PreloadImage src={bannerimg.image} className={classes.image}></PreloadImage>
          {/* <img src={bannerimg.image} className={classes.image} alt={bannerimg.title} > </img> */}
          <Grid
            className={`${matches ? classes.noText : classes.bannerTextContainer
              }`}
          >
            <Typography className={classes.title}>{bannerimg.title}</Typography>
            <Typography className={classes.subtitle}>
              {bannerimg.subtitle}
            </Typography>
            <Typography className={classes.hashtag}>
              {bannerimg.hashtag}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default SplitBanner;
