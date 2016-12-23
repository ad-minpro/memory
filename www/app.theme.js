/*
myapp.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default').primaryPalette('light-green');
  $mdThemingProvider.theme('default').accentPalette('blue-grey');
  $mdThemingProvider.theme('default').warnPalette('orange');
  $mdThemingProvider.theme('default').backgroundPalette('grey');
});


myapp.config(function ($mdThemingProvider) {
    var customPrimary = {
        '50': '#a9d383',
        '100': '#9bcd70',
        '200': '#8ec65d',
        '300': '#81bf4b',
        '400': '#74b23f',
        '500': '#689f38',
        '600': '#5c8c31',
        '700': '#4f792b',
        '800': '#436624',
        '900': '#37541d',
        'A100': '#b6da96',
        'A200': '#c3e1a9',
        'A400': '#d0e7bc',
        'A700': '#2a4117'
    };
    $mdThemingProvider.definePalette('customPrimary', customPrimary);

    var customAccent = {
        '50': '#212c30',
        '100': '#2c3940',
        '200': '#36474f',
        '300': '#41545e',
        '400': '#4b626d',
        '500': '#566f7c',
        '600': '#6b8a99',
        '700': '#7a96a3',
        '800': '#8aa2ae',
        '900': '#99aeb8',
        'A100': '#6b8a99',
        'A200': '#607d8b',
        'A400': '#566f7c',
        'A700': '#a8bac3'
    };
    $mdThemingProvider.definePalette('customAccent', customAccent);

    var customWarn = {
        '50': '#ffb280',
        '100': '#ffa266',
        '200': '#ff934d',
        '300': '#ff8333',
        '400': '#ff741a',
        '500': '#ff6400',
        '600': '#e65a00',
        '700': '#cc5000',
        '800': '#b34600',
        '900': '#993c00',
        'A100': '#ffc199',
        'A200': '#ffd1b3',
        'A400': '#ffe0cc',
        'A700': '#803200'
    };
    $mdThemingProvider.definePalette('customWarn', customWarn);

    var customBackground = {
        '50': '#737373',
        '100': '#666666',
        '200': '#595959',
        '300': '#4d4d4d',
        '400': '#404040',
        '500': '#333',
        '600': '#262626',
        '700': '#1a1a1a',
        '800': '#0d0d0d',
        '900': '#000000',
        'A100': '#808080',
        'A200': '#8c8c8c',
        'A400': '#999999',
        'A700': '#000000'
    };
    $mdThemingProvider.definePalette('customBackground', customBackground);
    
	$mdThemingProvider.theme('default').primaryPalette('customPrimary');
	
	$mdThemingProvider.theme('default').accentPalette('customAccent');
	$mdThemingProvider.theme('default').warnPalette('customWarn');
	$mdThemingProvider.theme('default').backgroundPalette('customBackground');
	//$mdThemingProvider.theme('default').backgroundPalette('grey');
      
});
*/

myapp.config(function ($mdThemingProvider) {
    var customPrimary = {
        '50': '#a9d383',
        '100': '#9bcd70',
        '200': '#8ec65d',
        '300': '#81bf4b',
        '400': '#74b23f',
        '500': '#689f38',
        '600': '#5c8c31',
        '700': '#4f792b',
        '800': '#436624',
        '900': '#37541d',
        'A100': '#b6da96',
        'A200': '#c3e1a9',
        'A400': '#d0e7bc',
        'A700': '#2a4117'
    };
    $mdThemingProvider.definePalette('customPrimary', customPrimary);

    var customAccent = {
        '50': '#212c30',
        '100': '#2c3940',
        '200': '#36474f',
        '300': '#41545e',
        '400': '#4b626d',
        '500': '#566f7c',
        '600': '#6b8a99',
        '700': '#7a96a3',
        '800': '#8aa2ae',
        '900': '#99aeb8',
        'A100': '#6b8a99',
        'A200': '#607d8b',
        'A400': '#566f7c',
        'A700': '#a8bac3'
    };
    $mdThemingProvider.definePalette('customAccent', customAccent);

    var customWarn = {
        '50': '#ffb280',
        '100': '#ffa266',
        '200': '#ff934d',
        '300': '#ff8333',
        '400': '#ff741a',
        '500': '#ff6400',
        '600': '#e65a00',
        '700': '#cc5000',
        '800': '#b34600',
        '900': '#993c00',
        'A100': '#ffc199',
        'A200': '#ffd1b3',
        'A400': '#ffe0cc',
        'A700': '#803200'
    };
    $mdThemingProvider.definePalette('customWarn', customWarn);

    var customBackground = {
        '50': '#737373',
        '100': '#666666',
        '200': '#595959',
        '300': '#4d4d4d',
        '400': '#404040',
        '500': '#333',
        '600': '#262626',
        '700': '#1a1a1a',
        '800': '#0d0d0d',
        '900': '#000000',
        'A100': '#808080',
        'A200': '#8c8c8c',
        'A400': '#999999',
        'A700': '#000000'
    };
    $mdThemingProvider.definePalette('customBackground', customBackground);
    
    //$mdThemingProvider.theme('default').primaryPalette('lime');
    //$mdThemingProvider.theme('default').accentPalette('customAccent');
    //$mdThemingProvider.theme('default').warnPalette('customWarn');
    //$mdThemingProvider.theme('default').backgroundPalette('customBackground');
    //$mdThemingProvider.theme('default').backgroundPalette('grey');
/*
    var background = $mdThemingProvider.extendPalette('grey', {
      'A100': 'f2f2f2'
    });
    $mdThemingProvider.definePalette('background', background);
    $mdThemingProvider.theme('default').backgroundPalette('background');
*/    
});