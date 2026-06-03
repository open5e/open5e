import type { Open5eData } from '@/types';

export function useSeoEntry(data: Ref<Open5eData>) {
	const url = useRequestURL();

	watchEffect(() => {
		if (!data.value) return;

		useSeoMeta({
			title: `${data.value.name} | Open5e`,
			ogTitle: `${data.value.name} | Open5e`,
			ogUrl: url.href,
		});
	});
}