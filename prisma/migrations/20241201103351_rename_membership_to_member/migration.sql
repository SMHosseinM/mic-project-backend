/*
  Warnings:

  - You are about to drop the `membership` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "membership";

-- CreateTable
CREATE TABLE "member" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "registration_number" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "transaction_reference" TEXT NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "member_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "member_email_key" ON "member"("email");

-- CreateIndex
CREATE UNIQUE INDEX "member_registration_number_key" ON "member"("registration_number");

-- CreateIndex
CREATE UNIQUE INDEX "member_phone_number_key" ON "member"("phone_number");
