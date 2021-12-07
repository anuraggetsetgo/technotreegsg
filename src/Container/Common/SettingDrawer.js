import React from 'react'
import SettingsView from '../../Screens/Setting/SettingsDrawer-View'
import { get } from '../../Utils/Services'
import config from '../../json/commonConfig.json'

export default function SettingDrawer(props) {
  const [userData, setUserData] = React.useState(JSON.parse(get("GSG_Client_data")));
  const coachImage = userData.trainer?`${config.URLs.S3BucketURL}/img/coaches/smallPic/${userData.trainer}.jpg`:null;
  const userSubscription = userData.association.length > 0 ? userData.association[0].service_caption : 'Free'

  return (
    <SettingsView userData={userData}
      userCoach={coachImage}
      userEmail={userData.email}
      userSubscription={userSubscription}
      setUserData={setUserData}
    />
  )
}
