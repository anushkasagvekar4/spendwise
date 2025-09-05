import fs from "fs";
import path from "path";

export const saveBase64Image = (base64Image?: string): string | null => {
  if (!base64Image) return null;

  try {
    const matches = base64Image.match(/^data:(image\/\w+);base64,(.+)$/);
    if (!matches) return null;

    const extension = matches[1].split("/")[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, "base64");

    const fileName = `${Date.now()}.${extension}`;
    const uploadsDir = path.join(__dirname, "..", "uploads");

    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

    const filePath = path.join(uploadsDir, fileName);
    fs.writeFileSync(filePath, buffer);

    return `/uploads/${fileName}`;
  } catch (error) {
    console.error("Error saving Base64 image:", error);
    return null;
  }
};
