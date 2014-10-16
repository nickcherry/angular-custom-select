angular.module('angular-custom-select-examples', ['angular-custom-select'])

  .controller 'ExamplesController', ($scope, $timeout) ->

    $scope.strings = ['Option A', 'Option B', 'Option C', 'Option D', 'Option E']
    $scope.objects = [
      { name: 'Option A' }
      , { name: 'Option B' }
      , { name: 'Option C' }
      , { name: 'Option D' }
      , { name: 'Option E' }
    ]

    $scope.selectedValues = {}
    $scope.initialized = true