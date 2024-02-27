import { test, it, describe, expect, beforeAll, afterAll } from "@jest/globals";
import app from "../src/index";
import superApp, { Request, Response } from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import supertest from "supertest";
import { string } from "joi";
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
  it("/api/ for all", async () => {
    const result = await supertest(app).get("/api/");
    expect(result.status).toBe(404);
  });
  it("/api/ for blogs", async () => {
    const show = await supertest(app).get("/api/blog");
    expect(show.status).toBe(404);
  });
  it("/api/ for query", async () => {
    const show = await supertest(app).get("/api/query");
    expect(show.status).toBe(200);
  });
  it("/api/ for signup", async () => {
    const show = await supertest(app).get("/api/signup");
    expect(show.status).toBe(404);
  });
  it("/api/ for 404", async () => {
    const show = await supertest(app).get("/api/login");
    expect(show.status).toBe(404);
  });
  it("comment creation", async () => {
    const show = await supertest(app).get("/api/blogs/:id/comments");
    expect(show.status).toBe(200);
  });
  it("add likes", async () => {
    const show = await supertest(app).post("/api/blogs/:id/like");
    expect(show.status).toBe(500);
  });
  it("querry", async () => {
    const show = await supertest(app).post("/api/query");
    expect(show.status).toBe(400);
  });
  it("querry", async () => {
    const show = await supertest(app).get("/api/query");
    expect(show.status).toBe(200);
  });
  it("querry", async () => {
    const show = await supertest(app).get("/api/query/:id");
    expect(show.status).toBe(500);
  });
  it("querry", async () => {
    const show = await supertest(app).patch("/api/query/:id");
    expect(show.status).toBe(404);
  });
  it("blogs", async () => {
    const show = await supertest(app).post("/api/blogs");
    expect(show.status).toBe(400);
  });
  it("blogs", async () => {
    const show = await supertest(app).get("/api/blogs");
    expect(show.status).toBe(400);
  });
  it("controller", async () => {
    const show = await supertest(app).get("/api/blogs/:id");
    expect(show.status).toBe(404);
  });
  it("controller", async () => {
    const show = await supertest(app).patch("/api/blogs/:id");
    expect(show.status).toBe(400);
  });
  it("comment", async () => {
    const show = await supertest(app).post("/api/blogs/:id/comments");
    expect(show.status).toBe(400);
  });
  it("comment", async () => {
    const show = await supertest(app).get("/api/blogs/:id/comments");
    expect(show.status).toBe(200);
  });
  it("comment", async () => {
    const show = await supertest(app).patch("/api/blogs/:id/comments/:id");
    expect(show.status).toBe(400);
  });
  it("comment", async () => {
    const show = await supertest(app).delete("/api/blogs/:id/comments/:id");
    expect(show.status).toBe(400);
  });
  it("like", async () => {
    const show = await supertest(app).delete("/api/blogs/likes");
    expect(show.status).toBe(404);
  });
  test("existong user signing up", async () => {
    const payload: {
      userName: string;
      email: string;
      password: string;
    } = {
      userName: "IRASUBIZA Elyse",
      email: "ELYSE@gmail.com",
      password: "harry123",
    };

    const response = await supertest(app).post("/api/signup").send(payload);
    expect(response.body.message).toContain("User already exist");
  });
  it("if user have invalide Email", async () => {
    const payload: {
      email: string;
      password: string;
    } = {
      email: "elyse@gmail.com",
      password: "12345",
    };
    const res = await supertest(app)
      .post("/api/blogs")
      .send({
        title: "",
        content: "",
      })
      .set("email", payload.email)
      .set("password", payload.password);
    expect(res.statusCode).toBe(400);
  });
});
