const express = require('express')
const hbs = require('hbs');
const app = express()
const port = 3000
app.set('view engine', 'hbs');
app.set('views', './src/views')

hbs.registerPartials("./src/views/partials")

// middleware
app.use('/assets', express.static('./src/assets'))

app.get('/home', (req, res) => {
  res.render('home')
})

app.get('/contact', (req, res) => {
  res.render('contact')
})

app.get('/detail-project', (req, res) => {
  res.render('detail-project')
})

app.get('/project', (req, res) => {
  res.render('project')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
