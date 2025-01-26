document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const todoForm = document.getElementById("todoForm");
  const todoList = document.getElementById("todoList");
  const logoutButton = document.getElementById("logoutButton");
  const fireworksCanvas = document.getElementById("fireworksCanvas");
  const taskCategory = document.getElementById("taskCategory");
  const taskTitle = document.getElementById("taskTitle");
  const taskDetails = document.getElementById("taskDetails");
  const taskDueDate = document.getElementById("taskDueDate");
  const scoreDisplay = document.getElementById("score");
  let score = 0;
  let taskGoal = 0;  

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("loginUsername").value.trim();
      const password = document.getElementById("loginPassword").value;

      if (localStorage.getItem(username) === password) {
        alert("Login successful!");
        localStorage.setItem("loggedInUser", username);
        window.location.href = "todo.html"; 
      } else {
        alert("Invalid username or password!");
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("registerUsername").value.trim();
      const password = document.getElementById("registerPassword").value;
      const confirmPassword = document.getElementById("registerConfirmPassword").value;

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      if (localStorage.getItem(username)) {
        alert("User already exists!");
      } else {
        localStorage.setItem(username, password);
        alert("Registration successful!");
        window.location.href = "index.html"; 
      }
    });
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      alert("Logged out!");
      window.location.href = "index.html"; 
    });
  }

  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    todoList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.classList.add(task.completed ? "completed" : "pending");
      li.innerHTML = `
        <div>
          <h4>${task.category}: ${task.title}</h4>
          <p>${task.details || "No details provided"}</p>
          <p>Due: ${task.dueDate}</p>
        </div>
        <div>
          <button class="complete-btn">✔</button>
          <button class="delete-btn">🗑</button>
        </div>
      `;
      li.querySelector(".complete-btn").addEventListener("click", () => {
        task.completed = true;
        score++;
        scoreDisplay.textContent = score;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
        if (score >= taskGoal) triggerCelebration();  
      });

      li.querySelector(".delete-btn").addEventListener("click", () => {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
      });

      todoList.appendChild(li);
    });
  };

  if (todoForm) {
    todoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newTask = {
        category: taskCategory.value,
        title: taskTitle.value,
        details: taskDetails.value,
        dueDate: taskDueDate.value,
        completed: false,
      };
      const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      taskCategory.value = "";
      taskTitle.value = "";
      taskDetails.value = "";
      taskDueDate.value = "";
      loadTasks();
    });
  }

  const setTaskGoal = (goal) => {
    taskGoal = goal;
  };

  const triggerCelebration = () => {
    const ctx = fireworksCanvas.getContext("2d");
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;

    const message = "🎉 ยินดีด้วยจร้เสร็จไป 1 งานละนะ 🎉";
    ctx.font = "40px Arial";
    ctx.fillStyle = "purple";
    ctx.textAlign = "center";
    ctx.fillText(message, window.innerWidth / 2, window.innerHeight / 2);

    let yOffset = 0;
    const floatMessage = setInterval(() => {
      yOffset += 1;
      ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
      ctx.fillText(message, window.innerWidth / 2, window.innerHeight / 2 - yOffset);
      if (yOffset > 100) {
        clearInterval(floatMessage);
        setTimeout(() => {
          ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height); 
        }, 800);  
      }
    }, 20);

    alert("ยินดีด้วย!!!🎉");
  };

  if (window.location.pathname === "/todo.html") {
    loadTasks();
  }
});
