import React, { useState } from 'react';
import AppForm from '../../components/Common/Form/AppForm';
import {Button} from "react-bootstrap";
import AppModal from '../../components/Common/BRMS_Modal/AppModal';

const Single_PickUpPoint = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='container single_pickup'>
      <AppModal show={show} handleClose={handleClose}>
        
      </AppModal>
        <div className="heading">
            <h1 className="pt-5 pb-3">Pick Up Points</h1>
        </div>
        <AppForm first_label={"Name"} second_label={'Title'} third_label={'BusStop'} fourth_label={'Description'} fifth_label={'Status'} btn_text={'Save'}/>


        <div className="heading">
            <h1 className="pt-5 pb-3">Location</h1>
            <Button variant="secondary" onClick={()=>{handleShow()}}>Select Location</Button>
        </div>
        <AppForm first_label={"Name"} second_label={'LCDA'} third_label_item={'Area'} third_label={'City'} fourth_label={'Description'} fifth_label={'Status'} fourth_label_item={'Landmark'} />


    </div>
  )
}

export default Single_PickUpPoint