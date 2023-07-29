import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import {
  CheckboxField,
  SelectField,
  TextAreaField,
  TextField,
} from "./shared/Fields";
import withFormHandling from "./shared/withFormHandling";
import { useFormContext } from "./shared/FormHandler";
import SubmitBtn from "./shared/SubmitBtn";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import XPModal from "../Modal/shared/XPModal";
import { SinglePickUpModal } from "../Table/LocationTable";
import {NO_SPECIAL_CHARS_REGEX} from "../../utils/constants";
import lcdas from "../../data/lcda.json";

const PickupFullForm = ({
  formTopErr,
  clearTopErr,
  locations,
  pickupPoints,
}) => {
  const { values, handleSubmit, setFields } = useFormContext();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { id } = useParams();

  const setSelectedLocation = (location) => {
    setFields({
      "location.id": location?.id,
      "location.title": location?.title,
      "location.landmark": location?.landmark,
      "location.description": location?.description,
      "location.city": location?.city,
      "location.lcda": location?.lcda,
      "location.area": location?.area,
    });
    handleClose()
  }

  useEffect(() => {
    if (id) {
      const pickupPoint = pickupPoints.find((p) => p.id === id);
      const location = locations.find((l) => l.id === pickupPoint.locationId);
      if (pickupPoint && location) {
        setFields({
          id: pickupPoint?.id,
          name: pickupPoint?.name,
          title: pickupPoint?.title,
          busStop: pickupPoint?.busStop,
          description: pickupPoint?.description,
          status: pickupPoint?.status === "active",
          startOrEnd: pickupPoint?.startOrEnd ?? false,
          locationId: pickupPoint?.locationId,
          "location.id": location?.id,
          "location.title": location?.title,
          "location.landmark": location?.landmark,
          "location.description": location?.description,
          "location.city": location?.city,
          "location.lcda": location?.lcda,
          "location.area": location?.area,
        });
      }
    }
  }, [id, pickupPoints, setFields, locations]);

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
          readOnly={!!values.id}
          placeholder={"Please enter a name"}
          required
        />
        <TextField
          as={Col}
          md={6}
          controlId={"p-full-form-02"}
          label={"Title"}
          name={"title"}
          placeholder={"Please enter a title"}
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
          readOnly={values["busStop"]}
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
          md="6"
          className="mb-3"
          controlId={"p-full-form-05"}
          label="Status"
          name="status"
        />
        <CheckboxField
          as={Col}
          md="6"
          className="mb-3"
          controlId={"p-full-form-06"}
          label="Use as Start or End Point"
          name="startOrEnd"
        />
      </Row>
      <div className="d-flex justify-content-between align-items-center pt-4 pb-4">
        <h3>Location</h3>
        <Button variant="warning" onClick={handleShow} >
          Select Location
        </Button>
      </div>
      <Row className="mb-3">
        <TextField
          as={Col}
          md="6"
          controlId={"p-full-form-07"}
          label={"Title"}
          name={"location.title"}
          placeholder={"Please enter a Location title"}
          required
          // readOnly={values["location.title"]}
        />
        <SelectField
          as={Col}
          md="6"
          controlId={"p-full-form-08"}
          label={"LCDA"}
          name={"location.lcda"}
          placeholder={"Please select"}
          options={lcdas}
          required
        />
      </Row>
      <Row className="mb-3">
        <TextField
          as={Col}
          md="6"
          controlId={"p-full-form-09"}
          label="City"
          name="location.city"
          placeholder="e.g. Ikorodu"
          required
          // readOnly={values["location.id"]}
        />
        <TextField
          as={Col}
          md="6"
          controlId={"p-full-form-10"}
          label="Area"
          name="location.area"
          placeholder="e.g. Maya"
          required
          // readOnly={values["location.id"]}
        />
      </Row>
      <Row className="mb-3">
        <TextAreaField
          as={Col}
          md="6"
          controlId={"p-full-form-11"}
          label="Description"
          name="location.description"
          placeholder="Description"
          required
        />
        <TextAreaField
          as={Col}
          md="6"
          controlId={"p-full-form-12"}
          label="Landmark"
          name="location.landmark"
          placeholder="Landmark"
          required
        />
      </Row>
      <SubmitBtn text={"Submit"} />
      <XPModal
        show={show}
        handleClose={handleClose}
        modalHeading={"Select Location"}
        closeBtn={"Close"}>
        <SinglePickUpModal locations={locations} setSelectedLocation={setSelectedLocation} />
      </XPModal>
    </Form>
  );
};



const initialState = {
  id: "",
  name: "",
  title: "",
  busStop: "",
  description: "",
  status: false,
  startOrEnd: false,
  locationId: "",
  location: {
    id: "",
    title: "",
    landmark: "",
    description: "",
    city: "",
    lcda: "",
    area: "",
  },
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
    name: "busStop",
    label: "Bus Stop",
    isRequired: true,
    minLength: 2,
    maxLength: 50,
    pattern: NO_SPECIAL_CHARS_REGEX,
  },
  {
    name: "description",
    label: "Description",
    isRequired: true,
    minLength: 2,
    maxLength: 300,
    pattern: NO_SPECIAL_CHARS_REGEX,
  },
  {
    name: "location.landmark",
    label: "Landmark",
    isRequired: true,
    minLength: 3,
    maxLength: 150,
    pattern: NO_SPECIAL_CHARS_REGEX,
  },
  {
    name: "location.title",
    label: "title",
    isRequired: true,
    minLength: 0,
    maxLength: 150,
    pattern: NO_SPECIAL_CHARS_REGEX,
  },
  {
    name: "location.city",
    label: "City",
    isRequired: true,
    minLength: 2,
    maxLength: 50,
    pattern: NO_SPECIAL_CHARS_REGEX,
  },
  {
    name: "location.description",
    label: "Description",
    isRequired: true,
    minLength: 2,
    maxLength: 300,
    pattern: NO_SPECIAL_CHARS_REGEX,
  },
  {
    name: "location.lcda",
    label: "LCDA",
    isRequired: true,
    minLength: 2,
    maxLength: 50,
    pattern: NO_SPECIAL_CHARS_REGEX,
  },
  {
    name: "location.area",
    label: "Area",
    isRequired: true,
    minLength: 2,
    maxLength: 50,
    pattern: NO_SPECIAL_CHARS_REGEX,
  },
];
const XPPickupFullForm = withFormHandling({
  initialState,
  validationRules,
  options: {}
})(PickupFullForm);

export default XPPickupFullForm;
