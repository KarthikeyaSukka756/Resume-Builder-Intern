/* ─── STATE ─── */
let skills = [];
let experiences = [];
let educations = [];
let projects = [];

/* ─── THEME SWITCHER ─── */
document.querySelectorAll('.theme-dot').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.theme-dot').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.documentElement.setAttribute('data-theme', btn.dataset.theme);
    update();
  });
});

/* ─── PROGRESS ─── */
function calcProgress() {
  const fields = ['name','title','email','phone','location','summary'];
  let filled = fields.filter(id => document.getElementById(id)?.value?.trim()).length;
  let total = fields.length;
  total += 3; // skills, exp, edu targets
  if (skills.length > 0) filled++;
  if (skills.length >= 2) filled++;
  if (experiences.length > 0) filled++;
  if (educations.length > 0) filled++;
  if (projects.length > 0) filled++;
  total += 2; // projects bonus
  const pct = Math.round((filled / total) * 100);
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressLabel').textContent = pct + '% Complete';
}

/* ─── SKILLS ─── */
function addSkill(name='', level=3) {
  const id = Date.now();
  skills.push({ id, name, level });
  renderSkills();
  update();
}

function removeSkill(id) {
  skills = skills.filter(s => s.id !== id);
  renderSkills();
  update();
}

function setSkillLevel(id, level) {
  skills = skills.map(s => s.id === id ? { ...s, level } : s);
  renderSkills();
  update();
}

function renderSkills() {
  const container = document.getElementById('skillsList');
  if (!skills.length) {
    container.innerHTML = '<div style="padding:0.75rem 1rem;color:var(--text-muted);font-size:0.8rem;">No skills added yet.</div>';
    return;
  }
  container.innerHTML = skills.map(s => `
    <div class="skill-row">
      <input type="text" value="${escHtml(s.name)}" placeholder="e.g. JavaScript"
        oninput="updateSkillName(${s.id}, this.value)"
        style="background:var(--input-bg);border:1px solid var(--border);border-radius:6px;padding:0.35rem 0.6rem;color:var(--text);font-size:0.82rem;"/>
      <div class="skill-level">
        ${[1,2,3,4,5].map(n =>
          `<div class="skill-dot ${n <= s.level ? 'on' : ''}" onclick="setSkillLevel(${s.id},${n})" title="Level ${n}"></div>`
        ).join('')}
      </div>
      <button class="skill-level-btn" onclick="removeSkill(${s.id})">×</button>
    </div>
  `).join('');
}

function updateSkillName(id, val) {
  skills = skills.map(s => s.id === id ? { ...s, name: val } : s);
  update();
}

/* ─── EXPERIENCE ─── */
function addExperience() {
  const id = Date.now();
  experiences.push({ id, role:'', company:'', start:'', end:'', desc:'' });
  renderExperience();
}

function removeExperience(id) {
  experiences = experiences.filter(e => e.id !== id);
  renderExperience();
  update();
}

function renderExperience() {
  const container = document.getElementById('experienceList');
  if (!experiences.length) {
    container.innerHTML = '<div style="padding:0.75rem 1rem;color:var(--text-muted);font-size:0.8rem;">No experience added yet.</div>';
    return;
  }
  container.innerHTML = experiences.map(e => `
    <div class="dyn-card">
      <button class="btn-remove" onclick="removeExperience(${e.id})">×</button>
      <div class="dyn-row">
        <div class="field">
          <label>Job Title</label>
          <input type="text" value="${escHtml(e.role)}" placeholder="e.g. Web Dev Intern"
            oninput="updateExp(${e.id},'role',this.value)"/>
        </div>
        <div class="field">
          <label>Company</label>
          <input type="text" value="${escHtml(e.company)}" placeholder="e.g. VaultofCodes"
            oninput="updateExp(${e.id},'company',this.value)"/>
        </div>
      </div>
      <div class="dyn-row">
        <div class="field">
          <label>Start</label>
          <input type="text" value="${escHtml(e.start)}" placeholder="June 2024"
            oninput="updateExp(${e.id},'start',this.value)"/>
        </div>
        <div class="field">
          <label>End</label>
          <input type="text" value="${escHtml(e.end)}" placeholder="July 2024 / Present"
            oninput="updateExp(${e.id},'end',this.value)"/>
        </div>
      </div>
      <div class="field">
        <label>Description</label>
        <textarea rows="2" placeholder="Key responsibilities and achievements..."
          oninput="updateExp(${e.id},'desc',this.value)">${escHtml(e.desc)}</textarea>
      </div>
    </div>
  `).join('');
}

function updateExp(id, key, val) {
  experiences = experiences.map(e => e.id === id ? { ...e, [key]: val } : e);
  update();
}

/* ─── EDUCATION ─── */
function addEducation() {
  const id = Date.now();
  educations.push({ id, degree:'', school:'', year:'', grade:'' });
  renderEducation();
}

function removeEducation(id) {
  educations = educations.filter(e => e.id !== id);
  renderEducation();
  update();
}

function renderEducation() {
  const container = document.getElementById('educationList');
  if (!educations.length) {
    container.innerHTML = '<div style="padding:0.75rem 1rem;color:var(--text-muted);font-size:0.8rem;">No education added yet.</div>';
    return;
  }
  container.innerHTML = educations.map(e => `
    <div class="dyn-card">
      <button class="btn-remove" onclick="removeEducation(${e.id})">×</button>
      <div class="field">
        <label>Degree / Course</label>
        <input type="text" value="${escHtml(e.degree)}" placeholder="e.g. B.Tech CSE"
          oninput="updateEdu(${e.id},'degree',this.value)"/>
      </div>
      <div class="field">
        <label>Institution</label>
        <input type="text" value="${escHtml(e.school)}" placeholder="e.g. JNTU Hyderabad"
          oninput="updateEdu(${e.id},'school',this.value)"/>
      </div>
      <div class="dyn-row">
        <div class="field">
          <label>Year</label>
          <input type="text" value="${escHtml(e.year)}" placeholder="2022 – 2026"
            oninput="updateEdu(${e.id},'year',this.value)"/>
        </div>
        <div class="field">
          <label>Grade / CGPA</label>
          <input type="text" value="${escHtml(e.grade)}" placeholder="8.5 CGPA"
            oninput="updateEdu(${e.id},'grade',this.value)"/>
        </div>
      </div>
    </div>
  `).join('');
}

function updateEdu(id, key, val) {
  educations = educations.map(e => e.id === id ? { ...e, [key]: val } : e);
  update();
}

/* ─── PROJECTS ─── */
function addProject() {
  const id = Date.now();
  projects.push({ id, name:'', tech:'', desc:'' });
  renderProjects();
}

function removeProject(id) {
  projects = projects.filter(p => p.id !== id);
  renderProjects();
  update();
}

function renderProjects() {
  const container = document.getElementById('projectsList');
  if (!projects.length) {
    container.innerHTML = '<div style="padding:0.75rem 1rem;color:var(--text-muted);font-size:0.8rem;">No projects added yet.</div>';
    return;
  }
  container.innerHTML = projects.map(p => `
    <div class="dyn-card">
      <button class="btn-remove" onclick="removeProject(${p.id})">×</button>
      <div class="dyn-row">
        <div class="field">
          <label>Project Name</label>
          <input type="text" value="${escHtml(p.name)}" placeholder="e.g. Resume Builder"
            oninput="updateProj(${p.id},'name',this.value)"/>
        </div>
        <div class="field">
          <label>Tech Stack</label>
          <input type="text" value="${escHtml(p.tech)}" placeholder="HTML, CSS, JS"
            oninput="updateProj(${p.id},'tech',this.value)"/>
        </div>
      </div>
      <div class="field">
        <label>Description</label>
        <textarea rows="2" placeholder="What does this project do?"
          oninput="updateProj(${p.id},'desc',this.value)">${escHtml(p.desc)}</textarea>
      </div>
    </div>
  `).join('');
}

function updateProj(id, key, val) {
  projects = projects.map(p => p.id === id ? { ...p, [key]: val } : p);
  update();
}

/* ─── MAIN UPDATE (LIVE PREVIEW) ─── */
function update() {
  const val = id => (document.getElementById(id)?.value || '').trim();

  // Name & Title
  const name = val('name') || 'Your Name';
  const title = val('title') || 'Professional Title';
  document.getElementById('r-name').textContent = name;
  document.getElementById('r-title').textContent = title;

  // Contact info
  const contact = [];
  if (val('email'))    contact.push(val('email'));
  if (val('phone'))    contact.push(val('phone'));
  if (val('location')) contact.push(val('location'));
  if (val('linkedin')) contact.push(val('linkedin'));
  document.getElementById('r-contact').innerHTML = contact.map(c => `<div>${escHtml(c)}</div>`).join('');

  // Summary
  const summary = val('summary');
  const sumBlock = document.getElementById('r-summary-block');
  if (summary) {
    sumBlock.style.display = 'flex';
    document.getElementById('r-summary').textContent = summary;
  } else {
    sumBlock.style.display = 'none';
  }

  // Skills
  const skillsBlock = document.getElementById('r-skills-block');
  const skillsList = document.getElementById('r-skills-list');
  const activeSkills = skills.filter(s => s.name.trim());
  if (activeSkills.length) {
    skillsBlock.style.display = 'flex';
    skillsList.innerHTML = activeSkills.map(s => `
      <div class="r-skill-item">
        <span class="r-skill-name">${escHtml(s.name)}</span>
        <div class="r-skill-bar-bg">
          <div class="r-skill-bar" style="width:${s.level * 20}%"></div>
        </div>
      </div>
    `).join('');
  } else {
    skillsBlock.style.display = 'none';
  }

  // Experience
  const expBlock = document.getElementById('r-exp-block');
  const expList = document.getElementById('r-exp-list');
  const activeExp = experiences.filter(e => e.role || e.company);
  if (activeExp.length) {
    expBlock.style.display = 'flex';
    expList.innerHTML = activeExp.map(e => `
      <div class="r-exp-item">
        <div class="r-exp-top">
          <span class="r-exp-role">${escHtml(e.role || 'Role')}</span>
          ${(e.start || e.end) ? `<span class="r-exp-date">${escHtml(e.start)}${e.end ? ' – ' + e.end : ''}</span>` : ''}
        </div>
        ${e.company ? `<div class="r-exp-company">${escHtml(e.company)}</div>` : ''}
        ${e.desc ? `<div class="r-exp-desc">${escHtml(e.desc)}</div>` : ''}
      </div>
    `).join('');
  } else {
    expBlock.style.display = 'none';
  }

  // Education
  const eduBlock = document.getElementById('r-edu-block');
  const eduList = document.getElementById('r-edu-list');
  const activeEdu = educations.filter(e => e.degree || e.school);
  if (activeEdu.length) {
    eduBlock.style.display = 'flex';
    eduList.innerHTML = activeEdu.map(e => `
      <div class="r-edu-item">
        <div class="r-edu-degree">${escHtml(e.degree || 'Degree')}</div>
        ${e.school ? `<div class="r-edu-school">${escHtml(e.school)}</div>` : ''}
        <div class="r-edu-year">${[e.year, e.grade].filter(Boolean).join(' · ')}</div>
      </div>
    `).join('');
  } else {
    eduBlock.style.display = 'none';
  }

  // Projects
  const projBlock = document.getElementById('r-proj-block');
  const projList = document.getElementById('r-proj-list');
  const activeProj = projects.filter(p => p.name);
  if (activeProj.length) {
    projBlock.style.display = 'flex';
    projList.innerHTML = activeProj.map(p => `
      <div class="r-proj-item">
        <div class="r-proj-name">${escHtml(p.name)}</div>
        ${p.tech ? `<div class="r-proj-tech">${escHtml(p.tech)}</div>` : ''}
        ${p.desc ? `<div class="r-proj-desc">${escHtml(p.desc)}</div>` : ''}
      </div>
    `).join('');
  } else {
    projBlock.style.display = 'none';
  }

  // Apply theme color to resume elements
  applyThemeToResume();
  calcProgress();
}

function applyThemeToResume() {
  const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
  const accentLight = getComputedStyle(document.documentElement).getPropertyValue('--accent-light').trim();
  const accentPale = getComputedStyle(document.documentElement).getPropertyValue('--accent-pale').trim();
  const paper = document.getElementById('resumeOutput');
  paper.style.setProperty('--accent', accent);
  paper.style.setProperty('--accent-light', accentLight);
  paper.style.setProperty('--accent-pale', accentPale);
}

/* ─── PDF EXPORT ─── */
function downloadPDF() {
  const btn = document.getElementById('downloadBtn');
  btn.classList.add('loading');
  btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Generating...`;

  const name = document.getElementById('name')?.value?.trim() || 'Resume';
  const element = document.getElementById('resumeOutput');

  const opt = {
    margin: 0,
    filename: `${name.replace(/\s+/g, '_')}_Resume.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, letterRendering: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save().then(() => {
    btn.classList.remove('loading');
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Export PDF`;
  });
}

/* ─── HELPERS ─── */
function escHtml(str) {
  return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ─── INIT: Pre-fill with sample data ─── */
window.addEventListener('DOMContentLoaded', () => {
  // Render empty state lists
  renderSkills();
  renderExperience();
  renderEducation();
  renderProjects();

  // Pre-fill Karthikeya's data
  const set = (id, val) => { const el = document.getElementById(id); if(el) el.value = val; };
  set('name',     'Karthikeya Sukka');
  set('title',    'Web Development Intern');
  set('email',    'karthikeya@email.com');
  set('phone',    '+91 XXXXXXXXXX');
  set('location', 'Hyderabad, India');
  set('linkedin', 'github.com/KarthikeyaSukka756');
  set('summary',  'Passionate Computer Science student with hands-on experience building responsive web applications using HTML, CSS, and JavaScript. Completed a 1-month web development internship at VaultofCodes, delivering multiple production-ready projects.');

  addSkill('HTML5', 5);
  addSkill('CSS3', 5);
  addSkill('JavaScript', 4);
  addSkill('Responsive Design', 4);
  addSkill('Git & GitHub', 3);
  addSkill('VS Code', 5);

  experiences.push({ id: Date.now(), role: 'Web Development Intern', company: 'VaultofCodes', start: 'June 2025', end: 'July 2025', desc: 'Rebuilt internship webpage using HTML & CSS. Completed personal portfolio, interactive recipe card, and an Interactive Resume Builder with live preview and PDF export.' });
  renderExperience();

  educations.push({ id: Date.now()+1, degree: 'B.Tech – Computer Science & Engineering', school: 'Your University Name', year: '2022 – 2026', grade: '' });
  renderEducation();

  projects.push({ id: Date.now()+2, name: 'Interactive Resume Builder', tech: 'HTML, CSS, JavaScript, html2pdf.js', desc: 'A two-panel web app where users fill a form and see a live resume preview update in real-time. Features dynamic fields, progress bar, 5 themes, and one-click PDF export.' });
  projects.push({ id: Date.now()+3, name: 'Personal Portfolio Website', tech: 'HTML5, CSS3, JavaScript', desc: 'Multi-section responsive portfolio with animated hero, skill progress bars, project cards, and smooth scroll navigation.' });
  renderProjects();

  update();
});
