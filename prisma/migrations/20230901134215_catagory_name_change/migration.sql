/*
  Warnings:

  - You are about to drop the `Catagory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Catagory";

-- CreateTable
CREATE TABLE "catagorys" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "catagorys_pkey" PRIMARY KEY ("id")
);
