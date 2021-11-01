<template>
  <card class="text-center">
    <h3 class="mb-4">{{ $t('page_not_found') }}</h3>

    <div class="links">
      <nuxt-link :to="{ name: 'welcome' }">
        {{ $t('go_home') }}
      </nuxt-link>
    </div>
  </card>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>
