import PptxGenJS from 'pptxgenjs';

const pptx = new PptxGenJS();

pptx.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5 inches

// ── THEME COLORS ──────────────────────────────────────────
const C = {
  darkGreen: '1B3A2D',
  gold:      'C9A84C',
  white:     'FFFFFF',
  lightGray: 'F4F4F4',
  gray:      '888888',
  darkText:  '1A1A1A',
  green2:    '2D6A4F',
  lightGold: 'F5E6C0',
};

// ── HELPERS ───────────────────────────────────────────────
function addHeader(slide, title, sub = '') {
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: '100%', h: 1.2,
    fill: { color: C.darkGreen },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 1.2, w: '100%', h: 0.06,
    fill: { color: C.gold },
  });
  slide.addText('✈  AFCAC', {
    x: 0.3, y: 0.15, w: 2, h: 0.4,
    color: C.gold, fontSize: 11, bold: true,
  });
  slide.addText(title, {
    x: 0.3, y: 0.45, w: 9, h: 0.6,
    color: C.white, fontSize: 22, bold: true,
  });
  if (sub) {
    slide.addText(sub, {
      x: 0.3, y: 0.88, w: 9, h: 0.3,
      color: C.gold, fontSize: 10, italic: true,
    });
  }
  // Page number area
  slide.addText('Revised Abuja Safety Targets Dashboard', {
    x: 9.5, y: 0.45, w: 3.5, h: 0.3,
    color: C.gray, fontSize: 8, align: 'right',
  });
}

function addFooter(slide, num) {
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 7.1, w: '100%', h: 0.4,
    fill: { color: C.darkGreen },
  });
  slide.addText(`AFCAC — Revised Abuja Safety Targets Monitoring and Reporting Dashboard  |  User Manual  |  Page ${num}`, {
    x: 0.3, y: 7.13, w: 12.5, h: 0.28,
    color: C.gold, fontSize: 8, align: 'center',
  });
}

function addBullet(slide, items, x, y, w, h) {
  slide.addText(items.map(i => ({ text: i.text, options: { bullet: i.bullet !== false, indentLevel: i.indent || 0, bold: i.bold || false, color: i.color || C.darkText, fontSize: i.size || 11 } })), {
    x, y, w, h, valign: 'top',
  });
}

function sectionBox(slide, title, x, y, w, h, color = C.darkGreen) {
  slide.addShape(pptx.ShapeType.rect, {
    x, y, w, h,
    fill: { color },
    rectRadius: 0.08,
  });
  slide.addText(title, {
    x: x + 0.15, y: y + 0.07, w: w - 0.3, h: 0.35,
    color: C.white, fontSize: 12, bold: true,
  });
}

// ══════════════════════════════════════════════════════════
// SLIDE 1 — COVER
// ══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.background = { color: C.darkGreen };

  s.addShape(pptx.ShapeType.rect, {
    x: 0, y: 6.5, w: '100%', h: 1,
    fill: { color: C.gold },
  });
  s.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 0.18, h: '100%',
    fill: { color: C.gold },
  });

  s.addText('✈', {
    x: 0.5, y: 0.6, w: 1.5, h: 1.5,
    color: C.gold, fontSize: 72, align: 'center',
  });

  s.addText('AFCAC', {
    x: 2, y: 0.7, w: 10, h: 0.8,
    color: C.gold, fontSize: 36, bold: true,
  });
  s.addText('Revised Abuja Safety Targets', {
    x: 2, y: 1.4, w: 10, h: 0.7,
    color: C.white, fontSize: 28, bold: true,
  });
  s.addText('Monitoring and Reporting Dashboard', {
    x: 2, y: 2.0, w: 10, h: 0.55,
    color: C.white, fontSize: 22,
  });

  s.addShape(pptx.ShapeType.rect, {
    x: 2, y: 2.7, w: 6, h: 0.05,
    fill: { color: C.gold },
  });

  s.addText('USER MANUAL', {
    x: 2, y: 2.9, w: 6, h: 0.7,
    color: C.gold, fontSize: 24, bold: true, charSpacing: 4,
  });

  s.addText('Guide d\'utilisation · Manual do Utilizador', {
    x: 2, y: 3.55, w: 8, h: 0.35,
    color: C.gray, fontSize: 13, italic: true,
  });

  s.addText('Version 1.0  ·  April 2026  ·  AFCAC Safety Unit', {
    x: 0.5, y: 6.6, w: 9, h: 0.35,
    color: C.darkGreen, fontSize: 11, bold: true,
  });
  s.addText('CONFIDENTIAL — For authorized users only', {
    x: 9, y: 6.6, w: 4, h: 0.35,
    color: C.darkGreen, fontSize: 9, align: 'right', italic: true,
  });
}

// ══════════════════════════════════════════════════════════
// SLIDE 2 — TABLE OF CONTENTS
// ══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.background = { color: C.white };
  addHeader(s, 'Table of Contents', 'User Manual — Revised Abuja Safety Targets Dashboard');
  addFooter(s, 2);

  const sections = [
    { n: '01', title: 'Introduction & Overview',           desc: 'Application purpose, access URL, supported browsers' },
    { n: '02', title: 'Accessing the Application',         desc: 'Login, roles, language selection' },
    { n: '03', title: 'Dashboard — Main Page',             desc: 'KPIs, Status charts, Africa map, Action table' },
    { n: '04', title: 'Admin Panel — Targets',             desc: 'Updating safety target progress, deadlines' },
    { n: '05', title: 'Admin Panel — Actions & Countries', desc: 'Managing action plans and country data' },
    { n: '06', title: 'Admin Panel — Users & Sessions',    desc: 'User accounts, active sessions monitoring' },
    { n: '07', title: 'Questionnaire Forms',               desc: 'Completing and submitting safety questionnaires' },
    { n: '08', title: 'Multilingual Support',              desc: 'Switching between English, French, Portuguese' },
    { n: '09', title: 'Export & Reports',                  desc: 'Downloading Excel and PDF reports' },
    { n: '10', title: 'Troubleshooting & Support',         desc: 'Common issues and contact information' },
  ];

  sections.forEach((sec, i) => {
    const col = i < 5 ? 0 : 1;
    const row = i % 5;
    const x = col === 0 ? 0.4 : 6.8;
    const y = 1.5 + row * 1.0;

    s.addShape(pptx.ShapeType.rect, {
      x, y, w: 6.0, h: 0.82,
      fill: { color: i % 2 === 0 ? C.lightGray : C.white },
      line: { color: C.gold, width: 1 },
      rectRadius: 0.06,
    });
    s.addText(sec.n, {
      x: x + 0.1, y: y + 0.08, w: 0.6, h: 0.55,
      color: C.gold, fontSize: 20, bold: true, align: 'center',
    });
    s.addShape(pptx.ShapeType.rect, {
      x: x + 0.72, y: y + 0.15, w: 0.03, h: 0.5,
      fill: { color: C.gold },
    });
    s.addText(sec.title, {
      x: x + 0.85, y: y + 0.06, w: 4.9, h: 0.3,
      color: C.darkText, fontSize: 11, bold: true,
    });
    s.addText(sec.desc, {
      x: x + 0.85, y: y + 0.38, w: 4.9, h: 0.3,
      color: C.gray, fontSize: 9, italic: true,
    });
  });
}

// ══════════════════════════════════════════════════════════
// SLIDE 3 — INTRODUCTION
// ══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.background = { color: C.white };
  addHeader(s, '01 — Introduction & Overview');
  addFooter(s, 3);

  s.addText('What is this application?', {
    x: 0.4, y: 1.45, w: 9, h: 0.4,
    color: C.darkGreen, fontSize: 15, bold: true,
  });
  s.addText(
    'The Revised Abuja Safety Targets (RAST) Dashboard is the official AFCAC platform for monitoring and reporting on the 39 aviation safety targets across 54 African member states. It provides real-time visibility into progress, enables national focal points to submit data, and supports decision-making for AFCAC\'s Safety Unit.',
    { x: 0.4, y: 1.88, w: 12.4, h: 0.85, color: C.darkText, fontSize: 11, paraSpaceAfter: 4 }
  );

  // Three feature boxes
  const boxes = [
    { icon: '📊', title: 'Real-time Monitoring', desc: 'Live KPIs, status charts, and geographic map updated by national focal points.' },
    { icon: '🔐', title: 'Secure Admin Access', desc: 'Role-based access for AFCAC admins and country focal points with JWT authentication.' },
    { icon: '🌍', title: 'Multilingual', desc: 'Full support for English, French, and Portuguese — all content adapts to the selected language.' },
  ];
  boxes.forEach((b, i) => {
    const x = 0.4 + i * 4.3;
    s.addShape(pptx.ShapeType.rect, { x, y: 2.9, w: 4.0, h: 2.0, fill: { color: C.lightGray }, rectRadius: 0.1 });
    s.addShape(pptx.ShapeType.rect, { x, y: 2.9, w: 4.0, h: 0.08, fill: { color: C.gold } });
    s.addText(b.icon, { x: x + 0.15, y: 3.0, w: 0.7, h: 0.6, fontSize: 26 });
    s.addText(b.title, { x: x + 0.15, y: 3.55, w: 3.7, h: 0.35, color: C.darkGreen, fontSize: 12, bold: true });
    s.addText(b.desc, { x: x + 0.15, y: 3.9, w: 3.7, h: 0.85, color: C.darkText, fontSize: 10 });
  });

  s.addText('🌐  Production URL:', { x: 0.4, y: 5.15, w: 2.5, h: 0.35, color: C.darkGreen, fontSize: 11, bold: true });
  s.addShape(pptx.ShapeType.rect, { x: 0.4, y: 5.5, w: 12.4, h: 0.42, fill: { color: C.darkGreen }, rectRadius: 0.06 });
  s.addText('https://afcac-dashboard.vercel.app', {
    x: 0.6, y: 5.53, w: 11.8, h: 0.35,
    color: C.gold, fontSize: 13, bold: true,
  });

  s.addText('Supported browsers: Chrome · Firefox · Edge · Safari  (latest versions)', {
    x: 0.4, y: 6.1, w: 12, h: 0.3, color: C.gray, fontSize: 9, italic: true,
  });
}

// ══════════════════════════════════════════════════════════
// SLIDE 4 — LOGIN & ACCESS
// ══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.background = { color: C.white };
  addHeader(s, '02 — Accessing the Application', 'Login · Roles · Language');
  addFooter(s, 4);

  // Left column — Login steps
  sectionBox(s, '🔐  Login Procedure', 0.4, 1.4, 5.8, 0.42);
  const steps = [
    '1.  Open https://afcac-dashboard.vercel.app in your browser',
    '2.  Click the "🔐 Sign In" button at the top-right of the dashboard',
    '3.  Enter your Username (provided by AFCAC Safety Unit)',
    '4.  Enter your Password and click "Submit"',
    '5.  You will be redirected to your authorized section',
  ];
  steps.forEach((step, i) => {
    s.addText(step, {
      x: 0.5, y: 1.95 + i * 0.48, w: 5.6, h: 0.4,
      color: C.darkText, fontSize: 10.5,
      bullet: false,
    });
  });

  // Right column — Roles
  sectionBox(s, '👥  User Roles', 6.5, 1.4, 6.4, 0.42);

  const roles = [
    { role: 'AFCAC Admin', color: C.darkGreen, perms: 'Full access: KPIs, Targets, Actions, Countries, Users, Sessions' },
    { role: 'Country Focal Point', color: C.green2, perms: 'Access to Targets tab only — update progress for assigned country' },
  ];
  roles.forEach((r, i) => {
    s.addShape(pptx.ShapeType.rect, { x: 6.5, y: 1.95 + i * 1.3, w: 6.4, h: 1.1, fill: { color: C.lightGray }, rectRadius: 0.08 });
    s.addShape(pptx.ShapeType.rect, { x: 6.5, y: 1.95 + i * 1.3, w: 0.12, h: 1.1, fill: { color: r.color } });
    s.addText(r.role, { x: 6.72, y: 2.0 + i * 1.3, w: 5.9, h: 0.35, color: r.color, fontSize: 12, bold: true });
    s.addText(r.perms, { x: 6.72, y: 2.35 + i * 1.3, w: 5.9, h: 0.55, color: C.darkText, fontSize: 10 });
  });

  sectionBox(s, '🌐  Language Selection', 6.5, 4.6, 6.4, 0.42);
  s.addText(
    'Use the language switcher in the top-right menu of any page. Select from:\n  🇬🇧  English (EN)   ·   🇫🇷  Français (FR)   ·   🇵🇹  Português (PT)\n\nThe entire interface — menus, labels, form options, and instructions — will immediately switch to the selected language. Your preference is saved in a cookie and persists across sessions.',
    { x: 6.5, y: 5.05, w: 6.4, h: 1.8, color: C.darkText, fontSize: 10.5 }
  );

  s.addShape(pptx.ShapeType.rect, { x: 0.4, y: 4.6, w: 5.8, h: 0.42, fill: { color: C.gold }, rectRadius: 0.08 });
  s.addText('⚠  Important Notes', { x: 0.55, y: 4.64, w: 5.5, h: 0.35, color: C.darkGreen, fontSize: 11, bold: true });
  s.addText('• Do not share your credentials\n• Sessions expire after inactivity — log in again if prompted\n• Contact AFCAC Safety Unit to reset your password', {
    x: 0.5, y: 5.08, w: 5.6, h: 1.1, color: C.darkText, fontSize: 10.5,
  });
}

// ══════════════════════════════════════════════════════════
// SLIDE 5 — MAIN DASHBOARD
// ══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.background = { color: C.white };
  addHeader(s, '03 — Dashboard — Main Page', 'Public overview — no login required');
  addFooter(s, 5);

  const sections2 = [
    { icon: '📊', title: 'Executive Summary (KPIs)', x: 0.4, y: 1.45, desc: 'Top banner showing: Total Countries, Total Actions, % Completed, % In Progress, Average Duration, Experts Planned. These values are updated by AFCAC admins.' },
    { icon: '📈', title: 'Status Distribution Bar', x: 0.4, y: 2.85, desc: 'A horizontal bar chart showing the continental distribution of action statuses: Completed, In Progress, Delayed, On Hold, Not Started. Click "About this indicator" for details.' },
    { icon: '🌍', title: 'Africa Status Map', x: 0.4, y: 4.25, desc: 'An interactive map of Africa where each country is color-coded by overall status. Hover over a country to see its name, number of targets, and current status.' },
    { icon: '📋', title: 'Action Plan Detail Table', x: 6.9, y: 1.45, desc: 'A filterable table listing all actions with columns: Country, Target ID, Section, Status, Start, End, Progress. Use the filter bar to search by country or status.' },
    { icon: '🎯', title: 'Target Achievement Grid', x: 6.9, y: 2.85, desc: 'A grid of all 15 Abuja Safety Targets showing the continental average score for each. Color-coded from red (0%) to green (100%).' },
    { icon: '⬇', title: 'Export Buttons', x: 6.9, y: 4.25, desc: 'Download the full dashboard data as Excel (.xlsx) or PDF. The export includes all visible data at the time of download.' },
  ];

  sections2.forEach(sec => {
    s.addShape(pptx.ShapeType.rect, { x: sec.x, y: sec.y, w: 6.2, h: 1.2, fill: { color: C.lightGray }, rectRadius: 0.08 });
    s.addShape(pptx.ShapeType.rect, { x: sec.x, y: sec.y, w: 6.2, h: 0.06, fill: { color: C.gold } });
    s.addText(sec.icon + '  ' + sec.title, { x: sec.x + 0.15, y: sec.y + 0.1, w: 5.9, h: 0.35, color: C.darkGreen, fontSize: 11, bold: true });
    s.addText(sec.desc, { x: sec.x + 0.15, y: sec.y + 0.45, w: 5.9, h: 0.68, color: C.darkText, fontSize: 9.5 });
  });
}

// ══════════════════════════════════════════════════════════
// SLIDE 6 — ADMIN PANEL TARGETS
// ══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.background = { color: C.white };
  addHeader(s, '04 — Admin Panel: Targets', 'Updating safety target progress');
  addFooter(s, 6);

  s.addText('How to update a safety target', {
    x: 0.4, y: 1.45, w: 8, h: 0.38,
    color: C.darkGreen, fontSize: 14, bold: true,
  });

  const steps = [
    { n: '1', text: 'Log in and click "⚙ Admin" in the header to access the admin panel.' },
    { n: '2', text: 'Click the "🎯 Safety Targets" tab in the left navigation sidebar.' },
    { n: '3', text: 'Fill in your name in "Full Name" and select your country in "Country Represented".' },
    { n: '4', text: 'Scroll to the target you want to update (grouped by safety category).' },
    { n: '5', text: 'Use the dropdown to select the progress level (0% to 100%).' },
    { n: '6', text: 'Optionally update the "Deadline" field for the target.' },
    { n: '7', text: 'When finished, click "💾 Save Changes" at the bottom of the page.' },
  ];

  steps.forEach((step, i) => {
    const y = 1.95 + i * 0.63;
    s.addShape(pptx.ShapeType.rect, { x: 0.4, y, w: 0.45, h: 0.45, fill: { color: C.darkGreen }, rectRadius: 0.22 });
    s.addText(step.n, { x: 0.4, y: y + 0.05, w: 0.45, h: 0.35, color: C.gold, fontSize: 13, bold: true, align: 'center' });
    s.addText(step.text, { x: 1.0, y: y + 0.04, w: 11.7, h: 0.4, color: C.darkText, fontSize: 11 });
  });

  // Progress levels box
  sectionBox(s, '📊  Progress Levels', 0.4, 6.25, 12.5, 0.38);
  const levels = [
    { pct: '0%', label: 'Not Started / Not Applicable', color: '95a5a6' },
    { pct: '25%', label: 'Partially Initiated', color: 'e07b39' },
    { pct: '50%', label: 'In Progress / Partially Achieved', color: 'f0a500' },
    { pct: '75%', label: 'Advanced / On Track', color: '52b788' },
    { pct: '100%', label: 'Fully Achieved', color: '2d9d5e' },
  ];
  levels.forEach((l, i) => {
    const x = 0.5 + i * 2.5;
    s.addShape(pptx.ShapeType.rect, { x, y: 6.65, w: 2.3, h: 0.3, fill: { color: l.color }, rectRadius: 0.04 });
    s.addText(`${l.pct} — ${l.label}`, { x, y: 6.65, w: 2.3, h: 0.3, color: C.white, fontSize: 7.5, bold: true, align: 'center', valign: 'middle' });
  });
}

// ══════════════════════════════════════════════════════════
// SLIDE 7 — ADMIN PANEL ACTIONS & COUNTRIES
// ══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.background = { color: C.white };
  addHeader(s, '05 — Admin Panel: Actions & Countries');
  addFooter(s, 7);

  sectionBox(s, '📋  Actions Tab', 0.4, 1.4, 6.2, 0.42);
  s.addText(
    'The Actions tab lists all action plans for every country. You can:\n\n• Change the Status of any action (Completed, In Progress, Delayed, On Hold, Not Started)\n• Update the Start and End dates\n• Add or edit the Responsible person\n• Track progress percentage per action\n\nAll changes are saved when you click "💾 Save Changes" at the bottom.',
    { x: 0.4, y: 1.9, w: 6.2, h: 2.8, color: C.darkText, fontSize: 10.5 }
  );

  sectionBox(s, '🌍  Countries Tab', 6.8, 1.4, 6.1, 0.42);
  s.addText(
    'The Countries tab allows updating aggregated country-level data:\n\n• Total number of actions per country\n• Budget information\n• Breakdown of statuses (Completed / In Progress / Delayed / On Hold / Not Started)\n\nThis data feeds the Country Breakdown table and the Africa Map on the main dashboard.',
    { x: 6.8, y: 1.9, w: 6.1, h: 2.8, color: C.darkText, fontSize: 10.5 }
  );

  sectionBox(s, '📊  KPIs Tab (Admin only)', 0.4, 4.45, 6.2, 0.42);
  s.addText(
    'The KPIs tab controls the headline figures shown in the Executive Summary:\n\n• Total Countries · Total Actions\n• % Completed · % In Progress\n• Average Duration (weeks)\n• Experts Planned\n• Trend labels for each indicator',
    { x: 0.4, y: 4.95, w: 6.2, h: 1.9, color: C.darkText, fontSize: 10.5 }
  );

  sectionBox(s, '⚠  Important', 6.8, 4.45, 6.1, 0.42, 'C9A84C');
  s.addText(
    'Always fill in your identity (Full Name + Country) before saving. All updates are timestamped and attributed to the person who submitted them. The dashboard refreshes automatically after a successful save.',
    { x: 6.8, y: 4.95, w: 6.1, h: 1.5, color: C.darkText, fontSize: 10.5 }
  );
}

// ══════════════════════════════════════════════════════════
// SLIDE 8 — USERS & SESSIONS
// ══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.background = { color: C.white };
  addHeader(s, '06 — Admin Panel: Users & Sessions', 'For AFCAC Administrators only');
  addFooter(s, 8);

  sectionBox(s, '🔑  Users Tab', 0.4, 1.4, 6.2, 0.42);
  s.addText(
    'The Users tab lists all 54 country focal points (one per AFCAC member state). For each user you can see:\n\n• Username and assigned country\n• Role (focal_point or admin)\n• Account status\n\nThis tab is visible only to AFCAC Admin accounts.',
    { x: 0.4, y: 1.9, w: 6.2, h: 3.0, color: C.darkText, fontSize: 10.5 }
  );

  sectionBox(s, '🟢  Sessions Tab', 6.8, 1.4, 6.1, 0.42);
  s.addText(
    'The Sessions tab provides real-time visibility of all currently connected users:\n\n• Username and country\n• Login time\n• IP address and approximate location (country/city)\n• Session duration\n\nThe list refreshes automatically every 30 seconds. This allows AFCAC staff to monitor who is actively using the platform.',
    { x: 6.8, y: 1.9, w: 6.1, h: 3.0, color: C.darkText, fontSize: 10.5 }
  );

  s.addShape(pptx.ShapeType.rect, { x: 0.4, y: 4.7, w: 12.5, h: 1.8, fill: { color: C.lightGray }, rectRadius: 0.1 });
  s.addShape(pptx.ShapeType.rect, { x: 0.4, y: 4.7, w: 12.5, h: 0.06, fill: { color: C.gold } });
  s.addText('🔒  Security Best Practices', { x: 0.55, y: 4.78, w: 12.1, h: 0.35, color: C.darkGreen, fontSize: 12, bold: true });
  s.addText(
    '• Never share your admin credentials with anyone, including country focal points\n• If you notice a suspicious session (unknown IP or country), contact the system administrator immediately\n• Admin accounts should log out after each session — use the "⏻ Log Out" button in the header',
    { x: 0.55, y: 5.15, w: 12.1, h: 1.2, color: C.darkText, fontSize: 10.5 }
  );
}

// ══════════════════════════════════════════════════════════
// SLIDE 9 — QUESTIONNAIRE FORMS
// ══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.background = { color: C.white };
  addHeader(s, '07 — Questionnaire Forms', 'State Safety Self-Assessment');
  addFooter(s, 9);

  s.addText('The questionnaire allows each country\'s focal point to assess their state\'s level of implementation for each safety target.',
    { x: 0.4, y: 1.45, w: 12.5, h: 0.45, color: C.darkText, fontSize: 11 }
  );

  // Access paths
  sectionBox(s, '🔗  How to Access', 0.4, 1.95, 5.8, 0.4);
  s.addText('• Form 1: https://afcac-dashboard.vercel.app/formulaire-1\n• Form 2: https://afcac-dashboard.vercel.app/formulaire-2\n• Or navigate from the main dashboard header menu', {
    x: 0.4, y: 2.4, w: 5.8, h: 1.0, color: C.darkText, fontSize: 10.5
  });

  sectionBox(s, '📝  How to Complete a Form', 6.4, 1.95, 6.5, 0.4);
  const fsteps = [
    '1. Select your State / Country from the left panel dropdown',
    '2. For each question, read the statement carefully',
    '3. Select the option (a to e) that best describes your current level',
    '4. Optionally add a comment or observation for context',
    '5. Track progress in the header completion bar',
    '6. Click "📋 Summary" to review all answers before submitting',
    '7. Click "✔ Submit to Dashboard" to send your responses',
  ];
  fsteps.forEach((st, i) => {
    s.addText(st, { x: 6.4, y: 2.4 + i * 0.43, w: 6.5, h: 0.38, color: C.darkText, fontSize: 10 });
  });

  sectionBox(s, '📊  Score Levels', 0.4, 3.55, 5.8, 0.4);
  s.addText(
    'Each question has 5 options scored 0% to 100%:\n\na) 0% — Not Started / Not Applicable\nb) 25% — Partially Initiated\nc) 50% — In Progress / Partially Achieved\nd) 75% — Advanced / On Track\ne) 100% — Fully Achieved',
    { x: 0.4, y: 4.0, w: 5.8, h: 2.55, color: C.darkText, fontSize: 10.5 }
  );
}

// ══════════════════════════════════════════════════════════
// SLIDE 10 — MULTILINGUAL SUPPORT
// ══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.background = { color: C.white };
  addHeader(s, '08 — Multilingual Support', 'English · Français · Português');
  addFooter(s, 10);

  const langs = [
    { flag: '🇬🇧', code: 'EN', name: 'English', note: 'Default language. All base content is in English.' },
    { flag: '🇫🇷', code: 'FR', name: 'Français', note: 'Full French translation of all interface elements, menus, and form options.' },
    { flag: '🇵🇹', code: 'PT', name: 'Português', note: 'Full Portuguese translation for Lusophone member states.' },
  ];

  langs.forEach((l, i) => {
    const x = 0.4 + i * 4.3;
    s.addShape(pptx.ShapeType.rect, { x, y: 1.45, w: 4.0, h: 2.5, fill: { color: C.lightGray }, rectRadius: 0.1 });
    s.addShape(pptx.ShapeType.rect, { x, y: 1.45, w: 4.0, h: 0.08, fill: { color: C.gold } });
    s.addText(l.flag, { x: x + 0.15, y: 1.55, w: 0.8, h: 0.7, fontSize: 36 });
    s.addText(l.code, { x: x + 0.95, y: 1.6, w: 0.8, h: 0.5, color: C.gold, fontSize: 24, bold: true });
    s.addText(l.name, { x: x + 0.15, y: 2.25, w: 3.7, h: 0.35, color: C.darkGreen, fontSize: 14, bold: true });
    s.addText(l.note, { x: x + 0.15, y: 2.65, w: 3.7, h: 0.85, color: C.darkText, fontSize: 10 });
  });

  sectionBox(s, '🔄  What gets translated', 0.4, 4.15, 12.5, 0.4);
  const translated = [
    ['Dashboard labels & KPIs', '✅'], ['Navigation menus & tabs', '✅'],
    ['Admin panel titles & intro texts', '✅'], ['Score option labels (a–e)', '✅'],
    ['Score descriptions', '✅'], ['Questionnaire questions & options', '✅'],
    ['Form placeholders & buttons', '✅'], ['Login page', '✅'],
    ['Export labels', '✅'], ['Error & success messages', '✅'],
    ['Declarant identity section', '✅'], ['Country names', '—'],
  ];
  translated.forEach((item, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    s.addText(`${item[1]}  ${item[0]}`, {
      x: 0.5 + col * 4.2, y: 4.65 + row * 0.42, w: 4.0, h: 0.38,
      color: item[1] === '✅' ? C.darkGreen : C.gray, fontSize: 10.5,
    });
  });

  s.addText('💡  Language preference is saved in a browser cookie — no need to re-select on each visit.', {
    x: 0.4, y: 6.8, w: 12.5, h: 0.28, color: C.gray, fontSize: 9, italic: true,
  });
}

// ══════════════════════════════════════════════════════════
// SLIDE 11 — EXPORT & REPORTS
// ══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.background = { color: C.white };
  addHeader(s, '09 — Export & Reports');
  addFooter(s, 11);

  sectionBox(s, '📥  Dashboard Exports', 0.4, 1.45, 6.1, 0.42);
  s.addText(
    'From the main dashboard, use the Export Buttons section to download data:\n\n⬇  Download Excel (.xlsx)\nExports the full action plan table with all columns: Country, Target ID, Section, Status, Start, End, Progress, Responsible.\n\n⬇  Download PDF\nGenerates a formatted PDF snapshot of the current dashboard view including KPIs, status charts, and action table.',
    { x: 0.4, y: 1.95, w: 6.1, h: 3.0, color: C.darkText, fontSize: 10.5 }
  );

  sectionBox(s, '📋  Questionnaire Exports', 6.7, 1.45, 6.2, 0.42);
  s.addText(
    'From the questionnaire form, after completing your answers:\n\n⬇  Export JSON\nDownloads a structured JSON file with all answers, scores, comments, state name, and submission timestamp.\n\n⬇  Export CSV\nDownloads a CSV file compatible with Excel with columns: Target ID, Title, Group, Score (%), Label, Comments.\n\n✔  Submit to Dashboard\nSends your responses directly to the live dashboard and updates the continental statistics.',
    { x: 6.7, y: 1.95, w: 6.2, h: 3.6, color: C.darkText, fontSize: 10.5 }
  );

  s.addShape(pptx.ShapeType.rect, { x: 0.4, y: 5.1, w: 12.5, h: 1.55, fill: { color: C.lightGold }, rectRadius: 0.1 });
  s.addShape(pptx.ShapeType.rect, { x: 0.4, y: 5.1, w: 0.1, h: 1.55, fill: { color: C.gold } });
  s.addText('💡  Tips for reporting', { x: 0.6, y: 5.17, w: 12.1, h: 0.35, color: C.darkGreen, fontSize: 11, bold: true });
  s.addText(
    '• Export Excel after each quarterly update to keep a local backup of the dashboard state\n• The JSON export from questionnaires can be archived as official documentation of each country\'s self-assessment\n• PDF exports capture the dashboard exactly as displayed — switch language before exporting to get reports in your preferred language',
    { x: 0.6, y: 5.52, w: 12.1, h: 1.05, color: C.darkText, fontSize: 10 }
  );
}

// ══════════════════════════════════════════════════════════
// SLIDE 12 — TROUBLESHOOTING
// ══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.background = { color: C.white };
  addHeader(s, '10 — Troubleshooting & Support');
  addFooter(s, 12);

  const issues = [
    { prob: 'Cannot log in', sol: 'Check your username and password. Passwords are case-sensitive. If the problem persists, contact the AFCAC Safety Unit to reset your credentials.' },
    { prob: 'Dashboard shows no data', sol: 'The database connection may be temporarily unavailable. Wait a few seconds and refresh the page (F5). If the problem persists, contact support.' },
    { prob: 'Language does not switch', sol: 'Clear your browser cookies and try again. Make sure you click the language button and wait for the page to re-render.' },
    { prob: 'Save changes has no effect', sol: 'Ensure you are connected to the internet. Check that you filled in both "Full Name" and "Country Represented" before saving.' },
    { prob: 'Map does not display', sol: 'Disable browser ad-blockers or try in an incognito window. The map requires JavaScript to be enabled.' },
    { prob: 'Export produces empty file', sol: 'Ensure there is data loaded on the dashboard. Try refreshing the page first, then attempt the export again.' },
  ];

  issues.forEach((item, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = col === 0 ? 0.4 : 6.8;
    const y = 1.45 + row * 1.55;
    s.addShape(pptx.ShapeType.rect, { x, y, w: 6.1, h: 1.38, fill: { color: C.lightGray }, rectRadius: 0.08 });
    s.addShape(pptx.ShapeType.rect, { x, y, w: 6.1, h: 0.06, fill: { color: C.gold } });
    s.addText('⚠  ' + item.prob, { x: x + 0.15, y: y + 0.1, w: 5.8, h: 0.32, color: C.darkGreen, fontSize: 10.5, bold: true });
    s.addText(item.sol, { x: x + 0.15, y: y + 0.45, w: 5.8, h: 0.85, color: C.darkText, fontSize: 9.5 });
  });

  // Contact box
  s.addShape(pptx.ShapeType.rect, { x: 0.4, y: 6.15, w: 12.5, h: 0.65, fill: { color: C.darkGreen }, rectRadius: 0.08 });
  s.addText('📧  Technical Support  ·  AFCAC Safety Unit  ·  Email: safety@afcac.org  ·  Website: www.afcac.org', {
    x: 0.5, y: 6.28, w: 12.2, h: 0.38, color: C.gold, fontSize: 11, bold: true, align: 'center',
  });
}

// ══════════════════════════════════════════════════════════
// SLIDE 13 — BACK COVER
// ══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.background = { color: C.darkGreen };

  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.18, h: '100%', fill: { color: C.gold } });
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 6.8, w: '100%', h: 0.7, fill: { color: C.gold } });

  s.addText('✈', { x: 0.5, y: 1.0, w: 2, h: 2, color: C.gold, fontSize: 96, align: 'center' });

  s.addText('AFCAC', { x: 2.5, y: 1.2, w: 10, h: 0.9, color: C.gold, fontSize: 42, bold: true });
  s.addText('African Civil Aviation Commission', { x: 2.5, y: 2.0, w: 10, h: 0.5, color: C.white, fontSize: 18 });
  s.addText('Commission Africaine de l\'Aviation Civile', { x: 2.5, y: 2.45, w: 10, h: 0.4, color: C.gray, fontSize: 14, italic: true });

  s.addShape(pptx.ShapeType.rect, { x: 2.5, y: 3.0, w: 8, h: 0.05, fill: { color: C.gold } });

  s.addText('Revised Abuja Safety Targets\nMonitoring and Reporting Dashboard', {
    x: 2.5, y: 3.2, w: 10, h: 1.0, color: C.white, fontSize: 16,
  });

  s.addText('🌐  https://afcac-dashboard.vercel.app', {
    x: 2.5, y: 4.4, w: 8, h: 0.4, color: C.gold, fontSize: 12, bold: true,
  });

  s.addText('Version 1.0  ·  April 2026  ·  © AFCAC Safety Unit', {
    x: 0.5, y: 6.88, w: 9, h: 0.35, color: C.darkGreen, fontSize: 10, bold: true,
  });
  s.addText('For authorized users only', {
    x: 9.5, y: 6.88, w: 3.5, h: 0.35, color: C.darkGreen, fontSize: 9, align: 'right',
  });
}

// ══════════════════════════════════════════════════════════
// SAVE
// ══════════════════════════════════════════════════════════
await pptx.writeFile({ fileName: 'AFCAC_RAST_Dashboard_User_Manual.pptx' });
console.log('✅  Manual generated: AFCAC_RAST_Dashboard_User_Manual.pptx');
