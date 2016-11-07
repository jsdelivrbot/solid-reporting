myApp.controller("OutcomesController", ["$scope",'$http', '$location', 'DataFactory', '$mdSidenav', 'OutcomeFactory', 'DemoFactory', function ($scope, $http, $location, DataFactory, $mdSidenav, OutcomeFactory, DemoFactory) {
    console.log("hello from OutcomesController");

    $scope.outcomeFactory = OutcomeFactory;
    $scope.demoFactory = DemoFactory;
    $scope.dataFactory = DataFactory;
    $scope.dataFactory.currentSess();
    $scope.userName = $scope.dataFactory.varUsername();

    $scope.toggleSide = function() {
        $mdSidenav('left').toggle();
    };

    var programs = [];

    //----- Programs & Outcomes Checkboxes --------------
    // $scope.programs = ['EMP I', 'EMP II', 'Home Again', 'HomeSafe', 'HomeFront'];

    $scope.outcomes = ['Housing Stability', 'Educational Advancement', 'Economic Stability', 'Strengthened Families', 'Improved Health', 'Community Connections'];

    showData();
    function showData() {

        $scope.demoFactory.retrieveData().then(function(response) {
            $scope.data = response;
            // console.log('type of number?', typeof parseInt());
            $scope.data.forEach(function (item) {
                // indexOf checks from index 0 to end of index every loop

                //  console.log('sg data -----', $scope.data);

                if (programs.indexOf(item['Program']) === -1 &&
                    item['Program'] !== null &&
                    item['Program'] !== 2 &&
                    item['Program'] !== 9 &&
                    item['Program'] !== 51 &&
                    item['Program'] !== 114 &&
                    item['Program'] !== 73 &&
                    item['Program'] !== 15 &&
                    item['Program'] !== 17 &&
                    item['Program'] !== 16 &&
                    item['Program'] !== 77 &&
                    item['Program'] !== 78 &&
                    item['Program'] !== 58 &&
                    item['Program'] !== 52 &&
                    item['Program'] !== 10 &&
                    item['Program'] !== 142 &&
                    item['Program'] !== 59 &&
                    item['Program'] !== 53 &&
                    item['Program'] !== 141
                ) {
                    programs.push(item['Program']);
                }
            });
            $scope.items = angular.copy(programs);
        });
    }


//----- Programs ----------------------------

    $scope.selectedprogram = programs;

  $scope.toggle = function (item, list) {
      var idx = list.indexOf(item);
      if (idx > -1) {
          console.log('array ----', $scope.items);
          list.splice(idx, 1);
      }
      else {
          list.push(item);
          console.log('array ----', $scope.items);
      }
      console.log("selected programs: ", $scope.selectedprogram);
  };


//------ Outcomes Checkboxes -------------------------------------------------------


  $scope.outcomes = ['Housing Stability', 'Educational Advancement', 'Economic Stability', 'Strengthened Families', 'Improved Health', 'Community Connections'];


  //------ Calendar -------------------------------------------------------

      // $scope.startdate = new Date();
      // $scope.enddate = new Date();

      $scope.enddate = new Date();
      console.log("$scope.enddate: ", $scope.enddate);
      $scope.startdate = new Date();
      $scope.startdate = $scope.startdate.setFullYear($scope.startdate.getFullYear() - 1);
      $scope.startdate = new Date($scope.startdate);
      console.log("$scope.startdate: ", $scope.startdate);

      $scope.maxDate = new Date(
          $scope.enddate.getFullYear(),
          $scope.enddate.getMonth(),
          $scope.enddate.getDate());

      $scope.startDate = function(date) {
          var startDate = date;
          console.log('startDate: ', startDate);
      };
      $scope.endDate = function(date) {
          var endDate = date;
          console.log('endDate: ', endDate);
      };
  //--------------------------------------------

    $scope.firstOfTheYear = '';

    $scope.genders = ['Female', 'Male'];

    $scope.adultRaces = [];
    $scope.childRaces = [];

    $scope.childAges = ['0-1 yr', '2-3 yrs)', '4-5 yrs)', '6-9 yrs', '10-14 yrs', '15-17 yrs', '18+ child in home'];

    $scope.adultAges = ['18-22', '23-30', '31-40', '41-54', '55-64', '65+'];

    $scope.residences = ['Ramsey', 'Suburban Ramsey', 'Washington', 'Hennepin', 'Suburban Hennepin', 'Other Metro County', 'OutsideTwin Cities Metro', 'Outside of state', 'Other Twin Cities Metro'];

    $scope.hhIncomes = ['At or below 100% Poverty', '101%-200% Poverty', 'At or above 200% Poverty'];

    $scope.exitReasons = ['Graduated', 'Left voluntarily (not grad)', 'Terminated/Mutual termination', 'Other (i.e. death)'];


    $scope.newQuery = function () {

        var justStartYear = $scope.startdate.getFullYear();

        $scope.firstOfTheYear = justStartYear + '-1-1';

        console.log("This is the data at the first of the year", $scope.firstOfTheYear);

        console.log("Program: " + $scope.selectedprogram + "\n"
            + "Gender: " + $scope.genders + "\n"
            + "Adult Race: " + $scope.adultRaces + "\n"
            + "Adult Age: " + $scope.adultAges + "\n"
            + "Children Race: " + $scope.childRaces + "\n"
            + "Children Age: " + $scope.childAges + "\n"

            + "Last Residence: " + $scope.lastResidenceSelection + "\n");

        console.log("$scope.startdate newQuery: ", $scope.startdate);
        console.log("$scope.enddate newQuery: ", $scope.enddate);

        selections = {
            programSelected: $scope.selectedprogram,
            raceAdultSelection: $scope.adultRaces,
            raceChildrenSelection: $scope.childRaces,
            genderSelection: $scope.genders,
            ageAdultSelection: $scope.adultAges,
            ageChildrenSelection: $scope.childAges,
            lastResidenceSelection: $scope.residences,
            startdate: $scope.startdate,
            enddate: $scope.enddate,
            firstDayOfTheYear: $scope.firstOfTheYear
        };
        console.log("these are the selections", selections);

        console.log("Program: " + $scope.selectedprogram + "\n"
            + "Outcome: " + $scope.selectedoutcome);


        $scope.outcomeFactory.houseStabil(selections).then(function(response) {
            console.log("response houseStabil: ", response);
            $scope.houseEMP={
                reside6:0,
                reside1year: 0,
                achieveStability:0,
                exited:0,
                entered:0,
                securePermanent:0,
                other:0,
                total:0
            };

            $scope.houseEMPII={
                reside6:0,
                reside1year: 0,
                achieveStability:0,
                exited:0,
                entered:0,
                securePermanent:0,
                other:0,
                total:0
            };

            $scope.houseHomeSafe={
                reside6:0,
                reside1year: 0,
                achieveStability:0,
                exited:0,
                entered:0,
                securePermanent:0,
                other:0,
                total:0
            };

            $scope.houseHomeAgain={
                reside6:0,
                reside1year: 0,
                achieveStability:0,
                exited:0,
                entered:0,
                securePermanent:0,
                other:0,
                total:0
            };

            $scope.houseHomeFront={
                reside6:0,
                reside1year: 0,
                achieveStability:0,
                exited:0,
                entered:0,
                securePermanent:0,
                other:0,
                total:0
            };

            var responseArray = response

            for (var i = 0; i < responseArray.length; i++) {
                // console.log(responseArray[i]["Achieve Housing Stability"])
                if(responseArray[i].Program == "EMP"){
                    if(responseArray[i]["Achieve Housing Stability"]=="Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"){
                        $scope.houseEMP.reside6 += parseInt(responseArray[i].count);
                        $scope.houseEMP.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Remain in Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Remain in EMWC Housing for at least 1 year"){
                        $scope.houseEMP.reside1year += parseInt(responseArray[i].count);
                        $scope.houseEMP.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Secured Permanent Housing upon exit"){
                        $scope.houseEMP.achieveStability += parseInt(responseArray[i].count);
                        $scope.houseEMP.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other"){
                        $scope.houseEMP.exited += parseInt(responseArray[i].count);
                        $scope.houseEMP.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]== "Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"){
                        $scope.houseEMP.exited += parseInt(responseArray[i].count);
                        $scope.houseEMP.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing for at least 1 year;Secured Permanent Housing upon exit"){
                        $scope.houseEMP.securePermanent += parseInt(responseArray[i].count);
                        $scope.houseEMP.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other;Remain in Housing < 1 year (ex: 7 months)Enter EMWC Housing during current year"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year;Remain in EMWC Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report"){
                        $scope.houseEMP.entered += parseInt(responseArray[i].count);
                        $scope.houseEMP.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other;Remain in Housing < 1 year (ex: 7 months)"){
                        $scope.houseEMP.entered += parseInt(responseArray[i].count);
                        $scope.houseEMP.total += parseInt(responseArray[i].count);
                    }
                    else {
                        $scope.houseEMP.other += parseInt(responseArray[i].count);
                        $scope.houseEMP.total += parseInt(responseArray[i].count);
                    }
                }

                if(responseArray[i].Program == "EMPII"){
                    if(responseArray[i]["Achieve Housing Stability"]=="Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"){
                        $scope.houseEMPII.reside6 += parseInt(responseArray[i].count);
                        $scope.houseEMPII.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Remain in Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Remain in EMWC Housing for at least 1 year"){
                        $scope.houseEMPII.reside1year += parseInt(responseArray[i].count);
                        $scope.houseEMPII.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Secured Permanent Housing upon exit"){
                        $scope.houseEMPII.achieveStability += parseInt(responseArray[i].count);
                        $scope.houseEMPII.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other"){
                        $scope.houseEMPII.exited += parseInt(responseArray[i].count);
                        $scope.houseEMPII.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]== "Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year"){
                        $scope.houseEMPII.exited += parseInt(responseArray[i].count);
                        $scope.houseEMPII.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing for at least 1 year;Secured Permanent Housing upon exit"){
                        $scope.houseEMPII.securePermanent += parseInt(responseArray[i].count);
                        $scope.houseEMPII.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other;Remain in Housing < 1 year (ex: 7 months)Enter EMWC Housing during current year"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year;Remain in EMWC Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report"){
                        $scope.houseEMPII.entered += parseInt(responseArray[i].count);
                        $scope.houseEMPII.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other;Remain in Housing < 1 year (ex: 7 months)"){
                        $scope.houseEMPII.entered += parseInt(responseArray[i].count);
                        $scope.houseEMPII.total += parseInt(responseArray[i].count);
                    }
                    else {
                        // console.log(responseArray[i]["Achieve Housing Stability"]);
                        $scope.houseEMPII.other += parseInt(responseArray[i].count);
                        $scope.houseEMPII.total += parseInt(responseArray[i].count);
                    }
                }

                if(responseArray[i].Program == "HomeSafe"||responseArray[i].Program == "Home Safe" ){
                    if(responseArray[i]["Achieve Housing Stability"]=="Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"){
                        $scope.houseHomeSafe.reside6 += parseInt(responseArray[i].count);
                        $scope.houseHomeSafe.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Remain in Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Remain in EMWC Housing for at least 1 year"){
                        $scope.houseHomeSafe.reside1year += parseInt(responseArray[i].count);
                        $scope.houseHomeSafe.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Secured Permanent Housing upon exit"){
                        $scope.houseHomeSafe.achieveStability += parseInt(responseArray[i].count);
                        $scope.houseHomeSafe.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other"){
                        $scope.houseHomeSafe.exited += parseInt(responseArray[i].count);
                        $scope.houseHomeSafe.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]== "Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year"){
                        $scope.houseHomeSafe.exited += parseInt(responseArray[i].count);
                        $scope.houseHomeSafe.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]==" Enter Housing during reporting report;Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]==" Enter Housing during reporting report;Exited Housing during reporting period;Other"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Other;Remain in Housing < 1 year (ex: 7 months)"){
                        $scope.houseHomeSafe.exited += parseInt(responseArray[i].count);
                        $scope.houseHomeSafe.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Other"){
                        $scope.houseHomeSafe.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing for at least 1 year;Secured Permanent Housing upon exit"){
                        $scope.houseHomeSafe.securePermanent += parseInt(responseArray[i].count);
                        $scope.houseHomeSafe.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other;Remain in Housing < 1 year (ex: 7 months)Enter EMWC Housing during current year"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year;Remain in EMWC Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report"){
                        $scope.houseHomeSafe.entered += parseInt(responseArray[i].count);
                        $scope.houseHomeSafe.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other;Remain in Housing < 1 year (ex: 7 months)"){
                        $scope.houseHomeSafe.entered += parseInt(responseArray[i].count);
                        $scope.houseHomeSafe.total += parseInt(responseArray[i].count);
                    }
                    else {
                        console.log(responseArray[i]["Achieve Housing Stability"]);
                        $scope.houseHomeSafe.other += parseInt(responseArray[i].count);
                        $scope.houseHomeSafe.total += parseInt(responseArray[i].count);
                    }
                }

                else if(responseArray[i].Program == "HomeAgain"||responseArray[i].Program == "Home Again" ){
                    if(responseArray[i]["Achieve Housing Stability"]=="Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"){
                        $scope.houseHomeAgain.reside6 += parseInt(responseArray[i].count);
                        $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Remain in Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Remain in EMWC Housing for at least 1 year"){
                        $scope.houseHomeAgain.reside1year += parseInt(responseArray[i].count);
                        $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Secured Permanent Housing upon exit"){
                        $scope.houseHomeAgain.achieveStability += parseInt(responseArray[i].count);
                        $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other"){
                        $scope.houseHomeAgain.exited += parseInt(responseArray[i].count);
                        $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]== "Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year"){
                        $scope.houseHomeAgain.exited += parseInt(responseArray[i].count);
                        $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]==" Enter Housing during reporting report;Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]==" Enter Housing during reporting report;Exited Housing during reporting period;Other"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Other;Remain in Housing < 1 year (ex: 7 months)"){
                        $scope.houseHomeAgain.exited += parseInt(responseArray[i].count);
                        $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Other"){
                        $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing for at least 1 year;Secured Permanent Housing upon exit"){
                        $scope.houseHomeAgain.securePermanent += parseInt(responseArray[i].count);
                        $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other;Remain in Housing < 1 year (ex: 7 months)Enter EMWC Housing during current year"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year;Remain in EMWC Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report"){
                        $scope.houseHomeAgain.entered += parseInt(responseArray[i].count);
                        $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Remain in Housing at least 6 months;Secured Permanent Housing upon exit"){
                        $scope.houseHomeAgain.entered += parseInt(responseArray[i].count);
                        $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year;Remain in EMWC Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"){
                        $scope.houseHomeAgain.entered += parseInt(responseArray[i].count);
                        $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
                    }
                    else {
                        $scope.houseHomeAgain.other += parseInt(responseArray[i].count);
                        $scope.houseHomeAgain.total += parseInt(responseArray[i].count);
                    }
                }

                else if(responseArray[i].Program == "HomeFront"||responseArray[i].Program == "Home Front" ){
                    if(responseArray[i]["Achieve Housing Stability"]=="Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"){
                        $scope.houseHomeFront.reside6 += parseInt(responseArray[i].count);
                        $scope.houseHomeFront.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Remain in Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Remain in EMWC Housing for at least 1 year"){
                        $scope.houseHomeFront.reside1year += parseInt(responseArray[i].count);
                        $scope.houseHomeFront.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Secured Permanent Housing upon exit"){
                        $scope.houseHomeFront.achieveStability += parseInt(responseArray[i].count);
                        $scope.houseHomeFront.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Other"){
                        $scope.houseHomeFront.exited += parseInt(responseArray[i].count);
                        $scope.houseHomeFront.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]== "Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Remain in Housing for at least 1 year"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year"){
                        $scope.houseHomeFront.exited += parseInt(responseArray[i].count);
                        $scope.houseHomeFront.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing at least 6 months"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]==" Enter Housing during reporting report;Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]==" Enter Housing during reporting report;Exited Housing during reporting period;Other"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Other;Remain in Housing < 1 year (ex: 7 months)"){
                        $scope.houseHomeFront.exited += parseInt(responseArray[i].count);
                        $scope.houseHomeFront.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Other"){
                        $scope.houseHomeFront.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in EMWC Housing for at least 1 year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Exited Housing during reporting period;Remain in Housing for at least 1 year;Secured Permanent Housing upon exit"){
                        $scope.houseHomeFront.securePermanent += parseInt(responseArray[i].count);
                        $scope.houseHomeFront.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other;Remain in Housing < 1 year (ex: 7 months)Enter EMWC Housing during current year"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year;Remain in EMWC Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report"){
                        $scope.houseHomeFront.entered += parseInt(responseArray[i].count);
                        $scope.houseHomeFront.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Other;Remain in Housing < 1 year (ex: 7 months)"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Remain in Housing at least 6 months;Secured Permanent Housing upon exit"||responseArray[i]["Achieve Housing Stability"]=="Enter Housing during reporting report;Exited Housing during reporting period;Remain in Housing < 1 year (ex: 7 months);Remain in Housing at least 6 months;Secured Permanent Housing upon exit"){
                        $scope.houseHomeFront.entered += parseInt(responseArray[i].count);
                        $scope.houseHomeFront.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Achieve Housing Stability"]=="Enter EMWC Housing during current year;Remain in EMWC Housing < 1 year (ex: 7 months);Secured Permanent Housing upon exit"){
                        $scope.houseHomeFront.entered += parseInt(responseArray[i].count);
                        $scope.houseHomeFront.total += parseInt(responseArray[i].count);
                    }
                    else {
                        console.log('fuck',responseArray[i]["Achieve Housing Stability"]);
                        $scope.houseHomeFront.other += parseInt(responseArray[i].count);
                        $scope.houseHomeFront.total += parseInt(responseArray[i].count);
                    }
                }

            }//end of for statement
            console.log('this is the TESTEMP',$scope.houseEMP);
            console.log('this is the TESTEMPII',$scope.houseEMPII);
            console.log('this is the HomeSafe',$scope.houseHomeSafe);
            console.log('this is the HomeAGain',$scope.houseHomeAgain);
            console.log('this is the HomeFront',$scope.houseHomeFront);
        });  // end of houseStabil


        $scope.outcomeFactory.adultEduAdv(selections).then(function(response) {
            // console.log("response adultEduAdv: ", response);
            var data = response;
            console.log('data response adultEdu', data);
            for (var i = 0; i < data.length; i++) {

                // EMP PROGRAM Education
                $scope.empAdult = {
                    complete: 0,
                    continue: 0,
                    enrolled: 0,
                    dropout: 0,
                    total: 0
                };

                if(data[i].Program === 'EMP') {
                    // Adult Completed Education
                    if(data[i]['Adult Edu Adv'] === "Completed Education/Training") {
                        $scope.empAdult.complete += parseInt(data[i].count);
                    }
                    if ($scope.empAdult.complete === undefined ) {
                        $scope.empAdult.complete = 0;
                    }
                    console.log('emp adult complete', $scope.empAdult.complete);

                    // Adult Continue Education
                    if(data[i]['Adult Edu Adv'] === "Continue Education or Training") {
                        $scope.empAdult.continue += parseInt(data[i].count);
                    }
                    if ($scope.empAdult.continue === undefined ) {
                        $scope.empAdult.continue = 0;
                    }
                    console.log('emp adult continue', $scope.empAdult.continue);

                    // Adult Dropout
                    if(data[i]['Adult Edu Adv'] === "Dropped out and did not return") {
                        $scope.empAdult.dropout += parseInt(data[i].count);
                    }
                    if ($scope.empAdult.dropout === undefined ) {
                        $scope.empAdult.dropout = 0;
                    }
                    console.log('emp adult Dropped', $scope.empAdult.dropout);

                    // Adult Enrolled
                    if(data[i]['Adult Edu Adv'] === "Enrolled in education") {
                        $scope.empAdult.enrolled += parseInt(data[i].count);
                    }
                    if ($scope.empAdult.enrolled  === undefined ) {
                        $scope.empAdult.enrolled = 0;
                    }
                    console.log('emp adult enrolled', $scope.empAdult.enrolled);

                    // EMP TOTAL
                    $scope.empAdult.total = $scope.empAdult.complete + $scope.empAdult.continue + $scope.empAdult.dropout + $scope.empAdult.enrolled;
                    console.log('emp total', $scope.empAdult.total);
                } // END OF EMP

                // EMPII PROGRAM Education
                $scope.emp2Adult = {
                    complete: 0,
                    continue: 0,
                    enrolled: 0,
                    dropout: 0,
                    total: 0
                };

                if(data[i].Program === 'EMPII') {
                    console.log(' emp2 program',data[i]['Adult Edu Adv'] );
                    // Adult Completed Education
                    if(data[i]['Adult Edu Adv'] === "Completed Education/Training") {
                        var emp2Adcom = parseInt(data[i].count);
                        $scope.emp2Adult.complete += emp2Adcom;
                    }
                    if (emp2Adcom === undefined ) {
                        emp2Adcom = 0;
                    }
                    console.log('emp2 adult complete', $scope.emp2Adult.complete);

                    // Adult Continue Education
                    if(data[i]['Adult Edu Adv'] === "Continue Education or Training") {
                        var emp2Adcon = parseInt(data[i].count);
                        $scope.emp2Adult.continue = emp2Adcon;
                    }
                    if (emp2Adcon === undefined ) {
                        emp2Adcon = 0;
                    }
                    console.log('emp2 adult continue', $scope.emp2Adult.continue);

                    // Adult Dropout
                    if(data[i]['Adult Edu Adv'] === "Dropped out and did not return") {
                        var emp2Addrop = parseInt(data[i].count);
                        $scope.emp2Adult.dropout += emp2Addrop;
                    }
                    if (emp2Addrop === undefined ) {
                        emp2Addrop = 0;
                    }
                    console.log('emp2 adult Dropped', $scope.emp2Adult.dropout);

                    // Adult Enrolled
                    if(data[i]['Adult Edu Adv'] === "Enrolled in education") {
                        var emp2Adenroll = parseInt(data[i].count);
                        $scope.emp2Adult.enrolled += emp2Adenroll;
                    }
                    if (emp2Adenroll  === undefined ) {
                        emp2Adenroll = 0;
                    }
                    console.log('emp2 adult enrolled', $scope.emp2Adult.enrolled);
                    $scope.emp2Adult.total = emp2Adenroll + emp2Addrop + emp2Adcom + emp2Adcon;
                    console.log('emp2 total', $scope.emp2Adult.total);


                } // End of EMPII


                // HOMESAFE PROGRAM Education
                $scope.homeSafeAdult = {
                    complete: 0,
                    continue: 0,
                    enrolled: 0,
                    dropout: 0,
                    total: 0
                };

                if(data[i].Program == "HomeSafe" || data[i].Program == "Home Safe") {
                    // Adult Completed Education
                    if (data[i]['Adult Edu Adv'] === "Completed Education/Training") {
                        $scope.homeSafeAdult.complete += parseInt(data[i].count);
                        $scope.homeSafeAdult.total += parseInt(data[i].count);
                    }
                    if ($scope.homeSafeAdult.complete === undefined) {
                        $scope.homeSafeAdult.complete = 0;
                    }

                    // Adult Continue Education
                    if (data[i]['Adult Edu Adv'] === "Continue Education or Training") {
                        $scope.homeSafeAdult.continue += parseInt(data[i].count);
                        $scope.homeSafeAdult.total += parseInt(data[i].count);
                    }
                    if ($scope.homeSafeAdult.continue === undefined) {
                        $scope.homeSafeAdult.continue = 0;
                    }

                    // Adult Dropout Education
                    if (data[i]['Adult Edu Adv'] === "Dropped out and did not return") {
                        $scope.homeSafeAdult.dropout += parseInt(data[i].count);
                        $scope.homeSafeAdult.total += parseInt(data[i].count);
                    }
                    if ($scope.homeSafeAdult.dropout === undefined) {
                        $scope.homeSafeAdult.dropout = 0;
                    }

                    // Adult Enrolled Education
                    if (data[i]['Adult Edu Adv'] === "Enrolled in education") {
                        $scope.homeSafeAdult.enrolled += parseInt(data[i].count);
                        $scope.homeSafeAdult.total += parseInt(data[i].count);
                    }
                    if ($scope.homeSafeAdult.enrolled === undefined) {
                        $scope.homeSafeAdult.enrolled = 0;
                    }
                    console.log('HOMESAFE total', $scope.homeSafeAdult.total);
                } // End of HOMESAFE

                // HOMEFRONT PROGRAM Education
                $scope.homeFrontAdult = {
                    complete: 0,
                    continue: 0,
                    enrolled: 0,
                    dropout: 0,
                    total: 0
                };

                if(data[i].Program == "HomeFront" || data[i].Program == "Home Front" ) {
                    // Adult Completed Education
                    if (data[i]['Adult Edu Adv'] === "Completed Education/Training") {
                        $scope.homeFrontAdult.complete += parseInt(data[i].count);
                        $scope.homeFrontAdult.total += parseInt(data[i].count);
                    }
                    if ($scope.homeFrontAdult.complete === undefined) {
                        $scope.homeFrontAdult.complete = 0;
                    }

                    // Adult Continue Education
                    if (data[i]['Adult Edu Adv'] === "Continue Education or Training") {
                        $scope.homeFrontAdult.continue += parseInt(data[i].count);
                        $scope.homeFrontAdult.total += parseInt(data[i].count);
                    }
                    if ($scope.homeFrontAdult.continue === undefined) {
                        $scope.homeFrontAdult.continue = 0;
                    }

                    // Adult Dropout Education
                    if (data[i]['Adult Edu Adv'] === "Dropped out and did not return") {
                        $scope.homeFrontAdult.dropout += parseInt(data[i].count);
                        $scope.homeFrontAdult.total += parseInt(data[i].count);
                    }
                    if ($scope.homeFrontAdult.dropout === undefined) {
                        $scope.homeFrontAdult.dropout = 0;
                    }

                    // Adult Enrolled Education
                    if (data[i]['Adult Edu Adv'] === "Enrolled in education") {
                        $scope.homeFrontAdult.enrolled += parseInt(data[i].count);
                        $scope.homeFrontAdult.total += parseInt(data[i].count);
                    }
                    if ($scope.homeFrontAdult.enrolled === undefined) {
                        $scope.homeFrontAdult.enrolled = 0;
                    }
                    console.log('homefront total', $scope.homefrontAdult.total);
                } // End of HOMEFRONT

                // HOMEFAGAIN PROGRAM Education
                $scope.homeAgainAdult = {
                    complete: 0,
                    continue: 0,
                    enrolled: 0,
                    dropout: 0,
                    total: 0
                };

                if(data[i].Program == "HomeAgain" || data[i].Program == "Home Again" ) {
                    // Adult Completed Education
                    if (data[i]['Adult Edu Adv'] === "Completed Education/Training") {
                        $scope.homeAgainAdult.complete += parseInt(data[i].count);
                        $scope.homeAgainAdult.total += parseInt(data[i].count);
                    }
                    if ($scope.homeAgainAdult.complete === undefined) {
                        $scope.homeAgainAdult.complete = 0;
                    }

                    // Adult Continue Education
                    if (data[i]['Adult Edu Adv'] === "Continue Education or Training") {
                        $scope.homeAgainAdult.continue += parseInt(data[i].count);
                        $scope.homeAgainAdult.total += parseInt(data[i].count);
                    }
                    if ($scope.homeAgainAdult.continue === undefined) {
                        $scope.homeAgainAdult.continue = 0;
                    }

                    // Adult Dropout Education
                    if (data[i]['Adult Edu Adv'] === "Dropped out and did not return") {
                        $scope.homeAgainAdult.dropout += parseInt(data[i].count);
                        $scope.homeAgainAdult.total += parseInt(data[i].count);
                    }
                    if ($scope.homeAgainAdult.dropout === undefined) {
                        $scope.homeAgainAdult.dropout = 0;
                    }

                    // Adult Enrolled Education
                    if (data[i]['Adult Edu Adv'] === "Enrolled in education") {
                        $scope.homeAgainAdult.enrolled += parseInt(data[i].count);
                        $scope.homeAgainAdult.total += parseInt(data[i].count);
                    }
                    if ($scope.homeAgainAdult.enrolled === undefined) {
                        $scope.homeAgainAdult.enrolled = 0;
                    }
                    console.log('homeagain  total', $scope.homeAgainAdult.total);
                } // End of HOMEFAGAIN

            } // End of for loop

        }); // end of adultEduAdv


        $scope.outcomeFactory.adultLearningDis(selections).then(function(response) {
          console.log("response adultLearningDis: ", response);
          var responseArray = response;
          var substringNormal = "Yes";
          var substringUpCAse = "YES";

          $scope.adultDisEMP={
            countTotal:0,
            other:0
          };

          $scope.adultDisEMPII={
            countTotal:0,
            other:0
          };

          $scope.adultDisHomeAgain={
            countTotal:0,
            other:0
          };

          $scope.adultDisHomeFront={
            countTotal:0,
            other:0
          };

          $scope.adultDisHomeSafe={
            countTotal:0,
            other:0
          };

          for (var i = 0; i < responseArray.length; i++) {
            if(responseArray[i].Program =="EMP"){
              if(responseArray[i]["Is There a Learning Disability"].indexOf(substringNormal)!==-1||responseArray[i]["Is There a Learning Disability"].indexOf(substringUpCAse)!==-1){
                $scope.adultDisEMP.countTotal += parseInt(responseArray[i].count);
              }
              else {
                $scope.adultDisEMP.other += parseInt(responseArray[i].count);
              }
            }
            else if(responseArray[i].Program =="EMPII"){
              if(responseArray[i]["Is There a Learning Disability"].indexOf(substringNormal)!==-1||responseArray[i]["Is There a Learning Disability"].indexOf(substringUpCAse)!==-1){
                $scope.adultDisEMPII.countTotal += parseInt(responseArray[i].count);
              }
              else {
                $scope.adultDisEMPII.other += parseInt(responseArray[i].count);
              }
            }
            else if(responseArray[i].Program =="HomeAgain"||responseArray[i].Program =="Home Again"){
              if(responseArray[i]["Is There a Learning Disability"].indexOf(substringNormal)!==-1||responseArray[i]["Is There a Learning Disability"].indexOf(substringUpCAse)!==-1){
                $scope.adultDisHomeAgain.countTotal += parseInt(responseArray[i].count);
              }
              else {
                $scope.adultDisHomeAgain.other += parseInt(responseArray[i].count);
              }
            }
            else if(responseArray[i].Program =="HomeSafe"||responseArray[i].Program =="Home Safe"){
              if(responseArray[i]["Is There a Learning Disability"].indexOf(substringNormal)!==-1||responseArray[i]["Is There a Learning Disability"].indexOf(substringUpCAse)!==-1){
                $scope.adultDisHomeSafe.countTotal += parseInt(responseArray[i].count);
              }
              else {
                $scope.adultDisHomeSafe.other += parseInt(responseArray[i].count);
              }
            }
            else if(responseArray[i].Program =="HomeFront"||responseArray[i].Program =="Home Front"){
              if(responseArray[i]["Is There a Learning Disability"].indexOf(substringNormal)!==-1||responseArray[i]["Is There a Learning Disability"].indexOf(substringUpCAse)!==-1){
                $scope.adultDisHomeFront.countTotal += parseInt(responseArray[i].count);
              }
              else {
                $scope.adultDisHomeFront.other += parseInt(responseArray[i].count);
              }
            }
          }//end of for statement
          console.log("test emp",$scope.adultDisEMP);
          console.log("test empII",$scope.adultDisEMPII);
          console.log("test again",$scope.adultDisHomeAgain);
          console.log("test safe",$scope.adultDisHomeSafe);
          console.log("test homefront",$scope.adultDisHomeFront);
        });//end of adultLearningDis


        $scope.outcomeFactory.childLearnDis(selections).then(function(response) {
          console.log("response childLearnDis: ", response);
            var responseArray = response;
            var substringNormal = "Yes";
            var substringUpCAse = "YES";

            $scope.childDisEMP={
              countTotal:0,
              other:0
            };

            $scope.childDisEMPII={
              countTotal:0,
              other:0
            };

            $scope.childDisHomeAgain={
              countTotal:0,
              other:0
            };

            $scope.childDisHomeFront={
              countTotal:0,
              other:0
            };

            $scope.childDisHomeSafe={
              countTotal:0,
              other:0
            };

            for (var i = 0; i < responseArray.length; i++) {
              if(responseArray[i].Program =="EMP"){
                if(responseArray[i]["Is There a Learning Disability"].indexOf(substringNormal)!==-1||responseArray[i]["Is There a Learning Disability"].indexOf(substringUpCAse)!==-1){
                  $scope.childDisEMP.countTotal += parseInt(responseArray[i].count);
                }
                else {
                  $scope.childDisEMP.other += parseInt(responseArray[i].count);
                }
              }
              else if(responseArray[i].Program =="EMPII"){
                if(responseArray[i]["Is There a Learning Disability"].indexOf(substringNormal)!==-1||responseArray[i]["Is There a Learning Disability"].indexOf(substringUpCAse)!==-1){
                  $scope.childDisEMPII.countTotal += parseInt(responseArray[i].count);
                }
                else {
                  $scope.childDisEMPII.other += parseInt(responseArray[i].count);
                }
              }
              else if(responseArray[i].Program =="HomeAgain"||responseArray[i].Program =="Home Again"){
                if(responseArray[i]["Is There a Learning Disability"].indexOf(substringNormal)!==-1||responseArray[i]["Is There a Learning Disability"].indexOf(substringUpCAse)!==-1){
                  $scope.childDisHomeAgain.countTotal += parseInt(responseArray[i].count);
                }
                else {
                  $scope.childDisHomeAgain.other += parseInt(responseArray[i].count);
                }
              }
              else if(responseArray[i].Program =="HomeSafe"||responseArray[i].Program =="Home Safe"){
                if(responseArray[i]["Is There a Learning Disability"].indexOf(substringNormal)!==-1||responseArray[i]["Is There a Learning Disability"].indexOf(substringUpCAse)!==-1){
                  $scope.childDisHomeSafe.countTotal += parseInt(responseArray[i].count);
                }
                else {
                  $scope.childDisHomeSafe.other += parseInt(responseArray[i].count);
                }
              }
              else if(responseArray[i].Program =="HomeFront"||responseArray[i].Program =="Home Front"){
                if(responseArray[i]["Is There a Learning Disability"].indexOf(substringNormal)!==-1||responseArray[i]["Is There a Learning Disability"].indexOf(substringUpCAse)!==-1){
                  $scope.childDisHomeFront.countTotal += parseInt(responseArray[i].count);
                }
                else {
                  $scope.childDisHomeFront.other += parseInt(responseArray[i].count);
                }
              }
            }//end of for statement
            console.log("test emp",$scope.childDisEMP);
            console.log("test empII",$scope.childDisEMPII);
            console.log("test again",$scope.childDisHomeAgain);
            console.log("test safe",$scope.childDisHomeSafe);
            console.log("test homefront",$scope.childDisHomeFront);
        });//end of childLearnDis


        $scope.outcomeFactory.hhCurrentEmp(selections).then(function(response) {
          console.log("response hhCurrentEmp: ", response);
              $scope.hhCurrentEMP={
                countTotal:0,
                other:0
              };

              $scope.hhCurrentEMPII={
                countTotal:0,
                other:0
              };

              $scope.hhCurrentHomeAgain={
                countTotal:0,
                other:0
              };

              $scope.hhCurrentHomeFront={
                countTotal:0,
                other:0
              };

              $scope.hhCurrentHomeSafe={
                countTotal:0,
                other:0
              };

              var responseArray = response;

              for (var i = 0; i < responseArray.length; i++) {
                if (responseArray[i].Program == "EMP") {
                  console.log(responseArray[i]);
                  if (responseArray[i]['Currently Employed']=='-1'||responseArray[i]['Currently Employed']=='Yes') {
                    $scope.hhCurrentEMP.countTotal += parseInt(responseArray[i].count);
                  }
                  else{
                    $scope.hhCurrentEMP.countTotal += parseInt(responseArray[i].count);
                  }
                }
                else if (responseArray[i].Program == "EMPII") {
                  console.log(responseArray[i]);
                  if (responseArray[i]['Currently Employed']=='-1'||responseArray[i]['Currently Employed']=='Yes') {
                    $scope.hhCurrentEMPII.countTotal += parseInt(responseArray[i].count);
                  }
                  else{
                    $scope.hhCurrentEMPII.countTotal += parseInt(responseArray[i].count);
                  }
                }
                else if (responseArray[i].Program == "HomeFront"||responseArray[i].Program == "Home Front") {
                  console.log(responseArray[i]);
                  if (responseArray[i]['Currently Employed']=='-1'||responseArray[i]['Currently Employed']=='Yes') {
                    $scope.hhCurrentHomeFront.countTotal += parseInt(responseArray[i].count);
                  }
                  else{
                    $scope.hhCurrentHomeFront.countTotal += parseInt(responseArray[i].count);
                  }
                }

                else if (responseArray[i].Program == "HomeSafe"||responseArray[i].Program == "Home Safe") {
                  console.log(responseArray[i]);
                  if (responseArray[i]['Currently Employed']=='-1'||responseArray[i]['Currently Employed']=='Yes') {
                    $scope.hhCurrentHomeSafe.countTotal += parseInt(responseArray[i].count);
                  }
                  else{
                    $scope.hhCurrentHomeSafe.countTotal += parseInt(responseArray[i].count);
                  }
                }

                else if (responseArray[i].Program == "HomeAgain"||responseArray[i].Program == "Home Again") {
                  console.log(responseArray[i]);
                  if (responseArray[i]['Currently Employed']=='-1'||responseArray[i]['Currently Employed']=='Yes') {
                    $scope.hhCurrentHomeAgain.countTotal += parseInt(responseArray[i].count);
                  }
                  else{
                    $scope.hhCurrentHomeAgain.countTotal += parseInt(responseArray[i].count);
                  }
                }

              }//end of for loop
              console.log('this test for EMP',$scope.hhCurrentEMP);
              console.log('this test for EMPII',$scope.hhCurrentEMPII);
              console.log('this test for HomeA',$scope.hhCurrentHomeAgain);
              console.log('this test for HomeF',$scope.hhCurrentHomeFront);
              console.log('this test for HomeS',$scope.hhCurrentHomeSafe);

        });//end of hhCurrentEmp
        //Complete

        $scope.outcomeFactory.hh2CurrentEmp(selections).then(function(response) {
          console.log("response hh2CurrentEmp: ", response);
                $scope.hh2CurrentEMP={
                  countTotal:0,
                  other:0
                };

                $scope.hh2CurrentEMPII={
                  countTotal:0,
                  other:0
                };

                $scope.hh2CurrentHomeAgain={
                  countTotal:0,
                  other:0
                };

                $scope.hh2CurrentHomeFront={
                  countTotal:0,
                  other:0
                };

                $scope.hh2CurrentHomeSafe={
                  countTotal:0,
                  other:0
                };

                var responseArray = response;

                for (var i = 0; i < responseArray.length; i++) {
                  if (responseArray[i].Program == "EMP") {
                    console.log(responseArray[i]);
                    if (responseArray[i]['Currently Employed']=='-1'||responseArray[i]['Currently Employed']=='Yes') {
                      $scope.hh2CurrentEMP.countTotal += parseInt(responseArray[i].count);
                    }
                    else{
                      $scope.hh2CurrentEMP.countTotal += parseInt(responseArray[i].count);
                    }
                  }
                  else if (responseArray[i].Program == "EMPII") {
                    console.log(responseArray[i]);
                    if (responseArray[i]['Currently Employed']=='-1'||responseArray[i]['Currently Employed']=='Yes') {
                      $scope.hh2CurrentEMPII.countTotal += parseInt(responseArray[i].count);
                    }
                    else{
                      $scope.hh2CurrentEMPII.countTotal += parseInt(responseArray[i].count);
                    }
                  }
                  else if (responseArray[i].Program == "HomeFront"||responseArray[i].Program == "Home Front") {
                    console.log(responseArray[i]);
                    if (responseArray[i]['Currently Employed']=='-1'||responseArray[i]['Currently Employed']=='Yes') {
                      $scope.hh2CurrentHomeFront.countTotal += parseInt(responseArray[i].count);
                    }
                    else{
                      $scope.hh2CurrentHomeFront.countTotal += parseInt(responseArray[i].count);
                    }
                  }

                  else if (responseArray[i].Program == "HomeSafe"||responseArray[i].Program == "Home Safe") {
                    console.log(responseArray[i]);
                    if (responseArray[i]['Currently Employed']=='-1'||responseArray[i]['Currently Employed']=='Yes') {
                      $scope.hh2CurrentHomeSafe.countTotal += parseInt(responseArray[i].count);
                    }
                    else{
                      $scope.hh2CurrentHomeSafe.countTotal += parseInt(responseArray[i].count);
                    }
                  }

                  else if (responseArray[i].Program == "HomeAgain"||responseArray[i].Program == "Home Again") {
                    console.log(responseArray[i]);
                    if (responseArray[i]['Currently Employed']=='-1'||responseArray[i]['Currently Employed']=='Yes') {
                      $scope.hh2CurrentHomeAgain.countTotal += parseInt(responseArray[i].count);
                    }
                    else{
                      $scope.hh2CurrentHomeAgain.countTotal += parseInt(responseArray[i].count);
                    }
                  }

                }//end of for loop
                console.log('this test for EMP',$scope.hh2CurrentEMP);
                console.log('this test for EMPII',$scope.hh2CurrentEMPII);
                console.log('this test for HomeA',$scope.hh2CurrentHomeAgain);
                console.log('this test for HomeF',$scope.hh2CurrentHomeFront);
                console.log('this test for HomeS',$scope.hh2CurrentHomeSafe);

        });



        $scope.outcomeFactory.econStabil(selections).then(function(response) {
            console.log("response econStabil: ", response);
            var responseArray = response;

            $scope.empEconS = {
                work3month: 0,
                appliedforSSD: 0,
                appliedforSSDbutDenied: 0,
                jobAtYearEndorExit: 0,
                diagDisAlreadySSD: 0,
                approvedSSDduringProgram: 0,
                alreadySSD: 0,
                total: 0
            };

            $scope.emptwoEconS = {
                work3month: 0,
                appliedforSSD: 0,
                appliedforSSDbutDenied: 0,
                jobAtYearEndorExit: 0,
                diagDisAlreadySSD: 0,
                approvedSSDduringProgram: 0,
                alreadySSD: 0,
                total: 0
            };

            $scope.homeAgainEconS = {
                work3month: 0,
                appliedforSSD: 0,
                appliedforSSDbutDenied: 0,
                jobAtYearEndorExit: 0,
                diagDisAlreadySSD: 0,
                approvedSSDduringProgram: 0,
                alreadySSD: 0,
                total: 0
            };

            $scope.homeSafeEconS = {
                work3month: 0,
                appliedforSSD: 0,
                appliedforSSDbutDenied: 0,
                jobAtYearEndorExit: 0,
                diagDisAlreadySSD: 0,
                approvedSSDduringProgram: 0,
                alreadySSD: 0,
                total: 0
            };

            $scope.homeFrontEconS = {
                work3month: 0,
                appliedforSSD: 0,
                appliedforSSDbutDenied: 0,
                jobAtYearEndorExit: 0,
                diagDisAlreadySSD: 0,
                approvedSSDduringProgram: 0,
                alreadySSD: 0,
                total: 0
            };

            for (var i = 0; i < responseArray.length; i++) {
                if(responseArray[i].Program == "EMP"){
                    if(responseArray[i]['Improved Econ Stability'] == "Worked for 3+ months"){
                        $scope.empEconS.work3month += parseInt(responseArray[i].count);
                        $scope.empEconS.total ++;
                        console.log("emp 3 mo", $scope.empEconS.work3month);
                    }
                    else if(responseArray[i]['Improved Econ Stability'] == "Applied for SSD during program"){
                        $scope.empEconS.appliedforSSD += parseInt(responseArray[i].count);
                        $scope.empEconS.total ++;
                        console.log("emp emp for ssd", $scope.empEconS.appliedforSSD);
                    }
                    else if(responseArray[i]['Improved Econ Stability'] == "Had a job at year-end or at exit" || responseArray[i]['Improved Econ Stability'] == "Had a job at year-end or at exiting"){
                        $scope.empEconS.jobAtYearEndorExit += parseInt(responseArray[i].count)
                        $scope.empEconS.total ++;
                        console.log("emp job at exit", $scope.empEconS.jobAtYearEndorExit);
                    }
                    else if(responseArray[i]['Improved Econ Stability'] == "Applied for SSD but denied"){
                        $scope.empEconS.appliedforSSDbutDenied += parseInt(responseArray[i].count);
                        $scope.empEconS.total ++;
                        console.log("emp denied ssd", $scope.empEconS.appliedforSSDbutDenied);
                    }
                    else if(responseArray[i]['Improved Econ Stability'] == "Approved for SSD during program"){
                        $scope.empEconS.approvedSSDduringProgram += parseInt(responseArray[i].count);
                        $scope.empEconS.total ++;
                        console.log("emp approved ssd", $scope.empEconS.approvedSSDduringProgram);
                    }
                    else if(responseArray[i]['Improved Econ Stability'] == "Already receiving SSD prior program"){
                        $scope.empEconS.alreadySSD += parseInt(responseArray[i].count);
                        $scope.empEconS.total ++;
                        console.log("emp already ssd", $scope.empEconS.alreadySSD);
                    }
                }//end of EMP if
                else if(responseArray[i].Program == "EMPII"){
                    if(responseArray[i]['Improved Econ Stability'] == "Worked for 3+ months"){
                        $scope.emptwoEconS.work3month += parseInt(responseArray[i].count);
                        $scope.emptwoEconS.total ++;
                        console.log("empii 3 mo", $scope.emptwoEconS.work3month);
                    }
                    else if(responseArray[i]['Improved Econ Stability'] == "Applied for SSD during program"){
                        $scope.emptwoEconS.appliedforSSD += parseInt(responseArray[i].count);
                        $scope.emptwoEconS.total ++;
                        console.log("empii for ssd", $scope.emptwoEconS.appliedforSSD);
                    }
                    else if(responseArray[i]['Improved Econ Stability'] == "Had a job at year-end or at exit" || responseArray[i]['Improved Econ Stability'] == "Had a job at year-end or at exiting"){
                        $scope.emptwoEconS.jobAtYearEndorExit += parseInt(responseArray[i].count)
                        $scope.emptwoEconS.total ++;
                        console.log("empii job at exit", $scope.emptwoEconS.jobAtYearEndorExit);
                    }
                    else if(responseArray[i]['Improved Econ Stability'] == "Applied for SSD but denied"){
                        $scope.emptwoEconS.appliedforSSDbutDenied += parseInt(responseArray[i].count);
                        $scope.emptwoEconS.total ++;
                        console.log("empii denied ssd", $scope.emptwoEconS.appliedforSSDbutDenied);
                    }
                    else if(responseArray[i]['Improved Econ Stability'] == "Approved for SSD during program"){
                        $scope.emptwoEconS.approvedSSDduringProgram += parseInt(responseArray[i].count);
                        $scope.emptwoEconS.total ++;
                        console.log("empii approved ssd", $scope.emptwoEconS.approvedSSDduringProgram);
                    }
                    else if(responseArray[i]['Improved Econ Stability'] == "Already receiving SSD prior program"){
                        $scope.emptwoEconS.alreadySSD += parseInt(responseArray[i].count);
                        $scope.emptwoEconS.total ++;
                        console.log("empii already ssd", $scope.emptwoEconS.alreadySSD);
                    }
                }//end of empII
                else if(responseArray[i].Program == "HomeSafe"){
                    if(responseArray[i]['Improved Econ Stability'] == "Worked for 3+ months"){
                        $scope.homeSafeEconS.work3month += parseInt(responseArray[i].count);
                        $scope.homeSafeEconS.total ++;
                        console.log("homesafe 3 mo", $scope.homeSafeEconS.work3month);
                    }
                    else if(responseArray[i]['Improved Econ Stability'] == "Applied for SSD during program"){
                        $scope.homeSafeEconS.appliedforSSD += parseInt(responseArray[i].count);
                        $scope.homeSafeEconS.total ++;
                        console.log("homesafe for ssd", $scope.homeSafeEconS.appliedforSSD);
                    }
                    else if(responseArray[i]['Improved Econ Stability'] == "Had a job at year-end or at exit" || responseArray[i]['Improved Econ Stability'] == "Had a job at year-end or at exiting"){
                        $scope.homeSafeEconS.jobAtYearEndorExit += parseInt(responseArray[i].count)
                        $scope.homeSafeEconS.total ++;
                        console.log("homesafe job at exit", $scope.homeSafeEconS.jobAtYearEndorExit);
                    }
                    else if(responseArray[i]['Improved Econ Stability'] == "Applied for SSD but denied"){
                        $scope.homeSafeEconS.appliedforSSDbutDenied += parseInt(responseArray[i].count);
                        $scope.homeSafeEconS.total ++;
                        console.log("homesafe denied ssd", $scope.homeSafeEconS.appliedforSSDbutDenied);
                    }
                    else if(responseArray[i]['Improved Econ Stability'] == "Approved for SSD during program"){
                        $scope.homeSafeEconS.approvedSSDduringProgram += parseInt(responseArray[i].count);
                        $scope.homeSafeEconS.total ++;
                        console.log("homesafe approved ssd", $scope.homeSafeEconS.approvedSSDduringProgram);
                    }
                    else if(responseArray[i]['Improved Econ Stability'] == "Already receiving SSD prior program"){
                        $scope.homeSafeEconS.alreadySSD += parseInt(responseArray[i].count);
                        $scope.homeSafeEconS.total ++;
                        console.log("homesafe already ssd", $scope.homeSafeEconS.alreadySSD);
                    }
                }//end of HomeSafe
                else if(responseArray[i].Program == "Home Again"){
                    if(responseArray[i]['Improved Econ Stability'] == "Worked for 3+ months"){
                        $scope.homeAgainEconS.work3month += parseInt(responseArray[i].count);
                        $scope.homeAgainEconS.total ++;
                        console.log("home again 3 mo", $scope.homeAgainEconS.work3month);
                    }
                    else if(responseArray[i]['Improved Econ Stability'] == "Applied for SSD during program"){
                        $scope.homeAgainEconS.appliedforSSD += parseInt(responseArray[i].count);
                        $scope.homeAgainEconS.total ++;
                        console.log("home again for ssd", $scope.homeAgainEconS.appliedforSSD);
                    }
                    else if(responseArray[i]['Improved Econ Stability'] == "Had a job at year-end or at exit" || responseArray[i]['Improved Econ Stability'] == "Had a job at year-end or at exiting"){
                        $scope.homeAgainEconS.jobAtYearEndorExit += parseInt(responseArray[i].count)
                        $scope.homeAgainEconS.total ++;
                        console.log("home again job at exit", $scope.homeAgainEconS.jobAtYearEndorExit);
                    }
                    else if(responseArray[i]['Improved Econ Stability'] == "Applied for SSD but denied"){
                        $scope.homeAgainEconS.appliedforSSDbutDenied += parseInt(responseArray[i].count);
                        $scope.homeAgainEconS.total ++;
                        console.log("home again denied ssd", $scope.homeAgainEconS.appliedforSSDbutDenied);
                    }
                    else if(responseArray[i]['Improved Econ Stability'] == "Approved for SSD during program"){
                        $scope.homeAgainEconS.approvedSSDduringProgram += parseInt(responseArray[i].count);
                        $scope.homeAgainEconS.total ++;
                        console.log("home again approved ssd", $scope.homeAgainEconS.approvedSSDduringProgram);
                    }
                    else if(responseArray[i]['Improved Econ Stability'] == "Already receiving SSD prior program"){
                        $scope.homeAgainEconS.alreadySSD += parseInt(responseArray[i].count);
                        $scope.homeAgainEconS.total ++;
                        console.log("home again already ssd", $scope.homeAgainEconS.alreadySSD);
                    }
                }//end of Home Again
                else if(responseArray[i].Program == "HomeFront" || responseArray[i].Program == "Home Front"){
                    if(responseArray[i]['Improved Econ Stability'] == "Worked for 3+ months"){
                        $scope.homeFrontEconS.work3month += parseInt(responseArray[i].count);
                        $scope.homeFrontEconS.total ++;
                        console.log("home front 3 mo", $scope.homeFrontEconS.work3month);
                    }
                    else if(responseArray[i]['Improved Econ Stability'] == "Applied for SSD during program"){
                        $scope.homeFrontEconS.appliedforSSD += parseInt(responseArray[i].count);
                        $scope.homeFrontEconS.total ++;
                        console.log("home front for ssd", $scope.homeFrontEconS.appliedforSSD);
                    }
                    else if(responseArray[i]['Improved Econ Stability'] == "Had a job at year-end or at exit" || responseArray[i]['Improved Econ Stability'] == "Had a job at year-end or at exiting"){
                        $scope.homeFrontEconS.jobAtYearEndorExit += parseInt(responseArray[i].count)
                        $scope.homeFrontEconS.total ++;
                        console.log("home front job at exit", $scope.homeFrontEconS.jobAtYearEndorExit);
                    }
                    else if(responseArray[i]['Improved Econ Stability'] == "Applied for SSD but denied"){
                        $scope.homeFrontEconS.appliedforSSDbutDenied += parseInt(responseArray[i].count);
                        $scope.homeFrontEconS.total ++;
                        console.log("home front denied ssd", $scope.homeFrontEconS.appliedforSSDbutDenied);
                    }
                    else if(responseArray[i]['Improved Econ Stability'] == "Approved for SSD during program"){
                        $scope.homeFrontEconS.approvedSSDduringProgram += parseInt(responseArray[i].count);
                        $scope.homeFrontEconS.total ++;
                        console.log("home front approved ssd", $scope.homeFrontEconS.approvedSSDduringProgram);
                    }
                    else if(responseArray[i]['Improved Econ Stability'] == "Already receiving SSD prior program"){
                        $scope.homeFrontEconS.alreadySSD += parseInt(responseArray[i].count);
                        $scope.homeFrontEconS.total ++;
                        console.log("home front already ssd", $scope.homeFrontEconS.alreadySSD);
                    }
                }//end of homeFront
            }//these check for the objects to have values(these total values hsould equal response.length)
        }); // End of econStabil


        $scope.outcomeFactory.adultDisabil(selections).then(function(response) {
            console.log("response adultDisabil: ", response);
            var responseArray = response;

            $scope.empAdultDis = {
                total: 0,
            };

            $scope.emptwoAdultDis = {
                total: 0,
            };

            $scope.homeAgainAdultDis = {
                total: 0,
            };

            $scope.homeSafeAdultDis = {
                total: 0,
            };

            $scope.homeFrontAdultDis = {
                total: 0,
            };

            for (var i = 0; i < responseArray.length; i++) {
                if(responseArray[i].Program == "EMP"){
                    console.log("pre if", responseArray[i].count);
                    if(responseArray[i]['Is There a Disability'] === true){
                        $scope.empAdultDis.total += parseInt(responseArray[i].count);
                        console.log("emp Disability true", $scope.empAdultDis.total);
                    }
                }//end of EMP if
                else if(responseArray[i].Program == "EMPII"){
                    if(responseArray[i]['Is There a Disability'] === true){
                        $scope.emptwoAdultDis.total += parseInt(responseArray[i].count);
                        console.log("empii Disability true", $scope.emptwoAdultDis.total);
                    }
                }//end of empII
                else if(responseArray[i].Program == "HomeSafe"){
                    console.log("whats going on here", responseArray[i]['Is There a Disability']);
                    if(responseArray[i]['Is There a Disability'] === true){
                        $scope.homeSafeAdultDis.total += parseInt(responseArray[i].count);
                        console.log("home safe Disability true", $scope.homeSafeAdultDis.total);
                    }
                }//end of HomeSafe
                else if(responseArray[i].Program == "Home Again"){
                    if(responseArray[i]['Is There a Disability'] === true){
                        $scope.homeAgainAdultDis.total += parseInt(responseArray[i].count);
                        console.log("home again Disability true", $scope.homeAgainAdultDis.total);
                    }
                }//end of Home Again
                else if(responseArray[i].Program == "HomeFront" || responseArray[i].Program == "Home Front"){
                    if(responseArray[i]['Is There a Disability'] === true){
                        $scope.homeFrontAdultDis.total += parseInt(responseArray[i].count);
                        console.log("home front Disability true", $scope.homeFrontAdultDis.total);
                    }
                }//end of homeFront
            }
        }); // end of adultDisabil


        $scope.outcomeFactory.childDis(selections).then(function(response) {
          console.log("response childDis: ", response);

          var responseArray = response;

          $scope.emp_childDis = {
              total: 0,
          };

          $scope.emptwo_childDis = {
              total: 0,
          };

          $scope.homeAgain_childDis = {
              total: 0,
          };

          $scope.homeSafe_childDis = {
              total: 0,
          };

          $scope.homeFront_childDis = {
              total: 0,
          };

          $scope.childDis_Total = 0;

          for (var i = 0; i < responseArray.length; i++) {
            $scope.childDis_Total += parseInt(responseArray[i].count);
              if(responseArray[i].Program == "EMP"){
                  console.log("pre if", responseArray[i].count);
                  if(responseArray[i]['Is There a Disability'] === true){
                      $scope.emp_childDis.total += parseInt(responseArray[i].count);
                      console.log("emp childDisability true: ", $scope.emp_childDis.total);
                  }
              }//end of EMP if
              else if(responseArray[i].Program == "EMPII"){
                  if(responseArray[i]['Is There a Disability'] === true){
                      $scope.emptwo_childDis.total += parseInt(responseArray[i].count);
                      console.log("empii childDisability true", $scope.emptwo_childDis.total);
                  }
              }//end of empII
              else if(responseArray[i].Program == "HomeSafe"){
                  console.log("whats going on here", responseArray[i]['Is There a Disability']);
                  if(responseArray[i]['Is There a Disability'] === true){
                      $scope.homeSafe_childDis.total += parseInt(responseArray[i].count);
                      console.log("home safe childDisability true: ", $scope.homeSafe_childDis.total);
                  }
              }//end of HomeSafe
              else if(responseArray[i].Program == "Home Again"){
                  if(responseArray[i]['Is There a Disability'] === true){
                      $scope.homeAgain_childDis.total += parseInt(responseArray[i].count);
                      console.log("home again childDisability true: ", $scope.homeAgain_childDis.total);
                  }
              }//end of Home Again
              else if(responseArray[i].Program == "HomeFront" || responseArray[i].Program == "Home Front"){
                  if(responseArray[i]['Is There a Disability'] === true){
                      $scope.homeFront_childDis.total += parseInt(responseArray[i].count);
                      console.log("home front childDisability true: ", $scope.homeFront_childDis.total);
                  }
              }//end of homeFront
          }
        }); // end of childDis



        $scope.outcomeFactory.parentEduYearBefore(selections).then(function(response) {
            console.log("response parentEduYearBefore: ", response);
            var data = response;


            $scope.empParentEdu_priorYr = {
                completed: 0
            };

            $scope.emp2ParentEdu_priorYr = {
                completed: 0
            };

            $scope.homeagainParentEdu_priorYr = {
                completed: 0
            };

            $scope.homesafeParentEdu_priorYr = {
                completed: 0
            };

            $scope.homefrontParentEdu_priorYr = {
                completed: 0
            };

            for (var i = 0; i < data.length; i++) {

                if(data[i].Program === "EMP") {
                    $scope.empParentEdu_priorYr.completed = parseInt(data[i]['Parenting Completed']);
                    console.log('emp parent edu', $scope.empParentEdu_priorYr.completed);
                }
                if(data[i].Program === "EMPII") {
                    $scope.emp2ParentEdu_priorYr.completed = parseInt(data[i]['Parenting Completed']);
                    console.log('emp2 parent edu', $scope.emp2ParentEdu_priorYr.completed);
                }
                if(data[i].Program === "Home Again") {
                    $scope.homeagainParentEdu_priorYr.completed = parseInt(data[i]['Parenting Completed']);
                    console.log('homeagain parent edu',$scope.homeagainParentEdu_priorYr.completed);
                }
                if(data[i].Program === "Home Safe" || data[i].Program === "HomeSafe") {
                    $scope.homesafeParentEdu_priorYr.completed = parseInt(data[i]['Parenting Completed']);
                    console.log('home safe', $scope.homesafeParentEdu_priorYr.completed);
                }
                if(data[i].Program === "Home Front" || data[i].Program === "HomeFront") {
                    $scope.homefrontParentEdu.completed= parseInt(data[i]['Parenting Completed']);
                    console.log('home safe', $scope.homefrontParentEdu.completed);
                }
            }

        });  // end of parentEduYearBefore


        $scope.outcomeFactory.parentEduThisYear(selections).then(function(response) {
            console.log("response parentEduThisYear: ", response);
            $scope.parentEduThisYear_EMP = {
                total:0
            };

            $scope.parentEduThisYear_EMPII = {
                total:0
            };

            $scope.parentEduThisYear_HomeSafe = {
                total:0
            };

            $scope.parentEduThisYear_HomeAgain = {
                total:0
            };

            $scope.parentEduThisYear_HomeFront = {
                total:0
            };

            $scope.parentEduThisYear_Total = 0;

            var responseArray = response

            for (var i = 0; i < responseArray.length; i++) {
                $scope.parentEduThisYear_Total += parseInt(responseArray[i]["Parenting Completed"]);

                if (responseArray[i].Program == "EMP"){
                    $scope.parentEduThisYear_EMP.total += parseInt(responseArray[i]["Parenting Completed"]);
                }
                else if (responseArray[i].Program == "EMPII"){
                    $scope.parentEduThisYear_EMPII.total += parseInt(responseArray[i]["Parenting Completed"]);
                }
                else if (responseArray[i].Program == "HomeSafe"||responseArray[i].Program == "Home Safe"){
                    $scope.parentEduThisYear_HomeSafe.total += parseInt(responseArray[i]["Parenting Completed"]);
                }

                else if (responseArray[i].Program == "HomeAgain" || responseArray[i].Program == "Home Again"){
                    $scope.parentEduThisYear_HomeAgain.total += parseInt(responseArray[i]["Parenting Completed"]);
                }

                else if (responseArray[i].Program == "HomeFront"|| responseArray[i].Program == "Home Front"){
                    $scope.parentEduThisYear_HomeFront += parseInt(responseArray[i]["Parenting Completed"]);
                }
            } // end for loop
        });  // end of parentEduThisYear


        $scope.outcomeFactory.parentEdu(selections).then(function(response) {
            console.log("response parentEdu: ", response);
            var responseArray = response;
            $scope.empParentEdu = {
                total: 0,
            };
            $scope.emptwoParentEdu = {
                total: 0,
            };
            $scope.homeAgainParentEdu = {
                total: 0,
            };
            $scope.homeSafeParentEdu = {
                total: 0,
            };
            $scope.homeFrontParentEdu = {
                total: 0,
            };

            $scope.parentEdu_Total = 0;

            for (var i = 0; i < responseArray.length; i++) {
                $scope.parentEdu_Total += responseArray[i].count;

                if(responseArray[i].Program == "EMP"){
                    if(responseArray[i]['Parenting Education'] === true){
                        $scope.empParentEdu.total += parseInt(responseArray[i].count);
                        console.log("emp parent true", $scope.empParentEdu.total);
                    }
                }//end of EMP if
                else if(responseArray[i].Program == "EMPII"){
                    if(responseArray[i]['Parenting Education'] === true){
                        $scope.emptwoParentEdu.total += parseInt(responseArray[i].count);
                        console.log("empii parent true", $scope.emptwoParentEdu.total);
                    }
                }//end of empII
                else if(responseArray[i].Program == "HomeSafe"){
                    console.log("whats going on here", responseArray[i]['Is There a Disability']);
                    if(responseArray[i]['Parenting Education'] === true){
                        $scope.homeSafeParentEdu.total += parseInt(responseArray[i].count);
                        console.log("home safe parent true", $scope.homeSafeParentEdu.total);
                    }
                }//end of HomeSafe
                else if(responseArray[i].Program == "Home Again"){
                    if(responseArray[i]['Parenting Education'] === true){
                        $scope.homeAgainParentEdu.total += parseInt(responseArray[i].count);
                        console.log("home again partent true", $scope.homeAgainParentEdu.total);
                    }
                }//end of Home Again
                else if(responseArray[i].Program == "HomeFront" || responseArray[i].Program == "Home Front"){
                    if(responseArray[i]['Parenting Education'] === true){
                        $scope.homeFrontParentEdu.total += parseInt(responseArray[i].count);
                        console.log("home front parent true", $scope.homeFrontParentEdu.total);
                    }
                }//end of homeFront
            }

        }); //end of parentEdu



        $scope.outcomeFactory.childMI(selections).then(function(response) {
          console.log("response childMI: ", response);
          $scope.childMI_EMP = {
              yesAndBeingTreated:0,
              yesAndNotBeingTreated:0,
              yesAndReferredForAssessment:0,
              undiagnosedReferredForAssessment:0,
              total:0
          };

          $scope.childMI_EMPII = {
              yesAndBeingTreated:0,
              yesAndNotBeingTreated:0,
              yesAndReferredForAssessment:0,
              undiagnosedReferredForAssessment:0,
              total:0
          };

          $scope.childMI_HomeSafe = {
              yesAndBeingTreated:0,
              yesAndNotBeingTreated:0,
              yesAndReferredForAssessment:0,
              undiagnosedReferredForAssessment:0,
              total:0
          };

          $scope.childMI_HomeAgain = {
              yesAndBeingTreated:0,
              yesAndNotBeingTreated:0,
              yesAndReferredForAssessment:0,
              undiagnosedReferredForAssessment:0,
              total:0
          };

          $scope.childMI_HomeFront = {
              yesAndBeingTreated:0,
              yesAndNotBeingTreated:0,
              yesAndReferredForAssessment:0,
              undiagnosedReferredForAssessment:0,
              total:0
          };

          $scope.childMI_Total = 0;

          var responseArray = response

          for (var i = 0; i < responseArray.length; i++) {
              $scope.childMI_Total += parseInt(responseArray[i].count);
              if (responseArray[i].Program == "EMP"){
                  if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and Being Treated"){
                      $scope.childMI_EMP.yesAndBeingTreated += parseInt(responseArray[i].count);
                      $scope.childMI_EMP.total += parseInt(responseArray[i].count);
                  }
                  else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES Not Being Treated"){
                      $scope.childMI_EMP.yesAndNotBeingTreated += parseInt(responseArray[i].count);
                      $scope.childMI_EMP.total += parseInt(responseArray[i].count);
                  }
                  else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and referred for Assessment" || responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and referred for assessment"){
                      $scope.childMI_EMP.yesAndReferredForAssessment += parseInt(responseArray[i].count);
                      $scope.childMI_EMP.total += parseInt(responseArray[i].count);
                  }
                  else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "Undiagnosed referred for assessment"){
                      $scope.childMI_EMP.undiagnosedReferredForAssessment += parseInt(responseArray[i].count);
                      $scope.childMI_EMP.total += parseInt(responseArray[i].count);
                  }
              }

              else if (responseArray[i].Program == "EMPII"){
                  if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and Being Treated"){
                      $scope.childMI_EMPII.yesAndBeingTreated += parseInt(responseArray[i].count);
                      $scope.childMI_EMPII.total += parseInt(responseArray[i].count);
                  }
                  else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES Not Being Treated"){
                      $scope.childMI_EMPII.yesAndNotBeingTreated += parseInt(responseArray[i].count);
                      $scope.childMI_EMPII.total += parseInt(responseArray[i].count);
                  }
                  else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and referred for Assessment" || responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and referred for assessment"){
                      $scope.childMI_EMPII.yesAndReferredForAssessment += parseInt(responseArray[i].count);
                      $scope.childMI_EMPII.total += parseInt(responseArray[i].count);
                  }
                  else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "Undiagnosed referred for assessment"){
                      $scope.childMI_EMPII.undiagnosedReferredForAssessment += parseInt(responseArray[i].count);
                      $scope.childMI_EMPII.total += parseInt(responseArray[i].count);
                  }
              }

              else if (responseArray[i].Program == "HomeSafe"||responseArray[i].Program == "Home Safe"){
                  if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and Being Treated"){
                      $scope.childMI_HomeSafe.yesAndBeingTreated += parseInt(responseArray[i].count);
                      $scope.childMI_HomeSafe.total += parseInt(responseArray[i].count);
                  }
                  else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES Not Being Treated"){
                      $scope.childMI_HomeSafe.yesAndNotBeingTreated += parseInt(responseArray[i].count);
                      $scope.childMI_HomeSafe.total += parseInt(responseArray[i].count);
                  }
                  else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and referred for Assessment" || responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and referred for assessment"){
                      $scope.childMI_HomeSafe.yesAndReferredForAssessment += parseInt(responseArray[i].count);
                      $scope.childMI_HomeSafe.total += parseInt(responseArray[i].count);
                  }
                  else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "Undiagnosed referred for assessment"){
                      $scope.childMI_HomeSafe.undiagnosedReferredForAssessment += parseInt(responseArray[i].count);
                      $scope.childMI_HomeSafe.total += parseInt(responseArray[i].count);
                  }
              }

              else if (responseArray[i].Program == "HomeAgain" || responseArray[i].Program == "Home Again"){
                  if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and Being Treated"){
                      $scope.childMI_HomeAgain.yesAndBeingTreated += parseInt(responseArray[i].count);
                      $scope.childMI_HomeAgain.total += parseInt(responseArray[i].count);
                  }
                  else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES Not Being Treated"){
                      $scope.childMI_HomeAgain.yesAndNotBeingTreated += parseInt(responseArray[i].count);
                      $scope.childMI_HomeAgain.total += parseInt(responseArray[i].count);
                  }
                  else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and referred for Assessment" || responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and referred for assessment"){
                      $scope.childMI_HomeAgain.yesAndReferredForAssessment += parseInt(responseArray[i].count);
                      $scope.childMI_HomeAgain.total += parseInt(responseArray[i].count);
                  }
                  else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "Undiagnosed referred for assessment"){
                      $scope.childMI_HomeAgain.undiagnosedReferredForAssessment += parseInt(responseArray[i].count);
                      $scope.childMI_HomeAgain.total += parseInt(responseArray[i].count);
                  }
              }

              else if (responseArray[i].Program == "HomeFront"|| responseArray[i].Program == "Home Front"){
                  if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and Being Treated"){
                      $scope.childMI_HomeFront.yesAndBeingTreated += parseInt(responseArray[i].count);
                      $scope.childMI_HomeFront.total += parseInt(responseArray[i].count);
                  }
                  else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES Not Being Treated"){
                      $scope.childMI_HomeFront.yesAndNotBeingTreated += parseInt(responseArray[i].count);
                      $scope.childMI_HomeFront.total += parseInt(responseArray[i].count);
                  }
                  else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and referred for Assessment" || responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and referred for assessment"){
                      $scope.childMI_HomeFront.yesAndReferredForAssessment += parseInt(responseArray[i].count);
                      $scope.childMI_HomeFront.total += parseInt(responseArray[i].count);
                  }
                  else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "Undiagnosed referred for assessment"){
                      $scope.childMI_HomeFront.undiagnosedReferredForAssessment += parseInt(responseArray[i].count);
                      $scope.childMI_HomeFront.total += parseInt(responseArray[i].count);
                  }
              }
          }//end for for loop
          // console.log('childMI EMP', $scope.childMI_EMP);
          // console.log('childMI EMPII', $scope.childMI_EMPII);
          // console.log('childMI Safe', $scope.childMI_HomeSafe);
          // console.log('childMI Again', $scope.childMI_HomeAgain);
          // console.log('childMI Front', $scope.childMI_HomeFront);
          // console.log('TOTAL', $scope.childMI_Total);
        }); // end of childMI



        $scope.outcomeFactory.adultMI(selections).then(function(response) {
            console.log("response adultMI: ", response);
            $scope.adultMI_EMP = {
                yesAndBeingTreated:0,
                yesAndNotBeingTreated:0,
                yesAndReferredForAssessment:0,
                undiagnosedReferredForAssessment:0,
                total:0
            };

            $scope.adultMI_EMPII = {
                yesAndBeingTreated:0,
                yesAndNotBeingTreated:0,
                yesAndReferredForAssessment:0,
                undiagnosedReferredForAssessment:0,
                total:0
            };

            $scope.adultMI_HomeSafe = {
                yesAndBeingTreated:0,
                yesAndNotBeingTreated:0,
                yesAndReferredForAssessment:0,
                undiagnosedReferredForAssessment:0,
                total:0
            };

            $scope.adultMI_HomeAgain = {
                yesAndBeingTreated:0,
                yesAndNotBeingTreated:0,
                yesAndReferredForAssessment:0,
                undiagnosedReferredForAssessment:0,
                total:0
            };

            $scope.adultMI_HomeFront = {
                yesAndBeingTreated:0,
                yesAndNotBeingTreated:0,
                yesAndReferredForAssessment:0,
                undiagnosedReferredForAssessment:0,
                total:0
            };

            $scope.adultMI_Total = 0;

            var responseArray = response

            for (var i = 0; i < responseArray.length; i++) {
                $scope.adultMI_Total += parseInt(responseArray[i].count);
                if (responseArray[i].Program == "EMP"){
                    if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and Being Treated"){
                        $scope.adultMI_EMP.yesAndBeingTreated += parseInt(responseArray[i].count);
                        $scope.adultMI_EMP.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES Not Being Treated"){
                        $scope.adultMI_EMP.yesAndNotBeingTreated += parseInt(responseArray[i].count);
                        $scope.adultMI_EMP.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and referred for assessment"){
                        $scope.adultMI_EMP.yesAndReferredForAssessment += parseInt(responseArray[i].count);
                        $scope.adultMI_EMP.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "Undiagnosed referred for assessment"){
                        $scope.adultMI_EMP.undiagnosedReferredForAssessment += parseInt(responseArray[i].count);
                        $scope.adultMI_EMP.total += parseInt(responseArray[i].count);
                    }
                }

                else if (responseArray[i].Program == "EMPII"){
                    if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and Being Treated"){
                        $scope.adultMI_EMPII.yesAndBeingTreated += parseInt(responseArray[i].count);
                        $scope.adultMI_EMPII.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES Not Being Treated"){
                        $scope.adultMI_EMPII.yesAndNotBeingTreated += parseInt(responseArray[i].count);
                        $scope.adultMI_EMPII.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and referred for assessment"){
                        $scope.adultMI_EMPII.yesAndReferredForAssessment += parseInt(responseArray[i].count);
                        $scope.adultMI_EMPII.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "Undiagnosed referred for assessment"){
                        $scope.adultMI_EMPII.undiagnosedReferredForAssessment += parseInt(responseArray[i].count);
                        $scope.adultMI_EMPII.total += parseInt(responseArray[i].count);
                    }
                }

                else if (responseArray[i].Program == "HomeSafe"||responseArray[i].Program == "Home Safe"){
                    if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and Being Treated"){
                        $scope.adultMI_HomeSafe.yesAndBeingTreated += parseInt(responseArray[i].count);
                        $scope.adultMI_HomeSafe.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES Not Being Treated"){
                        $scope.adultMI_HomeSafe.yesAndNotBeingTreated += parseInt(responseArray[i].count);
                        $scope.adultMI_HomeSafe.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and referred for assessment"){
                        $scope.adultMI_HomeSafe.yesAndReferredForAssessment += parseInt(responseArray[i].count);
                        $scope.adultMI_HomeSafe.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "Undiagnosed referred for assessment"){
                        $scope.adultMI_HomeSafe.undiagnosedReferredForAssessment += parseInt(responseArray[i].count);
                        $scope.adultMI_HomeSafe.total += parseInt(responseArray[i].count);
                    }
                }

                else if (responseArray[i].Program == "HomeAgain" || responseArray[i].Program == "Home Again"){
                    if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and Being Treated"){
                        $scope.adultMI_HomeAgain.yesAndBeingTreated += parseInt(responseArray[i].count);
                        $scope.adultMI_HomeAgain.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES Not Being Treated"){
                        $scope.adultMI_HomeAgain.yesAndNotBeingTreated += parseInt(responseArray[i].count);
                        $scope.adultMI_HomeAgain.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and referred for assessment"){
                        $scope.adultMI_HomeAgain.yesAndReferredForAssessment += parseInt(responseArray[i].count);
                        $scope.adultMI_HomeAgain.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "Undiagnosed referred for assessment"){
                        $scope.adultMI_HomeAgain.undiagnosedReferredForAssessment += parseInt(responseArray[i].count);
                        $scope.adultMI_HomeAgain.total += parseInt(responseArray[i].count);
                    }
                }

                else if (responseArray[i].Program == "HomeFront"|| responseArray[i].Program == "Home Front"){
                    if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and Being Treated"){
                        $scope.adultMI_HomeFront.yesAndBeingTreated += parseInt(responseArray[i].count);
                        $scope.adultMI_HomeFront.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES Not Being Treated"){
                        $scope.adultMI_HomeFront.yesAndNotBeingTreated += parseInt(responseArray[i].count);
                        $scope.adultMI_HomeFront.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "YES and referred for assessment"){
                        $scope.adultMI_HomeFront.yesAndReferredForAssessment += parseInt(responseArray[i].count);
                        $scope.adultMI_HomeFront.total += parseInt(responseArray[i].count);
                    }
                    else if(responseArray[i]["Is There a Diagnosed Mental Illness"] == "Undiagnosed referred for assessment"){
                        $scope.adultMI_HomeFront.undiagnosedReferredForAssessment += parseInt(responseArray[i].count);
                        $scope.adultMI_HomeFront.total += parseInt(responseArray[i].count);
                    }
                }
            }//end for for loop
            // console.log('test EMP', $scope.adultMI_EMP);
            // console.log('test EMPII', $scope.adultMI_EMPII);
            // console.log('test Safe', $scope.adultMI_HomeSafe);
            // console.log('test Again', $scope.adultMI_HomeAgain);
            // console.log('test Front', $scope.adultMI_HomeFront);
            // console.log('TOTAL', $scope.adultMI_Total);

        });  // end of adultMI


        $scope.outcomeFactory.budgetingEdu(selections).then(function(response) {
          console.log("response budgetingEdu: ", response);
          var responseArray = response;

          $scope.emp_budgetingEdu = {
              total: 0,
          };

          $scope.emptwo_budgetingEdu = {
              total: 0,
          };

          $scope.homeAgain_budgetingEdu = {
              total: 0,
          };

          $scope.homeSafe_budgetingEdu = {
              total: 0,
          };

          $scope.homeFront_budgetingEdu = {
              total: 0,
          };

          $scope.budgetingEdu_Total = 0;

          for (var i = 0; i < responseArray.length; i++) {
            $scope.budgetingEdu_Total += parseInt(responseArray[i].count);
            console.log("budgetingEdu_Total: ", $scope.budgetingEdu_Total);
              if(responseArray[i].Program == "EMP"){
                  // console.log("pre if", responseArray[i].count);
                  if(responseArray[i]['Budgeting Class'] === true){
                      $scope.emp_budgetingEdu.total += parseInt(responseArray[i].count);
                      console.log("emp budgetingEdu true: ", $scope.emp_budgetingEdu.total);
                  }
              }//end of EMP if
              else if(responseArray[i].Program == "EMPII"){
                  if(responseArray[i]['Budgeting Class'] === true){
                      $scope.emptwo_budgetingEdu.total += parseInt(responseArray[i].count);
                      console.log("empii budgetingEdu true", $scope.emptwo_budgetingEdu.total);
                  }
              }//end of empII
              else if(responseArray[i].Program == "HomeSafe"){
                  // console.log("whats going on here", responseArray[i]['Budgeting Class']);
                  if(responseArray[i]['Budgeting Class'] === true){
                      $scope.homeSafe_budgetingEdu.total += parseInt(responseArray[i].count);
                      console.log("home safe budgetingEdu true: ", $scope.homeSafe_budgetingEdu.total);
                  }
              }//end of HomeSafe
              else if(responseArray[i].Program == "Home Again"){
                  if(responseArray[i]['Budgeting Class'] === true){
                      $scope.homeAgain_budgetingEdu.total += parseInt(responseArray[i].count);
                      console.log("home again budgetingEdu true: ", $scope.homeAgain_budgetingEdu.total);
                  }
              }//end of Home Again
              else if(responseArray[i].Program == "HomeFront" || responseArray[i].Program == "Home Front"){
                  if(responseArray[i]['Budgeting Class'] === true){
                      $scope.homeFront_budgetingEdu.total += parseInt(responseArray[i].count);
                      console.log("home front budgetingEdu true: ", $scope.homeFront_budgetingEdu.total);
                  }
              }//end of homeFront
          }
        });  // end of budgetingEdu


        $scope.outcomeFactory.budgetingEduSameYear(selections).then(function(response) {
          console.log("response budgetingEduSameYear: ", response);
          var responseArray = response;

          $scope.emp_budgetingEduSameYear = {
              total: 0,
          };

          $scope.emptwo_budgetingEduSameYear = {
              total: 0,
          };

          $scope.homeAgain_budgetingEduSameYear = {
              total: 0,
          };

          $scope.homeSafe_budgetingEduSameYear = {
              total: 0,
          };

          $scope.homeFront_budgetingEduSameYear = {
              total: 0,
          };

          $scope.budgetingEduSameYear_Total = 0;

          for (var i = 0; i < responseArray.length; i++) {
            $scope.budgetingEduSameYear_Total += parseInt(responseArray[i]["Budgeting Completed"]);
              if(responseArray[i].Program == "EMP"){
                  $scope.emp_budgetingEduSameYear.total += parseInt(responseArray[i]["Budgeting Completed"]);
                  console.log("emp budgetingEduSameYear true: ", $scope.emp_budgetingEduSameYear.total);
              }//end of EMP if
              else if(responseArray[i].Program == "EMPII"){
                  $scope.emptwo_budgetingEduSameYear.total += parseInt(responseArray[i]["Budgeting Completed"]);
                  console.log("empii budgetingEduSameYear true", $scope.emptwo_budgetingEduSameYear.total);
              }//end of empII
              else if(responseArray[i].Program == "HomeSafe"){
                  $scope.homeSafe_budgetingEduSameYear.total += parseInt(responseArray[i]["Budgeting Completed"]);
                  console.log("home safe budgetingEduSameYear true: ", $scope.homeSafe_budgetingEduSameYear.total);
              }//end of HomeSafe
              else if(responseArray[i].Program == "Home Again"){
                  $scope.homeAgain_budgetingEduSameYear.total += parseInt(responseArray[i]["Budgeting Completed"]);
                  console.log("home again budgetingEduSameYear true: ", $scope.homeAgain_budgetingEduSameYear.total);
              }//end of Home Again
              else if(responseArray[i].Program == "HomeFront" || responseArray[i].Program == "Home Front"){
                  $scope.homeFront_budgetingEduSameYear.total += parseInt(responseArray[i]["Budgeting Completed"]);
                  console.log("home front budgetingEduSameYear true: ", $scope.homeFront_budgetingEduSameYear.total);
              }//end of homeFront
          }
          console.log("budgetingEduSameYear_Total: ", $scope.budgetingEduSameYear_Total);
        }); // end of budgetingEduSameYear


        $scope.outcomeFactory.budgetingEduYearBefore(selections).then(function(response) {
          console.log("response budgetingEduYearBefore: ", response);
            $scope.budgetingEduYearBefore = {
                emp: 0,
                emp2: 0,
                homeAgain: 0,
                homeSafe: 0,
                homeFront: 0,
                total: 0
            }
            var data = response;

            for(var i = 0; i < data.length; i++){
                var hasValue = parseInt(data[i]['Budgeting Completed']);
                var program = data[i].Program;
                    if (hasValue) {
                        if (program === "EMP") {
                            $scope.budgetingEduYearBefore.emp = hasValue;
                        }
                        if (program === "EMPII") {
                            $scope.budgetingEduYearBefore.emp2 = hasValue;
                        }
                        if (program === "HomeAgain" || program === "Home Again") {
                            $scope.budgetingEduYearBefore.homeAgain = hasValue;
                        }
                        if (program === "HomeSafe" || program === "Home Safe") {
                            $scope.budgetingEduYearBefore.homeSafe = hasValue;
                        }
                        if (program === "HomeFront" || program === "Home Front") {
                            $scope.budgetingEduYearBefore.homeFront = hasValue;
                        }
                    } // end of hasValue
            } // END OF FOR LOOP
            $scope.budgetingEduYearBefore.total = $scope.budgetingEduYearBefore.emp + $scope.budgetingEduYearBefore.emp2 + $scope.budgetingEduYearBefore.homeAgain + $scope.budgetingEduYearBefore.homeSafe + $scope.budgetingEduYearBefore.homeFront;
            console.log('$scope.budgetingEduYearBefore.emp', $scope.budgetingEduYearBefore.emp);
            console.log('$scope.budgetingEduYearBefore.emp2', $scope.budgetingEduYearBefore.emp2);
            console.log('$scope.budgetingEduYearBefore.homeAgain', $scope.budgetingEduYearBefore.homeAgain);
            console.log('$scope.budgetingEduYearBefore.homeSafe', $scope.budgetingEduYearBefore.homeSafe);
            console.log('$scope.budgetingEduYearBefore.homeFront', $scope.budgetingEduYearBefore.homeFront);
            console.log('$scope.budgetingEduYearBefore.total', $scope.budgetingEduYearBefore.total);
        });

        $scope.outcomeFactory.violence(selections).then(function(response) {
          console.log("response violence: ", response);
            var data = response;

            $scope.violentEmp = {
                yesWithSafety: 0,
                yesWithoutSafety: 0,
                total: 0
            };

            $scope.violentEmp2 = {
                yesWithSafety: 0,
                yesWithoutSafety: 0,
                total: 0
            };

            $scope.violentHomeFront = {
                yesWithSafety: 0,
                yesWithoutSafety: 0,
                total: 0
            };

            $scope.violentHomeSafe = {
                yesWithSafety: 0,
                yesWithoutSafety: 0,
                total: 0
            };

            $scope.violentHomeAgain = {
                yesWithSafety: 0,
                yesWithoutSafety: 0,
                total: 0
            };

            for (var i = 0; i < data.length; i++){

                if (data[i]['Program'] === "EMP") {
                    // EMP VIOLENT WITH SAFETY
                    if(data[i]['Has or Had experienced or at risk for violence'] === "YES with a written Safety Plan") {
                        // var empYesWithSafety = parseInt(data[i]['count']);
                        $scope.violentEmp.yesWithSafety += parseInt(data[i]['count']);
                        console.log('violent emp with safety scope', $scope.violentEmp.yesWithSafety);
                    }
                    if($scope.violentEmp.yesWithSafety === undefined) {
                        $scope.violentEmp.yesWithSafety = 0;
                    }

                    // EMP VIOLENT WITHOUT SAFETY
                    if(data[i]['Has or Had experienced or at risk for violence'] === "YES without a written Safety Plan") {
                        // var empYesWithoutSafety = parseInt(data[i]['count']);
                        $scope.violentEmp.yesWithoutSafety += parseInt(data[i]['count']);
                        console.log('violent emp without safety scope', $scope.violentEmp.yesWithoutSafety);
                    }
                    // if(empYesWithoutSafety === undefined) {
                    //     empYesWithoutSafety = 0;
                    // }
                    if($scope.violentEmp.yesWithoutSafety === undefined) {
                        $scope.violentEmp.yesWithoutSafety = 0;
                    }
                    // EMP TOTAL
                    $scope.violentEmp.total = $scope.violentEmp.yesWithoutSafety + $scope.violentEmp.yesWithSafety;


                    console.log('emp total', $scope.violentEmp.total);
                } // END OF EMP

                // EMP2 VIOLENT
                if (data[i]['Program'] === "EMPII") {
                    // EMP2 VIOLENT WITH SAFETY
                    if(data[i]['Has or Had experienced or at risk for violence'] === "YES with a written Safety Plan") {
                        var emp2YesWithSafety = parseInt(data[i]['count']);
                        $scope.violentEmp2.yesWithSafety += emp2YesWithSafety;
                        console.log('violent emp2 with safety scope', $scope.violentEmp2.yesWithSafety);
                    }
                    if(emp2YesWithSafety === undefined) {
                        emp2YesWithSafety = 0;
                    }

                    // EMP2 VIOLENT WITHOUT SAFETY
                    if(data[i]['Has or Had experienced or at risk for violence'] === "YES without a written Safety Plan") {
                        var emp2YesWithoutSafety = parseInt(data[i]['count']);
                        $scope.violentEmp2.yesWithoutSafety += emp2YesWithoutSafety;
                        console.log('violent emp2 without safety scope', $scope.violentEmp2.yesWithoutSafety);
                    }
                    if(emp2YesWithoutSafety === undefined) {
                        emp2YesWithoutSafety = 0;
                    }
                    // EMP2 TOTAL
                    $scope.violentEmp2.total = emp2YesWithSafety + emp2YesWithoutSafety;
                    // console.log(' addd emp and emp2', emp2YesWithSafety, emp2YesWithoutSafety);
                    console.log('emp2 total ', $scope.violentEmp2.total);
                } // END EMP2

                // HOMEFRONT VIOLENT
                if (data[i]['Program'] === "HomeFront" || data[i]['Program'] == "Home Front") {
                    // HOMEFRONT VIOLENT WITH SAFETY
                    if(data[i]['Has or Had experienced or at risk for violence'] === "YES with a written Safety Plan") {
                        var homefrontYesWithSafety = parseInt(data[i]['count']);
                        $scope.violentHomeFront.yesWithSafety += homefrontYesWithSafety;
                        console.log('violent HOMEFRONT with safety scope', $scope.violentHomeFront.yesWithSafety);
                    }
                    if(homefrontYesWithSafety === undefined) {
                        homefrontYesWithSafety = 0;
                    }

                    // HOMEFRONT VIOLENT WITHOUT SAFETY
                    if(data[i]['Has or Had experienced or at risk for violence'] === "YES without a written Safety Plan") {
                        var homefrontYesWithoutSafety = parseInt(data[i]['count']);
                        $scope.violentHomeFront.yesWithoutSafety += homefrontYesWithoutSafety;
                        console.log('violent HOMEFRONT without safety scope', $scope.violentHomeFront.yesWithoutSafety);
                    }
                    if(homefrontYesWithoutSafety === undefined) {
                        homefrontYesWithoutSafety = 0;
                    }
                    // HOMEFRONT TOTAL
                    $scope.violentHomeFront.total = homefrontYesWithSafety + homefrontYesWithoutSafety;
                    console.log('HOMEFRONT total', $scope.violentHomeFront.total);
                } // END OF HOMEFRONT

                // HOMESAFE VIOLENT
                if (data[i]['Program'] === "HomeFront" || data[i]['Program'] == "Home Front") {
                    // HOMESAFE VIOLENT WITH SAFETY
                    if(data[i]['Has or Had experienced or at risk for violence'] === "YES with a written Safety Plan") {
                        var homesafeYesWithSafety = parseInt(data[i]['count']);
                        $scope.violentHomeSafe.yesWithSafety += homesafeYesWithSafety;
                        console.log('violent HOMESAFE with safety scope', $scope.violentHomeSafe.yesWithSafety);
                    }
                    if(homesafeYesWithSafety === undefined) {
                        homesafeYesWithSafety = 0;
                    }

                    // HOMESAFE VIOLENT WITHOUT SAFETY
                    if(data[i]['Has or Had experienced or at risk for violence'] === "YES without a written Safety Plan") {
                        var homesafeYesWithoutSafety = parseInt(data[i]['count']);
                        $scope.violentHomeSafe.yesWithoutSafety += homesafeYesWithoutSafety;
                        console.log('violent HOMESAFE without safety scope', $scope.violentHomeSafe.yesWithoutSafety);
                    }
                    if(homesafeYesWithoutSafety === undefined) {
                        homesafeYesWithoutSafety = 0;
                    }
                    // HOMEFRONT TOTAL
                    $scope.violentHomeSafe.total = homesafeYesWithSafety + homesafeYesWithoutSafety;
                    console.log('HOMESAFE total', $scope.violentHomeSafe.total);
                } // END OF HOMESAFE

                // HOMEAGAIN VIOLENT
                if (data[i]['Program'] === "HomeAgain" || data[i]['Program'] == "Home Again") {
                    // HOMEAGAIN VIOLENT WITH SAFETY
                    if(data[i]['Has or Had experienced or at risk for violence'] === "YES with a written Safety Plan") {
                        var homeagainYesWithSafety = parseInt(data[i]['count']);
                        $scope.violentHomeAgain.yesWithSafety += homeagainYesWithSafety;
                        console.log('violent HOMEAGAIN with safety scope', $scope.violentHomeAgain.yesWithSafety);
                    }
                    if(homeagainYesWithSafety === undefined) {
                        homeagainYesWithSafety = 0;
                    }

                    // HOMEAGAIN VIOLENT WITHOUT SAFETY
                    if(data[i]['Has or Had experienced or at risk for violence'] === "YES without a written Safety Plan") {
                        var homeagainYesWithoutSafety = parseInt(data[i]['count']);
                        $scope.violentHomeAgain.yesWithoutSafety += homeagainYesWithoutSafety;
                        console.log('violent HOMEAGAIN without safety scope', $scope.violentHomeAgain.yesWithoutSafety);
                    }
                    if(homeagainYesWithoutSafety === undefined) {
                        homeagainYesWithoutSafety = 0;
                    }
                    // HOMEFRONT TOTAL
                    $scope.violentHomeAgain.total = homeagainYesWithSafety + homesafeYesWithoutSafety;
                    console.log('HOMEAGAIN total', $scope.violentHomeAgain.total);
                } // END OF HOMEAGAIN

            } // END OF FOR LOOP

        });

        $scope.outcomeFactory.tenantTraining(selections).then(function(response) {
          console.log("response tenantTraining: ", response);
            var data = response;
            $scope.tenantTraining = {
                emp: 0,
                emp2: 0,
                homeSafe: 0,
                homeAgain: 0,
                homeFront: 0,
                total: 0
            };

            for (var i = 0; i < data.length; i++) {
                var hasValue = data[i]['Tenant Training'];
                var hasCount = parseInt(data[i]['count']);
                var program = data[i].Program;

                if(hasCount) {
                    if(program === "EMP" && hasValue === true) {
                        $scope.tenantTraining.emp = hasCount;
                    }
                    if(program === "EMPII" && hasValue === true) {
                        $scope.tenantTraining.emp2 = hasCount;
                    }
                    if(program === "HomeSafe" || program === "Home Safe" && hasValue === true) {
                        $scope.tenantTraining.homeSafe = hasCount;
                    }
                    if(program === "HomeAgain" || program === "Home Again" && hasValue === true) {
                        $scope.tenantTraining.homeAgain = hasCount;
                    }
                    if(program === "HomeFront" || program === "Home Front" && hasValue === true) {
                        $scope.tenantTraining.homeFront = hasCount;
                    }
                } // END OF hasCount
            } // END OF FOR LOOP
            $scope.tenantTraining.total = $scope.tenantTraining.emp + $scope.tenantTraining.emp2 + $scope.tenantTraining.homeSafe + $scope.tenantTraining.homeAgain + $scope.tenantTraining.homeFront;
            console.log('$scope.tenantTraining.emp ', $scope.tenantTraining.emp);
            console.log('$scope.tenantTraining.emp2 ', $scope.tenantTraining.emp2);
            console.log('$scope.tenantTraining.homeSafe ', $scope.tenantTraining.homeSafe);
            console.log('$scope.tenantTraining.homeAgain ', $scope.tenantTraining.homeAgain);
            console.log('$scope.tenantTraining.homeFront ', $scope.tenantTraining.homeFront);
            console.log('$scope.tenantTraining.total ', $scope.tenantTraining.total);
        });

        $scope.outcomeFactory.tenantTrainingSameYear(selections).then(function(response) {
          console.log("response tenantTrainingSameYear: ", response);
            $scope.tenantTrainingSameYear = {
                emp: 0,
                emp2: 0,
                homeSafe: 0,
                homeAgain: 0,
                homeFront: 0,
                total: 0
            };
            var data = response;
            for(var i = 0; i < data.length; i++) {
                var hasValue = parseInt(data[i]['Tenant Training Completed']);

                if (hasValue) {
                    // EMP
                    if (data[i].Program === "EMP") {
                        $scope.tenantTrainingSameYear.emp = hasValue;
                    }

                    // EMPII
                    if (data[i].Program === "EMPII") {
                        $scope.tenantTrainingSameYear.emp2 = hasValue;
                    }

                    // HOMEAGAIN
                    if (data[i].Program === "Home Again" || data[i].Program === "HomeAgain") {
                        $scope.tenantTrainingSameYear.homeAgain = hasValue;
                    }

                    // HOMESAFE
                    if (data[i].Program === "HomeSafe" || data[i].Program === "Home Safe") {
                        $scope.tenantTrainingSameYear.homeSafe = hasValue;
                    }

                    // HOMEFRONT
                    if (data[i].Program === "HomeFront" || data[i].Program === "Home Front") {
                        $scope.tenantTrainingSameYear.homeFront = hasValue;
                    }
                }

            }
            console.log('$scope.tenantTrainingSameYear.empComplete', $scope.tenantTrainingSameYear.emp);
            console.log('$scope.tenantTrainingSameYear.emp2Complete', $scope.tenantTrainingSameYear.emp2);
            console.log('$scope.tenantTrainingSameYear.homeagainComplete', $scope.tenantTrainingSameYear.homeAgain);
            console.log('$scope.tenantTrainingSameYear.homefrontComplete', $scope.tenantTrainingSameYear.homeFront);
            console.log('$scope.tenantTrainingSameYear.homesafeComplete', $scope.tenantTrainingSameYear.homeSafe);
            $scope.tenantTrainingSameYear.total = $scope.tenantTrainingSameYear.emp + $scope.tenantTrainingSameYear.emp2 + $scope.tenantTrainingSameYear.homeFront + $scope.tenantTrainingSameYear.homeSafe + $scope.tenantTrainingSameYear.homeAgain;
            console.log('total tenant training ', $scope.tenantTrainingSameYear.total);
        });

        $scope.outcomeFactory.tenantTrainingPriorYear(selections).then(function(response) {
          console.log("response tenantTrainingPriorYear: ", response);
            var data = response;
            $scope.tenantTrainingPriorYear = {
                emp: 0,
                emp2: 0,
                homeAgain: 0,
                homeFront: 0,
                homeSafe:0,
                total:0
            };

            for (var i= 0; i < data.length; i++) {
                var hasCount = parseInt(data[i]['Tenant Training Completed']);
                var program = data[i].Program;

                if (hasCount) {
                    if (program === "EMP") {
                        $scope.tenantTrainingPriorYear.emp = hasCount;
                    }
                    if (program === "EMPII") {
                        $scope.tenantTrainingPriorYear.emp2 = hasCount;
                    }
                    if (program === "HomeSafe" || program === "Home Safe") {
                        $scope.tenantTrainingPriorYear.homeSafe = hasCount;
                    }
                    if (program === "HomeAgain" || program === "Home Again") {
                        $scope.tenantTrainingPriorYear.homeAgain = hasCount;
                    }
                    if (program === "HomeFront" || program === "Home Front") {
                        $scope.tenantTrainingPriorYear.homeFront = hasCount;
                    }
                }
            } // END OF FOR LOOP

            $scope.tenantTrainingPriorYear.total = $scope.tenantTrainingPriorYear.emp + $scope.tenantTrainingPriorYear.emp2 + $scope.tenantTrainingPriorYear.homeSafe + $scope.tenantTrainingPriorYear.homeAgain + $scope.tenantTrainingPriorYear.homeFront;
            console.log('$scope.tenantTrainingPriorYear.emp ', $scope.tenantTrainingPriorYear.emp);
            console.log('$scope.tenantTrainingPriorYear.emp2 ', $scope.tenantTrainingPriorYear.emp2);
            console.log('$scope.tenantTrainingPriorYear.homeSafe ', $scope.tenantTrainingPriorYear.homeSafe);
            console.log('$scope.tenantTrainingPriorYear.homeAgain ' , $scope.tenantTrainingPriorYear.homeAgain);
            console.log('$scope.tenantTrainingPriorYear.homeFront ', $scope.tenantTrainingPriorYear.homeFront);
            console.log('$scope.tenantTrainingPriorYear.total ', $scope.tenantTrainingPriorYear.total);
        });

        $scope.outcomeFactory.dbt(selections).then(function(response) {
          console.log("response dbt: ", response);
        });
        $scope.outcomeFactory.DBTsameyear(selections).then(function(response) {
          console.log("response DBTsameyear: ", response);
        });
        $scope.outcomeFactory.DBTprioryear(selections).then(function(response) {
          console.log("response DBTprioryear: ", response);
        });
        $scope.outcomeFactory.healthImproved(selections).then(function(response) {
          console.log("response healthImproved: ", response);
        });

        $scope.outcomeFactory.socialSupport(selections).then(function(response) {
          console.log("response socialSupport: ", response);
          $scope.socialEMP = {
            totalPeople:0
          };

          $scope.socialEMPII = {
            totalPeople:0
          };

          $scope.socialHomeFront = {
            totalPeople:0
          };

          $scope.socialHomeAgain = {
            totalPeople:0
          };

          $scope.socialHomeSafe = {
            totalPeople:0
          };

          var responseArray = response;
          for (var i = 0; i < responseArray.length; i++) {
            if(responseArray[i].Program == "EMP"){
              if(responseArray[i]["Increased their Social Support"]=== true){
                $scope.socialEMP.totalPeople += parseInt(responseArray[i].count)
              }
            }
            else if(responseArray[i].Program == "EMPII"){
              if(responseArray[i]["Increased their Social Support"]=== true){
                $scope.socialEMPII.totalPeople += parseInt(responseArray[i].count)
              }
            }
            else if(responseArray[i].Program == "HomeFront"||responseArray[i].Program == "Home Front"){
              if(responseArray[i]["Increased their Social Support"]=== true){
                $scope.socialHomeFront.totalPeople += parseInt(responseArray[i].count)
              }
            }
            else if(responseArray[i].Program == "HomeSafe"||responseArray[i].Program == "Home Safe"){
              if(responseArray[i]["Increased their Social Support"]=== true){
                $scope.socialHomeSafe.totalPeople += parseInt(responseArray[i].count)
              }
            }
            else if(responseArray[i].Program == "HomeAgain"||responseArray[i].Program == "Home Again"){
              if(responseArray[i]["Increased their Social Support"]=== true){
                $scope.socialHomeAgain.totalPeople += parseInt(responseArray[i].count)
              }
            }
          }//end of for loop
          console.log('test for EMP', $scope.socialEMP);
          console.log('test for EMPII', $scope.socialEMPII);
          console.log('test for HomeAgain', $scope.socialHomeAgain);
          console.log('test for HomeFront', $scope.socialHomeFront);
          console.log('test for HomeSafe', $scope.socialHomeSafe);
        });//end of socialsupport function
        //complete

        $scope.outcomeFactory.selfGoals(selections).then(function(response) {
          console.log("response selfGoals: ", response);
            $scope.selfGoalsEMP = {
              totalPeople:0
            };

            $scope.selfGoalsEMPII = {
              totalPeople:0
            };

            $scope.selfGoalsHomeFront = {
              totalPeople:0
            };

            $scope.selfGoalsHomeAgain = {
              totalPeople:0
            };

            $scope.selfGoalsHomeSafe = {
              totalPeople:0
            };

            var responseArray = response;
            for (var i = 0; i < responseArray.length; i++) {
              if(responseArray[i].Program == "EMP"){
                if(responseArray[i]["Progressed on a Self-Defined Goal"]=== true){
                  $scope.selfGoalsEMP.totalPeople += parseInt(responseArray[i].count)
                }
              }
              else if(responseArray[i].Program == "EMPII"){
                if(responseArray[i]["Progressed on a Self-Defined Goal"]=== true){
                  $scope.selfGoalsEMPII.totalPeople += parseInt(responseArray[i].count)
                }
              }
              else if(responseArray[i].Program == "HomeFront"||responseArray[i].Program == "Home Front"){
                if(responseArray[i]["Progressed on a Self-Defined Goal"]=== true){
                  $scope.selfGoalsHomeFront.totalPeople += parseInt(responseArray[i].count)
                }
              }
              else if(responseArray[i].Program == "HomeSafe"||responseArray[i].Program == "Home Safe"){
                if(responseArray[i]["Progressed on a Self-Defined Goal"]=== true){
                  $scope.selfGoalsHomeSafe.totalPeople += parseInt(responseArray[i].count)
                }
              }
              else if(responseArray[i].Program == "HomeAgain"||responseArray[i].Program == "Home Again"){
                if(responseArray[i]["Progressed on a Self-Defined Goal"]=== true){
                  $scope.selfGoalsHomeAgain.totalPeople += parseInt(responseArray[i].count)
                }
              }
            }//end of for loop
            console.log('test for EMP', $scope.selfGoalsEMP);
            console.log('test for EMPII', $scope.selfGoalsEMPII);
            console.log('test for HomeAgain', $scope.selfGoalsHomeAgain);
            console.log('test for HomeFront', $scope.selfGoalsHomeFront);
            console.log('test for HomeSafe', $scope.selfGoalsHomeSafe);
        });


        $scope.isActive = false;

        $scope.outcomeFactory.dbt(selections).then(function(response) {
          console.log("response dbt: ", response);
          var responseArray = response;
      $scope.empDbt = {
          total: 0,
      };
      $scope.emptwoDbt = {
          total: 0,
      };
      $scope.homeAgainDbt = {
          total: 0,
      };
      $scope.homeSafeDbt = {
          total: 0,
      };
      $scope.homeFrontDbt = {
          total: 0,
      };

      $scope.dbt_Total = 0;

      for (var i = 0; i < responseArray.length; i++) {
          $scope.dbt_Total += responseArray[i].count;

          if(responseArray[i].Program == "EMP"){
                  $scope.empDbt.total += parseInt(responseArray[i].count);
                  console.log("emp DBT", $scope.empDbt.total);
          }//end of EMP if
          else if(responseArray[i].Program == "EMPII"){
                  $scope.emptwoDbt.total += parseInt(responseArray[i].count);
                  console.log("empii DBT", $scope.emptwoDbt.total);
          }//end of empII
          else if(responseArray[i].Program == "Home Again"){
                  $scope.homeAgainDbt.total += parseInt(responseArray[i].count);
                  console.log("home again DBT", $scope.homeAgainDbt.total);
          }//end of HomeSafe
          else if(responseArray[i].Program == "HomeSafe"){
                  $scope.homeSafeDbt.total += parseInt(responseArray[i].count);
                  console.log("home saft DBT", $scope.homeSafeDbt.total);
          }//end of Home Again
          else if(responseArray[i].Program == "HomeFront" || responseArray[i].Program == "Home Front"){
                  $scope.homeFrontDbt.total += parseInt(responseArray[i].count);
                  console.log("home front DBT", $scope.homeFrontDbt.total);
          }//end of homeFront
      }
        });
        $scope.outcomeFactory.DBTsameyear(selections).then(function(response) {
          console.log("response DBTsameyear: ", response);
          var responseArray = response;
            $scope.empDbtSameYear = {
                total: 0,
            };
            $scope.emptwoDbtSameYear = {
                total: 0,
            };
            $scope.homeAgainDbtSameYear = {
                total: 0,
            };
            $scope.homeSafeDbtSameYear = {
                total: 0,
            };
            $scope.homeFrontDbtSameYear = {
                total: 0,
            };

            $scope.dbtSameYear_Total = 0;

            for (var i = 0; i < responseArray.length; i++) {
                $scope.dbtSameYear_Total += responseArray[i]["DBT Completed"];

                if(responseArray[i].Program == "EMP"){
                        $scope.empDbtSameYear.total += parseInt(responseArray[i]["DBT Completed"]);
                        console.log("emp DBT Same Year", $scope.empDbtSameYear.total);
                }//end of EMP if
                else if(responseArray[i].Program == "EMPII"){
                        $scope.emptwoDbtSameYear.total += parseInt(responseArray[i]["DBT Completed"]);
                        console.log("empii DBT Same Year", $scope.emptwoDbtSameYear.total);
                }//end of empII
                else if(responseArray[i].Program == "Home Again"){
                        $scope.homeAgainDbtSameYear.total += parseInt(responseArray[i]["DBT Completed"]);
                        console.log("home again DBT Same Year", $scope.homeAgainDbtSameYear.total);
                }//end of HomeSafe
                else if(responseArray[i].Program == "HomeSafe"){
                        $scope.homeSafeDbtSameYear.total += parseInt(responseArray[i]["DBT Completed"]);
                        console.log("home saft DBT Same Year", $scope.homeSafeDbtSameYear.total);
                }//end of Home Again
                else if(responseArray[i].Program == "HomeFront" || responseArray[i].Program == "Home Front"){
                        $scope.homeFrontDbtSameYear.total += parseInt(responseArray[i]["DBT Completed"]);
                        console.log("home front DBT Same Year", $scope.homeFrontDbtSameYear.total);
                }//end of homeFront
            }
        });
        $scope.outcomeFactory.DBTprioryear(selections).then(function(response) {
          console.log("response DBTprioryear: ", response);
          var responseArray = response;
          $scope.empDbtPriorYear = {
              total: 0,
          };
          $scope.emptwoDbtPriorYear = {
              total: 0,
          };
          $scope.homeAgainDbtPriorYear = {
              total: 0,
          };
          $scope.homeSafeDbtPriorYear = {
              total: 0,
          };
          $scope.homeFrontDbtPriorYear = {
              total: 0,
          };

          $scope.dbtPriorYear_Total = 0;

          for (var i = 0; i < responseArray.length; i++) {
              $scope.dbtPriorYear_Total += responseArray[i]["DBT Completed"];

              if(responseArray[i].Program == "EMP"){
                      $scope.empDbtPriorYear.total += parseInt(responseArray[i]["DBT Completed"]);
                      console.log("emp DBT Prior Year", $scope.empDbtPriorYear.total);
              }//end of EMP if
              else if(responseArray[i].Program == "EMPII"){
                      $scope.emptwoDbtPriorYear.total += parseInt(responseArray[i]["DBT Completed"]);
                      console.log("empii DBT Prior Year", $scope.emptwoDbtPriorYear.total);
              }//end of empII
              else if(responseArray[i].Program == "Home Again"){
                      $scope.homeAgainDbtPriorYear.total += parseInt(responseArray[i]["DBT Completed"]);
                      console.log("home again DBT Prior Year", $scope.homeAgainDbtPriorYear.total);
              }//end of HomeSafe
              else if(responseArray[i].Program == "HomeSafe"){
                      $scope.homeSafeDbtPriorYear.total += parseInt(responseArray[i]["DBT Completed"]);
                      console.log("home saft DBT Prior Year", $scope.homeSafeDbtPriorYear.total);
              }//end of Home Again
              else if(responseArray[i].Program == "HomeFront" || responseArray[i].Program == "Home Front"){
                      $scope.homeFrontDbtPriorYear.total += parseInt(responseArray[i]["DBT Completed"]);
                      console.log("home front DBT Prior Year", $scope.homeFrontDbtPriorYear.total);
              }//end of homeFront
          }
        });
        $scope.outcomeFactory.healthImproved(selections).then(function(response) {
          console.log("response healthImproved: ", response);
          var responseArray = response;

          $scope.empHealthImp = {
              adultsHaveRuleAs: 0,
              adultsCdTreatment: 0,
              adultsSelfHelp: 0,
              sobrietyNinety: 0,
              sobrietySixMo: 0,
              sobrietyTwelvePlus: 0,
              abusedAndAchivedSobriety: 0,
              total: 0
          };

          $scope.emptwoHealthImp = {
            adultsHaveRuleAs: 0,
            adultsCdTreatment: 0,
            adultsSelfHelp: 0,
            sobrietyNinety: 0,
            sobrietySixMo: 0,
            sobrietyTwelvePlus: 0,
            abusedAndAchivedSobriety: 0,
            total: 0
          };

          $scope.homeAgainHealthImp = {
            adultsHaveRuleAs: 0,
            adultsCdTreatment: 0,
            adultsSelfHelp: 0,
            sobrietyNinety: 0,
            sobrietySixMo: 0,
            sobrietyTwelvePlus: 0,
            abusedAndAchivedSobriety: 0,
            total: 0
          };

          $scope.homeSafeHealthImp = {
            adultsHaveRuleAs: 0,
            adultsCdTreatment: 0,
            adultsSelfHelp: 0,
            sobrietyNinety: 0,
            sobrietySixMo: 0,
            sobrietyTwelvePlus: 0,
            abusedAndAchivedSobriety: 0,
            total: 0
          };

          $scope.homeFrontHealthImp = {
            adultsHaveRuleAs: 0,
            adultsCdTreatment: 0,
            adultsSelfHelp: 0,
            sobrietyNinety: 0,
            sobrietySixMo: 0,
            sobrietyTwelvePlus: 0,
            abusedAndAchivedSobriety: 0,
            total: 0
          };

          for (var i = 0; i < responseArray.length; i++) {
          if (responseArray[i].Program == "EMP"){
          if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc)"){
          $scope.empHealthImp.total ++;
          $scope.empHealthImp.adultsSelfHelp ++;
          } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Attended Treatment;Had a Rule 25 Assessment during report year"){
          $scope.empHealthImp.total ++;
          $scope.empHealthImp.adultsSelfHelp ++;
          $scope.empHealthImp.adultsCdTreatment ++;
          $scope.empHealthImp.adultsHaveRuleAs ++;
          } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Attended Treatment;Had a Rule 25 Assessment during report year;Maintained Soberity for past 12+ months;Maintained Sobriety for the past 6 months"){
          $scope.empHealthImp.total ++;
          $scope.empHealthImp.adultsSelfHelp ++;
          $scope.empHealthImp.adultsCdTreatment ++;
          $scope.empHealthImp.adultsHaveRuleAs ++;
          $scope.empHealthImp.sobrietyTwelvePlus ++;
          } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Attended Treatment;Had a Rule 25 Assessment during report year;Maintained Sobriety for past 90 days"){
          $scope.empHealthImp.total ++;
          $scope.empHealthImp.adultsSelfHelp ++;
          $scope.empHealthImp.adultsCdTreatment ++;
          $scope.empHealthImp.adultsHaveRuleAs ++;
          $scope.empHealthImp.sobrietyNinety ++;
          } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Attended Treatment;Had a Rule 25 Assessment during report year;Maintained Sobriety for the past 6 months"){
          $scope.empHealthImp.total ++;
          $scope.empHealthImp.adultsSelfHelp ++;
          $scope.empHealthImp.adultsCdTreatment ++;
          $scope.empHealthImp.adultsHaveRuleAs ++;
          $scope.empHealthImp.sobrietySixMo ++;
          } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Attended Treatment;Maintained Sobriety for past 90 days"){
          $scope.empHealthImp.total ++;
          $scope.empHealthImp.adultsSelfHelp ++;
          $scope.empHealthImp.adultsCdTreatment ++;
          $scope.empHealthImp.sobrietyNinety ++;
          } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Had a Rule 25 Assessment during report year"){
          $scope.empHealthImp.total ++;
          $scope.empHealthImp.adultsSelfHelp ++;
          $scope.empHealthImp.adultsHaveRuleAs ++;
          } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Maintained Soberity for past 12+ months"){
          $scope.empHealthImp.total ++;
          $scope.empHealthImp.adultsSelfHelp ++;
          $scope.empHealthImp.sobrietyTwelvePlus ++;
          } else if(responseArray[i]["Has Health Improved"] == "Attended Treatment"){
          $scope.empHealthImp.total ++;
          $scope.empHealthImp.adultsCdTreatment ++;
          } else if(responseArray[i]["Has Health Improved"] == "Attended Treatment;Had a Rule 25 Assessment during report year"){
          $scope.empHealthImp.total ++;
          $scope.empHealthImp.adultsCdTreatment ++;
          $scope.empHealthImp.adultsHaveRuleAs ++;
          } else if(responseArray[i]["Has Health Improved"] == "Attended Treatment;Had a Rule 25 Assessment during report year;Maintained Sobriety for past 90 days"){
          $scope.empHealthImp.total ++;
          $scope.empHealthImp.adultsCdTreatment ++;
          $scope.empHealthImp.adultsHaveRuleAs ++;
          $scope.empHealthImp.sobrietyNinety ++;
          } else if(responseArray[i]["Has Health Improved"] == "Attended Treatment;Had a Rule 25 Assessment during report year;Maintained Sobriety for the past 6 months"){
          $scope.empHealthImp.total ++;
          $scope.empHealthImp.adultsCdTreatment ++;
          $scope.empHealthImp.adultsHaveRuleAs ++;
          $scope.empHealthImp.sobrietySixMo ++;
          } else if(responseArray[i]["Has Health Improved"] == "Had a Rule 25 Assessment during report year"){
          $scope.empHealthImp.total ++;
          $scope.empHealthImp.adultsHaveRuleAs ++;
          } else if(responseArray[i]["Has Health Improved"] == "Had a Rule 25 Assessment during report year;Maintained Sobriety for the past 6 months"){
          $scope.empHealthImp.total ++;
          $scope.empHealthImp.adultsHaveRuleAs ++;
          $scope.empHealthImp.sobrietySixMo ++;
          } else if(responseArray[i]["Has Health Improved"] == "Maintained Soberity for past 12+ months"){
          $scope.empHealthImp.total ++;
          $scope.empHealthImp.sobrietyTwelvePlus ++;
          } else if(responseArray[i]["Has Health Improved"] == "Maintained Sobriety for past 90 days"){
          $scope.empHealthImp.total ++;
          $scope.empHealthImp.sobrietyNinety ++;
          } else if(responseArray[i]["Has Health Improved"] == "Maintained Sobriety for the past 6 months"){
          $scope.empHealthImp.total ++;
          $scope.empHealthImp.sobrietySixMo ++;
          }// end of emp

        } else if (responseArray[i].Program == "EMPII"){
          if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc)"){
          $scope.emptwoHealthImp.total ++;
          $scope.emptwoHealthImp.adultsSelfHelp ++;
          } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Attended Treatment;Had a Rule 25 Assessment during report year"){
          $scope.emptwoHealthImp.total ++;
          $scope.emptwoHealthImp.adultsSelfHelp ++;
          $scope.emptwoHealthImp.adultsCdTreatment ++;
          $scope.emptwoHealthImp.adultsHaveRuleAs ++;
          } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Attended Treatment;Had a Rule 25 Assessment during report year;Maintained Soberity for past 12+ months;Maintained Sobriety for the past 6 months"){
          $scope.emptwoHealthImp.total ++;
          $scope.emptwoHealthImp.adultsSelfHelp ++;
          $scope.emptwoHealthImp.adultsCdTreatment ++;
          $scope.emptwoHealthImp.adultsHaveRuleAs ++;
          $scope.emptwoHealthImp.sobrietyTwelvePlus ++;
          } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Attended Treatment;Had a Rule 25 Assessment during report year;Maintained Sobriety for past 90 days"){
          $scope.emptwoHealthImp.total ++;
          $scope.emptwoHealthImp.adultsSelfHelp ++;
          $scope.emptwoHealthImp.adultsCdTreatment ++;
          $scope.emptwoHealthImp.adultsHaveRuleAs ++;
          $scope.emptwoHealthImp.sobrietyNinety ++;
          } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Attended Treatment;Had a Rule 25 Assessment during report year;Maintained Sobriety for the past 6 months"){
          $scope.emptwoHealthImp.total ++;
          $scope.emptwoHealthImp.adultsSelfHelp ++;
          $scope.emptwoHealthImp.adultsCdTreatment ++;
          $scope.emptwoHealthImp.adultsHaveRuleAs ++;
          $scope.emptwoHealthImp.sobrietySixMo ++;
          } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Attended Treatment;Maintained Sobriety for past 90 days"){
          $scope.emptwoHealthImp.total ++;
          $scope.emptwoHealthImp.adultsSelfHelp ++;
          $scope.emptwoHealthImp.sobrietyNinety ++;
          $scope.emptwoHealthImp.adultsCdTreatment ++;
          } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Had a Rule 25 Assessment during report year"){
          $scope.emptwoHealthImp.total ++;
          $scope.emptwoHealthImp.adultsSelfHelp ++;
          $scope.emptwoHealthImp.adultsHaveRuleAs ++;
          } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Maintained Soberity for past 12+ months"){
          $scope.emptwoHealthImp.total ++;
          $scope.emptwoHealthImp.adultsSelfHelp ++;
          $scope.emptwoHealthImp.sobrietyTwelvePlus ++;
          } else if(responseArray[i]["Has Health Improved"] == "Attended Treatment"){
          $scope.emptwoHealthImp.total ++;
          $scope.emptwoHealthImp.adultsCdTreatment ++;
          } else if(responseArray[i]["Has Health Improved"] == "Attended Treatment;Had a Rule 25 Assessment during report year"){
          $scope.emptwoHealthImp.total ++;
          $scope.emptwoHealthImp.adultsCdTreatment ++;
          $scope.emptwoHealthImp.adultsHaveRuleAs ++;
          } else if(responseArray[i]["Has Health Improved"] == "Attended Treatment;Had a Rule 25 Assessment during report year;Maintained Sobriety for past 90 days"){
          $scope.emptwoHealthImp.total ++;
          $scope.emptwoHealthImp.adultsCdTreatment ++;
          $scope.emptwoHealthImp.adultsHaveRuleAs ++;
          $scope.emptwoHealthImp.sobrietyNinety ++;
          } else if(responseArray[i]["Has Health Improved"] == "Attended Treatment;Had a Rule 25 Assessment during report year;Maintained Sobriety for the past 6 months"){
          $scope.emptwoHealthImp.total ++;
          $scope.emptwoHealthImp.adultsCdTreatment ++;
          $scope.emptwoHealthImp.adultsHaveRuleAs ++;
          $scope.emptwoHealthImp.sobrietySixMo ++;
          } else if(responseArray[i]["Has Health Improved"] == "Had a Rule 25 Assessment during report year"){
          $scope.emptwoHealthImp.total ++;
          $scope.emptwoHealthImp.adultsHaveRuleAs ++;
          } else if(responseArray[i]["Has Health Improved"] == "Had a Rule 25 Assessment during report year;Maintained Sobriety for the past 6 months"){
          $scope.emptwoHealthImp.total ++;
          $scope.emptwoHealthImp.adultsHaveRuleAs ++;
          $scope.emptwoHealthImp.sobrietySixMo ++;
          } else if(responseArray[i]["Has Health Improved"] == "Maintained Soberity for past 12+ months"){
          $scope.emptwoHealthImp.total ++;
          $scope.emptwoHealthImp.sobrietyTwelvePlus ++;
          } else if(responseArray[i]["Has Health Improved"] == "Maintained Sobriety for past 90 days"){
          $scope.emptwoHealthImp.total ++;
          $scope.emptwoHealthImp.sobrietyNinety ++;
          } else if(responseArray[i]["Has Health Improved"] == "Maintained Sobriety for the past 6 months"){
          $scope.emptwoHealthImp.total ++;
          $scope.emptwoHealthImp.sobrietySixMo ++;
          }  //end of empII
      } else if (responseArray[i].Program == "Home Again"){
          if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc)"){
          $scope.homeAgainHealthImp.total ++;
          $scope.homeAgainHealthImp.adultsSelfHelp ++;
          } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Attended Treatment;Had a Rule 25 Assessment during report year"){
          $scope.homeAgainHealthImp.total ++;
          $scope.homeAgainHealthImp.adultsSelfHelp ++;
          $scope.homeAgainHealthImp.adultsCdTreatment ++;
          $scope.homeAgainHealthImp.adultsHaveRuleAs ++;
          } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Attended Treatment;Had a Rule 25 Assessment during report year;Maintained Soberity for past 12+ months;Maintained Sobriety for the past 6 months"){
          $scope.homeAgainHealthImp.total ++;
          $scope.homeAgainHealthImp.adultsSelfHelp ++;
          $scope.homeAgainHealthImp.adultsCdTreatment ++;
          $scope.homeAgainHealthImp.adultsHaveRuleAs ++;
          $scope.homeAgainHealthImp.sobrietyTwelvePlus ++;
          } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Attended Treatment;Had a Rule 25 Assessment during report year;Maintained Sobriety for past 90 days"){
          $scope.homeAgainHealthImp.total ++;
          $scope.homeAgainHealthImp.adultsSelfHelp ++;
          $scope.homeAgainHealthImp.adultsCdTreatment ++;
          $scope.homeAgainHealthImp.adultsHaveRuleAs ++;
          $scope.homeAgainHealthImp.sobrietyNinety ++;
          } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Attended Treatment;Had a Rule 25 Assessment during report year;Maintained Sobriety for the past 6 months"){
          $scope.homeAgainHealthImp.total ++;
          $scope.homeAgainHealthImp.adultsSelfHelp ++;
          $scope.homeAgainHealthImp.adultsCdTreatment ++;
          $scope.homeAgainHealthImp.adultsHaveRuleAs ++;
          $scope.homeAgainHealthImp.sobrietySixMo ++;
          } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Attended Treatment;Maintained Sobriety for past 90 days"){
          $scope.homeAgainHealthImp.total ++;
          $scope.homeAgainHealthImp.adultsSelfHelp ++;
          $scope.homeAgainHealthImp.sobrietyNinety ++;
          $scope.homeAgainHealthImp.adultsCdTreatment ++;
          } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Had a Rule 25 Assessment during report year"){
          $scope.homeAgainHealthImp.total ++;
          $scope.homeAgainHealthImp.adultsSelfHelp ++;
          $scope.homeAgainHealthImp.adultsHaveRuleAs ++;
          } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Maintained Soberity for past 12+ months"){
          $scope.homeAgainHealthImp.total ++;
          $scope.homeAgainHealthImp.adultsSelfHelp ++;
          $scope.homeAgainHealthImp.sobrietyTwelvePlus ++;
          } else if(responseArray[i]["Has Health Improved"] == "Attended Treatment"){
          $scope.homeAgainHealthImp.total ++;
          $scope.homeAgainHealthImp.adultsCdTreatment ++;
          } else if(responseArray[i]["Has Health Improved"] == "Attended Treatment;Had a Rule 25 Assessment during report year"){
          $scope.homeAgainHealthImp.total ++;
          $scope.homeAgainHealthImp.adultsCdTreatment ++;
          $scope.homeAgainHealthImp.adultsHaveRuleAs ++;
          } else if(responseArray[i]["Has Health Improved"] == "Attended Treatment;Had a Rule 25 Assessment during report year;Maintained Sobriety for past 90 days"){
          $scope.homeAgainHealthImp.total ++;
          $scope.homeAgainHealthImp.adultsCdTreatment ++;
          $scope.homeAgainHealthImp.adultsHaveRuleAs ++;
          $scope.homeAgainHealthImp.sobrietyNinety ++;
          } else if(responseArray[i]["Has Health Improved"] == "Attended Treatment;Had a Rule 25 Assessment during report year;Maintained Sobriety for the past 6 months"){
          $scope.homeAgainHealthImp.total ++;
          $scope.homeAgainHealthImp.adultsCdTreatment ++;
          $scope.homeAgainHealthImp.adultsHaveRuleAs ++;
          $scope.homeAgainHealthImp.sobrietySixMo ++;
          } else if(responseArray[i]["Has Health Improved"] == "Had a Rule 25 Assessment during report year"){
          $scope.homeAgainHealthImp.total ++;
          $scope.homeAgainHealthImp.adultsHaveRuleAs ++;
          } else if(responseArray[i]["Has Health Improved"] == "Had a Rule 25 Assessment during report year;Maintained Sobriety for the past 6 months"){
          $scope.homeAgainHealthImp.total ++;
          $scope.homeAgainHealthImp.adultsHaveRuleAs ++;
          $scope.homeAgainHealthImp.sobrietySixMo ++;
          } else if(responseArray[i]["Has Health Improved"] == "Maintained Soberity for past 12+ months"){
          $scope.homeAgainHealthImp.total ++;
          $scope.homeAgainHealthImp.sobrietyTwelvePlus ++;
          } else if(responseArray[i]["Has Health Improved"] == "Maintained Sobriety for past 90 days"){
          $scope.homeAgainHealthImp.total ++;
          $scope.homeAgainHealthImp.sobrietyNinety ++;
          } else if(responseArray[i]["Has Health Improved"] == "Maintained Sobriety for the past 6 months"){
          $scope.homeAgainHealthImp.total ++;
          $scope.homeAgainHealthImp.sobrietySixMo ++;
          } // end of home again
        } else if (responseArray[i].Program == "HomeSafe"){
            if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc)"){
            $scope.homeSafeHealthImp.total ++;
            $scope.homeSafeHealthImp.adultsSelfHelp ++;
            } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Attended Treatment;Had a Rule 25 Assessment during report year"){
            $scope.homeSafeHealthImp.total ++;
            $scope.homeSafeHealthImp.adultsSelfHelp ++;
            $scope.homeSafeHealthImp.adultsCdTreatment ++;
            $scope.homeSafeHealthImp.adultsHaveRuleAs ++;
            } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Attended Treatment;Had a Rule 25 Assessment during report year;Maintained Soberity for past 12+ months;Maintained Sobriety for the past 6 months"){
            $scope.homeSafeHealthImp.total ++;
            $scope.homeSafeHealthImp.adultsSelfHelp ++;
            $scope.homeSafeHealthImp.adultsCdTreatment ++;
            $scope.homeSafeHealthImp.adultsHaveRuleAs ++;
            $scope.homeSafeHealthImp.sobrietyTwelvePlus ++;
            } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Attended Treatment;Had a Rule 25 Assessment during report year;Maintained Sobriety for past 90 days"){
            $scope.homeSafeHealthImp.total ++;
            $scope.homeSafeHealthImp.adultsSelfHelp ++;
            $scope.homeSafeHealthImp.adultsCdTreatment ++;
            $scope.homeSafeHealthImp.adultsHaveRuleAs ++;
            $scope.homeSafeHealthImp.sobrietyNinety ++;
            } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Attended Treatment;Had a Rule 25 Assessment during report year;Maintained Sobriety for the past 6 months"){
            $scope.homeSafeHealthImp.total ++;
            $scope.homeSafeHealthImp.adultsSelfHelp ++;
            $scope.homeSafeHealthImp.adultsCdTreatment ++;
            $scope.homeSafeHealthImp.adultsHaveRuleAs ++;
            $scope.homeSafeHealthImp.sobrietySixMo ++;
            } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Attended Treatment;Maintained Sobriety for past 90 days"){
            $scope.homeSafeHealthImp.total ++;
            $scope.homeSafeHealthImp.adultsSelfHelp ++;
            $scope.homeSafeHealthImp.sobrietyNinety ++;
            $scope.homeSafeHealthImp.adultsCdTreatment ++;
            } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Had a Rule 25 Assessment during report year"){
            $scope.homeSafeHealthImp.total ++;
            $scope.homeSafeHealthImp.adultsSelfHelp ++;
            $scope.homeSafeHealthImp.adultsHaveRuleAs ++;
            } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Maintained Soberity for past 12+ months"){
            $scope.homeSafeHealthImp.total ++;
            $scope.homeSafeHealthImp.adultsSelfHelp ++;
            $scope.homeSafeHealthImp.sobrietyTwelvePlus ++;
            } else if(responseArray[i]["Has Health Improved"] == "Attended Treatment"){
            $scope.homeSafeHealthImp.total ++;
            $scope.homeSafeHealthImp.adultsCdTreatment ++;
            } else if(responseArray[i]["Has Health Improved"] == "Attended Treatment;Had a Rule 25 Assessment during report year"){
            $scope.homeSafeHealthImp.total ++;
            $scope.homeSafeHealthImp.adultsCdTreatment ++;
            $scope.homeSafeHealthImp.adultsHaveRuleAs ++;
            } else if(responseArray[i]["Has Health Improved"] == "Attended Treatment;Had a Rule 25 Assessment during report year;Maintained Sobriety for past 90 days"){
            $scope.homeSafeHealthImp.total ++;
            $scope.homeSafeHealthImp.adultsCdTreatment ++;
            $scope.homeSafeHealthImp.adultsHaveRuleAs ++;
            $scope.homeSafeHealthImp.sobrietyNinety ++;
            } else if(responseArray[i]["Has Health Improved"] == "Attended Treatment;Had a Rule 25 Assessment during report year;Maintained Sobriety for the past 6 months"){
            $scope.homeSafeHealthImp.total ++;
            $scope.homeSafeHealthImp.adultsCdTreatment ++;
            $scope.homeSafeHealthImp.adultsHaveRuleAs ++;
            $scope.homeSafeHealthImp.sobrietySixMo ++;
            } else if(responseArray[i]["Has Health Improved"] == "Had a Rule 25 Assessment during report year"){
            $scope.homeSafeHealthImp.total ++;
            $scope.homeSafeHealthImp.adultsHaveRuleAs ++;
            } else if(responseArray[i]["Has Health Improved"] == "Had a Rule 25 Assessment during report year;Maintained Sobriety for the past 6 months"){
            $scope.homeSafeHealthImp.total ++;
            $scope.homeSafeHealthImp.adultsHaveRuleAs ++;
            $scope.homeSafeHealthImp.sobrietySixMo ++;
            } else if(responseArray[i]["Has Health Improved"] == "Maintained Soberity for past 12+ months"){
            $scope.homeSafeHealthImp.total ++;
            $scope.homeSafeHealthImp.sobrietyTwelvePlus ++;
            } else if(responseArray[i]["Has Health Improved"] == "Maintained Sobriety for past 90 days"){
            $scope.homeSafeHealthImp.total ++;
            $scope.homeSafeHealthImp.sobrietyNinety ++;
            } else if(responseArray[i]["Has Health Improved"] == "Maintained Sobriety for the past 6 months"){
            $scope.homeSafeHealthImp.total ++;
            $scope.homeSafeHealthImp.sobrietySixMo ++;
          } //end of homesafe
          } else if (responseArray[i].Program == "HomeFront" || responseArray[i].Program == "Home Front"){
              if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc)"){
              $scope.homeFrontHealthImp.total ++;
              $scope.homeFrontHealthImp.adultsSelfHelp ++;
              } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Attended Treatment;Had a Rule 25 Assessment during report year"){
              $scope.homeFrontHealthImp.total ++;
              $scope.homeFrontHealthImp.adultsSelfHelp ++;
              $scope.homeFrontHealthImp.adultsCdTreatment ++;
              $scope.homeFrontHealthImp.adultsHaveRuleAs ++;
              } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Attended Treatment;Had a Rule 25 Assessment during report year;Maintained Soberity for past 12+ months;Maintained Sobriety for the past 6 months"){
              $scope.homeFrontHealthImp.total ++;
              $scope.homeFrontHealthImp.adultsSelfHelp ++;
              $scope.homeFrontHealthImp.adultsCdTreatment ++;
              $scope.homeFrontHealthImp.adultsHaveRuleAs ++;
              $scope.homeFrontHealthImp.sobrietyTwelvePlus ++;
              } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Attended Treatment;Had a Rule 25 Assessment during report year;Maintained Sobriety for past 90 days"){
              $scope.homeFrontHealthImp.total ++;
              $scope.homeFrontHealthImp.adultsSelfHelp ++;
              $scope.homeFrontHealthImp.adultsCdTreatment ++;
              $scope.homeFrontHealthImp.adultsHaveRuleAs ++;
              $scope.homeFrontHealthImp.sobrietyNinety ++;
              } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Attended Treatment;Had a Rule 25 Assessment during report year;Maintained Sobriety for the past 6 months"){
              $scope.homeFrontHealthImp.total ++;
              $scope.homeFrontHealthImp.adultsSelfHelp ++;
              $scope.homeFrontHealthImp.adultsCdTreatment ++;
              $scope.homeFrontHealthImp.adultsHaveRuleAs ++;
              $scope.homeFrontHealthImp.sobrietySixMo ++;
              } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Attended Treatment;Maintained Sobriety for past 90 days"){
              $scope.homeFrontHealthImp.total ++;
              $scope.homeFrontHealthImp.adultsSelfHelp ++;
              $scope.homeFrontHealthImp.sobrietyNinety ++;
              $scope.homeFrontHealthImp.adultsCdTreatment ++;
              } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Had a Rule 25 Assessment during report year"){
              $scope.homeFrontHealthImp.total ++;
              $scope.homeFrontHealthImp.adultsSelfHelp ++;
              $scope.homeFrontHealthImp.adultsHaveRuleAs ++;
              } else if(responseArray[i]["Has Health Improved"] == "Attended Self-Help Groups (AA,NA,etc);Maintained Soberity for past 12+ months"){
              $scope.homeFrontHealthImp.total ++;
              $scope.homeFrontHealthImp.adultsSelfHelp ++;
              $scope.homeFrontHealthImp.sobrietyTwelvePlus ++;
              } else if(responseArray[i]["Has Health Improved"] == "Attended Treatment"){
              $scope.homeFrontHealthImp.total ++;
              $scope.homeFrontHealthImp.adultsCdTreatment ++;
              } else if(responseArray[i]["Has Health Improved"] == "Attended Treatment;Had a Rule 25 Assessment during report year"){
              $scope.homeFrontHealthImp.total ++;
              $scope.homeFrontHealthImp.adultsCdTreatment ++;
              $scope.homeFrontHealthImp.adultsHaveRuleAs ++;
              } else if(responseArray[i]["Has Health Improved"] == "Attended Treatment;Had a Rule 25 Assessment during report year;Maintained Sobriety for past 90 days"){
              $scope.homeFrontHealthImp.total ++;
              $scope.homeFrontHealthImp.adultsCdTreatment ++;
              $scope.homeFrontHealthImp.adultsHaveRuleAs ++;
              $scope.homeFrontHealthImp.sobrietyNinety ++;
              } else if(responseArray[i]["Has Health Improved"] == "Attended Treatment;Had a Rule 25 Assessment during report year;Maintained Sobriety for the past 6 months"){
              $scope.homeFrontHealthImp.total ++;
              $scope.homeFrontHealthImp.adultsCdTreatment ++;
              $scope.homeFrontHealthImp.adultsHaveRuleAs ++;
              $scope.homeFrontHealthImp.sobrietySixMo ++;
              } else if(responseArray[i]["Has Health Improved"] == "Had a Rule 25 Assessment during report year"){
              $scope.homeFrontHealthImp.total ++;
              $scope.homeFrontHealthImp.adultsHaveRuleAs ++;
              } else if(responseArray[i]["Has Health Improved"] == "Had a Rule 25 Assessment during report year;Maintained Sobriety for the past 6 months"){
              $scope.homeFrontHealthImp.total ++;
              $scope.homeFrontHealthImp.adultsHaveRuleAs ++;
              $scope.homeFrontHealthImp.sobrietySixMo ++;
              } else if(responseArray[i]["Has Health Improved"] == "Maintained Soberity for past 12+ months"){
              $scope.homeFrontHealthImp.total ++;
              $scope.homeFrontHealthImp.sobrietyTwelvePlus ++;
              } else if(responseArray[i]["Has Health Improved"] == "Maintained Sobriety for past 90 days"){
              $scope.homeFrontHealthImp.total ++;
              $scope.homeFrontHealthImp.sobrietyNinety ++;
              } else if(responseArray[i]["Has Health Improved"] == "Maintained Sobriety for the past 6 months"){
              $scope.homeFrontHealthImp.total ++;
              $scope.homeFrontHealthImp.sobrietySixMo ++;
              }
            }
          }
          console.log("homefront", $scope.homeFrontHealthImp);
          console.log("home safe", $scope.homeSafeHealthImp);
          console.log("home again", $scope.homeAgainHealthImp);
          console.log("empII", $scope.emptwoHealthImp);
          console.log("emp", $scope.empHealthImp);
        });

        $scope.demoFactory.totalPeople(selections).then(function (response) {
          console.log("response totalPeople: ", response);
          var data = response;
          // console.log('data---------', data);

          // console.log('3204239438403324-23------',dataProgram);
          for (var i = 0; i < data.length; i++) {
            // console.log('3204239438403324-23DATATAT------', data[i]);
            var dataProgram = data[i]['Program'];
            var dataRole = data[i]['role'];

            if (dataProgram === 'EMP' && dataRole === 'Adults') {
              var empSum = Number(data[i]['sum']);
              console.log('total sum emp adult -------', empSum);
            }
            if (dataProgram === 'EMP' && dataRole === 'Children') {
              var empChildrenSum = Number(data[i]['sum']);
              console.log('total sum emp children -------', empChildrenSum);
            }
            if (dataProgram === 'EMPII' && dataRole === 'Adults') {
              var emp2Sum = Number(data[i]['sum']);
              console.log('total sum empII adult -------', emp2Sum);
            }
            if (dataProgram === 'EMPII' && dataRole === 'Children') {
              var emp2ChildrenSum = Number(data[i]['sum']);
              console.log('total sum empII children -------', emp2ChildrenSum);
            }

            if (dataProgram === 'HomeSafe' && dataRole === 'Adults') {
              var homesafeSum = Number(data[i]['sum']);
              console.log('total sum HomeSafe Adults -------', homesafeSum);
            }
            if (dataProgram === 'HomeSafe' && dataRole === 'Children') {
              var homesafeChildrenSum = Number(data[i]['sum']);
              console.log('total sum HomeSafe children -------', homesafeChildrenSum);
            }
            if (dataProgram === 'Home Again' && dataRole === 'Adults') {
              var homeAgainSum = Number(data[i]['sum']);
              console.log('total sum Home Again Adults -------', homeAgainSum);
            }
            if (dataProgram === 'Home Again' && dataRole === 'Children') {
              var homeAgainChildrenSum = Number(data[i]['sum']);
              console.log('total sum Home Again children -------', homeAgainChildrenSum);
            }
            if(dataProgram =="Home Front"|| dataProgram =="HomeFront"  && dataRole === 'Adults') {
              var homeFrontSum = Number(data[i]['sum']);
              console.log('total sum Home front adult -------', homeFrontSum);
            }
            if(dataProgram == "Home Front"|| dataProgram == "HomeFront" && dataRole === 'Children') {
              var homeFrontChildrenSum = Number(data[i]['sum']);
              console.log('total sum Home front children -------', homeFrontChildrenSum);
            }
            if(homeFrontChildrenSum === undefined) {
              homeFrontChildrenSum = 0;
            }
            if(homeFrontSum === undefined) {
              homeFrontSum= 0;
            }
            if(homeAgainSum === undefined) {
              homeAgainSum = 0;
            }
            if(homeAgainChildrenSum === undefined) {
              homeAgainChildrenSum = 0;
            }
            if(homesafeSum === undefined) {
              homesafeSum = 0;
            }
            if(homesafeChildrenSum === undefined) {
              homesafeChildrenSum= 0;
            }
            if(emp2Sum === undefined) {
              emp2Sum = 0;
            }
            if(emp2ChildrenSum === undefined) {
              emp2ChildrenSum = 0;
            }
            if(empSum === undefined) {
              empSum = 0;
            }
            if(empChildrenSum === undefined) {
              empChildrenSum = 0;
            }
          }

          // EMP1
          $scope.empPeople = {
            adult: 0,
            children: 0
          };

          $scope.empPeople.adult = empSum;
          console.log('emp1adult sum value',$scope.empPeople.adult);

          $scope.empPeople.children = empChildrenSum;
          console.log('emp1children sum value',$scope.empPeople.children);

          // EMP2
          $scope.emp2People = {
            adult: 0,
            children: 0
          };

          $scope.emp2People.adult = emp2Sum;
          console.log('emp2adult sum value',$scope.emp2People.adult);

          $scope.emp2People.children = emp2ChildrenSum;
          console.log('emp2children sum value',$scope.emp2People.children);

          // HOMESAFE
          $scope.homesafePeople = {
            adult: 0,
            children: 0
          };

          $scope.homesafePeople.adult = homesafeSum;
          console.log('homesafeadult sum value',$scope.homesafePeople.adult);

          $scope.homesafePeople.children = homesafeChildrenSum ;
          console.log('homesafechildren sum value',$scope.homesafePeople.children);

          // HOMEAGAIN People
          $scope.homeagainPeople = {
            adult: 0,
            children: 0
          };

          $scope.homeagainPeople.adult = homeAgainSum;
          console.log('homeagianadult sum value',$scope.homeagainPeople.adult);

          $scope.homeagainPeople.children = homeAgainChildrenSum;
          console.log('homeagianchildren sum value',$scope.homeagainPeople.children);

          // HOMEFRONT People
          $scope.homeafrontPeople = {
            adult: 0,
            children: 0
          };

          //Program Adult and Children People Total
          $scope.programPeopleTotal = {
            adult: 0,
            children: 0,
            emp1: 0,
            emp2: 0,
            homeagain: 0,
            homesafe: 0,
            homefront: 0,
            adultChildrenTotal: 0
          };

          $scope.homeafrontPeople.adult = homeFrontSum;
          console.log('homefrontadult sum value',$scope.homeafrontPeople.adult);

          $scope.homeafrontPeople.children = homeFrontChildrenSum;
          console.log('homefrontchildren sum value',$scope.homeafrontPeople.children);

          // Adult Total People
          $scope.programPeopleTotal.adult = empSum + emp2Sum + homesafeSum + homeAgainSum + homeFrontSum + homeFrontChildrenSum;
          console.log('Program adult total ', $scope.programPeopleTotal.adult);

          //Children Total People
          $scope.programPeopleTotal.children = empChildrenSum +  emp2ChildrenSum + homesafeChildrenSum + homeAgainChildrenSum;
          console.log('Program children total ', $scope.programPeopleTotal.children);

          //EMP1 Total People
          $scope.programPeopleTotal.emp1 = empSum + empChildrenSum;
          console.log('Program EMP1 total ', $scope.programPeopleTotal.emp1);

          //EMP2 Total People
          $scope.programPeopleTotal.emp2 = emp2Sum + emp2ChildrenSum;
          console.log('Program EMP2 total ', $scope.programPeopleTotal.emp2);

          //HomeAgain People Total
          $scope.programPeopleTotal.homeagain = homeAgainSum + homeAgainChildrenSum;
          console.log('Program HomeAgain total ', $scope.programPeopleTotal.homeagain);

          //HomeSafe People Total
          $scope.programPeopleTotal.homesafe = homesafeSum + homesafeChildrenSum;
          console.log('Program homesafe total ', $scope.programPeopleTotal.homesafe);

          //HomeFront People Total
          $scope.programPeopleTotal.homefront = homeFrontSum + homeFrontChildrenSum;
          console.log('Program homefront total ', $scope.programPeopleTotal.homefront);

          $scope.programPeopleTotal.adultChildrenTotal = $scope.programPeopleTotal.adult + $scope.programPeopleTotal.children;
          console.log('Program Adult and Children total ', $scope.programPeopleTotal.adultChildrenTotal);


        });
    } //end of click
    $scope.isActive = true;

    $scope.exportDataOutcome = function () {
        var blob = new Blob([document.getElementById('exportableOutcome').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Solid_Ground_Report.xls");
    };

    $scope.resetQuery = function () {
        $scope.selectedprogram = [];
        $scope.selectedoutcome = [];
        $scope.startdate = new Date();
        $scope.enddate = new Date();
    };

//Call to get total number of children ages 5-18
    $scope.demoFactory.dobChildren(selections).then(function(response) {
      console.log("SHITresponse dobChildren: ", response);
      var responseArray = response
      $scope.childSchoolAgeEMP = {
        total:0
      };

      $scope.childSchoolAgeEMPII = {
        total:0
      };

      $scope.childSchoolAgeHomeSafe = {
        total:0
      };

      $scope.childSchoolAgeHomeAgain = {
        total:0
      };

      $scope.childSchoolAgeHomeFront = {
        total:0
      };

      for (var i = 0; i < responseArray.length; i++) {
        responseArray[i]['dob'] = responseArray[i]['dob'].slice(0,10);
        var personDOB = new Date(responseArray[i]['dob']); //reformats persons DOB
        var age = dateDiff(personDOB,$scope.enddate);

            if(responseArray[i].Program =="EMP"){
                if(age>=5 && age>=5 && age <= 188){
                  $scope.childdobEMP.total+=1;
                  }
                }

            else if(responseArray[i].Program =="EMPII"){
                if(age>=5 && age <= 18){
                  $scope.childdobEMPII.total+=1;
                  }
            }

            else if(responseArray[i].Program =="HomeSafe"||responseArray[i].Program =="Home Safe"){
                if(age>=5 && age <= 18){
                  $scope.childdobHomeSafe.total+=1;
                  }
                }

            else if(responseArray[i].Program =="HomeAgain"||responseArray[i].Program =="Home Again"){
                if(age>=5 && age <= 18){
                  $scope.childdobHomeAgain.total+=1;
                  }
                }

            else if(responseArray[i].Program =="HomeFront"||responseArray[i].Program =="Home Front"){
                if(age>=5 && age <= 18){
                  $scope.childdobHomeFront.total+=1;
                  }
                }
      }//end of for loop
      console.log("OUTCOME TEST", $scope.childdobEMP);
      console.log("OUTCOME TEST", $scope.childdobEMPII);
      console.log("OUTCOME TEST", $scope.childdobHomeFront);
      console.log("OUTCOME TEST", $scope.childdobHomeAgain);
      console.log("OUTCOME TEST", $scope.childdobHomeSafe);

    });//end of dobChildren

// end controller
}]);
