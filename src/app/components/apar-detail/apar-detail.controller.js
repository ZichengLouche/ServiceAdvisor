export default class AparDetailController {

    constructor($rootScope, $scope, $state, $stateParams, $compile, aparService) {
        [this.$rootScope, this.$scope, this.$state, this.$stateParams, this.$compile, this.aparService, this.name] = [$rootScope, $scope, $state, $stateParams, $compile, aparService, 'AparDetailController'];
        $scope.$parent.$parent.$ctrl.routerType = $state.current.routerType;
        this.pageSize = 10;
    }

    $onInit() {
        this.aparId = this.$stateParams.aparId;
        this.ptfId = this.$stateParams.ptfId;
        this.reportId = this.$stateParams.reportId;
        if (this.aparId) {
            this.$rootScope.$broadcast('backdrop:loading', { isShow: true });
            this.aparService.getAparByAparId(this.aparId).then((data) => {
                this.apar = data;
                this.convertRating(data);

            }).finally(() => {
                this.$rootScope.$broadcast('backdrop:loading', { isShow: false });
            });

        } else if (this.ptfId) {
            this.$rootScope.$broadcast('backdrop:loading', { isShow: true });
            this.aparService.getAparByPtfId(this.ptfId).then((data) => {
                this.apar = data;
                this.convertRating(data);

            }).finally(() => {
                this.$rootScope.$broadcast('backdrop:loading', { isShow: false });
            });

        } else {
        }

    }

    convertRating(data) {
        let starTotalNum = data.rating / 1 * 10 * 0.5;                      // half star per 0.1
        let fullStarNum = (starTotalNum - parseInt(starTotalNum)) > 0.5 && (parseInt(starTotalNum) + 1) || parseInt(starTotalNum) || 0;
        let halfStarNum = (starTotalNum % 1 > 0 && starTotalNum % 1 <= 0.5 && 1) || 0;
        let emptyStarNum = 5 - fullStarNum - halfStarNum;

        this.fullStar = new Array(fullStarNum);
        this.halfStar = new Array(halfStarNum);
        this.emptyStar = new Array(emptyStarNum);
        this.fullStar.fill(1);
        this.halfStar.fill(1);
        this.emptyStar.fill(1);
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
                if (this.validate()) Promise.reject();

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


