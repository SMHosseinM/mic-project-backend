/*
  Warnings:

  - You are about to drop the column `createdAt` on the `membership` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[registration_number]` on the table `membership` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[membership_number]` on the table `membership` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `membership_number` to the `membership` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_date` to the `membership` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_reference` to the `membership` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "membership" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "membership_number" TEXT NOT NULL,
ADD COLUMN     "transaction_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "transaction_reference" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "membership_registration_number_key" ON "membership"("registration_number");

-- CreateIndex
CREATE UNIQUE INDEX "membership_membership_number_key" ON "membership"("membership_number");
