// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Palette, Printer, Ruler } from "lucide-react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { Routes } from "@/constants/routes";

// export default function RackIntelligence() {
//   const router = useRouter();
//   return (
//     <section className="w-full py-12 md:py-16 lg:py-20 bg-transparent">
//       <div className="container px-4 md:px-6 mx-auto">
//         <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
//           {/* Content */}
//           <div className="space-y-6">
//             <div className="space-y-4">
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
//                 <Palette className="h-4 w-4" />
//                 Rack Intelligence
//               </div>

//               <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
//                 <span className="text-primary">Faster</span> racks. Zero expired
//                 stock.
//               </h2>

//               <p className="text-lg text-primary-700 md:text-xl">
//                 Build color-coded racks and print smart labels up to{" "}
//                 <span className="font-semibold text-foreground">
//                   5&quot;×16&quot;
//                 </span>
//                 .
//               </p>
//             </div>

//             {/* Features */}
//             <div className="grid gap-4 sm:grid-cols-2">
//               <div className="flex items-start gap-3">
//                 <div className="mt-1 p-1.5 rounded-lg bg-primary/10">
//                   <Ruler className="h-4 w-4 text-primary" />
//                 </div>
//                 <div>
//                   <h4 className="font-semibold">Rack Builder</h4>
//                   <p className="text-sm text-primary-700">
//                     Set rows × columns with color mapping.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <div className="mt-1 p-1.5 rounded-lg bg-primary/10">
//                   <Printer className="h-4 w-4 text-primary" />
//                 </div>
//                 <div>
//                   <h4 className="font-semibold">Label Print</h4>
//                   <p className="text-sm text-primary-700">
//                     Print any rack size instantly.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Benefits */}
//             <div className="space-y-3">
//               {[
//                 "Visual stock at a glance",
//                 "Fast retrieval system",
//                 "Print-ready layouts",
//               ].map((text, i) => (
//                 <div key={i} className="flex items-center gap-2">
//                   <div className="w-2 h-2 rounded-full bg-primary" />
//                   <span className="text-sm font-medium">{text}</span>
//                 </div>
//               ))}
//             </div>

//             {/* Actions */}
//             <div className="flex flex-col sm:flex-row gap-3">
//               <Button
//                 onClick={() => router.push(Routes.sign_up)}
//                 size="lg"
//                 className="bg-primary hover:bg-primary/90"
//               >
//                 Build Now
//               </Button>
//               <Button
//                 onClick={() => router.push(Routes.sign_up)}
//                 size="lg"
//                 variant="outline"
//               >
//                 Live Demo
//               </Button>
//             </div>
//           </div>

//           {/* Image */}
//           <div className="relative">
//             <Card className="overflow-hidden border-2 border-primary/20 shadow-xl p-0">
//               <CardContent className="p-0">
//                 <div className="aspect-[4/3] relative">
//                   <Image
//                     src="/Gemini_Generated_Image_exvo2yexvo2yexvo.png"
//                     alt="Rack system visualization"
//                     fill
//                     className="object-cover"
//                     priority
//                   />
//                   <Image
//                     src="/logo.png"
//                     alt="medicinexp Logo"
//                     width={169}
//                     height={120}
//                     className="absolute bottom-4 right-4 bg-primary-100 dark:bg-primary-950 p-3 rounded-xl"
//                   />
//                 </div>
//               </CardContent>
//             </Card>

//             <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium shadow-lg z-10">
//               Smart 3D Rack
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Palette, Printer, Ruler, X, Youtube, Video } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Routes } from "@/constants/routes";
import { useState } from "react";

export default function RackIntelligence() {
  const router = useRouter();
  const [showVideo, setShowVideo] = useState(false);
  const [videoType, setVideoType] = useState<string>("youtube");

  // Configuration - Set these based on what videos you have available
  const hasYoutubeVideo = true; // Set to true if you have YouTube video
  const hasLocalVideo = true; // Set to true if you have local video

  const youtubeVideoId = "U0rxVXYKemM"; // Your YouTube video ID
  const localVideoPath = "/videos/racks-demo.mp4"; // Path to your local video

  const handleDemoClick = () => {
    // Set default video type based on availability
    if (hasYoutubeVideo) {
      setVideoType("youtube");
    } else if (hasLocalVideo) {
      setVideoType("local");
    }
    setShowVideo(true);
  };

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-transparent">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Palette className="h-4 w-4" />
                Rack Intelligence
              </div>

              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                <span className="text-primary">Faster</span> racks. Zero expired
                stock.
              </h2>

              <p className="text-lg text-primary-700 md:text-xl">
                Build color-coded racks and print smart labels up to{" "}
                <span className="font-semibold text-foreground">
                  5&quot;×16&quot;
                </span>
                .
              </p>
            </div>

            {/* Features */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1.5 rounded-lg bg-primary/10">
                  <Ruler className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Rack Builder</h4>
                  <p className="text-sm text-primary-700">
                    Set rows × columns with color mapping.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 p-1.5 rounded-lg bg-primary/10">
                  <Printer className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Label Print</h4>
                  <p className="text-sm text-primary-700">
                    Print any rack size instantly.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              {[
                "Visual stock at a glance",
                "Fast retrieval system",
                "Print-ready layouts",
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">{text}</span>
                </div>
              ))}
            </div>

            {/* Actions - KEPT THE SAME */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => router.push(Routes.sign_up)}
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                Build Now
              </Button>
              <Button onClick={handleDemoClick} size="lg" variant="outline">
                Live Demo
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <Card className="overflow-hidden border-2 border-primary/20 shadow-xl p-0">
              <CardContent className="p-0">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/Gemini_Generated_Image_exvo2yexvo2yexvo.png"
                    alt="Rack system visualization"
                    fill
                    className="object-cover"
                    priority
                  />
                  <Image
                    src="/logo.png"
                    alt="medicinexp Logo"
                    width={169}
                    height={120}
                    className="absolute bottom-4 right-4 bg-primary-100 dark:bg-primary-950 p-3 rounded-xl"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium shadow-lg z-10">
              Smart 3D Rack
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal - UPDATED WITH SOURCE SELECTION */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-xl shadow-2xl w-full max-w-4xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold">Live Demo</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowVideo(false)}
                className="hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Video Source Selector - Inside Modal */}
            <div className="px-4 pt-4">
              <div className="flex flex-wrap gap-2">
                {hasYoutubeVideo && (
                  <Button
                    variant={videoType === "youtube" ? "default" : "outline"}
                    onClick={() => setVideoType("youtube")}
                    size="sm"
                    className="gap-2"
                  >
                    <Youtube className="h-4 w-4" />
                    YouTube Demo
                  </Button>
                )}

                {hasLocalVideo && (
                  <Button
                    variant={videoType === "local" ? "default" : "outline"}
                    onClick={() => setVideoType("local")}
                    size="sm"
                    className="gap-2"
                  >
                    <Video className="h-4 w-4" />
                    See Demo Video
                  </Button>
                )}
              </div>
            </div>

            {/* Video Container */}
            <div className="p-4">
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                {videoType === "youtube" && hasYoutubeVideo ? (
                  // YouTube Video
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Demo Video"
                  />
                ) : videoType === "local" && hasLocalVideo ? (
                  // Local Video
                  <video
                    src={localVideoPath}
                    className="w-full h-full"
                    controls
                    autoPlay
                    key={localVideoPath}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  // No video available
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <div className="text-center">
                      <p className="text-lg font-semibold mb-2">
                        No video available
                      </p>
                      <p className="text-sm text-gray-300">
                        Please configure your video settings
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t text-center">
              <p className="text-sm text-gray-600">
                Ready to create your own smart racks?
              </p>
              <Button
                onClick={() => {
                  setShowVideo(false);
                  router.push(Routes.sign_up);
                }}
                className="mt-2"
              >
                Start Building Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
