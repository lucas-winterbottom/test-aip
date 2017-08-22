export class MainController {

  constructor($http) {
    'ngInject';
    this.$http = $http;
    this.getMessages();
  }

  getMessages() {
    console.log("Getting data");
    var vm = this;
    this.$http.get('http://127.0.0.1:5000/api/message').then(function(result) {
      vm.messages = result.data;
      console.log("data retrieved");
    });
  }

  postMessage() {
    console.log("Posting data");
    this.$http.post('http://127.0.0.1:5000/api/message', {
      name: this.name, //will end up being the current user's name
      name2: this.name2, //is the name of the person who is taking the shift
      role: this.role, //description of the role this shift covers
      startTime: this.startTime,
      date: this.date,
      duration: this.duration, //duration of shift
      approved: false // whether or not the shift covering has been approved 
    }).then(location.reload());

  }

  deleteMessage(id) {
    this.$http.delete('http://127.0.0.1:5000/api/message/' + id).success(function(result) {});
  }
}
