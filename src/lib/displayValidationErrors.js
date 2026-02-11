/** Pass to class-validator validate() so plain DTOs without decorators don't trigger "unknown value" errors (v0.14+). */
export const VALIDATION_OPTIONS = { forbidUnknownValues: false };

export const displayValidationErrors = (validationErrors) => {
  if (validationErrors && validationErrors.length > 0) {
    const errors = validationErrors.map((v) => {
      return {
        // property: v.property,
        messages: [...iterateConstrains(v.constraints)],
      };
    });
    return errors;
  }
};

function iterateConstrains(constrains) {
  const arr = [];
  if (constrains !== null) {
    for (let key in constrains) {
      arr.push(constrains[key]);
    }
  }
  return arr;
}
