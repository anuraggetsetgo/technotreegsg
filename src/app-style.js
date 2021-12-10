import {colors} from './Utils/Services';

//let docHt = document.documentElement.clientHeight;
export default{
    colorWhite: {
      color: colors.secondary
    },
    colorPrimary:{
      color: colors.primary
    },
    colorGrey: {
      color: colors.grey
    },
    blackBG:{
      background: "#000"
    },
    greyBG:{
      background: '#111'
    },
    bgImg:{
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1
    },
    marginTop:{
      marginTop: '10px'
    },
    padding5:{
      padding: '5%'
    },
    padding10:{
      padding: '10%'
    },
    paddingRight5:{
      paddingRight: '5px'
    },
    spacingVertical:{
      padding: '100px 0'
    },
    lftTxt:{
      textAlign: 'left'
    },
    centerTxt:{
      textAlign: 'center'
    },
    fixed:{
      position: '-webkit-sticky',
      //position: 'sticky',
      top: 0
    },
    relative:{
      position: 'relative'
    },
    section01:{
      color: colors.secondary,
    },
    // section03:{
    //   background: `url(${homewo})`,
    //   backgroundSize: '100%',
    //   backgroundRepeat: 'none', 
    // },
    marginBottom: {
      marginBottom: '50px'
    },
    
    highestZ:{zIndex:1300},
    highZ:{zIndex: 1000},
    mediumZ:{zIndex:150},
    lowZ:{zIndex:100},
    lowestZ:{zIndex: -1},
    imgWidth:{
        width: '100%'
    },

    popup:{position: 'fixed', top: 0, left: 0, height: '100vh', paddingTop:'120px', width: '100%', background: '#000'},
    //form styles
    formFieldContainer: {height: '85px', overflow:'hidden', marginBottom: '10px'},
    whiteColor: {color: colors.secondary},
    blackColor: {color: colors.black},
    err: {color: colors.err},
    special: {display: 'inline-block', width: '5%', textAlign: 'center'},
    countryContainer:{display: 'inline-block', width: '15%'},
    mobileContainer: {display: 'inline-block', width: '75%'},
    ordersummarySuccessMsg: {marginBottom:'60px',marginTop:'100px'},
    
    

//primeColor:{backgroundColor: '#4d4dff'},

//////
margin10: {margin: '10px'},
marginBottom20:{marginBottom:'20px'},

header:{
  zIndex: 5,
},

headerHeight:{
  height:'44px',
},
displayViewContainer:{
  overflow:'scroll',
  marginTop: '6vh', //close to header as header Height
  height: `94vh`
},
textGrey:{
  color:colors.grey,
},
textGreyO5:{
  color:colors.grey,
  opacity:0.5,
},

gutter12:{
  padding:"0px 12px"
  },
gutter16:{
padding:"0px 16px",
},
gutter32:{
  padding:"0px 32px"
  },
marginTopBottom12:{margin:"12px 0"},
marginTop16:{marginTop:"16px"},
marginTop8:{marginTop:"8px"},
footer:{
  position: 'fixed',
  zIndex: 5,
  //padding: "0.3rem",
  background: 'rgba(255, 255, 255, 1)',
  bottom: '0',
  width: "100%",
  borderTop: '1px solid teal',
  maxheight:'20vh',
},
translucentContainer:{
  background: colors.translucentBG,
},
opacity80:{
  opacity:'.80'
},
width80:{
  width:'80vw',
},
width100:{
  width:'100%',
},

cursorPointer: { cursor: "pointer" },
userImageContainer:{width:'120px' , height:'120px', margin: 'auto' },
chipStyles:{ fontWeight: 'bold', width: '100px',height:'40px' },

divider:{ 
  fill:colors.grey,
  opacity:0.3,
  border:'0px solid',
},
}