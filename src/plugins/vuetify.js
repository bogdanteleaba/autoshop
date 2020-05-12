import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader


Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi',
    },
    theme: {
        themes: {
            light: {
                primary: '#FFFFFF',
                secondary: '#2B2B2B',
                white: '#ffffff',
                red: '#FF3F3F',
                darkgrey: '#707070',
                black: '#000000',
                complete: '#30ff00',
                inprogress: '#FF8400',
                incomplete: '#FF3F3F',
                lightgrey: '#cacaca',
                blue: '00fcff',
            }
        }
    }
});
