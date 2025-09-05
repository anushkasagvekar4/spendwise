export const getImageUrl = (
  req: any,
  imagePath: string | null
): string | null => {
  if (!imagePath) return null;
  return `${req.protocol}://${req.get("host")}${imagePath}`;
};
