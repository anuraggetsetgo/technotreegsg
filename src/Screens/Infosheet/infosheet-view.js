import { Button, Grid } from "@material-ui/core"
import HeaderBar from "../../Container/Common/HeaderBar"
import { JsonForms } from '@jsonforms/react';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import React, { useEffect, useState } from 'react';
import { get, set, callAPI,getURL, removeItem, } from "../../Utils/Services";
import AlertSnackbar, {ALERT} from "../../Container/Common/AlertSnackbar";
export const InfosheetView = ()=>{
    const schema = {
        type: 'object',
        properties: {
          tel: {
            type: 'string',
            minLength: 1
          },
          birth_date: {
            type: 'string',
            format: 'date',
            label: 'Birth Date'
          },
          city: {
            type: 'string',
            label: 'City',
            minLength: 2
          },
          state: {
            type: 'string',
            label: 'State',
            minLength: 2
          },
          country: {
            type: 'string',
            label: 'Country',
            minLength: 2
          },
          occupation: {
            type: 'string',
            label: 'Designation',
            minLength: 2
          },
          company: {
            type: 'string',
            label: 'Company',
            minLength: 2
          },
          goal: {
            type: 'string',
            minLength: 2
          },
          dietPref: {
            type: 'string',
            label: 'Diet Preference',
            oneOf: [{const: 'nonveg', title: 'Non Vegetarian'}, {const: 'veg', title: 'Vegetarian'}, {const: 'egg', title: 'Eggetarian'}]
          },
          dietRequest: {
            type: 'string'
          },
          preferredFoodItems: {
            type: 'string',
            minLength: 0
          },
          noWorkouts: {
            type: 'string',
            minLength: 0
          },
          willingGym: {
            type: 'string',
            oneOf: [{const: '0', title: 'Home'}, {const: '1', title: 'Gym'}]
          },
          workoutTime: {
            type: 'string',
            oneOf: [{const: 'morning', title: 'Morning'}, {const: 'afternoon', title: 'Afternoon'}, {const: 'evening', title: 'Evening'}]
          },
          issues: {
            type: 'string',
            minLength: 0
          },
          activity: {
            type: 'string',
            oneOf: [{const: 'sedentary', title: 'Sedentary (example: office job)'}, {const: 'Somewhat active', title: 'Somewhat active (example: Walking the dog)'}, {const: 'Active', title: 'Active (on your feet all day)'}, {const: 'Very active', title: 'Very active (manual labor)'}]
          },
          stress: {
            type: 'string',
            oneOf: [{const: 'stress_free', title: 'Stress free'}, {const: 'mild_stress', title: 'Mild stress'}, {const: 'high_stress', title: 'High stress'}]
          },
          sleep: {
            type: 'string',
            minLength: 0
          },
          supplements: {
            type: 'string',
            minLength: 0
          },
          diet:{
              type: 'string',
              minLength: 0
            },
        workout:{
                type: 'string',
                minLength: 0
              },            
        questions: {
            type: 'string',
            minLength: 0
          }
        },
        required: ['tel', 'birth_date', 'city']
      };
      const uischema = {
        type: 'VerticalLayout',
        elements: [
          {
            type: 'Control',
            scope: '#/properties/tel',
            label: 'Mobile'
          },
          {
            type: 'Control',
            scope: '#/properties/birth_date',
            label: 'Birth Date'
          },
          {
            type: 'Control',
            scope: '#/properties/city',
            label: 'City'
          },
          {
            type: 'Control',
            scope: '#/properties/state',
            label: 'State'
          },
          {
            type: 'Control',
            scope: '#/properties/country',
            label: 'Country'
          },
          {
            type: 'Control',
            scope: '#/properties/occupation',
            label: 'Designation'
          },
          {
            type: 'Control',
            scope: '#/properties/company',
            label: 'Company'
          },
          {
            type: 'Control',
            scope: '#/properties/goal',
            label: 'Fitness goal',
          },
          {
            type: 'Control',
            scope: '#/properties/dietPref',
            label: 'Diet Preference',
            options: {multi: true}
          },
          {
            type: 'Control',
            scope: '#/properties/dietRequest',
            label: 'Any specific diet you prefer?',
            options: {multi: true}
          },
          {
            type: 'Control',
            scope: '#/properties/preferredFoodItems',
            label: 'Food you love?',
            options: {multi: true}
          },
          {
            type: 'Control',
            scope: '#/properties/noWorkouts',
            label: 'Workouts per week you would like to do?',
          },
          {
            type: 'Control',
            scope: '#/properties/willingGym',
            label: 'Workouts preference',
          },
          {
            type: 'Control',
            scope: '#/properties/workoutTime',
            label: 'Preferred time to workout?',
          },
          {
            type: 'Control',
            scope: '#/properties/issues',
            label: 'Any injuries?',
            options: {multi: true}
          },
          {
            type: 'Control',
            scope: '#/properties/activity',
            label: 'Activity level?',
          },
          {
            type: 'Control',
            scope: '#/properties/stress',
            label: 'Stress level?',
          },
          {
            type: 'Control',
            scope: '#/properties/sleep',
            label: 'How well do you sleep?',
            options: {multi: true}
          },
          {
            type: 'Control',
            scope: '#/properties/supplements',
            label: 'Supplements?',
            options: {multi: true}
          },
          {
            type: 'Control',
            scope: '#/properties/diet',
            label: 'Current food log',
            options: {multi: true}
          },
          {
            type: 'Control',
            scope: '#/properties/workout',
            label: 'Current workout log, if any',
            options: {multi: true}
          },
          {
            type: 'Control',
            scope: '#/properties/questions',
            label: 'Questions?',
            options: {multi: true}
          },
        ]
      };
      set('tempSaveData', get('tempSaveData')?JSON.parse(get('tempSaveData')):JSON.parse(get('GSG_Client_data')));
      const userData = JSON.parse(get('tempSaveData'));
      let initialData = {...userData}
      const [data, setData] = useState(initialData);
      const [alert, setAlert] = useState(false);
        const [alertData, setAlertData] = useState({
            alertMsg: '',
            alertType:''
        });
        const [disableButton, setDisableButton] = useState(false);

        useEffect(() => {
          initialData === data &&
          setDisableButton(true)
        },[])

      const updateInfo = () => {
        // updatestartingLogin(true);
        callAPI(
          getURL("profile"),
          "post",
          updateSuccessful,
          errorUpdate,
          data,
        );
      };
      const updateSuccessful=()=>{
          removeItem('tempSaveData');
          set('GSG_Client_data', data);
          setAlertData({
            alertType: ALERT.SUCCESS,
            alertMsg: 'Phew! Updated the information'
          });
          setAlert(true);
          console.log("Info updated!")
        setDisableButton(true)
      }
      const errorUpdate = ()=>{
        console.log("Error updating info");
        setAlertData({
          alertType: ALERT.ERROR,
          alertMsg: "Uh oh! We ran into some error. Don't worry though, your inputs are preserved. Try again later."
        })
        setAlert(true);
      }
      
    return (<>
    <HeaderBar isVisible leftEnable leftElement='back' headerName={"Info Sheet"} settings={true} />
        <Grid container direction="column">
            <Grid item container style={{height: '85vh', overflow: 'scroll'}}>
                <Grid item style={{width: '100%',padding: '80px 20px'}}>
                    <JsonForms
                        schema={schema}
                        uischema={uischema}
                        data={data}
                        renderers={materialRenderers}
                        cells={materialCells}
                        onChange={({ data, _errors }) => {set('tempSaveData', data); setData(data); setDisableButton(false)}}
                        />
                </Grid>
            </Grid>
            <Grid item>
            <Button className="bigButton" style={{width: '100px'}} 
            disabled={disableButton} variant="contained" color="primary" onClick={updateInfo}>Save</Button>
            </Grid>
            {alert && <AlertSnackbar open={alert} message={alertData.alertMsg} type={alertData.alertType}>
            </AlertSnackbar>}
        </Grid>
        </>
    )
}