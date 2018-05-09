
export default angular.module('myApp.filters', [])
  .filter('symbolize', ['Config', function (Config) {
    return function (currencyCode) {
      return Config.CurrencyMapping[currencyCode] ? Config.CurrencyMapping[currencyCode] : currencyCode;
    };
  }])

  .filter('imagelink', ['Config', function (Config) {
    return function (imagelink) {
      if (!imagelink) {
        return 'image/default/default_product_image.jpg';
      }
      if (imagelink.startsWith('https://www-969.ibm.com/isc/procurement/gcf/ibm4/opc/workarea/suppliers/')) {
        return imagelink.replace('https://www-969.ibm.com/isc/procurement/gcf/ibm4/opc/workarea/suppliers/', Config.ProductImageServer);//Config.ProductImageServer+'/b/hp/hpp/hp4.jpg';//imagelink;
      }
      if (imagelink.startsWith('LogoImageServer')) {
        return imagelink.replace('LogoImageServer/', './');//return imagelink.replace('LogoImageServer',Config.ProductImageServer);
      }
      if (imagelink.startsWith('https://') || imagelink.startsWith('http://')) {
        return imagelink;
      } else {
        return Config.ImageLinkPrefix + imagelink;
      }
    };
  }])

  .filter('isEmpty', function () {
    var bar;
    return function (obj) {
      for (bar in obj) {
        if (obj.hasOwnProperty(bar)) {
          return false;
        }
      }
      return true;
    };
  })
  .filter('trust', ['$sce', function ($sce) {
    return function (htmlCode) {
      return $sce.trustAsHtml(htmlCode);
    };
  }])
  .filter('prodItemFieldFormat', function () {
    return function (field) {
      if (typeof (field) == 'object') {
        if (field instanceof Array) {
          var strArr = '';
          for (var i = 0; i < field.length; i++) {
            strArr += field[i];
            if (i < field.length - 1) {
              strArr += ',';
            }
          }
          return strArr;
        }

        if (field.hasOwnProperty('currency')) {
          return '$ ' + field.val;
        }

        if (field.hasOwnProperty('unit')) {
          var decimalNum = 2;
          if (field.unit === 'days' || field.unit === 'months' || field.unit === 'years') {
            decimalNum = 0;
          }
          return new Number(field.value).toFixed(decimalNum) + ' ' + field.unit;
        }
      }
      return field;
    };
  })
  .filter('prodItemKeyFormat', function () {
    return function (field) {
      var map = {
        'productCategory': 'product category',
        'priceUSD': 'price USD',
        'supplierPart': 'supplier part',
        'contractId': 'contract id',
        'specialFeatures': 'special features',
        'supplierId': 'supplier id',
        'unitOfMeasure': 'unit of measure',
        'manufacturerPartId': 'manufacturer part id'
      };

      console.log(map[field]);
      if (map[field]) {
        return map[field];
      }
      return field;
    };
  })
  .filter('statusStyle', function () {
    return function (status) {
      switch (status.toLowerCase()) {
        case 'submitted':
          return '#FED500';
        case 'approved':
          return '#FE8500';
        case 'order':
          return '#56ACF2';
        case 'ordering':
          return '#56ACF2';
        case 'completed':
          return '#34BC6E';
        case 'rejected':
          return '#E62325';
        case 'order placed':
          return '#56ACF2';
        default:
          return '#E62325';
      }
    };
  })
  .name;