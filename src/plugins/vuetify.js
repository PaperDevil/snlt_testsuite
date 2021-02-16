import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify, {
    iconfont: 'mdi',
});

export default new Vuetify({
    theme: { 
        dark: true,
        themes: {
            light: {
                primary: '#c2e9ff',
                secondary: '#242729',
                accent: '#4bde88',
                error: '#34a8eb'
              },
            dark: {
                primary: '#282a36',
                secondary: '#6272a4',
                accent: '#bd93f9',
                error: '#ff5555',
            }
        }
    },
});
