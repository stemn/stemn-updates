const fs   = require('fs');
const path = require('path');
const http = require('axios');

const rootPath = './';
const releaseFilePath = path.join(rootPath, 'updates.json');

const appName = 'Stemn'
const owner   = 'Stemn';
const repo    = 'Stemn-Desktop';
const domain  = 'https://github.com';

const getFileData = (tag) => {
  return {
    "linux-x64-prod": {
      "update"   : `${domain}/${owner}/${repo}/releases/download/v${tag}/${appName}-${tag}-x86_64.AppImage`,
      "install"  : `${domain}/${owner}/${repo}/releases/download/v${tag}/${appName}-${tag}-x86_64.AppImage`,
      "version"  : tag,
      "platform" : "linux",
      "readme"   : ""
    },
    "win32-x64-prod": {
      "update"   : `${domain}/${owner}/${repo}/releases/download/v${tag}`,
      "install"  : `${domain}/${owner}/${repo}/releases/download/v${tag}/${appName}-Setup-${tag}.exe`,
      "version"  : tag,
      "platform" : "win32",
      "readme"   : ""
    },
    "darwin-x64-prod": {
      "update"   : `${domain}/${owner}/${repo}/releases/download/v${tag}/release.json`,
      "install"  : `${domain}/${owner}/${repo}/releases/download/v${tag}/Stemn-${tag}.dmg`,
      "version"  : tag,
      "platform" : "darwin",
      "readme"   : ""
    }
  }
}

console.log('Fetching latest version from github...');
http({
  method: 'GET',
  url: `https://api.github.com/repos/${owner}/${repo}/releases`
}).then(response => {
  const releases = response.data.map(release => release.tag_name);
  const latestRelease = releases[0]
  const tagName = latestRelease.startsWith('v') ? latestRelease.substring(1) : latestRelease;
  console.log('Latest version: ' + tagName);
  const updatesData = getFileData(tagName);
  fs.writeFileSync(releaseFilePath, JSON.stringify(updatesData, null, '  '));
});

