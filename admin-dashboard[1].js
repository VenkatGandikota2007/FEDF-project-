export class AdminDashboard {
  constructor(authService, dataService) {
    this.authService = authService;
    this.dataService = dataService;
    this.currentView = 'dashboard';
  }

  render(container) {
    container.innerHTML = `
      <nav class="navbar">
        <div class="navbar-brand">Health & Wellness Admin</div>
        <div class="navbar-menu">
          <a id="nav-dashboard">Dashboard</a>
          <a id="nav-resources">Resources</a>
          <a id="nav-programs">Programs</a>
          <a id="nav-services">Services</a>
          <a id="nav-requests">Requests</a>
          <a id="nav-logout">Logout</a>
        </div>
      </nav>
      <div id="content-area"></div>
    `;

    this.setupNavigation();
    this.renderDashboard();
  }

  setupNavigation() {
    document.getElementById('nav-dashboard').addEventListener('click', () => this.renderDashboard());
    document.getElementById('nav-resources').addEventListener('click', () => this.renderResources());
    document.getElementById('nav-programs').addEventListener('click', () => this.renderPrograms());
    document.getElementById('nav-services').addEventListener('click', () => this.renderServices());
    document.getElementById('nav-requests').addEventListener('click', () => this.renderRequests());
    document.getElementById('nav-logout').addEventListener('click', () => {
      this.authService.logout();
      location.reload();
    });
  }

  renderDashboard() {
    this.currentView = 'dashboard';
    const analytics = this.dataService.getAnalytics();
    const contentArea = document.getElementById('content-area');

    contentArea.innerHTML = `
      <div class="container">
        <h1 style="margin-bottom: 32px;">Analytics Dashboard</h1>

        <div class="dashboard-grid">
          <div class="stat-card">
            <h3>Total Resources</h3>
            <div class="stat-value">${analytics.totalResources}</div>
            <div class="stat-label">${analytics.publishedResources} Published</div>
          </div>

          <div class="stat-card">
            <h3>Wellness Programs</h3>
            <div class="stat-value">${analytics.totalPrograms}</div>
            <div class="stat-label">${analytics.activePrograms} Active</div>
          </div>

          <div class="stat-card">
            <h3>Program Enrollments</h3>
            <div class="stat-value">${analytics.totalEnrollments}</div>
            <div class="stat-label">${analytics.activeEnrollments} Active</div>
          </div>

          <div class="stat-card">
            <h3>Resource Views</h3>
            <div class="stat-value">${analytics.totalViews}</div>
            <div class="stat-label">Total Views</div>
          </div>

          <div class="stat-card">
            <h3>Support Requests</h3>
            <div class="stat-value">${analytics.pendingRequests}</div>
            <div class="stat-label">${analytics.totalRequests} Total</div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Recent Activity</h3>
          </div>
          <p style="color: var(--text-secondary);">Monitor student engagement, resource usage, and program participation from this dashboard.</p>
        </div>
      </div>
    `;
  }

  renderResources() {
    this.currentView = 'resources';
    const resources = this.dataService.getHealthResources();
    const contentArea = document.getElementById('content-area');

    contentArea.innerHTML = `
      <div class="container">
        <div class="section-header">
          <h2>Health Resources</h2>
          <button class="btn btn-primary btn-small" id="add-resource-btn">+ Add Resource</button>
        </div>

        <div class="card">
          <table class="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="resources-tbody">
              ${resources.map(r => `
                <tr>
                  <td><strong>${r.title}</strong></td>
                  <td><span class="resource-category category-${r.category}">${r.category.replace('_', ' ')}</span></td>
                  <td><span class="badge ${r.isPublished ? 'badge-success' : 'badge-warning'}">${r.isPublished ? 'Published' : 'Draft'}</span></td>
                  <td>${new Date(r.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button class="btn btn-secondary btn-small" onclick="window.editResource('${r.id}')">Edit</button>
                    <button class="btn btn-danger btn-small" onclick="window.deleteResource('${r.id}')">Delete</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div id="resource-modal" class="modal">
        <div class="modal-content">
          <button class="modal-close" id="close-resource-modal">&times;</button>
          <h2 id="resource-modal-title">Add Health Resource</h2>
          <form id="resource-form">
            <div class="form-group">
              <label>Title</label>
              <input type="text" id="resource-title" required>
            </div>
            <div class="form-group">
              <label>Category</label>
              <select id="resource-category">
                <option value="mental_health">Mental Health</option>
                <option value="fitness">Fitness</option>
                <option value="nutrition">Nutrition</option>
                <option value="general">General</option>
              </select>
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea id="resource-description" rows="3" required></textarea>
            </div>
            <div class="form-group">
              <label>Content</label>
              <textarea id="resource-content" rows="6" required></textarea>
            </div>
            <div class="form-group">
              <label>
                <input type="checkbox" id="resource-published"> Published
              </label>
            </div>
            <button type="submit" class="btn btn-primary">Save Resource</button>
          </form>
        </div>
      </div>
    `;

    document.getElementById('add-resource-btn').addEventListener('click', () => this.showResourceModal());
    document.getElementById('close-resource-modal').addEventListener('click', () => this.hideResourceModal());
    document.getElementById('resource-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveResource();
    });

    window.editResource = (id) => this.editResource(id);
    window.deleteResource = (id) => this.deleteResource(id);
  }

  showResourceModal(resource = null) {
    const modal = document.getElementById('resource-modal');
    modal.classList.add('active');

    if (resource) {
      document.getElementById('resource-modal-title').textContent = 'Edit Health Resource';
      document.getElementById('resource-title').value = resource.title;
      document.getElementById('resource-category').value = resource.category;
      document.getElementById('resource-description').value = resource.description;
      document.getElementById('resource-content').value = resource.content;
      document.getElementById('resource-published').checked = resource.isPublished;
      document.getElementById('resource-form').dataset.editId = resource.id;
    } else {
      document.getElementById('resource-modal-title').textContent = 'Add Health Resource';
      document.getElementById('resource-form').reset();
      delete document.getElementById('resource-form').dataset.editId;
    }
  }

  hideResourceModal() {
    document.getElementById('resource-modal').classList.remove('active');
  }

  saveResource() {
    const form = document.getElementById('resource-form');
    const editId = form.dataset.editId;

    const data = {
      title: document.getElementById('resource-title').value,
      category: document.getElementById('resource-category').value,
      description: document.getElementById('resource-description').value,
      content: document.getElementById('resource-content').value,
      isPublished: document.getElementById('resource-published').checked,
      createdBy: this.authService.getCurrentUser().id
    };

    if (editId) {
      this.dataService.updateHealthResource(editId, data);
    } else {
      this.dataService.createHealthResource(data);
    }

    this.hideResourceModal();
    this.renderResources();
  }

  editResource(id) {
    const resource = this.dataService.getHealthResource(id);
    if (resource) {
      this.showResourceModal(resource);
    }
  }

  deleteResource(id) {
    if (confirm('Are you sure you want to delete this resource?')) {
      this.dataService.deleteHealthResource(id);
      this.renderResources();
    }
  }

  renderPrograms() {
    this.currentView = 'programs';
    const programs = this.dataService.getWellnessPrograms();
    const contentArea = document.getElementById('content-area');

    contentArea.innerHTML = `
      <div class="container">
        <div class="section-header">
          <h2>Wellness Programs</h2>
          <button class="btn btn-primary btn-small" id="add-program-btn">+ Add Program</button>
        </div>

        <div class="resource-grid">
          ${programs.map(p => `
            <div class="program-card">
              <div class="program-header">
                <span class="program-type type-${p.type}">${p.type.replace('_', ' ')}</span>
                <span class="difficulty-badge difficulty-${p.difficultyLevel}">${p.difficultyLevel}</span>
              </div>
              <h3 style="margin-bottom: 12px;">${p.title}</h3>
              <p style="color: var(--text-secondary); margin-bottom: 12px; font-size: 14px;">${p.description}</p>
              <div style="display: flex; gap: 8px; margin-bottom: 12px;">
                <span class="badge badge-info">${p.duration}</span>
                <span class="badge ${p.isActive ? 'badge-success' : 'badge-warning'}">${p.isActive ? 'Active' : 'Inactive'}</span>
              </div>
              <div style="display: flex; gap: 8px;">
                <button class="btn btn-secondary btn-small" onclick="window.editProgram('${p.id}')">Edit</button>
                <button class="btn btn-danger btn-small" onclick="window.deleteProgram('${p.id}')">Delete</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div id="program-modal" class="modal">
        <div class="modal-content">
          <button class="modal-close" id="close-program-modal">&times;</button>
          <h2 id="program-modal-title">Add Wellness Program</h2>
          <form id="program-form">
            <div class="form-group">
              <label>Title</label>
              <input type="text" id="program-title" required>
            </div>
            <div class="form-group">
              <label>Type</label>
              <select id="program-type">
                <option value="fitness">Fitness</option>
                <option value="meditation">Meditation</option>
                <option value="nutrition">Nutrition</option>
                <option value="stress_management">Stress Management</option>
              </select>
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea id="program-description" rows="3" required></textarea>
            </div>
            <div class="form-group">
              <label>Duration</label>
              <input type="text" id="program-duration" placeholder="e.g., 4 weeks" required>
            </div>
            <div class="form-group">
              <label>Difficulty Level</label>
              <select id="program-difficulty">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div class="form-group">
              <label>Schedule</label>
              <textarea id="program-schedule" rows="2" required></textarea>
            </div>
            <div class="form-group">
              <label>
                <input type="checkbox" id="program-active"> Active
              </label>
            </div>
            <button type="submit" class="btn btn-primary">Save Program</button>
          </form>
        </div>
      </div>
    `;

    document.getElementById('add-program-btn').addEventListener('click', () => this.showProgramModal());
    document.getElementById('close-program-modal').addEventListener('click', () => this.hideProgramModal());
    document.getElementById('program-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveProgram();
    });

    window.editProgram = (id) => this.editProgram(id);
    window.deleteProgram = (id) => this.deleteProgram(id);
  }

  showProgramModal(program = null) {
    const modal = document.getElementById('program-modal');
    modal.classList.add('active');

    if (program) {
      document.getElementById('program-modal-title').textContent = 'Edit Wellness Program';
      document.getElementById('program-title').value = program.title;
      document.getElementById('program-type').value = program.type;
      document.getElementById('program-description').value = program.description;
      document.getElementById('program-duration').value = program.duration;
      document.getElementById('program-difficulty').value = program.difficultyLevel;
      document.getElementById('program-schedule').value = program.schedule;
      document.getElementById('program-active').checked = program.isActive;
      document.getElementById('program-form').dataset.editId = program.id;
    } else {
      document.getElementById('program-modal-title').textContent = 'Add Wellness Program';
      document.getElementById('program-form').reset();
      document.getElementById('program-active').checked = true;
      delete document.getElementById('program-form').dataset.editId;
    }
  }

  hideProgramModal() {
    document.getElementById('program-modal').classList.remove('active');
  }

  saveProgram() {
    const form = document.getElementById('program-form');
    const editId = form.dataset.editId;

    const data = {
      title: document.getElementById('program-title').value,
      type: document.getElementById('program-type').value,
      description: document.getElementById('program-description').value,
      duration: document.getElementById('program-duration').value,
      difficultyLevel: document.getElementById('program-difficulty').value,
      schedule: document.getElementById('program-schedule').value,
      isActive: document.getElementById('program-active').checked
    };

    if (editId) {
      this.dataService.updateWellnessProgram(editId, data);
    } else {
      this.dataService.createWellnessProgram(data);
    }

    this.hideProgramModal();
    this.renderPrograms();
  }

  editProgram(id) {
    const program = this.dataService.getWellnessProgram(id);
    if (program) {
      this.showProgramModal(program);
    }
  }

  deleteProgram(id) {
    if (confirm('Are you sure you want to delete this program?')) {
      this.dataService.deleteWellnessProgram(id);
      this.renderPrograms();
    }
  }

  renderServices() {
    this.currentView = 'services';
    const services = this.dataService.getSupportServices();
    const contentArea = document.getElementById('content-area');

    contentArea.innerHTML = `
      <div class="container">
        <div class="section-header">
          <h2>Support Services</h2>
          <button class="btn btn-primary btn-small" id="add-service-btn">+ Add Service</button>
        </div>

        ${services.map(s => `
          <div class="service-card">
            <div class="service-header">
              <div class="service-name">${s.name}</div>
              <span class="service-type type-${s.type}">${s.type}</span>
            </div>
            <p style="color: var(--text-secondary); margin-bottom: 12px;">${s.description}</p>
            <div style="margin-bottom: 8px;">
              <strong>Contact:</strong> ${s.contactInfo}
            </div>
            <div style="margin-bottom: 12px;">
              <strong>Available:</strong> ${s.availability}
            </div>
            <span class="badge ${s.isAvailable ? 'badge-success' : 'badge-danger'}">${s.isAvailable ? 'Available' : 'Unavailable'}</span>
            <div style="margin-top: 12px; display: flex; gap: 8px;">
              <button class="btn btn-secondary btn-small" onclick="window.editService('${s.id}')">Edit</button>
              <button class="btn btn-danger btn-small" onclick="window.deleteService('${s.id}')">Delete</button>
            </div>
          </div>
        `).join('')}
      </div>

      <div id="service-modal" class="modal">
        <div class="modal-content">
          <button class="modal-close" id="close-service-modal">&times;</button>
          <h2 id="service-modal-title">Add Support Service</h2>
          <form id="service-form">
            <div class="form-group">
              <label>Service Name</label>
              <input type="text" id="service-name" required>
            </div>
            <div class="form-group">
              <label>Type</label>
              <select id="service-type">
                <option value="counseling">Counseling</option>
                <option value="emergency">Emergency</option>
                <option value="hotline">Hotline</option>
                <option value="consultation">Consultation</option>
              </select>
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea id="service-description" rows="3" required></textarea>
            </div>
            <div class="form-group">
              <label>Contact Information</label>
              <textarea id="service-contact" rows="2" required></textarea>
            </div>
            <div class="form-group">
              <label>Availability</label>
              <input type="text" id="service-availability" required>
            </div>
            <div class="form-group">
              <label>
                <input type="checkbox" id="service-available"> Currently Available
              </label>
            </div>
            <button type="submit" class="btn btn-primary">Save Service</button>
          </form>
        </div>
      </div>
    `;

    document.getElementById('add-service-btn').addEventListener('click', () => this.showServiceModal());
    document.getElementById('close-service-modal').addEventListener('click', () => this.hideServiceModal());
    document.getElementById('service-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveService();
    });

    window.editService = (id) => this.editService(id);
    window.deleteService = (id) => this.deleteService(id);
  }

  showServiceModal(service = null) {
    const modal = document.getElementById('service-modal');
    modal.classList.add('active');

    if (service) {
      document.getElementById('service-modal-title').textContent = 'Edit Support Service';
      document.getElementById('service-name').value = service.name;
      document.getElementById('service-type').value = service.type;
      document.getElementById('service-description').value = service.description;
      document.getElementById('service-contact').value = service.contactInfo;
      document.getElementById('service-availability').value = service.availability;
      document.getElementById('service-available').checked = service.isAvailable;
      document.getElementById('service-form').dataset.editId = service.id;
    } else {
      document.getElementById('service-modal-title').textContent = 'Add Support Service';
      document.getElementById('service-form').reset();
      document.getElementById('service-available').checked = true;
      delete document.getElementById('service-form').dataset.editId;
    }
  }

  hideServiceModal() {
    document.getElementById('service-modal').classList.remove('active');
  }

  saveService() {
    const form = document.getElementById('service-form');
    const editId = form.dataset.editId;

    const data = {
      name: document.getElementById('service-name').value,
      type: document.getElementById('service-type').value,
      description: document.getElementById('service-description').value,
      contactInfo: document.getElementById('service-contact').value,
      availability: document.getElementById('service-availability').value,
      isAvailable: document.getElementById('service-available').checked
    };

    if (editId) {
      this.dataService.updateSupportService(editId, data);
    } else {
      this.dataService.createSupportService(data);
    }

    this.hideServiceModal();
    this.renderServices();
  }

  editService(id) {
    const service = this.dataService.getSupportService(id);
    if (service) {
      this.showServiceModal(service);
    }
  }

  deleteService(id) {
    if (confirm('Are you sure you want to delete this service?')) {
      this.dataService.deleteSupportService(id);
      this.renderServices();
    }
  }

  renderRequests() {
    this.currentView = 'requests';
    const requests = this.dataService.getSupportRequests();
    const contentArea = document.getElementById('content-area');

    contentArea.innerHTML = `
      <div class="container">
        <h2 style="margin-bottom: 24px;">Support Requests</h2>

        <div class="card">
          <table class="table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Service</th>
                <th>Message</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${requests.map(r => {
                const service = this.dataService.getSupportService(r.serviceId);
                return `
                  <tr>
                    <td>${r.studentId.substring(0, 8)}...</td>
                    <td>${service ? service.name : 'N/A'}</td>
                    <td style="max-width: 300px;">${r.message.substring(0, 50)}${r.message.length > 50 ? '...' : ''}</td>
                    <td>
                      <span class="badge ${
                        r.status === 'resolved' ? 'badge-success' :
                        r.status === 'in_progress' ? 'badge-warning' : 'badge-info'
                      }">${r.status}</span>
                    </td>
                    <td>${new Date(r.createdAt).toLocaleDateString()}</td>
                    <td>
                      ${r.status !== 'resolved' ? `
                        <button class="btn btn-secondary btn-small" onclick="window.updateRequestStatus('${r.id}', 'in_progress')">In Progress</button>
                        <button class="btn btn-success btn-small" onclick="window.updateRequestStatus('${r.id}', 'resolved')">Resolve</button>
                      ` : ''}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    window.updateRequestStatus = (id, status) => {
      this.dataService.updateSupportRequestStatus(id, status);
      this.renderRequests();
    };
  }
}
