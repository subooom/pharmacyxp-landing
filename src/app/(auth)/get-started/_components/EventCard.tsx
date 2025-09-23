import React, { JSX, useCallback } from "react";
import { unslugify } from "../_steps/7ThankYouScreen";

export interface TimelineEvent {
  created_at: string;
  data: {
    name: string;
    message: string;
    url?: string;
    tenant_id?: string;
  };
  time: string;
  pending: boolean;
}

type EventCardProps = {
  id: number;
  event?: TimelineEvent;
  fallbackTitle?: string;
};

const EventCard: React.FC<EventCardProps> = ({
  id,
  fallbackTitle = "Event",
  event,
}) => {
  const renderPending = useCallback(
    (item: TimelineEvent | undefined): JSX.Element | string => {
      const template = (
        <>
          <div
            className="animate-spin inline-block h-2 w-2 border-2 border-current border-t-transparent rounded-full mr-2"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
          Pending
        </>
      );

      if (item) {
        return item.pending ? template : item.time;
      }
      return template;
    },
    [],
  );

  const colors = [
    "var(--primary-100)",
    "oklch(95.1% 0.026 236.824)",
    "oklch(96.2% 0.044 156.743)",
    "oklch(95.2% 0.037 318.852)",
    "oklch(95.3% 0.051 180.801)",
  ];

  return (
    <div className="px-4  flex gap-2 flex-col items-center mb-2">
      <div
        style={{
          background: colors[id - 1],
        }}
        className={`border max-w-sm border-primary-300/10 text-primary text-center rounded px-2 py-1`}
      >
        {renderPending(event)}
      </div>

      <div>
        <h5 className="text-base text-center w-full">
          {event ? unslugify(event.data.name) : fallbackTitle}
        </h5>

        <p className="text-gray-600 text-sm max-w-md w-full text-center">
          {event ? (
            event.data.message
          ) : (
            <div
              className="animate-spin mt-2 inline-block h-4 w-4 border-2 border-current border-t-transparent rounded-full"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </p>
      </div>
    </div>
  );
};

export default EventCard;
