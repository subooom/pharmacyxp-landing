import { usePathname } from "next/navigation";

export const useActive = () => {
  const pathname = usePathname();
  const check = (path: string) => {
    console.log(pathname, path);
    return pathname === path;
  };
  return { check };
};
