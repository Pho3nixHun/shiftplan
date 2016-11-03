/**
 * @author    László Simon {@link http://pho3nixnest.com}
 * @copyright Copyright (c) 2015, László Simon
 * @license   ???
 */

// Css
import "angular/angular-csp.css!";

// Common
import "jquery";
import "angular";

// App
import mainModule from 'app/main';

// Bootstrap
angular.element(document).ready(function () {
    angular.bootstrap(document, [mainModule.name], {
        strictDi: false //Some component (ex. mdDialog) fails if true (Cannot be minified)
    });
});