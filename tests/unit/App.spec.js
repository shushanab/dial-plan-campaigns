import '@babel/polyfill'
import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import App from '../../src/dev/App.vue'

console.log(App);

describe('App', () => {
    test('is a Vue instance', () => {
        const wrapper = mount(App);
        expect(wrapper.isVueInstance()).toBeTruthy();
    })
})
