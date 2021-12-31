// import LoginGirlImg from '../../img/LoginGirl.png'
// import Styles from '../../app-style'
import { colors } from '../../Utils/Services';
// import WelcomeScreen from '../../img/WelcomeScreen.png'


export default {
  
  logoContainer: {
    padding:'15vh 32px 15vh 32px',
    textAlign: "center",
    zIndex:'1',    
  },
  logo: { maxWidth: "100%", zIndex:'1' },
  errorMessage: { color: colors.err },

  backImg: { 
    position: 'absolute',
    width: '100%',
    height: '100%',
    // backgroundImage: 'url(https://www.pixelstalk.net/wp-content/uploads/2016/06/Dancing-Jump-Girls.jpg)',
    // backgroundImage: `url(${WelcomeScreen})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: '.75',
    top: '0',
    left: '0',
    zIndex:'-1',
    // objectFit: 'cover',
  },
  loginContainer:{
    padding:'0px 32px 0px 32px',
    marginTop: '15vh'
    // position:'absolute' ,
    // bottom:"15vh",
    // left: 0,
  },
width100:{
  width:'100%',
  marginLeft: '0'
},
marginTB16:{margin:'8px 0px'}
 
};
