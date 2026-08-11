-- DropForeignKey
ALTER TABLE "Recc" DROP CONSTRAINT "Recc_userId_fkey";

-- DropIndex
DROP INDEX "User_username_key";

-- AddForeignKey
ALTER TABLE "Recc" ADD CONSTRAINT "Recc_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
