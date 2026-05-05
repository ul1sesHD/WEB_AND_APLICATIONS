const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.currentPage = req.path === '/' ? '/' : req.path;
  next();
});

app.get('/', (req, res) => {
  res.render('pages/home', { title: 'UlisesHD | Portafolio' });
});

app.get('/about', (req, res) => {
  res.render('pages/about', { title: 'Sobre Mi | UlisesHD' });
});

app.get('/projects', (req, res) => {
  res.render('pages/projects', { title: 'Proyectos | UlisesHD' });
});

app.get('/services', (req, res) => {
  res.render('pages/services', { title: 'Servicios | UlisesHD' });
});

app.use((req, res) => {
  res.status(404).render('pages/home', { title: '404 - No encontrado' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
