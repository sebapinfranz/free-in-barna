import { Layout } from "../components/Layout";
import type { EventRecord, RelatedPlaceRecord } from "../db";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(value: string) {
  return new Date(value).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDateRange(start: string, end: string | null) {
  const startDate = new Date(start);

  if (!end) {
    return formatDate(start);
  }

  const endDate = new Date(end);
  const sameDay =
    startDate.getFullYear() === endDate.getFullYear() &&
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getDate() === endDate.getDate();

  if (sameDay) {
    return `${formatDate(start)} · ${formatTime(start)}-${formatTime(end)}`;
  }

  const startLabel = startDate.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  const endLabel = endDate.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return `${startLabel} – ${endLabel}`;
}

export function EventDetailPage({
  event,
  relatedPlaces,
}: {
  event: EventRecord;
  relatedPlaces: RelatedPlaceRecord[];
}) {
  return (
    <Layout>
      <article class="event-detail">
        <p class="eyebrow">Event details</p>
        <h1>{event.title}</h1>

        <div class="detail-status-row">
          <span class="event-tag">{event.status}</span>
          <span class="event-tag accent">{event.is_free ? "Free" : "Paid"}</span>
          <span class="event-tag subtle">
            {event.requires_appointment ? "Requires booking" : "No appointment needed"}
          </span>
        </div>

        <dl class="event-details">
          <div>
            <dt>When</dt>
            <dd>
              {event.ends_at
                ? formatDateRange(event.starts_at, event.ends_at)
                : `${formatDate(event.starts_at)} · ${formatTime(event.starts_at)}`}
            </dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{event.location}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{event.status}</dd>
          </div>
          <div>
            <dt>Booking</dt>
            <dd>{event.requires_appointment ? "Appointment required" : "No appointment needed"}</dd>
          </div>
        </dl>

        {event.website_url ? (
          <p>
            <a href={event.website_url} target="_blank" rel="noreferrer">
              Event website ↗
            </a>
          </p>
        ) : null}

        <p>{event.description}</p>

        {relatedPlaces.length > 0 ? (
          <div>
            <h2>Related places</h2>
            <ul>
              {relatedPlaces.map((place) => (
                <li>
                  <a href={`/places/${place.id}`}>{place.name}</a> — {place.location}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <p>
          <a href="/events">← Back to events</a>
        </p>
      </article>
    </Layout>
  );
}
