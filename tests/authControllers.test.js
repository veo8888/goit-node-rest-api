import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as authService from "../services/authServices.js";
import { login } from "../controllers/authControllers.js";

jest.mock("../services/authServices.js");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

const mockUser = {
  id: 1,
  email: "test@example.com",
  subscription: "starter",
  password: "hashedPassword",
};

describe("login controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: { email: "test@example.com", password: "password123" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();

    authService.findUserByEmail.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("mock-jwt-token");
    authService.updateUser.mockResolvedValue({});
  });

  afterEach(() => jest.clearAllMocks());

  test("should return status code 200", async () => {
    await login(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("should return a token in the response", async () => {
    await login(req, res, next);
    const body = res.json.mock.calls[0][0];
    expect(body.token).toBe("mock-jwt-token");
  });

  test("should return user object with email and subscription as strings", async () => {
    await login(req, res, next);
    const body = res.json.mock.calls[0][0];
    expect(body.user).toBeDefined();
    expect(typeof body.user.email).toBe("string");
    expect(typeof body.user.subscription).toBe("string");
  });
});
