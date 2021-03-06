myApp.factory('DemoFactory', ['$http', '$location', function($http, $location) {
  console.log("demoFactory is working");


  var getData = function() {
    var promise = $http.get('/fileUpload').then(function (response) {
      return response.data;
    });

    return promise;
  }


  var dobAdults = function(selections) {

    console.log("selections: ", selections);

    var promise = $http.post('/demoquery/dobadults', selections).then(function (response) {
      var dobAdults = response.data;
      console.log("dobAdults: ", dobAdults);
      return dobAdults;
    });
    return promise;
  }

  var dobChildren = function(selections) {

    var promise = $http.post('/demoquery/dobchildren', selections).then(function (response) {
      var dobChildren = response.data;
      console.log("dobChildren: ", dobChildren);
      return dobChildren;
    });
    return promise;
  }

  var totalPeople = function(selections) {

    var promise = $http.post('/demoquery/totalpeople', selections).then(function (response) {
      var totalPeople = response.data;
      console.log("totalPeople: ", totalPeople);
      return totalPeople;
    });
    return promise;
  }

  var totalFamilies = function(selections) {

    var promise = $http.post('/demoquery/totalfamilies', selections).then(function (response) {
      var totalFamilies = response.data;
      console.log("totalFamilies: ", totalFamilies);
      return totalFamilies;
    });
    return promise;
  }

  var allGender = function(selections) {

    var promise = $http.post('/demoquery/allgender', selections).then(function (response) {
      var allGender = response.data;
      console.log("allGender: ", allGender);
      return allGender;
    });
    return promise;
  }

  var raceAdults = function(selections) {

    var promise = $http.post('/demoquery/raceadults', selections).then(function (response) {
      var raceAdults = response.data;
      console.log("raceAdults: ", raceAdults);
      return raceAdults;
    });
    return promise;
  }

  var raceChildren = function(selections) {

    var promise = $http.post('/demoquery/racechildren', selections).then(function (response) {
      var raceChildren = response.data;
      console.log("raceChildren: ", raceChildren);
      return raceChildren;
    });
    return promise;
  }

  var lastResidence = function(selections) {

    var promise = $http.post('/demoquery/lastres', selections).then(function (response) {
      var lastResidence = response.data;
      console.log("lastResidence: ", lastResidence);
      return lastResidence;
    });
    return promise;
  }

  var householdIncome = function(selections) {

    var promise = $http.post('/demoquery/houseincome', selections).then(function (response) {
      var householdIncome = response.data;
      console.log("householdIncome: ", householdIncome);
      return householdIncome;
    });
    return promise;
  }

  var famsExitHousing = function(selections) {

    var promise = $http.post('/demoquery/famsexit', selections).then(function (response) {
      var famsExitHousing = response.data;
      console.log("famsExitHousing: ", famsExitHousing);
      return famsExitHousing;
    });
    return promise;
  }

  var exportData = function() {
    var promise = $http.post('/demoquery/export', selection).then(function(response) {
      var exported = response.data;
        console.log('re', exportData);
      return exportData;
    });
    return promise;
  }

  var totalFamilies = function(selections) {

  var promise = $http.post('/demoquery/totalfamilies', selections).then(function (response) {
    var totalFamilies = response.data;
    console.log("totalFamilies: ", totalFamilies);
    return totalFamilies;
  });
  return promise;
}

  return {  //start of return scope
    retrieveData: function () {
      return getData();
    },
    dobAdults: function (selections) {
      return dobAdults(selections);
    },
    totalPeople: function (selections) {
      return totalPeople(selections);
    },
    totalFamilies: function (selections) {
      return totalFamilies(selections);
    },
    allGender: function (selections) {
      return allGender(selections);
    },
    raceAdults: function (selections) {
      return raceAdults(selections);
    },
    raceChildren: function (selections) {
      return raceChildren(selections);
    },
    lastResidence: function (selections) {
      return lastResidence(selections);
    },
    householdIncome: function (selections) {
      return householdIncome(selections);
    },
    famsExitHousing: function (selections) {
      return famsExitHousing(selections);
    },
    dobChildren: function (selections) {
      return dobChildren(selections);
    },
    exportdemo: function (selections) {
      return exportData(selections);
    },
    totalFamilies: function (selections) {
      return totalFamilies(selections);
    }

  };  //end of return scope

}]);
