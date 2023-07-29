

class Validator {
  #validationRules;
  constructor(validationRules) {
    this.#validationRules = validationRules;
  }

  validate(data) {
    const errors = [];

    for (const rule of this.#validationRules) {
      const { field, validator, message } = rule;
      const value = data[field];


      if (errors.length > 0 && errors.some((i) => i.field === field)) {
        continue;
      }
      
      if (!validator(value)) {
        errors.push({ field, message });
      }
    }

    return errors;
  }
}

module.exports = Validator;