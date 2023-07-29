const { generateUniqueId } = require("../../src/lib/utils");

describe("GenerateId", () => {
  test("Generates a string id of 29 length", () => {
    const id = generateUniqueId();
    expect(id).toHaveLength(29);
  });

  test("Generates unique strings every time", () => {
    [
      generateUniqueId(),
      generateUniqueId(),
      generateUniqueId(),
      generateUniqueId(),
      generateUniqueId(),
      generateUniqueId(),
      generateUniqueId(),
    ].forEach((id, index, arr) => {
      const otherIds = arr.filter((_, i) => i !== index);
      otherIds.forEach((otherId) => {
        expect(id).not.toEqual(otherId);
      });
    });
  });
});
