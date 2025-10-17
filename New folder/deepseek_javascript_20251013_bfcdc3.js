// medical-career-platform.js
// Complete implementation for Trae AI to build the medical career platform

const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Database Models
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  medicalBackground: {
    degree: String,
    specialization: String,
    experience: Number,
    currentRole: String,
    currentHospital: String
  },
  techSkills: [String],
  careerGoals: {
    targetSalary: Number,
    desiredRole: String,
    timeline: String
  },
  assessmentResults: mongoose.Schema.Types.Mixed,
  learningPath: mongoose.Schema.Types.Mixed,
  progress: {
    completedCourses: [String],
    currentModule: String,
    overallProgress: Number
  }
});

const CourseSchema = new mongoose.Schema({
  title: String,
  category: String,
  level: String,
  duration: String,
  modules: [{
    title: String,
    lessons: [{
      title: String,
      content: String,
      duration: String,
      resources: [String]
    }],
    assessment: {
      questions: [{
        question: String,
        options: [String],
        correctAnswer: String,
        explanation: String
      }]
    }
  }],
  targetRoles: [String],
  prerequisites: [String]
});

const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

// AI Career Assessment Service
class CareerAssessmentAI {
  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY;
  }

  async analyzeUserProfile(userData) {
    const prompt = `
      Analyze this medical professional's profile and recommend career paths:
      
      Medical Background: ${userData.medicalBackground.degree}, ${userData.medicalBackground.experience} years experience
      Current Role: ${userData.medicalBackground.currentRole}
      Tech Skills: ${userData.techSkills.join(', ')}
      Career Goals: ${userData.careerGoals.targetSalary} salary, ${userData.careerGoals.desiredRole}
      
      Recommend 3 hybrid career paths combining medical and technology skills.
      For each path, provide:
      - Career title
      - Required skills
      - Salary range
      - Timeline to achieve
      - Recommended certifications
      - Job market demand
      
      Format as JSON.
    `;

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 2000
      }, {
        headers: { 'Authorization': `Bearer ${this.apiKey}` }
      });

      return JSON.parse(response.data.choices[0].message.content);
    } catch (error) {
      console.error('AI Analysis Error:', error);
      return this.getFallbackRecommendations(userData);
    }
  }

  getFallbackRecommendations(userData) {
    return {
      recommendedPaths: [
        {
          title: "Clinical Pharmacy Specialist + Informatics",
          requiredSkills: ["Clinical Pharmacology", "EMR Systems", "Data Analysis"],
          salaryRange: "35,000-45,000 AED",
          timeline: "6-8 months",
          certifications: ["BCPS", "CPIS"],
          demand: "High"
        },
        {
          title: "Healthcare Data Analyst",
          requiredSkills: ["Python", "SQL", "Medical Statistics"],
          salaryRange: "30,000-40,000 AED", 
          timeline: "8-10 months",
          certifications: ["Healthcare Analytics"],
          demand: "Growing"
        }
      ]
    };
  }

  async generateLearningPath(careerPath, userProfile) {
    return {
      timeline: "6 months",
      monthlyPlan: [
        {
          month: 1,
          objectives: ["Foundation in Clinical Pharmacology", "Basic Data Analysis"],
          courses: ["Advanced Clinical Pharmacology", "Healthcare Data Basics"],
          projects: ["Medication Review Project"],
          skills: ["Drug Interaction Analysis", "Excel for Healthcare"]
        },
        {
          month: 2,
          objectives: ["Specialized Pharmacology", "EMR Systems"],
          courses: ["Infectious Diseases Pharmacotherapy", "EMR Management"],
          projects: ["EMR Optimization Proposal"],
          skills: ["Protocol Development", "System Customization"]
        }
      ]
    };
  }
}

// Root route - Welcome page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head><title>Medical Career Platform</title></head>
    <body>
      <h1>Welcome to Medical Career Platform</h1>
      <p>API Endpoints:</p>
      <ul>
        <li>GET /api/health</li>
        <li>POST /api/assessment/start</li>
        <li>POST /api/path/generate</li>
        <li>GET /api/user/:id/progress</li>
        <li>GET /api/courses</li>
        <li>GET /api/jobs/matching</li>
      </ul>
    </body>
    </html>
  `);
});

// Core Platform Routes
app.post('/api/assessment/start', async (req, res) => {
  try {
    const { userData } = req.body;
    
    const aiService = new CareerAssessmentAI();
    const assessmentResults = await aiService.analyzeUserProfile(userData);
    
    let user = await User.findOne({ email: userData.email });
    if (!user) {
      user = new User(userData);
    }
    
    user.assessmentResults = assessmentResults;
    await user.save();
    
    res.json({
      success: true,
      assessmentId: user._id,
      recommendations: assessmentResults
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/path/generate', async (req, res) => {
  try {
    const { userId, selectedCareerPath } = req.body;
    
    const user = await User.findById(userId);
    const aiService = new CareerAssessmentAI();
    
    const learningPath = await aiService.generateLearningPath(selectedCareerPath, user);
    user.learningPath = learningPath;
    await user.save();
    
    res.json({
      success: true,
      learningPath: learningPath,
      estimatedTimeline: '6-8 months',
      targetSalary: selectedCareerPath.salaryRange
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/user/:id/progress', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({
      progress: user.progress,
      nextSteps: user.learningPath?.monthlyPlan?.[0] || []
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Course Management
app.get('/api/courses', async (req, res) => {
  try {
    const { category, level } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (level) filter.level = level;
    
    const courses = await Course.find(filter);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Job Matching
app.get('/api/jobs/matching', async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await User.findById(userId);
    
    const matchingJobs = [
      {
        title: "Clinical Pharmacist + Informatics Specialist",
        company: "Burjeel Hospital",
        location: "Abu Dhabi",
        salary: "35,000-45,000 AED",
        matchScore: 92,
        requirements: ["BCPS preferred", "EMR experience", "Clinical background"]
      }
    ];
    
    res.json({ jobs: matchingJobs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'Medical Career Platform',
    version: '1.0.0'
  });
});

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/medical-careers')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Medical Career Platform running on port ${PORT}`);
});

module.exports = app;