/*
 * Copyright (c) 2013 Giacomo Antolini <giacomo.antolini@gmail.com>.
 * All rights reserved.
 *
 * This file is part of angular-clearable.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

angular.module('xngClearable', []).
    provider('xngClearableConfig', function() {
        this.setFontSize = function ( fontSize ) {
            this.fontSize = fontSize;
        }

        this.setTopPx = function ( topPx ) {
            this.topPx = topPx;
        }

        this.setLeftPx = function ( leftPx ) {
            this.leftPx = leftPx;
        }

        this.$get = function() {
            return this;
        }
    }).
    directive('xngClearable', function(xngClearableConfig, $timeout) {
        return {
            restrict: 'A',
            transclude: false,
            scope: { model: '=ngModel' },
            link: function(scope, tElement, tAttr) {
		scope.model = (typeof scope.model === 'undefined') ? "" : scope.model;

                var clearClass = 'clear_button',
                    divClass = clearClass + '_div';

                if (!tElement.parent().hasClass(divClass)) {
                    // set all in a render, so we can work even in modals!
                    var render = function() {
                        tElement.wrap('<div style="position: relative;" class="' + divClass + '">' + tElement.html() + '</div>');
                        tElement.after('<a style="position: absolute; cursor: pointer;" tabindex="-1" class="' + clearClass + '">&times;</a>');

                        var btn = angular.element(tElement.next());

                        btn.bind('mousedown', function() {
                            scope.$apply(scope.model = undefined);
                        });

                        scope.$watch('model', function () {
			    if ( scope.model && scope.model.length > 0 && !tAttr["disabled"]) {
                                btn.css('display', 'block');

                                btn.css('font-size', Math.round(tElement.prop('offsetHeight')*xngClearableConfig.setFontSize) + 'px');
                                btn.css('top', xngClearableConfig.setTopPx + 'px');
                                btn.css('left', Math.round(tElement.prop('offsetWidth') - btn.prop('offsetWidth')*xngClearableConfig.setLeftPx) + 'px');
                            } else {
                                if ( tAttr.xngClearable != '' ) {
                                    scope.$parent[tAttr.xngClearable]();
                                }
                                btn.css('display', 'none');
                            }
                        });
		    }

                    // execute after all DOM has been rendered
		    $timeout(render, 0);
                }
            }
        }
    });
