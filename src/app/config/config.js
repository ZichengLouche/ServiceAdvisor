/**
 * Andy 2018.4.9 15:58
 */

// const localServer = 'http://localhost:3000';
// const testServer = 'http://9.110.87.58:3000';
const prodServer = 'https://zadvisort.mybluemix.net';
const host = prodServer;

export default {
    httpTimedout: 30000,
    WebServiceMapping: {
        node: {
            postLogin: host + '/api/users/login',
            ssoLogin: host + '/api/accounts/v1/login',
            getAuthenticatedUser: host + '/api/accounts/v1/get',

            uploadMeplByLocalFile: host + '/api/mepls/v1/upload/file',
            checkMeplByPmr: host + '/api/mepls/v1/checkMeplByPmr',
            uploadMeplByPmr: host + '/api/mepls/v1/uploadMeplByPmrSync',
            getMepls: host + '/api/mepls/v1/getMepls',
            removeMepl: host + '/api/mepls/removeMepl',
            updateMeplComment: host + '/api/mepls/v1/updateComment',
            
            sendVerifyCode: host + '/api/Emails/v1/send_verify_code',
            updateUserInfo: host + '/api/accounts/v1/update',

            generateReport: host + '/api/Missinghipers/v2/resultV2',
            getReportList: host + '/api/Missinghipers/getReportList',
            getReport: host + '/api/Missinghipers/getReport',
            removeReport: host + '/api/Missinghipers/removeReport',
            sendReport: host + '/api/sendingreport/v2/SendingReport',

            getAparByAparId: host + '/api/apars/v1/me',
            getAparByPtfId: host + '/api/apars/v2/aparByPtfId',
        }
    }
}