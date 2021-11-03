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
	$axios.interceptors.response.use(response => {
		if(/^\/admin\/?/gi.test(app.router.currentRoute.fullPath)) {
			if(response.data.notification) {
				app.$eventHub.$emit('open-modal', {
					type: response.data.notification.type ? response.data.notification.type : 'success',
					title: response.data.notification.title ? response.data.notification.title : null,
					message: response.data.notification.message
				});
			}

			if(response.data.status) {
				app.$eventHub.$emit('open-modal', {
					type: 'success',
					title: null,
					message: response.data.status
				});
			}

			if(response.data.error) {
				app.$eventHub.$emit('open-modal', {
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
		} else if (status === 401 && store.getters['auth/authenticated']) {
			Swal.fire({
				icon: 'warning',
				title: app.i18n.t('token_expired_alert_title'),
				text: app.i18n.t('token_expired_alert_text'),
				reverseButtons: true,
				confirmButtonText: app.i18n.t('ok'),
				cancelButtonText: app.i18n.t('cancel')
			}).then(() => {
				store.dispatch('auth/logout')

				redirect({ name: 'login' })
			})
		} else {
			app.$eventHub.$emit('open-modal', {
				type: 'error',
				title: null,
				message: error.response.data.message
			});
		}

		return Promise.reject(error)
	})
}