export default class PagerController {
    // Andy 2018.7.27 11:35
    constructor($rootScope, $scope) {
        [this.$rootScope, this.$scope] = [$rootScope, $scope];
        this.currentPage = 1;		
        this.pageSize = 20;	
        
    }

    $onChanges(changes) {
        this.pages = Math.ceil(this.totalDataNum / this.pageSize);
    }

    $onInit() {
        // this.$scope.$watch('search.c', () => {
        //     this.currentPage = 0;
        //     this.queryResult();
        // });

        this.$scope.$watch('$ctrl.currentPage', (newVal, oldVal) => {
            if (newVal == oldVal) return;
            this.queryResult()(this.currentPage, this.pageSize);
        });

    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }

    nextPage() {
        if (this.currentPage < this.pages) {
            this.currentPage++;
        }
    }


    // $doCheck (data) {
    //     console.log('PagerController doCheck ', this, data);
    // }

    // $postLink(data) {
    //     console.log('PagerController postLink', this, data);
    // }
    
    // $onDestroy(data) {
    //     console.log('PagerController Destroy', this, data);
    // }
}

PagerController.$inject = ['$rootScope', '$scope'];