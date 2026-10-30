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
      </section>

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
