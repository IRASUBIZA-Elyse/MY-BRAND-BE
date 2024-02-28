import { test, it, describe, expect, beforeAll, afterAll } from "@jest/globals";
import app from "../src/index";
import superApp, { Request, Response } from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import supertest from "supertest";
import { string } from "joi";
import bcrypt from "bcrypt";
import User from "../src/models/userModel";
dotenv.config();
const DB_URL = process.env.MONGODB_URl || "";
console.log(DB_URL);
beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/acmedb");
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Test APIs before", () => {
  it("/api/ for all", async () => {
    const result = await supertest(app).get("/api");
    expect(result.status).toBe(404);
  });
  it("/api/ for blogs", async () => {
    const show = await supertest(app).get("/api/blogs");
    expect(show.status).toBe(200);
  });
  it("/api/ for query", async () => {
    const show = await supertest(app).get("/api/query");
    expect(show.status).toBe(200);
  });
  it("posting a query", async () => {
    const result = await supertest(app).post("/api/query").send({
      author: "Mikel kart",
      email: "mikeharum@gmial.com",
      content: "In publishing and graphic design, placeholder text commonly",
      phoneNumber: "0788834557",
    });
    expect(result.status).toBe(200);
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
    expect(show.status).toBe(200);
  });
  it("controller", async () => {
    const show = await supertest(app).get("/api/blogs/:id");
    expect(show.status).toBe(404);
  });
  it("controller", async () => {
    const id = "65d6137139cf86bd0a219223";
    const show = await supertest(app).patch(
      "/api/blogs/65d6137139cf86bd0a219223"
    );
    expect(show.status).toBe(200);
  });
  it("comment", async () => {
    const show = await supertest(app)
      .post("/api/blogs/65d6137139cf86bd0a219223/comments")
      .send({
        author: "patrick lee",
        email: "emaail@gmail.com",
        content: "vd pleased do",
      });
    expect(show.status).toBe(201);
  });

  it("getting all comments", async () => {
    const show = await supertest(app).get(
      "/api/blogs/65d6137139cf86bd0a219223/comments"
    );
    expect(show.status).toBe(200);
  });
  it("deleting comments", async () => {
    const show = await supertest(app).delete(
      "/api/blogs/65d6137139cf86bd0a219223/comments/65d491c0cd543e4f6a4f841d"
    );
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
    expect(response.body.message).toContain("User already exist!!");
  });
  test("register", async () => {
    const payload: {
      userName: string;
      email: string;
      password: string;
    } = {
      userName: "Gizzo",
      email: "Gizzo@gmail.com",
      password: "password",
    };
    const response = await supertest(app).post("/api/signup").send(payload);
    expect(response.body.message).toContain("Signed up successfully!!");
  });

  test("login", async () => {
    const payload: {
      userName: string;
      email: string;
      password: string;
    } = {
      userName: "Gisubiz",
      email: "Gisubiz@gmail.com",
      password: "password",
    };
    const response = await supertest(app).post("/api/login").send(payload);
    expect(response.body.message).toContain("User not found please register");
  });
  const token2: { token2: string } = { token2: "" };

  it("login and get token", async () => {
    const response = await supertest(app).post("/api/login").send({
      userName: "Gizzo",
      email: "Gizzo@gmail.com",
      password: "password",
    });
    token2.token2 = response.body.data;
    expect(response.status).toBe(200);
  });
  console.log(token2);
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
  it("Posting a blog", async () => {
    const res = await supertest(app)
      .post("/api/blogs")
      .send({
        title: "Testingg12",
        content: "Testing one22245",
      })
      .set("Authorization", "Bearer " + token2.token2);
    expect(res.status).toBe(201);
  });
});
