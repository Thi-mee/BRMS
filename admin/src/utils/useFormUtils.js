import { useCallback, useRef, useState, useMemo } from "react";
import { convertNestedToNotNested, convertNotNestedToNested } from "./conversions";


export const useFormUtils = (initialState, validationRules) => {
  const [values, setValues] = useState(() => convertNestedToNotNested(initialState));
  const initialFormState = useRef(initialState);
  const validationRulesRef = useRef(validationRules);
  const [errors, setErrors] = useState({});


  const handleValueChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const isOwnProperty = values.hasOwnProperty(name);
    if (!!isOwnProperty) {
      const newValue = type === 'checkbox' ? checked : value;
      setValues((prevValues) => ({
        ...prevValues,
        [name]: newValue,
      }));
      if (!!errors[name]) {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
      }
    }
  }, [errors, values]);

  const validateForm = useCallback(() => {
    const newErrors = {}

    validationRulesRef.current.forEach((rule) => {
      const value = values[rule.name];
      if (!value || value === "") {
        newErrors[rule.name] = `Kindly Supply ${rule.label}!`
      }
      else if (value.trim().length < rule.minLength) {
        newErrors[rule.name] = `${rule.label} is too short!`
      }
      else if (rule.pattern && !rule.pattern.test(value.trim())) {
        newErrors[rule.name] = `${rule.label} is invalid!`
      }
      else if (value.trim().length > rule.maxLength) {
        newErrors[rule.name] = `${rule.label} is too long!`
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values]);

  const initForm = useCallback((formdata, newValidationRules) => {
    if (formdata) {
      setValues(convertNestedToNotNested(formdata));
      validationRulesRef.current = newValidationRules ?? validationRulesRef.current;
      initialFormState.current = formdata;
    }
    else {
      setValues(convertNestedToNotNested(initialFormState.current));
      setErrors({});
    }
  }, []);

  const setFields = useCallback((fields) => {
    setValues((prevValues) => ({
      ...prevValues,
      ...fields,
    }));

    // set errors on fields passes to null
    const newErrors = {}
    Object.keys(fields).forEach((key) => {
      if (!!errors[key]) {
        newErrors[key] = null;
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(prevErrors => ({ ...prevErrors, ...newErrors }));
    }
  }, [errors]);

  const getFormattedValues = useCallback(() => {
    const formattedValues = {};
    Object.keys(values).forEach((key) => {
      formattedValues[key] = values[key];
    });
    return convertNotNestedToNested(formattedValues);
  }, [values]);
  
  const valuesChanged = useCallback(() => {
    const formattedValues = getFormattedValues();
    return JSON.stringify(formattedValues) !== JSON.stringify(initialFormState.current);
  }, [getFormattedValues]);


  const passedDownValues = useMemo(() => {
    return {
      values,
      errors,
      handleValueChange,
      validateForm,
      initForm,
      setFields,
      getFormattedValues,
      valuesChanged
    };
  }, [
    values,
    errors,
    handleValueChange,
    validateForm,
    initForm,
    setFields,
    getFormattedValues,
    valuesChanged
  ])

  return passedDownValues;
};