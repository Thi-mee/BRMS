import { Form } from "react-bootstrap";


export const InputField = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  required,
  disabled,
  readOnly,
  ...rest
}) => (
  <Form.Group {...rest}>
    <Form.Label className={required ? "required-label" : ""}>
      {label}
    </Form.Label>
    <Form.Control
      required
      type="text"
      name={name}
      className={readOnly ? "read-only" : ""}
      placeholder={placeholder}
      value={value}
      isInvalid={!!error}
      onChange={onChange}
      disabled={disabled}
      readOnly={readOnly}
    />
    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
  </Form.Group>
);

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
 * value: string,
 * onChange: function,
 * required: boolean,
 * error: string,
 * }} param0
 * @returns
 */
export const TextAreaField = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  required,
  ...rest
}) => (
  <Form.Group {...rest}>
    <Form.Label className={required ? "required-label" : ""}>
      {label}
    </Form.Label>
    <Form.Control
      required
      as="textarea"
      name={name}
      placeholder={placeholder}
      value={value}
      isInvalid={!!error}
      onChange={onChange}
    />
    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
  </Form.Group>
);

/**
 *
 * @param {{
 *  as: React.ElementType,
 * md: string,
 * controlId: string,
 * label: string,
 * type: string,
 * placeholder: string,
 * name: string,
 * value: string,
 * onChange: function,
 * required: boolean,
 * options: Array<{
 * value: string,
 * label: string,
 *  }>,
 * error: string,
 * }} param0
 * @returns
 */
export const SelectField = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  required,
  options,
  as,
  md,
  controlId,
  type,
  ...rest
}) => (
  <Form.Group {...rest}>
    <Form.Label className={required ? "required-label" : ""}>
      {label}
    </Form.Label>
    <Form.Control
      required
      as="select"
      name={name}
      placeholder={placeholder}
      value={value}
      isInvalid={!!error}
      onChange={onChange}>
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </Form.Control>
    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
  </Form.Group>
);

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
 * value: string,
 * onChange: function,
 * required: boolean,
 * value: boolean,
 *
 * }} param0
 * @returns
 */
export const CheckboxField = ({
  label,
  name,
  value,
  onChange,
  error,
  ...rest
}) => {
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    onChange({ target: { name, value: checked } });
  };

  return (
    <Form.Group {...rest}>
      {label ? (
        <Form.Check
          label={label}
          name={name}
          checked={value}
          onChange={handleCheckboxChange}
        />
      ) : (
        <Form.Check
          aria-label="option 1"
          name={name}
          checked={value}
          onChange={handleCheckboxChange}
        />
      )}
    </Form.Group>
  );
};
