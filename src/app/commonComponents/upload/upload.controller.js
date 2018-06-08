
// import url from '../../config/system.js';
// console.log('相对路径配置：'+JSON.stringify(url));

export default class UploadController {
    // common attrs Andy 2018.3.2 17:17
    // static $inject = ['http'];
    constructor($rootScope, $scope, $state, fileService, userService) {
        [this.$rootScope, this.$scope, this.$state, this.fileService, this.userService, this.name] = [$rootScope, $scope, $state, fileService, userService, 'UploadController'];
    }

    $onInit() {
        this.isShown = false;

        // listener backdrop and resize event
        this.backdropListener = this.$scope.$on('backdrop:upload', (event, args) => {
            this.isShown = args.isShown;
        });

        this.onCancel = () => {
            this.isShown = !this.isShown;
            this.meplFiles = null;
            this.meplFilesNames = null;
            this.pmrNumber = null;
            this.validationMessage = null;
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
            this.formData.append('meplFiles', item);
        }

        this.validate();

        this.$scope.$apply();
    }
    validate() {
        if ((!this.formData || this.meplFiles.length < 1) && !this.pmrNumber) {
            this.validationMessage = '*please select MEPL file or input PMR number!';

        } else if (this.pmrNumber && !this.pmrNumber.match(/^\d{5},\d{3},\d{3}$/g)) {
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
            this.fileService.uploadLocalFile(this.formData).then((data) => {
                console.log(data);
                this.onCancel();
                this.$state.go('main.selectFiles');

            }).finally(() => {
                this.$rootScope.$broadcast('backdrop:loading', { isShow: false });
            });

        } else if (this.pmrNumber) {
            // First time check  Andy 2018.6.7 14:55
            let userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (!userInfo || !userInfo.companyEmail || !userInfo.customerId) {
                this.userService.getUserInfo().then((data) => {
                    if (data.companyEmail && data.customerId) {
                        localStorage.setItem('userInfo', JSON.stringify(data));

                    } else {
                        let originContent = '<input style="width: 100%;" type="text" class="input-border" placeholder="Enter email address" ng-model="$ctrl.email" ng-change="$ctrl.test(this)" id="output" >';
                        let compiledContent = this.$compile(originContent)(this.$scope);
    
                        this.$rootScope.$broadcast('DIALOG', {
                            title: 'First time to fill in ',
                            content: compiledContent,
                            leftBtnName: 'Cancel',
                            rightBtnName: 'Done',
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
    
                        return ;
                    }
                })
            }    

            this.fileService.checkMeplByPmr(this.pmrNumber).then((data) => {
                if (!data.message.mepl.fileNames || data.message.mepl.fileNames.length == 0) {
                    this.validationMessage = '*The files of this PMR do not exist!';
                    this.$rootScope.$broadcast('backdrop:loading', { isShow: false });
                    return ;
                }

                this.fileService.getFileList().then((data) => {
                    let hasMeplFile = data.mepls.some((meplFile) => meplFile.FILENAME.indexOf(this.pmrNumber) != -1);
                    if(!hasMeplFile) {
                        this.$rootScope.$broadcast('DIALOG', {
                            title: 'The files of this PMR have already uploaded, are you sure to override?',
                            content: '<div style="height: 63px;"></div>',
                            leftBtnName: 'Cancel',
                            rightBtnName: 'Sure',
                            submitAction: () => {
                                this.$rootScope.$broadcast('backdrop:loading', { isShow: true });
                                return this.fileService.uploadMeplByPmr(this.pmrNumber).then((data) => {
                                    console.log(data);
                                    this.onCancel();
                                    this.$state.go('main.selectFiles');
                                }).finally(() => {
                                    this.$rootScope.$broadcast('backdrop:loading', { isShow: false });
                                });
                            }
                        });
                        
                        this.$rootScope.$broadcast('backdrop:loading', { isShow: false });
                        return ;
    
                    } else {
                        this.$rootScope.$broadcast('backdrop:loading', { isShow: true });
                        this.fileService.uploadMeplByPmr(this.pmrNumber).then((data) => {
                            console.log(data);
                            this.onCancel();
                            this.$state.go('main.selectFiles');
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
    }

    $onDestroy() {
        this.backdropListener();
    }
}

UploadController.$inject = ['$rootScope', '$scope', '$state', 'fileService', 'userService'];


