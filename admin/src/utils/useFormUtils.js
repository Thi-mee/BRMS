import { useRef, useState } from "react";


export const useFormUtils = (initialState, validationRules) => {
  const [form, setForm] = useState(initialState);
  const initialFormState = useRef(initialState);
  const validationRulesRef = useRef(validationRules);
  const [errors, setErrors] = useState({});

  const handleValueChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      console.log(name, value);
      const [parent, child] = name.split('.');
      setForm((prevForm) => ({ ...prevForm, [parent]: { ...prevForm[parent], [child]: value } }));
      if (!!errors[name]) {
        setErrors((prevErrors) => ({ ...prevErrors, [parent]: { ...prevErrors[parent], [child]: null } }));
      }
    } else {
      setForm({ ...form, [name]: value });
      if (!!errors[name]) {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
      }
    };
  };


  const validateSubmission = (e) => {
    e && e.preventDefault();
    const newErrors = new Map();

    validationRulesRef.current.forEach((rule) => {
      const value = form[rule.name] || form[rule.name.split('.')[0]][rule.name.split('.')[1]];

      if (rule.name.includes('.')) {
        const [parent, child] = rule.name.split('.');

        if (!value || value === "") {
          newErrors.set(parent, { ...newErrors.get(parent), [child]: `Kindly Supply ${rule.label}!` })
        }
        else if (value.length < rule.minLength) {
          newErrors.set(parent, { ...newErrors.get(parent), [child]: `${rule.label} is too short!` })
        }
        else if (value.length > rule.maxLength) {
          newErrors.set(parent, { ...newErrors.get(parent), [child]: `${rule.label} is too long!` })
        }
      } else {
        if (!value || value === "") {
          newErrors.set(rule.name, `Kindly Supply ${rule.label}!`);
        }
        else if (value.length < rule.minLength) {
          newErrors.set(rule.name, `${rule.label} is too short!`);
        }
        else if (value.length > rule.maxLength) {
          newErrors.set(rule.name, `${rule.label} is too long!`);
        }
      }
    });

    if (newErrors.size > 0) {
      setErrors(Object.fromEntries(newErrors));
      return false;
    }

    return true;
  };


  const initForm = (formdata, newValidationRules) => {
    if (formdata) {
      setForm(formdata);
      validationRulesRef.current = newValidationRules ?? validationRulesRef.current;
      initialFormState.current = formdata;
    }
    else {
      setForm(initialFormState.current);
      setErrors({});
    }
  };

  const setFormValues = (object) => {
    setForm((prevForm) => ({ ...prevForm, ...object }));

    // set errors on object passes to null
    const newErrors = new Map();
    Object.keys(object).forEach((key) => {
      if (!!errors[key]) {
        newErrors.set(key, {});
      }
    }
    );
    if (newErrors.size > 0) {
      setErrors(prevErrors => ({ ...prevErrors, ...Object.fromEntries(newErrors) }));
    }
  };

  return {
    handleValueChange,
    form,
    errors,
    initForm,
    setFormValues,
    validateSubmission,
  };
};

