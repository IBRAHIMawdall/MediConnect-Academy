

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

export type CourseCategory = 'Clinical Medicine' | 'Basic Sciences' | 'Healthcare Management' | 'Professional Development' | 'Medical Exams';
export type SubCategory =
  | 'Cardiology'
  | 'Pediatrics'
  | 'Surgery'
  | 'Radiology'
  | 'Dermatology'
  | 'Geriatrics'
  | 'Infectious Disease'
  | 'Palliative Care'
  | 'Sports Medicine'
  | 'Wilderness Medicine'
  | 'Biology'
  | 'Pharmacology'
  | 'Genomics'
  | 'Neuroscience'
  | 'Hematology'
  | 'Data Science'
  | 'Patient Safety'
  | 'Management'
  | 'Medical Billing'
  | 'Leadership'
  | 'Public Health'
  | 'Global Health'
  | 'Ethics'
  | 'Digital Health'
  | 'AI in Healthcare'
  | 'Soft Skills'
  | 'Business'
  | 'Research'
  | 'USMLE'
  | 'MCAT';

export const categories: Record<CourseCategory, SubCategory[]> = {
  'Clinical Medicine': [
    'Cardiology',
    'Pediatrics',
    'Surgery',
    'Radiology',
    'Dermatology',
    'Geriatrics',
    'Infectious Disease',
    'Palliative Care',
    'Sports Medicine',
    'Wilderness Medicine',
  ],
  'Basic Sciences': [
    'Biology',
    'Pharmacology',
    'Genomics',
    'Neuroscience',
    'Hematology',
  ],
  'Healthcare Management': [
    'Data Science',
    'Patient Safety',
    'Management',
    'Medical Billing',
    'Leadership',
    'Public Health',
    'Global Health',
  ],
  'Professional Development': [
    'Ethics',
    'Digital Health',
    'AI in Healthcare',
    'Soft Skills',
    'Business',
    'Research',
  ],
  'Medical Exams': [
    'USMLE',
    'MCAT'
  ],
};


export type Course = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  imageId: string;
  modules: Module[];
  category: CourseCategory;
  subCategory: SubCategory;
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
          { title: 'Complex Coronary Interventions', content: 'Complex coronary interventions refer to percutaneous coronary intervention (PCI) procedures that involve challenging anatomical features or high-risk patient characteristics. These procedures are performed on patients with extensive coronary artery disease (CAD) that may be difficult to treat with standard stenting techniques. Challenges can include multivessel disease, severe calcification, lesions in the left main coronary artery, bifurcated vessels (where an artery splits), or chronic total occlusions (CTOs), where an artery is completely blocked for an extended period. These interventions require advanced skills, specialized equipment (such as rotational atherectomy devices to drill through calcium), and a heart team approach to ensure optimal outcomes and patient safety.', videoUrl: 'https://www.youtube.com/embed/P921Y6onN3g' },
          { title: 'Structural Heart Disease', content: 'Structural heart disease involves abnormalities of the heart\'s valves, walls, or chambers. Historically, these conditions required open-heart surgery. However, minimally invasive transcatheter therapies have revolutionized treatment. Procedures like Transcatheter Aortic Valve Replacement (TAVR) for aortic stenosis and transcatheter edge-to-edge repair (TEER) with devices like the MitraClip for mitral regurgitation are now common. These techniques involve guiding catheters through blood vessels to repair or replace the damaged structure, offering faster recovery, lower risk for high-risk surgical patients, and a new paradigm for managing heart disease.', videoUrl: 'https://www.youtube.com/embed/P921Y6onN3g' },
        ],
      },
      {
        title: 'Module 2: Electrophysiology',
        lessons: [
          { title: 'Arrhythmia Management', content: 'Arrhythmia management focuses on diagnosing and treating irregular heart rhythms. This field involves a deep understanding of the heart\'s electrical system. Treatment strategies range from antiarrhythmic medications to more invasive procedures. Catheter ablation is a key technique where radiofrequency energy or cryotherapy is used to destroy the small area of heart tissue causing the arrhythmia. For conditions like atrial fibrillation, this can be curative. Management also includes stroke risk stratification and anticoagulation to prevent blood clots.' },
          { title: 'Device Implantation', content: 'Cardiac device implantation is a critical part of electrophysiology. Pacemakers are implanted to treat bradycardia (slow heart rates), while implantable cardioverter-defibrillators (ICDs) are used to prevent sudden cardiac death from life-threatening arrhythmias like ventricular tachycardia. Cardiac resynchronization therapy (CRT) uses a special type of pacemaker to coordinate the contraction of the left and right ventricles, improving heart function in patients with heart failure. Proper implantation, programming, and long-term follow-up are essential for patient safety and device efficacy.' },
        ],
      },
    ],
    category: 'Clinical Medicine',
    subCategory: 'Cardiology',
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
          { title: 'The Pediatric Assessment Triangle', content: 'Learn to use the Pediatric Assessment Triangle (PAT) for rapid, systematic initial assessment of a child\'s appearance, work of breathing, and circulation. This framework helps to quickly identify the type and severity of physiologic abnormality.', videoUrl: 'https://www.youtube.com/embed/P921Y6onN3g' },
          { title: 'Developmental Considerations', content: 'This lesson covers key age-specific differences in anatomy, physiology, and psychology that impact emergency care, from neonates to adolescents. Understand how to adapt your assessment and treatment for different developmental stages.' },
        ],
      },
      {
        title: 'Module 2: Common Pediatric Emergencies',
        lessons: [
          { title: 'Respiratory Distress', content: 'A deep dive into the most common pediatric respiratory emergencies, including diagnosis and management of croup, bronchiolitis, asthma exacerbations, and foreign body aspiration.' },
          { title: 'Febrile Seizures', content: 'Understand the difference between simple and complex febrile seizures, the diagnostic workup, and evidence-based management strategies. This lesson also covers parental education and reassurance.' },
        ],
      },
    ],
    category: 'Clinical Medicine',
    subCategory: 'Pediatrics',
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
          { title: 'Aseptic Technique', content: 'This lesson covers the core principles of maintaining a sterile field, including surgical scrubbing, gowning, and gloving. Understand the "why" behind the rules to ensure patient safety and prevent surgical site infections.', videoUrl: 'https://www.youtube.com/embed/P921Y6onN3g' },
          { title: 'Surgical Instruments', content: 'Learn to identify and properly handle basic surgical instruments. This lesson includes a visual guide to common clamps, forceps, scalpels, and retractors, explaining their specific functions and appropriate use.' },
        ],
      },
      {
        title: 'Module 2: Basic Surgical Skills',
        lessons: [
          { title: 'Suturing and Knot Tying', content: 'Master the foundational skills of wound closure. This lesson provides step-by-step video tutorials on various suturing techniques (e.g., simple interrupted, running sutures) and secure knot tying.' },
          { title: 'Basic Incision and Drainage', content: 'A practical guide to performing an incision and drainage (I&D) for an abscess, a common and important procedure in many specialties. Learn the steps, necessary equipment, and post-procedure care.' },
        ],
      },
    ],
    category: 'Clinical Medicine',
    subCategory: 'Surgery',
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
          { title: 'Introduction to Gene Editing', content: 'Explore the mechanisms and potential of gene editing technologies like CRISPR-Cas9. This lesson explains how these tools work and discusses their therapeutic applications for genetic diseases.' },
          { title: 'CAR-T Cell Therapy', content: 'Discover the revolutionary approach of Chimeric Antigen Receptor (CAR)-T cell therapy in oncology. Learn how patient T-cells are engineered to fight cancer and review the clinical successes and challenges.' },
        ],
      },
      {
        title: 'Module 2: Personalized Medicine',
        lessons: [
          { title: 'Pharmacogenomics', content: 'Understand how an individual\'s genetic makeup affects their response to drugs. This lesson covers key examples of pharmacogenomic testing in clinical practice to optimize drug selection and dosage.' },
          { title: 'Targeted Drug Therapies', content: 'Learn about the development of drugs that target specific molecules involved in cancer and other diseases. This approach maximizes efficacy while minimizing the side effects associated with traditional chemotherapy.' },
        ],
      },
    ],
    category: 'Basic Sciences',
    subCategory: 'Pharmacology',
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
          { title: 'The Four Principles', content: 'A deep dive into the four pillars of medical ethics: Autonomy, Beneficence, Non-maleficence, and Justice. This lesson uses case studies to illustrate how these principles apply in clinical scenarios.' },
          { title: 'Informed Consent', content: 'This lesson covers the legal and ethical requirements for obtaining informed consent. Learn about capacity assessment, the elements of disclosure, and how to navigate complex consent situations.' },
        ],
      },
      {
        title: 'Module 2: Contemporary Issues',
        lessons: [
          { title: 'End-of-Life Decision Making', content: 'Explore the sensitive topic of end-of-life care, including navigating advance directives, discussing goals of care, and the role of palliative and hospice care in ensuring patient dignity.' },
          { title: 'HIPAA and Patient Privacy', content: 'Understand the legal landscape of patient privacy under the Health Insurance Portability and Accountability Act (HIPAA). This lesson covers common pitfalls and best practices for protecting patient information in the digital age.' },
        ],
      },
    ],
    category: 'Professional Development',
    subCategory: 'Ethics',
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
          { title: 'Technology and Platforms', content: 'This lesson provides a guide to choosing the right HIPAA-compliant telehealth platforms and a checklist for the necessary hardware and software to ensure a smooth virtual visit experience for both patient and provider.' },
          { title: 'Regulatory and Billing Considerations', content: 'Navigate the complex web of telehealth regulations, including state licensing laws and reimbursement policies. Learn how to stay compliant and properly code for virtual visits to ensure you get paid.' },
        ],
      },
      {
        title: 'Module 2: The Virtual Consultation',
        lessons: [
          { title: 'Effective Communication', content: 'Master the art of "webside manner." This lesson focuses on techniques for building rapport, conveying empathy, and ensuring clear communication through a screen to maintain a strong patient-provider relationship.' },
          { title: 'Remote Physical Examination', content: 'Learn and practice guided techniques for performing a remote physical exam. This lesson covers what can and cannot be assessed virtually and how to instruct patients to assist in their own examination.' },
        ],
      },
    ],
    category: 'Professional Development',
    subCategory: 'Digital Health',
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
          { title: 'Common Mental Health Challenges', content: 'This lesson provides an overview of the signs and symptoms of common mental health issues, including depression, anxiety disorders, psychosis, and substance use disorders.' },
          { title: 'The ALGEE Action Plan', content: 'Learn the ALGEE action plan: Assess for risk of suicide or harm, Listen nonjudgmentally, Give reassurance and information, Encourage appropriate professional help, and Encourage self-help and other support strategies.' },
        ],
      },
      {
        title: 'Module 2: Crisis Intervention',
        lessons: [
          { title: 'Responding to Panic Attacks', content: 'Learn practical techniques for de-escalating a panic attack, helping the individual regain control of their breathing, and providing a calming presence.' },
          { title: 'Suicide Prevention', content: 'This critical lesson covers how to recognize the warning signs of suicide and how to apply the ALGEE action steps to connect someone to professional help and potentially save a life.' },
        ],
      },
    ],
    category: 'Professional Development',
    subCategory: 'Soft Skills',
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
          { title: 'Carbohydrates, Proteins, and Fats', content: 'A detailed look at the three macronutrients, their chemical structures, metabolic functions, and dietary sources. Learn how to calculate energy needs and balance macronutrient intake for optimal health.' },
          { title: 'Dietary Fiber', content: 'This lesson explores the different types of dietary fiber (soluble and insoluble), their roles in digestive health, and their impact on cholesterol levels and blood sugar control. Includes recommendations for daily intake.' },
        ],
      },
      {
        title: 'Module 2: Micronutrients and Disease Prevention',
        lessons: [
          { title: 'Vitamins and Minerals', content: 'An overview of essential vitamins and minerals, their functions in the body, and the signs of deficiency and toxicity. Learn which food sources are rich in these crucial micronutrients.' },
          { title: 'Nutrition and Chronic Disease', content: 'Explore the evidence-based link between dietary patterns and the prevention of chronic diseases like heart disease, type 2 diabetes, and certain cancers. Learn about anti-inflammatory diets and key nutrients.' },
        ],
      },
    ],
    category: 'Basic Sciences',
    subCategory: 'Biology',
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
          { title: 'Erythrocytes (Red Blood Cells)', content: 'This lesson visualizes the lifecycle of a red blood cell, from its creation in the bone marrow to its role in oxygen transport. It also covers common disorders like anemia and polycythemia.', videoUrl: 'https://www.youtube.com/embed/P921Y6onN3g' },
          { title: 'Leukocytes (White Blood Cells)', content: 'Watch the immune system in action. This lesson provides an animated overview of the different types of white blood cells (neutrophils, lymphocytes, etc.) and their specific roles in fighting infection.', videoUrl: 'https://www.youtube.com/embed/P921Y6onN3g' },
        ],
      },
    ],
    category: 'Basic Sciences',
    subCategory: 'Hematology',
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
          { title: 'Laparoscopic Appendectomy', content: 'A step-by-step 3D simulation of a minimally invasive appendectomy. This lesson covers patient positioning, port placement, identification of anatomy, and the technique for transecting the appendix.', videoUrl: 'https://www.youtube.com/embed/P921Y6onN3g' },
          { title: 'Cholecystectomy (Gallbladder Removal)', content: 'This lesson provides a detailed animation of a laparoscopic cholecystectomy, including dissection of the critical view of safety, clipping of the cystic duct and artery, and removal of the gallbladder.', videoUrl: 'https://www.youtube.com/embed/P921Y6onN3g' },
        ],
      },
    ],
    category: 'Clinical Medicine',
    subCategory: 'Surgery',
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
          { title: 'The Dopamine System', content: 'This animated lesson traces the major dopaminergic pathways in the brain. Explore dopamine\'s role in reward, motivation, motor control, and its dysfunction in conditions like Parkinson\'s disease and addiction.', videoUrl: 'https://www.youtube.com/embed/P921Y6onN3g' },
          { title: 'The Serotonin System', content: 'Visualize the synthesis, release, and reuptake of serotonin. This lesson explains its wide-ranging effects on mood, sleep, appetite, and cognition, and illustrates the mechanism of action for SSRI antidepressants.', videoUrl: 'https://www.youtube.com/embed/P921Y6onN3g' },
        ],
      },
    ],
    category: 'Basic Sciences',
    subCategory: 'Neuroscience',
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
            { title: 'Metabolism Pathways', content: 'A high-yield review of glycolysis, Krebs cycle, electron transport chain, and gluconeogenesis. This lesson focuses on key regulatory enzymes and clinical correlations, such as inborn errors of metabolism.' },
            { title: 'Molecular Biology', content: 'This lesson covers the core concepts of DNA replication, transcription, and translation, emphasizing the mechanisms and enzymes that are frequently tested on the USMLE Step 1 exam.' },
        ],
        },
    ],
    category: 'Medical Exams',
    subCategory: 'USMLE',
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
            { title: 'Eukaryotic and Prokaryotic Cells', content: 'A comparative review of cell structures and their functions, focusing on organelles, the cytoskeleton, and differences that are key for the MCAT.' },
            { title: 'Enzymes and Metabolism', content: 'Master enzyme kinetics, including Michaelis-Menten and Lineweaver-Burk plots. This lesson also covers metabolic regulation, including feedback inhibition and allosteric regulation, crucial for MCAT success.' },
        ],
        },
    ],
    category: 'Medical Exams',
    subCategory: 'MCAT',
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
          { title: 'DNA, Genes, and Chromosomes', content: 'This lesson reviews the fundamental building blocks of life, from the structure of DNA to the organization of genes within chromosomes. It sets the stage for understanding how genetic information is stored and expressed.' },
          { title: 'Genetic Variation', content: 'Explore the different types of genetic variation, including single nucleotide polymorphisms (SNPs) and copy number variations (CNVs), and learn how they contribute to human diversity and disease susceptibility.' },
        ],
      },
      {
        title: 'Module 2: Clinical Applications',
        lessons: [
          { title: 'Genetic Testing and Counseling', content: 'Learn about the different types of genetic tests available and their clinical utility. This lesson also covers the essential role of genetic counseling in interpreting and communicating complex genetic information to patients.' },
          { title: 'The Future of Genomic Medicine', content: 'A look ahead at the exciting future of genomic medicine, including the promise of personalized medicine, gene therapy, and the challenges of integrating large-scale genomic data into routine clinical care.' },
        ],
      },
    ],
    category: 'Basic Sciences',
    subCategory: 'Genomics',
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
          { title: 'Sources of Healthcare Data', content: 'An overview of the diverse sources of healthcare data, including electronic health records (EHRs), administrative claims data, patient-generated data from wearables, and clinical trial data.' },
          { title: 'Data Wrangling and Cleaning', content: 'Learn the essential, real-world skills of preparing messy healthcare data for analysis. This lesson covers techniques for handling missing values, standardizing formats, and transforming data into a usable state.' },
        ],
      },
      {
        title: 'Module 2: Machine Learning in Healthcare',
        lessons: [
          { title: 'Predictive Modeling', content: 'This lesson introduces common machine learning models used to forecast disease risk, predict patient outcomes, and identify candidates for clinical trials. Includes hands-on examples using Python.' },
          { title: 'Natural Language Processing', content: 'Discover how Natural Language Processing (NLP) is used to extract valuable insights from unstructured clinical notes, such as identifying patient symptoms, diagnoses, and adverse drug events from free text.' },
        ],
      },
    ],
    category: 'Healthcare Management',
    subCategory: 'Data Science',
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
          { title: 'Pandemic Preparedness', content: 'Drawing lessons from the COVID-19 pandemic, this module examines the principles of pandemic preparedness and response, including surveillance, contact tracing, and vaccine distribution strategies.' },
          { title: 'The Big Three', content: 'A deep dive into the ongoing global efforts to combat three of the most significant infectious diseases: HIV/AIDS, tuberculosis, and malaria. Learn about prevention, treatment, and control strategies.' },
        ],
      },
      {
        title: 'Module 2: Health Systems and Policy',
        lessons: [
          { title: 'Universal Health Coverage', content: 'Explore the global movement towards Universal Health Coverage (UHC), its different models, and the challenges of providing equitable access to quality healthcare for all.' },
          { title: 'The Role of Non-Governmental Organizations', content: 'Learn about the crucial role that Non-Governmental Organizations (NGOs) play in delivering healthcare services, advocating for policy change, and responding to humanitarian crises in global health.' },
        ],
      },
    ],
    category: 'Healthcare Management',
    subCategory: 'Global Health',
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
          { title: 'Randomized Controlled Trials', content: 'Understand the "gold standard" of clinical research. This lesson covers the principles of randomization, blinding, and control groups to minimize bias and produce reliable evidence.' },
          { title: 'Observational Studies', content: 'Learn about different types of observational study designs, including cohort, case-control, and cross-sectional studies. Understand their strengths, weaknesses, and appropriate applications.' },
        ],
      },
      {
        title: 'Module 2: Protocol Development',
        lessons: [
          { title: 'Developing a Research Question', content: 'Master the process of formulating a clear, focused, and answerable research question using frameworks like PICO (Population, Intervention, Comparison, Outcome). This is the essential first step of any research project.' },
          { title: 'Writing a Research Protocol', content: 'Learn to create a comprehensive roadmap for your study. This lesson details all the essential components of a research protocol, from background and objectives to methodology, statistical analysis plan, and ethical considerations.' },
        ],
      },
    ],
    category: 'Professional Development',
    subCategory: 'Research',
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
          { title: 'The Swiss Cheese Model', content: 'This lesson introduces James Reason\'s Swiss Cheese Model to help you understand how errors occur in complex systems. Learn how latent failures and active failures align to cause adverse events.' },
          { title: 'Human Factors Engineering', content: 'Explore how to design safer healthcare systems by considering human capabilities and limitations. This lesson covers topics like usability, standardization, and forcing functions to reduce the likelihood of error.' },
        ],
      },
      {
        title: 'Module 2: Quality Improvement Tools',
        lessons: [
          { title: 'Plan-Do-Study-Act (PDSA) Cycles', content: 'Learn this simple yet powerful iterative four-stage model for testing changes in a real-world setting. This is a fundamental tool for quality improvement in healthcare.' },
          { title: 'Root Cause Analysis', content: 'Master the process of conducting a Root Cause Analysis (RCA). This lesson teaches you how to investigate adverse events to identify underlying system-level vulnerabilities, not just individual mistakes, to prevent recurrence.' },
        ],
      },
    ],
    category: 'Healthcare Management',
    subCategory: 'Patient Safety',
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
          { title: 'Budgeting and Financial Planning', content: 'This lesson covers the basics of healthcare finance, including how to develop and manage a departmental budget, understand financial statements, and make data-driven financial decisions.' },
          { title: 'Revenue Cycle Management', content: 'Get an overview of the entire healthcare revenue cycle, from patient registration and insurance verification to claims submission and denial management. Learn key strategies to optimize reimbursement.' },
        ],
      },
      {
        title: 'Module 2: Healthcare Operations',
        lessons: [
          { title: 'Process Improvement', content: 'Learn how to apply methodologies like Lean and Six Sigma to improve efficiency, reduce waste, and enhance patient flow in a healthcare setting. Includes case studies from real-world hospital improvements.' },
          { title: 'Supply Chain Management', content: 'Understand the principles of effective supply chain management in healthcare. This lesson covers inventory control, procurement, and strategies to ensure the right supplies and equipment are available at the right time, without excess cost.' },
        ],
      },
    ],
    category: 'Healthcare Management',
    subCategory: 'Management',
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
          { title: 'The Physics of X-rays', content: 'This lesson explains how X-rays are produced and how they interact with matter to create an image. Understand the concepts of attenuation, density, and how they relate to the images you see.' },
          { title: 'Interpreting Chest X-rays', content: 'Learn a systematic ABCDE approach (Airway, Breathing, Cardiac, Diaphragm, Everything else) to interpreting chest X-rays. This lesson covers normal anatomy and common pathologies like pneumonia and pneumothorax.' },
        ],
      },
      {
        title: 'Module 2: MRI and Ultrasound',
        lessons: [
          { title: 'The Principles of MRI', content: 'A simplified explanation of the complex physics behind Magnetic Resonance Imaging. Learn about T1 and T2 weighting, and understand why MRI provides superior soft tissue contrast compared to other modalities.' },
          { title: 'Introduction to Ultrasound', content: 'Discover the power of sound waves in medicine. This lesson covers the basic principles of ultrasound, including how images are generated, common terminology (e.g., hyperechoic), and its applications in various specialties.' },
        ],
      },
    ],
    category: 'Clinical Medicine',
    subCategory: 'Radiology',
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
          { title: 'Convolutional Neural Networks (CNNs)', content: 'Dive into the core of AI image analysis. This lesson demystifies CNNs, explaining their layered architecture—from convolutional layers that detect simple features like edges, to deeper layers that recognize complex patterns like tissue anomalies. You will learn how these networks are trained on vast datasets of medical images to achieve, and sometimes exceed, human-level accuracy in tasks like identifying cancerous nodules in a lung CT scan. We will cover key concepts like feature maps, pooling, and activation functions in a clear, accessible manner.' },
          { title: 'Case Study: AI in Radiology', content: 'This lesson moves from theory to practice, exploring a real-world application of AI in a radiology workflow. We will analyze a case where an AI model is used to assist radiologists in detecting early signs of diabetic retinopathy from retinal fundus images. You will learn how the AI tool integrates into the clinical setting, its impact on diagnostic speed and accuracy, and the critical importance of human oversight. We will also discuss the regulatory hurdles (like FDA approval) and the validation process required to deploy such tools safely.' },
        ],
      },
      {
        title: 'Module 2: AI and Clinical Data',
        lessons: [
          { title: 'Predictive Analytics for Patient Outcomes', content: 'Learn how machine learning models can analyze electronic health record (EHR) data to forecast disease progression, predict patient readmission risk, and identify individuals who may benefit from early intervention.' },
          { title: 'Ethical and Privacy Challenges', content: 'A critical discussion on the ethical and privacy complexities of using AI in healthcare. This lesson covers topics like algorithmic bias, data privacy, and the need for transparency and accountability in AI models.' },
        ],
      },
    ],
    category: 'Professional Development',
    subCategory: 'AI in Healthcare',
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
          { title: 'Measuring Disease Frequency', content: 'Learn the fundamental measures used in epidemiology to describe the frequency of disease in a population, including incidence, prevalence, and mortality rates.' },
          { title: 'Study Designs in Epidemiology', content: 'An overview of the major study designs used in epidemiological research, from simple cross-sectional studies to more complex cohort and case-control studies. Understand the strengths and weaknesses of each.' },
        ],
      },
      {
        title: 'Module 2: Health Policy and Management',
        lessons: [
          { title: 'The Role of Government in Public Health', content: 'Explore the essential functions of public health at the local, state, and federal levels, including disease surveillance, health promotion, and policy development and regulation.' },
          { title: 'Community Health Programs', content: 'Learn the principles of planning, implementing, and evaluating community health programs. This lesson covers needs assessment, setting objectives, and measuring program effectiveness.' },
        ],
      },
    ],
    category: 'Healthcare Management',
    subCategory: 'Public Health',
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
          { title: 'Introduction to ICD-10', content: 'This lesson provides an overview of the structure and conventions of the ICD-10-CM (International Classification of Diseases, 10th Revision, Clinical Modification) coding system used for diagnosis coding.' },
          { title: 'Coding for Diseases and Conditions', content: 'Learn how to apply ICD-10-CM codes by translating clinical documentation into standardized codes. Includes practice exercises for common diseases and conditions.' },
        ],
      },
      {
        title: 'Module 2: CPT and HCPCS Coding',
        lessons: [
          { title: 'Procedural Coding with CPT', content: 'Master the Current Procedural Terminology (CPT) coding system used to report medical, surgical, and diagnostic procedures and services. This lesson covers coding for office visits, surgical procedures, and more.' },
          { title: 'Supplies and Services with HCPCS', content: 'Learn about the Healthcare Common Procedure Coding System (HCPCS), which is used to report services, procedures, and supplies not covered by CPT codes, such as durable medical equipment (DME), drugs, and ambulance services.' },
        ],
      },
    ],
    category: 'Healthcare Management',
    subCategory: 'Medical Billing',
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
          { title: 'Vision and Mission', content: 'Learn how to develop a compelling vision and mission for your organization or department. This lesson covers how to align your team around a shared purpose and set a clear strategic direction.' },
          { title: 'Change Management', content: 'Healthcare is constantly changing. This lesson provides practical models and strategies for leading teams effectively through organizational transition, overcoming resistance, and fostering resilience.' },
        ],
      },
      {
        title: 'Module 2: Operational Excellence',
        lessons: [
          { title: 'Healthcare Finance for Leaders', content: 'This lesson provides a non-financial manager\'s guide to healthcare finance. Understand key financial statements, budgeting principles, and how to make fiscally responsible decisions.' },
          { title: 'Building and Leading High-Performing Teams', content: 'Discover the key elements of building and leading high-performing teams in healthcare. This lesson covers topics like fostering psychological safety, effective communication, and performance management.' },
        ],
      },
    ],
    category: 'Healthcare Management',
    subCategory: 'Leadership',
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
          { title: 'On-Field Assessment', content: 'Learn quick and effective evaluation techniques for assessing an injured athlete on the field. This lesson covers the primary and secondary survey to rule out life-threatening conditions and assess for common injuries.' },
          { title: 'Common Upper and Lower Extremity Injuries', content: 'This lesson provides a review of the diagnosis and initial management of common sports injuries, such as ankle sprains, ACL tears, shoulder dislocations, and rotator cuff strains.' },
        ],
      },
      {
        title: 'Module 2: Treatment and Rehabilitation',
        lessons: [
          { title: 'Principles of Rehabilitation', content: 'Understand the phased approach to rehabilitation after a sports injury. This lesson covers the principles of restoring range of motion, strength, and proprioception to ensure a safe return to play.' },
          { title: 'Concussion Management', content: 'A review of the latest protocols for concussion management, including sideline assessment tools like SCAT5, and the graduated return-to-play and return-to-learn guidelines.' },
        ],
      },
    ],
    category: 'Clinical Medicine',
    subCategory: 'Sports Medicine',
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
          { title: 'Eczema, Psoriasis, and Acne', content: 'This lesson covers the diagnosis and first-line management of three of the most common conditions seen in dermatology: atopic dermatitis (eczema), psoriasis, and acne vulgaris. Includes treatment algorithms and patient education tips.' },
          { title: 'Identifying Skin Cancers', content: 'Learn the ABCDEs of melanoma and how to recognize the clinical features of basal cell carcinoma and squamous cell carcinoma. This crucial lesson helps you know when to be suspicious and when to refer for biopsy.' },
        ],
      },
      {
        title: 'Module 2: Procedures and Biopsies',
        lessons: [
          { title: 'Cryotherapy and Skin Tag Removal', content: 'A practical guide to simple office procedures, including the use of liquid nitrogen for cryotherapy of warts and actinic keratoses, and simple techniques for skin tag removal.' },
          { title: 'When and How to Perform a Skin Biopsy', content: 'This lesson provides guidance on when a skin biopsy is indicated and demonstrates the techniques for shave, punch, and excisional biopsies. Understand which technique is appropriate for different types of lesions.' },
        ],
      },
    ],
    category: 'Clinical Medicine',
    subCategory: 'Dermatology',
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
          { title: 'Physiological Changes of Aging', content: 'This lesson provides an overview of the normal physiological changes that occur with aging across various organ systems. Understanding these changes is key to distinguishing them from signs of disease.' },
          { title: 'Comprehensive Geriatric Assessment', content: 'Learn how to perform a multi-dimensional Comprehensive Geriatric Assessment (CGA), which evaluates not just medical conditions, but also functional status, cognitive health, and psychosocial well-being.' },
        ],
      },
      {
        title: 'Module 2: Common Geriatric Syndromes',
        lessons: [
          { title: 'Managing Polypharmacy', content: 'A critical lesson on the risks of polypharmacy in older adults. Learn strategies for medication review, identifying potentially inappropriate medications using the Beers Criteria, and the principles of deprescribing.' },
          { title: 'Cognitive Impairment and Dementia', content: 'This lesson covers the approach to diagnosing cognitive impairment and dementia, including the use of screening tools like the Mini-Cog. It also discusses management strategies and providing support for patients and their caregivers.' },
        ],
      },
    ],
    category: 'Clinical Medicine',
    subCategory: 'Geriatrics',
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
          { title: 'Hand Hygiene and Personal Protective Equipment', content: 'This lesson reinforces the cornerstones of infection control, reviewing the WHO\'s "5 Moments for Hand Hygiene" and the proper use, donning, and doffing of Personal Protective Equipment (PPE).' },
          { title: 'Environmental Disinfection', content: 'Learn about the importance of cleaning and disinfecting the patient environment to reduce the transmission of healthcare-associated infections (HAIs). This includes routine cleaning and terminal cleaning protocols.' },
        ],
      },
      {
        title: 'Module 2: Antimicrobial Stewardship',
        lessons: [
          { title: 'The Threat of Antibiotic Resistance', content: 'This lesson provides an overview of the global health crisis of antibiotic resistance, explaining the mechanisms of resistance and the impact on patient outcomes and healthcare costs.' },
          { title: 'Promoting Prudent Antibiotic Use', content: 'Learn practical strategies for antimicrobial stewardship, including "antibiotic time-outs," formulary restriction, and prospective audit and feedback, to promote the appropriate use of antibiotics in your practice.' },
        ],
      },
    ],
    category: 'Clinical Medicine',
    subCategory: 'Infectious Disease',
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
          { title: 'What is Palliative Care?', content: 'This lesson clarifies common misconceptions, explaining that palliative care is appropriate at any age and at any stage of a serious illness, and it can be provided along with curative treatment.' },
          { title: 'Pain and Symptom Management', content: 'Learn a holistic approach to managing common symptoms in serious illness, including pain, dyspnea, nausea, and anxiety. This lesson covers both pharmacological and non-pharmacological interventions to improve patient comfort.' },
        ],
      },
      {
        title: 'Module 2: Communication and Support',
        lessons: [
          { title: 'Difficult Conversations', content: 'This lesson provides frameworks and practical tips for having difficult conversations about prognosis, goals of care, and advance care planning. Learn how to navigate these sensitive discussions with empathy and clarity.' },
          { title: 'Supporting Families and Caregivers', content: 'Palliative care extends beyond the patient. Learn to assess and address the needs of families and caregivers, providing them with emotional support and connecting them with necessary resources.' },
        ],
      },
    ],
    category: 'Clinical Medicine',
    subCategory: 'Palliative Care',
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
          { title: 'Hypothermia and Frostbite', content: 'Learn to recognize and treat cold-related emergencies. This lesson covers the stages of hypothermia, rewarming techniques, and the field management of frostbite.' },
          { title: 'Altitude Sickness', content: 'This lesson provides a guide to preventing and treating altitude-related illnesses, including Acute Mountain Sickness (AMS), High-Altitude Cerebral Edema (HACE), and High-Altitude Pulmonary Edema (HAPE).' },
        ],
      },
      {
        title: 'Module 2: Trauma and Improvisation',
        lessons: [
          { title: 'Improvised Splinting', content: 'Master the art of stabilizing fractures and dislocations using materials available in the wilderness, such as trekking poles, sleeping pads, and branches.' },
          { title: 'Wound Management in the Field', content: 'Learn best practices for cleaning, irrigating, and closing wounds in a resource-limited setting to prevent infection and promote healing.' },
        ],
      },
    ],
    category: 'Clinical Medicine',
    subCategory: 'Wilderness Medicine',
  },
  {
    id: 'intro-to-hematology',
    title: 'Introduction to Hematology',
    description: 'Understand the essentials of blood disorders and their treatment.',
    longDescription: 'This course provides a foundational understanding of hematology, covering common disorders of red cells, white cells, and platelets. It is ideal for students and professionals new to the field.',
    imageId: 'intro-hematology',
    modules: [
      {
        title: 'Module 1: Red Blood Cell Disorders',
        lessons: [
          { title: 'Anemia: A Comprehensive Overview', content: 'This lesson covers the approach to diagnosing anemia, including classifying it by MCV (microcytic, normocytic, macrocytic) and discussing the workup for common causes like iron deficiency and vitamin B12 deficiency.' },
          { title: 'Sickle Cell Disease', content: 'An overview of the pathophysiology, clinical manifestations, and modern management of sickle cell disease, including hydroxyurea, new targeted therapies, and the management of acute pain crises.' },
        ],
      },
    ],
    category: 'Basic Sciences',
    subCategory: 'Hematology',
  },
  {
    id: 'effective-communication-healthcare',
    title: 'Effective Communication in Healthcare',
    description: 'Master the art of patient-centered communication.',
    longDescription: 'This course focuses on the soft skills crucial for healthcare professionals. Learn techniques for empathetic listening, breaking bad news, and collaborative decision-making to improve patient relationships and outcomes.',
    imageId: 'comm-healthcare',
    modules: [
      {
        title: 'Module 1: Patient-Centered Communication',
        lessons: [
          { title: 'Active Listening Techniques', content: 'This lesson goes beyond just hearing words. Learn techniques for active listening, such as reflecting and summarizing, to build rapport, ensure understanding, and make patients feel heard.' },
          { title: 'Shared Decision-Making', content: 'Move from a paternalistic model to a collaborative one. This lesson teaches you how to engage patients in shared decision-making, presenting options and helping them make choices that align with their values and preferences.' },
        ],
      },
    ],
    category: 'Professional Development',
    subCategory: 'Soft Skills',
  },
  {
    id: 'healthcare-finance-101',
    title: 'Healthcare Finance 101',
    description: 'An introduction to the business side of medicine.',
    longDescription: 'Understand the fundamentals of healthcare finance, including budgeting, revenue cycles, and financial analysis. This course is designed for clinicians and administrators who want to make better financial decisions for their practice or department.',
    imageId: 'finance-101',
    modules: [
      {
        title: 'Module 1: The Healthcare Revenue Cycle',
        lessons: [
          { title: 'From Patient Visit to Payment', content: 'This lesson provides a comprehensive overview of the healthcare revenue cycle, breaking down each step from patient registration and scheduling to final payment and collections.' },
          { title: 'Common Billing and Coding Errors', content: 'Learn to identify and avoid common billing and coding errors that lead to claim denials and lost revenue. This lesson covers issues like upcoding, downcoding, and lack of medical necessity.' },
        ],
      },
    ],
    category: 'Professional Development',
    subCategory: 'Business',
  },
];

    

    

    

