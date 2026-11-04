import { Layout } from "../components/Layout";
import { getAllEvents, getAllPlaces } from "../db";

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function normalizeMonthName(value: string): string | null {
  const map: Record<string, string> = {
    january: "january",
    february: "february",
    march: "march",
    april: "april",
    may: "may",
    june: "june",
    july: "july",
    august: "august",
    september: "september",
    october: "october",
    november: "november",
    december: "december",
  };

  const candidate = value.toLowerCase().replace(/[^a-z]/g, "");
  return map[candidate] ?? null;
}

export function isFirstSunday(date: Date): boolean {
  const day = new Date(date);
  day.setHours(0, 0, 0, 0);
  const firstOfMonth = new Date(day.getFullYear(), day.getMonth(), 1);
  const firstSunday = new Date(firstOfMonth);

  while (firstSunday.getDay() !== 0) {
    firstSunday.setDate(firstSunday.getDate() + 1);
  }

  return day.getDate() === firstSunday.getDate() && day.getMonth() === firstSunday.getMonth();
}

export function getLocalDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function isFreeOnDate(date: Date, freeDaysText: string): boolean {
  const text = freeDaysText.toLowerCase();
  const monthName = date.toLocaleDateString("en-US", { month: "long" }).toLowerCase();

  if (date.getDay() === 0) {
    if (text.includes("first sunday") && isFirstSunday(date)) {
      return true;
    }

    if (/(?:every\s+)?sunday(?:s)?\s+(?:from|after)\s+\d{1,2}\s*(?:pm|am)/.test(text)) {
      return true;
    }
  }

  for (const match of text.matchAll(/(\d{1,2})\s+([a-zà-ÿ]+)/g)) {
    const dayNumber = Number(match[1]);
    const month = normalizeMonthName(match[2]);

    if (month && month === monthName && dayNumber === date.getDate()) {
      return true;
    }
  }

  return false;
}

export function HomePage() {
  const events = getAllEvents();
  const places = getAllPlaces();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const calendarStart = new Date(monthStart);
  calendarStart.setDate(monthStart.getDate() - monthStart.getDay());

  const monthDays = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(calendarStart);
    date.setDate(calendarStart.getDate() + index);

    const items: Array<{ name: string; href: string; kind: "event" | "place" }> = [];

    for (const event of events) {
      if (event.is_free !== 1) {
        continue;
      }

      const start = new Date(event.starts_at);
      const end = event.ends_at ? new Date(event.ends_at) : start;
      const startDay = new Date(start);
      startDay.setHours(0, 0, 0, 0);
      const endDay = new Date(end);
      endDay.setHours(23, 59, 59, 999);

      if (date >= startDay && date <= endDay) {
        items.push({ name: event.title, href: `/events/${event.id}`, kind: "event" });
      }
    }

    for (const place of places) {
      if (place.is_free === 1 && isFreeOnDate(date, place.free_days)) {
        items.push({ name: place.name, href: `/places/${place.id}`, kind: "place" });
      }
    }

    return {
      date,
      dayNumber: date.getDate(),
      isCurrentMonth: date.getMonth() === today.getMonth(),
      hasFree: items.length > 0,
      items,
    };
  });

  const visibleMonthDays = monthDays.filter((day) => day.date.getMonth() === today.getMonth());

  const calendarWeeks = Array.from({ length: Math.ceil(visibleMonthDays.length / 7) }, (_, weekIndex) => {
    const week = visibleMonthDays.slice(weekIndex * 7, weekIndex * 7 + 7);
    const paddedWeek: Array<(typeof visibleMonthDays)[number] | null> = [...week];

    while (paddedWeek.length < 7) {
      paddedWeek.push(null);
    }

    return paddedWeek;
  });

  const dateHighlights = visibleMonthDays
    .filter((day) => day.hasFree)
    .map((day) => ({
      date: day.date,
      items: day.items,
    }));

  return (
    <Layout>
      <div class="home-top-layout">
        <section class="hero">
          <p class="eyebrow">Free culture, easy to find</p>
          <h1>
            <span class="brand-word free-word">Free</span>
            <span class="brand-word in-word">In</span>
            <span class="brand-word barna-word">Barna</span>
          </h1>
          <p>
            Discover free museums, cultural events, and places to explore around Barcelona.
          </p>
        </section>

        <section class="home-card home-calendar">
          <p class="eyebrow">This month</p>
          <h2>Free days</h2>
          <p class="calendar-month-label">{today.toLocaleString("en-US", { month: "long", year: "numeric" })}</p>
          <div class="calendar-header" aria-label="Weekday headings">
            {WEEKDAY_LABELS.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div class="calendar-grid" aria-label="Monthly free days for events and places">
            {calendarWeeks.map((week, weekIndex) => (
              <div class="calendar-week" key={`week-${weekIndex}`}>
                {week.map((day, dayIndex) => {
                  if (!day) {
                    return <div class="calendar-cell calendar-cell-empty" key={`empty-${weekIndex}-${dayIndex}`} aria-hidden="true" />;
                  }

                  return day.hasFree ? (
                    <button
                      class={[
                        "calendar-cell",
                        "calendar-date-link",
                        day.isCurrentMonth ? "current-month" : "outside-month",
                        "active",
                      ].join(" ")}
                      type="button"
                      key={getLocalDateKey(day.date)}
                      data-date={getLocalDateKey(day.date)}
                      aria-expanded="false"
                      aria-controls="free-dates"
                      onclick={
                        "const panel = document.getElementById('free-dates'); if (!panel) return; const buttons = document.querySelectorAll('.calendar-date-link'); const groups = document.querySelectorAll('.free-day-summary-group'); const clickedDate = this.dataset.date; const isHidden = panel.hasAttribute('hidden'); const isCurrentlyOpen = !isHidden && this.getAttribute('aria-expanded') === 'true'; if (isCurrentlyOpen) { panel.setAttribute('hidden', 'hidden'); buttons.forEach((button) => button.setAttribute('aria-expanded', 'false')); groups.forEach((group) => { group.hidden = true; }); return; } panel.removeAttribute('hidden'); buttons.forEach((button) => { const selected = button === this && !isHidden; button.setAttribute('aria-expanded', String(selected)); }); groups.forEach((group) => { group.hidden = group.dataset.date !== clickedDate; });"
                      }
                    >
                      <span class="calendar-date">{day.dayNumber}</span>
                      <span class="calendar-badge" aria-label="Free day">
                        Free
                      </span>
                      <span class="calendar-chevron" aria-hidden="true">▾</span>
                    </button>
                  ) : (
                    <div
                      class={[
                        "calendar-cell",
                        day.isCurrentMonth ? "current-month" : "outside-month",
                      ].join(" ")}
                      key={getLocalDateKey(day.date)}
                    >
                      <span class="calendar-date">{day.dayNumber}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {dateHighlights.length > 0 ? (
            <div id="free-dates" class="calendar-summary" hidden>
              <p class="calendar-summary-title">Free on these dates</p>
              <ul class="free-day-summary-list">
                {dateHighlights.map((group) => (
                  <li
                    key={getLocalDateKey(group.date)}
                    class="free-day-summary-group"
                    data-date={getLocalDateKey(group.date)}
                    hidden
                  >
                    <span class="free-day-summary-date">
                      {group.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                    <span class="free-day-summary-items">
                      {group.items.map((item, index) => (
                        <span class="free-day-summary-item" key={`${group.date.toISOString()}-${item.href}`}>
                          {index > 0 ? <span class="free-day-summary-separator">•</span> : null}
                          <a href={item.href}>{item.name}</a>
                        </span>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      </div>

      <section class="home-grid">
        <div class="home-card compact">
          <p class="eyebrow">Events</p>
          <h2>Browse free events</h2>
          <p>
            Discover what is happening nearby this week and shortlist the free cultural
            options that fit your plans.
          </p>
          <p>
            <a href="/events" role="button">
              Explore events
            </a>
          </p>
        </div>

        <div class="home-card compact">
          <p class="eyebrow">Places</p>
          <h2>Find where to go</h2>
          <p>
            Browse cultural venues and free spaces around the city so you can plan a
            low-effort day out with confidence.
          </p>
          <p>
            <a href="/places" role="button" class="secondary">
              Explore places
            </a>
          </p>
        </div>
      </section>
    </Layout>
  );
}
