// Reduce an array of documents (or a Vue Ref to one) to an object whose keys
// are the names of Publishers and the values are arrays of documents published
// by that publisher.

import type { Document } from '@/types';

export function sortDocumentsByPublisher(
  input: Document[] | Ref<Document[]> | ComputedRef<Document[]>,
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
  }, {} as Record<string, Document[]>);

  return docsByPublisher;
}