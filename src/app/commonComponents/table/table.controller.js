export default class TableController {
    constructor() {
    }
    setAll(){
        var isAll = this.isAll;
        angular.forEach(this.data,  function (value) {
            value.isSelected = isAll;
        })
    }
    $onInit() {
        console.log('TableController this:', this);
    }

    $onChanges() {
    }

    $onDestroy() {
    }

    $postLink() {
    }
}