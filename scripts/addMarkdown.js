const fs = require('fs')
const findMarkdown = require('./findMarkdown')
const rootDir = './docs/articles'

findMarkdown(rootDir, writeComponents)

function writeComponents(dir) {
  console.log(dir)
  fs.appendFile(dir, `\n <git-talk/>`, err => {
    if (err) throw err
    console.log(`add components to ${dir}`)
  })
}
