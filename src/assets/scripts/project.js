export async function getProjects(req, res, db){
    const query = "SELECT * FROM projects ORDER BY id ASC"
    const result = await db.query(query)

    console.log(result.rows);

    const flash = req.session.flash
    delete req.session.flash

    res.render("project",{projects: result.rows,
        flash
    })
    
}

export async function getProjectById(req, res, db) {
  try {
    const { id } = req.params

    const query = "SELECT * FROM projects WHERE id = $1"
    const result = await db.query(query, [id])

    if (result.rows.length === 0) {
        return res.send("Project not found");
    }

    res.render("project-detail",{
        title: "Detail Project",
        project: result.rows[0] });

  } catch (error) {
    console.error("Error fetching project:", error);
    res.send("Server error");
  }  
}

export async function createProject(req, res, db) {
    try {
        const { title, description } = req.body;

        const query = "INSERT INTO projects (title, description) VALUES ($1, $2) RETURNING *";
        const values = [title, description];
        const result = await db.query(query, values);

        // FLASH MESSAGE
        req.session.flash = {
            type: "success",
            message: "Project berhasil ditambahkan!"
        };

        console.log("Project created;", result.rows[0]);
        res.redirect("/project");

    } catch (error) {
        req.session.flash = {
            type: "danger",
            message: "Terjadi kesalahan!"
        };
        console.error("Error creating project:", error);
        res.send("Server error");
    }
}

export async function getEditProject(req, res, db) {
    try {
        const { id } = req.params
        const projectId = parseInt(id)

        const query = "SELECT * FROM projects WHERE id = $1"
        const result = await db.query(query, [projectId])

        if (result.rows.length === 0) {
            return res.send("Project not found");
        }
        res.render("project-edit", {
            title: "Edit Project",
            project: result.rows[0] });

    } catch (error) {
        console.error("Error fetching project:", error);
        res.send("Server error");
  } 
}

export async function updateProject(req, res, db) {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const query = `
            UPDATE projects
            SET title = $1, description = $2
            WHERE id = $3
            RETURNING *
            `;

            const values = [title, description, id];
            const result = await db.query(query, values);

            if (result.rows.length === 0) {
                return res.send("Project not found");
            }

            console.log("Project updated:", result.rows[0]);
            res.redirect("/home");

    } catch (error) {
        console.error("Error updating project:", error);
        res.send("Server error");
  }
}

export async function deleteProject(req, res, db) {
    try {
        const { id } = req.params;

        const query = "DELETE FROM projects WHERE id = $1 RETURNING *";
        const result = await db.query(query, [id]);

        if (result.rows.length === 0) {
            return res.send("Project not found");
        }

        console.log("Project deleted:", result.rows[0]);
        res.redirect("/project");

    } catch (error) {
        console.error("Error deleting project:", error);
        res.send("Server error");
  } 
}