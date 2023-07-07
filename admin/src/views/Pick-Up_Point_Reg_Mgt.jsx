import React, {useEffect} from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import style from "../styles/PckUpPointRegMgt.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPickupPoints } from '../store/thunks/pickUpPointThunks';
import { getAllPickUps, getAllPickUpsStatus, getAllPickUpError } from '../store/selectors';
import Tables from '../components/Common/Table/Table';
import ButtonOutline from '../components/Common/Button/ButtonOutline';
import { Button } from '../components/Common/Button/Button';
import Sidebar from '../components/Common/Sidebar/Sidebar';


const Pick_Up_Point_Mgt = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pickUpPoints = useSelector(getAllPickUps);
  const pickUpPointError = useSelector(getAllPickUpError);
  const pickUpPointStatus = useSelector(getAllPickUpsStatus);

  const hasChildRoutes = !!location.pathname.split('/')[2];

  useEffect(()=>{
    if(pickUpPointStatus === "idle"){
      dispatch(fetchPickupPoints());
    } 

  },[dispatch, pickUpPointStatus])

  const goToSinglePickUpPoint = () => {
    navigate("/pick_up_point_reg/single_pickup_point");
  }

  const goToBulkPickUpPoints = () => {
    navigate("/pick_up_point_reg/bulk_pickup_points")
  }


  return (
    <div className="App">
      <Sidebar/>
      {
      !hasChildRoutes && 
          <div className="app-container">
              <div className="button_container">
                  <Button onClick={goToSinglePickUpPoint}>Set Up Single Pick Up Point</Button>
                  <ButtonOutline onClick={goToBulkPickUpPoints}>Set Up Multiple Pick Up Point</ButtonOutline>
              </div>

              <h1 className="p-4">Pick Up Points</h1>

              <Tables pickUpPoints={pickUpPoints}/>

          </div>  
      }
          <Outlet/>
    </div>
  )
}

export default React.memo(Pick_Up_Point_Mgt)