import { test, it, describe, expect, beforeAll, afterAll } from "@jest/globals";
import app from "../src/index";
import mongoose from "mongoose";
import dotenv from "dotenv";
import supertest from "supertest";
dotenv.config();
const mongodb = process.env.MONGODB_URL || "";
beforeAll(async () => {
  await mongoose.connect(mongodb);
});

afterAll(async () => {
  await mongoose.connection.close();
});
const token2: { token2: string } = { token2: "" };

describe("Test APIs before", () => {
  it("login and get token", async () => {
    const response = await supertest(app).post("/api/login").send({
      userName: "IRASUBIZA Elys",
      email: "ELYS@gmail.com",
      password: "harry123",
    });
    token2.token2 = response.body.data;
    expect(response.status).toBe(200);
  });
  console.log(token2.token2);
  it("deleting a blog", async () => {
    const res = await supertest(app)
      .delete("/api/blogs/65d4804bafe8429100a6b065")
      .set("Authorization", "Bearer " + token2.token2);
    expect(res.status).toBe(200);
  });
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
  // it("posting a query", async () => {
  //   const result = await supertest(app).post("/api/query").send({
  //     author: "Mikel kart",
  //     email: "mikeharum@gmial.com",
  //     content: "In publishing and graphic design, placeholder text commonly",
  //     phoneNumber: "0788834557",
  //   });
  //   expect(result.status).toBe(200);
  // });
  it("Logging in validation error", async () => {
    const response = await supertest(app).post("/api/login").send({
      username: "e",
      password: "bcD1",
    });
    expect(response.statusCode).toBe(400);
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
  it("posting a comment", async () => {});

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
  // it("querry", async () => {
  //   const show = await supertest(app).patch("/api/query/:id");
  //   expect(show.status).toBe(404);
  // });
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
  // it("comment", async () => {
  //   const show = await supertest(app)
  //     .post("/api/blogs/65d6137139cf86bd0a219223/comments")
  //     .send({
  //       author: "patrick lee",
  //       email: "emaail@gmail.com",
  //       content: "vd pleased do",
  //     });
  //   expect(show.status).toBe(201);
  // });

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
    expect(response.body.message).toContain("User already exist");
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

  it("if user have invalid Email", async () => {
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
        content: "Testing one22245 Testing one22245 Testing one22245",
      })
      .set("Authorization", "Bearer " + token2.token2);
    expect(res.status).toBe(201);
  });
  it("editing a blog", async () => {
    const res = await supertest(app)
      .patch("/api/blogs/65dee74942cec262270ded97")
      .send({
        content: "Testing one22245 Testing Testing one22245",
      })
      .set("Authorization", "Bearer " + token2.token2);
    expect(res.status).toBe(200);
  });

  // it("deleting a blog error", async () => {
  //   const res = await supertest(app)
  //     .delete("/api/blogs/65dee74942cec262270de7")
  //     .set("Authorization", "Bearer " + token2.token2);
  //   expect(res.statusCode).toBe(204);
  // });
});

describe("PUT /api/blogs/:id", () => {
  it("should update a blog successfully", async () => {
    const res = await supertest(app)
      .patch("/api/blogs/65dee74942cec262270de7")
      .send({ title: "Updated Blog Title", content: "Updated blog content" });
    expect(res.statusCode).toBe(400);
  });
});
