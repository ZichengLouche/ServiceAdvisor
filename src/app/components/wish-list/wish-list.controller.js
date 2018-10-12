export default class WishListController {
    // common attrs Andy 2018.3.2 17:17
    // static $inject = ['http'];
    constructor($rootScope, $scope, $state, $q, aparService, authService) {
        [this.$rootScope, this.$scope, this.$state, this.$q, this.aparService, this.authService, this.name] = [$rootScope, $scope, $state, $q, aparService, authService, 'WishListController'];
        $scope.$parent.$parent.$ctrl.routerType = $state.current.routerType;
        this.currentPage = 1;
        this.pageSize = 10;
    }

    $onChanges(changes) {
        // console.log('WishListController.$onChanges.this:', changes);

        this.queryResults();
    }

    $onInit() {
        // console.log('onInit');
    }
    
    $doCheck() {
        // console.log('doCheck');
    }

    queryResults() {
        this.$rootScope.$broadcast('backdrop:loading', { isShow: true });
        this.aparService.getWishList(0, 0).then((data) => {
            this.wishList = data;
            this.wishListNumber = data.length;
            this.queryResultsByPagination(this.currentPage, this.pageSize);
            this.$rootScope.$broadcast('wishList:number', { wishListNumber: data.length });

        }).finally(() => {
            this.$rootScope.$broadcast('backdrop:loading', { isShow: false });
        });
    }

    queryResultsByPagination(currentPage, pageSize) {
        this.paginationItems = this.wishList.slice(pageSize * (currentPage - 1), (currentPage * pageSize));
        this.currentPage = currentPage;
    }

    delete(item) {
        this.$rootScope.$broadcast('DIALOG', {
            title: 'Are you sure to delete this record?',
            content: '',
            leftBtnName: 'Cancel',
            rightBtnName: 'Delete',
            submitAction: () => {
                return this.aparService.deleteWishItem(item.aparId).then((data) => {
                    this.$rootScope.$broadcast('ALERT', {
                        message: data.status == 'Success' ? 'Delete record successfully!' : `Delete record failed!`,
                        success: data.status == 'Success'
                    });
                    
                    // update state method 1 
                    // this.$state.reload();

                    if(data.status == 'Success') {
                        // update state method 2 
                        this.queryResults(this.currentPage, this.pageSize);

                        // this.$scope.wishListNumber = this.wishListNumber -= 1;
                    }
                })
            }
        });
    }

}

WishListController.$inject = ['$rootScope', '$scope', '$state', '$q', 'aparService', 'authService'];


