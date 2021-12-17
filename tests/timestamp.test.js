const request = require("supertest");
const app = require("./../app");

describe("Testing timestamp API with valid date", () => {
  let responseTimestamp;

  test("GET /api/2015-12-25 with valid date should return a JSON", () => {
    return request(app)
      .get("/api/2015-12-25")
      .expect(200)
      .expect("Content-Type", /json/);
  });

  test("GET /api/2015-12-25 -> response JSON should have a unix key", () => {
    return request(app)
      .get("/api/2015-12-25")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({ unix: expect.any(Number) })
        );
      });
  });

  test("GET /api/2015-12-25 -> response JSON should return valid unix 1451001600000", () => {
    return request(app)
      .get("/api/2015-12-25")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({ unix: 1451001600000 })
        );
      });
  });

  test("GET /api/2015-12-26 -> response JSON should return valid unix 1451088000000", () => {
    return request(app)
      .get("/api/2015-12-26")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({ unix: 1451088000000 })
        );
      });
  });

  test("GET /api/2015-12-25 -> response JSON should have an utc key", () => {
    return request(app)
      .get("/api/2015-12-25")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({ utc: expect.any(String) })
        );
      });
  });

  test("GET /api/2015-12-25 -> response JSON utc key should be in format Fri, 25 Dec 2015 00:00:00 GMT", () => {
    return request(app)
      .get("/api/2015-12-25")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({ utc: "Fri, 25 Dec 2015 00:00:00 GMT" })
        );
      });
  });

  test("GET /api/2015-12-26 -> response JSON utc key should be in format Sat, 26 Dec 2015 00:00:00 GMT", () => {
    return request(app)
      .get("/api/2015-12-26")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({ utc: "Sat, 26 Dec 2015 00:00:00 GMT" })
        );
      });
  });
});

describe("Test API timestamp with invalid date", () => {
  test("GET /api/2015-13-32 should return status 400", () => {
    return request(app).get("/api/2015-13-32").expect(400);
  });

  test('GET /api/2015-13-32 should return JSON having the structure { error : "Invalid Date" } ', () => {
    return request(app)
      .get("/api/2015-13-32")
      .expect(400)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({ error: "Invalid Date" })
        );
      });
  });
});

describe("Test API timestamp with unix timestamp", () => {
  test('GET /api/1451001600000 should return JSON {"unix":1451001600000,"utc":"Fri, 25 Dec 2015 00:00:00 GMT"}', () => {
    return request(app)
      .get("/api/1451001600000")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            unix: 1451001600000,
            utc: "Fri, 25 Dec 2015 00:00:00 GMT",
          })
        );
      });
  });
});

describe("Test API timestamp whitout params", () => {
  test("GET /api/ should return JSON with current timestamp", () => {
    let currentTimestamp = new Date().toUTCString();
    return request(app)
      .get("/api/")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            utc: currentTimestamp,
          })
        );
      });
  });
});
