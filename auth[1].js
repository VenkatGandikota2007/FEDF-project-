export class AuthService {
  constructor() {
    this.currentUser = null;
    this.init();
  }

  init() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
  }

  login(email, password) {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      const userWithoutPassword = { ...user };
      delete userWithoutPassword.password;
      this.currentUser = userWithoutPassword;
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    }

    return { success: false, message: 'Invalid email or password' };
  }

  register(email, password, fullName, role = 'student') {
    const users = this.getUsers();

    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email already exists' };
    }

    const newUser = {
      id: this.generateId(),
      email,
      password,
      fullName,
      role,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    this.currentUser = userWithoutPassword;
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

    return { success: true, user: userWithoutPassword };
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isAuthenticated() {
    return this.currentUser !== null;
  }

  isAdmin() {
    return this.currentUser && this.currentUser.role === 'admin';
  }

  getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }

  generateId() {
    return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}
