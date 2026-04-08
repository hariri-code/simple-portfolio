const express = require('express')
const hbs = require('hbs');
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))


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

app.post('/contact', (req, res) => {
  const { name, email, message, phone, subject } = req.body
  console.log('Received');

  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Message:', message);
  console.log('Phome:', phone);
  console.log('Subject:', subject)

  // Redirect ke thank you page
  res.redirect('/thank-you');
});

app.get('/thank-you', (req, res) => {
  res.send('Thank you! Your message has been received.');
});

app.get('/detail-project', (req, res) => {
  res.render('detail-project')
})

// app.get('/project', (req, res) => { //
//  const projects = [
//    { id:1, title: 'project A', description: 'description A', isActive: true },
//    { id:1, title: 'project B', description: 'description B', isActive: false },
//    { id:1, title: 'project C', description: 'description C', isActive: true }
//  ];

let projects = [] // Array untuk simpan data
let projectId = 1 // counter untuk Id

// function getProjects() {
//  return new Promise((resolve, reject) => {
//      setTimeout(() => {
//        resolve(projects);
//      }, 1000);    
//  });
// }

app.get('/project', async (req, res) => {
  try {
    res.render('project', {
      projects: projects
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error loading projects');
  }
});

app.post('/project', async (req, res) => {
  try {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.send('Title and description are required')}

    const newProject = {
      id: projectId++,
      title,
      description
    }
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    projects.push(newProject)
    console.log('New added project:', newProject);
    console.log('All projects:', projects);
  res.redirect('/project')

  } catch (error) {
  console.error(error);
  res.status(500).send('Error adding project');
}
});

app.get('/project/:id', async (req, res) =>{
  try {
    const { id } = req.params

    const projectIdParam = parseInt(id)

    const project = projects.find(p => p.id === projectIdParam)

    if (!project) {
      return res.send('Project not found')
    }
    res.render('project-detail', {project})
  } catch (error) {
  console.error(error);
  res.status(500).send('Error loading project detail');
}
})

app.get('/project/edit/:id', async (req, res) =>{
  try {
    const { id } = req.params

    const projectIdParam = parseInt(id)

    const project = projects.find(p => p.id === projectIdParam)

    if (!project) {
      return res.send('Project not found')
    }
    res.render('project-edit', {project})
  } catch (error) {
  console.error(error);
  res.status(500).send('Error loading project detail');
}
})

app.post('/project/edit/:id', async (req, res) => {
  try {
    console.log('Projects:', projects);
    const { id } = req.params;
    const projectIdParam = parseInt(id)

    const { title, description } = req.body;

    const index = projects.findIndex(p => p.id === projectIdParam);

    if (index === -1) {
    return res.send('Project not found!');
    }

    projects[index] = {
    id: projectIdParam, 
    title, 
    description
    }

    console.log('Project updated:', projects[index]);

    res.redirect(`/project/${projectId}`);

} catch (error) {
console.error(error);
res.status(500).send('Error loading project detail');
}
});

app.post('/project/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const projectIdParam = parseInt(id)

    const project = projects.find(p => p.id === projectIdParam);

    if (!project) {
    return res.status(404).send('Project not found!');
    }

    projects = projects.filter(p => p.id !== projectIdParam);

    console.log(`Project deleted: ${project.projectName} (ID: ${projectIdParam})`);
    console.log('Remaining projects:', projects);


    res.redirect('/project');

} catch (error) {
console.error(error);
res.status(500).send('Error deleting project');
}
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
