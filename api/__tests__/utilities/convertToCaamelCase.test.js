const { convertToCamelCase } = require("../../src/utils/helper");

describe("Converts Snake Case to camel case", () => {
  test("converts snake_case to camelCase", () => {
    const snakeCaseObj = {
      first_name: "John",
      last_name: "Doe",
      email_address: "test@test.com",
    };
    const camelCaseObj = convertToCamelCase(snakeCaseObj);
    expect(camelCaseObj).toEqual({
      firstName: "John",
      lastName: "Doe",
      emailAddress: "test@test.com",
    });
  });

  test("converts snake_case to camelCase 2", () => {
    const moreComplexSnakeCaseObj = {
      first_name: "John",
      last_name: "Doe",
      phone_number: "08012345678",
      email_address: "test@test.com",
      address: {
        street_address: "No 1, Test Street",
        city: "Lagos",
        state: "Lagos",
      },
    };
    const moreComplexCamelCaseObj = convertToCamelCase(moreComplexSnakeCaseObj);
    expect(moreComplexCamelCaseObj).toEqual({
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "08012345678",
      emailAddress: "test@test.com",
      address: {
        streetAddress: "No 1, Test Street",
        city: "Lagos",
        state: "Lagos",
      },
    });
  });
});
