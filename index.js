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

// kondisi default
const blogs = [
  {
    title: 'Pasar Coding di Indonesia Dinilai Masih Menjanjikan',
    content: 'Ketimpangan sumber daya manusia (SDM) di sektor digital masih menjadi isu yang belum terpecahkan. Berdasarkan penelitian ManpowerGroup, ketimpangan SDM global, termasuk Indonesia, meningkat dua kali lipat dalam satu dekade',
    author: 'Ichsan Emrald Alamsyah',
    posted_at: '12 Jul 2021 22:30 WIB ',
  },
];

let month = ['january', 'February', 'Maret', 'April', 'Mei', 'Juni', 'July', 'August', 'September', 'October', 'November', 'Desember'];

// set endpoint
app.get('/', function (request, response) {
  response.send('index');
});

app.get('/home', function (request, response) {
  response.render('index');
});

app.get('/contact-me', function (request, response) {
  response.render('contact');
});

app.get('/blog', function (request, response) {
  console.log(blogs);
  // manipulsai data string object
  let dataBlogs = blogs.map(function (data) {
    return {
      // spread operator untuk melakukan manipulasi
      ...data,
      isLogin: isLogin,
    };
  });
  response.render('blog', { isLogin: isLogin, blogs: dataBlogs });
});

app.get('/add-blog', function (request, response) {
  response.render('form-blog');
});

// jika data dikirimkan melalui url maka gunakan params
app.get('/blog/:id', function (request, response) {
  let id = request.params.id;
  console.log(`id dari client : ${id}`);

  // jika ingin mengirimkan data yang mempunyai nilai
  response.render('blog-detail', { identity: id });
});

// delete data
app.get('/delete-blog/:index', function (request, response) {
  let index = request.params.index;
  console.log(`index delete ${index}`);

  blogs.splice(index, 1);
  response.redirect('/blog');
});

// update data
app.get('/from-blog/:index', function (request, response) {
  let index = request.params.index;
  console.log(`index update ${index}`);
  response.render('form-blog', { index: index });
});

//  jika data dikirimkan dari formulir maka gunakan body
// mengirimkan data mengunakan formulir pastikan element dari tiap inputan harus ada
app.post('/blog', function (request, response) {
  let title = request.body.title;
  let content = request.body.content;

  let blog = {
    title: title,
    content,
    author: 'Sodikul Padli',
    posted_at: getFullTime(new Date()),
  };

  // memasukan data
  blogs.push(blog);

  // jika tidak ada data/nilai yang dikirimkan
  response.redirect('/blog');
});
// konfigurasi port aplikasi

const port = 5000;
app.listen(port, function () {
  console.log('Server Running On');
});

// menampilkan waktu dan tanggal terkini
function getFullTime(time) {
  let date = time.getDate();
  let monthIndex = time.getMonth();
  let year = time.getFullYear();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  return `${date} ${month[monthIndex]} ${year} ${hours}:${minutes} WIB`;
}
