function generateRandomTasks(numTasks = 100) {
    const tasks = [];
    const getRandomDateTime = (start, end) => {
      const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      return date.toISOString().replace('T', ' ').split('.')[0];
    };
  
    for (let i = 1; i <= numTasks; i++) {
      const task = {
        taskId: `TASK-${i.toString().padStart(3, "0")}`,
        duration: `${Math.floor(Math.random() * 5) + 1} hours`,
        exceptions: Math.floor(Math.random() * 6),
        userId: `USR-${Math.floor(Math.random() * 100).toString().padStart(3, "0")}`,
        taskName: `Task ${i}`,
        status: ["Pending", "In Progress", "Completed"][Math.floor(Math.random() * 3)],
        startTime: getRandomDateTime(new Date(new Date().setDate(new Date().getDate() - 30)), new Date()),
        endTime: getRandomDateTime(new Date(), new Date(new Date().setDate(new Date().getDate() + 30))),
      };
      tasks.push(task);
    }
  
    return tasks;
  }
  
  export default generateRandomTasks;
  