import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// Sample data for tasks (you can replace this with a database later)
const todaysTasks = [];
const workTasks = [];

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true })); // Middleware for parsing form data

app.set('view engine', 'ejs'); // Set EJS as the view engine

app.get('/', (req, res) => {
  res.render('index', { todaysTasks, workTasks });
});

app.post('/add', (req, res) => {
  const { task, list } = req.body;

  if (task) {
    if (list === 'work') {
      workTasks.push({ task, completed: false });
    } else {
      todaysTasks.push({ task, completed: false });
    }
  }

  res.redirect('/');
});

app.post('/complete/today/:index', (req, res) => {
  const { index } = req.params;

  if (todaysTasks[index]) {
    todaysTasks[index].completed = true;
  }

  res.redirect('/');
});

app.post('/complete/work/:index', (req, res) => {
  const { index } = req.params;

  if (workTasks[index]) {
    workTasks[index].completed = true;
  }

  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
