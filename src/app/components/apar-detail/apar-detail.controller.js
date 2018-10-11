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

    // Andy 2018.10.8 11:57
    bookmark() {
        this.$rootScope.$broadcast('backdrop:loading', { isShow: true });
        this.aparService.addWishItem(this.apar.aparId).then((data) => {
            if(data.id) {
                this.$rootScope.$broadcast('ALERT', {
                    message: `Add ${ this.apar.aparId } to Wish List successfully!`,
                    success: true
                });

                this.apar.favorite = true;
                this.$rootScope.$broadcast('wishList:number', { wishListNumberOffset: 1 });
            }

        }).finally(() => {
            this.$rootScope.$broadcast('backdrop:loading', { isShow: false });
        });
    }

    concelBookmark() {
        this.$rootScope.$broadcast('backdrop:loading', { isShow: true });
        this.aparService.deleteWishItem(this.apar.aparId).then((data) => {
            this.$rootScope.$broadcast('ALERT', {
                message: data.status == 'Success' ? `Remove ${ this.apar.aparId } from Wish List successfully!` : `Remove ${ this.apar.aparId } from Wish List failed!`,
                success: data.status == 'Success'
            });

            if(data.status == 'Success') {
                this.apar.favorite = false;
                this.$rootScope.$broadcast('wishList:number', { wishListNumberOffset: -1 });
            }
            
        }).finally(() => {
            this.$rootScope.$broadcast('backdrop:loading', { isShow: false });
        });
    }


}

AparDetailController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$compile', 'aparService'];


