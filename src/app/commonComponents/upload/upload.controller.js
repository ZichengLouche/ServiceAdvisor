
// import url from '../../config/system.js';
// console.log('相对路径配置：'+JSON.stringify(url));

export default class UploadController {
    // common attrs Andy 2018.3.2 17:17
    // static $inject = ['http'];
    constructor($scope) {
        [this.$scope, this.name] = [$scope, 'UploadController'];
    }

    $onInit() {
        this.isShown = false;

        // listener backdrop and resize event
        this.backdropListener = this.$scope.$on('backdrop:upload', (event, args) => {
            this.isShown = args.isShown;
        });

        this.onCloseDropdown = () => {
            this.isShown = !this.isShown;
        }
    }

    $onChanges() {
    }

    $onDestroy() {
        this.backdropListener();
    }

    

}

UploadController.$inject = ['$scope'];


