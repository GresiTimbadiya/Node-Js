const express = require('express');

const port = 8000;

const app = express();

let tasks = [
    { id: 8909, task: 'Complete assignment', status: 'pending', priority: 'high', date: '2025-08-20' },
    { id: 67591, task: 'Clean the house', status: 'cancel', priority: 'low', date: '2025-08-04' },
    { id: 4563, task: 'Update resume', status: 'complete', priority: 'medium', date: '2025-08-03' }
]

app.set("view engine", "ejs");

app.use(express.urlencoded());

app.get("/", (req, res) => {
    return res.render("view_todo", {
        taskList: tasks
    });
})

app.get("/addTodo", (req, res) => {
    return res.render("add_todo");
})

app.post('/addRecord', (req, res) => {
    const { task, status, priority, date } = req.body;
    
    if (!task || !status || !priority || !date) {
        return res.redirect("/addTodo");
    }

    let obj = {
        id: Math.floor(Math.random() * 100000),
        task, status, priority, date
    }
    tasks.push(obj);
    return res.redirect("/");
})

app.get('/deleteTodo', (req, res) => {
    let id = req.query.id;
    let deleteTask = tasks.filter(val => val.id != id);
    tasks = deleteTask;
    console.log("Task deleted...");
    return res.redirect("/");
})

app.get("/editTodo", (req, res) => {
    let id = req.query.id;
    let single = tasks.find(val => val.id == id);
    return res.render("edit_todo", {
        single
    });
})

app.post("/updateTodo", (req, res) => {
    const { editid, task, status, priority, date } = req.body;

    let update = tasks.map((val) => {
        if (val.id == editid) {
            val.task = task,
                val.status = status,
                val.priority = priority,
                val.date = date
        }
        return val;
    })
    tasks = update;
    console.log("Task updated...");
    return res.redirect("/");
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server is start on port :- ${port}`);
})