
import React,{useState} from 'react'
import { Button, Grid, Typography, Paper, Card, CardHeader, Avatar, CardMedia, CardContent } from '@material-ui/core';
import IMG_Meal from '../../img/meal.png';
//import Styles from './Meal-Style'
import { makeStyles } from '@material-ui/core/styles';
import MealTable from './Meal-Table'

const eggMealImage= 'https://gsg-image-uploads.s3.amazonaws.com/app-images/egg.png'
// https://gsg-image-uploads.s3.amazonaws.com/app-images/egg-alt.png
const vegMealImage= 'https://gsg-image-uploads.s3.amazonaws.com/app-images/customised-plan.png'
// https://gsg-image-uploads.s3.amazonaws.com/app-images/customised-plan-alt.png
// https://gsg-image-uploads.s3.amazonaws.com/app-images/chicken.png
// https://gsg-image-uploads.s3.amazonaws.com/app-images/chicken-alt.png

const useStyles = makeStyles(() => ({
    card: {
      //borderRadius: '1rem',
      boxShadow: 'none',
      position: 'relative',
      minWidth: '100%',
      minHeight: 200,
      marginBottom:'1em',
      '&:after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        width: '100%',
        height: '65%',
        bottom: 0,
        zIndex: 1,
        background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
      },
    },
    content: {
      position: 'absolute',
      zIndex: 2,
      bottom: 0,
      width: '100%',
      display:'inline-flex',
      padding:'5px 8px',
      
    },
    media: {
        position: 'absolute',
        zIndex: 1,
        //bottom: 0,
        width: '100%',
        height:'100%',
        display:'inline-flex'
      },
  }));
export default function MealCard(props) {
    const styles = useStyles();
    const { diet } = props;
    const [showDietModal,setshowDietModal]=useState(false)
    const getFormattedDate = (dt) => {
        if (!dt)
            return '';
        return (`${dt.split(" ")[0]}, ${dt.split(" ")[1]} ${dt.split(" ")[2]}`)
    }
    return (<>
        <Card  className={styles.card} >
            <CardHeader avatar={<Avatar aria-label="Recipe" >{diet.meta.name.charAt(0)}</Avatar>}
                title={diet.meta.name.length > 70 ? diet.meta.name.slice(0, 70) + ' ...' : diet.meta.name}
                subheader={diet.meta.dateStart_db ? `${getFormattedDate(diet.meta.dateStart_db)} - ${getFormattedDate(diet.meta.dateEnd_db)}` : ''}
            />
            <CardMedia  className={styles.media} image={diet.meta.dietPref=="Veg"?eggMealImage:eggMealImage}
            title={diet.meta.name} ><Paper/></CardMedia>
            <CardContent style={{paddingBottom:'5px'}} className={styles.content}>
                <Grid item xs={12}container direction='row' alignItems='center'  >
                <Grid item xs={8}><Typography variant="body1" color='secondary' >
                    {diet.meta.description ? (diet.meta.description.length > 90 ? diet.meta.description.slice(0, 90) + " ..." : diet.meta.description) : `Ingredients: ${diet.meta.ingredients}`}
                </Typography>
                </Grid>
                <Grid item xs={4} container justify='flex-end'>
                <Button className='bigButton' color="primary" variant="contained" aria-label="View diet" onClick={()=>setshowDietModal(true)}>View</Button>
               </Grid>
               </Grid>
            </CardContent>
            
            {/* <Collapse in={true} timeout="auto" unmountOnExit>
            <CardContent>
            {showDietModal && (<MealTable diet={props.diet.diet}/>)}
                </CardContent>
                </Collapse> */}
            {/* <CardActions disableActionSpacing>
                
            </CardActions> */}
        </Card>
        {showDietModal && (
        <MealTable diet={props.diet.diet} mealHeading={diet.meta.name} hide={setshowDietModal}/>)}
    </>
    )
}
/*{ <Card >
<CardHeader 
    avatar={
    <Avatar aria-label="Recipe" >
        {diet.meta.name.charAt(0)}
    </Avatar>
    }
    title={diet.meta.name.length>70?diet.meta.name.slice(0,70)+' ...':diet.meta.name}
    subheader={diet.meta.dateStart_db?`${getFormattedDate(diet.meta.dateStart_db)} - ${getFormattedDate(diet.meta.dateEnd_db)}`:''}
/> 
 <CardMedia
image={diet.meta.dietPref=="Veg"?IMG_Meal:IMG_Meal}
title={diet.meta.name}/>
<CardContent>
    <Typography variant="h5"component="p">
    {diet.meta.description?(diet.meta.description.length>70?diet.meta.description.slice(0,70)+" ...":diet.meta.description):`Ingredients: ${diet.meta.ingredients}`}
    </Typography>
</CardContent>
<CardActions disableActionSpacing>
    <Button variant="raised" color="secondary" aria-label="View diet" onClick={showDiet(diet,index,indx)}>
    View diet
    </Button>
</CardActions>
</Card> }*/


// export default function MealCard(props) {
//     const styles = useStyles();
//     const { diet } = props;
//     const getFormattedDate = (dt) => {
//         if (!dt)
//             return '';
//         return (`${dt.split(" ")[0]}, ${dt.split(" ")[1]} ${dt.split(" ")[2]}`)
//     }
//     return (<>
//         <Card >
//             <CardHeader avatar={<Avatar aria-label="Recipe" >{diet.meta.name.charAt(0)}</Avatar>}
//                 title={diet.meta.name.length > 70 ? diet.meta.name.slice(0, 70) + ' ...' : diet.meta.name}
//                 subheader={diet.meta.dateStart_db ? `${getFormattedDate(diet.meta.dateStart_db)} - ${getFormattedDate(diet.meta.dateEnd_db)}` : ''}
//             />
//             <CardMedia image={diet.meta.dietPref == "Veg" ? IMG_Meal : IMG_Meal} title={diet.meta.name} />
//             <CardContent>
//                 <Typography variant="body2" >
//                     {diet.meta.description ? (diet.meta.description.length > 70 ? diet.meta.description.slice(0, 70) + " ..." : diet.meta.description) : `Ingredients: ${diet.meta.ingredients}`}
//                 </Typography>
//             </CardContent>
//             <CardActions disableActionSpacing>
//                 <Button variant="outlined" color="primary" aria-label="View diet" onClick={console.log("Clicked on view")}>View diet</Button>
//             </CardActions>
//         </Card>
//     </>
//     )
// }