/**
 * Andy 2018.4.9 15:58
 */

// const localServer = 'http://localhost:3000';
// const testServer = 'http://9.110.87.58:3000';
const prodServer = 'https://zadvisort1.mybluemix.net';
const host = prodServer;

export default {
    httpTimedout: 30000,
    WebServiceMapping: {
        node: {
            login: host + '/api/users/login',
            uploadLocalFile: host + '/api/assets/v1/upload?access_token=xxx&zadmin=123',
            checkMeplByPmr: host + '/api/mepls/v1/checkMeplByPmr?access_token=xxx&zadmin=123',
            getMepls: host + '/api/mepls/v1/getMepls?access_token=xxx&zadmin=123',
            uploadMeplByPmr: host + '/api/mepls/v1/uploadMeplByPmr?access_token=xxx&zadmin=123',
            getUserInfo: host + '/api/accounts/v1/get?access_token=xxx&zadmin=123',
        }
    }
}