import React, {useEffect} from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import style from "../../styles/PckUpPointRegMgt.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPickUPoints } from '../../store/reducers/pickupSlice';
import { getStorePickUpPoints, getPickUpPointsError, getPickUpPointsStatus } from '../../store/reducers/selectors';
import Tables from '../../components/Common/Table/Table';
import ButtonOutline from '../../components/Common/Button/ButtonOutline';
import { Button } from '../../components/Common/Button/Button';
import Sidebar from '../../components/Common/Sidebar/Sidebar';
import { usePickUpPointsContext } from '../../components/App/Providers/PickUpProvider';


const Pick_Up_Point_Mgt = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const pickUpPoints = useSelector(getStorePickUpPoints);
  // const pickUpPointError = useSelector(getPickUpPointsError);
  // const pickUpPointStatus = useSelector(getPickUpPointsStatus);

  const hasChildRoutes = !!location.pathname.split('/')[2];

  // useEffect(()=>{
  //   if(pickUpPointStatus === "idle"){
  //     dispatch(fetchPickUPoints());
  //   }
  // },[dispatch, pickUpPointStatus])

  const { pickUpPoint } = usePickUpPointsContext()

  const goToSinglePickUpPoint = () => {
    navigate("/pick_up_point_reg/single_pickup_point");
  }

  const goToBulkPickUpPoints = () => {
    navigate("/pick_up_point_reg/bulk_pickup_points")
  }


  return (
    <div className="component_container">
      <Sidebar/>
      {
      !hasChildRoutes && 
          <div className="container">
              <div className={style.button_flex}>
                  <Button onClick={goToSinglePickUpPoint}>Set Up Single Pick Up Point</Button>
                  <ButtonOutline onClick={goToBulkPickUpPoints}>Set Up Multiple Pick Up Point</ButtonOutline>
              </div>

              <h1 className="p-4">Pick Up Points</h1>

              <Tables pickUpPoints={pickUpPoint} />

          </div>  
      }
          <Outlet/>
    </div>
  )
}

export default React.memo(Pick_Up_Point_Mgt)