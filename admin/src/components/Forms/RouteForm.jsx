import { Alert, Col, Form, Row } from "react-bootstrap";
import { SelectField, TextAreaField, TextField } from "./shared/Fields";
import { useFormContext } from "./shared/FormHandler";
import SubmitBtn from "./shared/SubmitBtn";
import withFormHandling from "./shared/withFormHandling";
import { useEffect } from "react";
import { NO_SPECIAL_CHARS_REGEX } from "../../utils/constants";
import { useSelector } from "react-redux";
import { validStartOrEndPoints } from "../../store/selectors";
import lcdas from "../../data/lcda.json"

const RouteForm = ({ clearTopErr, formTopErr, values: initialValues }) => {
  const { values, handleSubmit, setFields } = useFormContext();
  const pickupPointsForMapping = useSelector(validStartOrEndPoints);

  const dropdownOptions = pickupPointsForMapping.map((p) => ({
    value: p.id,
    label: p.name,
  }));

  useEffect(() => {
      if (initialValues)
      setFields(initialValues);
  }, [initialValues, setFields]);

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
          controlId={"route-form-01"}
          label={"Name"}
          name={"name"}
          readOnly={values["name"]?.id}
          placeholder={"Please enter a name"}
          required
        />
        <TextField
          as={Col}
          md={6}
          controlId={"route-form-02"}
          label={"Title"}
          name={"title"}
          placeholder={"Please enter a title"}
        />
      </Row>
      <Row className="mb-3">
        <TextAreaField
          as={Col}
          md={6}
          controlId={"route-form-03"}
          label={"Description"}
          name={"description"}
          placeholder={"Please enter a description"}
          required
        />
        <SelectField
          as={Col}
          md={6}
          controlId={"route-form-04"}
          label={"lcda"}
          name={"lcda"}
          placeholder={"Please select"}
          options={lcdas}
          required
        />
      </Row>
      <Row className="mb-3">
        <SelectField
          as={Col}
          md={6}
          controlId={"route-form-05"}
          label={"Start Point"}
          name={"startPointId"}
          placeholder={"Please select"}
          options={dropdownOptions}
          required
        />
        <SelectField
          as={Col}
          md={6}
          controlId={"route-form-06"}
          label={"End Point"}
          name={"endPointId"}
          placeholder={"Please select"}
          options={dropdownOptions.filter(p => p.value !== values["startPointId"])}
          required
        />
      </Row>
      <SubmitBtn text={"Save Changes"} className={"mt-2 mb-2"} />
    </Form>
  );
};

const initialState = {
  name: "",
  title: "",
  description: "",
  lcda: "",
  startPointId: "",
  endPointId: "",
};

const validationRules = [
  {
    name: "name",
    label: "Name",
    minLength: 3,
    maxLength: 50,
    pattern: NO_SPECIAL_CHARS_REGEX,
    isRequired: true,
  },
  {
    name: "title",
    label: "Title",
    minLength: 3,
    maxLength: 50,
    pattern: NO_SPECIAL_CHARS_REGEX,
    isRequired: false,
  },
  {
    name: "description",
    label: "Description",
    minLength: 3,
    maxLength: 50,
    pattern: NO_SPECIAL_CHARS_REGEX,
    isRequired: true,
  },
  {
    name: "lcda",
    label: "Lcda",
    isRequired: true,
  },
  {
    name: "startPointId",
    label: "Start Point",
    isRequired: true,
  },
  {
    name: "endPointId",
    label: "End Point",
    isRequired: true,
  },
];

export default withFormHandling({ initialState, validationRules, options: {} })(
  RouteForm
);
