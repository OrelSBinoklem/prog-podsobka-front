import Vue from "vue";

export default async ({ app }, inject) => {
    let $eventBus = new Vue();

    inject('eventHub', Vue.observable($eventBus));
}