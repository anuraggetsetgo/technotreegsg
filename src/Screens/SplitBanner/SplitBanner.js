import React from "react";
import { Grid, makeStyles, Typography, useMediaQuery } from "@material-ui/core";
import BannerImg from "../../json/sideBannerConfig.json";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles(() => ({
  imageContainer: {
    position: "absolute",
    left: "550px",
    right: "0",
    // backgroundSize: 'cover',
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
    top: '35vh',
    left: '10%',
    bottom: '0',
    margin: 'auto',
    position: 'absolute',
    maxWidth: '350px',
    color: 'white'
  },
  title: {
    fontSize: '2rem'
  },
  subtitle: {
    marginTop: '-5px',
    fontSize: '1.3rem',
  },
  hashtag: {
    marginTop:  '20px',
    fontSize: '1rem',
    color: 'yellow'
  },
}));

const SplitBanner = () => {
  const classes = useStyles();
  const path = useLocation().pathname;
  const matches = useMediaQuery("(max-width: 830px)");

  const changePathImage = (path) => {
    
  }

  return (
    <Grid className={classes.imageContainer}>
      {path === "/" && (
        <Grid style={{ position: "relative" }}>
          <img
            src={BannerImg.default.image}
            className={classes.image}
            alt={BannerImg.default.title}
          />
          <Grid className={`${matches ? classes.noText : classes.bannerTextContainer}`}>
            <Typography className={classes.title}>
              {BannerImg.default.title}
            </Typography>
            <Typography className={classes.subtitle}>
              {BannerImg.default.subtitle}
            </Typography>
            <Typography className={classes.hashtag}>
              {BannerImg.default.hashtag}
            </Typography>
          </Grid>
        </Grid>
      )}
      {path.length > 1 && (
        <Grid style={{ position: "relative" }}>
          <img
            src={BannerImg.loginBanner.image}
            className={classes.image}
            alt={BannerImg.loginBanner.title}
          />
          <Grid className={`${matches ? classes.noText : classes.bannerTextContainer}`}>
            <Typography className={classes.title}>
              {BannerImg.loginBanner.title}
            </Typography>
            <Typography className={classes.subtitle}>
              {BannerImg.loginBanner.subtitle}
            </Typography>
            <Typography className={classes.hashtag}>
              {BannerImg.loginBanner.hashtag}
            </Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default SplitBanner;
