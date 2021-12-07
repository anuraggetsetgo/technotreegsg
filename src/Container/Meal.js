import { React, useEffect, useState } from "react";
import MealView from '../Screens/Meal/Meal-view'
import { get } from '../Utils/Services'
import { firebase_GetUserDiet } from '../Container/firebase'


export function reStructureDiet(dietPlan) {
  const dietplanOBJ = {};
  //console.table(dietPlan);
  dietPlan.map(({ header, note, units }, index) => {
    const dayobj = {
      header: header,
      note: note,
      meals: [],
    }
    if (units) {
      var tempObj = {};
      units.map(({ foods, label, note, noteStatus, type }, indx) => {
        //console.log(meal)
        tempObj = {
          label: label,
          note: note,
          type: type,
          noteStatus: noteStatus,
          foods: foods,
        }
        var totalcals = 0;
        if (foods)
          foods.map((fooditem) => { totalcals = totalcals + fooditem.actualCal;
            return 0; //warning suppress
           });
        tempObj.totalMealcals = totalcals;
        dayobj.meals.push(tempObj)
        return 0; //warning suppress
      })
    }
    else
      dayobj.meals = null;

    dietplanOBJ['Day ' + (index + 1)] = dayobj;
    return 0; //warning suppress
  })

  console.log('DietPlanOBJ', dietplanOBJ);
  return (dietplanOBJ);
}

export function getCurrentDietCalories(weight, workout, currentFat, targetFat) {

  const BMR = weight * 10;
  let activityFactor = 1.3;
  switch (workout) {
    case 1:
      activityFactor = 1.1;
      break;
    case 2:
      activityFactor = 1.2;
      break;
    case 3:
      activityFactor = 1.3;
      break;
    case 4:
      activityFactor = 1.4;
      break;
    case 5:
      activityFactor = 1.5;
      break;
    case 6:
      activityFactor = 1.6;
      break;
     default:
      activityFactor = 1.3;
  }
  let goalFactor = 1;
  goalFactor = currentFat > targetFat ? 0.8 : 1.2 // current fat>target fat put on 20% deficit or else put on 20%surplus
  const maintenanceCals = BMR * activityFactor;
  const cals = maintenanceCals * goalFactor;
  return cals
}
export default function Meal() {

  const userID = get("client_user_id");
  const userData = JSON.parse(get("GSG_Client_data"));
  //console.log(userData)

  const [isloading, setIsLoading] = useState(true);
  const [activeDiet, setactiveDiet] = useState([]);
  const [otherDiet, setOtherDiet] = useState([]);
  const [trainerUploadPending, settrainerUploadPending] = useState(false);
  const [calculateDiet, setcalculateDiet] = useState(false);
  const [calories, setCalories] = useState(null)

  const getDiet = () => {
    const tmpactiveDiet = [];
    const tmparchiveDiet = [];

    firebase_GetUserDiet(userID, (diets) => {
      console.log(diets);
      if (diets) {
        if (diets.length >= 0) {
          diets.map((dt, index) => {
            const {  meta } = dt;
            const todaysDate = new Date();
            if ((userData.trainer) && (new Date(meta.dateEnd_db) > todaysDate.getTime())) //Latest diet and a coach is assigned
            {
              tmpactiveDiet.push(dt)   //push in active diet tab display on landing active tab
            }
            else {                                            //Rest all the diets
              tmparchiveDiet.push(dt)//Push in archive diets display on archives tab
            }
            return 0;
          })

          if (userData.trainer && tmpactiveDiet.length === 0)       //User has coach but he didnot upload the diet     
            settrainerUploadPending(true);

          if (!userData.trainer)                           //User Doesnot have a coach then calulate the diet and show archive diet
            setcalculateDiet(true);

          updateCalories(parseInt(getCurrentDietCalories(userData.weight, userData.workout, userData.body_fat, JSON.parse(userData.goals).fat)));  //caloreis  were coming from graphql call now modified to func
        }
        // else {
        //   setcalculateDiet(true);  //calculation code.
        //   updateCalories(parseInt(getCurrentDietCalories(userData.weight, userData.noWorkouts)));  //caloreis coming from graphql call now modified
        //   //updateCalories(1800); //caloreis coming from graphql call
        // }
        tmpactiveDiet.reverse(); tmparchiveDiet.reverse();
        tmpactiveDiet.length === 0 ? setactiveDiet(null) : setactiveDiet(oldArray => [...oldArray, ...tmpactiveDiet])
        tmparchiveDiet.length === 0 ? setOtherDiet(null) : setOtherDiet(oldArray => [...oldArray, ...tmparchiveDiet])
      }
      else {
        setcalculateDiet(true);  //calculation code.
        updateCalories(parseInt(getCurrentDietCalories(userData.weight, userData.noWorkouts)));  //caloreis coming from graphql call now modified
        //updateCalories(1800); //caloreis coming from graphql call
      }
      setIsLoading(false);
    })


  }
  const updateCalories = (cals) => {
    setCalories(cals)
  }

  useEffect(() => {
    getDiet();
  }, []
  )
  return (<>
    <MealView
      userInfo={userData}
      activeDiet={activeDiet}
      otherDiet={otherDiet}
      calories={calories}
      calculateDiet={calculateDiet}
      trainerUploadPending={trainerUploadPending}
      isloading={isloading}
    //askUserForProfileCompletion={askUserForProfileCompletion}
    />
  </>);
};

//export default isLoadingHOC(Meal, "Please wait getting your profile details");
