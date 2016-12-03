const fs   = require('fs');
const path = require('path');
const http = require('axios');
const repo = 'Stemn/Stemn-Desktop';

const rootPath = './';
const releaseFilePath = path.join(rootPath, 'updates.json');

const appName = 'Stemn'
const owner   = 'Stemn';
const repo    = 'Stemn-Desktop';
const domain  = 'https://github.com';

const getFileData = (tag) => {
  return {
    "linux-x64-prod": {
      "update"   : `${domain}/{${owner}/${repo}/releases/download/v${tag}/${appName}-${tag}-x86_64.AppImage`,
      "install"  : `${domain}/{${owner}/${repo}/releases/download/v${tag}/${appName}-${tag}-x86_64.AppImage`,
      "version"  : tag,
      "platform" : "linux",
      "readme"   : ""
    },
    "win32-x64-prod": {
      "update"   : `${domain}/{${owner}/${repo}/releases/download/v${tag}`,
      "install"  : `${domain}/{${owner}/${repo}/releases/download/v${tag}/${appName}-Setup-${tag}.exe`,
      "version"  : tag,
      "platform" : "win32",
      "readme"   : ""
    },
    "darwin-x64-prod": {
      "update"   : `${domain}/{${owner}/${repo}/releases/download/v${tag}/release.json`,
      "install"  : `${domain}/{${owner}/${repo}/releases/download/v${tag}/Stemn-${tag}.dmg`,
      "version"  : tag,
      "platform" : "darwin",
      "readme"   : ""
    }
  }
}


{
  "linux-x64-prod": {
    "readme": "Second release",
    "update": "https://github.com/megahertz/electron-simple-updater/releases/download/linux-x64-prod-v0.0.2/simple-updater-example-0.0.2-x86_64.AppImage",
    "install": "https://github.com/megahertz/electron-simple-updater/releases/download/linux-x64-prod-v0.0.2/simple-updater-example-0.0.2-x86_64.AppImage",
    "version": "0.0.2"
  },
  "win32-x64-prod": {
    "readme": "Second release",
    "update": "https://github.com/megahertz/electron-simple-updater/releases/download/win32-x64-prod-v0.0.2",
    "install": "https://github.com/megahertz/electron-simple-updater/releases/download/win32-x64-prod-v0.0.2/Simple.Updater.Example.Setup.0.0.2.exe",
    "version": "0.0.2"
  },
  "darwin-x64-prod": {
    "readme": "Second Release",
    "update": "https://github.com/megahertz/electron-simple-updater/releases/download/darwin-x64-prod-v0.0.2/release.json",
    "version": "0.0.2"
  }
}


console.log('Fetching latest version from github...');
http({
  method: 'GET',
  url: `https://api.github.com/repos/${repo}/releases/latest`
}).then(response => {
  const tagName = response.data.tag_name.startsWith('v') ? response.data.tag_name.substring(1) : response.data.tag_name;
  console.log('Latest version: ' + tagName);
  const updatesData = getFileData(tagName);
  fs.writeFileSync(releaseFilePath, JSON.stringify(updatesData, null, '  '));
});

