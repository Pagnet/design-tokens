const StyleDictionary = require('style-dictionary');

StyleDictionary.registerTransform({
  name: 'android-font-size-sp',
  type: 'value',
  matcher: (prop) => prop.category === 'font-size',
  transformer: (prop) => prop.original.value + 'sp',
});

StyleDictionary.registerTransform({
  name: 'android-border-width-dp',
  type: 'value',
  matcher: (prop) => prop.category === 'border-width',
  transformer: (prop) => prop.original.value + 'dp',
});

StyleDictionary.registerTransform({
  name: 'android-radius-dp',
  type: 'value',
  matcher: (prop) => prop.category === 'radius',
  transformer: (prop) => prop.original.value + 'dp',
});

StyleDictionary.registerTransformGroup({
  name: 'custom/android',
  transforms: [
    'attribute/cti',
    'name/cti/snake',
    'android-font-size-sp',
    'android-border-width-dp',
    'android-radius-dp',
  ],
});
