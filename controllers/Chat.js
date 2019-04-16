import store from '../scripts/store.js';

export default class Chat {

    constructor(router) {

        this.view = 'chat.html';
        this.router = router;

        this.user = null;
        this.message = [];

    }

    init() {

        console.log('CHAT !');

        //const user = store.getState().user;

        //Récupération de l'utilisateur en cours
        firebase.auth().onAuthStateChanged(user => {

            firebase.firestore().collection('users').doc(user.uid).get()
                .then(user => {

                    //Mise à jour du state
                    store.setState({ user: user.data() });

                    //Définition de l'utilisateur
                    this.user = user.data();

                    const wrapper = document.getElementById('wrapper');
                    wrapper.classList.remove('d-none');
                    wrapper.getElementsByTagName('h1')[0].textContent = `Bienvenue ${this.user.firstname} ${this.user.lastname}`;

                    this.initChat();
                });
        });
    }

    initChat() {
        document.getElementById('addMessage').addEventListener('submit', this.onAddMessage.bind(this), false);
    }

    onAddMessage(event) {

        event.preventDefault();

        const messageEl = document.getElementById('message');
        const { firstname, lastname } = this.user;

        if(!messageEl.value) return;

        this.message.push({
            pseudo: `${firstname} ${lastname}`,
            message: messageEl.value,
            date: Date.now(),
        });

        messageEl.value = ''; //Vide le champs input

        this.renderMessages();

    }

    renderMessages() {

        const ul = document.getElementById('messages');

        ul.innerHTML = this.message.map(message => `<li class="list-group-item d-flex align-items-start">
        <img class="rounded" src="//gradientjoy.com/40x40" style="width:40px;" />
        <div class="d-flex w-100 flex-column align-items-start ml-2">
            <span class="badge badge-dark mr-1">${message.pseudo}</span>
            ${message.message}
        </div>
        <span class="ml-auto badge badge-light">${new Date(message.date).toLocaleString()}</span>
    </li>`).join('');

    }

}