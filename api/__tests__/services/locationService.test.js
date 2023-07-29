const pool = require("../../src/config/dbConfig");
const {
  getLocations,
  createLocation,
  editLocation,
  deleteLocation,
} = require("../../src/services/locationService");
const { initialLocationData } = require("./data/locationsData");

const testTable = "brms.locationstest";

describe("Location Services work as expected", () => {
  beforeAll(async (done) => {
    await pool.query(
      `CREATE TABLE brms.locationstest AS TABLE brms.locations;`
    );
    // const query = `
    //   INSERT INTO
    //     brms.locationstest
    //     (id, title, description, lcda, city, area, landmark)
    //   VALUES
    //     ${initialLocationData.forEach(
    //       (_, i) =>
    //         `($${i * 7 + 1}, $${i * 7 + 2}, $${i * 7 + 3}, $${i * 7 + 4}, $${
    //           i * 7 + 5
    //         }, $${i * 7 + 6}, $${i * 7 + 7})`
    //     )}
    //   RETURNING *;
    // `;
    // const values = [...initialLocationData];
    // await pool.query(query, values);
    done();
  });
  afterAll(async () => {
    await pool.query("DROP TABLE IF EXISTS brms.locationstest");
    pool.end();
  });

  it("should return an array of locations", async () => {
    const locations = await getLocations();
    expect(locations).toBeInstanceOf(Array);
    if (locations.length > 0) {
      expect(locations[0]).toHaveProperty("id");
      expect(locations[0]).toHaveProperty("title");
      expect(locations[0]).toHaveProperty("description");
      expect(locations[0]).toHaveProperty("lcda");
      expect(locations[0]).toHaveProperty("city");
      expect(locations[0]).toHaveProperty("area");
      expect(locations[0]).toHaveProperty("landmark");
      expect(locations[0]).toHaveProperty("isReferenced");
    }
  });

  // afterAll(async () => {
  //   await pool.query("DROP TABLE IF EXISTS brms.locationstest");
  // });
});

// it("should return an array of locations with is_referenced property", async () => {
//   const locations = await getLocations();
//   expect(locations[0]).toHaveProperty("isReferenced");
// });
