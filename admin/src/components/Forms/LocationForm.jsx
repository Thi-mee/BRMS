import React from "react";
import { Form, Col, Row, Alert } from "react-bootstrap";
import { InputField, TextAreaField } from "./Fields";

const LocationForm = ({errors, form, handleValueChange, serverError}) => {
  return (
    <Form>
    <Alert variant="danger" show={serverError} dismissible>{serverError}</Alert>
      <Row className="mb-3">
        <InputField
          as={Col}
          md="6"
          controlId="validationCustom01"
          label="Title"
          name="title"
          placeholder="Please enter a title"
          value={form.title}
          onChange={handleValueChange}
          error={errors["title"]}
          required
        />
        <InputField
          as={Col}
          md="6"
          controlId="validationCustom02"
          label="LCDA"
          name="lcda"
          placeholder="Please enter a LCDA"
          value={form.lcda}
          onChange={handleValueChange}
          error={errors["lcda"]}
          required
        />
      </Row>
      <Row className="mb-3">
        <InputField
          as={Col}
          md="6"
          controlId="validationCustom03"
          label="City"
          name="city"
          placeholder="Please enter a city"
          value={form.city}
          onChange={handleValueChange}
          error={errors["city"]}
          required
        />
        <InputField
          as={Col}
          md="6"
          controlId="validationCustom04"
          label="Area"
          name="area"
          placeholder="Please enter a area"
          value={form.area}
          onChange={handleValueChange}
          error={errors["area"]}
          required
        />
      </Row>
      <Row className="mb-3">
        <TextAreaField
          as={Col}
          md="6"
          controlId="validationCustom01"
          label="Description"
          name="description"
          placeholder="Please enter a description"
          value={form.description}
          onChange={handleValueChange}
          error={errors["description"]}
          required
        />
        <TextAreaField
          as={Col}
          md="6"
          controlId="validationCustom01"
          label="Landmark"
          name="landmark"
          placeholder="Please enter a landmark"
          value={form.landmark}
          onChange={handleValueChange}
          error={errors["landmark"]}
          required
        />
      </Row>
    </Form>
  );
};

export default LocationForm;
