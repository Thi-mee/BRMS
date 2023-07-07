import { useState } from "react";
import { pickupFormInit } from "../../models/Picup";
import { locationFormInit } from "../../models/Picup";

export const useFormUtils = () => {
  const [form, setForm] = useState(pickupFormInit);
  const [locationForm, setLocationForm] = useState(locationFormInit);
  const [errors, setErrors] = useState({});
  const [locationError, setLocationError] = useState({});

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "checkbox") {
      setForm({ ...form, [name]: e.target.checked });
    } else {
      setForm({ ...form, [name]: value });
    }
    // console.log(form)
    if (!!errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };

  const handleValueLocationChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "checkbox") {
      setLocationForm({ ...locationForm, [name]: e.target.checked });
    } else {
      setLocationForm({ ...locationForm, [name]: value });
    }
    // console.log(locationForm)
    if (!!errors[name]) {
      setLocationError((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };

  const validateForm = () => {
    const { name, title, busStop, description } = form;
    const newErrors = {};

    const fields = [
      { name: "name", label: "Name", minLength: 3, maxLength: 50 },
      { name: "title", label: "Title", minLength: 0, maxLength: 150 },
      { name: "busStop", label: "Bus Stop", minLength: 2, maxLength: 50 },
      {
        name: "description",
        label: "Description",
        minLength: 2,
        maxLength: 300,
      },
    ];

    fields.forEach((field) => {
      const value = form[field.name];
      if (!value || value === "") {
        newErrors[field.name] = `Kindly Supply ${field.label}!`;
      } else if (value.length < field.minLength) {
        newErrors[field.name] = `${field.label} is too short!`;
      } else if (value.length > field.maxLength) {
        newErrors[field.name] = `${field.label} is too long!`;
      }
    });

    return newErrors;
  };

  const validateLocationForm = () => {
    const { title, landmark, description, city, lcda, area } = locationForm;
    const newErrors = {};

    const fields = [
      { name: "landmark", label: "Landmark", minLength: 3, maxLength: 150 },
      { name: "title", label: "Title", minLength: 0, maxLength: 150 },
      { name: "city", label: "City", minLength: 2, maxLength: 50 },
      {
        name: "description",
        label: "Description",
        minLength: 2,
        maxLength: 300,
      },
      { name: "lcda", label: "LCDA", minLength: 2, maxLength: 50 },
      { name: "area", label: "Area", minLength: 2, maxLength: 50 },
    ];

    for (let i = 0; i < fields.length; i++) {
      const value = locationForm[fields[i].name];
      console.log(value);
      if (!value || value === "") {
        newErrors[fields[i].name] = `Kindly Supply ${fields[i].label}!`;
      } else if (value.length < fields[i].minLength) {
        newErrors[fields[i].name] = `${fields[i].label} is too short!`;
      } else if (value.length > fields[i].maxLength) {
        newErrors[fields[i].name] = `${fields[i].label} is too long!`;
      }
    }

    return newErrors;
  };

  const initForm = (form) => {
    setForm(form);
  };

  const initLocForm = (form) => {
    console.log(form);
    setLocationForm(form)
  }



  return {
    handleValueChange,
    form,
    errors,
    setErrors,
    validateForm,
    initForm,
    handleValueLocationChange,
    locationError,
    setLocationError,
    locationForm,
    validateLocationForm,
    initLocForm
  };
};
