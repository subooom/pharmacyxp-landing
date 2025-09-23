import fs from "fs";
import path from "path";
import AssetGrid from "./AssetGrid";

export const dynamic = "force-dynamic"; // always fetch fresh files

export default function AssetsBrowserPage() {
  const baseFolders = ["Office pack-glb", "Ultimate House Interior Pack-glb"];

  const assets: string[] = [];

  baseFolders.forEach((folder) => {
    const folderPath = path.join(process.cwd(), "public", "assets", folder);
    if (fs.existsSync(folderPath)) {
      const files = fs.readdirSync(folderPath);
      files.forEach((file) => {
        if (file.endsWith(".glb")) {
          assets.push(`/assets/${folder}/${file}`);
        }
      });
    }
  });

  return <AssetGrid assets={assets} />;
}
