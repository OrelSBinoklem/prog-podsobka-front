<template>
  <div class="row">
    <div class="col-lg-8 m-auto">
      <card :title="$t('login')">
        <form @submit.stop.prevent="login" @keydown="form.onKeydown($event)">
          <!-- Email -->
          <div class="form-group row">
            <label class="col-md-3 col-form-label text-md-right">{{ $t('email') }}</label>
            <div class="col-md-7">
              <input v-model="form.email" :class="{ 'is-invalid': form.errors.has('email') }" class="form-control" type="email" name="email">
              <has-error :form="form" field="email"/>
            </div>
          </div>

          <!-- Password -->
          <div class="form-group row">
            <label class="col-md-3 col-form-label text-md-right">{{ $t('password') }}</label>
            <div class="col-md-7">
              <input v-model="form.password" :class="{ 'is-invalid': form.errors.has('password') }" class="form-control" type="password" name="password">
              <has-error :form="form" field="password"/>
            </div>
          </div>

          <!-- Check a robot -->
          <div class="form-group row">
            <label class="col-md-3 col-form-label text-md-right">{{ $t('captcha') }}</label>
            <div class="col-md-7">
              <Recaptcha :sitekey="sitekey" :callback="onCaptcha"></Recaptcha>
              <span class="form-control is-invalid d-none"></span>
              <has-error :form="form" field="g-recaptcha-response"/>
            </div>
          </div>

          <!-- Remember Me -->
          <div class="form-group row">
            <div class="col-md-3"/>
            <div class="col-md-7 d-flex">
              <checkbox v-model="remember" name="remember">
                {{ $t('remember_me') }}
              </checkbox>

              <nuxt-link :to="{ name: 'password.request' }" class="small ml-auto my-auto">
                {{ $t('forgot_password') }}
              </nuxt-link>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-md-7 offset-md-3 d-flex">
              <!-- Submit Button -->
              <v-button :loading="form.busy">
                {{ $t('login') }}
              </v-button>

              <!-- GitHub Login Button -->
              <login-with-github/>
            </div>
          </div>
        </form>
      </card>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import Form from 'vform'
import LoginWithGithub from '~/components/LoginWithGithub'
import Recaptcha from '~/components/Recaptcha'

export default {
  middleware: 'guest',

  components: {
    Recaptcha,
    LoginWithGithub
  },

  metaInfo () {
    return { title: this.$t('login') }
  },

  data: () => ({
    recaptchaId: 0,
    sitekey: null,
    form: new Form({
      email: '',
      password: '',
      'g-recaptcha-response': ''
    }),
    remember: false
  }),

  created() {
    this.sitekey = this.$env.recaptchaSiteKey;
  },

  methods: {
    async login () {
      // Submit the form.
      this.form.busy = true;
      const { data } = await new Promise((resolve, reject) => {
        this.$auth.loginWith("local", {
          data: this.form
        })
          .then(response => {
            this.form.busy = false;

            resolve(response);

            // Redirect home.
            this.$router.push({ name: 'admin.dashboard' });
          })
          .catch(error => {
            this.form.busy = false;

            if (_.has(error, 'response.data.errors')) {
              this.form.errors.set(error.response.data.errors);
            }

            if (this.form['g-recaptcha-response'] != '') {
              this.form['g-recaptcha-response'] = ''
              window.grecaptcha.reset(this.recaptchaId)
            }
            reject(error)
          })
      })
    },

    onCaptcha(token, recaptchaId) {
      this.form['g-recaptcha-response'] = token
      this.recaptchaId = recaptchaId
    }
  },

  watch: {
    sitekey(val) {
      console.log(val)
    }
  }
}
</script>
