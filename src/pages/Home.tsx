import { Layout } from "../components/Layout";

export function HomePage() {
  return (
    <Layout>
      <section class="hero">
        <p class="eyebrow">Free culture, easy to find</p>
        <h1>FreeInBarna</h1>
        <p>
          Discover free museums, cultural events, and places to explore around
          Barcelona.
        </p>
        <p>
          <a href="/events" role="button">
            Browse free events
          </a>
        </p>
      </section>
    </Layout>
  );
}
