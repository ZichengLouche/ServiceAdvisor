export default class ReportDetailController {
	// common attrs Andy 2018.4.23 17:53
    // static $inject = ['http'];
    constructor($rootScope, $scope, $state, $stateParams, $compile, fileService, $filter, orderByFilter) {
        [this.$rootScope, this.$scope, this.$state, this.$stateParams, this.$compile] = [$rootScope, $scope, $state, $stateParams, $compile];
        [this.fileService, this.$filter, this.orderBy, this.name] = [fileService, $filter, orderByFilter, 'ReportDetailController'];
        $scope.$parent.$parent.$ctrl.routerType = $state.current.routerType;
        this.pageSize = 10;
    }

    $onInit() {
        this.getDataSource().then((data) => {
            // Andy 2018.7.27 11:35
            this.queryMHsResultByPagination(1, this.pageSize);
            this.queryPEsResultByPagination(1, this.pageSize);
            this.queryINsResultByPagination(1, this.pageSize);
        }, (err) => {
            console.log('ReportDetailController.getDataSource promise rejected:', err);
        })

        this.tHead = ['APAR', 'PTF', 'ABSTRACT', 'CLOSEDATE', 'MODULE', 'SEV'];
        // tableColumns: tableHeaderColumn <-> dataField
        
        this.missingHIPERsTableData = [{'list':['PI54248', 'UI32815', 'RRSAF DOES NOT SCHEDULE A SERVICE TASK TO CONTINUE PRECESSING OFAN INCOMMIT UR, BUT LET THE UR GET RESOLVES DURING DEFERRED EOT', 
                               '2015-11-11', 'DSN3RRDF', '2']}, 
                              {'list':['PI54248', 'UI32815', 'RRSAF DOES NOT SCHEDULE A SERVICE TASK TO CONTINUE PRECESSING OFAN INCOMMIT UR, BUT LET THE UR GET RESOLVES DURING DEFERRED EOT', 
                               '2015-11-11', 'DSN3RRDF', '2']}
                             ];   

        this.tableColumnsOfHIPERs = [['APAR','AparID'], ['PTF','PTFID'], ['ABSTRACT','Summary'], ['CLOSEDATE','CloseDate'], ['MODULE','Module'], ['Rating/recommendation','Severity']];
        this.tableColumnsOfPEs = [['PTF ERR','PtfPe'], ['APAR Fix','AparFixesArray'], ['PTF Fix','PtfFix'], ['Abstract Fix','Summary'], ['Closedate Fix','CloseDate'], ['MODULE','FirstModule'], ['Rating/recommendation','Severity']];
        this.tableColumnsOfInconsistencies = [['MODULE(Inconsistent)','modulehit'], ['PTF(Inconsistent)','Ptfiderror'], ['PTF(Expected)','Ptfidexpected'], ['Ptfidmepl','ptf-evi'],['Module (Evidence)','Moduleevidence']];
        
    }

    getDataSource() {
        this.reportId = this.$stateParams.reportId;
        this.reportDetail = this.$stateParams.reportDetail ? this.$stateParams.reportDetail.result : {};
        if(this.reportId) {
            this.$rootScope.$broadcast('backdrop:loading', { isShow: true });
            return this.fileService.getReport(this.reportId).then((data) => {
                this.reportDetail = data.result[0].content;
                this.reportDetail.reportPeriod = new Date(this.reportDetail.reportPeriod);
                this.missingHIPERs = this.reportDetail.hiper || [];
                this.PEs = this.reportDetail.peres || [];
                this.inconsistencies = this.reportDetail.inconsistentres || [];
    
                // Andy 2018.10.17 9:32
                this.missingHIPERs = this.$filter('orderBy')(this.reportDetail.hiper, 'CloseDate' , true);
                this.PEs = this.orderBy(this.reportDetail.peres, 'CloseDate' , true);

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

    delete() {
        this.$rootScope.$broadcast('DIALOG', {
            title: 'Are you sure to delete this report?',
            content: '',
            leftBtnName: 'Cancel',
            rightBtnName: 'Delete',
            submitAction: () => {
                return this.fileService.removeReport(this.reportId).then((data) => {
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
                // if(this.validate()) return Promise.reject(`<span style="position: relative;top: 10px;">${ this.$rootScope.validationMessage }</span>`);
                if(this.validate()) return Promise.reject();

                return this.fileService.sendReport(this.reportDetail.meplId, this.sendToEmail).then((data) => {
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

ReportDetailController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$compile', 'fileService', '$filter', 'orderByFilter'];


