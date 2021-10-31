export default function ({ store, redirect }) {
    if (!store.state.authenticated || store.getters['auth/checkOAuth']) {
        next({ name: 'home'})
    } else {
        if(store.getters['auth/checkVerified'] !== false) {
            next({ name: 'home'})
        }
    }
}