(function () {
  var hostname = '192.168.56.1'
  var port = 8883
  var clientId = 'Chat_' + Date.now() + '_' + Math.floor(Math.random() * 1000)

  var statusEl = document.getElementById('status')
  var messagesEl = document.getElementById('messages')
  var nicknameEl = document.getElementById('nickname')
  var topicEl = document.getElementById('topic')
  var messageInputEl = document.getElementById('messageInput')
  var composeFormEl = document.getElementById('composeForm')

  var currentTopic = topicEl.value.trim() || 'chat/room-1'
  var client = new Paho.MQTT.Client(hostname, port, clientId)

  client.onConnectionLost = onConnectionLost
  client.onMessageArrived = onMessageArrived

  connect()

  composeFormEl.addEventListener('submit', function (event) {
    event.preventDefault()

    var text = messageInputEl.value.trim()
    if (!text) {
      return
    }

    var payload = {
      sender: (nicknameEl.value || 'user').trim(),
      message: text,
      ts: new Date().toISOString(),
    }

    var packet = new Paho.MQTT.Message(JSON.stringify(payload))
    packet.destinationName = currentTopic
    packet.qos = 0
    client.send(packet)

    appendBubble(payload, true)
    messageInputEl.value = ''
    messageInputEl.focus()
  })

  topicEl.addEventListener('change', function () {
    var nextTopic = topicEl.value.trim()
    if (!nextTopic || nextTopic === currentTopic) {
      topicEl.value = currentTopic
      return
    }

    if (client.isConnected()) {
      client.unsubscribe(currentTopic)
      currentTopic = nextTopic
      client.subscribe(currentTopic)
      setStatus('Connected | topic: ' + currentTopic)
      appendSystem('Switched topic to ' + currentTopic)
      return
    }

    currentTopic = nextTopic
    appendSystem('Topic changed to ' + currentTopic + ' (waiting for reconnect)')
  })

  function connect() {
    setStatus('Connecting...')
    client.connect({
      timeout: 5,
      useSSL: false,
      keepAliveInterval: 20,
      onSuccess: onConnect,
      onFailure: onConnectFailure,
    })
  }

  function onConnect() {
    client.subscribe(currentTopic)
    setStatus('Connected | topic: ' + currentTopic)
    appendSystem('Connected to ws://' + hostname + ':' + port)
  }

  function onConnectFailure(err) {
    setStatus('Connect failed: retrying')
    appendSystem('Connect failed: ' + (err.errorMessage || 'unknown error'))
    setTimeout(connect, 2000)
  }

  function onConnectionLost(response) {
    if (response.errorCode !== 0) {
      setStatus('Disconnected: retrying...')
      appendSystem('Connection lost: ' + response.errorMessage)
      setTimeout(connect, 1500)
    }
  }

  function onMessageArrived(message) {
    var payload
    try {
      payload = JSON.parse(message.payloadString)
    } catch (error) {
      payload = {
        sender: 'unknown',
        message: message.payloadString,
        ts: new Date().toISOString(),
      }
    }

    var isMe = ((nicknameEl.value || 'user').trim() || 'user') === payload.sender
    if (!isMe) {
      appendBubble(payload, false)
    }
  }

  function appendSystem(text) {
    var el = document.createElement('div')
    el.className = 'bubble other'
    el.textContent = text
    messagesEl.appendChild(el)
    messagesEl.scrollTop = messagesEl.scrollHeight
  }

  function appendBubble(payload, mine) {
    var bubble = document.createElement('div')
    bubble.className = 'bubble ' + (mine ? 'me' : 'other')

    var sender = document.createElement('strong')
    sender.textContent = payload.sender || 'user'

    var body = document.createElement('div')
    body.textContent = payload.message || ''

    var meta = document.createElement('span')
    meta.className = 'meta'

    var time = 'unknown time'
    if (payload.ts) {
      var d = new Date(payload.ts)
      if (!Number.isNaN(d.getTime())) {
        time = d.toLocaleTimeString()
      }
    }

    meta.textContent = time

    bubble.appendChild(sender)
    bubble.appendChild(body)
    bubble.appendChild(meta)

    messagesEl.appendChild(bubble)
    messagesEl.scrollTop = messagesEl.scrollHeight
  }

  function setStatus(text) {
    statusEl.textContent = text
  }
})()
