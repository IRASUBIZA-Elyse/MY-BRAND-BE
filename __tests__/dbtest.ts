import { test, it, describe, expect, beforeAll, afterAll } from "@jest/globals";
import app from "../src/index";
import superApp, { Request, Response } from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import supertest from "supertest";
dotenv.config();
const DB_URL = process.env.MONGODB_URl || "";
console.log("DB_URL");
beforeAll(async () => {
  await mongoose.connect(DB_URL);
}, 50000);
