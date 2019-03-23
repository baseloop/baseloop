const path = require('path')
const fse = require('fs-extra')
const del = require('del')

const inputPath = path.resolve(__dirname, '../dist/client')
const outputPath = path.resolve(__dirname, '../../../website')

function cleanOutputPath() {
  del.sync([outputPath + '/**', `!${outputPath}/_headers`, `!${outputPath}/CNAME`, `!${outputPath}/_redirects`, `!${outputPath}`], {force: true});
}

function copyCompiledFilesToOutputPath() {
  fse.copy(inputPath, outputPath)
}

cleanOutputPath()
copyCompiledFilesToOutputPath()
