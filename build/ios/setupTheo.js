const theoReplaceAll = require('../common/theoReplaceAll');

function convertToMap(str) {
  str = str.replace('rgba(', '').replace(')', '');
  var res = str.split(' ');
  var prefix = [
    '"x":',
    ', "y":',
    ', "radius":',
    ', "red":',
    '"green":',
    '"blue":',
    '"alpha":',
  ];
  var text = '';
  for (i = 0; i < res.length; i++) {
    text += prefix[i] + ' ' + res[i];
  }
  text = '[' + text + ']';
  return text;
}

module.exports = (theo) => {
  theo.registerValueTransform(
    'ios-convert-to-map',
    (prop) => prop.get('type') === 'shadow',
    (prop) => {
      let valueShadow = prop.get('value');
      return convertToMap(`${valueShadow}`);
    }
  );

  theo.registerValueTransform(
    'ios-remove-pixel',
    (prop) =>
      prop.get('type') === 'unit' ||
      prop.get('type') === 'number' ||
      prop.get('type') === 'size' ||
      prop.get('type') === 'shadow',
    (prop) => theoReplaceAll(`${prop.get('value')}`, 'px', '')
  );

  theo.registerTransform('ios', ['ios-convert-to-map', 'ios-remove-pixel']);

  theo.registerFormat('json', require('./formatToJSON'));
};