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
          <dt class="font-bold">
            Damage
          </dt>
          <dd>
            {{
              item.weapon.damage_dice
                + (item.weapon.is_versatile
                  ? ` (${item.weapon.versatile_dice})`
                  : '')
            }}
          </dd>
          <dt class="font-bold">
            Damage Type
          </dt>
          <dd class="capitalize">
            {{ item.weapon.damage_type?.split('/').slice(-2)[0] ?? '' }}
          </dd>
          <template v-if="item.weapon.properties?.length > 0">
            <dt class="font-bold">
              Properties
            </dt>
            <dd class="capitalize">
              {{ item.weapon.properties.map((prop) => prop).join(', ') }}
            </dd>
          </template>
          <template v-if="item.weapon.is_reach">
            <dt class="font-bold">
              Reach
            </dt>
            <dd>{{ item.weapon.reach + ' ft.' }}</dd>
          </template>
          <template v-if="item.weapon.range">
            <dt class="font-bold">
              Range
            </dt>
            <dd>{{ `${item.weapon.range} / ${item.weapon.long_range}` }}</dd>
          </template>
          <template v-if="parseFloat(item?.weight) > 0">
            <dt class="font-bold">
              Weight
            </dt>
            <dd>{{ `${parseFloat(item.weight)} lb` }}</dd>
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
        <!-- TODO: whether armor is light/med/heavy not rtn'd by API -->
        <p>{{ `Armor (${'TODO'})` }}</p>
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
          <template v-if="parseFloat(item?.weight) > 0">
            <dt class="font-bold">
              Weight
            </dt>
            <dd>{{ `${parseFloat(item.weight)} lb` }}</dd>
          </template>
          <template v-if="item.cost">
            <dt class="font-bold">
              Cost
            </dt>
            <dd>{{ formatCost(item.cost) }}</dd>
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
          <template v-if="parseFloat(item?.weight) > 0">
            <dt class="font-bold">
              Weight
            </dt>
            <dd>{{ `${parseFloat(item.weight)} lb` }}</dd>
          </template>
          <template v-if="parseFloat(item.cost) > 0">
            <dt class="font-bold">
              Cost
            </dt>
            <dd>{{ formatCost(item.cost) }}</dd>
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

<script setup>
const { data: item } = useFindOne(
  API_ENDPOINTS.equipment,
  useRoute().params.id,
  { is_magic_item: false, depth: 1 },
);

const formatCost = (input) => {
  const [gold, rest] = input.split('.');
  const [silver, copper] = rest.split('');
  return (
    (parseInt(gold) > 0 ? `${gold} gp` : '')
    + (parseInt(silver) > 0 ? `${silver} sp` : '')
    + (parseInt(copper) > 0 ? `${copper} cp` : '')
  );
};

const formatWeaponSubtitle = weapon =>
  `${weapon.is_melee ? 'Melee' : 'Ranged'} weapon `
  + `(${weapon.is_martial ? 'martial' : 'simple'}`
  + `${weapon.name.length > 0 ? `, ${weapon.name.toLowerCase()}` : ''})`;
</script>
