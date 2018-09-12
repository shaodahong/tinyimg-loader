module.exports = async function tinyPng(file) {
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

    return compressFile
  } catch (error) {}
}
