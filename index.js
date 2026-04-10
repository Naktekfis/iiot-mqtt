const http = require('http')
const fs = require('fs')
const path = require('path')

const host = 'localhost'
const port = 8080

const requestListener = function (request, response) {
  const pathname = request.url === '/' ? '/index.html' : request.url
  const filePath = path.join(__dirname, pathname)

  if (!fs.existsSync(filePath)) {
    response.writeHead(404, { 'Content-Type': 'text/plain' })
    response.end('Not Found')
    return
  }

  const ext = path.extname(filePath)
  const contentType = ext === '.js' ? 'application/javascript' : 'text/html'
  const content = fs.readFileSync(filePath, 'utf8')

  response.writeHead(200, { 'Content-Type': contentType })
  response.end(content)
}

const server = http.createServer(requestListener)

server.listen(port, host, () => {
  console.log(`Subscriber web server is running on http://${host}:${port}`)
})
