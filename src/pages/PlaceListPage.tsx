import { Layout } from "../components/Layout";
import type { PlaceRecord } from "../db";

export function PlaceListPage({
  places,
  filters,
}: {
  places: PlaceRecord[];
  filters: { freeOnly: boolean; bookingOnly: boolean };
}) {
  const activeFilter = filters.freeOnly
    ? "Free only"
    : filters.bookingOnly
      ? "Requires booking"
      : "All places";

  return (
    <Layout>
      <section class="page-header">
        <p class="eyebrow">Barcelona places</p>
        <h1>Places to explore</h1>
        <p>Browse free cultural institutions, historic venues, and neighborhood spaces worth visiting.</p>
      </section>

      <nav class="filter-bar" aria-label="Place filters">
        <a class={filters.freeOnly ? "filter-pill active" : "filter-pill"} href="/places?free=1">
          Free only
        </a>
        <a class={filters.bookingOnly ? "filter-pill active" : "filter-pill"} href="/places?booking=1">
          Requires booking
        </a>
        <a class={!filters.freeOnly && !filters.bookingOnly ? "filter-pill active" : "filter-pill"} href="/places">
          All places
        </a>
      </nav>

      <p class="filter-summary">Showing: {activeFilter}</p>

      <section class="event-list" aria-label="List of free Barcelona places">
        {places.map((place) => (
          <article class="event-card" key={place.id}>
            <p class="event-metadata">
              <span class="event-tag accent">{place.is_free ? "Free" : "Paid"}</span>
              <span class="event-tag subtle">
                {place.requires_appointment ? "Appointment required" : "No appointment needed"}
              </span>
            </p>
            <h2>
              <a href={`/places/${place.id}`}>{place.name}</a>
            </h2>
            <p class="event-location">{place.location}</p>
            <p>{place.summary}</p>
            <p class="event-location">When free: {place.free_days}</p>
          </article>
        ))}
      </section>
    </Layout>
  );
}
