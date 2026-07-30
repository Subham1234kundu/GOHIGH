/**
 * Central Cloudinary media map.
 * Public IDs match uploads from `npm run upload:images` (folder: gohigh/).
 * Falls back to local /Image/* until NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is set.
 */

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

/** local filename → cloudinary public_id (without extension) */
export const MEDIA = {
  logo: { id: "gohigh/goHighLogo", local: "/Image/goHighLogo.png" },
  focus: { id: "gohigh/GoHighFocous", local: "/Image/GoHighFocous.png" },
  work: { id: "gohigh/GoHighwork", local: "/Image/GoHighwork.png" },
  image3: { id: "gohigh/GoHighimage3", local: "/Image/GoHighimage3.png" },
  tab: { id: "gohigh/GoHighTab", local: "/Image/GoHighTab.png" },
  footer: { id: "gohigh/GoHighFt", local: "/Image/GoHighFt.png" },
  aboutTeam: { id: "gohigh/about_team", local: "/Image/about_team.png" },
  aboutTech: { id: "gohigh/about_tech", local: "/Image/about_tech.png" },
};

/**
 * @param {keyof typeof MEDIA} key
 * @param {string} [transforms] optional Cloudinary transforms (avoid commas if used with next/image optimizer)
 */
export function media(key, transforms = "") {
  const asset = MEDIA[key];
  if (!asset) return "";

  if (!CLOUD) return asset.local;

  // Serve directly from Cloudinary CDN (no comma transforms — breaks Next image proxy)
  if (transforms) {
    return `https://res.cloudinary.com/${CLOUD}/image/upload/${transforms}/${asset.id}`;
  }
  return `https://res.cloudinary.com/${CLOUD}/image/upload/${asset.id}`;
}

export function isCloudinaryEnabled() {
  return Boolean(CLOUD);
}
