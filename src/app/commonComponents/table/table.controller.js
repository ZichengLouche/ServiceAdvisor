export default class TableController {
    constructor($rootScope, $scope) {
        [this.$rootScope, this.$scope, this.name] = [$rootScope, $scope, 'TableController'];
    }
    setAll(){
        var isAll = this.isAll;
        angular.forEach(this.data,  function (value) {
            value.isSelected = isAll;
        })
    }
    $onInit() {
        // console.log('TableController this:', this);
        this.reportId = this.$scope.$parent.$ctrl.reportId;
    }

    $onChanges() {
    }

    $onDestroy() {
    }

    $postLink() {
    }
}

TableController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$compile'];