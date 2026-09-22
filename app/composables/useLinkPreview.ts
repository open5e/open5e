/*
 * useLinkPreview 
 */

import type { Open5eData } from '@/types';

type LinkPreviewState = {
  data?: Open5eData;
  category?: ComputedRef<string> | string;
};

const linkPreviewState = ref<LinkPreviewState | undefined>();

export function useLinkPreview() {

  const clearLinkPreviewState = () => linkPreviewState.value = undefined;

  const setlinkPreviewState = ({ data, category }: LinkPreviewState) => {
    linkPreviewState.value = { data, category } as LinkPreviewState;
  };

  return { 
    linkPreviewState,
    clearLinkPreviewState,
    setlinkPreviewState
  };
}