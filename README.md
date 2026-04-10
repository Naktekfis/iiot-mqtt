# IIoT MQTT — Praktikum TF4061

> Repositori proyek praktikum **Industrial Internet of Things (IIoT)** — Teknik Fisika ITB.
> Mengimplementasikan protokol komunikasi **MQTT** menggunakan Node.js (broker & server) dan ESP32 (IoT Node).

---

## Struktur Proyek

```
iiot-mqtt
├── broker.js              # MQTT Broker (TCP + WebSocket)
├── publisher.js           # Publisher Node.js (gelombang sinus)
├── index.js               # HTTP Server untuk subscriber web
├── index.html             # Subscriber UI (bar chart sinyal)
├── script.js              # Logika Paho MQTT subscriber
│
├── tantangan1/
│   ├── chat.html          # UI aplikasi chat real-time
│   └── chat.js            # Logika Paho MQTT (pub+sub via WebSocket)
│
├── tantangan2/
│   ├── dashboard.html     # IoT Dashboard UI
│   ├── dashboard.js       # Logika Paho MQTT (subscriber counter + publisher LED)
│   └── esp32_nodes/
│       └── esp32_nodes.ino  # Program Arduino ESP32 (WiFi + MQTT)
│
└── documentation/         # Modul praktikum (PDF & Markdown)
```

---

## Cara Menjalankan

### Prasyarat
- **Node.js** (versi LTS)
- **npm** (sudah terinstall otomatis bersama Node.js)
- **Arduino IDE** (untuk bagian ESP32)
- **Browser** (Chrome / Edge)

### 1. Install Dependencies
```bash
npm install
```

### 2. Jalankan Broker
```bash
node broker.js
```
> Broker akan berjalan di:
> - TCP MQTT : port `1883`
> - WebSocket MQTT : port `8883`

---

## Praktikum

### Subscriber Bar Chart

Menampilkan data gelombang sinus dari `publisher.js` ke dalam UI bar di browser.

```bash
# Terminal 1 — Broker
node broker.js

# Terminal 2 — Publisher (mengirim data sinus)
node publisher.js

# Terminal 3 — HTTP Server subscriber
node index.js
```
Buka browser di: **http://localhost:8080**

---

### Browser Chat App

Aplikasi **chat real-time** antar dua browser menggunakan MQTT sebagai transport layer.  
Setiap browser berlaku sebagai **Publisher** sekaligus **Subscriber** secara bersamaan.

```bash
node broker.js
```

Buka `tantangan1/chat.html` di **dua tab browser berbeda** (atau dua komputer berbeda dalam satu jaringan).

**Fitur:**
- ✅ Chat real-time antar browser
- ✅ Nickname & topic yang bisa dikustomisasi
- ✅ Bubble chat (pesan sendiri vs pesan orang lain)
- ✅ Auto-reconnect saat koneksi terputus

> **Catatan:** Ubah `hostname` di `tantangan1/chat.js` menjadi IP komputer yang menjalankan broker jika diakses dari komputer lain.

---

### ESP32 IoT Node + Dashboard

Sistem IoT dua arah antara **ESP32** (IoT Node fisik) dan **Web Dashboard** di browser.

| Arah | Aksi | Topik MQTT |
|------|------|------------|
| ESP32 → Browser | Tekan tombol BOOT → counter bertambah | `esp32/counter` |
| Browser → ESP32 | Klik TURN ON/OFF → LED nyala/mati | `esp32/led` |

**Setup ESP32 (`tantangan2/esp32_nodes/esp32_nodes.ino`):**
1. Buka file `.ino` di **Arduino IDE**
2. Isi `ssid` dan `password` sesuai jaringan WiFi Anda
3. Isi `mqttServer` dengan **IP komputer** yang menjalankan broker
4. Upload ke ESP32

> Kode ini menggunakan:
> - **Tombol BOOT** (GPIO 0) bawaan ESP32 sebagai input counter
> - **LED Biru** (GPIO 2) bawaan ESP32 sebagai output kontrol

**Jalankan Dashboard:**
```bash
node broker.js
```
Buka `tantangan2/dashboard.html` di browser.

---

## Teknologi yang Digunakan

| Teknologi | Peran |
|-----------|-------|
| [Node.js](https://nodejs.org/) | Runtime environment server-side |
| [Aedes](https://github.com/moscajs/aedes) | MQTT Broker library |
| [MQTT.js](https://github.com/mqttjs/MQTT.js) | MQTT Client untuk Node.js |
| [websocket-stream](https://github.com/maxogden/websocket-stream) | Bridge WebSocket ↔ MQTT |
| [Paho MQTT](https://www.eclipse.org/paho/index.php?page=clients/js/index.php) | MQTT Client JavaScript untuk browser |
| [Arduino ESP32](https://github.com/espressif/arduino-esp32) | Framework Arduino untuk ESP32 |
| [PubSubClient](https://github.com/knolleary/pubsubclient) | Library MQTT untuk Arduino/ESP32 |

---

## Referensi

- Modul TF4061 — Program Studi Teknik Fisika ITB
- [Aedes Documentation](https://github.com/moscajs/aedes)
- [MQTT Protocol Specification](https://mqtt.org/)
- [ESP32 Arduino Core](https://github.com/espressif/arduino-esp32)
