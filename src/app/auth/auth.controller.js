export class AuthController {

    constructor($auth) {
      'ngInject';

      this.$auth = $auth;
    }

    register() {
      var vm = this; //save reference to this
      this.$auth.signup(this.user).then(function(token) {
        vm.$auth.setToken(token); //save token to local machine
      });
    }

    login() {
      var vm = this; //save reference to this
      this.$auth.login(this.login.user).then(function(token) {
        vm.$auth.setToken(token); //save token to local machine
      });
    }
}
