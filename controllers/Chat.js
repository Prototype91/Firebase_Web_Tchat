import store from '../scripts/store.js';

export default class Chat {

    constructor(router) {
        this.view = 'chat.html';
        this.router = router;
    }

    init() {
        console.log('CHAT !');
        const user = store.getState().user;
        console.log('Bienvenue', user);
    }
}