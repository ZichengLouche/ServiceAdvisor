export default class AparDetailController {
    
    constructor($rootScope, $scope, $state, $stateParams, $compile, aparService) {
        [this.$rootScope, this.$scope, this.$state, this.$stateParams, this.$compile, this.aparService, this.name] = [$rootScope, $scope, $state, $stateParams, $compile, aparService, 'AparDetailController'];
        $scope.$parent.$parent.$ctrl.routerType = $state.current.routerType;
        this.pageSize = 10;
    }

    $onInit() {
        this.aparId = this.$stateParams.aparId;
        this.ptfId = this.$stateParams.ptfId;
        if(this.aparId) {
            this.$rootScope.$broadcast('backdrop:loading', { isShow: true });
            this.aparService.getAparByAparId(this.aparId).then((data) => {
                this.apar = data;
    
            }).finally(() => {
                this.$rootScope.$broadcast('backdrop:loading', { isShow: false });
            });

        } else if(this.ptfId) {
            this.$rootScope.$broadcast('backdrop:loading', { isShow: true });
            this.aparService.getAparByPtfId(this.ptfId).then((data) => {
                this.apar = data;
    
            }).finally(() => {
                this.$rootScope.$broadcast('backdrop:loading', { isShow: false });
            });
            
        } else {
        }
        
    }

    delete() {
        this.$rootScope.$broadcast('DIALOG', {
            title: 'Are you sure to delete this report?',
            content: '',
            leftBtnName: 'Cancel',
            rightBtnName: 'Delete',
            submitAction: () => {
                this.aparService.removeReport(this.reportId).then((data) => {
                    this.$state.go('main.report');
                })
            }
        });
    }

    send() {
        let originContent = '<input style="width: 100%;" type="email" class="input-border" placeholder="Enter email address" ng-model="$ctrl.sendToEmail" ng-change="$ctrl.validate()" required id="email">';
        let compiledContent = this.$compile(originContent)(this.$scope);
        // angular.element('.operationPrompt').append(compiledContent);
        let cancelAction = () => {
            this.sendToEmail = undefined;
        };

        this.$rootScope.$broadcast('DIALOG', {
            title: 'Send report to',
            content: compiledContent,
            leftBtnName: 'Cancel',
            rightBtnName: 'Done',
            submitAction: () => {
                // if(this.validate()) Promise.reject(`<span style="position: relative;top: 10px;">${ this.$rootScope.validationMessage }</span>`);
                if(this.validate()) Promise.reject();

                this.aparService.sendReport(this.reportDetail.meplId, this.sendToEmail).then((data) => {
                    cancelAction();
                    this.$rootScope.$broadcast('ALERT', {
                        message: data == 'ok' ? 'Send report to the email successfully' : `Send report to the email failed: ${data}`,
                        success: data == 'ok',
                    });
                })
            },
            cancelAction: cancelAction,
        });
    }

}

AparDetailController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$compile', 'aparService'];


