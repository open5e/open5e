<template>
  <section>
    <h1>What is the Open5e API?</h1>
    <p>
      The Open5e API provides programmatic access to all resources and rules
      included on this site.
    </p>
    <p>
      If you're working on an app or website, you can use this API to retrieve
      monsters, spells, rules, or just about anything else you need.
    </p>

    <p class="font-bold">
      You can use explore the API using the
      <a href="https://api.open5e.com">Live API</a> page.
    </p>
    <p>
      This api uses standard
      <a href="https://www.django-rest-framework.org/">Django Rest Framework</a>
      concepts, including filters, search, and ordering. You can play with all
      these settings in the live API.
    </p>

    <h2>API Versions (V1 & V2)</h2>

    <p>
      There exist two distinct versions of the Open5e API; V1 and V2.
    </p>

    <ul class="list-disc">
      <li class="ml-4">V1 is legacy, and should be considered officially deprecated.</li>
      <li class="ml-4">V2 is the current version of Open5e. It was developed to address the shortcomings of V1 and is actively maintained.</li>
    </ul>

    <p>
      This document assumes you are using V2 (which you should, it is a big improvement!)
    </p>

    <h2>Filtering</h2>

    <p>
      Each resource can be filtered by a variety of properties visible on the
      live API list endpoint for that resource.
    </p>

    <p>
      For example, monsters can be filtered by CR. For example:
      <code><a href="https://api.open5e.com/monsters/?cr=3">api.open5e.com/monsters/?cr=3</a></code>
      will return all monsters with a challenge rating of 3.
    </p>

    <h3 class="text-lg">Filtering by Nested Fields</h3>

    <p>
      Each resource on Open5e includes a <code>document</code> field, which 
      specifies where that piece of data was sourced from. Each 
      <code>document</code> has a <code>key</code> property which uniquely 
      identifies it.
    </p>

    <p>
      A common use-case for filtering is to filter an endpoint by source 
      document. Because a <code>document</code>'s <code>key</code> is nested 
      within the "document" field and not located at the root of the JSON 
      payload, the double underscore <code>__</code>  
    </p>
    
    <pre class="bg-smoke p-4 dark:bg-charcoal">https://api.open5e.com/v2/creatures/?document__key__in=srd-2024&fields=name</pre>

    <p>
      The pattern of indexing into a nested field using a double-underscore 
      is standard DRF syntax and is used widely across Open5e. 
    </p>

    <h2>Including and Excluded API Fields</h2>

    <p>
      Visiting an Open5e API endpoint will typically return <i>all</i> the 
      data associated with that entry. In most cases this will be overkill. 
      The API is designed to so that users can explicitly <i>include</i> or 
      <i>exclude</i> specific API fields so that only the fields they require 
      are returned.
    </p>

    <h3 class="text-lg">Including Fields</h3>

    <p>
      Specific fields can be included using the <code class="bg-red px-1 text-white">/?includes</code> 
      query parameter.
    </p>

    <p>
      Fields defined in the comma-seperated value list will be included in 
      the API response, all others will be excluded.
    </p>

    <h3 class="text-lg">Excluding Fields</h3>

    <p>
      ...
    </p>
    
    <h3 class="text-lg">Including/Excluding Nested Fields</h3>

    <p>
      ...
    </p>

    <h2 class="mt-6">Searching</h2>
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

<style>
h2 { @apply mt-6; }
code { @apply bg-red text-white px-1; }
</style>