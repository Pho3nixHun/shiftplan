'use strict';

import mdThemingConfig from 'app/configs/mdTheme';

import indexCtrl from 'app/controllers/index';

const app = angular    
    .module('ngApp', [
        'ngMaterial',
        'ngAnimate',
        'ngRoute',
        'ngResource',
        'formly',
        'formlyMaterial'
    ])
    .config(mdThemingConfig)
    .controller('indexCtrl', indexCtrl)

export default app;


