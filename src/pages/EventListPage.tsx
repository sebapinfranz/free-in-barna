import { Layout } from "../components/Layout";
import type { EventRecord } from "../db";

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

export function EventListPage({
  events,
  filters,
}: {
  events: EventRecord[];
  filters: { freeOnly: boolean; bookingOnly: boolean };
}) {
  const activeFilter = filters.freeOnly
    ? "Free only"
    : filters.bookingOnly
      ? "Requires booking"
      : "All events";

  return (
    <Layout>
      <section class="page-header">
        <p class="eyebrow">Barcelona events</p>
        <h1>Free events</h1>
        <p>Browse free cultural experiences, neighborhood gatherings, and museum days.</p>
      </section>

      <nav class="filter-bar" aria-label="Event filters">
        <a class={filters.freeOnly ? "filter-pill active" : "filter-pill"} href="/events?free=1">
          Free only
        </a>
        <a class={filters.bookingOnly ? "filter-pill active" : "filter-pill"} href="/events?booking=1">
          Requires booking
        </a>
        <a class={!filters.freeOnly && !filters.bookingOnly ? "filter-pill active" : "filter-pill"} href="/events">
          All events
        </a>
      </nav>

      <p class="filter-summary">Showing: {activeFilter}</p>

      <section class="event-list" aria-label="List of free Barcelona events">
        {events.map((event) => (
          <article class="event-card" key={event.id}>
            <p class="event-metadata">
              <span class="event-tag">{event.status}</span>
              <span class="event-tag accent">{event.is_free ? "Free" : "Paid"}</span>
              <span>{formatDate(event.starts_at)}</span>
              <span>{formatTime(event.starts_at)}</span>
            </p>
            <h2>
              <a href={`/events/${event.id}`}>{event.title}</a>
            </h2>
            <p class="event-location">{event.location}</p>
            <p>{event.summary}</p>
          </article>
        ))}
      </section>
    </Layout>
  );
}
