import supertest from "supertest";
import app from "../src/app.js";
import { createUser, insertUser } from "./factories/userFactory.js";

describe("userController tests", () => {
  describe("POST /sign-up", () => {
    it("given a valid body it should return 201", async () => {
      const user = await createUser();
      const result = await supertest(app)
        .post("/sign-up")
        .send({ email: user.email, password: user.password });
      const status = result.status;
      expect(status).toEqual(201);
    });

    it("given an invalid body it should return 422", async () => {
      const body = {};
      const result = await supertest(app).post("/sign-up").send(body);
      const status = result.status;
      expect(status).toEqual(422);
    });

    it("given a body with duplicate email it should return 409", async () => {
      const user = await createUser();
      await insertUser(user);
      const result = await supertest(app)
        .post("/sign-up")
        .send({ email: user.email, password: user.password });
      const status = result.status;
      expect(status).toEqual(409);
    });
  });
  describe("POST /sign-in", () => {
    it("should answer with status 200 when credentials are valid", async () => {
      const user = await createUser();
      const insertedUser = await insertUser(user);

      const response = await supertest(app)
        .post("/sign-in")
        .send({ email: insertedUser.email, password: user.password });
      expect(response.status).toBe(200);
    });

    it("should answer with status 401 when credentials are invalid", async () => {
      const user = await createUser();

      const response = await supertest(app)
        .post("/sign-in")
        .send({ email: user.email, password: user.password });
      expect(response.status).toBe(401);
    });

    it("given an invalid body it should return 422", async () => {
      const body = {};

      const response = await supertest(app).post("/sign-in").send(body);
      expect(response.status).toBe(422);
    });
  });
});
