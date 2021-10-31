import { mapGetters } from 'vuex'

export const mixinMenu = {
  metaInfo () {
    return {

    }
  },

  props: {

  },

  data() {
    return {

    }
  },
  created() {

  },
  methods: {

  },
  computed: {
    ...mapGetters({
      current: 'content-widgets/selected'
    })
  },
  watch: {

  },
}