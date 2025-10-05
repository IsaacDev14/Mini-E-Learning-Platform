// Course Data
const courses = [
    {
        id: 1,
        title: "Web Development Fundamentals",
        description: "Learn the basics of HTML, CSS, and JavaScript to build modern websites.",
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        duration: "6 weeks",
        level: "Beginner",
        lessons: [
            { title: "Introduction to HTML", duration: "30 min" },
            { title: "CSS Styling Basics", duration: "45 min" },
            { title: "JavaScript Fundamentals", duration: "60 min" },
            { title: "Responsive Design", duration: "45 min" },
            { title: "Building a Portfolio Website", duration: "90 min" }
        ],
        completed: false
    },
    {
        id: 2,
        title: "Data Science Essentials",
        description: "Explore data analysis, visualization, and basic machine learning concepts.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        duration: "8 weeks",
        level: "Intermediate",
        lessons: [
            { title: "Introduction to Data Science", duration: "40 min" },
            { title: "Data Cleaning and Preparation", duration: "60 min" },
            { title: "Exploratory Data Analysis", duration: "50 min" },
            { title: "Data Visualization Techniques", duration: "55 min" },
            { title: "Introduction to Machine Learning", duration: "70 min" },
            { title: "Final Project", duration: "90 min" }
        ],
        completed: false
    },
    {
        id: 3,
        title: "Digital Marketing Strategy",
        description: "Master the art of digital marketing with SEO, social media, and content strategy.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1115&q=80",
        duration: "5 weeks",
        level: "Beginner",
        lessons: [
            { title: "Digital Marketing Overview", duration: "35 min" },
            { title: "Search Engine Optimization (SEO)", duration: "50 min" },
            { title: "Social Media Marketing", duration: "45 min" },
            { title: "Content Marketing Strategy", duration: "40 min" },
            { title: "Email Marketing Campaigns", duration: "55 min" },
            { title: "Analytics and Performance Tracking", duration: "60 min" }
        ],
        completed: false
    }
];

// DOM Elements
const coursesContainer = document.getElementById('coursesContainer');
const courseDetailSection = document.getElementById('courseDetailSection');
const courseDetail = document.getElementById('courseDetail');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const closeLoginModal = document.getElementById('closeLoginModal');
const closeSignupModal = document.getElementById('closeSignupModal');
const switchToSignup = document.getElementById('switchToSignup');
const switchToLogin = document.getElementById('switchToLogin');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// Initialize the application
function init() {
    renderCourses();
    setupEventListeners();
}

// Render courses on the homepage
function renderCourses() {
    coursesContainer.innerHTML = '';
    
    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <div class="course-image" style="background-image: url('${course.image}')"></div>
            <div class="course-content">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-meta">
                    <span>${course.duration}</span>
                    <span>${course.level}</span>
                </div>
                <button class="course-btn" data-id="${course.id}">View Course</button>
            </div>
        `;
        coursesContainer.appendChild(courseCard);
    });
}

// Show course details
function showCourseDetail(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    
    courseDetail.innerHTML = `
        <div class="course-detail-header">
            <h2 class="course-detail-title">${course.title}</h2>
            <p class="course-detail-description">${course.description}</p>
            <div class="course-detail-meta">
                <span>Duration: ${course.duration}</span>
                <span>Level: ${course.level}</span>
            </div>
        </div>
        <div class="course-detail-content">
            <h3>Course Curriculum</h3>
            <div class="lessons-list">
                ${course.lessons.map((lesson, index) => `
                    <div class="lesson-item">
                        <div>
                            <span class="lesson-title">${index + 1}. ${lesson.title}</span>
                        </div>
                        <span class="lesson-duration">${lesson.duration}</span>
                    </div>
                `).join('')}
            </div>
            <div class="completion-section">
                ${course.completed ? 
                    '<span class="completed-badge">Course Completed!</span>' : 
                    `<button class="btn-complete" data-id="${course.id}">Mark as Completed</button>`
                }
            </div>
        </div>
    `;
    
    courseDetailSection.style.display = 'block';
    coursesContainer.parentElement.style.display = 'none';
    
    // Add event listener to the complete button
    const completeBtn = document.querySelector('.btn-complete');
    if (completeBtn) {
        completeBtn.addEventListener('click', () => markAsCompleted(course.id));
    }
}

// Mark course as completed
function markAsCompleted(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (course) {
        course.completed = true;
        showCourseDetail(courseId);
        alert(`Congratulations! You've completed "${course.title}"`);
    }
}

// Show homepage
function showHomepage() {
    courseDetailSection.style.display = 'none';
    coursesContainer.parentElement.style.display = 'block';
}

// Setup event listeners
function setupEventListeners() {
    // Course card click events
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('course-btn')) {
            const courseId = parseInt(e.target.getAttribute('data-id'));
            showCourseDetail(courseId);
        }
    });

    // Logo click to return to homepage
    document.querySelector('.logo').addEventListener('click', (e) => {
        e.preventDefault();
        showHomepage();
    });

    // Modal controls
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'flex';
    });

    signupBtn.addEventListener('click', () => {
        signupModal.style.display = 'flex';
    });

    closeLoginModal.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    closeSignupModal.addEventListener('click', () => {
        signupModal.style.display = 'none';
    });

    switchToSignup.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'none';
        signupModal.style.display = 'flex';
    });

    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        signupModal.style.display = 'none';
        loginModal.style.display = 'flex';
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (e.target === signupModal) {
            signupModal.style.display = 'none';
        }
    });

    // Form submissions
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Simple validation
        if (email && password) {
            alert(`Welcome back! You're now logged in.`);
            loginModal.style.display = 'none';
            loginForm.reset();
        }
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        
        // Simple validation
        if (name && email && password) {
            alert(`Welcome to LearnHub, ${name}! Your account has been created.`);
            signupModal.style.display = 'none';
            signupForm.reset();
        }
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
