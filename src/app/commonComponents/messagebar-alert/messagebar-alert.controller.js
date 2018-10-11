// Andy 2018.5.2 17:28
export default class MessagebarAlertController {
  constructor($rootScope, $scope, $timeout) {
    [this.$rootScope, this.$scope, this.$timeout, this.name] = [$rootScope, $scope, $timeout, 'MessagebarAlertController'];
  }

  $onInit() {
    this.$scope.$on('ALERT', (event, args) => {
      this.$scope.info = {};
      this.$scope.info.isShow = true;
      this.$scope.info.success = args.success;
      this.$scope.info.error = args.error;
      this.$scope.info.warning = args.warning;
      this.$scope.info.message = args.message || '';
              
      // remove the alert after 3 seconds
      this.$timeout(() => {
        this.$scope.info.isShow = false;
      }, 5000);
    });
  }

  $onChanges() {
  }

  $onDestroy() {
  }

  $postLink() {
    
  }
}

MessagebarAlertController.$inject = ['$rootScope', '$scope', '$timeout'];



