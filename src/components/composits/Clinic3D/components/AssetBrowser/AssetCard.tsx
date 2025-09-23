"use client";

import { Suspense, lazy, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const GLBViewer = lazy(() => import("./GLBViewer"));

interface AssetCardProps {
  assetPath: string;
}

export default function AssetCard({ assetPath }: AssetCardProps) {
  const { ref, inView } = useInView({
    rootMargin: "200px",
  });

  const [hasLoaded, setHasLoaded] = useState(false);

  // Once in view, mark as loaded
  useEffect(() => {
    if (inView) setHasLoaded(true);
  }, [inView]);

  const assetName = assetPath.split("/").pop();

  return (
    <div
      ref={ref}
      className="border rounded p-2 flex flex-col bg-white items-center gap-2"
    >
      {hasLoaded ? (
        <Suspense
          fallback={<div className="h-40 w-40 bg-gray-200 animate-pulse" />}
        >
          <GLBViewer src={assetPath} />
        </Suspense>
      ) : (
        <div className="h-40 w-40 bg-gray-200 animate-pulse" />
      )}
      <p className="text-center">{assetName}</p>
    </div>
  );
}
