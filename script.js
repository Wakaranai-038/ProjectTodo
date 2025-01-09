document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");
    const todoForm = document.getElementById("todoForm");
    const logoutButton = document.getElementById("logoutButton");
  
    if (registerForm) {
      registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("registerUsername").value;
        const password = document.getElementById("registerPassword").value;
  
        if (localStorage.getItem(username)) {
          alert("User already exists!");
        } else {
          localStorage.setItem(username, password);
          alert("Registration successful!");
          window.location.href = "index.html";
        }
      });
    }
  
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("loginUsername").value;
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
  
    if (todoForm) {
      const todoInput = document.getElementById("todoInput");
      const todoList = document.getElementById("todoList");
  
      const loadTodos = () => {
        const todos = JSON.parse(localStorage.getItem("todos") || "[]");
        todoList.innerHTML = "";
        todos.forEach((todo, index) => {
          const li = document.createElement("li");
          li.textContent = todo;
          li.addEventListener("click", () => {
            todos.splice(index, 1);
            localStorage.setItem("todos", JSON.stringify(todos));
            loadTodos();
          });
          todoList.appendChild(li);
        });
      };
  
      loadTodos();
  
      todoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const todos = JSON.parse(localStorage.getItem("todos") || "[]");
        todos.push(todoInput.value);
        localStorage.setItem("todos", JSON.stringify(todos));
        todoInput.value = "";
        loadTodos();
      });
  
      if (logoutButton) {
        logoutButton.addEventListener("click", () => {
          localStorage.removeItem("loggedInUser");
          alert("Logged out!");
          window.location.href = "index.html";
        });
      }
    }
  });
  