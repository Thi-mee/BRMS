

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

      if (!validator(value)) {
        errors.push({ field, message });
      }
    }

    return errors;
  }
}

module.exports = Validator;