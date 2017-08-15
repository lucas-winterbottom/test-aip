export class MainController {
  constructor($http) {
    'ngInject';
    this.$http = $http;
    this.getMessages();
  }

  getMessages() {
    var vm = this;
    this.$http.get('http://localhost:5000/api/message').then(function(result) {
      vm.messages = result.data;
    });
  }

  postMessage() {
    this.$http.post('http://localhost:5000/api/message', {
      title: this.title,
      release: this.release,
      duration: this.duration,
      genre: this.genre,
      syn: this.message
    });
    this.getMessages();
  }
}
