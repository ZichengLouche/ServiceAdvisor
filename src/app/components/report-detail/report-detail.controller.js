export default class ReportDetailController {
	// common attrs Andy 2018.4.23 17:53
    // static $inject = ['http'];
    constructor($rootScope, $scope, $state, $stateParams, $compile, fileService) {
        [this.$rootScope, this.$scope, this.$state, this.$stateParams, this.$compile, this.fileService, this.name] = [$rootScope, $scope, $state, $stateParams, $compile, fileService, 'ReportDetailController'];
        $scope.$parent.$parent.$ctrl.routerType = $state.current.routerType;
        this.pageSize = 10;
        this.reportList = [[{'name':'Subsystem A'}, {'name':'Subsystem B'}, {'name':'Subsystem B'}],[{'name':'Subsystem A'}, {'name':'Subsystem B'}, {'name':'Subsystem B'}]];
    }

    $onInit() {
        this.getDataSource().then((data) => {
            // Andy 2018.7.27 11:35
            this.queryMHsResultByPagination(1, this.pageSize);
            this.queryPEsResultByPagination(1, this.pageSize);
            this.queryINsResultByPagination(1, this.pageSize);
        }, (err) => {
            console.log('ReportDetailController.getDataSource promise rejected:', err)
        })

        this.tHead = ['APAR', 'PTF', 'ABSTRACT', 'CLOSEDATE', 'MODULE', 'SEV'];
        // tableColumns: tableHeaderColumn <-> dataField
        
        this.missingHIPERsTableData = [{'list':['PI54248', 'UI32815', 'RRSAF DOES NOT SCHEDULE A SERVICE TASK TO CONTINUE PRECESSING OFAN INCOMMIT UR, BUT LET THE UR GET RESOLVES DURING DEFERRED EOT', 
                               '2015-11-11', 'DSN3RRDF', '2']}, 
                              {'list':['PI54248', 'UI32815', 'RRSAF DOES NOT SCHEDULE A SERVICE TASK TO CONTINUE PRECESSING OFAN INCOMMIT UR, BUT LET THE UR GET RESOLVES DURING DEFERRED EOT', 
                               '2015-11-11', 'DSN3RRDF', '2']}
                             ];   

        this.tableColumnsOfHIPERs = [['APAR','AparID'], ['PTF','PTFID'], ['ABSTRACT','Summary'], ['CLOSEDATE','CloseDate'], ['MODULE','Module'], ['SEV','Severity']];
        this.tableColumnsOfPEs = [['PTF ERR','PtfPe'], ['APAR Fix','AparFixesArray'], ['PTF Fix','PtfFix'], ['Abstract Fix','Summary'], ['Closedate Fix','CloseDate'], ['MODULE','FirstModule'], ['SEV','Severity']];
        this.tableColumnsOfInconsistencies = [['MODULE(Inconsistent)','modulehit'], ['PTF(Inconsistent)','Ptfiderror'], ['PTF(Expected)','Ptfidexpected'], ['Ptfidmepl','ptf-evi'],['Module (Evidence)','Moduleevidence']];
        
    }

    getDataSource() {
        let reportId = this.$stateParams.reportId;
        this.reportDetail = this.$stateParams.reportDetail ? this.$stateParams.reportDetail.result : {};
        if(reportId) {
            this.$rootScope.$broadcast('backdrop:loading', { isShow: true });
            return this.fileService.getReport(reportId).then((data) => {
                this.reportDetail = data.result[0].content;
                this.reportDetail.reportPeriod = new Date(this.reportDetail.reportPeriod);
                this.missingHIPERs = this.reportDetail.hiper || [];
                this.PEs = this.reportDetail.peres || [];
                this.inconsistencies = this.reportDetail.inconsistentres || [];
    
            }).finally(() => {
                this.$rootScope.$broadcast('backdrop:loading', { isShow: false });
            });

        } else if(this.reportDetail && Object.keys(this.reportDetail).length > 0) {
            this.reportDetail.reportPeriod = new Date(this.reportDetail.reportPeriod);
            this.missingHIPERs = this.reportDetail.hiper || [];
            this.PEs = this.reportDetail.peres || [];
            this.inconsistencies = this.reportDetail.inconsistentres || [];

            return Promise.resolve(this.reportDetail);  
            
        } else {
            
            return Promise.reject('');  
        }
    }

    queryMHsResultByPagination(currentPage, pageSize) {
        this.missingHIPERsPaginationItems = this.missingHIPERs.slice(pageSize * (currentPage - 1), (currentPage * pageSize));
    }

    queryPEsResultByPagination(currentPage, pageSize) {
        this.pePaginationItems = this.PEs.slice(pageSize * (currentPage - 1), (currentPage * pageSize));
    }

    queryINsResultByPagination(currentPage, pageSize) {
        this.inconsistencyPaginationItems = this.inconsistencies.slice(pageSize * (currentPage - 1), (currentPage * pageSize));
    }

    delete(item) {
        console.log(item);
        this.$rootScope.$broadcast('DIALOG', {
            title: 'Are you sure to delete this report?',
            content: '',
            leftBtnName: 'Cancel',
            rightBtnName: 'Delete',
            submitAction: () => {
                var defer = this.$q.defer();
                // WishlistService.addWishItem(LoginService.getCurrentProfileId(), productId).then(function (data) {
                //     $log.debug(data.status);
                //     if (data.status === "Success") {
                //         $rootScope.$broadcast('ALERT', {
                //             message: 'Add to wish list successfully',
                //             success: true
                //         });
                //         defer.resolve();
                //     } else {
                //         defer.reject();
                //     }
                // }, function (err) {
                //     $log.error(err);
                //     defer.reject();
                // });
                return defer.promise;
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
                // if(this.validate()) return Promise.reject(`<span style="position: relative;top: 10px;">${ this.$rootScope.validationMessage }</span>`);
                if(this.validate()) return Promise.reject();

                return this.fileService.sendReport(this.reportDetail.meplId, this.sendToEmail).then((data) => {
                    cancelAction();
                    this.$rootScope.$broadcast('ALERT', {
                        message: 'Send report to the email successfully',
                        success: data == 'success'
                    });
                })
            },
            cancelAction: cancelAction,
        });
    }

    // Andy 2018.8.9 18:00
    validate() {
        if(!document.querySelector('#email').checkValidity()) {
            if(document.querySelector('#email').validity.typeMismatch) {
                this.$rootScope.validationMessage = '<span style="position: relative;top: 10px;">*The email format is invalid!</span>';

            } else {
                this.$rootScope.validationMessage = '<span style="position: relative;top: 10px;">*Please fill in an email!</span>';
            }

        } else {
            this.$rootScope.validationMessage = '';
        }

        return this.$rootScope.validationMessage;
    }

    test(obj) {
        console.log('email input changed:' + this.email + '; obj:', obj);
    }
}

ReportDetailController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$compile', 'fileService'];


