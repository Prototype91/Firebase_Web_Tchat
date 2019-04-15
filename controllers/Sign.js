import store from '../scripts/store.js';

export default class Sign {

    constructor(router) {
        this.view = 'sign.html';
        this.router = router;
    }

    init() {
        console.log('HOME !');

        document.getElementById('login').addEventListener('submit', this.onSubmitLogin.bind(this), false);
        document.getElementById('signin').addEventListener('submit', this.onSignInLogin.bind(this), false);
        document.getElementById('github').addEventListener('click', this.onSubmitLogin.bind(this), false);
        document.getElementById('google').addEventListener('click', this.onSignInGoogle.bind(this), false);
    }

    onSubmitLogin(event) {

        event.preventDefault(); //évite que le navigateur de recharger la page

        const email = document.getElementById('login_email').value;
        const password = document.getElementById('login_password').value;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(userCredentials => firebase.firestore().collection('users').doc(userCredentials.user.uid).get())
            .then(userDoc => {
                userDoc = userDoc.data();
                console.log('Connected', userDoc);

                store.setState({ user: userDoc });
                this.router.navigateTo('/chat');
            })
            .catch(error => this.displayError(error.code + '\n' + error.message));

        console.log('Connexion !')
    }

    onSignInLogin(event) {


        event.preventDefault(); //évite que le navigateur de recharger la page

        const firstname = document.getElementById('signin_firstname').value;
        const lastname = document.getElementById('signin_lastname').value;
        const email = document.getElementById('signin_email').value;
        const password = document.getElementById('signin_password').value;
        const password_confirm = document.getElementById('signin_password_confirm').value;
        const avatar = document.getElementById('signin_avatar').files[0];

        console.log("Bonjour ", firstname, lastname, email, password, password_confirm, avatar);

        if (password !== password_confirm) {

            return this.displayError('Les mots de passes ne correspondent pas !')
        }

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredentials) => firebase.firestore().collection('users').doc(userCredentials.user.uid).set({ firstname, lastname, email }))
            .then(() => this.router.navigateTo('/chat'))
            .catch(error => {
                this.displayError(error.code + '\n' + error.message);
            });
    }
    onSignInGoogle(event) {

        event.preventDefault(); //évite que le navigateur de recharger la page

        console.log('Connexion !')
    }
    onSignInGithub(event) {

        event.preventDefault(); //évite que le navigateur de recharger la page

        console.log('Connexion !');
    }

    displayError(errorMessage) {
        let error = document.getElementById('error');
        error.classList.remove('d-none');
        error.textContent = errorMessage;
    }

}

