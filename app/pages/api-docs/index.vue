<template>
  <section>
    <h1>What is the Open5e API?</h1>
    <p>
      The Open5e API provides programmatic access to all resources and rules
      included on this site. If you're working on an app or website, you can 
      use this API to retrieve monsters, spells, rules, or just about anything 
      else you need.
    </p>

    <p>
      You can use explore the Open5e API  <a href="https://api.open5e.com" class="font-bold">here</a>.
    </p>
    <p>
      This API uses standard
      <a href="https://www.django-rest-framework.org/">Django Rest Framework</a>
      concepts, including filters, search and ordering. You can play with all
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
      A specific version of the API can be used by prepending <code>/v2</code> 
      or <code>/v1</code> to the API endpoint. If the endpoint is accessed 
      without a version prefix, the API V2 will be used.
    </p>

    <p>
      This document assumes you are using API V2 (which you should, it is a big improvement!)
    </p>

    <h2>Searching</h2>

    <p>
      To search the entire Open5e data-set, you can use the 
      <code>/search</code> endpoint with the <code>/query</code> query 
      parameter.
    </p>

    <pre>https://api.open5e.com/v2/search/?query=goblin</pre>

    <p>
      This will search for Open5e for any entries that contain the term 
      "goblin". The endpoint also returns useful properties for each resource 
      type: CR and type for Monsters, level and school for spells, etc. The
      <code>highlighted</code> property includes a span of markup containing a
      snippet of text where the term was found. This is intended to be used in
      previews of search results.
    </p>

    <h3>Per-endpoint search</h3>

    <p>
      It is also possible to search results returned by a specific endpoint 
      by adding the <code>?name__iexact</code> or <code>?name__icontains</code> 
      parameters to a query. These, in turn, return Open5e entries that exactly 
      or partially match the search term (case-insensitive).
    </p>

    <pre>https://api.open5e.com/v2/creatures/?name__icontains=goblin</pre>

    <h2>Filtering</h2>

    <p>
      Each resource can be filtered by a variety of properties. Some properties 
      are common across all resource types, but many are specific to a given 
      resource.
    </p>

    <p>
      For example, monsters can be filtered by their Type (humanoid, beast, 
      etc.) as follows.
    </p>

    <pre>https://api.open5e.com/v2/creatures/?type=dragon</pre>

    <p>
      This will return a list of Monsters with a type of Dragon. Filtering 
      by Type on resource types that lack this field will have no effect. 
    </p>

    <h3>Filtering by Nested Fields</h3>

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
    
    <pre>https://api.open5e.com/v2/creatures/?document__key__in=srd-2024&fields=name</pre>

    <p>
      The pattern of indexing into a nested field using a double-underscore 
      is standard DRF syntax and is used widely across Open5e. 
    </p>

    <h2>Including and Excluding API Fields</h2>

    <p>
      Visiting an Open5e API endpoint will typically return <i>all</i> the 
      data associated with that entry. In most cases this will be overkill. 
      The API is designed to so that users can explicitly <i>include</i> or 
      <i>exclude</i> the specific fields they require in their application so 
      that their API classes execute as quickly as possible.
    </p>

    <h3>Including Fields</h3>

    <p>
      Specific fields can be included from an API response using the 
      <code>?fields</code> query parameter. This expects a list of named API 
      fields to include in the API response:
    </p>

    <pre>https://api.open5e.com/v2/creatures/?fields=name,key,document</pre>

    <p>
      Fields defined in the comma-seperated value list will be included in 
      the API response, all others will be excluded. The above example will 
      only return Monster names, keys and source document information.
    </p>

    <h3>Including Nested Fields</h3>

    <p>
      If you want to filter API fields that are nested inside of other fields, 
      you can use the double-underscore notation <code>__</code> to index into 
      a field to apply the <code>?fields</code> query parameter to it: 
    </p>

    <pre>https://api.open5e.com/v2/creatures/?fields=name,key,document&document__fields=name,key</pre>

    <p>The above removes all fields from the nested Document object except name and key.</p>

    <h3>Excluding Fields</h3>

    <p>
      Specific fields can be excluded from an API response using the 
      <code>?exclude</code> query parameter. This parameter expects a list of 
      named API fields to exclude:
    </p>

    <pre>https://api.open5e.com/v2/species/?exclude=traits</pre>
    
    <p>
      This can be more convenient than using <code>?fields</code> in situations 
      where you have a large JSON payload and only want to omit a few fields. 
      It is quicker to pass the fields you want to remove via the 
      <code>?exclude</code> parameter instead of passing all the fields you 
      wish to keep via the <code>?fields</code> parameter.
    </p>

    <h2>Ordering</h2>

    <p>
      By default Open5e returns API data sorted alphabetically (descending). 
      The sort order can be changed by passing a <code>?ordering</code> query 
      parameter.
    </p>

    <pre>https://api.open5e.com/v2/creatures/?ordering=challenge_rating_decimal</pre>

    <p>
      Different endpoints often have different properties that they can be 
      sorted by. These can be viewed by viewing the API endpoint via web 
      browser and inspecting the <strong>Filters</strong> options.
    </p>

    <h2>Pagination</h2>

    <p>
      The Open5e API paginates the results of its find-many lookups. By 
      default, 50 results are fetched per page. The number of results returned 
      per page can be passing a number via the <code>?limit</code> query 
      parameter:
    </p>

    <pre>https://api.open5e.com/v2/creatures/?limit=10</pre>

    <p>
      Specific pages of the paginated results can be accessed via the 
      <code>?page</code> query parameter. Querying an out of range page will 
      cause a 404 error.
    </p>

    <pre>https://api.open5e.com/v2/creatures/?limit=10&page=5</pre>

  </section>
</template>

<style>
h2 { @apply mt-6; }
h3 { @apply text-lg; }
code { @apply bg-red text-white px-1 text-nowrap; }
pre { @apply bg-smoke p-4 dark:bg-charcoal; }
</style>