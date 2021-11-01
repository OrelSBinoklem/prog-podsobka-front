<template>
    <div class="row">
        <div class="col-lg-8 m-auto">
            <card :title="$t('verified_processed')">
                <p v-if="verified === null">
                    {{ $t('verified_processed') }}
                </p>
                <template v-else-if="verified === true">
                    <div class="alert alert-success" role="alert">
                        {{ $t('email_verified') }}
                    </div>
                    <nuxt-link :to="{ name: 'home' }" class="btn btn-primary">
                        {{ $t('go_home') }}
                    </nuxt-link>
                </template>
                <template v-else>
                    <div class="alert alert-danger" role="alert">
                        {{ $t('email_not_verified') }}
                    </div>
                </template>
            </card>
        </div>
    </div>
</template>

<script>
    export default {
        middleware: ['auth', 'not-verified'],

        metaInfo () {
            return { title: this.$t('verify_email') }
        },

        data: () => ({
            verified: null
        }),

        mounted () {
            this.verify();
        },

        methods: {
            async verify () {
                const { data } = await this.$axios.get(`/email/verify/${this.$route.params.id}`, {params: {...this.$route.query}})

                // Fetch the user.
                await this.$store.dispatch('auth/fetchUser')

                this.verified = data.verified === true;
            }
        }
    }
</script>
