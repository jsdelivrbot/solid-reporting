myApp.controller("OutcomesController", ["$scope",'$http', '$location', 'DataFactory', '$mdSidenav', 'OutcomeFactory', 'DemoFactory', function ($scope, $http, $location, DataFactory, $mdSidenav, OutcomeFactory, DemoFactory) {
  console.log("hello from OutcomesController");

  $scope.outcomeFactory = OutcomeFactory;
  $scope.demoFactory = DemoFactory;

  $scope.toggleSide = function() {
    $mdSidenav('left').toggle();
  };

  $scope.tologout = function() {
    $scope.dataFactory.logout().then(function(response) {
      console.log('logged out');
      console.log('i redirected you to the home page');
      $location.path("/login");
    });
  }

  var programs = [];

  //----- Programs & Outcomes Checkboxes --------------
  // $scope.programs = ['EMP I', 'EMP II', 'Home Again', 'HomeSafe', 'HomeFront'];

  $scope.outcomes = ['Housing Stability', 'Educational Advancement', 'Economic Stability', 'Strengthened Families', 'Improved Health', 'Community Connections'];

  showData();
  function showData() {

      $scope.demoFactory.retrieveData().then(function(response) {
          $scope.data = response;
          // console.log('type of number?', typeof Number());
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
  };



 //------ Calendar -------------------------------------------------------

  var startDate;
  var endDate;

  $scope.startdate = new Date();
  $scope.enddate = new Date();

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

// var self = this;
// var users = [{name: "Moroni", age: 50} /*,*/];
// self.tableParams = new NgTableParams({}, { dataset: users});

  $scope.sql = {};

  $scope.firstOfTheYear = '';

  $scope.newQuery = function () {

        var justStartYear = $scope.startdate.getFullYear();

        $scope.firstOfTheYear = justStartYear + '-1-1';

        console.log("This is the data at the first of the year", $scope.firstOfTheYear);

        console.log("Program: " + $scope.selectedprogram + "\n"
          + "Gender: " + $scope.selectedgender + "\n"
          + "Adult Race: " + $scope.selectedadultRace + "\n"
          + "Adult Age: " + $scope.selectedadultAge + "\n"
          + "Children Race: " + $scope.selectedchildRace + "\n"
          + "Children Age: " + $scope.selectedchildAge + "\n"
          + "Last Residence: " + $scope.lastResidenceSelection + "\n"
          + "first day of the year: " + $scope.firstOfTheYear + "\n")

        console.log("$scope.startdate newQuery: ", $scope.startdate);
        console.log("$scope.enddate newQuery: ", $scope.enddate);

        selections = {
          programSelected: $scope.selectedprogram,
          raceAdultSelection: $scope.selectedadultRace,
          raceChildrenSelection: $scope.selectedchildRace,
          genderSelection: $scope.selectedgender,
          ageAdultSelection: $scope.selectedadultAge,
          ageChildrenSelection: $scope.selectedchildAge,
          lastResidenceSelection: $scope.selectedresidence,
          startdate: $scope.startdate,
          enddate: $scope.enddate,
          firstDayOfTheYear: $scope.firstOfTheYear
        };


    console.log("Program: " + $scope.selectedprogram + "\n"
        + "Outcome: " + $scope.selectedoutcome);

        // $scope.outcomeFactory.houseStabil(selections).then(function(response) {
        //   console.log("response houseStabil: ", response);
        // });
        // $scope.outcomeFactory.adultEduAdv(selections).then(function(response) {
        //   console.log("response adultEduAdv: ", response);
        // });
        // $scope.outcomeFactory.adultLearningDis(selections).then(function(response) {
        //   console.log("response adultLearningDis: ", response);
        // });
        // $scope.outcomeFactory.childLearnDis(selections).then(function(response) {
        //   console.log("response childLearnDis: ", response);
        // });
        // $scope.outcomeFactory.hhCurrentEmp(selections).then(function(response) {
        //   console.log("response hhCurrentEmp: ", response);
        // });
        // $scope.outcomeFactory.hh2CurrentEmp(selections).then(function(response) {
        //   console.log("response hh2CurrentEmp: ", response);
        // });
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
              $scope.empEconS.total ++
              console.log("emp 3 mo", $scope.empEconS.work3month);
              }
              else if(responseArray[i]['Improved Econ Stability'] == "Applied for SSD during program"){
              $scope.empEconS.appliedforSSD += parseInt(responseArray[i].count);
              $scope.empEconS.total ++
              console.log("emp emp for ssd", $scope.empEconS.appliedforSSD);
              }
              else if(responseArray[i]['Improved Econ Stability'] == "Had a job at year-end or at exit" || responseArray[i]['Improved Econ Stability'] == "Had a job at year-end or at exiting"){
              $scope.empEconS.jobAtYearEndorExit += parseInt(responseArray[i].count)
              $scope.empEconS.total ++
              console.log("emp job at exit", $scope.empEconS.jobAtYearEndorExit);
              }
              else if(responseArray[i]['Improved Econ Stability'] == "Applied for SSD but denied"){
              $scope.empEconS.appliedforSSDbutDenied += parseInt(responseArray[i].count);
              $scope.empEconS.total ++
              console.log("emp denied ssd", $scope.empEconS.appliedforSSDbutDenied);
              }
              else if(responseArray[i]['Improved Econ Stability'] == "Approved for SSD during program"){
              $scope.empEconS.approvedSSDduringProgram += parseInt(responseArray[i].count);
              $scope.empEconS.total ++
              console.log("emp approved ssd", $scope.empEconS.approvedSSDduringProgram);
              }
              else if(responseArray[i]['Improved Econ Stability'] == "Already receiving SSD prior program"){
              $scope.empEconS.alreadySSD += parseInt(responseArray[i].count);
              $scope.empEconS.total ++
              console.log("emp already ssd", $scope.empEconS.alreadySSD);
              }
            }//end of EMP if
            else if(responseArray[i].Program == "EMPII"){
              if(responseArray[i]['Improved Econ Stability'] == "Worked for 3+ months"){
              $scope.emptwoEconS.work3month += parseInt(responseArray[i].count);
              $scope.emptwoEconS.total ++
              console.log("empii 3 mo", $scope.emptwoEconS.work3month);
              }
              else if(responseArray[i]['Improved Econ Stability'] == "Applied for SSD during program"){
              $scope.emptwoEconS.appliedforSSD += parseInt(responseArray[i].count);
              $scope.emptwoEconS.total ++
              console.log("empii for ssd", $scope.emptwoEconS.appliedforSSD);
              }
              else if(responseArray[i]['Improved Econ Stability'] == "Had a job at year-end or at exit" || responseArray[i]['Improved Econ Stability'] == "Had a job at year-end or at exiting"){
              $scope.emptwoEconS.jobAtYearEndorExit += parseInt(responseArray[i].count)
              $scope.emptwoEconS.total ++
              console.log("empii job at exit", $scope.emptwoEconS.jobAtYearEndorExit);
              }
              else if(responseArray[i]['Improved Econ Stability'] == "Applied for SSD but denied"){
              $scope.emptwoEconS.appliedforSSDbutDenied += parseInt(responseArray[i].count);
              $scope.emptwoEconS.total ++
              console.log("empii denied ssd", $scope.emptwoEconS.appliedforSSDbutDenied);
              }
              else if(responseArray[i]['Improved Econ Stability'] == "Approved for SSD during program"){
              $scope.emptwoEconS.approvedSSDduringProgram += parseInt(responseArray[i].count);
              $scope.emptwoEconS.total ++
              console.log("empii approved ssd", $scope.emptwoEconS.approvedSSDduringProgram);
              }
              else if(responseArray[i]['Improved Econ Stability'] == "Already receiving SSD prior program"){
              $scope.emptwoEconS.alreadySSD += parseInt(responseArray[i].count);
              $scope.emptwoEconS.total ++
              console.log("empii already ssd", $scope.emptwoEconS.alreadySSD);
              }
            }//end of empII
            else if(responseArray[i].Program == "HomeSafe"){
              if(responseArray[i]['Improved Econ Stability'] == "Worked for 3+ months"){
              $scope.homeSafeEconS.work3month += parseInt(responseArray[i].count);
              $scope.homeSafeEconS.total ++
              console.log("homesafe 3 mo", $scope.homeSafeEconS.work3month);
              }
              else if(responseArray[i]['Improved Econ Stability'] == "Applied for SSD during program"){
              $scope.homeSafeEconS.appliedforSSD += parseInt(responseArray[i].count);
              $scope.homeSafeEconS.total ++
              console.log("homesafe for ssd", $scope.homeSafeEconS.appliedforSSD);
              }
              else if(responseArray[i]['Improved Econ Stability'] == "Had a job at year-end or at exit" || responseArray[i]['Improved Econ Stability'] == "Had a job at year-end or at exiting"){
              $scope.homeSafeEconS.jobAtYearEndorExit += parseInt(responseArray[i].count)
              $scope.homeSafeEconS.total ++
              console.log("homesafe job at exit", $scope.homeSafeEconS.jobAtYearEndorExit);
              }
              else if(responseArray[i]['Improved Econ Stability'] == "Applied for SSD but denied"){
              $scope.homeSafeEconS.appliedforSSDbutDenied += parseInt(responseArray[i].count);
              $scope.homeSafeEconS.total ++
              console.log("homesafe denied ssd", $scope.homeSafeEconS.appliedforSSDbutDenied);
              }
              else if(responseArray[i]['Improved Econ Stability'] == "Approved for SSD during program"){
              $scope.homeSafeEconS.approvedSSDduringProgram += parseInt(responseArray[i].count);
              $scope.homeSafeEconS.total ++
              console.log("homesafe approved ssd", $scope.homeSafeEconS.approvedSSDduringProgram);
              }
              else if(responseArray[i]['Improved Econ Stability'] == "Already receiving SSD prior program"){
              $scope.homeSafeEconS.alreadySSD += parseInt(responseArray[i].count);
              $scope.homeSafeEconS.total ++
              console.log("homesafe already ssd", $scope.homeSafeEconS.alreadySSD);
              }
            }//end of HomeSafe
            else if(responseArray[i].Program == "Home Again"){
              if(responseArray[i]['Improved Econ Stability'] == "Worked for 3+ months"){
              $scope.homeAgainEconS.work3month += parseInt(responseArray[i].count);
              $scope.homeAgainEconS.total ++
              console.log("home again 3 mo", $scope.homeAgainEconS.work3month);
              }
              else if(responseArray[i]['Improved Econ Stability'] == "Applied for SSD during program"){
              $scope.homeAgainEconS.appliedforSSD += parseInt(responseArray[i].count);
              $scope.homeAgainEconS.total ++
              console.log("home again for ssd", $scope.homeAgainEconS.appliedforSSD);
              }
              else if(responseArray[i]['Improved Econ Stability'] == "Had a job at year-end or at exit" || responseArray[i]['Improved Econ Stability'] == "Had a job at year-end or at exiting"){
              $scope.homeAgainEconS.jobAtYearEndorExit += parseInt(responseArray[i].count)
              $scope.homeAgainEconS.total ++
              console.log("home again job at exit", $scope.homeAgainEconS.jobAtYearEndorExit);
              }
              else if(responseArray[i]['Improved Econ Stability'] == "Applied for SSD but denied"){
              $scope.homeAgainEconS.appliedforSSDbutDenied += parseInt(responseArray[i].count);
              $scope.homeAgainEconS.total ++
              console.log("home again denied ssd", $scope.homeAgainEconS.appliedforSSDbutDenied);
              }
              else if(responseArray[i]['Improved Econ Stability'] == "Approved for SSD during program"){
              $scope.homeAgainEconS.approvedSSDduringProgram += parseInt(responseArray[i].count);
              $scope.homeAgainEconS.total ++
              console.log("home again approved ssd", $scope.homeAgainEconS.approvedSSDduringProgram);
              }
              else if(responseArray[i]['Improved Econ Stability'] == "Already receiving SSD prior program"){
              $scope.homeAgainEconS.alreadySSD += parseInt(responseArray[i].count);
              $scope.homeAgainEconS.total ++
              console.log("home again already ssd", $scope.homeAgainEconS.alreadySSD);
              }
            }//end of Home Again
            else if(responseArray[i].Program == "HomeFront" || responseArray[i].Program == "Home Front"){
              if(responseArray[i]['Improved Econ Stability'] == "Worked for 3+ months"){
              $scope.homeFrontEconS.work3month += parseInt(responseArray[i].count);
              $scope.homeFrontEconS.total ++
              console.log("home front 3 mo", $scope.homeFrontEconS.work3month);
              }
              else if(responseArray[i]['Improved Econ Stability'] == "Applied for SSD during program"){
              $scope.homeFrontEconS.appliedforSSD += parseInt(responseArray[i].count);
              $scope.homeFrontEconS.total ++
              console.log("home front for ssd", $scope.homeFrontEconS.appliedforSSD);
              }
              else if(responseArray[i]['Improved Econ Stability'] == "Had a job at year-end or at exit" || responseArray[i]['Improved Econ Stability'] == "Had a job at year-end or at exiting"){
              $scope.homeFrontEconS.jobAtYearEndorExit += parseInt(responseArray[i].count)
              $scope.homeFrontEconS.total ++
              console.log("home front job at exit", $scope.homeFrontEconS.jobAtYearEndorExit);
              }
              else if(responseArray[i]['Improved Econ Stability'] == "Applied for SSD but denied"){
              $scope.homeFrontEconS.appliedforSSDbutDenied += parseInt(responseArray[i].count);
              $scope.homeFrontEconS.total ++
              console.log("home front denied ssd", $scope.homeFrontEconS.appliedforSSDbutDenied);
              }
              else if(responseArray[i]['Improved Econ Stability'] == "Approved for SSD during program"){
              $scope.homeFrontEconS.approvedSSDduringProgram += parseInt(responseArray[i].count);
              $scope.homeFrontEconS.total ++
              console.log("home front approved ssd", $scope.homeFrontEconS.approvedSSDduringProgram);
              }
              else if(responseArray[i]['Improved Econ Stability'] == "Already receiving SSD prior program"){
              $scope.homeFrontEconS.alreadySSD += parseInt(responseArray[i].count);
              $scope.homeFrontEconS.total ++
              console.log("home front already ssd", $scope.homeFrontEconS.alreadySSD);
              }
            }//end of homeFront
          }//these check for the objects to have values(these total values hsould equal response.length)
        });
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
        });
        // $scope.outcomeFactory.adultMI(selections).then(function(response) {
        //   console.log("response adultMI: ", response);
        // });
        // $scope.outcomeFactory.childDis(selections).then(function(response) {
        //   console.log("response childDis: ", response);
        // });
        // $scope.outcomeFactory.childMI(selections).then(function(response) {
        //   console.log("response childMI: ", response);
        // });
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

          for (var i = 0; i < responseArray.length; i++) {
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

        });
        // $scope.outcomeFactory.parentEduThisYear(selections).then(function(response) {
        //   console.log("response parentEduThisYear: ", response);
        // });
        // $scope.outcomeFactory.parentEduYearBefore(selections).then(function(response) {
        //   console.log("response parentEduYearBefore: ", response);
        // });
        // $scope.outcomeFactory.budgetingEdu(selections).then(function(response) {
        //   console.log("response budgetingEdu: ", response);
        // });
        // $scope.outcomeFactory.budgetingEduSameYear(selections).then(function(response) {
        //   console.log("response budgetingEduSameYear: ", response);
        // });
        // $scope.outcomeFactory.budgetingEduYearBefore(selections).then(function(response) {
        //   console.log("response budgetingEduYearBefore: ", response);
        // });
        // $scope.outcomeFactory.violence(selections).then(function(response) {
        //   console.log("response violence: ", response);
        // });
        // $scope.outcomeFactory.tenantTraining(selections).then(function(response) {
        //   console.log("response tenantTraining: ", response);
        // });
        // $scope.outcomeFactory.tenantTrainingSameYear(selections).then(function(response) {
        //   console.log("response tenantTrainingSameYear: ", response);
        // });
        // $scope.outcomeFactory.tenantTrainingPriorYear(selections).then(function(response) {
        //   console.log("response tenantTrainingPriorYear: ", response);
        // });
        // $scope.outcomeFactory.dbt(selections).then(function(response) {
        //   console.log("response dbt: ", response);
        // });
        // $scope.outcomeFactory.DBTsameyear(selections).then(function(response) {
        //   console.log("response DBTsameyear: ", response);
        // });
        // $scope.outcomeFactory.DBTprioryear(selections).then(function(response) {
        //   console.log("response DBTprioryear: ", response);
        // });
        // $scope.outcomeFactory.healthImproved(selections).then(function(response) {
        //   console.log("response healthImproved: ", response);
        // });
        // $scope.outcomeFactory.socialSupport(selections).then(function(response) {
        //   console.log("response socialSupport: ", response);
        // });
        // $scope.outcomeFactory.selfGoals(selections).then(function(response) {
        //   console.log("response selfGoals: ", response);
        // });


  }

  $scope.resetQuery = function () {
    $scope.selectedprogram = [];
    $scope.selectedoutcome = [];
    $scope.startdate = new Date();
    $scope.enddate = new Date();
  }


// end controller
}]);
