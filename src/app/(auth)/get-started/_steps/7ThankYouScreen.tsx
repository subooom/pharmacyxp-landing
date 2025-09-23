import React, { useEffect, useRef, JSX } from "react";
import { useSignUpContext } from "../_utils/sign-up.context";
import Api from "@/lib/api";
import { debounce } from "@/lib/utils";
import { AxiosResponse } from "axios";
import EventCard from "../_components/EventCard";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
const getActualUrl = (url: string): string => {
  if (url.includes("localhost")) {
    return "http://" + url + ":8000/admin";
  } else {
    return "https://" + url + "/admin";
  }
};

const getTime = (time: Date): string => {
  const m = time.getMinutes();
  return `${time.getHours() % 12}:${m < 10 ? "0" + m : m} ${
    time.getHours() > 12 ? "PM" : "AM"
  }`;
};

export const unslugify = (str: string): string =>
  str
    .replace("-", " ")
    .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());

const objectToTable = (obj: Record<string, any>): JSX.Element => {
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

const ThankYou = () => {
  const {
    onEmailVerified,
    tenantEvent,
    setTenantEvent,
    databaseEvent,
    setDatabaseEvent,
    domainEvent,
    setDomainEvent,
    seedingDatabaseEvent,
    setSeedingDatabaseEvent,
    foreignKey,
    emailVerifiedEvent,
    setEmailVerifiedEvent,
    setForeignKey,
  } = useSignUpContext();

  const interval = useRef<NodeJS.Timeout | null>(null);
  console.log({ emailVerifiedEvent });
  useEffect(() => {
    const debouncedFunction = debounce(() => {
      interval.current = setInterval(() => {
        // Assuming Api is available globally or imported
        Api.get(`/tenant-registry-feedback/${foreignKey}`).then(
          (resp: AxiosResponse) => {
            const d = resp.data;
            if (d) {
              const time = new Date(d.created_at);
              switch (d.data.name) {
                case "email-verified":
                  if (emailVerifiedEvent === undefined) {
                    setEmailVerifiedEvent({
                      ...d,
                      time: getTime(time),
                      pending: false,
                    });
                    console.log("hello");
                    onEmailVerified();
                  }
                  break;
                case "creating-tenant":
                  setTenantEvent({
                    ...d,
                    time: getTime(time),
                    pending: true,
                  });
                  break;
                case "tenant-created":
                  setForeignKey(d.data.tenant_id);
                  setTenantEvent({
                    ...d,
                    time: getTime(time),
                    pending: false,
                  });
                  break;
                case "creating-domain":
                  setDomainEvent({
                    ...d,
                    time: getTime(time),
                    pending: true,
                  });
                  break;
                case "domain-created":
                  setDomainEvent({
                    ...d,
                    time: getTime(time),
                    data: d.data,
                    pending: false,
                  });
                  break;
                case "creating-database":
                  setDatabaseEvent({
                    ...d,
                    time: getTime(time),
                    pending: true,
                  });
                  break;
                case "database-created":
                  setDatabaseEvent({
                    ...d,
                    time: getTime(time),
                    pending: true,
                  });
                  break;
                case "migrating-database":
                  setDatabaseEvent({
                    ...d,
                    time: getTime(time),
                    pending: true,
                  });
                  break;
                case "database-migrated":
                  setDatabaseEvent({
                    ...d,
                    time: getTime(time),
                    pending: false,
                  });
                  break;
                case "seeding-database":
                  setSeedingDatabaseEvent({
                    ...d,
                    time: getTime(time),
                    pending: true,
                  });
                  break;
                case "database-seeded":
                  setSeedingDatabaseEvent({
                    ...d,
                    time: getTime(time),
                    pending: false,
                  });
                  break;
                default:
                  break;
              }
            }
          },
        );
      }, 1000);
    }, 1000);

    debouncedFunction();

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }
    };
  }, [foreignKey]);

  return (
    <div className="container mx-auto mt-2 p-0">
      <div className="flex flex-col">
        <div className="w-full">
          <h2 className="font-bold text-2xl text-purple-800">Thank you!</h2>
          <p className="mb-3">
            Your application is being created. Please check back in a few
            minutes.
          </p>
          <p className="mb-3">
            After your application is created, we will show you the details of
            your application and how to access it here.
          </p>
          <p className="mb-5">
            {emailVerifiedEvent ? (
              <></>
            ) : (
              <span className="bg-purple-800 text-white font-bold p-2 uppercase inline-block">
                Please check your email inbox, we have sent you an email with
                the verification link.
              </span>
            )}
          </p>
        </div>
        <div className="flex flex-col mt-5">
          <div className="w-full">
            <div className="flex justify-center" dir="ltr">
              <ul className="list-none flex justify-center w-50">
                <li className="inline-block w-auto">
                  <EventCard
                    id={1}
                    event={emailVerifiedEvent}
                    fallbackTitle={
                      seedingDatabaseEvent
                        ? unslugify(seedingDatabaseEvent.data.name)
                        : "Verifying Email"
                    }
                  />
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full">
            <div className="flex justify-center w-full" dir="ltr">
              <ul className="list-none flex w-full flex-wrap justify-between border-t-2 border-gray-200">
                <li className="inline-block relative text-center pt-16 mx-0">
                  <EventCard
                    id={2}
                    event={tenantEvent}
                    fallbackTitle={"Creating Tenant"}
                  />
                </li>
                <li className="inline-block relative text-center pt-16 mx-0">
                  <EventCard
                    id={3}
                    event={domainEvent}
                    fallbackTitle={"Creating Domain"}
                  />
                </li>
                <li className="inline-block relative text-center pt-16 mx-0">
                  <EventCard
                    id={4}
                    event={databaseEvent}
                    fallbackTitle={"Creating Database"}
                  />
                </li>
                <li className="inline-block relative text-center pt-16 mx-0">
                  <EventCard
                    id={5}
                    event={seedingDatabaseEvent}
                    fallbackTitle={"Seeding Database"}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-5">
          {domainEvent ? objectToTable(domainEvent) : ""}
          {domainEvent?.data.url ? (
            <a
              href={getActualUrl(domainEvent.data.url)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 mb-2 inline-block"
            >
              Click to goto your admin panel.
            </a>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
