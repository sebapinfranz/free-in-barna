import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import {
  getAllEvents,
  getAllPlaces,
  getEventById,
  getPlaceById,
  getRelatedPlacesByEventId,
  getRelatedEventsByPlaceId,
  initializeDatabase,
} from "./db";
import { EventDetailPage } from "./pages/EventDetailPage";
import { EventListPage } from "./pages/EventListPage";
import { HomePage } from "./pages/Home";
import { PlaceDetailPage } from "./pages/PlaceDetailPage";
import { PlaceListPage } from "./pages/PlaceListPage";

export const app = new Hono();

initializeDatabase();

app.use("/static/*", serveStatic({ root: "./" }));

app.get("/", (c) => c.html(<HomePage />));
app.get("/events", (c) => {
  const freeOnly = c.req.query("free") === "1";
  const bookingOnly = c.req.query("booking") === "1";
  const events = getAllEvents().filter((event) => {
    if (freeOnly && event.is_free !== 1) {
      return false;
    }

    if (bookingOnly && event.requires_appointment !== 1) {
      return false;
    }

    return true;
  });

  return c.html(
    <EventListPage
      events={events}
      filters={{ freeOnly, bookingOnly }}
    />,
  );
});
app.get("/events/:id", (c) => {
  const id = Number(c.req.param("id") ?? "");

  if (!Number.isInteger(id) || id <= 0) {
    return c.notFound();
  }

  const event = getEventById(id);

  if (!event) {
    return c.notFound();
  }

  const relatedPlaces = getRelatedPlacesByEventId(id);

  return c.html(<EventDetailPage event={event} relatedPlaces={relatedPlaces} />);
});
app.get("/places", (c) => {
  const freeOnly = c.req.query("free") === "1";
  const bookingOnly = c.req.query("booking") === "1";
  const places = getAllPlaces().filter((place) => {
    if (freeOnly && place.is_free !== 1) {
      return false;
    }

    if (bookingOnly && place.requires_appointment !== 1) {
      return false;
    }

    return true;
  });

  return c.html(
    <PlaceListPage
      places={places}
      filters={{ freeOnly, bookingOnly }}
    />,
  );
});
app.get("/places/:id", (c) => {
  const id = Number(c.req.param("id") ?? "");

  if (!Number.isInteger(id) || id <= 0) {
    return c.notFound();
  }

  const place = getPlaceById(id);

  if (!place) {
    return c.notFound();
  }

  const relatedEvents = getRelatedEventsByPlaceId(id);

  return c.html(<PlaceDetailPage place={place} relatedEvents={relatedEvents} />);
});

if (process.env.NODE_ENV !== "test") {
  const port = Number(process.env.PORT ?? 3000);

  serve({ fetch: app.fetch, port }, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  });
}
