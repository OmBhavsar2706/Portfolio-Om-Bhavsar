import { jsPDF } from 'jspdf';

export function generateResumePDF() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 40;
  let cursorY = 40;

  // Helper to check for new page and handle overflow safely
  const checkPageOverflow = (heightNeeded: number) => {
    if (cursorY + heightNeeded > pageHeight - 45) {
      doc.addPage();
      cursorY = 40;
      return true;
    }
    return false;
  };

  // Helper to draw clean sections
  const drawSectionHeader = (title: string) => {
    checkPageOverflow(35);
    cursorY += 10;
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42); // slate-900 / dark graphite
    doc.text(title.toUpperCase(), marginX, cursorY);
    
    cursorY += 4;
    doc.setDrawColor(203, 213, 225); // slate-300 / subtle border
    doc.setLineWidth(0.75);
    doc.line(marginX, cursorY, pageWidth - marginX, cursorY);
    cursorY += 16;
  };

  // Helper for rendering wrapped body text
  const drawBodyText = (text: string, fontSize = 9, isBlockText = false) => {
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(fontSize);
    doc.setTextColor(71, 85, 105); // slate-600

    const maxWidth = pageWidth - (marginX * 2);
    const lines = doc.splitTextToSize(text, maxWidth);
    const heightNeeded = lines.length * (fontSize + 4);
    
    checkPageOverflow(heightNeeded);
    
    // Render lines with line-height
    lines.forEach((line: string) => {
      doc.text(line, marginX, cursorY);
      cursorY += fontSize + 4;
    });

    if (isBlockText) {
      cursorY += 6;
    }
  };

  // Helper for bullet points
  const drawBulletPoint = (text: string, fontSize = 9) => {
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(fontSize);
    doc.setTextColor(51, 65, 85); // slate-700
    
    const bulletChar = '\u2022';
    const indentWidth = 15;
    const maxWidth = pageWidth - (marginX * 2) - indentWidth;
    const lines = doc.splitTextToSize(text, maxWidth);
    const heightNeeded = lines.length * (fontSize + 4);
    
    checkPageOverflow(heightNeeded);

    // Draw bullet
    doc.text(bulletChar, marginX + 3, cursorY);

    // Draw lines
    lines.forEach((line: string, index: number) => {
      doc.text(line, marginX + indentWidth, cursorY);
      cursorY += fontSize + 4;
    });
    cursorY += 2;
  };

  // Helper for dual column text (e.g. company/role & dates/loc)
  const drawDualColumnText = (leftText: string, rightText: string, isHeader = true) => {
    const fontSize = isHeader ? 10 : 9;
    doc.setFont('Helvetica', isHeader ? 'bold' : 'normal');
    doc.setFontSize(fontSize);
    doc.setTextColor(isHeader ? 15 : 71, isHeader ? 23 : 85, isHeader ? 42 : 105);

    const leftLines = doc.splitTextToSize(leftText, (pageWidth - marginX * 2) * 0.7);
    const rightLines = doc.splitTextToSize(rightText, (pageWidth - marginX * 2) * 0.3);
    const maxLines = Math.max(leftLines.length, rightLines.length);
    const heightNeeded = maxLines * (fontSize + 4);

    checkPageOverflow(heightNeeded);

    const rAlignX = pageWidth - marginX;

    for (let i = 0; i < maxLines; i++) {
      if (leftLines[i]) {
        doc.text(leftLines[i], marginX, cursorY + i * (fontSize + 4));
      }
      if (rightLines[i]) {
        doc.text(rightLines[i], rAlignX, cursorY + i * (fontSize + 4), { align: 'right' });
      }
    }

    cursorY += heightNeeded + 2;
  };

  // Render Header (Centered)
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text('Om Bhavsar', pageWidth / 2, cursorY, { align: 'center' });
  cursorY += 18;

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105); // slate-600
  doc.text('AI & ML Engineer | Full-Stack Developer | Generative AI', pageWidth / 2, cursorY, { align: 'center' });
  cursorY += 14;

  doc.text('Nashik, Maharashtra, India  •  +91 8208461469  •  ombhavsar552@gmail.com', pageWidth / 2, cursorY, { align: 'center' });
  cursorY += 14;

  doc.text('linkedin.com/in/ombhavsar2706  •  github.com/Ombhavsar2706', pageWidth / 2, cursorY, { align: 'center' });
  cursorY += 24;

  // Render Professional Summary
  drawSectionHeader('Professional Summary');
  drawBodyText(
    'AI & ML Engineer with hands-on experience in Generative AI, machine learning systems, and full-stack web development. Proficient in Python, Java, JavaScript, C, and C++ with a solid foundation in Data Structures & Algorithms. Experienced in building scalable, AI-powered web applications — from data pipelines and model training to production deployment and client delivery. Currently pursuing a Diploma in AI & ML while working as an AI/ML Intern and Freelance Full-Stack Engineer. Passionate about developing intelligent systems that solve real-world problems efficiently and at scale.',
    9.5,
    true
  );
  cursorY += 8;

  // Render Technical Skills
  drawSectionHeader('Technical Skills');
  
  const skillsList = [
    { label: 'Programming Languages', value: 'Python, Java, JavaScript (ES6+), C, C++, SQL, PL/SQL' },
    { label: 'AI & Machine Learning', value: 'Generative AI, Prompt Engineering, Machine Learning Algorithms, Predictive Modeling, Data Preprocessing, Model Training & Evaluation, AI Development Lifecycle' },
    { label: 'Web Development', value: 'HTML5, CSS3, React.js, Node.js, RESTful API Integration, Authentication Systems, Payment Gateway Integration, Responsive Design' },
    { label: 'Databases', value: 'SQL, PL/SQL, Relational Database Design & Management' },
    { label: 'Tools & Platforms', value: 'Git, GitHub, VS Code, Cloud Deployment, Version Control, AI-Assisted Development Workflows' },
    { label: 'Core Concepts', value: 'Data Structures & Algorithms (DSA), Object-Oriented Programming (OOP), Scalable System Design, UI/UX Design Principles' }
  ];

  skillsList.forEach(skill => {
    checkPageOverflow(14);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59); // slate-800
    doc.text(`${skill.label}: `, marginX, cursorY);
    
    const labelWidth = doc.getTextWidth(`${skill.label}: `);
    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(71, 85, 105); // slate-600
    
    const valueMaxWidth = pageWidth - (marginX * 2) - labelWidth;
    const valueLines = doc.splitTextToSize(skill.value, valueMaxWidth);
    
    valueLines.forEach((vLine: string, index: number) => {
      if (index === 0) {
        doc.text(vLine, marginX + labelWidth, cursorY);
      } else {
        cursorY += 12;
        checkPageOverflow(12);
        doc.text(vLine, marginX + 15, cursorY);
      }
    });
    cursorY += 14;
  });
  cursorY += 4;

  // Render Professional Experience
  drawSectionHeader('Professional Experience');

  // Job 1
  drawDualColumnText('SoftCrowd Technologies', 'June 2026 – Present', true);
  drawDualColumnText('Artificial Intelligence & Machine Learning Intern', 'Nashik, India', false);
  cursorY += 2;
  drawBulletPoint('Work across the complete AI development lifecycle — from data collection and preprocessing to model training, performance evaluation, and deployment concepts.');
  drawBulletPoint('Research and analyze AI/ML techniques and apply machine learning algorithms to train and evaluate predictive models on real-world business datasets.');
  drawBulletPoint('Assist in designing and implementing AI-based solutions for practical use cases, leveraging industry-standard frameworks, libraries, and best practices.');
  drawBulletPoint('Collaborate with senior engineers and mentors on ongoing ML projects, building strong analytical, technical, and problem-solving skills in a professional environment.');
  cursorY += 8;

  // Job 2
  drawDualColumnText('Self-Employed', 'April 2026 – Present', true);
  drawDualColumnText('Freelance Full-Stack Engineer', 'Nashik, India', false);
  cursorY += 2;
  drawBulletPoint('Design, develop, and deploy production-grade web applications for clients, transforming business requirements into scalable, user-focused digital products.');
  drawBulletPoint('Build AI-enhanced marketplaces and custom web platforms integrating authentication, databases, payment gateways, and third-party APIs end-to-end.');
  drawBulletPoint('Develop AI-powered features and intelligent user experiences using modern cloud-based services, managing the full project lifecycle from planning through production.');
  drawBulletPoint('Maintain direct client communication to translate business objectives into technical solutions, ensuring quality delivery and stakeholder alignment throughout.');
  cursorY += 8;

  // Job 3
  drawDualColumnText('R-Tech Solutions', 'February 2025 – April 2026', true);
  drawDualColumnText('Frontend Developer', 'Nashik, India', false);
  cursorY += 2;
  drawBulletPoint('Built responsive, high-performance web applications using HTML5, CSS3, and JavaScript, ensuring seamless cross-device compatibility and accessibility.');
  drawBulletPoint('Collaborated closely with backend engineers to integrate RESTful APIs, delivering complete and scalable end-to-end solutions aligned to client requirements.');
  drawBulletPoint('Leveraged AI development tools to enhance productivity and streamline workflows, enabling faster and more precise project delivery cycles.');
  drawBulletPoint('Created clean, maintainable, and well-documented code following industry best practices, contributing to long-term codebase scalability and team efficiency.');
  cursorY += 8;

  // Job 4
  drawDualColumnText('CodSoft', 'September 2024', true);
  drawDualColumnText('C++ Developer Intern', 'Nashik, Maharashtra, India', false);
  cursorY += 2;
  drawBulletPoint('Designed and implemented three complete C++ software projects — a Tic-Tac-Toe game, a Number Guessing game, and a Calculator application — demonstrating applied algorithm design and clean application logic.');
  drawBulletPoint('Strengthened debugging and code optimization skills while managing multiple deliverables simultaneously and meeting project deadlines in a fast-paced internship setting.');
  cursorY += 8;

  // Render Projects
  drawSectionHeader('Projects');

  // Project 1
  drawDualColumnText('AI-Enhanced E-Commerce Marketplace | React, Node.js, AI APIs', '2026', true);
  drawBulletPoint('Designed and launched a full-stack marketplace with AI-powered product recommendations, secure authentication, relational databases, and third-party payment gateway integration — deployed end-to-end to production.');
  cursorY += 6;

  // Project 2
  drawDualColumnText('ML Predictive Modeling Pipeline | Python, Scikit-learn', '2026', true);
  drawBulletPoint('Built an end-to-end ML pipeline covering data ingestion, preprocessing, model training, evaluation, and iteration; benchmarked multiple algorithms to select optimal models for real-world datasets.');
  cursorY += 6;

  // Project 3
  drawDualColumnText('C++ Interactive Game Suite | Algorithm Design, OOP', '2024', true);
  drawBulletPoint('Engineered three fully functional applications (Tic-Tac-Toe, Number Guessing Game, Calculator) applying core OOP principles and algorithm design to produce modular, readable, and optimized code.');
  cursorY += 10;

  // Render Education
  drawSectionHeader('Education');
  
  drawDualColumnText('Maharashtra State Board of Technical Education (MSBTE)', 'September 2024 – May 2027', true);
  drawDualColumnText('Diploma in Artificial Intelligence & Machine Learning', 'Nashik, India', false);
  cursorY += 6;

  drawDualColumnText('I-Tech System Nashik', 'April 2024', true);
  drawDualColumnText('Computer Programming Certification', 'Nashik, India', false);
  cursorY += 6;

  drawDualColumnText('Shinde International School', 'February 2024', true);
  drawDualColumnText('Secondary School Certificate (SSC) – CBSE, 10th Grade', 'Nashik, India', false);
  cursorY += 10;

  // Render Certifications
  drawSectionHeader('Certifications & Professional Development');
  
  const certs = [
    { title: 'Java Programming Certification (2024)', desc: 'Core Java, OOP, Data Structures in Java' },
    { title: 'Deloitte Australia – Cyber Security Job Simulation (2024)', desc: 'Cyber Security, Risk Analysis, Security Frameworks' },
    { title: 'Electronic Arts – Software Engineering Job Simulation (2024)', desc: 'SDLC, Engineering Best Practices, Code Reviews' },
    { title: 'Certified Internship Program (CIP) (2024)', desc: 'Professional Skills, Industry Practices, Applied Training' }
  ];

  certs.forEach(cert => {
    drawDualColumnText(cert.title, cert.desc, false);
  });

  // Save the generated document directly matching their profile name
  doc.save('Om_Bhavsar_Resume.pdf');
}
