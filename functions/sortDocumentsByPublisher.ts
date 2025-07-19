// Reduce an array of documents (or a Vue Ref to one) to an object whose keys
// are the names of Publishers and the values are arrays of documents published
// by that publisher.

import { unref, type Ref } from 'vue';

// TODO: replace these with types generated directly from OpenAPI spec

type Publisher = {
  name: string;
  key: string;
}

type License = {
  name: string;
  key: string;
}

type Document = {
  name: string;
  publisher: Publisher;
  licenses: License[];
}

export function sortDocumentsByPublisher(
  input: Document[] | Ref<Document[]>,
): Record<string, Document[]> {
  if (!input) return {};

  // unreference Vue ref(), ensures we have an array of documents
  const documents = unref(input);

  // generate the object from the 'documents' array
  const docsByPublisher = documents.reduce((publishers, document) => {
    const publisher = document.publisher.name;
    if (publishers[publisher]) publishers[publisher].push(document);
    else publishers[publisher] = [document];
    return publishers;
  }, {});

  return docsByPublisher;
}