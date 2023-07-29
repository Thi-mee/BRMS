import { Form } from "react-bootstrap";
import { useFormContext } from "./FormHandler";

export const TextField = ({
  required,
  label,
  name,
  readOnly,
  placeholder,
  as = "div",
  disabled = false,
  controlId,
  md,
}) => {
  const { values, errors, handleValueChange } = useFormContext();
  const inputValue = values[name];
  const error = errors[name];

  return (
    <Form.Group as={as} controlId={controlId ?? "balablu"} md={md}>
      <Form.Label className={required ? "required-label" : ""}>
        {label}
      </Form.Label>
      <Form.Control
        type="text"
        name={name}
        className={readOnly ? "read-only" : ""}
        placeholder={placeholder}
        value={inputValue}
        isInvalid={!!error}
        onChange={handleValueChange}
        disabled={disabled}
        readOnly={readOnly}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export const TextAreaField = ({
  label,
  name,
  placeholder,
  required = false,
  ...rest
}) => {
  const { values, errors, handleValueChange } = useFormContext();
  const inputValue = values[name];
  const error = errors[name];

  return (
    <Form.Group {...rest}>
      <Form.Label className={required ? "required-label" : ""}>
        {label}
      </Form.Label>
      <Form.Control
        as="textarea"
        name={name}
        placeholder={placeholder}
        value={inputValue}
        isInvalid={!!error}
        onChange={handleValueChange}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

/**
 *
 * @param {{
 * as: React.ElementType,
 * md: string,
 * controlId: string,
 * label: string,
 * type: string,
 * placeholder: string,
 * name: string,
 * required: boolean,
 * options: Array<{
 * value: string,
 * label: string,
 *  }>,
 * }} param0
 * @returns
 */
export const SelectField = ({
  label,
  name,
  placeholder,
  required,
  options = [],
  as = "div",
  md,
  controlId,
  type,
  disabled = false,
  readOnly = false,
  ...rest
}) => {
  const { values, errors, handleValueChange } = useFormContext();
  const inputValue = values[name];
  const error = errors[name];

  return (
    <Form.Group as={as} md={md} controlId={controlId}>
      <Form.Label className={required ? "required-label" : ""}>
        {label}
      </Form.Label>
      <Form.Control
        as="select"
        name={name}
        placeholder={placeholder}
        value={inputValue}
        isInvalid={!!error}
        readOnly={readOnly}
        disabled={disabled}
        onChange={handleValueChange}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Control>
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

/**
 *
 * @param {{
 * as: React.ElementType,
 * md: string,
 * controlId: string,
 * label: string,
 * placeholder: string,
 * name: string,
 * required: boolean,
 * }} param0
 * @returns
 */
export const CheckboxField = ({
  label,
  name,
  value,
  as = "div",
  controlId,
  className = "",
  md,
  ...rest
}) => {
  const { values, errors, handleValueChange } = useFormContext();
  const inputValue = values[name];
  const error = errors[name];
  return (
    <Form.Group as={as} controlId={controlId} className={className} md={md}>
      <Form.Check
        label={label}
        name={name}
        checked={inputValue}
        onChange={handleValueChange}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};
