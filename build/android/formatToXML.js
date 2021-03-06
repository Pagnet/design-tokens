const _ = require('lodash');
const xml = require('xml');

const discardedCategories = [
  'font-weight',
  'font-family',
  'box-shadow',
  'opacity',
  'radius',
];

module.exports = (def) => {
  const o = {
    resources: def
      .get('props')
      .filter((prop) => !discardedCategories.includes(prop.get('category')))
      .map((prop) => {
        const key = (() => {
          const newLocal = prop.get('type');
          switch (newLocal) {
            case 'color':
              return 'color';
            case 'size':
              return 'dimen';
            case 'number':
              return 'integer';
            case 'string':
              return 'string';
            default:
              return 'dimen';
          }
        })();

        return {
          [key]: [
            {
              _attr: {
                name: _.toLower(`ocean_${prop.get('name')}`).replace(
                  /[-]/g,
                  '_'
                ),
                category: prop.get('category'),
              },
            },
            prop.get('value'),
          ],
        };
      })
      .toJS(),
  };

  return xml(o, {
    indent: '  ',
    declaration: true,
  });
};
