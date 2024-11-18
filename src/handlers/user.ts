import { Request, Response, NextFunction } from "express";
import prisma from "../db";
import { createHandlerError } from "../module/error";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email } = req.body;
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    res.status(201).json({ data: user });
  } catch (error) {
    const newError = await createHandlerError(error);
    next(newError);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ data: user });
  } catch (error) {
    const newError = await createHandlerError(error);
    next(newError);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.status(200).json({ data: user });
  } catch (error) {
    const newError = await createHandlerError(error);
    next(newError);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.delete({
      where: { id: req.params.id },
    });
    res.status(200).json({ data: user });
  } catch (error) {
    const newError = await createHandlerError(error);
    next(newError);
  }
};
