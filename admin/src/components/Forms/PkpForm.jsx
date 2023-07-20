import React from "react";
import { Form, Col, Row } from "react-bootstrap";
import { InputField, CheckboxField, TextAreaField } from "../Form/Fields";

const PickUpPointFormWithoutLocation = ({
  errors,
  form,
  handleValueChange,
}) => {
  return (
    <Form>
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
    </Form>
  );
};

export default PickUpPointFormWithoutLocation;
