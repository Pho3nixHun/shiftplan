/**
 * @author    László Simon {@link http://pho3nixnest.com}
 * @copyright Copyright (c) 2015, László Simon
 * @license   ???
 */

// Css
import "resources/css/animate.css!";
import "resources/css/stylesheet.css!";
import "angular/angular-csp.css!";
import "angular-material/angular-material.css!";
import "resources/fonts/material-icons.css!";

// Common
import "jquery";
import "angular";
import "angular-animate";
import "angular-material";
import "angular-messages";
import "angular-resource";
import "angular-route";
import "api-check";
import "angular-formly";
import "angular-formly-material";

// App
import mainModule from 'app/main';

// Bootstrap
angular.element(document).ready(function () {
    angular.bootstrap(document, [mainModule.name], {
        strictDi: false //Some component (ex. mdDialog) fails if true (Cannot be minified)
    });
});