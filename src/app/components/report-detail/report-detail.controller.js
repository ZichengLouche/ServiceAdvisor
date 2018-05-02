export default class ReportDetailController {
	// common attrs Andy 2018.4.23 17:53
    // static $inject = ['http'];
    constructor($rootScope, $state) {
        [this.$rootScope, this.menu, this.name] = [$rootScope, $state.current.menu, 'home'];
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
}

ReportDetailController.$inject = ['$rootScope', '$state'];


