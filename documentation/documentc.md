# Institut Teknologi Bandung
## Program Studi Teknik Fisika

| PRAKTIKUM | TF4061<br>Industrial Internet of Things | 2+1 SKS | Dr. Ir. Eko Mursito Budi, MT IPM<br>Faqihza Mukhlish, ST MT Ph.D |
| :--- | :--- | :--- | :--- |

---

# 4 PENGENALAN LAYER PEMROSESAN DATA

## 4.1 LATAR BELAKANG

*Server* adalah sistem *software* dan *hardware* komputer yang didedikasikan untuk melayani: menerima *request* dan memberi *response* dari/ke *client* dalam suatu jaringan komputer. Server dibangun berdasarkan keperluan yang dijalankan, misalnya untuk *website, database*, transfer file, e-mail, dan aplikasi web lainnya, termasuk IOT. IOT-Server merupakan komponen penting dalam arsitektur IOT untuk melayani proses dari/ke IOT-Node dan menjalankan proses lain yang diperlukan.

Saat ini tersedia berbagai *software* untuk membangun *server*, misalnya Nginx, Apache, dan Node.js. Node.js sendiri lebih tepat disebut sebagai *runtime environment*, dimana aplikasi *server* dapat dirancang di dalamnya. IOT-Server dalam praktikum ini dibangun menggunakan Node.js. Terdapat berbagai *package* dalam Node.js yang dapat mempermudah perancangan aplikasi. Salah satu *package* untuk memudahkan perancangan IOT-Server secara visual adalah Node-RED.

## 4.2 CAPAIAN PEMBELAJARAN
a. Mahasiswa dapat membangun IOT-Server sederhana menggunakan Node-RED dalam jaringan lokal.

## 4.3 ALAT & BAHAN

| No | Item | Banyak | Keterangan |
| :--- | :--- | :--- | :--- |
| 1 | Komputer / laptop yang sudah ter-*install* **Node-RED** beserta *palette* tambahan **node-red-dashboard** dan **node-red-contrib-aedes** | 1 | Disediakan peserta |
| 2 | Jaringan Internet | 1 | |

## 4.4 PANDUAN TEKNIS

**Panduan instalasi Node-RED:**
*   (Linux) https://nodered.org/docs/getting-started/local
*   (Windows) https://nodered.org/docs/getting-started/windows

**Panduan instalasi palette node-red-dashboard dan node-red-contrib-aedes:**
1.  Setelah menginstall Node-RED, jalankan Node-RED: buka terminal, ketik `node-red`, **Enter**.
2.  Buka Node-RED Editor: buka web browser (mis. Chrome), buka alamat `localhost:1880`
3.  Pada bagian header di Node-RED Editor, klik icon menu >> **Manage palette**.

![Gambar 1.4.1. Bagian-bagian User Interface (UI) Node-RED Editor](image_placeholder)
*(ref https://nodered.org/docs/user-guide/editor/)*

4.  Klik tab **Install**, search `node-red-dashboard`, klik **install**, terima instalasi, tunggu hingga selesai. Lakukan juga untuk *palette* `node-red-contrib-aedes`.
5.  Pastikan kedua *palette* sudah terinstall dengan melihatnya pada daftar node di bagian *palette*.

## 4.5 TUGAS AWAL
*   Install nodeJS dan Node-red, lalu jalankan node-RED dan buatlah program sederhana Hello World!.

---

## 4.6 PRAKTIKUM

1. Nyalakan Laptop. Kemudian jalankan Node-RED dengan cara: buka Terminal (Linux) atau PowerShell (Windows); ketik `node-red` ; lalu tekan **Enter**.
2. Buka Node-RED Editor dengan cara: buka aplikasi internet browser (mis: Chrome, Firefox, Safari); ketik alamat `localhost:1880` ; lalu tekan **Enter**.

### A. Flow Programming
Pada praktikum pertama ini akan diperkenalkan *flow-based programming* dan *nodes* pada aplikasi Node-RED.

1.  Ketikan alamat `localhost:1880` pada browser anda dan akan muncul layar seperti ini:

    ![Gambar A.1. UI dari Node-RED Versi 2.0.6](image_placeholder)
    *Gambar A.1. UI dari Node-RED Versi 2.0.6*

2.  Saat pertama kali aplikasi node-red dijalankan, akan terdapat satu *workspace* yang aktif dengan nama flow 1. Silahkan klik dua kali pada judul workspace dan ubah nama flow menjadi “Latihan 1 – Basic Node Red”, berikan deskripsi jika diperlukan. Lalu tekan tombol **Done** untuk menyimpan judul.

    ![Gambar A.2. Merubah judul flow](image_placeholder)
    *Gambar A.2. Merubah judul flow*

3.  Pada bagian paling kiri UI Node-RED disebut sebagai **palette**, berisikan node-node yang kita butuhkan untuk membangun pemrograman flow. Sekarang, kita akan membuat program flow sederhana. Klik dan tahan node “inject” lalu lepas di daerah workspace, maka node akan tersimpan di workspace. Lalu lakukan hal yang sama untuk node “debug”, sehingga workspace menjadi seperti gambar berikut:

    ![Gambar A.3. Drag and drop node dari palette ke workspace](image_placeholder)
    *Gambar A.3. Drag and drop node dari palette ke workspace*

    Node “inject” berfungsi untuk memberikan input kepada flow, baik itu secara manual atau per interval. Keluaran node “inject” dapat berupa *String, Number, JavaScript Objects, Timestamp*, dll. Selanjutnya, node “debug” berfungsi untuk menampilkan pesan ke kolom debug, yang dapat diakses pada bagian kanan (sidebar) pada tab debug.

    ![Gambar A.4. Tab Debug pada sidebar](image_placeholder)
    *Gambar A.4. Tab Debug pada sidebar*

4.  Hubungkan node inject dengan node debug dengan cara menarik garis (wire) dari keluaran inject menuju masukan debug.

    ![Gambar A.5. Wiring antara node](image_placeholder)
    *Gambar A.5. Wiring antara node*

5.  Setelah terhubung, silahkan tekan tombol **Deploy** pada bagian kanan atas UI Node-RED.

    ![Gambar A.6. Tombol Deploy](image_placeholder)
    *Gambar A.6. Tombol Deploy*

6.  Klik node inject dan Amati tab debug.

    ![Gambar A.7. Aktifasi node inject](image_placeholder)
    *Gambar A.7. Aktifasi node inject*

    ![Gambar A.8. Menampilkan message ke kolom Debug](image_placeholder)
    *Gambar A.8. Menampilkan message ke kolom Debug*

> **Tugas 1:**
> Buatlah program yang serupa dengan merubah properti `msg.payload` pada node inject menjadi string dan numbers, lalu tampilkan ke kolom debug.

### B. Node Functions
Pada praktikum ini akan diperkenalkan node function untuk memanipulasi data, menyeleksi data dan merekayasa alur aliran program dari flow.

**Node change**
1.  Buatlah node inject yang terhubung dengan node change lalu terhubung dengan node debug.

    ![Gambar B.1. Program flow dengan node Change](image_placeholder)
    *Gambar B.1. Program flow dengan node Change*

2.  Ubahlah properti dari masing-masing node menjadi sebagai berikut:
    a. Node Inject:
        i. Name = `hello world`
        ii. msg.payload = `[string] hello world!`
        iii. DONE!
    b. Node Change:
        i. Name = `world to dunia`
        ii. Rules : `set->change`, Search for: `world`, Replace with: `dunia`
3.  Deploy, aktifkan inject hello world dan amati kolom debug.

**Node Function**
1.  Buatlah node inject yang terhubung dengan node function lalu terhubung dengan node debug.

    ![Gambar B.2. Program flow dengan node function](image_placeholder)
    *Gambar B.2. Program flow dengan node function*

2.  Ubahlah properti dari node-node berikut:
    a. Node inject:
        i. Name = `number`
        ii. msg.payload = `[number] 10`
    b. Node function:

        ![Gambar B.2. Program flow dengan node function; sintax menggunakan Bahasa javascript](image_placeholder)
        *Gambar B.2. Program flow dengan node function; sintax menggunakan Bahasa javascript*

        *(Transkripsi kode Javascript pada node function di atas):*
        ```javascript
        var data = msg.payload;
        var output = data * 15;
        return {payload: output};
        ```

3.  Deploy, aktifkan inject dan amati kolom debug.

> **Tugas 2:**
> Buatlah program pendeteksi angka yang akan menampilkan output message “atas” jika payload > 10 lalu “bawah” untuk sisanya. Clue: Gunakan Node `switch` dan 2 output pada `function` node atau hubungkan `switch` ke 2 node `function`.

### C. HTTP API (GET & POST)
Pada bagian ini akan dibuat fitur server untuk memberi *response* dari *request* HTTP metode GET dan POST.

1.  Buatlah flow baru dengan nama Latihan 2 – GET dan POST
2.  Buatlah program flow dengan urutan node sebagai berikut: `http in` -> `template` -> `http response`
3.  Edit property http in sebagai berikut:

    ![Gambar C.1. Menggunakan method GET pada “http in” saat mengakses URL localhost:1880/latihan2](image_placeholder)
    *Gambar C.1. Menggunakan method GET pada “http in” saat mengakses URL localhost:1880/latihan2*

4.  Ubah property node template sebagai berikut:

    ![Gambar C.2. Node Template sebagai penyimpan tag HTML](image_placeholder)
    *Gambar C.2. Node Template sebagai penyimpan tag HTML*

5.  Deploy, buka tab browser baru, lalu buka halaman `http://localhost:1880/latihan2`

    ![Gambar C.3. Hasil dari pemrograman flow dengan method GET](image_placeholder)
    *Gambar C.3. Hasil dari pemrograman flow dengan method GET*

6.  Tambahkan nodes `http in`, `function`, dan `debug` sehingga menjadi seperti berikut:

    ![Gambar C.4. Pemrograman flow dengan method GET dan POST](image_placeholder)
    *Gambar C.4. Pemrograman flow dengan method GET dan POST*

    a. Node in:
        i. Method : POST
        ii. URL : `/latihan2`
    b. Node Function:

        ![Gambar C.5. Program javascript pada node function untuk menerima data POST](image_placeholder)
        *Gambar C.5. Program javascript pada node function untuk menerima data POST*

        *(Transkripsi kode javascript pada Gambar C.5):*
        ```javascript
        msg.headers = {};
        msg.headers['Content-Type'] = 'application/json';

        if (msg.req.body.run == "start"){
            msg.statusCode = 200;
            msg.payload = {"info":"Request received correctly, runStatus will turn to start"};
        } else if (msg.req.body.run == "stop"){
            msg.statusCode = 200;
            msg.payload = {"info":"Request received correctly, runStatus will turn to stop"};
        } else {
            msg.statusCode = 400;
            msg.payload = {"info":"Request received but in wrong format."};
        }
        return msg;
        ```

    c. Debug 1: Output: `msg.payload.info`
    d. Debug 2: Output: `complete msg object`

7.  Deploy, kirimkan “start” lalu cek debug dan browser, amati. Lakukan hal yang sama untuk “stop”.
8.  Lakukan pengujian fitur metode HTTP yang telah dibuat, dengan cara: buka CMD (Windows) atau Terminal (Linux); eksekusi perintah berikut:
    ```bash
    curl --request POST --header "Content-Type: application/json" --data "{\"run\":\"start\"}" -i localhost:1880/latihan2
    ```
    Lalu amati keluarannya. Amati juga *response* untuk data yang tidak valid, misalnya dengan mengganti kata `"start"` dengan `"pause"`. Pesan *response* dapat diamati dari terminal dan panel *debug messages* pada bagian kanan Node-RED Editor.

    ![Gambar C.6. Pengujian manual dengan menggunakan CMD (windows) atau terminal (linux, mac)](image_placeholder)
    *Gambar C.6. Pengujian manual dengan menggunakan CMD (windows) atau terminal (linux, mac)*

### D. Membuat Simulasi Plant Temperatur

![Gambar D.1. Program flow untuk simulasi temperatur](image_placeholder)
*Gambar D.1. Program flow untuk simulasi temperatur*

1.  Buatlah flow baru dengan judul: Latihan 3 – Simulated Temperature Plant
2.  Buatlah dua program flow dengan urutan sebagai berikut:
    a. Program 1: `Inject` -> `change` -> `trigger` -> `function` -> `debug`
    b. Program 2: `Inject` -> `change`
3.  Program 1:
    a. Node Inject:
        i. Name: `initial trigger`
    b. Node change:
        i. Name: `dynamic initialization`
        ii. Rules:
            1. Set: `flow.x_temperature` to `[number] 25`
            2. Set: `flow.k_dissipation` to `[number] 0.1`
            3. Set: `flow.k_ambient` to `[number] 2`
            4. Set: `flow.u_heater` to `[number] 0`
            5. Set: `flow.k_temp_increment` to `[number] 3`
    c. Node Trigger
        i. Send: `[number] 1`
        ii. Then: resend it every -> `250 milliseconds`
        iii. Name: `periodic trigger`
    d. Node function:
        i. Name : `plant dynamics`

        ![Gambar D.2. Node function plant dynamics](image_placeholder)
        *Gambar D.2. Node function plant dynamics*

        *(Transkripsi kode javascript pada Gambar D.2):*
        ```javascript
        var k_d = flow.get("k_dissipation");
        var T_now = flow.get("x_temperature");
        var k_a = flow.get("k_ambient");
        var u = flow.get("u_heater");
        var k_inc = flow.get("k_temp_increment");

        var T_next = T_now - (k_d * T_now) + (k_a) + (u * k_inc);

        T_now = T_next;
        flow.set("x_temperature", T_now);

        msg = {topic: "y_temperature", payload: T_now};
        return msg;
        ```

    e. Node Debug: Output -> `complete msg object`
4.  Deploy, aktifkan initial trigger dan amati kolom debug.
5.  Program 2:
    a. Node Inject:
        i. Name: `heater on`
        ii. Msg.payload: `[number] 1`
    b. Node Change:
        i. Name: `heater device`
        ii. Set: `flow.u_heater` to `msg.payload`
6.  Deploy, aktifkan initial trigger, lalu setelah beberapa saat, aktifkan heater on. Amati kolom debug.

### E. Membuat MQTT Broker dan Subscriber
Pada bagian ini akan dibuat fitur *server* berupa *broker* dan *subscriber* MQTT dengan menggunakan program simulasi yang sudah dibuat pada Praktikum D.

1.  Buatlah flow baru dengan nama Latihan 4 – MQTT Broker.
2.  Tambahkan node Aedes Broker, lalu set MQTT port -> `1883` dan WS bind -> `port`. Deploy!

    ![Gambar E.1. Properti untuk Aedes MQTT Broker](image_placeholder)
    *Gambar E.1. Properti untuk Aedes MQTT Broker*

3.  Buatlah flow baru dengan nama Latihan 4 – Simulated IOT Node.
4.  Copy program pada Latihan 3 dengan cara menselect seluruh program dan Copy dengan `ctrl+c`, lalu paste ke flow baru dengan `ctrl+v`.
5.  Ganti node debug dengan node `mqtt out` dan ganti node heater on dengan `mqtt in`.

    ![Gambar E.2. Simulasi plant temperatur dengan simulated IOT-Node](image_placeholder)
    *Gambar E.2. Simulasi plant temperatur dengan simulated IOT-Node*

6.  Node mqtt out dan mqtt in:

    ![Gambar E.3. property untuk mqtt out](image_placeholder)
    *Gambar E.3. property untuk mqtt out*

    ![Gambar E.4. property untuk mqtt in](image_placeholder)
    *Gambar E.4. property untuk mqtt in*

7.  Program akhir:

    ![Gambar E.5. Program akhir simulasi temperature dengan simulated IOT-Node](image_placeholder)
    *Gambar E.5. Program akhir simulasi temperature dengan simulated IOT-Node*

8.  Keluaran

    ![Gambar E.6. Keluaran pesan debug dari simulated IOT-Node](image_placeholder)
    *Gambar E.6. Keluaran pesan debug dari simulated IOT-Node*

> **Tugas 3:**
> Buatlah program simulasi pengisian tanki dengan air inlet sebagai input, dan ketinggian air sebagai output sistem.
> Clue: https://eleceng.dit.ie/gavin/Control/Modeling/Filling%20a%20Tank.htm

### F. Membuat IOT Dashboard dan HMI

1.  Langkah selanjutnya adalah membuat node pengamatan dan HMI. Buatlah flow baru dengan nama Latihan 4 – Client. Lalu buatlah node sebagai berikut:

    ![Gambar F.1. Program dengan node dashboard untuk HMI](image_placeholder)
    *Gambar F.1. Program dengan node dashboard untuk HMI*

2.  Node TT101 merupakan node gauge pada pallete dashboard dengan properties sebagai berikut:

    ![Gambar F.2. Properti untuk node TT101 - Gauge](image_placeholder)
    *Gambar F.2. Properti untuk node TT101 - Gauge*

3.  Deploy, lalu kunjungi browser pada `localhost:1880/ui`

    ![Gambar F.3. Tampilan IOT-HMI/Dashboard dengan node gauge](image_placeholder)
    *Gambar F.3. Tampilan IOT-HMI/Dashboard dengan node gauge*

4.  Node switch:

    ![Gambar F.4. Properti untuk node switch](image_placeholder)
    *Gambar F.4. Properti untuk node switch*

5.  Node inject:

    ![Gambar F.5. Properti untuk node inject masukan switch](image_placeholder)
    *Gambar F.5. Properti untuk node inject masukan switch*

6.  Deploy, lalu kunjungi browser pada `localhost:1880/ui`

    ![Gambar F.6. Tampilan IOT-HMI dengan node switch](image_placeholder)
    *Gambar F.6. Tampilan IOT-HMI dengan node switch*

7.  Selamat! Anda sudah membuat IOT-Server, IOT-HMI/Dashboard, dan simulated IOT-Node dengan menggunakan Node-RED. Selanjutnya dapat dikembangkan IOT-HMI yang lebih informatif, misalnya dengan menambahkan berbagai node dari palette **dashboard**, misalnya **chart, slider, dropdown**, dan lainnya.

> **Tugas 4:**
> Buatlah dashboard HMI untuk program simulasi pengisian tanki dari tugas 3.

---

## 4.7 TUGAS & LAPORAN 

*   Buatlah sistem pengiriman data dengan menggunakan prinsip publish dan subscribe via broker dengan skema berikut:
    *   2 IoT Node publisher mengirimkan data secara terus menerus
        *   1 IoT node mengirimkan data berupa *raw value*
        *   1 IoT node mengirimkan data berupa agregasi data dalam bentuk Json
    *   1 IoT Client subscriber mengolah data dan menampilkan data pada dashboard
    *   Kerjakan dalam kelompok berisikan 4 orang yang terdiri dari 2 IoT Node publisher, 1 Broker dan 1 IoT Client subscriber.

## 4.8 PUSTAKA

*   Node-RED Cookbook: Serve JSON Content
    http://cookbook.nodered.org/http/serve-json-content
*   Node-Red Web Server -HTTP-IN and HTTP Response Nodes
    http://www.steves-internet-guide.com/http-in-http-response-nodes/
*   MDN Web Docs: HTTP response status codes
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Status