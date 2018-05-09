export default class DialogController {
    constructor($rootScope, $scope, $timeout) {
        [this.$rootScope, this.$scope, this.$timeout, this.name] = [$rootScope, $scope, $timeout, 'DialogController'];
    }

    $onInit() {
        // Andy 2018.5.3 10:23
        this.$scope.$on('DIALOG', (event, args) => {
            // common UI
            this.isShown = true;
            this.title = args.title || '';
            this.content = args.content || '';
            this.leftBtnName = args.leftBtnName || '';
            this.rightBtnName = args.rightBtnName || '';
            this.submitAction = args.submitAction || {};
            // textarea UI
            this.justificationText = '';
            this.hasTextarea = args.hasTextarea || false;
        });

    }

    onCancel() {
        this.isShown = false;
        this.warningInfo = false;
    }

    onSubmit() {
        this.isLoading = true;
        this.submitAction(this.hasTextarea ? this.justificationText : null).then(() => {
            this.warningInfo = this.hasTextarea ? false : false;
            this.isShown = false;
            this.isLoading = false;
        }, (error) => {
            this.isLoading = false;
            this.warningInfo = this.hasTextarea ? true : false;
            console.log(error);
        });
    }
}

DialogController.$inject = ['$rootScope', '$scope', '$timeout'];