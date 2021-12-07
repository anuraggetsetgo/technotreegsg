import React, { useEffect, useState } from 'react'
import MacroSlider from '../Screens/Meal/MacroSlider-View'
import {callAPI} from '../Utils/Services'
//import _keys from 'lodash/keys';
//import _values from 'lodash/values';

export default function UserDietGenerator(props) {
    const [isloading, setLoading] = useState(false)
    const [userInfo, setuserInfo] = useState(props.userInfo)
    const [calories, setCalories] = useState(props.calories);
    const [proteinVal, setProteinVal] = useState(null);
    const [carbsVal, setcarbsVal] = useState({ max: 0, min: 0, actual: 0 });
    const [fatsVal, setfatsVal] = useState({ max: 0, min: 0, actual: 0 });
    const [generatedDiet, setgeneratedDiet] = useState(null);
    const [generatedDietErr, setgeneratedDietErr] = useState(null);

    function calculateProtein() {
        const multiplicationFactor = userInfo.noWorkouts > 3 ? 1.6 : 1.3;
        const protein = parseInt(userInfo.weight * 0.453592 * multiplicationFactor)
        //this.setState({protein});
        //this.calculateCarbsnFats(protein);
        setProteinVal(protein);
        calculateCarbsnFats(protein)

    }
    function calculateCarbsnFats(protein, carbs, fat) {
        let remainingCals = parseInt(calories) - protein * 4;
        let minFat = 10, minCarbs = 20;
        let maxFat = (remainingCals - minCarbs * 4) / 9, maxCarbs = (remainingCals - minFat * 9) / 4;
        let tempCarb = 0, tempFat = 0;
        if (!(carbs || fat)) {
            tempCarb = parseInt(remainingCals / 8);
            tempFat = parseInt((remainingCals / 18).toFixed(2));
            setcarbsVal({ ...carbsVal, ...{ actual: tempCarb, min: minCarbs, max: maxCarbs } })
            setfatsVal({ ...fatsVal, ...{ actual: tempFat, min: minFat, max: maxFat } })
            //this.loadDiet(protein, tempCarb, tempFat);
            //this.setState({carbs: tempCarb, fats: tempFat});
        }

        if (carbs && !fat) {
            remainingCals = remainingCals - carbs * 4;
            tempCarb = parseInt(carbs);
            tempFat = parseInt((remainingCals / 9).toFixed(2));
            //this.setState({carbs: tempCarb, fats: tempFat})
            setcarbsVal({ ...carbsVal, ...{ actual: tempCarb, min: minCarbs, max: maxCarbs } })
            setfatsVal({ ...fatsVal, ...{ actual: tempFat, min: minFat, max: maxFat } })
        }
        if (!carbs && fat) {
            remainingCals = remainingCals - fat * 9;
            tempCarb = parseInt(remainingCals / 4);
            tempFat = parseInt(fat);
            //this.setState({carbs: tempCarb, fats: tempFat})
            setcarbsVal({ ...carbsVal, ...{ actual: tempCarb, min: minCarbs, max: maxCarbs } })
            setfatsVal({ ...fatsVal, ...{ actual: tempFat, min: minFat, max: maxFat } })

        }
        setLoading(true);
    }

    function dietgenerator( protein, fat, carb){
      const data={ "protein": protein,"fat": fat,"carb": carb,"dietPref": userInfo.dietPref}
      const url="https://4eji1rf7w0.execute-api.us-east-1.amazonaws.com/default/sample-diet-generator";
        console.log("api_getDiet_UserDietGenerator")
        callAPI(url, "post", dietSuccessful, dieterror,data);
    
        function dietSuccessful(data) {
        setgeneratedDiet(data.data)
        //reStructureCalculatedDiet(data.data)
        //console.log("API DEIT",data.data.breakfast)
        setLoading(true);
         
        }
        function dieterror(err) {      
          console.log('err_getDiet_UserDietGenerator', err.response)
          setgeneratedDietErr(true);
        }
    
      }
      
    useEffect(() => {
        //setCalories(props.calories)
        calculateProtein();

    }, [])

    return (
        isloading && <MacroSlider
            userInfo={userInfo}
            calories={calories}
            setCalories={setCalories}
            carbs={carbsVal}
            protein={proteinVal}
            fats={fatsVal}
            calculateCarbsnFats={calculateCarbsnFats}
            generatedDiet={generatedDiet}
            dietgen={dietgenerator}
            dietgenErr={generatedDietErr}
        />
    )
}