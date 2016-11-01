export default [
    '$mdThemingProvider',
    mdThemingConfig
]
function mdThemingConfig($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('pink')
      .accentPalette('blue')
      .warnPalette('amber')
      .backgroundPalette('grey')
      .dark();
}