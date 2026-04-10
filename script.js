var hostname = 'localhost'
var port = 8883
var clientId = 'WebSocket_' + new Date().getTime()
var topic = 'topik'

var mqttClient = new Paho.MQTT.Client(hostname, port, clientId)
mqttClient.onMessageArrived = MessageArrived
mqttClient.onConnectionLost = ConnectionLost

Connect()

function setStatus(text) {
  var statusEl = document.getElementById('status')
  if (statusEl) {
    statusEl.textContent = 'Status: ' + text
  }
}

function Connect() {
  mqttClient.connect({
    onSuccess: Connected,
    onFailure: ConnectionFailed,
    keepAliveInterval: 10,
  })
}

function Connected() {
  console.log('Connected to MQTT-over-WebSocket broker.')
  setStatus('connected')
  mqttClient.subscribe(topic)
}

function ConnectionFailed(res) {
  console.log('Connect failed: ' + res.errorMessage)
  setStatus('connect failed')
  setTimeout(Connect, 2000)
}

function ConnectionLost(res) {
  if (res.errorCode !== 0) {
    console.log('Connection lost: ' + res.errorMessage)
    setStatus('reconnecting...')
    setTimeout(Connect, 1000)
  }
}

function MessageArrived(message) {
  var value = parseInt(message.payloadString, 10)
  if (Number.isNaN(value)) {
    return
  }

  var clamped = Math.max(0, Math.min(100, value))
  var bar = document.getElementById('top')

  bar.style.height = clamped + '%'
  bar.textContent = clamped + '%'
}
