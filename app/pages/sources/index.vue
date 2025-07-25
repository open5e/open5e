<template>
  <section class="docs-container container">
    <div>
      <h1>Sources</h1>

      <!-- Outer list is a list of Publishers -->
      <ul>
        <li 
          v-for="(docs, publisher) in sortDocumentsByPublisher(documents)"
          :key="publisher"
        >
          <!-- Inner list is a list of Sources per Publisher -->
          <h2 class="w-min text-nowrap">{{ publisher }}</h2>
          <dl class="flex flex-col">

            <!-- Card for each Source -->
            <div 
              v-for="doc in docs"
              :key="doc.name"
              class="my-2 border bg-fog p-2 dark:bg-basalt"
            >
              <dt class="inline text-lg font-bold after:content-['_']">
                <NuxtLink :to="`sources/${doc.key}`">
                  {{ doc.name }}
                </NuxtLink>
                <SourceTag :text="doc.key" />
              </dt>
              <dd>
                <p class="mt-0">{{ doc.desc.split(" ").slice(0,50).join(" ") }}</p>
                <p v-if="doc.licenses.length > 0" class="mt-0 text-sm text-gray-500">
                  {{`
                    Published under the 
                    ${doc.licenses.map((l) => l.key).join(' / ').toUpperCase()}
                    ${" " + doc.licenses.length > 1 ? "licenses" : "license"}`}}
                </p>
              </dd>
            </div>
          </dl> <!-- End of inner list -->
        </li>
      </ul> <!-- End of outer list -->
    </div>
  </section>
</template>

<script setup>
import { sortDocumentsByPublisher } from '../../functions/sortDocumentsByPublisher';
const { data: documents } = useDocuments();
</script>