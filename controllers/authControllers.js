import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import path from "path";
import { rename, unlink } from "fs/promises";
import * as authService from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";

const { JWT_SECRET } = process.env;

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await authService.findUserByEmail(email);
    if (existingUser) {
      throw HttpError(409, "Email in use");
    }

    const avatarURL = gravatar.url(email, { protocol: "https", s: "200" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await authService.createUser({
      email,
      password: hashedPassword,
      avatarURL,
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await authService.findUserByEmail(email);
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw HttpError(401, "Email or password is wrong");
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "23h" });
    await authService.updateUser(user.id, { token });

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    await authService.updateUser(req.user.id, { token: null });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const { email, subscription, avatarURL } = req.user;
    res.status(200).json({ email, subscription, avatarURL });
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (req, res, next) => {
  try {
    const { subscription } = req.body;
    const updatedUser = await authService.updateUser(req.user.id, {
      subscription,
    });
    res.status(200).json({
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      throw HttpError(400, "File not provided");
    }

    const { avatarURL: oldAvatarURL } = req.user;
    if (oldAvatarURL && oldAvatarURL.startsWith("/avatars/")) {
      await unlink(path.join(process.cwd(), "public", oldAvatarURL)).catch(
        () => {},
      );
    }

    const { path: tempPath, originalname } = req.file;
    const ext = path.extname(originalname);
    const filename = `${req.user.id}${ext}`;
    const avatarsDir = path.join(process.cwd(), "public", "avatars");
    const resultPath = path.join(avatarsDir, filename);

    await rename(tempPath, resultPath);

    const avatarURL = `/avatars/${filename}`;
    await authService.updateUser(req.user.id, { avatarURL });

    res.status(200).json({ avatarURL });
  } catch (error) {
    next(error);
  }
};

export const deleteAvatar = async (req, res, next) => {
  try {
    const { avatarURL } = req.user;

    if (avatarURL && avatarURL.startsWith("/avatars/")) {
      const filePath = path.join(process.cwd(), "public", avatarURL);
      await unlink(filePath).catch(() => {});
    }

    const gravatarURL = gravatar.url(req.user.email, {
      protocol: "https",
      s: "200",
    });
    await authService.updateUser(req.user.id, { avatarURL: gravatarURL });

    res.status(200).json({ avatarURL: gravatarURL });
  } catch (error) {
    next(error);
  }
};
