import { Layout } from "../components/Layout";
import type { EventRecord } from "../db";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(value: string) {
  return new Date(value).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function EventDetailPage({ event }: { event: EventRecord }) {
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
              {formatDate(event.starts_at)} · {formatTime(event.starts_at)}
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

        <p>{event.description}</p>
        <p>
          <a href="/events">← Back to events</a>
        </p>
      </article>
    </Layout>
  );
}
