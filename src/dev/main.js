import Vue from 'vue'
import App from 'dev/App'
import store from 'dev/store'

import 'common/plugins/vuetify'

import 'common/stylus/main.styl'

Vue.config.productionTip = false

new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
