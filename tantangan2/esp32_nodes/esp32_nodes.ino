#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "Fictivorce";
const char* password = "wisokakugimana";

// Pastikan IP ini sama persis dengan yang ada di komputer Anda
const char* mqttServer = "10.110.99.109";
const int mqttPort = 1883;

WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);

// Konfigurasi Pin Tanpa Kabel/Breadboard (Pure USB 100%)
const int buttonPin = 0; // Pin 0 adalah tombol "BOOT" bawaan yang ada pada papan ESP32
const int ledPin = 2;    // Pin 2 adalah LED Biru bawaan ESP32

// Variabel untuk counter & debounce
int hitungan_tombol = 0;
int lastButtonState = HIGH; // Karena pakai PULLUP, default HIGH
unsigned long lastDebounceTime = 0;
const unsigned long debounceDelay = 50;

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Menghubungkan ke ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi berhasil terhubung!");
  Serial.print("Alamat IP ESP32: ");
  Serial.println(WiFi.localIP());
}

// Fungsi Callbak Ini dipanggil tiap kali ESP32 menerima pesan (Subscriber event)
void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Pesan masuk dari topik [");
  Serial.print(topic);
  Serial.print("]: ");

  String msg = "";
  for (int i = 0; i < length; i++) {
    msg += (char)payload[i];
  }
  Serial.println(msg);

  // Filter khusus untuk topik kontrol lampu
  if (String(topic) == "esp32/led") {
    if (msg == "ON") {
      digitalWrite(ledPin, HIGH);
      Serial.println("=> LED Dinyalakan lewat Web");
    }
    else if (msg == "OFF") {
      digitalWrite(ledPin, LOW);
      Serial.println("=> LED Dimatikan lewat Web");
    }
  }
}

void reconnect() {
  while (!mqttClient.connected()) {
    Serial.print("Mencoba koneksi MQTT...");
    // Attempt to connect dengan Client ID
    String clientId = "ESP32_Node_Client_";
    clientId += String(random(0xffff), HEX);

    if (mqttClient.connect(clientId.c_str())) {
      Serial.println("Terkoneksi ke Broker!");
      // Setelah konek, daftarkan subscribe untuk menerima perintah kontrol LED
      mqttClient.subscribe("esp32/led");
    } else {
      Serial.print("Gagal, status=");
      Serial.print(mqttClient.state());
      Serial.println(" mencoba kembali dalam 5 detik");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);

  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW); // Matikan led secara default

  setup_wifi();

  mqttClient.setServer(mqttServer, mqttPort);
  mqttClient.setCallback(callback);
}

void loop() {
  if (!mqttClient.connected()) {
    reconnect();
  }
  mqttClient.loop();

  // Membaca input tombol dengan teknik Debounce (Falling Edge Detection)
  int reading = digitalRead(buttonPin);

  // Deteksi: tombol baru saja DITEKAN (transisi HIGH → LOW)
  if (reading == LOW && lastButtonState == HIGH) {
    unsigned long now = millis();
    if (now - lastDebounceTime > debounceDelay) {
      lastDebounceTime = now;
      hitungan_tombol++;
      Serial.print("Tombol dipencet! Total: ");
      Serial.println(hitungan_tombol);

      // Publish data counter ke topik 'esp32/counter'
      String counterStr = String(hitungan_tombol);
      mqttClient.publish("esp32/counter", counterStr.c_str());
    }
  }
  lastButtonState = reading;
}
