export default async function ({ store, redirect }) {
    if (store.state.authenticated && !store.getters['auth/checkOAuth']) {
        if(!store.getters['auth/checkVerified']) {
            return redirect({name: 'email.resend'})
        }
    }
}