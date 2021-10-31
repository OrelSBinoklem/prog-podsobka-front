import Vue from 'vue'
import Swal from 'sweetalert2'

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
export default function({ app, $axios, store, redirect }) {
	$axios.defaults.baseURL = process.env.apiUrl

	if (process.server) {
		return
	}

	// Request interceptor
	$axios.interceptors.request.use((request) => {
		request.baseURL = process.env.apiUrl

		const locale = store.getters['lang/locale']
		if (locale) {
			request.headers.common['Accept-Language'] = locale
		}

		return request
	});

	// Response interceptor
	let $eventBus = new Vue();
	Vue.prototype.$eventHub = $eventBus;

	Vue.component('notifications', {
		template: '<div><vue-snotify></vue-snotify></div>',
		created() {
			this.$eventHub.$on('open-modal', ({type, title, message}) => {
				const conf = {
					timeout: 5000,
					showProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true
				}
				if(!type) {
					throw new Error("Not given type")
				}

				if(!/^(simple|success|info|warning|error)$/gi.test(type)) {
					throw new Error("Supported types \"simple, success, info, warning, error\" given:" + type)
				}

				if(title) {
					this.$snotify[type](message, title, conf);
				} else {
					this.$snotify[type](message, conf);
				}
			});
		},
		beforeDestroy() {
			this.$eventHub.$off('open-modal');
		},
	});

	// Response interceptor
	$axios.interceptors.response.use(response => {
		if(/^\/admin\/?/gi.test(app.router.currentRoute.fullPath)) {
			if(response.data.notification) {
				$eventBus.$emit('open-modal', {
					type: response.data.notification.type ? response.data.notification.type : 'success',
					title: response.data.notification.title ? response.data.notification.title : null,
					message: response.data.notification.message
				});
			}

			if(response.data.status) {
				$eventBus.$emit('open-modal', {
					type: 'success',
					title: null,
					message: response.data.status
				});
			}

			if(response.data.error) {
				$eventBus.$emit('open-modal', {
					type: 'error',
					title: null,
					message: response.data.error
				});
			}
		}

		return response
	}, (error) => {
		const { status } = error.response || {}

		if (status >= 500) {
			Swal.fire({
				icon: 'error',
				title: app.i18n.t('error_alert_title'),
				text: app.i18n.t('error_alert_text'),
				reverseButtons: true,
				confirmButtonText: app.i18n.t('ok'),
				cancelButtonText: app.i18n.t('cancel')
			})
		} else if (status === 401 && store.getters['auth/check']) {
			Swal.fire({
				icon: 'warning',
				title: app.i18n.t('token_expired_alert_title'),
				text: app.i18n.t('token_expired_alert_text'),
				reverseButtons: true,
				confirmButtonText: app.i18n.t('ok'),
				cancelButtonText: app.i18n.t('cancel')
			}).then(() => {
				store.commit('auth/LOGOUT')

				redirect({ name: 'login' })
			})
		} else {
			$eventBus.$emit('open-modal', {
				type: 'error',
				title: null,
				message: error.response.data.message
			});
		}

		return Promise.reject(error)
	})
}