/**
 * Andy 2018.4.9 15:58
 */

const host = 'http://localhost:3000'

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