// DATA DUMMY
let projects = JSON.parse(localStorage.getItem('projects')) || [
    {
        id: 1,
        name: 'Dumbways Mobile App',
        description: 'App for Dumbways students...',
        image: '/assets/images/imghp.jpg',
        isNew: true
    },
    {
        id: 2,
        name: 'Dumbways Mobile App',
        description: 'App for Dumbways students...',
        isNew: false
    }

];

function renderProjects() {
    const container = document.getElementById('projectList')


    const projectsHTML = projects
        .filter(project => project.isNew)
        .map((project) => {
            return `
        <div class="card"
            ${project.id === 1 ? `onclick="goToDetail()" style="cursor:pointer;"` : ``}>

            ${project.image ? `<img src="${project.image}" alt="">` : ``}
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <div class="card-actions">
                <button class="button-edit">Edit</button>
                ${
                project.isNew
                ? `<button class="button-delete" onclick="deleteProject(${project.id})">Delete</button>`
                : ``

                }
            </div>
        </div>
        `;
        
    }).join('');
   // container.innerHTML = projectsHTML //
}
function saveToLocalStorage() {
    localStorage.setItem('projects', JSON.stringify(projects));
}
function goToDetail() {
    window.location.href = "./detail-project";
}

function deleteProject(id) {
    const index = projects.findIndex(project => project.id === id);

    if (index !== -1) {
        projects.splice(index, 1);
        saveToLocalStorage();
        renderProjects();
    }
}


// renderProjects(); //


const form = document.getElementById('projectForm')

form.addEventListener('submit', function(event){
   // event.preventDefault(); // hentikan reload halaman

    const name = document.getElementById('projectName').value;
    const description = document.getElementById('description').value;

    const newProject = {
        id: projects.length + 1,
        name: name,
        description: description,
        isNew: true
    };

    // projects.push(newProject); //
    // saveToLocalStorage(); //
    // renderProjects(); //

})