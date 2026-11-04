import { Layout } from "../components/Layout";
import type { PlaceRecord, RelatedEventRecord } from "../db";

function parseFreeDays(freeDays: string): string[] {
  return freeDays
    .split(/[;•]/)
    .map((item) => item.trim().replace(/^[-–]\s*/, ""))
    .filter((item) => item.length > 0);
}

export function PlaceDetailPage({
  place,
  relatedEvents,
}: {
  place: PlaceRecord;
  relatedEvents: RelatedEventRecord[];
}) {
  const freeDayItems = parseFreeDays(place.free_days);

  return (
    <Layout>
      <article class="event-detail">
        <p class="eyebrow">Place details</p>
        <h1>{place.name}</h1>

        <div class="detail-status-row">
          <span class="event-tag accent">{place.is_free ? "Free" : "Paid"}</span>
          <span class="event-tag subtle">
            {place.requires_appointment ? "Appointment required" : "No appointment needed"}
          </span>
        </div>

        <dl class="event-details">
          <div>
            <dt>Location</dt>
            <dd>{place.location}</dd>
          </div>
          <div>
            <dt>When free</dt>
            <dd>
              <ul class="free-day-list">
                {freeDayItems.map((item) => (
                  <li>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt>Booking</dt>
            <dd>{place.requires_appointment ? "Appointment required" : "No appointment needed"}</dd>
          </div>
        </dl>

        <p>{place.description}</p>

        {relatedEvents.length > 0 ? (
          <div>
            <h2>Related events</h2>
            <ul>
              {relatedEvents.map((event) => (
                <li>
                  <a href={`/events/${event.id}`}>{event.title}</a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {place.more_info_url ? (
          <p>
            <a href={place.more_info_url} target="_blank" rel="noreferrer">
              More information ↗
            </a>
          </p>
        ) : null}
        <p>
          <a href="/places">← Back to places</a>
        </p>
      </article>
    </Layout>
  );
}
