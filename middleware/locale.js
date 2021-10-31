import { loadMessages } from '~/plugins/i18n'

export default async function ({ store, redirect }) {
  await loadMessages(store.getters['lang/locale'])
}