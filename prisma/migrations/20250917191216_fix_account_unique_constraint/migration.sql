/*
  Warnings:

  - A unique constraint covering the columns `[userId,provider]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Account_provider_key";

-- CreateIndex
CREATE UNIQUE INDEX "Account_userId_provider_key" ON "public"."Account"("userId", "provider");
