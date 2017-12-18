angular.module("authorList", []).directive('jqdatepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            $(element).datepicker({
                dateFormat: 'dd.mm.yy',
                onSelect: function (date) {
                    ctrl.$setViewValue(date);
                    ctrl.$render();
                    scope.$apply();
                }
            });
        }
    };
})
//creating module with directive for datepicker