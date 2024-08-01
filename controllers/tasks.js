// const tasksRouter = require("express").Router();
// const User = require("../models/user");
// const Task = require("../models/task");

// tasksRouter.get("/", async (request, response) => {
//   const user = request.user;
//   const task = await Task.find({ user: user.id });
//   return response.status(200).json(task);
// });

// tasksRouter.post("/", async (request, response) => {
//   const user = request.user;
//   const { text } = request.body;
//   const newTask = new Task({
//     text,
//     checked: false,
//     user: user._id,
//   });

//   const savedTask = await newTask.save();
//   user.tasks = user.tasks.concat(savedTask._id);
//   await user.save();
//   return response.status(201).json(savedTask);
// });

// tasksRouter.delete("/:id", async (request, response) => {
//   const user = request.user;

//   await Task.findByIdAndDelete(request.params.id);

//   user.tasks = user.tasks.filter((task) => task.id !== request.params.id);
//   await user.save();
//   return response.sendStatus(204);
// });

// tasksRouter.patch("/:id", async (request, response) => {
//   const user = request.user;

//   const { checked } = request.body;

//   await Task.findByIdAndUpdate(request.params.id, { checked });

//   return response.sendStatus(200);
// });

// module.exports = tasksRouter;
