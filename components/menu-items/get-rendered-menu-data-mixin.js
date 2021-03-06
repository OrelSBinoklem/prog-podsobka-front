import { mapGetters } from 'vuex'
import _ from 'lodash'

export const getRenderedMenuDataMixin = {
  data() {
    return {
      menuData: null
    }
  },

  methods: {
    async getDataMenuBySlug(slug) {
      await this.$axios
        .get('/menus/' + slug)
        .then(response => {
          this.menuData = this.__treeSortedByOrder(this.__flatToTreeArray(response.data))
        }).catch(err => (console.log(err)))
    },

    //todo вынести в хелперы
    __flatToTreeArray(arr) {
      var r = []
      arr.forEach(function (a) {
        if(this[a.id]) {
          this[a.id] = {...this[a.id], ...a}
        } else {
          this[a.id] = {...a}
        }

        if (a.parent_id === null) {
          r.push(this[a.id])
        } else {
          this[a.parent_id] = this[a.parent_id] || {}
          this[a.parent_id].children = this[a.parent_id].children || []
          this[a.parent_id].children.push(this[a.id])
        }
      }, Object.create(null))
      return r;
    },

    //todo вынести в хелперы
    __treeSortedByOrder(arr) {
      arr = _.orderBy(arr, ['order'], ['asc']);
      arr.forEach((a) => {
        if(a.children && a.children.length) {
          a.children = this.__treeSortedByOrder(a.children)
        }
      }, Object.create(null))
      return arr;
    },
  },
}