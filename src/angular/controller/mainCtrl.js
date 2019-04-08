commonApp
.constant('baseUrl', 'http://localhost:5600/products/')
// .constant('baseUrl', 'http://132.232.184.238:5600/products/')
.controller("mainCtrl", function($rootScope, $scope, $http, $location, $timeout, $resource, baseUrl) {

	var editAccountsDialog = angular.element('#editAccounts');
	$scope.currentProduct = null;
	$scope.productResource = $resource(baseUrl + ":id", {id: "@id"});
	$scope.currentMonth = moment().startOf('month').valueOf();
	$scope.currentDay = moment().date();

	$scope._init = function () {
		// var now = moment();
		// var arr = [];
		// for (var i=0; i<12; i++) {
  //           var month = moment({year: moment().year(), month: i, day: 1});
  //           arr[i] = month;
  //       };
  		var arr = ['4月', '5月']
        $scope.months = angular.copy(arr);
	};
	$scope._init();

	$scope.listProducts = function () {
		$scope.products = $scope.productResource.query();	

		$timeout(function(){
			$scope.$apply(function(){
				if($scope.products && $scope.products.length > 0){
					var totals = [],janS = 0,febS = 0,marS = 0,aprS = 0,mayS = 0,junS = 0,julS = 0,augS = 0,septS = 0,octS = 0,novS = 0, decS=0;
					angular.forEach($scope.products, function(data) {
						var jan = data.jan ? eval(data.jan) : 0,
							feb = data.feb ? eval(data.feb) : 0,
							mar = data.mar ? eval(data.mar) : 0,
							apr = data.apr ? eval(data.apr) : 0,
							may = data.may ? eval(data.may) : 0,
							jun = data.jun ? eval(data.jun) : 0,
							jul = data.jul ? eval(data.jul) : 0,
							aug = data.aug ? eval(data.aug) : 0,
							sept = data.sept ? eval(data.sept) : 0,
							oct = data.oct ? eval(data.oct) : 0,
							nov = data.nov ? eval(data.nov) : 0,
							dec = data.dec ? eval(data.dec) : 0;
						janS += jan;
						febS += feb;
						marS += mar;
						aprS += apr;
						mayS += may;
						junS += jun;
						julS += jul;
						augS += aug;
						septS += sept;
						octS += oct;
						novS += nov;
						decS += dec;
					});
					// totals.push(janS,febS,marS,aprS,mayS,junS,julS,augS,septS,octS,novS,decS);
					totals.push(aprS,mayS);
					$scope.totals = angular.copy(totals);
				}
			})
		},200);
	};

	$scope.deleteProduct = function (product) {
		var result = confirm('是否删除！');  
	    if(result){  
	    	product.$delete().then(function() {
				$scope.products.splice($scope.products.indexOf(product), 1);
				alert('删除成功！'); 
			}); 
	    }
	};

	$scope.createProduct = function (product) {
		new $scope.productResource(product).$save().then(function(newProduct){
			$scope.products.push(product);
		});
	};

	$scope.updateProduct = function (product) {
		product.$save();
	};

	$scope.editOrCreateProduct = function (product) {
		$scope.currentProduct = product ? product : {};
		editAccountsDialog.modal('show');
	};

	$scope.saveEdit = function(product) {
		editAccountsDialog.modal('hide');
		if(angular.isDefined(product.id)) {
			$scope.updateProduct(product);
		} else {
			$scope.createProduct(product);
		}
	};

	$scope.cancleEdit = function () {
		if($scope.currentProduct && $scope.currentProduct.$get) {
			$scope.currentProduct.$get();
		}
		$scope.currentProduct = {};
	};

	$scope.listProducts();
	
});