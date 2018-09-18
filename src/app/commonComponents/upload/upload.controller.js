
// import url from '../../config/system.js';
// console.log('相对路径配置：'+JSON.stringify(url));

export default class UploadController {
    // common attrs Andy 2018.3.2 17:17
    // static $inject = ['http'];
    constructor($rootScope, $scope, $state, $compile, fileService, userService, authService) {
        [this.$rootScope, this.$scope, this.$state, this.$compile] = [$rootScope, $scope, $state, $compile];
        [this.fileService, this.userService, this.authService, this.name] = [fileService, userService, authService,'UploadController'];
    }

    $onInit() {
        this.isShown = false;

        // listener backdrop and resize event
        this.backdropListener = this.$scope.$on('backdrop:upload', (event, args) => {
            this.isShown = args.isShown;
        });

        this.onCancel = () => {
            this.isShown = !this.isShown;
            this.validationMessage = null;
            this.meplFiles = null;
            this.meplFilesNames = null;
            this.pmrNumber = null;
            this.formData = null;
        }

        this.upload = this.upload;
        // this.doCheck = this.doCheck;
    }

    isUploadLocalFile($event) {
        if (this.pmrNumber) {
            $event.preventDefault();
            return false;
        }
    }

    // Andy 2018.4.4 14:57
    fileToUpload(elemObj) {
        this.meplFiles = elemObj.files;
        this.meplFilesNames = '';
        this.meplFilesArray = [];
        this.formData = new FormData();
        for (const item of this.meplFiles) {
            this.meplFilesNames = this.meplFilesNames.concat(item.name + '、');
            this.meplFilesArray.push(item);
            this.formData.append('file', item);
        }

        this.validate();

        this.$scope.$apply();
    }
    validate() {
        if ((!this.formData || this.meplFiles.length < 1) && !this.pmrNumber) {
            this.validationMessage = '*please select MEPL file or input PMR number!';

        } else if (this.pmrNumber && !this.pmrNumber.match(/^\d{5},\w{3},\d{3}$/g)) {
            this.validationMessage = '*PMR number format is invalid!';

        } else {
            this.validationMessage = '';
        }

        return this.validationMessage;
    }
    upload() {
        if (this.validate()) return;

        this.$rootScope.$broadcast('backdrop:loading', { isShow: true });
        if (this.meplFiles && this.meplFiles.length > 0) {
            this.fileService.uploadMeplByLocalFile(this.formData).then((data) => {
                console.log(data);
                this.onCancel();
                this.$state.go('main.selectFiles', null, {reload: true});

            }).finally(() => {
                this.$rootScope.$broadcast('backdrop:loading', { isShow: false });
            });

        } else if (this.pmrNumber) {
            // First time check  Andy 2018.6.7 14:55
            let userInfo = JSON.parse(localStorage.getItem('user'));
            if (!userInfo || !userInfo.companyEmail || !userInfo.customerId) {
                this.authService.getAuthenticatedUser().then((data) => {
                    if (data.companyEmail && data.customerId) {
                        localStorage.setItem('userInfo', JSON.stringify(data));
                        this.uploadMeplByPmr();

                    } else {
                        let originContent = `<div style="line-height: 46px;">
                                                <input style="width: 100%;border-bottom-color: #A8216E;" type="text" class="input-border" placeholder="Enter customerId" ng-model="$ctrl.customerId" ng-change="$ctrl.test(this)" required id="customerId" >
                                                <input style="width: 100%;border-bottom-color: #A8216E;" type="email" class="input-border" placeholder="Enter companyEmail" ng-model="$ctrl.companyEmail" ng-change="$ctrl.test(this)" required id="companyEmail" >
                                             </div>`;
                        let compiledContent = this.$compile(originContent)(this.$scope);

                        this.$rootScope.$broadcast('DIALOG', {
                            title: 'Only first time to fill in ',
                            content: compiledContent,
                            leftBtnName: 'Cancel',
                            rightBtnName: 'Done',
                            submitAction: () => {
                                if (!document.querySelector('#customerId').checkValidity()) {
                                    return new Promise(function (resolve, reject) {
                                        reject('<span style="line-height: 46px;">*Please fill in customerId!</span>');
                                    });

                                } else if(!document.querySelector('#companyEmail').checkValidity()) {
                                    if(document.querySelector('#companyEmail').validity.typeMismatch) {
                                        return Promise.reject('<span style="line-height: 46px;">*Company email format is invalid!</span>');

                                    } else {
                                        return Promise.reject('<span style="line-height: 46px;">*Please fill in companyEmail!</span>');
                                    }
                                }

                                return this.userService.sendVerifyCode(this.customerId, this.companyEmail).then((data) => {
                                    console.log('#' + data.codes + '#');
                                    let originContent = `<div style="line-height: 46px;height: 100px;">
                                                            <input style="width: 100%;border-bottom-color: #A8216E;" type="text" class="input-border" placeholder="Enter verification Code" ng-model="$ctrl.verificationCode" ng-change="$ctrl.test(this)" id="verificationCode" >
                                                         </div>`;
                                    let compiledContent = this.$compile(originContent)(this.$scope);

                                    this.$rootScope.$broadcast('DIALOG', {
                                        title: 'Verification Code',
                                        content: compiledContent,
                                        leftBtnName: 'Cancel',
                                        rightBtnName: 'Done',
                                        submitAction: () => {
                                            if(!this.verificationCode) return Promise.reject('<span style="position: relative;top: -30px;">*Please fill in verificationCode!</span>');

                                            return this.userService.updateUserInfo(this.customerId, this.companyEmail, this.verificationCode).then((data) => {
                                                this.$rootScope.$broadcast('ALERT', {
                                                    message: 'update user info successfully',
                                                    success: data == 'success'
                                                });

                                                this.$rootScope.$broadcast('backdrop:loading', { isShow: true });
                                                this.uploadMeplByPmr();
                                            })
                                        }
                                    });

                                    return {'success': true, 'isKeepShown': true};
                                })
                            }
                        });

                        this.$rootScope.$broadcast('backdrop:loading', { isShow: false });
                        return;
                    }

                }).catch(() => {
                    this.$rootScope.$broadcast('backdrop:loading', { isShow: false });
                });

            } else {
                this.uploadMeplByPmr();
            }
        }
    }

    uploadMeplByPmr() {
        let userId = this.authService.getCurrentUser().id.toString();

        // uploadMeplByPmr
        this.fileService.checkMeplByPmr(this.pmrNumber).then((data) => {
            if (!data.message.mepl.fileNames || data.message.mepl.fileNames.length == 0) {
                this.validationMessage = '*The files of this PMR do not exist!';
                this.$rootScope.$broadcast('backdrop:loading', { isShow: false });
                return;
            }

            this.fileService.getFileList(userId).then((data) => {
                let hasMeplFile = data.mepls.some((meplFile) => meplFile.PMR.indexOf(this.pmrNumber) != -1);
                if (hasMeplFile) {
                    this.$rootScope.$broadcast('DIALOG', {
                        title: 'The files of this PMR have already uploaded, are you sure to override?',
                        content: '<div style="height: 63px;"></div>',
                        leftBtnName: 'Cancel',
                        rightBtnName: 'Sure',
                        submitAction: () => {
                            return this.fileService.uploadMeplByPmr(userId, this.pmrNumber).then((data) => {
                                console.log(data);
                                this.onCancel();
                                this.$state.go('main.selectFiles', null, {reload: true});
                            })
                        }
                    });

                    this.$rootScope.$broadcast('backdrop:loading', { isShow: false });
                    return;

                } else {
                    this.fileService.uploadMeplByPmr(userId, this.pmrNumber).then((data) => {
                        console.log(data);
                        this.onCancel();
                        this.$state.go('main.selectFiles', null, {reload: true});
                    }).finally(() => {
                        this.$rootScope.$broadcast('backdrop:loading', { isShow: false });
                    });
                }
            }).catch(() => {
                this.$rootScope.$broadcast('backdrop:loading', { isShow: false });
            });

        }).catch(() => {
            this.$rootScope.$broadcast('backdrop:loading', { isShow: false });
        })
    }

    $onDestroy() {
        this.backdropListener();
    }

    // test(obj) {
    //     console.log('email input changed:' + this.companyEmail + '; obj:', obj);
    // }
}

UploadController.$inject = ['$rootScope', '$scope', '$state', '$compile', 'fileService', 'userService', 'authService'];


