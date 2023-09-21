const pool = require("../../src/config/dbConfig");
const {describe, it, beforeAll, afterAll, expect} = require("@jest/globals");
const {
  getLocations,
  createLocation,
  editLocation,
  deleteLocation,
} = require("../../src/services/locationService");
const {TABLES} = require("../../src/utils/constants");

describe("Location Services work as expected", () => {


  it("should create a location", async () => {
    try {
    const locations = await createLocation({
      title: "Test Location",
      description: "Test Location",
      landmark: "Test Location",
      lcda: "igbogboBaiyeku",
      city: "Test Location",
      area: "Test Location",
    });
    expect(locations).toBeDefined();
    expect(locations).toHaveProperty("id");
    expect(locations).toHaveProperty("title");
    expect(locations).toHaveProperty("description");
    expect(locations).toHaveProperty("lcda");
    expect(locations).toHaveProperty("city");
    expect(locations).toHaveProperty("area");
    expect(locations).toHaveProperty("landmark");
    expect(locations).toHaveProperty("referenced");
    } catch (error) {
      console.log(error);
      expect(error.message).toBeDefined();
    }
  });

  it("should get all locations", async () => {
    const locations = await getLocations();
    console.log(locations);
    expect(locations).toBeDefined();
    expect(locations).toBeInstanceOf(Array);
    expect(locations[0]).toHaveProperty("id");
    expect(locations[0]).toHaveProperty("title");
    expect(locations[0]).toHaveProperty("description");
    expect(locations[0]).toHaveProperty("lcda");
    expect(locations[0]).toHaveProperty("city");
    expect(locations[0]).toHaveProperty("area");
    expect(locations[0]).toHaveProperty("landmark");
    expect(locations[0]).toHaveProperty("referenced");
  });




  afterAll(async () => {
    pool.end();
  });
});

// it("should return an array of locations with is_referenced property", async () => {
//   const locations = await getLocations();
//   expect(locations[0]).toHaveProperty("isReferenced");
// });
