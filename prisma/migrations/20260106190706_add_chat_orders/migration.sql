-- CreateTable
CREATE TABLE "ChatOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerName" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
