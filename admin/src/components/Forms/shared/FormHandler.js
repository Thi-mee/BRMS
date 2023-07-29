import {
    createContext,
    useCallback,
    useContext,
    useMemo, useRef,
    useState,
} from "react";

const FormContext = createContext(null);

const FormHandler = ({ initialState, validationRules, options, children, onSubmit }) => {
    const [values, setValues] = useState(convertToNonNested(initialState));
    const [errors, setErrors] = useState({});
    const initialFormState = useRef(convertToNonNested(initialState));
    const validationRulesRef = useRef(validationRules);

    const handleValueChange = useCallback(
        (e) => {
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
        },
        [errors, values]
    );

    const validateForm = useCallback(
        () => {
        const newErrors = {};

        validationRulesRef.current.forEach((rule) => {
            const fieldName = rule.name;
            const fieldValue = values[fieldName];

            if (rule.isRequired && (!fieldValue || fieldValue === "")) {
                newErrors[fieldName] = `Kindly supply ${rule.label}!`;
            } else if (rule.minLength && fieldValue.trim().length < rule.minLength) {
                newErrors[fieldName] = `${rule.label} is too short!`;
            } else if (rule.maxLength && fieldValue.trim().length > rule.maxLength) {
                newErrors[fieldName] = `${rule.label} is too long!`;
            } else if (rule.pattern && !rule.pattern.test(fieldValue)) {
                newErrors[fieldName] = `Invalid ${rule.label}!`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    },
        [values]
    );

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            const isValid = validateForm();
            if (isValid) {
                // Perform submission logic here
                console.table(values);
                console.log("Form submitted successfully!");
                await onSubmit(convertToNested(values))
            }
        },
        [validateForm, onSubmit, values]
    );

    const handleArrayChange = useCallback(
        (e, arrayName, index) => {
            const { name, value } = e.target;
            setValues((prevForm) => {
                const newArray = [...prevForm[arrayName]];
                newArray[index] = value;
                return { ...prevForm, [arrayName]: newArray };
            });
            if (!!errors[arrayName] && !!errors[arrayName][index]) {
                setErrors((prevErrors) => {
                    const newErrors = { ...prevErrors };
                    newErrors[arrayName][index] = null;
                    return newErrors;
                });
            }
        },
        [errors]
    );

    const handleAddArrayItem = useCallback((arrayName) => {
        setValues((prevForm) => {
            const newArray = [...prevForm[arrayName], ""];
            return { ...prevForm, [arrayName]: newArray };
        });
    }, []);

    const handleRemoveArrayItem = useCallback((arrayName, index) => {
        setValues((prevForm) => {
            const newArray = [...prevForm[arrayName]];
            newArray.splice(index, 1);
            return { ...prevForm, [arrayName]: newArray };
        });
    }, []);

    const handleResetForm = useCallback(() => {
        setValues(initialFormState.current);
        setErrors({});
    }, []);

    const initForm = useCallback((formData, newValidationRules) => {
        if (formData && newValidationRules) {
            setValues(convertToNonNested(formData));
            initialFormState.current = convertToNonNested(formData);
            validationRulesRef.current = newValidationRules;
        } else {
            console.warn('formData and validation rules must be passed into initForm()')
        }
    }, []);

    const setFields = useCallback((updatedFieldsObj) => {
        setValues((prevValues) => ({
            ...prevValues,
            ...updatedFieldsObj,
        }));

        // set errors on fields passes to null
        const newErrors = {}
        Object.keys(updatedFieldsObj).forEach((key) => {
            if (!!errors[key]) {
                newErrors[key] = null;
            }
        });
        if (Object.keys(newErrors).length > 0) {
            setErrors(prevErrors => ({ ...prevErrors, ...newErrors }));
        }
    }, [errors]);

    const value = useMemo(
        () => ({
            values,
            errors,
            handleValueChange,
            handleSubmit,
            handleArrayChange,
            handleAddArrayItem,
            handleRemoveArrayItem,
            handleResetForm,
            options,
            initForm,
            setFields
        }),
        [
            values,
            errors,
            handleValueChange,
            handleSubmit,
            handleArrayChange,
            handleAddArrayItem,
            handleRemoveArrayItem,
            handleResetForm,
            options,
            initForm,
            setFields
        ]
    );
    return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export default FormHandler;
export const useFormContext = () => useContext(FormContext);


function convertToNonNested(obj) {
    const result = {};

    for (const key in obj) {
        if (typeof obj[key] === 'object') {
            for (const nestedKey in obj[key]) {
                const newKey = `${key}.${nestedKey}`;
                result[newKey] = obj[key][nestedKey];
            }
        } else {
            result[key] = obj[key];
        }
    }

    return result;
}

function convertToNested(obj) {
    const result = {};

    for (const key in obj) {
        const nestedKeys = key.split('.');
        let nestedObj = result;

        for (let i = 0; i < nestedKeys.length - 1; i++) {
            const nestedKey = nestedKeys[i];

            if (!nestedObj[nestedKey]) {
                nestedObj[nestedKey] = {};
            }

            nestedObj = nestedObj[nestedKey];
        }

        nestedObj[nestedKeys[nestedKeys.length - 1]] = obj[key];
    }

    return result;
}