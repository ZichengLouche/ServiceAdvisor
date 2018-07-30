export default class ReportDetailController {
	// common attrs Andy 2018.4.23 17:53
    // static $inject = ['http'];
    constructor($rootScope, $scope, $state, $compile) {
        [this.$rootScope, this.$scope, this.$compile, this.name] = [$rootScope, $scope, $compile, 'ReportDetailController'];
        this.pageSize = 10;
        this.reportList = [[{'name':'Subsystem A'}, {'name':'Subsystem B'}, {'name':'Subsystem B'}],[{'name':'Subsystem A'}, {'name':'Subsystem B'}, {'name':'Subsystem B'}]];
    }

    $onInit() {
        this.tHead = ['APAR', 'PTF', 'ABSTRACT', 'CLOSEDATE', 'MODULE', 'SEV'];
        // tableColumns: tableHeaderColumn <-> dataField
        this.tableColumns = [['APAR','apar'], ['PTF','ptf'], ['ABSTRACT','abstract'], ['CLOSEDATE','closedate'], ['MODULE','module'], ['SEV','sev']];
        this.missingHIPERs = [{'apar':'PI04942','ptf':'UI12649','abstract':'00C90218 DSNISGSC ERQUAL5001 ABEND AND INSERT PERFORMANCE DEGRADATIO',
                               'closedate':'2013-11-18','module':'DSNISRTW','sev':'1','test':'t'}, 
                              {'apar':'PI04986','ptf':'UI15964','abstract':'AUXILIARY STORAGE SHORTAGE HANG MAY OCCUR FOR A VERY LARGE QUERY INVOLVING A VERY LARGE NUMBER OF TABLES',
                               'closedate':'2014-03-12','module':'DSNXOSJO','sev':'3','test':'t'},
                              {'apar':'PI05742','ptf':'UI17210','abstract':'INCORROUT OR INFINITE LOOP FOR SQLPL PROCEDURE CONTAINING TRANSITIVE CLOSURE PREDICATES OR A BETWEEN PREDICATE',
                               'closedate':'2014-04-21','module':'DSNXOB2','sev':'2','test':'t'},
                              {'apar':'PI05920','ptf':'UI19137','abstract':'ABEND0C4 IN DSNSVSFB ON A FREE STORAGE CALL FROM DSNLXREL. DB2 MAY ABEND WITH RC00D94001',
                               'closedate':'2014-06-25','module':'DSNLXROP','sev':'2','test':'t'},
                              {'apar':'PI06434','ptf':'UI14041','abstract':'INCORROUT INCORRECT SORT ORDER FOR A SINGLE TABLE QUERY BLOCK WHEN LIST PREFETCH ACCESS PATH IS CHOSEN',
                               'closedate':'2014-01-07','module':'DSNXOPCO','sev':'2','test':'t'},
                              {'apar':'PI06690','ptf':'UI20562','abstract':'REDUCE SPACE MAP CONTENTION FOR LOB TS',
                               'closedate':'2014-08-14','module':'DSNOALLO','sev':'3','test':'t'},
                              {'apar':'PI06843','ptf':'UI22579','abstract':'MOVE ADMF LOCAL BCT SUBPOOL TO ATB (ABOVE THE BAR)',
                               'closedate':'2014-10-28','module':'DSNGDADP','sev':'2','test':'t'},
                              {'apar':'PI08029','ptf':'UI23676','abstract':'SQLINCORR SQLCODE100 FOR SELECT FROM XML TABLE WITH ISO(UR)',
                               'closedate':'2014-12-05','module':'DSNIACCH','sev':'2','test':'t'},
                              {'apar':'PI08206','ptf':'UI15913','abstract':'ABEND0C4 RC0038 AT DSNXOCT OFFSET0540 WHEN SELECT AFTER UNION ALL IS IN PARENTHESIS',
                               'closedate':'2014-03-11','module':'DSNXODSO','sev':'3','test':'t'},
                              {'apar':'PI08924','ptf':'UI17374','abstract':'IF FLASHCOPY IC IS MIGRATED TO ML2 - RECOVER TOCOPY FAILS WITH ADR383W.',
                               'closedate':'2014-04-24','module':'DSNUCASA','sev':'3','test':'t'},
                              {'apar':'PI04942','ptf':'UI12649','abstract':'00C90218 DSNISGSC ERQUAL5001 ABEND AND INSERT PERFORMANCE DEGRADATIO xmt',
                               'closedate':'2013-11-18','module':'DSNISRTW','sev':'1','test':'t'}, 
                              {'apar':'PI04986','ptf':'UI15964','abstract':'AUXILIARY STORAGE SHORTAGE HANG MAY OCCUR FOR A VERY LARGE QUERY INVOLVING A VERY LARGE NUMBER OF TABLES',
                               'closedate':'2014-03-12','module':'DSNXOSJO','sev':'3','test':'t'},
                              {'apar':'PI05742','ptf':'UI17210','abstract':'INCORROUT OR INFINITE LOOP FOR SQLPL PROCEDURE CONTAINING TRANSITIVE CLOSURE PREDICATES OR A BETWEEN PREDICATE',
                               'closedate':'2014-04-21','module':'DSNXOB2','sev':'2','test':'t'},
                              {'apar':'PI05920','ptf':'UI19137','abstract':'ABEND0C4 IN DSNSVSFB ON A FREE STORAGE CALL FROM DSNLXREL. DB2 MAY ABEND WITH RC00D94001',
                               'closedate':'2014-06-25','module':'DSNLXROP','sev':'2','test':'t'},
                              {'apar':'PI06434','ptf':'UI14041','abstract':'INCORROUT INCORRECT SORT ORDER FOR A SINGLE TABLE QUERY BLOCK WHEN LIST PREFETCH ACCESS PATH IS CHOSEN',
                               'closedate':'2014-01-07','module':'DSNXOPCO','sev':'2','test':'t'},
                              {'apar':'PI06690','ptf':'UI20562','abstract':'REDUCE SPACE MAP CONTENTION FOR LOB TS',
                               'closedate':'2014-08-14','module':'DSNOALLO','sev':'3','test':'t'},
                              {'apar':'PI06843','ptf':'UI22579','abstract':'MOVE ADMF LOCAL BCT SUBPOOL TO ATB (ABOVE THE BAR)',
                               'closedate':'2014-10-28','module':'DSNGDADP','sev':'2','test':'t'},
                              {'apar':'PI08029','ptf':'UI23676','abstract':'SQLINCORR SQLCODE100 FOR SELECT FROM XML TABLE WITH ISO(UR)',
                               'closedate':'2014-12-05','module':'DSNIACCH','sev':'2','test':'t'},
                              {'apar':'PI08206','ptf':'UI15913','abstract':'ABEND0C4 RC0038 AT DSNXOCT OFFSET0540 WHEN SELECT AFTER UNION ALL IS IN PARENTHESIS',
                               'closedate':'2014-03-11','module':'DSNXODSO','sev':'3','test':'t'},
                              {'apar':'PI08924','ptf':'UI17374','abstract':'IF FLASHCOPY IC IS MIGRATED TO ML2 - RECOVER TOCOPY FAILS WITH ADR383W.',
                               'closedate':'2014-04-24','module':'DSNUCASA','sev':'3','test':'t'},
                             ];    
        this.missingHIPERsTableData = [{'list':['PI54248', 'UI32815', 'RRSAF DOES NOT SCHEDULE A SERVICE TASK TO CONTINUE PRECESSING OFAN INCOMMIT UR, BUT LET THE UR GET RESOLVES DURING DEFERRED EOT', 
                               '2015-11-11', 'DSN3RRDF', '2']}, 
                              {'list':['PI54248', 'UI32815', 'RRSAF DOES NOT SCHEDULE A SERVICE TASK TO CONTINUE PRECESSING OFAN INCOMMIT UR, BUT LET THE UR GET RESOLVES DURING DEFERRED EOT', 
                               '2015-11-11', 'DSN3RRDF', '2']}
                             ];   

        this.tableColumnsOfPEs = [['PTF ERR','ptfERR'], ['APAR Fix','aparFix'], ['PTF Fix','ptfFix'], ['Abstract Fix','abstractFix'], ['Closedate Fix','closedateFix'], ['MODULE','module'], ['SEV','sev']];
        this.PEs = [{'ptfERR':'UI12104','aparFix':'PI16278','ptfFix':'UI19962', 'abstractFix':'ABEND0C4 RSN00000011 IN DSNIDBGN OFFSET1214 14/04/25 PTF PECHANGE',
                        'closedateFix':'2014-07-24','module':'DSNIDBDF','sev':'2'}, 
                    {'ptfERR':'UI13349','aparFix':'PI11592','ptfFix':'UI18367', 'abstractFix':'ABEND878 RSN10 IN DSN9SCN9 AFTER APPLY OF UK95807 OR UI13349',
                        'closedateFix':'2014-05-27','module':'DSN3RIND','sev':'2'}, 
                    {'ptfERR':'UI13622','aparFix':'PI18100','ptfFix':'UI20415', 'abstractFix':'ABEND04E, RC00D3440D FROM DSNLISDA+D46 FOR REQUESTER THREAD GOING OUTBOUND AFTER TCPIP ERROR 14/08/12 PTF PECHANGE',
                        'closedateFix':'2014-08-11','module':'DSNLCCDR','sev':'2'}, 
                    {'ptfERR':'UI14825','aparFix':'PI73789','ptfFix':'UI46060', 'abstractFix':'DSNT500I DSNB1OPP RESOURCE UNAVAILABLE REASON 00C20200 AFTER EXCHANGE COMMAND ON CLONE TABLE 17/01/30 PTF PECHANGE',
                        'closedateFix':'2017-03-30','module':'DSNGDACL','sev':'2'}, 
                    {'ptfERR':'UI15655','aparFix':'PI16537','ptfFix':'UI18466', 'abstractFix':'ABEND04E DSNB5CMX RC00C200D8 OR DSNB5SCM RC00E50079 14/05/20 PTF PECHANGE',
                        'closedateFix':'2014-05-30','module':'DSNB5SCM','sev':'2'}, 
                    {'ptfERR':'UI15846','aparFix':'PI23112','ptfFix':'UI20986', 'abstractFix':'ABEND0C4 RC4 AT DSNXOOS1 OFFSET5E46 WHEN VIEW AND COUNT(*) IS INVOLVED IN AN UNION DISTRIBUTION 14/08/05 PTF PECHANGE',
                        'closedateFix':'2014-08-30','module':'DSNXOEX1','sev':'2'}, 
                    {'ptfERR':'UI15944','aparFix':'PI26443','ptfFix':'UI24113', 'abstractFix':'SQLCODE0 RETURNED INSTEAD OF SQLCODE100 WITH UPDATE IN UDF AND NULL PREDICATE 14/09/25 PTF PECHANGE',
                        'closedateFix':'2014-12-23','module':'DSNXOMB','sev':'3'}, 
                    {'ptfERR':'UI17239','aparFix':'PI32168','ptfFix':'UI27441', 'abstractFix':'04E-00E2000C DSNLXRSQ.DSNSVSVB+0B06 DUE TO SLOW ACCUMULATION OF STORAGE DURING AN IDAA CONNECTION 15/04/22 PTF PECHANGE',
                        'closedateFix':'2015-05-07','module':'DSNLDICT','sev':'3'}, 
                    {'ptfERR':'UI22640','aparFix':'PI41936','ptfFix':'UI29398', 'abstractFix':'ABEND04E DSNKISPL ERQUAL5003 15/06/19 PTF PECHANGE',
                        'closedateFix':'2015-07-14','module':'DSNIRTSF','sev':'2'}, 
                    {'ptfERR':'UI29032','aparFix':'PI46967','ptfFix':'UI31647', 'abstractFix':'AN INVALID IFCID 401 TRACE RECORD AFTER APPLYING IDAA APAR PI23083 (V10) OR PI30005 (V11) 15/08/21 PTF PECHANGE',
                        'closedateFix':'2015-09-30','module':'DSNLZMON','sev':'2'}, 
                    {'ptfERR':'UI12104','aparFix':'PI16278','ptfFix':'UI19962', 'abstractFix':'ABEND0C4 RSN00000011 IN DSNIDBGN OFFSET1214 14/04/25 PTF PECHANGE xmt',
                        'closedateFix':'2014-07-24','module':'DSNIDBDF','sev':'2'}, 
                    {'ptfERR':'UI13349','aparFix':'PI11592','ptfFix':'UI18367', 'abstractFix':'ABEND878 RSN10 IN DSN9SCN9 AFTER APPLY OF UK95807 OR UI13349',
                        'closedateFix':'2014-05-27','module':'DSN3RIND','sev':'2'}, 
                    {'ptfERR':'UI13622','aparFix':'PI18100','ptfFix':'UI20415', 'abstractFix':'ABEND04E, RC00D3440D FROM DSNLISDA+D46 FOR REQUESTER THREAD GOING OUTBOUND AFTER TCPIP ERROR 14/08/12 PTF PECHANGE',
                        'closedateFix':'2014-08-11','module':'DSNLCCDR','sev':'2'}, 
                    ];     
        
        this.tableColumnsOfInconsistencies = [['MODULE(Inconsistent)','module'], ['PTF(Inconsistent)','ptf-inc'], ['PTF(Expected)','ptf-exp'], ['PTF(Evidence)','ptf-evi'],['Module (Evidence)','module-evi']];
        this.inconsistencies = [{'module':'DSN9SCNA','ptf-inc':'UK98031','ptf-exp':'UI22679', 'ptf-evi':'UI22679','module-evi':'DSNB1AES'}, 
                                {'module':'DSNB1ABP','ptf-inc':'UK95016','ptf-exp':'UI22679', 'ptf-evi':'UI22679','module-evi':'DSNB1AES'},
                                {'module':'DSNB1ABS','ptf-inc':'UK97579','ptf-exp':'UI22679', 'ptf-evi':'UI22679','module-evi':'DSNB1AES'},
                                {'module':'DSNB1BSD','ptf-inc':'UK92659','ptf-exp':'UI22679', 'ptf-evi':'UI22679','module-evi':'DSNB1AES'},
                                {'module':'DSNB1CBP','ptf-inc':'UK95423','ptf-exp':'UI22679', 'ptf-evi':'UI22679','module-evi':'DSNB1AES'},
                                {'module':'DSNB1CHK','ptf-inc':'UK93949','ptf-exp':'UI22679', 'ptf-evi':'UI22679','module-evi':'DSNB1AES'},
                                {'module':'DSNB1CLM','ptf-inc':'UI12051','ptf-exp':'UI22679', 'ptf-evi':'UI22679','module-evi':'DSNB1AES'},
                                {'module':'DSNB1CPP','ptf-inc':'UK96178','ptf-exp':'UI22679', 'ptf-evi':'UI22679','module-evi':'DSNB1AES'},
                                {'module':'DSNB1DBP','ptf-inc':'UI13998','ptf-exp':'UI22679', 'ptf-evi':'UI22679','module-evi':'DSNB1AES'},
                                {'module':'DSNB1GET','ptf-inc':'UK97639','ptf-exp':'UI22679', 'ptf-evi':'UI22679','module-evi':'DSNB1AES'},
                             ]; 
        
        // Andy 2018.7.27 11:35
        this.queryMHsResultByPagination(1, this.pageSize);
        this.queryPEsResultByPagination(1, this.pageSize);
        this.queryINsResultByPagination(1, this.pageSize);
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


