
import Styles from '../../app-style'
import {colors} from '../../Utils/Services'
export default {
    displayViewContainer:{
        ...Styles.displayViewContainer
    },
    progressContainer:{
        listStyle: 'none',
        padding: 0,
        margin: '15px',
        paddingBottom: '100px'
    },
    chip:{backgroundColor:Styles.colorPrimary.color , color: Styles.colorWhite.color},
    progress:{
        position: 'relative',
        margin: '50px 0'
    },
    partitionLine:{
        position: 'absolute',
        width: '1px',
        height: '400px',
        backgroundColor: '#b4b4b4',
        left: '40px',
        top: '32px'
    },
    progressStats:{
        marginLeft: '50px'
    },
    label:{padding: '10px 0 0px', color: '#b4b4b4'},
    big:{
        fontSize: '1.3em',
        marginRight: '5px'
    },
    unit:{paddingBottom: '2px'},
    picContainer:{paddingLeft: '50px'},
    progressPics:{
        maxHeight: '150px',
        overflow: 'hidden',
        padding: '10px'
    },
    img:{width: '100px'},
    imgBig:{width: '80%'},
    fixed:{height: '100%', width:'100%', overflow: 'hidden'},
    header:{
        zIndex: 5,
      },
      textGreyO5:{
        color:colors.grey,
        opacity:0.5,
      },
      
    //textColorLable:{padding: '10px 0 0px',color:Styles.textGreyO5.color}
}