export class DataService {
  constructor() {
    this.initializeData();
  }

  initializeData() {
    if (!localStorage.getItem('healthResources')) {
      const sampleResources = [
        {
          id: 'res_1',
          title: 'Managing Stress and Anxiety',
          category: 'mental_health',
          description: 'Learn effective techniques to manage daily stress and reduce anxiety in your academic life.',
          content: 'This comprehensive guide covers breathing exercises, mindfulness practices, and cognitive strategies to help you manage stress effectively. Practice these techniques regularly for best results.',
          imageUrl: '',
          isPublished: true,
          createdBy: 'admin',
          createdAt: new Date().toISOString()
        },
        {
          id: 'res_2',
          title: 'Nutrition Guide for Students',
          category: 'nutrition',
          description: 'Essential nutrition tips and meal planning advice for busy students on a budget.',
          content: 'Eating well is crucial for academic performance and overall health. This guide provides practical advice on balanced meals, quick recipes, and shopping tips for students.',
          imageUrl: '',
          isPublished: true,
          createdBy: 'admin',
          createdAt: new Date().toISOString()
        },
        {
          id: 'res_3',
          title: 'Campus Fitness Programs',
          category: 'fitness',
          description: 'Explore various fitness activities and workout routines suitable for students.',
          content: 'Stay active and healthy with these fitness programs designed specifically for students. From yoga to high-intensity workouts, find what works for you.',
          imageUrl: '',
          isPublished: true,
          createdBy: 'admin',
          createdAt: new Date().toISOString()
        },
        {
          id: 'res_4',
          title: 'Sleep Hygiene and Study Balance',
          category: 'general',
          description: 'Tips for maintaining healthy sleep patterns while managing academic workload.',
          content: 'Quality sleep is essential for learning and memory. Learn how to establish good sleep habits and maintain a healthy balance between study and rest.',
          imageUrl: '',
          isPublished: true,
          createdBy: 'admin',
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('healthResources', JSON.stringify(sampleResources));
    }

    if (!localStorage.getItem('wellnessPrograms')) {
      const samplePrograms = [
        {
          id: 'prog_1',
          title: 'Mindfulness Meditation Program',
          type: 'meditation',
          description: 'A 4-week guided meditation program to reduce stress and improve focus.',
          duration: '4 weeks',
          difficultyLevel: 'beginner',
          schedule: 'Daily 15-minute sessions, Monday to Friday',
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 'prog_2',
          title: 'Campus Fitness Challenge',
          type: 'fitness',
          description: 'Join our 30-day fitness challenge with daily workout routines and nutrition tracking.',
          duration: '30 days',
          difficultyLevel: 'intermediate',
          schedule: 'Daily workouts, progress tracking every week',
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 'prog_3',
          title: 'Healthy Eating Workshop',
          type: 'nutrition',
          description: 'Learn to prepare nutritious meals on a student budget.',
          duration: '6 weeks',
          difficultyLevel: 'beginner',
          schedule: 'Weekly cooking classes on Wednesdays 5-7 PM',
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 'prog_4',
          title: 'Stress Management Course',
          type: 'stress_management',
          description: 'Comprehensive course on managing academic stress and building resilience.',
          duration: '8 weeks',
          difficultyLevel: 'beginner',
          schedule: 'Bi-weekly sessions with online resources',
          isActive: true,
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('wellnessPrograms', JSON.stringify(samplePrograms));
    }

    if (!localStorage.getItem('supportServices')) {
      const sampleServices = [
        {
          id: 'serv_1',
          name: 'Student Counseling Center',
          type: 'counseling',
          description: 'Free confidential counseling services for all students dealing with personal, academic, or emotional concerns.',
          contactInfo: 'Phone: (555) 123-4567 | Email: counseling@university.edu',
          availability: 'Monday-Friday, 9 AM - 5 PM',
          isAvailable: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 'serv_2',
          name: '24/7 Crisis Hotline',
          type: 'emergency',
          description: 'Immediate support for students experiencing a mental health crisis or emergency.',
          contactInfo: 'Phone: (555) 911-HELP (4357) | Available 24/7',
          availability: '24/7 - Always Available',
          isAvailable: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 'serv_3',
          name: 'Peer Support Line',
          type: 'hotline',
          description: 'Talk to trained student peers about stress, anxiety, or just need someone to listen.',
          contactInfo: 'Phone: (555) 234-5678 | Text: (555) 234-TEXT',
          availability: 'Daily, 6 PM - 12 AM',
          isAvailable: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 'serv_4',
          name: 'Health & Wellness Consultation',
          type: 'consultation',
          description: 'Schedule a consultation with health professionals for nutrition, fitness, and wellness planning.',
          contactInfo: 'Email: wellness@university.edu | Online booking available',
          availability: 'Monday, Wednesday, Friday, 10 AM - 4 PM',
          isAvailable: true,
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('supportServices', JSON.stringify(sampleServices));
    }

    if (!localStorage.getItem('programEnrollments')) {
      localStorage.setItem('programEnrollments', JSON.stringify([]));
    }

    if (!localStorage.getItem('resourceViews')) {
      localStorage.setItem('resourceViews', JSON.stringify([]));
    }

    if (!localStorage.getItem('supportRequests')) {
      localStorage.setItem('supportRequests', JSON.stringify([]));
    }
  }

  generateId() {
    return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  getHealthResources(filters = {}) {
    const resources = JSON.parse(localStorage.getItem('healthResources') || '[]');
    let filtered = resources;

    if (filters.category) {
      filtered = filtered.filter(r => r.category === filters.category);
    }

    if (filters.publishedOnly) {
      filtered = filtered.filter(r => r.isPublished);
    }

    return filtered;
  }

  getHealthResource(id) {
    const resources = this.getHealthResources();
    return resources.find(r => r.id === id);
  }

  createHealthResource(data) {
    const resources = this.getHealthResources();
    const newResource = {
      id: this.generateId(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    resources.push(newResource);
    localStorage.setItem('healthResources', JSON.stringify(resources));
    return newResource;
  }

  updateHealthResource(id, data) {
    const resources = this.getHealthResources();
    const index = resources.findIndex(r => r.id === id);
    if (index !== -1) {
      resources[index] = {
        ...resources[index],
        ...data,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('healthResources', JSON.stringify(resources));
      return resources[index];
    }
    return null;
  }

  deleteHealthResource(id) {
    const resources = this.getHealthResources();
    const filtered = resources.filter(r => r.id !== id);
    localStorage.setItem('healthResources', JSON.stringify(filtered));
    return true;
  }

  getWellnessPrograms(filters = {}) {
    const programs = JSON.parse(localStorage.getItem('wellnessPrograms') || '[]');
    let filtered = programs;

    if (filters.type) {
      filtered = filtered.filter(p => p.type === filters.type);
    }

    if (filters.activeOnly) {
      filtered = filtered.filter(p => p.isActive);
    }

    return filtered;
  }

  getWellnessProgram(id) {
    const programs = this.getWellnessPrograms();
    return programs.find(p => p.id === id);
  }

  createWellnessProgram(data) {
    const programs = this.getWellnessPrograms();
    const newProgram = {
      id: this.generateId(),
      ...data,
      createdAt: new Date().toISOString()
    };
    programs.push(newProgram);
    localStorage.setItem('wellnessPrograms', JSON.stringify(programs));
    return newProgram;
  }

  updateWellnessProgram(id, data) {
    const programs = this.getWellnessPrograms();
    const index = programs.findIndex(p => p.id === id);
    if (index !== -1) {
      programs[index] = {
        ...programs[index],
        ...data
      };
      localStorage.setItem('wellnessPrograms', JSON.stringify(programs));
      return programs[index];
    }
    return null;
  }

  deleteWellnessProgram(id) {
    const programs = this.getWellnessPrograms();
    const filtered = programs.filter(p => p.id !== id);
    localStorage.setItem('wellnessPrograms', JSON.stringify(filtered));
    return true;
  }

  getSupportServices() {
    return JSON.parse(localStorage.getItem('supportServices') || '[]');
  }

  getSupportService(id) {
    const services = this.getSupportServices();
    return services.find(s => s.id === id);
  }

  createSupportService(data) {
    const services = this.getSupportServices();
    const newService = {
      id: this.generateId(),
      ...data,
      createdAt: new Date().toISOString()
    };
    services.push(newService);
    localStorage.setItem('supportServices', JSON.stringify(services));
    return newService;
  }

  updateSupportService(id, data) {
    const services = this.getSupportServices();
    const index = services.findIndex(s => s.id === id);
    if (index !== -1) {
      services[index] = {
        ...services[index],
        ...data
      };
      localStorage.setItem('supportServices', JSON.stringify(services));
      return services[index];
    }
    return null;
  }

  deleteSupportService(id) {
    const services = this.getSupportServices();
    const filtered = services.filter(s => s.id !== id);
    localStorage.setItem('supportServices', JSON.stringify(filtered));
    return true;
  }

  enrollInProgram(studentId, programId) {
    const enrollments = JSON.parse(localStorage.getItem('programEnrollments') || '[]');

    const existing = enrollments.find(e => e.studentId === studentId && e.programId === programId);
    if (existing) {
      return { success: false, message: 'Already enrolled in this program' };
    }

    const newEnrollment = {
      id: this.generateId(),
      studentId,
      programId,
      enrolledAt: new Date().toISOString(),
      status: 'active',
      progress: 0
    };

    enrollments.push(newEnrollment);
    localStorage.setItem('programEnrollments', JSON.stringify(enrollments));
    return { success: true, enrollment: newEnrollment };
  }

  getStudentEnrollments(studentId) {
    const enrollments = JSON.parse(localStorage.getItem('programEnrollments') || '[]');
    return enrollments.filter(e => e.studentId === studentId);
  }

  updateEnrollmentProgress(enrollmentId, progress) {
    const enrollments = JSON.parse(localStorage.getItem('programEnrollments') || '[]');
    const index = enrollments.findIndex(e => e.id === enrollmentId);
    if (index !== -1) {
      enrollments[index].progress = progress;
      if (progress >= 100) {
        enrollments[index].status = 'completed';
      }
      localStorage.setItem('programEnrollments', JSON.stringify(enrollments));
      return enrollments[index];
    }
    return null;
  }

  logResourceView(studentId, resourceId, duration = 0) {
    const views = JSON.parse(localStorage.getItem('resourceViews') || '[]');
    const newView = {
      id: this.generateId(),
      studentId,
      resourceId,
      viewedAt: new Date().toISOString(),
      durationSeconds: duration
    };
    views.push(newView);
    localStorage.setItem('resourceViews', JSON.stringify(views));
    return newView;
  }

  createSupportRequest(studentId, serviceId, message) {
    const requests = JSON.parse(localStorage.getItem('supportRequests') || '[]');
    const newRequest = {
      id: this.generateId(),
      studentId,
      serviceId,
      message,
      status: 'pending',
      createdAt: new Date().toISOString(),
      resolvedAt: null
    };
    requests.push(newRequest);
    localStorage.setItem('supportRequests', JSON.stringify(requests));
    return newRequest;
  }

  getSupportRequests(filters = {}) {
    const requests = JSON.parse(localStorage.getItem('supportRequests') || '[]');
    let filtered = requests;

    if (filters.studentId) {
      filtered = filtered.filter(r => r.studentId === filters.studentId);
    }

    if (filters.status) {
      filtered = filtered.filter(r => r.status === filters.status);
    }

    return filtered;
  }

  updateSupportRequestStatus(requestId, status) {
    const requests = JSON.parse(localStorage.getItem('supportRequests') || '[]');
    const index = requests.findIndex(r => r.id === requestId);
    if (index !== -1) {
      requests[index].status = status;
      if (status === 'resolved') {
        requests[index].resolvedAt = new Date().toISOString();
      }
      localStorage.setItem('supportRequests', JSON.stringify(requests));
      return requests[index];
    }
    return null;
  }

  getAnalytics() {
    const resources = this.getHealthResources();
    const programs = this.getWellnessPrograms();
    const enrollments = JSON.parse(localStorage.getItem('programEnrollments') || '[]');
    const views = JSON.parse(localStorage.getItem('resourceViews') || '[]');
    const requests = this.getSupportRequests();

    return {
      totalResources: resources.length,
      publishedResources: resources.filter(r => r.isPublished).length,
      totalPrograms: programs.length,
      activePrograms: programs.filter(p => p.isActive).length,
      totalEnrollments: enrollments.length,
      activeEnrollments: enrollments.filter(e => e.status === 'active').length,
      totalViews: views.length,
      totalRequests: requests.length,
      pendingRequests: requests.filter(r => r.status === 'pending').length
    };
  }
}
