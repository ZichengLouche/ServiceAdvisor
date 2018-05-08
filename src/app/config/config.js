/**
 * Andy 2018.4.9 15:58
 */

const localServer = 'http://localhost:3000';
const testServer = 'http://9.110.87.58:3000';
const host = testServer;

export default {
    httpTimedout: 30000,
    WebServiceMapping: {
        node: {
            login: host + 'users/login',
            upload: host + '/api/assets/v1/upload?access_token=xxx&zadmin=123',
            fileList: host + '/api/assets/v1/list?access_token=xxx&zadmin=123',
        }
    }
}