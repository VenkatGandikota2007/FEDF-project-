import './style.css'
import { AuthService } from './auth.js'
import { DataService } from './data-service.js'
import { AdminDashboard } from './admin-dashboard.js'
import { StudentDashboard } from './student-dashboard.js'

class App {
  constructor() {
    this.authService = new AuthService();
    this.dataService = new DataService();
    this.adminDashboard = null;
    this.studentDashboard = null;
    this.init();
  }

  init() {
    if (this.authService.isAuthenticated()) {
      this.showMainContainer();
    } else {
      this.showAuthContainer();
    }
  }

  showAuthContainer() {
    const authContainer = document.getElementById('auth-container');
    const mainContainer = document.getElementById('main-container');

    authContainer.style.display = 'flex';
    mainContainer.style.display = 'none';

    authContainer.innerHTML = `
      <div class="auth-box">
        <h2>Student Health & Wellness Platform</h2>

        <div class="auth-tabs">
          <button class="auth-tab active" data-tab="login">Login</button>
          <button class="auth-tab" data-tab="register">Register</button>
        </div>

        <div id="login-form" class="auth-form">
          <div class="form-group">
            <label for="login-email">Email</label>
            <input type="email" id="login-email" placeholder="Enter your email" required>
          </div>
          <div class="form-group">
            <label for="login-password">Password</label>
            <input type="password" id="login-password" placeholder="Enter your password" required>
          </div>
          <div id="login-error" class="alert alert-error" style="display: none;"></div>
          <button type="button" class="btn btn-primary" id="login-btn">Login</button>
          <p style="margin-top: 16px; font-size: 12px; color: var(--text-secondary); text-align: center;">
            Demo: admin@test.com / admin123 or student@test.com / student123
          </p>
        </div>

        <div id="register-form" class="auth-form" style="display: none;">
          <div class="form-group">
            <label for="register-name">Full Name</label>
            <input type="text" id="register-name" placeholder="Enter your full name" required>
          </div>
          <div class="form-group">
            <label for="register-email">Email</label>
            <input type="email" id="register-email" placeholder="Enter your email" required>
          </div>
          <div class="form-group">
            <label for="register-password">Password</label>
            <input type="password" id="register-password" placeholder="Create a password" required>
          </div>
          <div class="form-group">
            <label for="register-role">I am a:</label>
            <select id="register-role">
              <option value="student">Student</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          <div id="register-error" class="alert alert-error" style="display: none;"></div>
          <button type="button" class="btn btn-primary" id="register-btn">Register</button>
        </div>
      </div>
    `;

    this.setupAuthListeners();
  }

  setupAuthListeners() {
    const tabs = document.querySelectorAll('.auth-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const tabName = tab.dataset.tab;
        document.getElementById('login-form').style.display = tabName === 'login' ? 'block' : 'none';
        document.getElementById('register-form').style.display = tabName === 'register' ? 'block' : 'none';
      });
    });

    document.getElementById('login-btn').addEventListener('click', () => this.handleLogin());
    document.getElementById('register-btn').addEventListener('click', () => this.handleRegister());

    document.getElementById('login-password').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleLogin();
    });

    document.getElementById('register-password').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleRegister();
    });
  }

  handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorDiv = document.getElementById('login-error');

    if (!email || !password) {
      errorDiv.textContent = 'Please fill in all fields';
      errorDiv.style.display = 'block';
      return;
    }

    const result = this.authService.login(email, password);

    if (result.success) {
      errorDiv.style.display = 'none';
      this.showMainContainer();
    } else {
      errorDiv.textContent = result.message;
      errorDiv.style.display = 'block';
    }
  }

  handleRegister() {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const role = document.getElementById('register-role').value;
    const errorDiv = document.getElementById('register-error');

    if (!name || !email || !password) {
      errorDiv.textContent = 'Please fill in all fields';
      errorDiv.style.display = 'block';
      return;
    }

    const result = this.authService.register(email, password, name, role);

    if (result.success) {
      errorDiv.style.display = 'none';
      this.showMainContainer();
    } else {
      errorDiv.textContent = result.message;
      errorDiv.style.display = 'block';
    }
  }

  showMainContainer() {
    const authContainer = document.getElementById('auth-container');
    const mainContainer = document.getElementById('main-container');

    authContainer.style.display = 'none';
    mainContainer.style.display = 'block';

    const user = this.authService.getCurrentUser();

    if (user.role === 'admin') {
      this.adminDashboard = new AdminDashboard(this.authService, this.dataService);
      this.adminDashboard.render(mainContainer);
    } else {
      this.studentDashboard = new StudentDashboard(this.authService, this.dataService);
      this.studentDashboard.render(mainContainer);
    }
  }

  handleLogout() {
    this.authService.logout();
    this.showAuthContainer();
  }
}

const users = JSON.parse(localStorage.getItem('users') || '[]');
if (users.length === 0) {
  localStorage.setItem('users', JSON.stringify([
    {
      id: 'admin_1',
      email: 'admin@test.com',
      password: 'admin123',
      fullName: 'Admin User',
      role: 'admin',
      createdAt: new Date().toISOString()
    },
    {
      id: 'student_1',
      email: 'student@test.com',
      password: 'student123',
      fullName: 'Student User',
      role: 'student',
      createdAt: new Date().toISOString()
    }
  ]));
}

new App();
