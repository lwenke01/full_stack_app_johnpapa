'use strict';

(function(){
  var app = angular.module('ArcadeApp', []);
  app.controller('ArcadeController', ['$scope','$http', function($scope, $http){

  const arcadeRoute = 'http://localhost:5000/arcades';
  $scope.dance = 'Add New Arcade';
  this.arcades = ['arcade'];
  this.newArcade = {};

  this.getArcades = function(){
    $http.get(arcadeRoute)
    .then((result)=>{
      this.arcades = result.data.arcades;
    }, function(error){
      console.log(error);
    });
  };
  this.createArcade = function(arcade){
    $http.post(arcadeRoute, arcade)
      .then((res)=>{
        console.log(res.data);
        this.arcades.push(res.data);
      });
  };
  this.removeArcade = function(arcade) {
    $http.delete(arcadeRoute + '/' + arcade._id)
    .then((res)=>{
      this.arcades = this.arcades.filter((a)=> a._id !=arcade._id);
    });
  };
  this.updateArcade = function(arcEdit){
    if(arcEdit._id){
      $http.put(arcadeRoute + '/' + arcEdit._id, arcEdit)
      .then((res)=>{
        console.log('updating');
        this.arcades = this.arcades.map((a)=>{
          if(a._id === arcEdit._id) {
            return arcEdit;
          } else {
            return a;
          }
        });
      });
    }
  };
  this.cancelUpdate = function(arcEdit, arcade){
    arcEdit._id = arcade._id;
    arcEdit.name = arcade.name;
    arcEdit.address = arcade.address;
    arcEdit.hours = arcade.hours;
  };
}]);

})();
