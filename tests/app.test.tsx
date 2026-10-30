import { describe, expect, it } from "vitest";
import { app } from "../src/index";
import { getAllEvents } from "../src/db";

describe("FreeInBarna app", () => {
  it("renders the home page with the expected heading and tagline", async () => {
    const response = await app.request("http://localhost/");

    expect(response.status).toBe(200);

    const html = await response.text();
    expect(html).toContain("<h1>FreeInBarna</h1>");
    expect(html).toContain(
      "Discover free museums, cultural events, and places to explore around Barcelona.",
    );
  });

  it("seeds and exposes event data from SQLite without duplicates", () => {
    const events = getAllEvents();
    const titles = events.map((event) => event.title);

    expect(events.length).toBeGreaterThan(0);
    expect(titles).toHaveLength(new Set(titles).size);
    expect(events[0].title).toContain("Oktoberfest");
    expect(events[0].location).toBeTruthy();
  });

  it("renders the events list page with seeded Barcelona events", async () => {
    const response = await app.request("http://localhost/events");

    expect(response.status).toBe(200);

    const html = await response.text();
    expect(html).toContain("Oktoberfest Barcelona");
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
    expect(bookingHtml).toContain("Open House Barcelona");
  });

  it("renders the event detail page with the requested event metadata", async () => {
    const response = await app.request("http://localhost/events/1");

    expect(response.status).toBe(200);

    const html = await response.text();
    expect(html).toContain("Oktoberfest Barcelona");
    expect(html).toContain("Status");
    expect(html).toContain("Free");
    expect(html).toContain("No appointment needed");
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
