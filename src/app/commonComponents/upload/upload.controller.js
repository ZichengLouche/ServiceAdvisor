
// import url from '../../config/system.js';
// console.log('相对路径配置：'+JSON.stringify(url));

export default class UploadController {
    // common attrs Andy 2018.3.2 17:17
    // static $inject = ['http'];
    constructor($rootScope, $scope, $state, fileService) {
        [this.$rootScope, this.$scope, this.$state, this.fileService, this.name] = [$rootScope, $scope, $state, fileService, 'UploadController'];
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
        if(this.pmrNumber) {
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
        if(!this.formData || this.meplFiles.length < 1 && !this.pmrNumber) {
            this.validationMessage = '*please select MEPL file or input PMR number!';

        } else if(this.pmrNumber && !this.pmrNumber.match(/^\d{5},\d{3},\d{3}$/g)) {
            this.validationMessage = '*PMR number is invalid!';

        } else {
            this.validationMessage = '';
        }

        return this.validationMessage;
    }
    upload() {
        if(this.validate()) return ;

        this.$rootScope.$broadcast('backdrop:loading', { isShow: true });
        this.fileService.upload(this.formData).then((data) => {
            console.log(data);
            this.onCancel();
            this.$state.go('main.selectFiles');

        }).finally(() => {
            this.$rootScope.$broadcast('backdrop:loading', { isShow: false });
        });
    }

    $onDestroy() {
        this.backdropListener();
    }
}

UploadController.$inject = ['$rootScope', '$scope', '$state', 'fileService'];


