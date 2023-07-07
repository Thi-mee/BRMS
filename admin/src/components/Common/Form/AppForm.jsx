import React, {useState} from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFormUtils } from "../../utils/FormUtils";
import { addPickUpPoints } from "../../../store/thunks/pickUpPointThunks";
import { useDispatch } from "react-redux"

const AppForm = ({
  errors,
  locationError,
  handleShow,
  select
}) => {
  const navigate = useNavigate();
  const { handleValueChange, form, locationForm, setLocationForm, handleValueLocationChange, initLocForm } = useFormUtils();
  const [addRequestStatus, setAddRequestStatus] = useState('idle');
  const dispatch = useDispatch();

  // select ? initLocForm() : ""

  const handleThis = (e) => {
    e.preventDefault();
    form.location = locationForm;
    form.status === true ? form.status = "active" : form.status = "inactive"
    console.log(form)


    dispatch(addPickUpPoints(form))

  }



  return (
    <Form>
        <div className="component_container button_container">
          <Button variant="secondary" className="m-2" onClick={(e)=>{handleThis(e)}}>
            Save
          </Button>
          <Button
            variant="secondary"
            className="m-2"
            onClick={() => {
              navigate("/pick_up_point_reg");
            }}
          >
            Back
          </Button>
        </div>
      <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>
              Name <span>*</span>
            </Form.Label>
            <Form.Control
            required
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              isInvalid={!!errors['name']}
              onChange={(e)=>{handleValueChange(e)}}
            />
            <Form.Control.Feedback type="invalid">
              {errors['name']}
            </Form.Control.Feedback>
          </Form.Group>
    
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name='title'
              placeholder='Title'
              value={form.title}
              onChange={(e)=>{handleValueChange(e)}}
            />
          </Form.Group>
      </Row>
      <Row className="mb-3">
          <Form.Group
            as={Col}
            md="12"
            controlId="validationCustom03"
          >
            <Form.Label>
              Nearest Bus-Stop <span>*</span>
            </Form.Label>
            <Form.Control type="text" placeholder='Nearest Bus Stop' isInvalid={!!errors['busStop']} required name='busStop' value={form.busStop} onChange={(e)=>{handleValueChange(e)}} />
            <Form.Control.Feedback type="invalid">
              {errors['busStop']}
            </Form.Control.Feedback>
          </Form.Group>
      </Row>
      <Row className="mb-3">
          <Form.Group
            as={Col}
            md="12"
            controlId="validationCustom03"
          >
            <Form.Label>
              Description <span>*</span>
            </Form.Label>
            <Form.Control
              required
              as="textarea"
              placeholder={`Leave a Description here`}
              name='description'
              value={form.description}
              isInvalid={!!errors['description']}
              onChange={(e)=>{handleValueChange(e)}}
            />
            <Form.Control.Feedback type="invalid">
              {errors['description']}
            </Form.Control.Feedback>
          </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check label='Status' name='status' value={form.status} onChange={(e)=>{handleValueChange(e)}} />
      </Form.Group>

      <div className="heading">
        <h1 className="pt-5 pb-3">Location</h1>
        <Button
          variant="secondary"
          onClick={() => {
            handleShow();
          }}
        >
          Select Location
        </Button>
      </div>

      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>
            Title <span>*</span>
          </Form.Label>
          <Form.Control
            required
            type="text"
            name="title"
            placeholder="Title"
            value={locationForm.title}
            isInvalid={!!locationError['title']}
            onChange={(e) => {
              handleValueLocationChange(e);
            }}
          />
          <Form.Control.Feedback type="invalid">
            {locationError['title']}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>LCDA <span>*</span></Form.Label>
          <Form.Control
            type="text"
            name="lcda"
            required
            placeholder="LCDA"
            value={locationForm.lcda}
            isInvalid={!!locationError['lcda']}
            onChange={(e) => {
              handleValueLocationChange(e);
            }}
          />
        </Form.Group>
        <Form.Control.Feedback type="invalid">
            {locationError['lcda']}
        </Form.Control.Feedback>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>
            City <span>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="City"
            required
            name="city"
            value={locationForm.city}
            isInvalid={!!locationError['city']}
            onChange={(e) => {
              handleValueLocationChange(e);
            }}
          />
          <Form.Control.Feedback type="invalid">
            {locationError['city']}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>
            Area <span>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Area"
            required
            name="area"
            value={locationForm.area}
            isInvalid={!!locationError['area']}
            onChange={(e) => {
              handleValueLocationChange(e);
            }}
          />
          <Form.Control.Feedback type="invalid">
            {locationError['area']}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>
            Description <span>*</span>
          </Form.Label>
          <Form.Control
            required
            as="textarea"
            placeholder={`Leave a Description here`}
            name="description"
            value={locationForm.description}
            isInvalid={!!locationError['description']}
            onChange={(e) => {
              handleValueLocationChange(e);
            }}
          />
          <Form.Control.Feedback type="invalid">
            {locationError['description']}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>
            Landmark <span>*</span>
          </Form.Label>
          <Form.Control
            required
            as="textarea"
            placeholder={`Leave a Landmark here`}
            name="landmark"
            value={locationForm.landmark}
            isInvalid={!!locationError['landmark']}
            onChange={(e) => {
              handleValueLocationChange(e);
            }}
          />
          <Form.Control.Feedback type="invalid">
            {locationError['landmark']}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
    </Form>
  );
};

export default AppForm;
