import Styles from '../../app-style'
import config from '../../json/commonConfig.json'
const BodyShapesSprite = `${config.URLs.S3BucketURL}/img/bodyShapesSprite.jpg`;
export default {
  backImg: {
    position: 'fixed',
    width: '100%',
    height: '100vh',
    backgroundImage: 'url("https://gsg-image-uploads.s3-accelerate.amazonaws.com/webcontent/img/SignInBG_mobile.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: '.6',
    top: '0',
  },
  colorGrey: { ...Styles.colorGrey, opacity: '0.5' },
  colorGreyOpacityOne: { opacity: '1', fontSize: '1.2rem' },
  colorGreyNO: { ...Styles.colorGrey },
  colorPrimary: { ...Styles.colorPrimary },
  signupContainer: {
    height: '90vh',
    ...Styles.gutter16,
  },
  marginTop16: { marginTop: "16px" },
  marginBottom16: {marginBottom: "16px"},
  width: { ...Styles.width100 },
  err: { ...Styles.err },
  displayView: { ...Styles.displayViewContainer,marginTop: '44px',overflow:'visible' }, 
  genderPaper: { borderRadius: '20px', height: '120px', width: '120px',margin:'12px' },
  dietPaper: { borderRadius: '20px', width: '100%', padding: '20px', height: '100px' },
  projectedProgressPaper: { borderRadius: '20px', height: '120px', width: '85px' },
  gutter: { ...Styles.gutter16 },
  special: { width: "5%", paddingRight: '1%', textAlign: 'inherit', marginTop: "30px" },
  countryContainer: { width: "17%" },
  mobileContainer: { width: "70%", },
  paperItems: { margin: '0px 0px 0px 0px', width: '80%', marginBottom: '20px' },
  questionHeight: { height: '60vh' },
  chipStyles: { fontWeight: 'bold', width: '100px', height: '40px' },
  arrowDown: { fontSize: '80px', ...Styles.colorPrimary, padding: '10px', margin: '-35px 0px -30px 0px' },
  paddingErr: { padding: '1px 16px 0px,0px' },
  divider:{...Styles.divider,width:"100%",marginTop:'8px'},
  shapeContainer:{zoom:1, width: '145px', height: '257px', backgroundImage: `url(${BodyShapesSprite})`, margin: '0 auto', position: 'relative'},
}