import React from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { InputField, CheckboxField, TextAreaField } from "./Fields";

const AppForm = ({
  errors,
  handleShow,
  form,
  handleValueChange,
}) => {
  return (
    <Form>
      {/* {console.log(form)} */}
      <Row className="mb-3">
        <InputField
          as={Col}
          md="6"
          controlId="validationCustom01"
          label="Name"
          name="name"
          placeholder="Please enter a name"
          value={form?.name}
          onChange={handleValueChange}
          error={errors?.name}
          required
        />
        <InputField
          as={Col}
          md="6"
          controlId="validationCustom02"
          label="Title"
          name="title"
          placeholder="Title"
          value={form?.title}
          onChange={handleValueChange}
          error={errors?.title}
        />
      </Row>
      <Row className="mb-3">
        <InputField
          as={Col}
          md="12"
          controlId="validationCustom03"
          label="Nearest Bus-Stop"
          name="busStop"
          placeholder="Nearest Bus Stop"
          value={form?.busStop}
          onChange={handleValueChange}
          error={errors?.busStop}
          required
        />
      </Row>
      <Row className="mb-3">
        <TextAreaField
          as={Col}
          md="12"
          controlId="validationCustom03"
          label="Description"
          name="description"
          placeholder="Leave a Description here"
          value={form?.description}
          onChange={handleValueChange}
          error={errors?.description}
          required
        />
      </Row>
      <CheckboxField
        className="mb-3"
        label="Status"
        name="status"
        value={form?.status}
        onChange={handleValueChange}
        error={errors?.status}
        required
        controlId="validationCustom090"
      />

      <div className="heading">
        <h1 className="pt-5 pb-3">Location</h1>
        <Button variant="secondary" onClick={handleShow}>
          Select Location
        </Button>
      </div>

      <Row className="mb-3">
        <InputField
          as={Col}
          md="6"
          controlId="validationCustom079"
          label="Title"
          name="location.title"
          placeholder="Enter Location Title"
          value={form?.location?.title}
          onChange={handleValueChange}
          error={errors?.location?.title}
          required
        />
        <InputField
          as={Col}
          md="6"
          controlId="validationCustom06"
          label="LCDA"
          name="location.lcda"
          placeholder="LCDA"
          value={form?.location?.lcda}
          onChange={handleValueChange}
          error={errors?.location?.lcda}
          required
        />
      </Row>
      <Row className="mb-3">
        <InputField
          as={Col}
          md="6"
          controlId="validationCustom07"
          label="City"
          name="location.city"
          placeholder="City"
          value={form?.location?.city}
          onChange={handleValueChange}
          error={errors?.location?.city}
          required
        />
        <InputField
          as={Col}
          md="6"
          controlId="validationCustom08"
          label="Area"
          name="location.area"
          placeholder="Area"
          value={form?.location?.area}
          onChange={handleValueChange}
          error={errors?.location?.area}
          required
        />
      </Row>
      <Row className="mb-3">
        <TextAreaField
          as={Col}
          md="6"
          controlId="validationCustom79"
          label="Description"
          name="location.description"
          placeholder="Description"
          value={form?.location?.description}
          onChange={handleValueChange}
          error={errors?.location?.description}
          required
        />
        <TextAreaField
          as={Col}
          md="6"
          controlId="validationCustom10"
          label="Landmark"
          name="location.landmark"
          placeholder="Landmark"
          value={form?.location?.landmark}
          onChange={handleValueChange}
          error={errors?.location?.landmark}
          required
        />
      </Row>
    </Form>
  );
};

export default AppForm;
