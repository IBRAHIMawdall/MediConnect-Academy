import { PlaceHolderImages } from './placeholder-images';

export type Lesson = {
  title: string;
  content: string;
};

export type Module = {
  title: string;
  lessons: Lesson[];
};

export type Course = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  imageId: string;
  modules: Module[];
};

export const courses: Course[] = [
  {
    id: 'advanced-cardiology',
    title: 'Advanced Cardiology',
    description: 'Deep dive into the latest in cardiovascular medicine and research.',
    longDescription: 'This course offers a comprehensive review of advanced topics in cardiology, including invasive procedures, electrophysiology, and cutting-edge treatments for heart failure. Designed for experienced cardiologists and fellows.',
    imageId: 'adv-cardiology',
    modules: [
      {
        title: 'Module 1: Interventional Cardiology',
        lessons: [
          { title: 'Complex Coronary Interventions', content: 'Detailed walkthrough of advanced techniques.' },
          { title: 'Structural Heart Disease', content: 'Focus on TAVR and MitraClip procedures.' },
        ],
      },
      {
        title: 'Module 2: Electrophysiology',
        lessons: [
          { title: 'Arrhythmia Management', content: 'Latest guidelines and treatments.' },
          { title: 'Device Implantation', content: 'Pacemakers, ICDs, and CRT devices.' },
        ],
      },
    ],
  },
  {
    id: 'pediatric-emergency-care',
    title: 'Pediatric Emergency Care',
    description: 'Master the skills to handle critical situations in pediatric patients.',
    longDescription: 'Gain confidence and competence in managing pediatric emergencies. This course covers everything from initial assessment to advanced life support, tailored specifically for the pediatric population.',
    imageId: 'pediatric-care',
    modules: [
      {
        title: 'Module 1: Pediatric Assessment',
        lessons: [
          { title: 'The Pediatric Assessment Triangle', content: 'A systematic approach to initial assessment.' },
          { title: 'Developmental Considerations', content: 'Understanding age-specific differences.' },
        ],
      },
      {
        title: 'Module 2: Common Pediatric Emergencies',
        lessons: [
          { title: 'Respiratory Distress', content: 'From croup to asthma exacerbations.' },
          { title: 'Febrile Seizures', content: 'Diagnosis and management.' },
        ],
      },
    ],
  },
  {
    id: 'surgical-techniques-101',
    title: 'Surgical Techniques 101',
    description: 'Fundamental principles and hands-on techniques for aspiring surgeons.',
    longDescription: 'An essential course for medical students and junior residents interested in surgery. It covers sterile technique, suturing, knot tying, and basic surgical procedures in a simulated environment.',
    imageId: 'surgical-tech',
    modules: [
      {
        title: 'Module 1: The Operating Room Environment',
        lessons: [
          { title: 'Aseptic Technique', content: 'The foundation of safe surgery.' },
          { title: 'Surgical Instruments', content: 'Identification and proper handling.' },
        ],
      },
      {
        title: 'Module 2: Basic Surgical Skills',
        lessons: [
          { title: 'Suturing and Knot Tying', content: 'Step-by-step video tutorials and practice exercises.' },
          { title: 'Basic Incision and Drainage', content: 'A common and important procedure.' },
        ],
      },
    ],
  },
  {
    id: 'pharmacology-innovations',
    title: 'Pharmacology Innovations',
    description: 'Explore the future of medicine with breakthroughs in drug development.',
    longDescription: 'Stay at the forefront of pharmacology with this course on the latest innovations. Topics include gene therapy, personalized medicine, and new drug delivery systems. Ideal for pharmacists, physicians, and researchers.',
    imageId: 'pharma-innov',
    modules: [
      {
        title: 'Module 1: Gene and Cell Therapies',
        lessons: [
          { title: 'Introduction to Gene Editing', content: 'CRISPR and beyond.' },
          { title: 'CAR-T Cell Therapy', content: 'A revolution in cancer treatment.' },
        ],
      },
      {
        title: 'Module 2: Personalized Medicine',
        lessons: [
          { title: 'Pharmacogenomics', content: 'Tailoring drugs to individual genetic profiles.' },
          { title: 'Targeted Drug Therapies', content: 'Maximizing efficacy and minimizing side effects.' },
        ],
      },
    ],
  },
  {
    id: 'medical-ethics-and-law',
    title: 'Medical Ethics and Law',
    description: 'Navigate complex ethical dilemmas and legal responsibilities in healthcare.',
    longDescription: 'This course provides a framework for understanding and addressing the ethical and legal issues that arise in modern medical practice. Case studies and expert discussions will guide you through complex topics like end-of-life care, patient confidentiality, and resource allocation.',
    imageId: 'medical-ethics',
    modules: [
      {
        title: 'Module 1: Foundations of Medical Ethics',
        lessons: [
          { title: 'The Four Principles', content: 'Autonomy, Beneficence, Non-maleficence, and Justice.' },
          { title: 'Informed Consent', content: 'Legal and ethical requirements.' },
        ],
      },
      {
        title: 'Module 2: Contemporary Issues',
        lessons: [
          { title: 'End-of-Life Decision Making', content: 'Navigating advance directives and palliative care.' },
          { title: 'HIPAA and Patient Privacy', content: 'Understanding the legal landscape.' },
        ],
      },
    ],
  },
  {
    id: 'telehealth-best-practices',
    title: 'Telehealth Best Practices',
    description: 'Deliver high-quality care remotely with effective telehealth strategies.',
    longDescription: 'The future of healthcare is digital. This course equips you with the tools and techniques for effective telehealth practice, from virtual examination skills to "webside manner," ensuring patient safety and satisfaction.',
    imageId: 'telehealth-practice',
    modules: [
      {
        title: 'Module 1: Setting Up Your Virtual Practice',
        lessons: [
          { title: 'Technology and Platforms', content: 'Choosing the right tools for your practice.' },
          { title: 'Regulatory and Billing Considerations', content: 'Staying compliant and getting paid.' },
        ],
      },
      {
        title: 'Module 2: The Virtual Consultation',
        lessons: [
          { title: 'Effective Communication', content: 'Building rapport through a screen.' },
          { title: 'Remote Physical Examination', content: 'Techniques and limitations.' },
        ],
      },
    ],
  },
  {
    id: 'mental-health-first-aid',
    title: 'Mental Health First Aid',
    description: 'Learn to identify, understand, and respond to signs of mental illnesses.',
    longDescription: 'This course teaches you how to assist someone experiencing a mental health or substance use-related crisis. You will learn risk factors and warning signs for mental health and addiction concerns, strategies for how to help someone in both crisis and non-crisis situations, and where to turn for help.',
    imageId: 'mental-health',
    modules: [
      {
        title: 'Module 1: Understanding Mental Health',
        lessons: [
          { title: 'Common Mental Health Challenges', content: 'Depression, anxiety, and substance use disorders.' },
          { title: 'The ALGEE Action Plan', content: 'A framework for providing support.' },
        ],
      },
      {
        title: 'Module 2: Crisis Intervention',
        lessons: [
          { title: 'Responding to Panic Attacks', content: 'Techniques for de-escalation.' },
          { title: 'Suicide Prevention', content: 'Recognizing warning signs and getting help.' },
        ],
      },
    ],
  },
  {
    id: 'nutrition-and-health',
    title: 'Nutrition and Health',
    description: 'Explore the link between diet and health with evidence-based nutrition science.',
    longDescription: 'This course provides a comprehensive overview of nutrition science, covering macronutrients, micronutrients, dietary guidelines, and the role of nutrition in preventing chronic diseases. It is designed for healthcare professionals and anyone interested in improving their health through diet.',
    imageId: 'nutrition-health',
    modules: [
      {
        title: 'Module 1: Macronutrients',
        lessons: [
          { title: 'Carbohydrates, Proteins, and Fats', content: 'Understanding their roles in the body.' },
          { title: 'Dietary Fiber', content: 'The importance of fiber for digestive health.' },
        ],
      },
      {
        title: 'Module 2: Micronutrients and Disease Prevention',
        lessons: [
          { title: 'Vitamins and Minerals', content: 'Essential nutrients for optimal health.' },
          { title: 'Nutrition and Chronic Disease', content: 'The role of diet in preventing heart disease, diabetes, and cancer.' },
        ],
      },
    ],
  },
  {
    id: 'genomics-in-medicine',
    title: 'Genomics in Medicine',
    description: 'Understand the role of genetics in health and disease.',
    longDescription: 'This course introduces the principles of genomics and its applications in clinical practice. You will learn about genetic testing, pharmacogenomics, and the ethical, legal, and social implications of genomic medicine.',
    imageId: 'genomics-medicine',
    modules: [
      {
        title: 'Module 1: Fundamentals of Genomics',
        lessons: [
          { title: 'DNA, Genes, and Chromosomes', content: 'The building blocks of life.' },
          { title: 'Genetic Variation', content: 'How our genes make us unique.' },
        ],
      },
      {
        title: 'Module 2: Clinical Applications',
        lessons: [
          { title: 'Genetic Testing and Counseling', content: 'Interpreting and communicating genetic information.' },
          { title: 'The Future of Genomic Medicine', content: 'Personalized medicine and beyond.' },
        ],
      },
    ],
  },
  {
    id: 'data-science-for-healthcare',
    title: 'Data Science for Healthcare',
    description: 'Leverage data to improve patient outcomes and healthcare delivery.',
    longDescription: 'This course provides an introduction to data science and its applications in healthcare. You will learn about data analysis, machine learning, and how to use data to drive improvements in clinical care, research, and operations.',
    imageId: 'data-science-healthcare',
    modules: [
      {
        title: 'Module 1: Healthcare Data',
        lessons: [
          { title: 'Sources of Healthcare Data', content: 'EHRs, claims data, and patient-generated data.' },
          { title: 'Data Wrangling and Cleaning', content: 'Preparing data for analysis.' },
        ],
      },
      {
        title: 'Module 2: Machine Learning in Healthcare',
        lessons: [
          { title: 'Predictive Modeling', content: 'Forecasting disease risk and patient outcomes.' },
          { title: 'Natural Language Processing', content: 'Extracting insights from clinical notes.' },
        ],
      },
    ],
  },
  {
    id: 'global-health-challenges',
    title: 'Global Health Challenges',
    description: 'Examine the major health issues facing the world today.',
    longDescription: 'This course provides an overview of the most pressing global health challenges, including infectious diseases, maternal and child health, and the impact of climate change on health. You will learn about the social, economic, and political determinants of health and explore strategies for improving health equity worldwide.',
    imageId: 'global-health',
    modules: [
      {
        title: 'Module 1: Infectious Diseases',
        lessons: [
          { title: 'Pandemic Preparedness', content: 'Lessons learned from COVID-19.' },
          { title: 'The Big Three', content: 'HIV/AIDS, tuberculosis, and malaria.' },
        ],
      },
      {
        title: 'Module 2: Health Systems and Policy',
        lessons: [
          { title: 'Universal Health Coverage', content: 'A global movement.' },
          { title: 'The Role of Non-Governmental Organizations', content: 'Partners in global health.' },
        ],
      },
    ],
  },
  {
    id: 'clinical-research-design',
    title: 'Clinical Research Design',
    description: 'Learn how to design and conduct high-quality clinical research.',
    longDescription: 'This course covers the principles of clinical research design, including randomized controlled trials, observational studies, and systematic reviews. You will learn how to develop a research question, select a study design, and write a research protocol.',
    imageId: 'clinical-research',
    modules: [
      {
        title: 'Module 1: Study Design',
        lessons: [
          { title: 'Randomized Controlled Trials', content: 'The gold standard in clinical research.' },
          { title: 'Observational Studies', content: 'Cohort, case-control, and cross-sectional studies.' },
        ],
      },
      {
        title: 'Module 2: Protocol Development',
        lessons: [
          { title: 'Developing a Research Question', content: 'The foundation of any research project.' },
          { title: 'Writing a Research Protocol', content: 'A roadmap for your study.' },
        ],
      },
    ],
  },
  {
    id: 'patient-safety-and-quality-improvement',
    title: 'Patient Safety and Quality Improvement',
    description: 'Learn to lead initiatives that improve patient safety and healthcare quality.',
    longDescription: 'This course provides a framework for understanding and improving patient safety and healthcare quality. You will learn about quality improvement methodologies, root cause analysis, and how to create a culture of safety in your organization.',
    imageId: 'patient-safety',
    modules: [
      {
        title: 'Module 1: Principles of Patient Safety',
        lessons: [
          { title: 'The Swiss Cheese Model', content: 'Understanding how errors occur.' },
          { title: 'Human Factors Engineering', content: 'Designing safer systems.' },
        ],
      },
      {
        title: 'Module 2: Quality Improvement Tools',
        lessons: [
          { title: 'Plan-Do-Study-Act (PDSA) Cycles', content: 'A simple yet powerful tool for improvement.' },
          { title: 'Root Cause Analysis', content: 'Investigating and learning from adverse events.' },
        ],
      },
    ],
  },
  {
    id: 'healthcare-management',
    title: 'Healthcare Management',
    description: 'Develop the skills to lead and manage in the complex healthcare environment.',
    longDescription: 'This course provides an overview of healthcare management, including healthcare finance, operations, and strategic planning. You will learn about the challenges and opportunities facing healthcare leaders today and develop the skills to lead your organization to success.',
    imageId: 'healthcare-management',
    modules: [
      {
        title: 'Module 1: Healthcare Finance',
        lessons: [
          { title: 'Budgeting and Financial Planning', content: 'The basics of healthcare finance.' },
          { title: 'Revenue Cycle Management', content: 'Getting paid for the care you provide.' },
        ],
      },
      {
        title: 'Module 2: Healthcare Operations',
        lessons: [
          { title: 'Process Improvement', content: 'Lean and Six Sigma in healthcare.' },
          { title: 'Supply Chain Management', content: 'Getting the right supplies at the right time.' },
        ],
      },
    ],
  },
  {
    id: 'diagnostic-imaging-fundamentals',
    title: 'Diagnostic Imaging Fundamentals',
    description: 'An introduction to the principles and applications of diagnostic imaging.',
    longDescription: 'This course provides a comprehensive introduction to the field of diagnostic imaging, including X-ray, CT, MRI, and ultrasound. You will learn about the physical principles of each modality, their clinical applications, and how to interpret common imaging studies.',
    imageId: 'diagnostic-imaging',
    modules: [
      {
        title: 'Module 1: X-ray and CT',
        lessons: [
          { title: 'The Physics of X-rays', content: 'How X-rays are produced and interact with matter.' },
          { title: 'Interpreting Chest X-rays', content: 'A systematic approach.' },
        ],
      },
      {
        title: 'Module 2: MRI and Ultrasound',
        lessons: [
          { title: 'The Principles of MRI', content: 'From protons to pictures.' },
          { title: 'Introduction to Ultrasound', content: 'The power of sound waves in medicine.' },
        ],
      },
    ],
  }
];
