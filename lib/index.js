const http = require('axios')
const crypto = require('crypto')
const fs = require('fs-extra')
const path = require('path')

module.exports = async function(file) {
  // cache path
  const cachePath = path.join(process.cwd(), 'node_modules/.tinyimg')
  const hashname = crypto
    .createHash('md5')
    .update(file)
    .digest('hex')

  const filePath = path.join(cachePath, hashname)

  if (await fs.pathExists(filePath)) {
    return await fs.readFile(filePath)
  }

  this.cacheable && this.cacheable()

  let options = (this.query && this.query.replace(/^\?/, '')) || {}
  try {
    const result = await http({
      method: 'post',
      url: 'https://tinypng.com/web/shrink',
      headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-cn,zh;q=0.8,en-us;q=0.5,en;q=0.3',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Connection: 'keep-alive',
        Host: 'tinypng.com',
        DNT: 1,
        Referer: 'https://tinypng.com/',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:42.0) Gecko/20100101 Firefox/42.0'
      },
      data: file
    })
    const compressFile = await http({
      method: 'get',
      url: result.data.output.url,
      responseType: 'arraybuffer'
    })

    await fs.outputFile(filePath, compressFile.data)
    return compressFile.data
  } catch (error) {
    console.log('tiny-png compress error:', error)
    return file
  }
}

module.exports.raw = true
