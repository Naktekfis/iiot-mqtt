const mqtt = require('mqtt')
const broker_address = 'mqtt://localhost:1883'
const client = mqtt.connect(broker_address, {
  protocolVersion: 4,
  reconnectPeriod: 2000,
  connectTimeout: 5000,
})

var t = 0
var timerStarted = false

client.on('connect', function() {
  console.log("Connected to broker, publishing...")
  if (timerStarted) {
    return
  }
  timerStarted = true

  setInterval(function() {
    t++
    let y = Math.round(50 + 20 * Math.sin(0.2 * t))
    let message = y.toString()
    let topic = "topik"
    client.publish(topic, message)
    console.log(`Published: ${message} to topic: ${topic}`)
  }, 100)
})

client.on('reconnect', function() {
  console.log('Reconnecting to broker...')
})

client.on('error', function(err) {
  console.error('MQTT error:', err.message)
})

client.on('close', function() {
  console.log('Connection closed')
})