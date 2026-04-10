(function () {
  const hostname = '10.110.99.109';
  const port = 8883;
  const clientId = 'Dash_' + Date.now() + '_' + Math.floor(Math.random() * 1000);

  const statusEl = document.getElementById('status');
  const counterValueEl = document.getElementById('counterValue');
  const btnOn = document.getElementById('btnOn');
  const btnOff = document.getElementById('btnOff');

  const client = new Paho.MQTT.Client(hostname, port, clientId);

  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;

  connect();

  function connect() {
    statusEl.textContent = 'Menghubungkan ke Broker...';
    statusEl.className = 'status offline';

    client.connect({
      timeout: 5,
      useSSL: false,
      keepAliveInterval: 20,
      onSuccess: onConnect,
      onFailure: onConnectFailure,
    });
  }

  function onConnect() {
    statusEl.textContent = 'Live • Tersambung';
    statusEl.className = 'status';

    // Subscribe ke topic nilai counter
    client.subscribe("esp32/counter");
  }

  function onConnectFailure(err) {
    statusEl.textContent = 'Gagal Sambung, mencoba lagi...';
    setTimeout(connect, 3000);
  }

  function onConnectionLost(response) {
    if (response.errorCode !== 0) {
      statusEl.textContent = 'Koneksi Terputus...';
      statusEl.className = 'status offline';
      setTimeout(connect, 2000);
    }
  }

  function onMessageArrived(message) {
    console.log("Pesan Masuk Bro!", message.destinationName, message.payloadString);
    // Langsung update angka apapun kondisinya buat nge-test
    updateCounter(message.payloadString);
  }

  function updateCounter(value) {
    counterValueEl.textContent = value;

    // Memberikan animasi efek loncat kecil ketika angka berubah
    counterValueEl.classList.remove('pop');
    void counterValueEl.offsetWidth; // Memicu reflow browser
    counterValueEl.classList.add('pop');

    setTimeout(() => {
      counterValueEl.classList.remove('pop');
    }, 200);
  }

  // Publish Logika Kontrol LED
  btnOn.addEventListener('click', () => {
    if (client.isConnected()) {
      let packet = new Paho.MQTT.Message("ON");
      packet.destinationName = "esp32/led";
      packet.qos = 0;
      client.send(packet);
    }
  });

  btnOff.addEventListener('click', () => {
    if (client.isConnected()) {
      let packet = new Paho.MQTT.Message("OFF");
      packet.destinationName = "esp32/led";
      packet.qos = 0;
      client.send(packet);
    }
  });
})();
