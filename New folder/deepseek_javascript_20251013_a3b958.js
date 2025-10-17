// medical-career-platform.js
// Complete implementation for Trae AI to build the medical career platform

const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

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
  category: String, // 'Clinical', 'Tech', 'Management'
  level: String, // 'Beginner', 'Intermediate', 'Advanced'
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

  async generateLearningPath(careerPath, userProfile) {
    const prompt = `
      Create a detailed 6-month learning path for a ${userProfile.medicalBackground.degree} 
      to become a ${careerPath.title}.
      
      Current skills: ${userProfile.techSkills.join(', ')}
      Experience: ${userProfile.medicalBackground.experience} years
      
      Create a month-by-month plan with:
      - Monthly learning objectives
      - Specific courses/certifications
      - Practical projects
      - Skill development milestones
      - Recommended resources
      
      Format as structured JSON.
    `;

    // Similar API call to OpenAI
    // Return structured learning path
  }
}

// Core Platform Routes
app.post('/api/assessment/start', async (req, res) => {
  try {
    const { userData } = req.body;
    
    const aiService = new CareerAssessmentAI();
    const assessmentResults = await aiService.analyzeUserProfile(userData);
    
    // Create or update user
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
      nextSteps: user.learningPath?.nextSteps || []
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

app.post('/api/courses/generate', async (req, res) => {
  try {
    const { topic, level, targetAudience } = req.body;
    
    // AI course generation logic here
    const generatedCourse = await generateAICourse(topic, level, targetAudience);
    
    const course = new Course(generatedCourse);
    await course.save();
    
    res.json({ success: true, course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Job Matching Engine
app.get('/api/jobs/matching', async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await User.findById(userId);
    
    const matchingJobs = await findMatchingJobs(user);
    res.json({ jobs: matchingJobs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function findMatchingJobs(user) {
  // Integrate with job APIs (LinkedIn, Indeed, etc.)
  // Match based on user's career path and skills
  return [
    {
      title: "Clinical Pharmacist + Informatics Specialist",
      company: "Burjeel Hospital",
      location: "Abu Dhabi",
      salary: "35,000-45,000 AED",
      matchScore: 92,
      requirements: ["BCPS preferred", "EMR experience", "Clinical background"]
    }
  ];
}

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/medical-careers')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Medical Career Platform running on port ${PORT}`);
  console.log(`📊 API endpoints ready for Trae AI integration`);
});

module.exports = app;