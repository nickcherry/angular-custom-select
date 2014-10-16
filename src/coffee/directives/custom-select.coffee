angular.module('angular-custom-select', []).directive 'customSelect', ($compile) ->

    return {

      require: 'ngModel'
      restrict: 'E'
      scope: true

      compile: (tElem, tAttrs, transclude, linker) ->

        (scope, iElem, iAttrs, ngModel) ->

          ###########################################################################
          # Config
          ###########################################################################

          selectClass = iAttrs.selectClass or 'custom-select'
          optionClass = iAttrs.optionClass or 'option'
          optionValueWrapperClass = iAttrs.optionValueWrapperClass or 'value'
          expandedClass = iAttrs.expandedClass or 'expanded'
          placeholderClass = iAttrs.placeholderClass or 'placeholder'
          placeholderLabel = iAttrs.placeholder or 'Select a value...'
          
          ngModelName = iAttrs.ngModel

          ngOptions = iAttrs.ngOptions.trim()
          ngOptionParts = ngOptions.match /^\s*([\w.]*)\s*(as)?\s*([\w.]*)\s*(for)\s*([\w.]*)\s*(in)\s*(\w.*)/

          selectExpression = ngOptionParts[1]
          labelExpression = ngOptionParts[3] or selectExpression
          valueName = ngOptionParts[5]
          collectionName = ngOptionParts[7]

          
          ###########################################################################
          # Controller
          ###########################################################################

          scope.expanded = false

          scope.toggle = ->
            scope.expanded = !scope.expanded

          scope.selectItem = (item) ->
            ngModel.$setViewValue item
            scope.expanded = false

          scope.formatItemValue = (item) ->
            return null unless item
            firstDotIndex = labelExpression.indexOf '.'
            return item if firstDotIndex is -1
            item[labelExpression.substr(firstDotIndex + 1)]


          ###########################################################################
          # Compilation
          ###########################################################################

          elements = []

          scope.$watchCollection collectionName, (collection) ->

            if elements.length
              for element in elements
                element.el.remove()
                element.scope.$destroy()

            iElem.empty()

            selectHTML = "<div class='#{ selectClass }'"
            selectHTML += " ng-class='{ \"#{ expandedClass }\": expanded }'>"
            selectHTML += "</div>"
            compiledSelectHTML = $compile(selectHTML)(scope)
            iElem.append compiledSelectHTML

            optionHTML = "<div class='#{ placeholderClass } #{ optionClass }'"
            optionHTML += " ng-click='toggle()'>"
            optionHTML += "<span class='#{ optionValueWrapperClass }'>"
            optionHTML += "{{ formatItemValue(#{ ngModelName }) || '#{ placeholderLabel }' }}"
            optionHTML += "</span>"
            optionHTML += "</div>"
            optionScope = scope.$new()
            compiledOptionHTML = $compile(optionHTML)(optionScope)
            compiledSelectHTML.append compiledOptionHTML

            for item, i in collection
              optionHTML = "<div class='#{ optionClass }'"
              optionHTML += " ng-click='selectItem(#{ selectExpression })'>"
              optionHTML += "<span class='#{ optionValueWrapperClass }'>"
              optionHTML += "{{ #{ labelExpression } }}"
              optionHTML += "</span>"
              optionHTML += "</div>"
              optionScope = scope.$new()
              optionScope[valueName] = item
              compiledOptionHTML = $compile(optionHTML)(optionScope)
              compiledSelectHTML.append compiledOptionHTML

    }