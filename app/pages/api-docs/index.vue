<template>
  <section>
    <h1>What's the API?</h1>
    <p>
      The Open5e API provides programmatic access to all resources and rules
      included on this site.
    </p>
    <p>
      If you're working on an app or website, you can use this API to retrieve
      monsters, spells, rules, or just about anything else you need.
    </p>

    <h4>
      Visit the <a href="https://api.open5e.com">Live API</a> to try it out!
    </h4>
    <p>
      You can use explore the API using the
      <a href="https://api.open5e.com">Live API</a> page.
    </p>
    <p>
      This api uses standard
      <a href="https://www.django-rest-framework.org/">Django Rest Framework</a>
      concepts, including filters, search, and ordering. You can play with all
      these settings in the live API.
    </p>

    <h4>Filtering</h4>
    <p>
      Each resource can be filtered by a variety of properties visible on the
      live API list endpoint for that resource.
    </p>
    <p>
      For example, monsters can be filtered by CR. For example:
      <code><a href="https://api.open5e.com/monsters/?cr=3">api.open5e.com/monsters/?cr=3</a></code>
      will return all monsters with a challenge rating of 3.
    </p>

    <h5>Filtering by Document</h5>
    <p>
      Each resource includes a <code>"document__slug"</code> property (note the
      double underscores) indicating which resource it came from, such as
      <code>"5esrd"</code> for the <em>5th edition SRD</em>, or
      <code>"tob"</code> for Kobold Press' <em>Tome of Beasts</em>.
    </p>
    <p>
      If you want to limit your search results to a specific resource, you can
      use filtering for this.
    </p>
    <p>
      For example
      <code><a href="https://api.open5e.com/monsters/?document__slug=tob" /></code>
      will only return monsters from Kobold Press' <em>Tome of Beasts</em>.
    </p>

    <h4>Resource Searches</h4>
    <p>
      If you're trying to do case-insensitive search of a specific feature, you
      can use <code>/?search="term"</code>to do a case-insensitive partial-word
      match on that resource.
    </p>
    <p>
      This is supported for spells, monsters, items, and weapons at this time,
      and can be extended as needed.
    </p>
    <p>
      For example:
      <code><a href="https://api.open5e.com/monsters/?search=fir">https://api.open5e.com/monsters/?search=fir</a></code>
      will return all monsters that contain "fir" in their names, including all
      monsters that include terms like "fire".
    </p>

    <h4>General Search</h4>
    <p>
      If you want to search the entire SRD for multiple kinds of resources, you
      can use
      <code>/search?text="search-term"</code>. This search is by full terms
      only.
    </p>
    <p>
      This endpoint also returns useful properties for each type of resource,
      such as CR, type, and others. Additionally, the
      <code>highlighted</code> property includes a span of markup containing a
      snippet of text where the term was found. This is intended to be used in
      previews of search results.
    </p>
    <p>
      For example:
      <code><a href="https://api.open5e.com/search/?text=fire">https://api.open5e.com/search/?text=fire</a></code>
      will search the entire SRD for anything containing "fire".
    </p>

    <h4>Limits and Pagination</h4>
    <p>You can set how many results you want using <code>/?limit</code>.</p>
    <p>
      For example,
      <code><a href="https://api.open5e.com/monsters/?limit=100">https://api.open5e.com/monsters/?limit=100</a></code>
      will return a paginated set of results with the page size of 100.
    </p>

    <h4>Ordering</h4>
    <p>You can set how results are ordered using "ordering".</p>
    <p>
      For example,
      <code><a href="https://api.open5e.com/monsters/?ordering=challenge_rating">https://api.open5e.com/monsters/?ordering=challenge_rating</a></code>
      will return results ordered by Challenge Rating. The API always sub-sorts
      by alphabetical order (so this will return CR0 creatures starting with the
      letter "A" first)
    </p>
  </section>
</template>

<script setup></script>

<style></style>
