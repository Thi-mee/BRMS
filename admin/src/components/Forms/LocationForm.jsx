import React, { useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useFormContext } from "./shared/FormHandler";
import { TextAreaField, TextField, SelectField } from "./shared/Fields";
import SubmitBtn from "./shared/SubmitBtn";
import withFormHandling from "./shared/withFormHandling";
import LCDAs from '../../data/lcda.json'

const LocationForm = ({ values: initialValues }) => {
  const { handleSubmit, values, setFields } = useFormContext();
  useEffect(() => {
    if (initialValues) {
      setFields(initialValues);
    }
  }, [initialValues, setFields]);

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <TextField
          as={Col}
          md="6"
          controlId={"loc-form-01"}
          label="Title"
          name="title"
          readOnly={!!values.id}
          placeholder="Please enter a title"
          required
        />
        <SelectField
          as={Col}
          md={6}
          controlId={"loc-form-04"}
          label={"LCDA"}
          name={"lcda"}
          placeholder={"Please select"}
          options={LCDAs}
          disabled={!!values.id}
          required
        />
      </Row>
      <Row className="mb-3">
        <TextField
          as={Col}
          md="6"
          controlId={"loc-form-03"}
          label="City"
          name="city"
          placeholder="Please enter a city"
          readOnly={!!values.id}
          required
        />
        <TextField
          as={Col}
          md="6"
          controlId={"loc-form-04"}
          label="Area"
          name="area"
          placeholder="Please enter a area"
          readOnly={!!values.id}
          required
        />
      </Row>
      <Row className="mb-3">
        <TextAreaField
          as={Col}
          md="6"
          controlId={"loc-form-05"}
          label="Description"
          name="description"
          placeholder="Please enter a description"
          required
        />
        <TextAreaField
          as={Col}
          md="6"
          controlId={"loc-form-06"}
          label="Landmark"
          name="landmark"
          placeholder="Please enter a landmark"
          required
        />
      </Row>
      <SubmitBtn text={"Submit"} />
    </Form>
  );
};

const initialState = {
  title: "",
  lcda: "",
  city: "",
  area: "",
  description: "",
  landmark: "",
};

const validationRules = [
  {
    name: "title",
    label: "Title",
    isRequired: true,
    minLength: 3,
    maxLength: 50,
  },
  {
    name: "lcda",
    label: "LCDA",
    isRequired: true,
  },
  {
    name: "city",
    label: "City",
    isRequired: true,
  },
  {
    name: "area",
    label: "Area",
    isRequired: true,
  },
  {
    name: "description",
    label: "Description",
    isRequired: true,
    minLength: 3,
    maxLength: 150,
  },
  {
    name: "landmark",
    label: "Landmark",
    isRequired: true,
    minLength: 3,
    maxLength: 150,
  },
];

export default withFormHandling({ initialState, validationRules, options: {} })(LocationForm);
