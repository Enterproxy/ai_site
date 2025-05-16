-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "date" DATETIME,
    "language" TEXT,
    "tags" JSONB DEFAULT [],
    "keywords" JSONB DEFAULT [],
    "content" TEXT,
    "fileUrl" TEXT
);
