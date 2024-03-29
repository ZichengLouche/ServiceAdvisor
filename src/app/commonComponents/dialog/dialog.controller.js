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
            this.cancelAction = args.cancelAction;
            // textarea UI
            this.justificationText = '';
            this.hasTextarea = args.hasTextarea || false;

            if(typeof this.content == 'object') {
                // angular.element(document).find('.dialog-container .operationPrompt').append(this.content);
                document.querySelector('.dialog-container .operationPrompt').innerHTML = '';
                document.querySelector('.dialog-container .operationPrompt').appendChild(this.content[0]);
                // this.content = 'null';
            } else {
                document.querySelector('.dialog-container .operationPrompt').innerHTML = this.content;
            }
        });

    }

    onCancel() {
        this.isShown = false;
        this.warningInfo = this.$rootScope.validationMessage = '';
        if(this.cancelAction) this.cancelAction();
    }

    onSubmit() {
        this.isLoading = true;
        this.submitAction(this.hasTextarea ? this.justificationText : null).then((data) => {
            this.warningInfo = '';
            this.isShown = data ? data.isKeepShown : false;
            this.isLoading = false;

        }, (error) => {
            this.isLoading = false;
            this.warningInfo = typeof error == 'object' ? '' : error;
            this.$scope.$apply();
        });
    }
}

DialogController.$inject = ['$rootScope', '$scope', '$timeout'];