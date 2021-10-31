import Vue from 'vue'

export default async ({ app }, inject) => {
    inject('env', Vue.observable({
        apiUrl: process.env.apiUrl,
        storageUrl: process.env.storageUrl,
        appName: process.env.appName,
        appLocale: process.env.appLocale,
        githubAuth: process.env.githubAuth
    }));
}