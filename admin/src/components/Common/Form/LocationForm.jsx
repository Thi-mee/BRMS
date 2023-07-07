import React, { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
import { useFormUtils } from "../../utils/FormUtils";

const AppForm = ({  locationError }) => {

  const { handleValueLocationChange, locationForm, form } = useFormUtils();

  console.log(form)

  return (
    <Form>
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
