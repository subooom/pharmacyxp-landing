"use client";

import AssetCard from "./AssetCard";

interface AssetGridProps {
  assets: string[];
}

export default function AssetGrid({ assets }: AssetGridProps) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Assets Browser</h1>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {assets.map((assetPath) => (
          <AssetCard key={assetPath} assetPath={assetPath} />
        ))}
      </div>
    </div>
  );
}
