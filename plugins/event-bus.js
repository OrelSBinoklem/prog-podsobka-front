import Vue from "vue";

let $eventBus = new Vue();
Vue.prototype.$eventHub = $eventBus;