/*
  Warnings:

  - You are about to drop the column `membership_number` on the `membership` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone_number]` on the table `membership` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "membership_membership_number_key";

-- AlterTable
ALTER TABLE "membership" DROP COLUMN "membership_number";

-- CreateIndex
CREATE UNIQUE INDEX "membership_phone_number_key" ON "membership"("phone_number");
