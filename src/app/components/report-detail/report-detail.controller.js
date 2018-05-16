export default class ReportDetailController {
	// common attrs Andy 2018.4.23 17:53
    // static $inject = ['http'];
    constructor($rootScope, $scope, $state, $compile) {
        [this.$rootScope, this.$scope, this.$compile, this.name] = [$rootScope, $scope, $compile, 'ReportDetailController'];
        this.reportList = [[{'name':'Subsystem A'}, {'name':'Subsystem B'}, {'name':'Subsystem B'}],[{'name':'Subsystem A'}, {'name':'Subsystem B'}, {'name':'Subsystem B'}]];
    }

    $onInit() {
        this.tHead = ['APAR', 'PTF', 'ABSTRACT', 'CLOSEDATE', 'MODULE', 'SEV'];
        // tableColumns: tableHeaderColumn <-> dataField
        this.tableColumns = [['APAR','apar'], ['PTF','ptf'], ['ABSTRACT','abstract'], ['CLOSEDATE','closedate'], ['MODULE','module'], ['SEV','sev']];
        this.missingHIPERs = [{'apar':'PI54248','ptf':'UI32815','abstract':'RRSAF DOES NOT SCHEDULE A SERVICE TASK TO CONTINUE PRECESSING OFAN INCOMMIT UR, BUT LET THE UR GET RESOLVES DURING DEFERRED EOT',
                               'closedate':'2015-11-11','module':'DSN3RRDF','sev':'2','test':'t'}, 
                              {'apar':'PI54248','ptf':'UI32815','abstract':'RRSAF DOES NOT SCHEDULE A SERVICE TASK TO CONTINUE PRECESSING OFAN INCOMMIT UR, BUT LET THE UR GET RESOLVES DURING DEFERRED EOT',
                               'closedate':'2015-11-11','module':'DSN3RRDF','sev':'2','test':'t'},
                             ];    
        this.missingHIPERsTableData = [{'list':['PI54248', 'UI32815', 'RRSAF DOES NOT SCHEDULE A SERVICE TASK TO CONTINUE PRECESSING OFAN INCOMMIT UR, BUT LET THE UR GET RESOLVES DURING DEFERRED EOT', 
                               '2015-11-11', 'DSN3RRDF', '2']}, 
                              {'list':['PI54248', 'UI32815', 'RRSAF DOES NOT SCHEDULE A SERVICE TASK TO CONTINUE PRECESSING OFAN INCOMMIT UR, BUT LET THE UR GET RESOLVES DURING DEFERRED EOT', 
                               '2015-11-11', 'DSN3RRDF', '2']}
                             ];   
                             
        this.PEs = this.missingHIPERs;  
        
        this.tableColumnsOfInconsistencies = [['MODULE(Inconsistent)','module'], ['PTF(Inconsistent)','ptf-inc'], ['PTF(Expected)','ptf-exp'], ['PTF(Evidence)','ptf-evi']];
        this.inconsistencies = [{'module':'DSNGDBIX','ptf-inc':'UI32815','ptf-exp':'UI21659', 'ptf-evi':'UI21659','test':'t'}, 
                              {'module':'DSNGDBIX','ptf-inc':'UI32815','ptf-exp':'UI21659', 'ptf-evi':'UI21659','test':'t'},
                             ]; 
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

    test(obj) {
        console.log('email input changed:' + this.email + '; obj:', obj);
    }

    send(item) {
        console.log(item);
        let originContent = '<input style="width: 100%;" type="text" class="input-border" placeholder="Enter email address" ng-model="$ctrl.email" ng-change="$ctrl.test(this)" id="output" >';
        let compiledContent = this.$compile(originContent)(this.$scope);
        // angular.element('.operationPrompt').append(compiledContent);

        this.$rootScope.$broadcast('DIALOG', {
            title: 'Send report to',
            content: compiledContent,
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
}

ReportDetailController.$inject = ['$rootScope', '$scope', '$state', '$compile'];


