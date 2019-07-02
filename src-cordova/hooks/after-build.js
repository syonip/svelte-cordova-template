const fs = require('fs')


const cordovaConfigPath = 'config.xml'

fs.renameSync(`${cordovaConfigPath}.backup`, cordovaConfigPath)