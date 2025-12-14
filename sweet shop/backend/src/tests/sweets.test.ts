import request from "supertest";
import app from "../app";

describe("Sweets API", () => {
  it("GET /api/sweets should require authentication", async () => {
    const res = await request(app).get("/api/sweets");
    expect(res.status).toBe(401);
  });
});
