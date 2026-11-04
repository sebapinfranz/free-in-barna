import { describe, expect, it } from "vitest";
import { app } from "../src/index";
import { getAllEvents } from "../src/db";
import { isFreeOnDate } from "../src/pages/Home";

describe("FreeInBarna app", () => {
  it("renders the home page with the expected heading and tagline", async () => {
    const response = await app.request("http://localhost/");

    expect(response.status).toBe(200);

    const html = await response.text();
    expect(html).toContain('class="brand-word free-word">Free</span>');
    expect(html).toContain('class="brand-word in-word">In</span>');
    expect(html).toContain('class="brand-word barna-word">Barna</span>');
    expect(html).toContain(
      "Discover free museums, cultural events, and places to explore around Barcelona.",
    );
  });

  it("shows a month-style calendar with free days on the home page", async () => {
    const response = await app.request("http://localhost/");

    expect(response.status).toBe(200);

    const html = await response.text();
    expect(html).toContain("This month");
    expect(html).toContain("Festival 42");
    expect(html).toContain("Festival Dau");
    expect(html).toContain("MACBA – Museu d’Art Contemporani de Barcelona");
  });

  it("keeps first-Sunday rules separate from recurring Sunday-after-time rules", () => {
    const firstSunday = new Date("2026-11-01T00:00:00");
    const secondSunday = new Date("2026-11-08T00:00:00");

    expect(isFreeOnDate(firstSunday, "First Sunday of the month")).toBe(true);
    expect(isFreeOnDate(secondSunday, "First Sunday of the month")).toBe(false);

    expect(isFreeOnDate(firstSunday, "Sundays from 3 pm")).toBe(true);
    expect(isFreeOnDate(secondSunday, "Sundays from 3 pm")).toBe(true);
  });

  it("includes later Sundays in the free-day summary panel when they are marked as free", async () => {
    const response = await app.request("http://localhost/");

    expect(response.status).toBe(200);

    const html = await response.text();
    const summaryDates = [...html.matchAll(/class="free-day-summary-group"[^>]*data-date="([^"]+)"/g)].map(
      ([, date]) => date,
    );

    expect(summaryDates.some((date) => date.startsWith("2026-11-22"))).toBe(true);
    expect(summaryDates.some((date) => date.startsWith("2026-11-29"))).toBe(true);
  });

  it("starts the free-days section collapsed and exposes clickable date links", async () => {
    const response = await app.request("http://localhost/");

    expect(response.status).toBe(200);

    const html = await response.text();
    expect(html).toContain('id="free-dates"');
    expect(html).toContain('hidden');
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain('calendar-date-link');
    expect(html).toContain('<button');
  });

  it("marks each free date with a date key so only the selected day can be expanded", async () => {
    const response = await app.request("http://localhost/");

    expect(response.status).toBe(200);

    const html = await response.text();
    expect(html).toContain('data-date=');
    expect(html).toContain('free-day-summary-group');
  });

  it("seeds and exposes real Barcelona event data without duplicates", () => {
    const events = getAllEvents();
    const titles = events.map((event) => event.title);

    expect(events.length).toBeGreaterThan(0);
    expect(titles).toHaveLength(new Set(titles).size);
    expect(titles).toContain("Festival Dau");
    expect(events.some((event) => event.location.includes("Barcelona"))).toBe(true);
  });

  it("renders the events list page with real Barcelona events", async () => {
    const response = await app.request("http://localhost/events");

    expect(response.status).toBe(200);

    const html = await response.text();
    expect(html).toContain("Festival Dau");
    expect(html).toContain("Barcelona");
    expect(html).toContain("Free only");
  });

  it("supports simple discovery filters on the events list", async () => {
    const freeOnlyResponse = await app.request("http://localhost/events?free=1");
    const bookingResponse = await app.request("http://localhost/events?booking=1");

    expect(freeOnlyResponse.status).toBe(200);
    expect(bookingResponse.status).toBe(200);

    const freeHtml = await freeOnlyResponse.text();
    const bookingHtml = await bookingResponse.text();

    expect(freeHtml).toContain("Free only");
    expect(bookingHtml).toContain("Requires booking");
    expect(bookingHtml).not.toContain("Festival 42");
    expect(bookingHtml).not.toContain("Festival Dau");
  });

  it("renders the event detail page with the requested event metadata", async () => {
    const response = await app.request("http://localhost/events/1");

    expect(response.status).toBe(200);

    const html = await response.text();
    expect(html).toContain("Festival Dau");
    expect(html).toContain("Status");
    expect(html).toContain("Free");
    expect(html).toContain("No appointment needed");
    expect(html).toContain("Thu");
    expect(html).toContain("festivaldau.cat");
  });

  it("renders the places list page with real Barcelona venues", async () => {
    const response = await app.request("http://localhost/places");

    expect(response.status).toBe(200);

    const html = await response.text();
    expect(html).toContain("Places to explore");
    expect(html).toContain("MACBA – Museu d’Art Contemporani de Barcelona");
    expect(html).toContain("Barcelona");
  });

  it("renders the place detail page with the requested venue metadata", async () => {
    const response = await app.request("http://localhost/places/1");

    expect(response.status).toBe(200);

    const html = await response.text();
    expect(html).toContain("MACBA – Museu d’Art Contemporani de Barcelona");
    expect(html).toContain("When free");
    expect(html).toContain("No appointment needed");
  });

  it("renders MUHBA with the official free-entry conditions", async () => {
    const response = await app.request("http://localhost/places/3");

    expect(response.status).toBe(200);

    const html = await response.text();
    expect(html).toContain("MUHBA - Museu d’Història de Barcelona");
    expect(html).toContain("first Sunday of the month");
    expect(html).toContain("under-16s");
  });

  it("renders place free-days as a bulleted list for easier reading", async () => {
    const response = await app.request("http://localhost/places/2");

    expect(response.status).toBe(200);

    const html = await response.text();
    expect(html).toContain("<li>Free for CaixaBank clients");
    expect(html).toContain("<li>European Youth Card holders");
  });

  it("supports simple discovery filters on the places list", async () => {
    const freeOnlyResponse = await app.request("http://localhost/places?free=1");
    const bookingResponse = await app.request("http://localhost/places?booking=1");

    expect(freeOnlyResponse.status).toBe(200);
    expect(bookingResponse.status).toBe(200);

    const freeHtml = await freeOnlyResponse.text();
    const bookingHtml = await bookingResponse.text();

    expect(freeHtml).toContain("Free only");
    expect(bookingHtml).toContain("Requires booking");
    expect(bookingHtml).toContain("CaixaForum Barcelona");
    expect(freeHtml).not.toContain("When free:");
  });

  it("does not show related places on an event detail page until curated matches exist", async () => {
    const response = await app.request("http://localhost/events/2");

    expect(response.status).toBe(200);

    const html = await response.text();
    expect(html).not.toContain("Related places");
    expect(html).not.toContain("CaixaForum Barcelona");
  });

  it("does not show related events on a place detail page until curated matches exist", async () => {
    const response = await app.request("http://localhost/places/1");

    expect(response.status).toBe(200);

    const html = await response.text();
    expect(html).not.toContain("Related events");
    expect(html).not.toContain("Festival Dau");
  });

  it("serves the CSS asset from the static directory", async () => {
    const response = await app.request("http://localhost/static/style.css");

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/css");

    const css = await response.text();
    expect(css).toContain("--bg:");
    expect(css).toContain(".hero");
    expect(css).toContain("@media");
  });

  it("returns a 404 for an unknown route", async () => {
    const response = await app.request("http://localhost/unknown-route");

    expect(response.status).toBe(404);
  });
});
