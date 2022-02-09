// Panggil package express
const { request } = require('express');
const express = require('express');

// Menggunakan package express
const app = express();

// set template engine
app.set('view engine', 'hbs');

// export folder agar bisa diakses oleh client
app.use(express.static(__dirname + '/'));

// menampilkan data dengan post
app.use(express.urlencoded({ extended: false }));

// atau khusus pada folder tertentu
// app.use('/public',express.static(__dirname + '/pubic'));

const isLogin = true;

// set endpoint
app.get('/', function (request, response) {
  response.send('Hello Word');
});

app.get('/home', function (request, response) {
  response.render('index');
});

app.get('/contact-me', function (request, response) {
  response.render('contact');
});

app.get('/blog', function (request, response) {
  response.render('blog', { isLogin: isLogin });
});

app.get('/add-blog', function (request, response) {
  response.render('form-blog');
});

// jika data dikirimkan melalui url maka gunakan params
app.get('/blog/:id', function (request, response) {
  let id = request.params.id;
  console.log(`id dari client : ${id}`);

  response.render('blog-detail', { identity: id });
});

//  jika data dikirimkan dari formulir maka gunakan body
// mengirimkan data mengunakan formulir pastikan element dari tiap inputan harus ada
app.post('/blog', function (request, response) {
  let title = request.body.title;
  console.log(`data titile `);
});
// konfigurasi port aplikasi

const port = 5000;
app.listen(port, function () {
  console.log('Server Running On');
});
