
import Styles from '../../app-style'
export default{

//From App.Styles
  width:{...Styles.width80},
  err:{ ...Styles.err},
  displayView:{...Styles.displayViewContainer},
  marginTop16:{...Styles.marginTop16},
  gutter:{...Styles.gutter16},
  colorGrey:{...Styles.colorGrey},
  colorPrimary:{...Styles.colorPrimary},
  //Own
  buttonHighlight:{
    boxShadow: '0px 0px 5px 2px',
},

labelSelected:{
  borderBottom:'2px solid',
  borderColor: Styles.colorPrimary.color,
},
    displayNone:{
        display:'none',
    },
    padding5px:{padding:'5px'},
    marginTopBottom10px:{margin:'10px 0px 10px 0px'},
    
accordionDays :{borderRadius: '5px',maxwidth:'95vw',marginBottom:'10px',background:Styles.colorPrimary.color},
accordionMeals:{borderRadius: '5px',width:'95vw'},
//accordionDetailsPadding:{padding:'5px 8px 5px 8px'},
foodcontainer:{padding:'0px 15px 0px 10px'},

image: {
    position: "relative",
    display: "inline-block",
  },
  
  overlay :{
    position: "absolute",
    right: 0,
    zIndex: 5,
  },
  divider:{...Styles.divider},
  greyText:{...Styles.textGreyO5},
  whiteText:{...Styles.colorWhite},
}