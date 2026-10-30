import { describe, expect, it } from "vitest";
import { app } from "../src/index";

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
