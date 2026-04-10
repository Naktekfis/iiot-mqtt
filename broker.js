const { Aedes } = require('aedes')
const net = require('net')
const http = require('http')
const ws = require('websocket-stream')

const broker_port = 1883
const websocket_port = 8883

async function startBroker() {
  const aedes = await Aedes.createBroker()

  const broker = net.createServer(aedes.handle)
  const httpServer = http.createServer()
  ws.createServer({ server: httpServer }, aedes.handle)

  httpServer.listen(websocket_port, function () {
    console.log('Aedes MQTT-WS listening on port: ' + websocket_port)
  })

  broker.listen(broker_port, function () {
    console.log('MQTT broker started and listening on port ', broker_port)
  })

  aedes.on('client', function (client) {
    console.log('Client connected:', client ? client.id : 'unknown')
  })

  aedes.on('clientDisconnect', function (client) {
    console.log('Client disconnected:', client ? client.id : 'unknown')
  })

  aedes.on('publish', function (packet, client) {
    if (client && packet && packet.topic) {
      console.log('Published:', packet.topic, '-', packet.payload.toString())
    }
  })
}

startBroker().catch(function (err) {
  console.error('Failed to start broker:', err)
  process.exit(1)
})