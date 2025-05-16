-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Document" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "date" DATETIME,
    "language" TEXT,
    "tags" JSONB DEFAULT [],
    "keywords" JSONB DEFAULT [],
    "content" TEXT,
    "fileUrl" TEXT,
    "thumbnailUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Document" ("author", "content", "date", "fileUrl", "id", "keywords", "language", "tags", "title") SELECT "author", "content", "date", "fileUrl", "id", "keywords", "language", "tags", "title" FROM "Document";
DROP TABLE "Document";
ALTER TABLE "new_Document" RENAME TO "Document";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
