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
];
