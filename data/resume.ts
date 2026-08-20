// ============================================================
// Single source of truth — all content from Sakshi's resume.
// Do NOT add invented metrics, clients, or achievements.
// ============================================================

export const personal = {
  name: 'Sakshi Shrivastava',
  role: 'Software Engineer & System Analyst',
  location: 'Gurugram, Haryana, India',
  email: 'shrivastavasakshi382@gmail.com',
  github: 'https://github.com/sakshishrivas',
  linkedin: 'https://linkedin.com/in/sakshi-shrivastava1',
  intro:
    'I build backend systems, design APIs and analyse enterprise workflows — turning complex requirements into reliable, scalable software.',
};

export const experience = [
  {
    id: 'exp-1',
    company: 'Thoughts2Binary Pvt. Ltd.',
    role: 'System Analyst',
    duration: 'Sep 2025 – Present',
    location: 'Gurugram, India',
    current: true,
    responsibilities: [
      'Requirement analysis and translating business needs into application workflows and validation scenarios',
      'SQL-based backend data validation and REST API testing using Postman',
      'Functional, regression, smoke, sanity and workflow testing across enterprise SaaS platform',
      'Debugging using logs, API responses and database queries',
      'Root cause analysis, UAT and release validation',
      'Agile delivery support working with developers, QA teams, product owners and stakeholders',
    ],
    technologies: ['SQL', 'REST APIs', 'Postman', 'Agile', 'Scrum'],
  },
  {
    id: 'exp-2',
    company: 'Softpro India Computer Technologies',
    role: 'Data Science Intern',
    duration: 'Aug 2024 – Oct 2024',
    location: 'India',
    current: false,
    responsibilities: [
      'Applied Python and SQL for data analysis and processing tasks',
      'Built data pipelines using Pandas and NumPy for structured data processing',
      'Created business intelligence visualisations using Power BI',
    ],
    technologies: ['Python', 'SQL', 'Pandas', 'NumPy', 'Power BI'],
  },
];

export const projects = [
  {
    id: 'chapramart',
    name: 'ChapraMart',
    type: 'Quick Commerce Platform',
    featured: true,
    problem:
      'Quick commerce applications demand low-latency API responses, reliable inventory management and secure multi-role authentication — all while handling asynchronous background operations at scale. The challenge was to design a backend architecture that balanced speed, reliability and clean separation of concerns.',
    architecture:
      'Django REST Framework handles the API layer with JWT-secured endpoints and role-based access control. PostgreSQL manages relational data for products, orders and inventory. Redis provides caching for high-read catalog queries, while Celery processes background tasks such as order notifications and inventory updates asynchronously. Docker containers the entire stack for environment consistency.',
    features: [
      'JWT authentication with Role-Based Access Control (RBAC) for customers, store managers and admins',
      'Store, product and inventory management APIs with full CRUD operations',
      'Cart and order management workflows with status tracking',
      'Redis caching layer for product catalog and session data',
      'Celery for async order processing, notifications and inventory updates',
      'Swagger/OpenAPI documentation for all endpoints',
      'Pytest-based automated test suite for API and business logic coverage',
    ],
    technologies: ['Python', 'Django', 'Django REST Framework', 'PostgreSQL', 'JWT', 'Redis', 'Celery', 'Docker', 'Swagger', 'Pytest'],
    github: 'https://github.com/sakshishrivas',
  },
  {
    id: 'hotel-saas',
    name: 'Hotel Management SaaS',
    type: 'Enterprise SaaS Platform',
    featured: false,
    problem:
      'Hotel operations require complex relational data modeling across bookings, invoicing, housekeeping and payment workflows — all requiring role-based access and reliable automated test coverage to support continuous delivery.',
    features: [
      'Booking, invoicing and payment processing workflows',
      'Refund handling and housekeeping management modules',
      'Role-Based Access Control (RBAC) with JWT authentication',
      'Relational data modeling with Prisma ORM and PostgreSQL',
      'Redis caching for frequently accessed data and session management',
      'Jest automated test coverage for API endpoints and business logic',
    ],
    technologies: ['Node.js', 'TypeScript', 'Express.js', 'PostgreSQL', 'Prisma', 'JWT', 'Redis', 'Docker', 'Jest'],
    github: 'https://github.com/sakshishrivas',
  },
  {
    id: 'compliance',
    name: 'Enterprise Compliance Platform',
    type: 'SaaS — System Analysis',
    featured: false,
    problem:
      'Enterprise compliance workflows involve complex approval chains, questionnaires, role-based notifications and cross-team validation requirements. This project required rigorous system analysis to map workflows, identify edge cases and ensure complete test coverage across all compliance modules.',
    features: [
      'Compliance workflow and multi-step approval chain analysis',
      'Questionnaire and assessment system validation and testing',
      'Role-based access, notifications and dashboard verification',
      'SQL-based backend data validation against business rules',
      'REST API testing and end-to-end workflow verification using Postman',
      'Functional, regression and smoke testing with structured defect reporting',
    ],
    technologies: ['SaaS', 'SQL', 'REST APIs', 'Postman', 'Agile'],
    github: null,
  },
];

export const capabilities = [
  {
    id: 'backend',
    name: 'Backend Systems',
    description:
      'Design and build API-driven backend services with clean architecture, authentication layers, role-based access and scalable data models.',
    technologies: ['Python', 'Django', 'Node.js', 'Express.js'],
  },
  {
    id: 'rest-apis',
    name: 'REST APIs',
    description:
      'Endpoint design, versioning, JWT authentication, RBAC and comprehensive OpenAPI/Swagger documentation for developer-ready APIs.',
    technologies: ['Django REST Framework', 'JWT', 'Swagger', 'Postman'],
  },
  {
    id: 'enterprise-saas',
    name: 'Enterprise SaaS',
    description:
      'Workflow analysis, requirement translation, multi-stakeholder validation and release testing for enterprise SaaS products.',
    technologies: ['SQL', 'REST APIs', 'Agile', 'Scrum'],
  },
  {
    id: 'data-sql',
    name: 'Data & SQL',
    description:
      'Relational database design, query optimisation and data validation using SQL, Prisma ORM and analytics tooling.',
    technologies: ['PostgreSQL', 'MySQL', 'Prisma', 'Pandas'],
  },
  {
    id: 'testing',
    name: 'Testing & Debugging',
    description:
      'End-to-end test strategy including functional, regression and API testing, root-cause analysis and structured defect reporting.',
    technologies: ['Pytest', 'Jest', 'Postman', 'Logs'],
  },
];

export const mindsetSteps = [
  {
    id: 'understand',
    label: 'Understand',
    description: 'Break down the business problem into precise technical requirements.',
  },
  {
    id: 'analyze',
    label: 'Analyze',
    description: 'Map system flows, identify dependencies, edge cases and constraints.',
  },
  {
    id: 'design',
    label: 'Design',
    description: 'Plan the architecture: APIs, data models, access control, async flows.',
  },
  {
    id: 'build',
    label: 'Build',
    description: 'Implement and configure with clean, maintainable, documented code.',
  },
  {
    id: 'test',
    label: 'Test',
    description: 'Write automated tests and validate all requirements and edge cases.',
  },
  {
    id: 'debug',
    label: 'Debug',
    description: 'Trace logs, query databases, isolate root causes systematically.',
  },
  {
    id: 'deliver',
    label: 'Deliver',
    description: 'UAT, release validation and clean stakeholder handoff.',
  },
];

export const techStack: Record<string, string[]> = {
  Languages: ['Python', 'SQL', 'JavaScript', 'TypeScript', 'HTML', 'CSS'],
  Backend: ['Django', 'Django REST Framework', 'Node.js', 'Express.js'],
  Databases: ['PostgreSQL', 'MySQL', 'Prisma ORM', 'Redis'],
  Testing: ['Pytest', 'Jest', 'Postman', 'API Testing'],
  Tools: ['Git', 'GitHub', 'Docker', 'Celery', 'Swagger', 'VS Code'],
  Engineering: ['REST APIs', 'RBAC', 'Authentication', 'Agile', 'Scrum', 'SDLC'],
  Analytics: ['Pandas', 'NumPy', 'Power BI'],
  AI: ['Prompt Engineering', 'LLM APIs', 'AI-assisted Dev'],
};

export const education = {
  degree: 'Bachelor of Technology',
  field: 'Computer Science and Engineering',
  university: 'Dr. A.P.J. Abdul Kalam Technical University, Lucknow',
  duration: '2021 – 2025',
  cgpa: '7.77',
};

export const certifications = [
  { id: 'c1', name: 'Python for Data Science', issuer: 'IBM', status: 'completed' as const },
  { id: 'c2', name: 'Deloitte Data Analytics Job Simulation', issuer: 'Deloitte', status: 'completed' as const },
  { id: 'c3', name: 'Advanced SQL', issuer: null, status: 'in-progress' as const },
  { id: 'c4', name: 'Power BI for Business Intelligence', issuer: null, status: 'in-progress' as const },
];
