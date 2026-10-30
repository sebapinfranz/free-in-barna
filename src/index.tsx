import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { getAllEvents, getEventById, initializeDatabase } from "./db";
import { EventDetailPage } from "./pages/EventDetailPage";
import { EventListPage } from "./pages/EventListPage";
import { HomePage } from "./pages/Home";

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

  return c.html(<EventDetailPage event={event} />);
});

if (process.env.NODE_ENV !== "test") {
  const port = Number(process.env.PORT ?? 3000);

  serve({ fetch: app.fetch, port }, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  });
}
