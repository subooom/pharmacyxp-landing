import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function ServiceCounter({
  service_ids,
  max,
}: {
  service_ids: string[];
  max: number;
}) {
  const [count, setCount] = useState(service_ids?.length || 0);

  useEffect(() => {
    setCount(service_ids?.length || 0);
  }, [service_ids]);

  return (
    <div className="absolute bottom-0 right-2 flex items-center space-x-2">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={count} // triggers animation on count change
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex items-center space-x-2 rounded-2xl bg-secondary/90 text-secondary-foreground shadow-lg px-4 py-2 border-2 border-secondary"
        >
          <CheckCircle className="w-5 h-5 text-secondary-foreground" />
          <span className="font-medium text-sm">
            {count} / {max}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
