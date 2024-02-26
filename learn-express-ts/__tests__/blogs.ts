import { test, it, describe, expect, beforeAll, afterAll } from "@jest/globals";
import app from "../src/index";
import superApp, { Request, Response } from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import supertest from "supertest";
dotenv.config();
const DB_URL = process.env.MONGODB_URl || "";
console.log("DB_URL");
// beforeAll(async () => {
//   await mongoose.connect(DB_URL);
// }, 50000);

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Test APIs before", () => {
  it("/api/ for 404", async () => {
    const result = await supertest(app).get("/api/");
    expect(result.status).toBe(404);
  });
  it("/api/ for 200", async () => {
    const show = await supertest(app).get("/api/blog");
    expect(show.status).toBe(404);
  });
  it("/api/ for 200", async () => {
    const show = await supertest(app).get("/api/query");
    expect(show.status).toBe(200);
  });
  it("/api/ for 404", async () => {
    const show = await supertest(app).get("/api/signup");
    expect(show.status).toBe(404);
  });
  it("/api/ for 404", async () => {
    const show = await supertest(app).get("/api/login");
    expect(show.status).toBe(404);
  });
  it("comment creationç", async () => {
    const show = await supertest(app).get("/api/blogs/:id/comments");
    expect(show.status).toBe(404);
  });
});
