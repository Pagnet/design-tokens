const StyleDictionaryPackage = require('style-dictionary');
const fs = require('fs');
const _ = require('lodash');

require('./transforms/android');

StyleDictionaryPackage.registerFormat({
  name: 'android/xml',
  formatter: _.template(
    fs.readFileSync(__dirname + '/templates/android-xml.template')
  ),
});

function getStyleDictionaryConfig(platform) {
  return {
    source: ['src/globals/**/*.json', `src/platforms/${platform}/*.json`],
    platforms: {
      web: {
        transformGroup: 'web',
        buildPath: 'dist/web/',
        files: [
          {
            destination: 'tokens.scss',
            format: 'scss/variables',
            options: { showFileHeader: false },
          },
        ],
      },
      android: {
        transformGroup: 'custom/android',
        buildPath: 'dist/android/',
        files: [
          {
            destination: 'tokens.xml',
            format: 'android/xml',
            options: { showFileHeader: false },
          },
        ],
      },
      ios: {
        transformGroup: 'ios-swift',
        buildPath: 'dist/ios/',
        files: [
          {
            destination: 'tokens.swift',
            format: 'ios-swift/class.swift',
            className: 'DesignTokens',
            options: { showFileHeader: false },
          },
        ],
      },
    },
  };
}

console.log('Build started...');
['web', 'ios', 'android'].map(function (platform) {
  console.log('\n==============================================');
  console.log(`\nProcessing: [${platform}]`);

  const StyleDictionary = StyleDictionaryPackage.extend(
    getStyleDictionaryConfig(platform)
  );
  StyleDictionary.buildPlatform(platform);

  console.log('\nEnd processing');
});

console.log('\n==============================================');
console.log('\nBuild completed!');
