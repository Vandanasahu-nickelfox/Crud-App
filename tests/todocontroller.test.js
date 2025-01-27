import request from "supertest";
import { app } from "../app";
import jwt from "jsonwebtoken";
import Todo from "../models/todo"; // Ensure this matches your import

// Mock the Todo model properly (mock the default export)
jest.mock("../models/todo", () => ({
  create: jest.fn(), // Mock the create method
}));

describe("Todo Controller Tests", () => {
  let validToken;

  beforeAll(() => {
    // Create a valid token before running tests (simulate logged-in user)
    const payload = { userId: 1, username: "testuser" };
    validToken = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: "1h" });
  });

  beforeEach(() => {
    // Reset mock state before each test
    jest.clearAllMocks();
  });

  describe("Create Todo", () => {
    it("should create a todo successfully", async () => {
      const newTodo = { todo: "Test Todo", date: "2025-01-01" };

      // Mock the `create` method to resolve with `newTodo`
      Todo.create.mockResolvedValue(newTodo); // Mock directly on the Todo model

      const response = await request(app)
        .post("/api/v1/todos")
        .set("Authorization", `Bearer ${validToken}`)  // Use the valid token here
        .send(newTodo);

      // Check the response status and the returned data
      expect(response.status).toBe(201); // Success status
      expect(response.body.todo).toBe("Test Todo"); // Check the returned todo
    });
  });
});

