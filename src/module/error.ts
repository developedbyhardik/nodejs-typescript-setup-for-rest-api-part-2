import { Prisma } from "@prisma/client";
import { ERROR_TYPE } from "./constant";

export const createHandlerError = async (error: any) => {
  const newError = error;
  console.log(error.constructor);
  const prismaErrors = [
    Prisma.PrismaClientInitializationError,
    Prisma.PrismaClientUnknownRequestError,
    Prisma.PrismaClientRustPanicError,
    Prisma.PrismaClientValidationError,
    Prisma.PrismaClientKnownRequestError,
  ];

  if (prismaErrors.includes(error.constructor)) {
    newError.type = ERROR_TYPE.PRISMA;
    newError.message = "Database error";
  } else {
    newError.type = ERROR_TYPE.DEFAULT;
    newError.message = "Internal server error";
  }

  return newError;
};
