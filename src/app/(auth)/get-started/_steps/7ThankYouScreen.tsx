import React, { useEffect, useRef } from "react";
import Api from "@/lib/api";
import { debounce } from "@/lib/utils";
import { AxiosResponse } from "axios";
import EventCard from "../_components/EventCard";
import { useSignUpStore } from "@/store/sing-up.store";
import {
  getActualUrl,
  getTime,
  objectToTable,
  unslugify,
} from "../_utils/utils";

const ThankYou = () => {
  const {
    timelineEvents: {
      databaseEvent,
      tenantEvent,
      domainEvent,
      emailVerifiedEvent,
      seedingDatabaseEvent,
    },
    formData: {
      admin_email
    },
    setForeignKey,
    foreignKey,
    setTimelineEvent,
    handlers: { onEmailVerified },
  } = useSignUpStore();

  console.log({
    databaseEvent,
    tenantEvent,
    domainEvent,
    emailVerifiedEvent,
    seedingDatabaseEvent,
    foreignKey
  });
  
  const interval = useRef<NodeJS.Timeout | null>(null);
  // Use a ref to track the current identifier without causing re-renders
  const currentIdentifierRef = useRef(admin_email);
  
  // Update the ref whenever tenantEvent or foreignKey changes
  useEffect(() => {
    if (foreignKey) {
      currentIdentifierRef.current = foreignKey;
    } else if (tenantEvent?.data?.tenant_id) {
      currentIdentifierRef.current = tenantEvent.data.tenant_id;
    } else {
      currentIdentifierRef.current = admin_email;
    }
  }, [foreignKey, tenantEvent?.data?.tenant_id, admin_email]);
  
  useEffect(() => {
    const debouncedFunction = debounce(() => {
      // Clear any existing interval
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }
      
      interval.current = setInterval(() => {
        // Use the current identifier from the ref
        const identifier = currentIdentifierRef.current;
        
        console.log("Making API call with identifier:", identifier);
        Api.get(`/tenant-registry-feedback/${identifier}`).then(
          (resp: AxiosResponse) => {
            const d = resp.data;
            if (d) {
              const time = new Date(d.created_at);
              console.log("Received event:", d.data.name, d);
              switch (d.data.name) {
                case "email-verified":
                  if (emailVerifiedEvent === undefined) {
                    setTimelineEvent("emailVerifiedEvent", {
                      ...d,
                      time: getTime(time),
                      pending: false,
                    });
                    onEmailVerified();
                  }
                  break;
                case "creating-tenant":
                  setTimelineEvent("tenantEvent", {
                    ...d,
                    time: getTime(time),
                    pending: true,
                  });
                  break;
                case "tenant-created":
                  // Switch to using tenant_id from now on
                  console.log("Setting foreign key to:", d.data.tenant_id);
                  setForeignKey(d.data.tenant_id);
                  setTimelineEvent("tenantEvent", {
                    ...d,
                    time: getTime(time),
                    pending: false,
                  });
                  break;
                case "creating-domain":
                  setTimelineEvent("domainEvent", {
                    ...d,
                    time: getTime(time),
                    pending: true,
                  });
                  break;
                case "domain-created":
                  setTimelineEvent("domainEvent", {
                    ...d,
                    time: getTime(time),
                    data: d.data,
                    pending: false,
                  });
                  break;
                case "creating-database":
                  setTimelineEvent("databaseEvent", {
                    ...d,
                    time: getTime(time),
                    pending: true,
                  });
                  break;
                case "database-created":
                  setTimelineEvent("databaseEvent", {
                    ...d,
                    time: getTime(time),
                    pending: true,
                  });
                  break;
                case "migrating-database":
                  setTimelineEvent("databaseEvent", {
                    ...d,
                    time: getTime(time),
                    pending: true,
                  });
                  break;
                case "database-migrated":
                  setTimelineEvent("databaseEvent", {
                    ...d,
                    time: getTime(time),
                    pending: false,
                  });
                  break;
                case "seeding-database":
                  setTimelineEvent("seedingDatabaseEvent", {
                    ...d,
                    time: getTime(time),
                    pending: true,
                  });
                  break;
                case "database-seeded":
                  setTimelineEvent("seedingDatabaseEvent", {
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
        ).catch((error) => {
          console.error("API call failed:", error);
        });
      }, 2000);
    }, 1000);

    debouncedFunction();

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }
    };
  }, [admin_email]); // Only depend on admin_email, the ref will handle the tenant_id

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