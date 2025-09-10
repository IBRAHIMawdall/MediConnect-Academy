import { PlaceHolderImages } from './placeholder-images';

export type Lesson = {
  title: string;
  content: string;
  videoUrl?: string;
};

export type Module = {
  title: string;
  lessons: Lesson[];
};

export type CourseCategory =
  | 'Cardiology'
  | 'Pediatrics'
  | 'Surgery'
  | 'Pharmacology'
  | 'Ethics'
  | 'Digital Health'
  | 'Mental Health'
  | 'Nutrition'
  | 'Genomics'
  | 'Data Science'
  | 'Global Health'
  | 'Research'
  | 'Patient Safety'
  | 'Management'
  | 'Radiology'
  | 'AI in Healthcare'
  | 'Public Health'
  | 'Medical Billing'
  | 'Leadership'
  | 'Sports Medicine'
  | 'Dermatology'
  | 'Geriatrics'
  | 'Infectious Disease'
  | 'Palliative Care'
  | 'Wilderness Medicine'
  | 'Biology'
  | 'Neuroscience'
  | 'Exam Prep';


export type Course = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  imageId: string;
  modules: Module[];
  categories: CourseCategory[];
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
          { title: 'Complex Coronary Interventions', content: 'Detailed walkthrough of advanced techniques.', videoUrl: 'https://www.youtube.com/embed/s_hWz2aAfas' },
          { title: 'Structural Heart Disease', content: 'Focus on TAVR and MitraClip procedures.', videoUrl: 'https://www.youtube.com/embed/s_hWz2aAfas' },
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
    categories: ['Cardiology'],
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
          { title: 'The Pediatric Assessment Triangle', content: 'A systematic approach to initial assessment.', videoUrl: 'https://www.youtube.com/embed/s_hWz2aAfas' },
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
    categories: ['Pediatrics'],
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
          { title: 'Aseptic Technique', content: 'The foundation of safe surgery.', videoUrl: 'https://www.youtube.com/embed/s_hWz2aAfas' },
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
    categories: ['Surgery'],
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
    categories: ['Pharmacology', 'Genomics'],
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
    categories: ['Ethics'],
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
    categories: ['Digital Health'],
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
    categories: ['Mental Health'],
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
    categories: ['Nutrition'],
  },
    {
    id: 'visualizing-blood-biology',
    title: 'Visualizing Blood Biology',
    description: 'An immersive visual guide to hematology.',
    longDescription: 'Explore the components of blood and their functions through high-quality animations and visualizations. This course covers everything from blood cell formation to complex hematological disorders.',
    imageId: 'blood-biology',
    modules: [
      {
        title: 'Module 1: The Cellular Components',
        lessons: [
          { title: 'Erythrocytes (Red Blood Cells)', content: 'Oxygen transport and related disorders.', videoUrl: 'https://www.youtube.com/embed/s_hWz2aAfas' },
          { title: 'Leukocytes (White Blood Cells)', content: 'The immune response in action.', videoUrl: 'https://www.youtube.com/embed/s_hWz2aAfas' },
        ],
      },
    ],
    categories: ['Biology', 'Hematology'],
  },
  {
    id: 'surgical-operations-simulation',
    title: 'Surgical Operations Simulation',
    description: 'Experience common surgical procedures through realistic simulations.',
    longDescription: 'This course provides a virtual operating room experience. Watch and learn from detailed 3D animations of common surgical procedures, from appendectomies to coronary artery bypass grafts.',
    imageId: 'surgery-simulation',
    modules: [
      {
        title: 'Module 1: Abdominal Surgeries',
        lessons: [
          { title: 'Laparoscopic Appendectomy', content: 'A minimally invasive approach.', videoUrl: 'https://www.youtube.com/embed/s_hWz2aAfas' },
          { title: 'Cholecystectomy (Gallbladder Removal)', content: 'Step-by-step procedure.', videoUrl: 'https://www.youtube.com/embed/s_hWz2aAfas' },
        ],
      },
    ],
    categories: ['Surgery'],
  },
  {
    id: 'neurochemical-pathways',
    title: 'Neurochemical Pathways',
    description: 'Visualize the complex world of brain chemistry.',
    longDescription: 'Journey through the brain\'s intricate signaling pathways. This course uses advanced visualizations to explain the roles of neurotransmitters like dopamine, serotonin, and acetylcholine in behavior and disease.',
    imageId: 'neuro-pathways',
    modules: [
      {
        title: 'Module 1: Key Neurotransmitters',
        lessons: [
          { title: 'The Dopamine System', content: 'Reward, motivation, and addiction.', videoUrl: 'https://www.youtube.com/embed/s_hWz2aAfas' },
          { title: 'The Serotonin System', content: 'Mood, sleep, and appetite.', videoUrl: 'https://www.youtube.com/embed/s_hWz2aAfas' },
        ],
      },
    ],
    categories: ['Neuroscience', 'Biology'],
  },
  {
    id: 'usmle-step-1-prep',
    title: 'USMLE Step 1 Prep Course',
    description: 'A comprehensive review for the USMLE Step 1 exam.',
    longDescription: 'Maximize your score with this intensive review course. Covering all the high-yield topics in basic sciences, this course includes video lectures, practice questions, and simulated exams.',
    imageId: 'usmle-prep',
    modules: [
        {
        title: 'Module 1: Biochemistry and Genetics',
        lessons: [
            { title: 'Metabolism Pathways', content: 'Key concepts and clinical correlations.' },
            { title: 'Molecular Biology', content: 'DNA replication, transcription, and translation.' },
        ],
        },
    ],
    categories: ['Exam Prep'],
  },
  {
    id: 'mcat-biology-biochem-prep',
    title: 'MCAT Biology & Biochem Prep',
    description: 'Master the Biology and Biochemistry sections of the MCAT.',
    longDescription: 'This course focuses on the foundational concepts in biology and biochemistry essential for the MCAT. Includes detailed video explanations and hundreds of practice problems.',
    imageId: 'mcat-prep',
    modules: [
        {
        title: 'Module 1: The Cell',
        lessons: [
            { title: 'Eukaryotic and Prokaryotic Cells', content: 'Structures and functions.' },
            { title: 'Enzymes and Metabolism', content: 'Kinetics and regulation.' },
        ],
        },
    ],
    categories: ['Exam Prep'],
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
    categories: ['Genomics'],
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
    categories: ['Data Science', 'AI in Healthcare'],
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
    categories: ['Global Health', 'Public Health'],
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
    categories: ['Research'],
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
    categories: ['Patient Safety', 'Management'],
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
    categories: ['Management', 'Leadership'],
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
    categories: ['Radiology'],
  },
  {
    id: 'ai-in-healthcare',
    title: 'AI in Healthcare',
    description: 'Discover how AI is revolutionizing diagnostics, treatment, and research.',
    longDescription: 'This course explores the transformative impact of artificial intelligence in healthcare. Learn about machine learning models for medical imaging, natural language processing for clinical notes, and the ethical considerations of using AI in medicine.',
    imageId: 'ai-healthcare',
    modules: [
      {
        title: 'Module 1: Machine Learning for Medical Imaging',
        lessons: [
          { title: 'Convolutional Neural Networks (CNNs)', content: 'Understanding the architecture for image analysis.' },
          { title: 'Case Study: AI in Radiology', content: 'Detecting diseases from scans.' },
        ],
      },
      {
        title: 'Module 2: AI and Clinical Data',
        lessons: [
          { title: 'Predictive Analytics for Patient Outcomes', content: 'Forecasting disease progression.' },
          { title: 'Ethical and Privacy Challenges', content: 'Navigating the complexities of AI in healthcare.' },
        ],
      },
    ],
    categories: ['AI in Healthcare', 'Data Science'],
  },
  {
    id: 'public-health-principles',
    title: 'Public Health Principles',
    description: 'Understand the core concepts of public health and epidemiology.',
    longDescription: 'This course provides a foundational understanding of public health principles, including epidemiology, biostatistics, and health policy. Explore how public health initiatives protect and improve the health of entire populations.',
    imageId: 'public-health',
    modules: [
      {
        title: 'Module 1: Introduction to Epidemiology',
        lessons: [
          { title: 'Measuring Disease Frequency', content: 'Incidence and prevalence.' },
          { title: 'Study Designs in Epidemiology', content: 'From cross-sectional to cohort studies.' },
        ],
      },
      {
        title: 'Module 2: Health Policy and Management',
        lessons: [
          { title: 'The Role of Government in Public Health', content: 'Policy and regulation.' },
          { title: 'Community Health Programs', content: 'Planning and evaluation.' },
        ],
      },
    ],
    categories: ['Public Health'],
  },
  {
    id: 'medical-billing-coding',
    title: 'Medical Billing and Coding',
    description: 'Master the coding systems used for medical billing and insurance claims.',
    longDescription: 'Learn the essential skills of medical billing and coding. This course covers ICD-10, CPT, and HCPCS coding systems, ensuring you can accurately document medical services and navigate the complexities of healthcare reimbursement.',
    imageId: 'medical-billing',
    modules: [
      {
        title: 'Module 1: ICD-10-CM Coding',
        lessons: [
          { title: 'Introduction to ICD-10', content: 'Structure and conventions.' },
          { title: 'Coding for Diseases and Conditions', content: 'Applying codes from clinical documentation.' },
        ],
      },
      {
        title: 'Module 2: CPT and HCPCS Coding',
        lessons: [
          { title: 'Procedural Coding with CPT', content: 'From office visits to surgical procedures.' },
          { title: 'Supplies and Services with HCPCS', content: 'DME, drugs, and other services.' },
        ],
      },
    ],
    categories: ['Medical Billing'],
  },
  {
    id: 'healthcare-leadership',
    title: 'Healthcare Leadership',
    description: 'Develop essential leadership skills to manage and inspire healthcare teams.',
    longDescription: 'This course is designed for aspiring and current healthcare leaders. Topics include strategic planning, financial management, quality improvement, and leading teams in a dynamic healthcare environment. Enhance your ability to drive positive change.',
    imageId: 'healthcare-leadership',
    modules: [
      {
        title: 'Module 1: Strategic Leadership',
        lessons: [
          { title: 'Vision and Mission', content: 'Setting the direction for your organization.' },
          { title: 'Change Management', content: 'Leading teams through transition.' },
        ],
      },
      {
        title: 'Module 2: Operational Excellence',
        lessons: [
          { title: 'Healthcare Finance for Leaders', content: 'Understanding the numbers.' },
          { title: 'Building and Leading High-Performing Teams', content: 'Fostering collaboration and motivation.' },
        ],
      },
    ],
    categories: ['Leadership'],
  },
  {
    id: 'sports-medicine-essentials',
    title: 'Sports Medicine Essentials',
    description: 'Learn to diagnose, treat, and prevent common sports-related injuries.',
    longDescription: 'This course provides a comprehensive overview of sports medicine, from sideline assessment to rehabilitation. Ideal for physicians, physical therapists, and athletic trainers, it covers the most common injuries and evidence-based treatment strategies.',
    imageId: 'sports-medicine',
    modules: [
      {
        title: 'Module 1: Injury Assessment and Diagnosis',
        lessons: [
          { title: 'On-Field Assessment', content: 'Quick and effective evaluation techniques.' },
          { title: 'Common Upper and Lower Extremity Injuries', content: 'Sprains, strains, and fractures.' },
        ],
      },
      {
        title: 'Module 2: Treatment and Rehabilitation',
        lessons: [
          { title: 'Principles of Rehabilitation', content: 'Restoring function and preventing re-injury.' },
          { title: 'Concussion Management', content: 'The latest protocols for return-to-play.' },
        ],
      },
    ],
    categories: ['Sports Medicine'],
  },
  {
    id: 'dermatology-for-primary-care',
    title: 'Dermatology for Primary Care',
    description: 'Confidently diagnose and manage common skin conditions in a primary care setting.',
    longDescription: 'This course is designed to equip primary care providers with the knowledge to recognize and treat a wide range of common dermatological conditions. Learn to differentiate benign lesions from malignancies and know when to refer.',
    imageId: 'dermatology-pc',
    modules: [
      {
        title: 'Module 1: Common Rashes and Lesions',
        lessons: [
          { title: 'Eczema, Psoriasis, and Acne', content: 'Diagnosis and first-line treatments.' },
          { title: 'Identifying Skin Cancers', content: 'Melanoma, Basal Cell, and Squamous Cell Carcinoma.' },
        ],
      },
      {
        title: 'Module 2: Procedures and Biopsies',
        lessons: [
          { title: 'Cryotherapy and Skin Tag Removal', content: 'Simple office procedures.' },
          { title: 'When and How to Perform a Skin Biopsy', content: 'Shave, punch, and excisional techniques.' },
        ],
      },
    ],
    categories: ['Dermatology'],
  },
  {
    id: 'geriatric-medicine-principles',
    title: 'Geriatric Medicine Principles',
    description: 'Master the complexities of providing medical care to older adults.',
    longDescription: 'This course focuses on the unique aspects of caring for the elderly, including managing multiple chronic conditions, polypharmacy, and common geriatric syndromes like falls and delirium. Learn to promote healthy aging and improve quality of life.',
    imageId: 'geriatric-medicine',
    modules: [
      {
        title: 'Module 1: The Aging Process',
        lessons: [
          { title: 'Physiological Changes of Aging', content: 'How systems change over time.' },
          { title: 'Comprehensive Geriatric Assessment', content: 'A multi-dimensional approach to care.' },
        ],
      },
      {
        title: 'Module 2: Common Geriatric Syndromes',
        lessons: [
          { title: 'Managing Polypharmacy', content: 'Deprescribing and medication review.' },
          { title: 'Cognitive Impairment and Dementia', content: 'Diagnosis, management, and support.' },
        ],
      },
    ],
    categories: ['Geriatrics'],
  },
  {
    id: 'infectious-disease-control',
    title: 'Infectious Disease Control',
    description: 'Learn the principles of infection prevention and antimicrobial stewardship.',
    longDescription: 'This course covers the essentials of infection control in healthcare settings. Topics include standard and transmission-based precautions, outbreak investigation, and the critical importance of antimicrobial stewardship to combat resistance.',
    imageId: 'infectious-disease',
    modules: [
      {
        title: 'Module 1: Infection Prevention',
        lessons: [
          { title: 'Hand Hygiene and Personal Protective Equipment', content: 'The cornerstones of infection control.' },
          { title: 'Environmental Disinfection', content: 'Creating a safe patient environment.' },
        ],
      },
      {
        title: 'Module 2: Antimicrobial Stewardship',
        lessons: [
          { title: 'The Threat of Antibiotic Resistance', content: 'A global health crisis.' },
          { title: 'Promoting Prudent Antibiotic Use', content: 'Strategies for healthcare providers.' },
        ],
      },
    ],
    categories: ['Infectious Disease'],
  },
  {
    id: 'palliative-care-essentials',
    title: 'Palliative Care Essentials',
    description: 'Improve quality of life for patients with serious illnesses through palliative care.',
    longDescription: 'Learn the principles of palliative care, focusing on symptom management, communication, and support for patients and families facing serious illness. This course is for all healthcare professionals who wish to improve the patient experience.',
    imageId: 'palliative-care',
    modules: [
      {
        title: 'Module 1: Principles of Palliative Care',
        lessons: [
          { title: 'What is Palliative Care?', content: 'Clarifying misconceptions.' },
          { title: 'Pain and Symptom Management', content: 'A holistic approach.' },
        ],
      },
      {
        title: 'Module 2: Communication and Support',
        lessons: [
          { title: 'Difficult Conversations', content: 'Discussing goals of care and prognosis.' },
          { title: 'Supporting Families and Caregivers', content: 'Providing resources and emotional support.' },
        ],
      },
    ],
    categories: ['Palliative Care'],
  },
  {
    id: 'wilderness-medicine',
    title: 'Wilderness Medicine',
    description: 'Learn to provide medical care in remote and resource-limited environments.',
    longDescription: 'This course prepares you to handle medical emergencies in the backcountry. From treating fractures with improvised splints to managing altitude sickness, you will gain the skills and confidence to provide care when help is far away.',
    imageId: 'wilderness-medicine',
    modules: [
      {
        title: 'Module 1: Environmental Emergencies',
        lessons: [
          { title: 'Hypothermia and Frostbite', content: 'Prevention and treatment.' },
          { title: 'Altitude Sickness', content: 'Acclimatization and management.' },
        ],
      },
      {
        title: 'Module 2: Trauma and Improvisation',
        lessons: [
          { title: 'Improvised Splinting', content: 'Stabilizing injuries with what you have.' },
          { title: 'Wound Management in the Field', content: 'Cleaning and closing wounds.' },
        ],
      },
    ],
    categories: ['Wilderness Medicine'],
  }
];
