import Vue from 'vue'

import 'common/stylus/vuetify.styl'

import Vuetify, {
    VApp,
    VList
} from 'vuetify/lib'

import themes from 'common/themes/main'

Vue.use(Vuetify, {
    components: {
        VApp,
        VList
    },
    iconfont: 'md',
    theme: themes[ localStorage.getItem('theme') || 'default' ],
    options: {
        customProperties: true
    }
});
