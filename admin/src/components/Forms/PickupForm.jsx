import React from "react"
import { Alert, Col, Form, Row } from 'react-bootstrap';
import SubmitBtn from './shared/SubmitBtn'
import { CheckboxField, TextAreaField, TextField } from './shared/Fields';
import { useFormContext } from './shared/FormHandler';
import withFormHandling from './shared/withFormHandling';
import { NO_SPECIAL_CHARS_REGEX } from "../../utils/constants";

const PickupForm = ({clearTopErr, formTopErr, values: initialValues}) => {
  const { values, handleSubmit, setFields } = useFormContext();

  React.useEffect(() => {
    setFields(initialValues)
  }, [initialValues, setFields])

  return (
    <Form onSubmit={handleSubmit}>
      <Alert
        variant="danger"
        onClose={clearTopErr}
        show={formTopErr?.length > 0}
        dismissible>
        {formTopErr}
      </Alert>
      <Row className="mb-3">
        <TextField
          as={Col}
          md={6}
          controlId={"p-full-form-01"}
          label={"Name"}
          name={"name"}
          readOnly={values["name"]?.id}
          placeholder={"Please enter a name"}
          required
        />
        <TextField
          as={Col}
          md={6}
          controlId={"p-full-form-02"}
          label={"Title"}
          name={"title"}
          placeholder={"Please enter a name"}
        />
      </Row>
      <Row className="mb-3">
        <TextField
          as={Col}
          md={12}
          controlId={"p-full-form-03"}
          label={"Nearest Bus-Stop"}
          name={"busStop"}
          placeholder={"Please enter the nearest bus stop"}
          required
        />
      </Row>
      <Row className="mb-3">
        <TextAreaField
          as={Col}
          md="12"
          controlId={"p-full-form-04"}
          label="Description"
          name="description"
          placeholder="Leave a Description here"
          required
        />
      </Row>
      <Row className="mb-3">
        <CheckboxField
          as={Col}
          md={6}
          className="mb-3"
          controlId={"p-full-form-05"}
          label="Status"
          name="status"
        />
        <CheckboxField
          as={Col}
          md={6}
          className="mb-3"
          controlId={"p-full-form-06"}
          label="Use as Start or End Point"
          name="startOrEnd"
        />
      </Row>
      <SubmitBtn text={"Submit"} />
    </Form>
  )
}

const initialState = {
  name: "",
  title: "",
  busStop: "",
  description: "",
  status: false,
  startOrEnd: false,
};

const validationRules = [
  {
    name: "name",
    label: "Name",
    isRequired: true,
    minLength: 3,
    maxLength: 50,
    pattern: NO_SPECIAL_CHARS_REGEX,
  },
  {
    name: "title",
    label: "Title",
    isRequired: false,
    minLength: 3,
    maxLength: 50,
    pattern: NO_SPECIAL_CHARS_REGEX,
  },
  {
    name: "busStop",
    label: "Nearest Bus-Stop",
    isRequired: true,
    minLength: 3,
    maxLength: 50,
    pattern: NO_SPECIAL_CHARS_REGEX,
  },
  {
    name: "description",
    label: "Description",
    isRequired: true,
    minLength: 3,
    maxLength: 150,
    pattern: NO_SPECIAL_CHARS_REGEX,
  },
  {
    name: "status",
    label: "Status",
    isRequired: false,
  },
  {
    name: "startOrEnd",
    label: "Use as Start or End Point",
    isRequired: false,
  },
]

export default withFormHandling({initialState, validationRules, options: {}})(PickupForm);