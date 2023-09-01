-- CreateEnum
CREATE TYPE "RoleCategory" AS ENUM ('admin', 'customer');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT '123456',
    "role" "RoleCategory" NOT NULL,
    "contactNo" TEXT NOT NULL,
    "profileImg" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
