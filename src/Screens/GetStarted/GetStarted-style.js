// import LoginGirlImg from '../../img/LoginGirl.png'
// import Styles from '../../app-style'
import { colors } from '../../Utils/Services';

export default {
  logoContainer: {
    padding:'15vh 32px 15vh 32px',
    textAlign: "center",
    zIndex:'1',    
  },
  logo: { width: "100%", zIndex:'1' },
  errorMessage: { color: colors.err },

  backImg: { 
    position: 'fixed',
    width: '100%',
    height: '100vh',
    //backgroundImage: 'url(https://www.pixelstalk.net/wp-content/uploads/2016/06/Dancing-Jump-Girls.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: '.75',
    top: '0',
    zIndex:'-1',
    
  },
  loginContainer:{
    padding:'0px 32px 0px 32px',
    position:'absolute' ,
    bottom:"15vh",
    left:0,
  },
width100:{
  width:'100%',
},
marginTB16:{margin:'8px 0px'}
 
};
