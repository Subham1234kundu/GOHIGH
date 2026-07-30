/**
 * Upload all public/Image assets to Cloudinary under folder `gohigh/`.
 * Usage: npm run upload:images
 *
 * Requires in .env.local:
 *   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
 *   CLOUDINARY_API_KEY
 *   CLOUDINARY_API_SECRET
 */

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { config as loadEnv } from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

loadEnv({ path: path.join(root, ".env.local") });

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.error(`
Missing Cloudinary credentials in .env.local

Add:
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
  CLOUDINARY_API_KEY=...
  CLOUDINARY_API_SECRET=...

Find cloud name at: https://console.cloudinary.com
`);
  process.exit(1);
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

const imageDir = path.join(root, "public", "Image");
const files = fs.readdirSync(imageDir).filter((f) =>
  /\.(png|jpe?g|webp|gif|svg)$/i.test(f)
);

console.log(`Uploading ${files.length} files to cloudinary://${cloudName}/gohigh ...\n`);

for (const file of files) {
  const filePath = path.join(imageDir, file);
  const publicId = `gohigh/${path.parse(file).name}`;

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      overwrite: true,
      resource_type: "image",
      folder: undefined, // public_id already includes folder
    });
    console.log(`✓ ${file} → ${result.secure_url}`);
  } catch (err) {
    console.error(`✗ ${file}:`, err.message || err);
  }
}

console.log("\nDone. Restart next dev so NEXT_PUBLIC_* env is picked up.");
