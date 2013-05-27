/*
    Copyright 2013 Giacomo Antolini <giacomo.antolini@gmail.com>.

    This file is part of angular-clearable.

    angular-clearable is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    angular-clearable is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with angular-clearable.  If not, see <http://www.gnu.org/licenses/>.
*/

angular.module('xngClearable', [])
    .directive('xngClearable', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            compile: function(tElement) {
                var clearClass = 'clear_button',
                    divClass = clearClass + '_div';

                if (!tElement.parent().hasClass(divClass)) {
                    tElement.wrap('<div style="position: relative;" class="' + divClass + '">' + tElement.html() + '</div>');
                    tElement.after('<a style="position: absolute; cursor: pointer;" class="' + clearClass + '">&times;</a>');

                    var btn = tElement.next();

                    btn.css('font-size', Math.round(tElement.prop('offsetHeight')*0.8) + 'px');
                    btn.css('top', '2px');
                    btn.css('left', Math.round(tElement.prop('offsetWidth') - btn.prop('offsetWidth')*1.3) + 'px');

                    return function(scope, iElement, iAttrs) {
                        if (iElement[0].tagName == 'DIV') {
                            var text = angular.element(iElement.children()[0]);

                            btn.bind('mousedown', function(e) {
                                text.val('');
                                text.triggerHandler('input');
                                e.preventDefault();
                            });

                            scope.$watch(iAttrs.ngModel, function (v) {
                                if (v && v.length > 0) {
                                    btn.css('display', 'block');
                                } else {
                                    btn.css('display', 'none');
                                }
                            });
                        }
                    }
                }
            }
        }
    });
