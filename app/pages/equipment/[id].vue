<template>
  <section class="docs-container container">
    <div v-if="item">
      <h1>{{ item.name }}</h1>

      <!-- ITEM CARD FOR WEAPONS -->
      <div v-if="item.weapon">
        <p class="italic">
          {{ formatWeaponSubtitle(item.weapon) }}
        </p>
        <dl class="grid grid-cols-[8rem_1fr]">
          <dt class="font-bold">Damage</dt>
          <dd>{{ item.weapon.damage_dice }}</dd>
          <dt class="font-bold">
            Damage Type
          </dt>
          <dd class="capitalize">
            {{ item.weapon.damage_type.name }}
          </dd>
          <template v-if="item.weapon.properties?.length > 0">
            <dt class="font-bold">
              Properties
            </dt>
            <dd class="capitalize">
              <!-- iterate over weapon props, generate csv list of props -->
              {{ item.weapon.properties.map(
                (p) => (p.property.name + (p.detail ? ` (${p.detail})` : "")),
              ).join(', ') }}
            </dd>
          </template>
          <template v-if="parseFloat(item.weight ?? '0') > 0">
            <dt class="font-bold">
              Weight
            </dt>
            <dd>{{ `${parseFloat(item.weight as string)} lb` }}</dd>
          </template>
          <template v-if="item.cost">
            <dt class="font-bold">
              Cost
            </dt>
            <dd>{{ formatCost(item.cost) }}</dd>
          </template>
        </dl>
        <md-viewer :text="item.desc" />
      </div>

      <!-- ITEM CARD FOR ARMOR -->
      <div v-else-if="item.armor">
        <p>{{ "Armor" + (item.armor.category ? ` (${item.armor.category})` : "") }}</p>
        <md-viewer :text="item.desc" />
        <dl class="grid grid-cols-[6rem_1fr]">
          <dt class="font-bold">
            AC
          </dt>
          <dd>{{ item.armor.ac_display }}</dd>
          <template v-if="item.armor.grants_stealth_disadvantage">
            <dt class="font-bold">
              Stealth
            </dt>
            <dd>Disadvantage</dd>
          </template>
          <template v-if="parseFloat(item.weight ?? '') > 0">
            <dt class="font-bold">
              Weight
            </dt>
            <dd>{{ `${parseFloat(item.weight ?? '')} lb` }}</dd>
          </template>
          <template v-if="item.cost">
            <dt class="font-bold">
              Cost
            </dt>
            <dd>{{ formatCost(item.cost ?? '') }}</dd>
          </template>
        </dl>
      </div>

      <!-- DISPLAY COMMON ITEM DATA: category, cost, weight, &c -->
      <div v-else>
        <dl class="grid grid-cols-[6rem_1fr]">
          <dt class="font-bold">
            Category
          </dt>
          <dd>{{ item.category.name }}</dd>
          <template v-if="parseFloat(item.weight ?? '0') > 0">
            <dt class="font-bold">
              Weight
            </dt>
            <dd>{{ `${parseFloat(item.weight ?? '')} lb` }}</dd>
          </template>
          <template v-if="parseFloat(item.cost ?? '0') > 0">
            <dt class="font-bold">
              Cost
            </dt>
            <dd>{{ formatCost(item.cost ?? '') }}</dd>
          </template>
        </dl>
        <md-viewer :text="item.desc" />
      </div>
      <p class="text-sm italic">
        Source:
        <a
          target="NONE"
          :href="item.document.permalink"
        >
          {{ item.document.name }}
          <Icon name="heroicons:arrow-top-right-on-square-20-solid" />
        </a>
      </p>
    </div>

    <p v-else>
      Loading...
    </p>
  </section>
</template>

<script setup lang="ts">
import type { WeaponSummary } from '@/types';

const itemId = useQueryParameter('id');
const params = { 'is_magic_item': 'false' };
const { data: item } = useFindOne(API_ENDPOINTS.equipment, itemId, { params });

useSeoMeta({ title: () => `${item.value?.name} | Open5e` });

const formatCost = (input: string) => {
  if (!input) return '';
  const [gold , rest] = input.split('.');
  const [silver, copper] = rest.split('');
  return (
    (parseInt(gold) > 0 ? `${gold} gp` : '')
    + (parseInt(silver) > 0 ? `${silver} sp` : '')
    + (parseInt(copper) > 0 ? `${copper} cp` : '')
  );
};
const weaponHasProperties = (weapon: WeaponSummary, propertiesToFind: string[] = []): boolean => {
  if (!weapon || propertiesToFind.length === 0) return false;
  
  return weapon.properties.some((item) => (
    propertiesToFind.includes(item.property.name)
  ));
};

const formatWeaponSubtitle = (weapon: WeaponSummary) =>
  `${weaponHasProperties(weapon, ['Ammunition']) ? 'Ranged' : 'Melee'} weapon `
  + `(${weapon.is_martial ? 'martial' : 'simple'}`
  + `${weapon.name.length > 0 ? `, ${weapon.name.toLowerCase()}` : ''})`;

</script>
