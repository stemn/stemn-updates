const fs   = require('fs');
const path = require('path');
const http = require('axios');
const repo = 'Stemn/Stemn-Desktop';

const rootPath = './';
const releaseFilePath = path.join(rootPath, 'updates.json');

const getFileData = (tag) => {
  return {
    "linux-x64-prod": {
      "update": `https://github.com/Stemn/Stemn-Desktop/releases/download/v${tag}/Stemn-${tag}-x86_64.AppImage`,
      "version": tag,
      "platform": "linux",
      "readme": ""
    },
    "win32-x64-prod": {
      "update": `https://github.com/Stemn/Stemn-Desktop/releases/download/v${tag}`,
      "version": tag,
      "platform": "win32",
      "readme": ""
    },
    "darwin-x64-prod": {
      "update": `https://github.com/Stemn/Stemn-Desktop/releases/download/v${tag}/Stemn-${tag}-mac.zip`,
      "version": tag,
      "platform": "darwin",
      "readme": ""
    }
  }
}

console.log('Fetching latest version from github...');
http({
  method: 'GET',
  url: `https://api.github.com/repos/${repo}/releases/latest`
}).then(response => {
  const tagName = response.data.tag_name.startsWith('v') ? response.data.tag_name.substring(1) : response.data.tag_name;
  console.log('Latest version: ' + tagName);
  fs.writeFileSync(releaseFilePath, JSON.stringify(getFileData(tagName), null, '  '));
});

