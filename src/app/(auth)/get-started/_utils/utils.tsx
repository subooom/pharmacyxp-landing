import { JSX } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
export const getActualUrl = (url: string): string => {
  if (url.includes("localhost")) {
    return "http://" + url + ":8000/admin";
  } else {
    return "https://" + url + "/admin";
  }
};
// Helper function to convert File to base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
export const getTime = (time: Date): string => {
  const m = time.getMinutes();
  return `${time.getHours() % 12}:${m < 10 ? "0" + m : m} ${
    time.getHours() > 12 ? "PM" : "AM"
  }`;
};

export const unslugify = (str: string): string =>
  str
    .replace("-", " ")
    .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());

export const objectToTable = (obj: Record<string, any>): JSX.Element => {
  const theads = Object.keys(obj).map((key) => (
    <TableHead key={key} className="px-4 py-2">
      {key}
    </TableHead>
  ));

  const tBody = (
    <TableRow>
      {Object.values(obj).map((value, index) =>
        typeof value === "object" ? (
          <TableCell key={index}>{objectToTable(value)}</TableCell>
        ) : (
          <TableCell key={index} className="px-4 py-2">
            {String(value)}
          </TableCell>
        ),
      )}
    </TableRow>
  );

  return (
    <Table className="my-5 text-xs border border-gray-400">
      <TableHeader>
        <TableRow>{theads}</TableRow>
      </TableHeader>
      <TableBody>{tBody}</TableBody>
    </Table>
  );
};
