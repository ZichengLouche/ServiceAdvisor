export default class BackdropController {
  // common attrs Andy 2018.3.2 17:17
  // static $inject = ['http'];
  constructor($scope, $window) {
      [this.$scope, this.$window] = [$scope, $window];
  }

  $onInit() {
      this.isShowDrop = false;

      // listener backdrop and resize event
      this.backdropLoadingListener = this.$scope.$on('backdrop:loading', function (event, args) {
        this.isShowDrop = args.isShow;
        this.setSize(args.element);
      }.bind(this));

      this.backdropResizeListener = this.$scope.$on('RESIZE', function () {
        this.setSize();
      });

  }

  // Andy 2018.4.10 9:47
  setSize(ele) {
    if (!this.isShowDrop)
      return;

    var element = angular.element(document.querySelector(ele));
    var left = element.prop('offsetLeft') || 0;
    var top = element.prop('offsetTop') || 80;
    var right = this.$window.innerWidth;
    var bottom = this.$window.innerHeight;

    // set size
    this.backdropStyle = {};
    this.backdropStyle.left = left + 'px';
    this.backdropStyle.top = top + 'px';
    this.backdropStyle.width = (right) + 'px';
    this.backdropStyle.height = (bottom) + 'px';
  }

  $onChanges(changes) {
      console.log(changes);
      console.log(this.name);
  }

  $doCheck(changes) {
      console.log(changes);
      console.log(this.name);
  }

  $onDestroy() {
      this.backdropLoadingListener();
      this.backdropResizeListener();
  }
}

BackdropController.$inject = ['$scope', '$window'];