import React, {useState} from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFormUtils } from "../../utils/FormUtils";

const AppForm = ({
  first_label,
  second_label,
  third_label_item,
  third_label,
  fourth_label,
  fifth_label,
  fourth_label_item,
  btn_text,
}) => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const { handleValueChange, form } = useFormUtils()

  const handleSubmit = (event) => {
    const formTarget = event.currentTarget;
    event.preventDefault();
    if (formTarget.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    console.log(form)
  };


  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      {btn_text && (
        <div className="component_container button_container">
          <Button variant="secondary" className="m-2" type="submit">
            {btn_text}
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
      )}
      <Row className="mb-3">
        {first_label && (
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>
              {first_label} <span>*</span>
            </Form.Label>
            <Form.Control
              required
              type="text"
              name={first_label}
              placeholder={first_label}
              defaultValue=""
              onChange={(e)=>{handleValueChange(e)}}
            />
            <Form.Control.Feedback type="invalid">
              Please Provide a valid {first_label}!
            </Form.Control.Feedback>
          </Form.Group>
        )}
        {second_label && (
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>{second_label}</Form.Label>
            <Form.Control
              type="text"
              name={second_label}
              placeholder={second_label}
              defaultValue=""
              onChange={(e)=>{handleValueChange(e)}}
            />
          </Form.Group>
        )}
      </Row>
      <Row className="mb-3">
        {third_label && (
          <Form.Group
            as={Col}
            md={third_label_item ? "6" : "12"}
            controlId="validationCustom03"
          >
            <Form.Label>
              {third_label} <span>*</span>
            </Form.Label>
            <Form.Control type="text" placeholder={third_label} required name={third_label} onChange={(e)=>{handleValueChange(e)}} />
            <Form.Control.Feedback type="invalid">
              Please provide a valid {third_label}!
            </Form.Control.Feedback>
          </Form.Group>
        )}
        {third_label_item && (
          <Form.Group
            as={Col}
            md={third_label_item ? "6" : "12"}
            controlId="validationCustom03"
          >
            <Form.Label>
              {third_label_item} <span>*</span>
            </Form.Label>
            <Form.Control type="text" placeholder={third_label_item} required name={third_label_item} onChange={(e)=>{handleValueChange(e)}} />
            <Form.Control.Feedback type="invalid">
              Please provide a valid {third_label_item}!
            </Form.Control.Feedback>
          </Form.Group>
        )}
      </Row>
      <Row className="mb-3">
        {fourth_label && (
          <Form.Group
            as={Col}
            md={fourth_label_item ? "6" : "12"}
            controlId="validationCustom03"
          >
            <Form.Label>
              {fourth_label} <span>*</span>
            </Form.Label>
            <Form.Control
              required
              as="textarea"
              placeholder={`Leave a ${fourth_label} here`}
              name={fourth_label}
              onChange={(e)=>{handleValueChange(e)}}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid {fourth_label}!
            </Form.Control.Feedback>
          </Form.Group>
        )}
        {fourth_label_item && (
          <Form.Group
            as={Col}
            md={fourth_label_item ? "6" : "12"}
            controlId="validationCustom03"
          >
            <Form.Label>
              {fourth_label_item} <span>*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              placeholder={`Leave a ${fourth_label_item} here`}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid {fourth_label}!
            </Form.Control.Feedback>
          </Form.Group>
        )}
      </Row>
      <Form.Group className="mb-3">
        {fifth_label && <Form.Check label={fifth_label} name={fifth_label} onChange={(e)=>{handleValueChange(e)}} />}
      </Form.Group>
    </Form>
  );
};

export default AppForm;
