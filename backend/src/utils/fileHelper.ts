import fs from "fs";
import path from "path";

export const deleteFile = (filePath: string | undefined | null): void => {
  if (!filePath) return;

  const fullPath = path.join(__dirname, "..", "..", filePath);

  if (fs.existsSync(fullPath)) {
    fs.unlink(fullPath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      }
    });
  } else {
    console.warn("File not found, cannot delete:", fullPath);
  }
};
