'use strict';
// ════════════════════════════════════════════════
//  Abuabdullaziz 3cc — Frontend v4.0
//  Separate pages: login.html + index.html (SPA)
// ════════════════════════════════════════════════

// ── GLOBALS ──────────────────────────────────────
let currentUser = null;
let currentLang = localStorage.getItem('lang') || 'ar';
let decryptFile = null, fixFile = null, grantsFile = null;
let selectedKeyMethod = 'none';
let decryptProgressToken = null, fixProgressToken = null;

// ── TRANSLATIONS ──────────────────────────────────
const T = {
  ar:{
    navHome:'الرئيسية',navDecrypt:'فك التشفير',navFix:'3D Fix',navFiles:'ملفاتي',
    heroBadge:'v4.0 — النظام يعمل',heroTitle:'منصة فك التشفير\nوإصلاح الريسورسات',
    heroSub:'فك تشفير ريسورسات FiveM وإصلاح نماذج 3D بسرعة واحترافية.',
    heroBtn1:'ابدأ فك التشفير',heroBtn2:'إصلاح 3D',heroBtn3:'ملفاتي',
    stDecrypts:'فك التشفير',stFixes:'إصلاح 3D',stUsers:'المستخدمون',stSize:'التخزين',
    toolsTitle:'الأدوات الرئيسية',
    fc1Title:'فك تشفير الريسورسات',fc1Desc:'فك تشفير ريسورسات FiveM المشفرة بـ CFX Escrow. دعم ملفات grants وبدون مفتاح.',
    fc2Title:'إصلاح نماذج 3D',fc2Desc:'إصلاح تلقائي لملفات YDR/YFT/YDD التالفة. كشف vertices وإعادة بناء النماذج.',
    howTitle:'كيف يعمل',
    step1:'سجّل دخولك',step1s:'ادخل عبر حسابك على Discord',
    step2:'ارفع الملف',step2s:'ارفع ZIP يحتوي على الريسورس',
    step3:'المعالجة التلقائية',step3s:'النظام يعالج تلقائياً في ثوانٍ',
    step4:'حمّل النتيجة',step4s:'رابط تحميل مباشر جاهز فوراً',
    plansTitle:'الخطط والأسعار',
    planFreeName:'مجاني',planFreePeriod:'للأبد',
    planWeekName:'أسبوعي',planWeekPeriod:'لمدة أسبوع',popularLabel:'الأكثر شعبية',
    planLifeName:'مدى الحياة',planLifePeriod:'دفعة واحدة',
    pf1:'1 فك تشفير / يوم',pf2:'1 إصلاح 3D / يوم',pf3:'أولوية المعالجة',pf4:'دعم مخصص',
    pw1:'10 فك تشفير / يوم',pw2:'10 إصلاح 3D / يوم',pw3:'أولوية المعالجة',pw4:'دعم مخصص',
    pl1:'غير محدود / يوم',pl2:'غير محدود 3D / يوم',pl3:'أولوية قصوى',pl4:'دعم مخصص 24/7',
    planFreeBtn:'ابدأ مجاناً',planWeekBtn:'احصل عليه',planLifeBtn:'احصل عليه',
    dpTitle:'فك تشفير الريسورس',dpSub:'ارفع ZIP • اختر طريقة المفتاح • ابدأ',
    uploadTitle:'رفع الملف',uploadSub:'ملف ZIP • الحد الأقصى 1GB',
    uzTitle:'اسحب الملف هنا أو انقر للاختيار',uzSub:'يقبل: .zip — الحد الأقصى: 1GB',
    keyTitle:'طريقة المفتاح',keyNone:'بدون مفتاح',keyNoneHint:'فك التشفير بدون CFX License',
    keyGrants:'ملف grants.txt',keyGrantsHint:'رفع ملف الصلاحيات',grantsBtn:'اختر grants.txt',
    decryptBtnTxt:'ابدأ فك التشفير',decryptResultTitle:'اكتمل فك التشفير!',
    copyBtn:'نسخ',dlBtn:'تحميل',
    gateTitle:'تسجيل الدخول مطلوب',gateSub:'سجّل دخولك عبر Discord للوصول إلى النظام',
    gateBtnTxt:'تسجيل الدخول عبر Discord',
    fixTitle:'إصلاح نماذج 3D',fixSub:'ارفع ZIP • كشف تلقائي • إصلاح الـ vertices',
    fixUploadTitle:'رفع ملف ZIP',fixUploadSub:'يحتوي على نماذج YDR/YFT/YDD • 1GB',
    fixUzTitle:'اسحب ملف ZIP هنا أو انقر للاختيار',fixUzSub:'يدعم: YDR • YFT • YDD',
    fixBtnTxt:'ابدأ إصلاح 3D',fixResultTitle:'اكتمل إصلاح 3D!',
    filesTitle:'ملفاتي',filesSub:'روابط التحميل النشطة',
    refreshBtn:'تحديث',filesEmpty:'انقر تحديث لتحميل الملفات',
    generalUploadTitle:'رفع ملف جديد',
    fileLoginMsg:'يجب تسجيل الدخول',fileErrMsg:'خطأ في تحميل الملفات',zipOnly:'يجب رفع ملف .zip',tooltipOpen:'فتح',tooltipCopy:'نسخ',
    thFile:'الملف',thType:'النوع',thSize:'الحجم',thDate:'التاريخ',thLink:'رابط',
    adminTitle:'لوحة الإدارة',adminSub:'تحكم كامل بالمنصة',
    noHistory:'لا يوجد سجل',
    online:'متصل',
    fixHowTitle:'كيف يعمل',
    fh1:'ارفع ZIP',fh1s:'ريسورس يحتوي نماذج تالفة',
    fh2:'كشف تلقائي',fh2s:'يجد YDR/YFT/YDD تلقائياً',
    fh3:'إصلاح كامل',fh3s:'إصلاح vertices وإعادة البناء',
    discordBtn:'انضم للسيرفر',
    footerTeam:'فريق المنصة',footerLimits:'حدود الخطط',
    footerCopy:'© 2025 Abuabdullaziz 3cc — جميع الحقوق محفوظة',
    footerDiscord:'انضم للسيرفر',
    copyUsername:'نسخ',
    fixedCredits:'رصيد ثابت — لا يتجدد',
    resetsIn:'تتجدد خلال',
    qwDecrypt:'فك التشفير',
    qwFix:'إصلاح 3D',
    yourProfile:'ملفي الشخصي',
    planLabel:'الخطة',
  },
  en:{
    navHome:'Home',navDecrypt:'Decrypt',navFix:'3D Fix',navFiles:'My Files',
    heroBadge:'v4.0 — System Online',heroTitle:'Decrypt & Fix\nFiveM Resources',
    heroSub:'Decrypt FiveM resources and fix 3D models fast and professionally.',
    heroBtn1:'Start Decrypting',heroBtn2:'3D Fix',heroBtn3:'My Files',
    stDecrypts:'Decrypts',stFixes:'3D Fixes',stUsers:'Users',stSize:'Storage',
    toolsTitle:'Main Tools',
    fc1Title:'Resource Decryption',fc1Desc:'Decrypt CFX Escrow encrypted FiveM resources. Supports grants files and keyless decryption.',
    fc2Title:'3D Model Fix',fc2Desc:'Auto-fix corrupted YDR/YFT/YDD files. Detect broken vertices and rebuild models.',
    howTitle:'How It Works',
    step1:'Login',step1s:'Sign in with your Discord account',
    step2:'Upload File',step2s:'Upload ZIP containing the resource',
    step3:'Auto Process',step3s:'System processes automatically in seconds',
    step4:'Download',step4s:'Direct download link ready instantly',
    plansTitle:'Plans & Pricing',
    planFreeName:'Free',planFreePeriod:'Forever',
    planWeekName:'Weekly',planWeekPeriod:'Per week',popularLabel:'Most Popular',
    planLifeName:'Lifetime',planLifePeriod:'One-time',
    pf1:'1 decrypt / day',pf2:'1 3D fix / day',pf3:'Priority processing',pf4:'Custom support',
    pw1:'10 decrypts / day',pw2:'10 3D fixes / day',pw3:'Priority processing',pw4:'Custom support',
    pl1:'Unlimited / day',pl2:'Unlimited 3D / day',pl3:'Highest priority',pl4:'24/7 custom support',
    planFreeBtn:'Start Free',planWeekBtn:'Get It',planLifeBtn:'Get It',
    dpTitle:'Decrypt Resource',dpSub:'Upload ZIP • Choose key method • Start',
    uploadTitle:'Upload File',uploadSub:'ZIP file • Max 1GB',
    uzTitle:'Drag file here or click to select',uzSub:'Accepts: .zip — Max: 1GB',
    keyTitle:'Key Method',keyNone:'No Key',keyNoneHint:'Decrypt without CFX License',
    keyGrants:'grants.txt File',keyGrantsHint:'Upload permissions file',grantsBtn:'Choose grants.txt',
    decryptBtnTxt:'Start Decryption',decryptResultTitle:'Decryption Complete!',
    copyBtn:'Copy',dlBtn:'Download',
    gateTitle:'Login Required',gateSub:'Login with Discord to access the system',
    gateBtnTxt:'Login with Discord',
    fixTitle:'Fix 3D Models',fixSub:'Upload ZIP • Auto-detect • Fix vertices',
    fixUploadTitle:'Upload ZIP File',fixUploadSub:'Contains YDR/YFT/YDD models • 1GB max',
    fixUzTitle:'Drag ZIP file here or click to select',fixUzSub:'Supports: YDR • YFT • YDD',
    fixBtnTxt:'Start 3D Fix',fixResultTitle:'3D Fix Complete!',
    filesTitle:'My Files',filesSub:'Active download links',
    refreshBtn:'Refresh',filesEmpty:'Click Refresh to load files',
    generalUploadTitle:'Upload New File',
    fileLoginMsg:'You must be logged in',fileErrMsg:'Error loading files',zipOnly:'Please upload a .zip file',tooltipOpen:'Open',tooltipCopy:'Copy',
    thFile:'File',thType:'Type',thSize:'Size',thDate:'Date',thLink:'Link',
    adminTitle:'Admin Panel',adminSub:'Full platform control',
    noHistory:'No history',
    online:'Online',
    fixHowTitle:'How It Works',
    fh1:'Upload ZIP',fh1s:'Resource with corrupted models',
    fh2:'Auto Detect',fh2s:'Finds YDR/YFT/YDD automatically',
    fh3:'Full Fix',fh3s:'Repair vertices & rebuild models',
    discordBtn:'Join Server',
    footerTeam:'Platform Team',footerLimits:'Plan Limits',
    footerCopy:'© 2025 Abuabdullaziz 3cc — All rights reserved',
    footerDiscord:'Join Server',
    copyUsername:'Copy',
    fixedCredits:'Fixed credits — no renewal',
    resetsIn:'Resets in',
    qwDecrypt:'Decrypt',
    qwFix:'3D Fix',
    yourProfile:'My Profile',
    planLabel:'Plan',
  },
  ru:{
    navHome:'Главная',navDecrypt:'Расшифровка',navFix:'3D Фикс',navFiles:'Мои файлы',
    heroBadge:'v4.0 — Система онлайн',heroTitle:'Расшифровка и исправление\nресурсов FiveM',
    heroSub:'Расшифровка ресурсов FiveM и исправление 3D-моделей быстро и профессионально.',
    heroBtn1:'Начать расшифровку',heroBtn2:'3D Фикс',heroBtn3:'Мои файлы',
    stDecrypts:'Расшифровок',stFixes:'3D Фиксов',stUsers:'Пользователей',stSize:'Хранилище',
    toolsTitle:'Основные инструменты',
    fc1Title:'Расшифровка ресурсов',fc1Desc:'Расшифровка ресурсов FiveM зашифрованных CFX Escrow.',
    fc2Title:'Исправление 3D моделей',fc2Desc:'Автоисправление повреждённых YDR/YFT/YDD файлов.',
    howTitle:'Как это работает',
    step1:'Войдите',step1s:'Войдите через аккаунт Discord',
    step2:'Загрузите файл',step2s:'Загрузите ZIP с ресурсом',
    step3:'Авто-обработка',step3s:'Система обрабатывает автоматически',
    step4:'Скачайте',step4s:'Прямая ссылка готова мгновенно',
    plansTitle:'Планы и цены',
    planFreeName:'Бесплатно',planFreePeriod:'Навсегда',
    planWeekName:'Недельный',planWeekPeriod:'На неделю',popularLabel:'Популярный',
    planLifeName:'Навсегда',planLifePeriod:'Единоразово',
    pf1:'1 расшифровка / день',pf2:'1 3D-фикс / день',pf3:'Приоритет обработки',pf4:'Поддержка',
    pw1:'10 расшифровок / день',pw2:'10 3D-фиксов / день',pw3:'Приоритет обработки',pw4:'Поддержка',
    pl1:'Безлимит / день',pl2:'Безлимит 3D / день',pl3:'Высший приоритет',pl4:'Поддержка 24/7',
    planFreeBtn:'Начать',planWeekBtn:'Получить',planLifeBtn:'Получить',
    dpTitle:'Расшифровать ресурс',dpSub:'Загрузите ZIP • Выберите метод ключа • Начните',
    uploadTitle:'Загрузить файл',uploadSub:'ZIP файл • Макс 1GB',
    uzTitle:'Перетащите файл или нажмите для выбора',uzSub:'Принимает: .zip — Макс: 1GB',
    keyTitle:'Метод ключа',keyNone:'Без ключа',keyNoneHint:'Расшифровка без CFX License',
    keyGrants:'Файл grants.txt',keyGrantsHint:'Загрузите файл разрешений',grantsBtn:'Выбрать grants.txt',
    decryptBtnTxt:'Начать расшифровку',decryptResultTitle:'Расшифровка завершена!',
    copyBtn:'Копировать',dlBtn:'Скачать',
    gateTitle:'Требуется вход',gateSub:'Войдите через Discord для доступа',
    gateBtnTxt:'Войти через Discord',
    fixTitle:'Исправить 3D модели',fixSub:'Загрузите ZIP • Авто-поиск • Исправление',
    fixUploadTitle:'Загрузить ZIP',fixUploadSub:'Содержит YDR/YFT/YDD модели • 1GB',
    fixUzTitle:'Перетащите ZIP или нажмите для выбора',fixUzSub:'Поддерживает: YDR • YFT • YDD',
    fixBtnTxt:'Начать 3D Фикс',fixResultTitle:'3D Фикс завершён!',
    filesTitle:'Мои файлы',filesSub:'Активные ссылки для скачивания',
    refreshBtn:'Обновить',filesEmpty:'Нажмите Обновить для загрузки',
    generalUploadTitle:'Загрузить новый файл',
    fileLoginMsg:'Необходимо войти в систему',fileErrMsg:'Ошибка загрузки файлов',zipOnly:'Пожалуйста, загрузите файл .zip',tooltipOpen:'Открыть',tooltipCopy:'Копировать',
    thFile:'Файл',thType:'Тип',thSize:'Размер',thDate:'Дата',thLink:'Ссылка',
    adminTitle:'Панель администратора',adminSub:'Полный контроль платформы',
    noHistory:'Нет истории',
    online:'Онлайн',
    fixHowTitle:'Как это работает',
    fh1:'Загрузите ZIP',fh1s:'Ресурс с повреждёнными моделями',
    fh2:'Авто-поиск',fh2s:'Находит YDR/YFT/YDD автоматически',
    fh3:'Полный фикс',fh3s:'Исправление vertices и перестройка',
    discordBtn:'Вступить',
    footerTeam:'Команда платформы',footerLimits:'Лимиты планов',
    footerCopy:'© 2025 Abuabdullaziz 3cc — Все права защищены',
    footerDiscord:'Вступить',
    copyUsername:'Копировать',
    fixedCredits:'Фиксированный баланс',
    resetsIn:'Сброс через',
    qwDecrypt:'Расшифровка',
    qwFix:'3D Фикс',
    yourProfile:'Мой профиль',
    planLabel:'План',
  }
};

// ── APPLY LANGUAGE ────────────────────────────────
function applyLang() {
  const t = T[currentLang];
  const dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = currentLang === 'ar' ? 'ar' : 'en';
  document.documentElement.dir = dir;
  const set = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };
  set('nt-home', t.navHome);
  set('nt-decrypt', t.navDecrypt);
  set('nt-fix', t.navFix);
  set('nt-files', t.navFiles);
  set('hero-live-txt', t.heroBadge);
  const heroTitleEl = document.getElementById('hero-title');
  if (heroTitleEl) heroTitleEl.innerHTML = (t.heroTitle || '').replace(/\n/g, '<br>');
  set('hero-sub', t.heroSub);
  set('hb1', t.heroBtn1);
  set('hb2', t.heroBtn2);
  set('hb3', t.heroBtn3);
  set('stl1', t.stDecrypts);
  set('stl2', t.stFixes);
  set('stl3', t.stUsers);
  set('stl4', t.stSize);
  set('tools-t', t.toolsTitle);
  set('fc1t', t.fc1Title);
  set('fc1d', t.fc1Desc);
  set('fc2t', t.fc2Title);
  set('fc2d', t.fc2Desc);
  set('how-t', t.howTitle);
  set('s1t', t.step1);set('s1d', t.step1s);
  set('s2t', t.step2);set('s2d', t.step2s);
  set('s3t', t.step3);set('s3d', t.step3s);
  set('s4t', t.step4);set('s4d', t.step4s);
  set('plans-t', t.plansTitle);
  set('pn-free', t.planFreeName);set('pp-free', t.planFreePeriod);
  set('pn-week', t.planWeekName);set('pp-week', t.planWeekPeriod);
  set('pop-lbl', t.popularLabel);
  set('pn-life', t.planLifeName);set('pp-life', t.planLifePeriod);
  set('pf1', t.pf1);set('pf2', t.pf2);set('pf3', t.pf3);set('pf4', t.pf4);
  set('pw1', t.pw1);set('pw2', t.pw2);set('pw3', t.pw3);set('pw4', t.pw4);
  set('pl1', t.pl1);set('pl2', t.pl2);set('pl3', t.pl3);set('pl4', t.pl4);
  set('pb-free', t.planFreeBtn);set('pb-week', t.planWeekBtn);set('pb-life', t.planLifeBtn);
  set('d-ptitle', t.dpTitle);set('d-psub', t.dpSub);
  set('d-uptit', t.uploadTitle);set('d-upsub', t.uploadSub);
  set('d-uztit', t.uzTitle);set('d-uzsub', t.uzSub);
  set('d-keytit', t.keyTitle);
  set('kn-none', t.keyNone);set('kh-none', t.keyNoneHint);
  set('kn-grants', t.keyGrants);set('kh-grants', t.keyGrantsHint);
  set('grants-btn', t.grantsBtn);
  set('d-actlbl', t.decryptBtnTxt);set('d-restit', t.decryptResultTitle);
  set('d-copylbl', t.copyBtn);set('d-dllbl', t.dlBtn);
  set('dg-title', t.gateTitle);set('dg-sub', t.gateSub);set('dg-btn', t.gateBtnTxt);
  set('f-ptitle', t.fixTitle);set('f-psub', t.fixSub);
  set('f-uptit', t.fixUploadTitle);set('f-upsub', t.fixUploadSub);
  set('f-uztit', t.fixUzTitle);set('f-uzsub', t.fixUzSub);
  set('f-actlbl', t.fixBtnTxt);set('f-restit', t.fixResultTitle);
  set('f-copylbl', t.copyBtn);set('f-dllbl', t.dlBtn);
  set('fg-title', t.gateTitle);set('fg-sub', t.gateSub);set('fg-btn', t.gateBtnTxt);
  set('files-ptit', t.filesTitle);set('files-psub', t.filesSub);
  set('refresh-t', t.refreshBtn);set('files-empty', t.filesEmpty);
  set('gen-uptit', t.generalUploadTitle);
  set('adm-tit', t.adminTitle);set('adm-sub', t.adminSub);
  set('no-hist', t.noHistory);
  set('ob-txt', t.online);
  set('logo-sub', 'DECRYPT PLATFORM');
  // Fix-how section (was hardcoded Arabic)
  set('fix-how-t', t.fixHowTitle);
  set('fh1', t.fh1);set('fh1s', t.fh1s);
  set('fh2', t.fh2);set('fh2s', t.fh2s);
  set('fh3', t.fh3);set('fh3s', t.fh3s);
  // login-topbar-txt may be already rendered via renderLoggedOut, refresh if visible
  const ltxt = document.getElementById('login-topbar-txt');
  if (ltxt) ltxt.textContent = currentLang === 'ar' ? 'تسجيل الدخول' : currentLang === 'en' ? 'Login' : 'Войти';
  // Update footer user profile lang if visible
  const _fpName = document.getElementById('fp-plan-label');
  if (_fpName) _fpName.textContent = (T[currentLang]||T['en']).planLabel || 'Plan';
  // Footer translations
  set('ft-team-title', t.footerTeam);
  set('ft-limits-title', t.footerLimits);
  set('ft-copy', t.footerCopy);
  set('ft-discord-txt', t.footerDiscord);
}

function cycleLang() {
  const order = ['ar','en','ru'];
  const idx = order.indexOf(currentLang);
  currentLang = order[(idx + 1) % 3];
  localStorage.setItem('lang', currentLang);
  applyLang();
  if (_uploadLimitBytes !== null) _loadUploadLimit();
  loadPlanLimits();
  showToast('info', currentLang === 'ar' ? 'العربية' : currentLang === 'en' ? 'English' : 'Русский');
}

// ── CURSOR ────────────────────────────────────────
(function initCursor() {
  const ring = document.getElementById('cr');
  const dot = document.getElementById('cd');
  if (!ring || !dot) return;
  let mx=0,my=0,rx=0,ry=0,dx=0,dy=0;
  document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
  function animate() {
    rx += (mx-rx)*.15; ry += (my-ry)*.15;
    dx += (mx-dx)*.25; dy += (my-dy)*.25;
    ring.style.left = rx+'px'; ring.style.top = ry+'px';
    dot.style.left = dx+'px'; dot.style.top = dy+'px';
    requestAnimationFrame(animate);
  }
  animate();
  const sel = 'a,button,.nav-item,.plan-card,.feature-card,.lang-btn-card,.upload-zone,.key-method,.icon-btn,input,select,.toggle-sw';
  document.addEventListener('mouseover', e => { if(e.target.closest(sel)){ ring.classList.add('hov'); dot.classList.add('hov'); }});
  document.addEventListener('mouseout', e => { if(e.target.closest(sel)){ ring.classList.remove('hov'); dot.classList.remove('hov'); }});
  document.addEventListener('mousedown', () => ring.classList.add('clk'));
  document.addEventListener('mouseup', () => ring.classList.remove('clk'));
})();

// ── PARTICLES ────────────────────────────────────
(function initBg() {
  const c = document.getElementById('bg-canvas');
  if (!c) return;
  const ctx = c.getContext('2d');
  let W, H, pts = [];
  const colors = ['rgba(108,99,255,','rgba(0,212,212,','rgba(167,139,250,'];
  function resize() { W = c.width = window.innerWidth; H = c.height = window.innerHeight; }
  function mk() { return {x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,r:Math.random()*1.5+.5,c:colors[Math.floor(Math.random()*colors.length)],a:Math.random()*.35+.1}; }
  resize(); pts = Array.from({length:100}, mk);
  function draw() {
    ctx.clearRect(0,0,W,H);
    pts.forEach((p,i) => {
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>W) p.vx*=-1;
      if(p.y<0||p.y>H) p.vy*=-1;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=p.c+p.a+')'; ctx.fill();
      for(let j=i+1;j<pts.length;j++){
        const dx=p.x-pts[j].x,dy=p.y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<100){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(108,99,255,${(1-d/100)*.08})`;ctx.lineWidth=.6;ctx.stroke();}
      }
    });
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', resize);
  draw();
})();

// ── TOPBAR SCROLL ─────────────────────────────────
window.addEventListener('scroll', () => {
  const tb = document.getElementById('topbar');
  if(tb) tb.classList.toggle('scrolled', window.scrollY > 20);
}, {passive:true});

// ── TABS ─────────────────────────────────────────
function showTab(name) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.npill').forEach(b => b.classList.remove('active'));
  const tab = document.getElementById('tab-'+name);
  const btn = document.getElementById('nb-'+name);
  if (tab) tab.classList.add('active');
  if (btn) btn.classList.add('active');
  if (name === 'files') loadFiles();
  if (name === 'admin') loadAdminStats();
  window.scrollTo({top:0, behavior:'smooth'});
}

// ── AUTH ──────────────────────────────────────────
async function checkAuth() {
  try {
    const r = await fetch('/api/me');
    if (!r.ok) { renderLoggedOut(); return; }
    const u = await r.json();
    if (!u || !u.id) { renderLoggedOut(); return; }
    currentUser = u;
    renderLoggedIn(u);
    loadPlanInfo();
    loadHistory();
    loadFixHistory();
    if (u.is_admin) {
      document.getElementById('admin-nav').style.display = 'block';
    }
  } catch(e) {
    renderLoggedOut();
  }
}

function renderLoggedIn(u) {
  const area = document.getElementById('user-area');
  const badge = u.plan_name || 'Free';
  const bl = badge.toLowerCase().replace(/[^\w\s]/g, '');
  const cls = (bl.includes('lifetime') || bl.includes('مدى') || bl.includes('month') || bl.includes('شهر'))
    ? 'gold'
    : (bl.includes('staff') || bl.includes('owner'))
    ? 'staff'
    : (bl.includes('week') || bl.includes('booster') || bl.includes('boost') || bl.includes('day'))
    ? 'premium'
    : '';
  area.innerHTML = `<div style="display:flex;align-items:center;gap:8px">
    <div class="upill" onclick="showTab('files')">
      <img src="${u.avatar ? u.avatar.replace('?size=128','?size=32') : 'https://cdn.discordapp.com/embed/avatars/0.png'}" alt="" style="width:26px;height:26px;border-radius:50%;object-fit:cover;flex-shrink:0;" onerror="this.src='https://cdn.discordapp.com/embed/avatars/0.png'">
      <span class="un">${escHtml(u.username||'—')}</span>
      <span class="plan-chip ${cls}">${escHtml(badge)}</span>
    </div>
    <button class="logout-btn" onclick="doLogout()" title="Logout"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg></button>
  </div>`;
  // Show main panels, hide gates
  const ids = ['dgate','fgate'];
  const mids = ['dmain','fmain'];
  ids.forEach(id => { const el=document.getElementById(id); if(el) el.style.display='none'; });
  mids.forEach(id => { const el=document.getElementById(id); if(el) el.style.display='block'; });
  const genUp = document.getElementById('gen-up-section');
  if (genUp) genUp.style.display = 'block';
  // Show user profile card in footer
  _renderFooterProfile(u);
  // Load and display upload size limit for this user's plan
  _loadUploadLimit();
}

let _uploadLimitBytes = null;
async function _loadUploadLimit() {
  try {
    const r = await fetch('/api/plan/upload-limit');
    if (!r.ok) return;
    const d = await r.json();
    _uploadLimitBytes = (d.upload_limit === -1) ? Infinity : d.upload_limit;
    const unlimitedLbl = currentLang === 'ar' ? '∞ غير محدود' : currentLang === 'en' ? '∞ Unlimited' : '∞ Без лимита';
    const fmt = (d.upload_limit === -1) ? unlimitedLbl : formatBytes(d.upload_limit);
    const el = document.getElementById('gen-uplimit');
    if (el) {
      const label = currentLang === 'ar' ? 'الحد الأقصى لكل ملف' : currentLang === 'en' ? 'Max file size' : 'Макс. размер файла';
      el.textContent = `${label}: ${fmt}`;
    }
    // Replace hardcoded "1GB" placeholders in decrypt/fix upload zones with the user's actual limit
    ['d-upsub','d-uzsub','f-upsub','f-uzsub'].forEach(id => {
      const node = document.getElementById(id);
      if (node) node.textContent = node.textContent.replace(/1\s*GB/gi, fmt);
    });
  } catch(e) {}
}

function _renderFooterProfile(u) {
  const fp = document.getElementById('footer-user-profile');
  if (!fp) return;
  const _t = T[currentLang] || T['en'];
  const badge = u.plan_name || 'Free';
  const bl = badge.toLowerCase().replace(/[^\w\s]/g, '');
  const cls = (bl.includes('lifetime')||bl.includes('مدى')||bl.includes('month')||bl.includes('شهر'))
    ? 'gold' : (bl.includes('staff')||bl.includes('owner')) ? 'staff'
    : (bl.includes('week')||bl.includes('booster')||bl.includes('day')) ? 'premium' : '';

  const displayName = u.display_name || u.global_name || u.username || '—';
  const bannerStyle = u.banner
    ? `background-image:url('${u.banner}')`
    : (u.accent_color != null ? `background-color:#${u.accent_color.toString(16).padStart(6,'0')}` : '');

  fp.innerHTML = `
    <div class="fp-banner" style="${bannerStyle}"></div>
    <div class="fp-body">
      <div class="fp-avatar-wrap">
        <img class="fp-avatar" src="${u.avatar || 'https://cdn.discordapp.com/embed/avatars/0.png'}"
             onerror="this.src='https://cdn.discordapp.com/embed/avatars/0.png'" alt="">
      </div>
      <div class="fp-info">
        <div class="fp-name">${escHtml(displayName)}</div>
        <div class="fp-username">@${escHtml(u.username || '—')}</div>
        <span class="plan-chip ${cls}" style="margin-top:4px;font-size:10px">${escHtml(badge)}</span>
      </div>
      <div class="fp-stats">
        <div class="fp-stat"><span class="fp-stat-n" id="fp-d-used">—</span><span class="fp-stat-l">🔓 ${_t.qwDecrypt||'Decrypt'}</span></div>
        <div class="fp-stat"><span class="fp-stat-n" id="fp-f-used">—</span><span class="fp-stat-l">🔧 ${_t.qwFix||'Fix'}</span></div>
      </div>
    </div>`;
  fp.style.display = 'block';
  // Fill stats from plan info
  fetch('/api/me').then(r=>r.json()).then(me => {
    const dU = document.getElementById('fp-d-used');
    const fU = document.getElementById('fp-f-used');
    if (dU && me.decryptUsed !== undefined) dU.textContent = me.decryptUsed ?? '—';
    if (fU && me.fixUsed    !== undefined) fU.textContent = me.fixUsed    ?? '—';
  }).catch(()=>{});
}

function renderLoggedOut() {
  const area = document.getElementById('user-area');
  // Remove user profile card from footer if logged out
  const fp = document.getElementById('footer-user-profile');
  if (fp) fp.style.display = 'none';
  area.innerHTML = `<button class="login-topbar-btn" onclick="window.location.href='/login.html'">
    <svg width="16" height="12" viewBox="0 0 71 55" fill="none"><path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.44077 45.4204 0.52529C44.7963 1.62317 44.105 3.05799 43.6209 4.19255C38.1637 3.38014 32.7345 3.38014 27.3892 4.19255C26.905 3.03257 26.1886 1.62317 25.5617 0.52529C25.5141 0.44359 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.292408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" fill="white"/></svg>
    <span id="login-topbar-txt">${currentLang === 'ar' ? 'تسجيل الدخول' : currentLang === 'en' ? 'Login' : 'Войти'}</span>
  </button>`;
  // Show gates, hide main panels
  ['dgate','fgate'].forEach(id => { const el=document.getElementById(id); if(el) el.style.display='block'; });
  ['dmain','fmain'].forEach(id => { const el=document.getElementById(id); if(el) el.style.display='none'; });
  const genUp = document.getElementById('gen-up-section');
  if (genUp) genUp.style.display = 'none';
}

async function doLogout() {
  try { await fetch('/api/logout', {method:'POST'}); } catch(_) {}
  currentUser = null;
  renderLoggedOut();
  showTab('home');
  showToast('info', currentLang === 'ar' ? 'تم تسجيل الخروج' : currentLang === 'en' ? 'Signed out' : 'Выход выполнен');
}

// ── STATS ─────────────────────────────────────────
async function loadStats() {
  try {
    const r = await fetch('/api/stats');
    if (!r.ok) return;
    const d = await r.json();
    animNum('st1', d.total_decrypts || 0);
    animNum('st2', d.total_fixes || 0);
    animNum('st3', d.total_users || 0);
    // API returns storage_used as a formatted string (e.g. "1.2 GB")
    const el = document.getElementById('st4');
    if (el) el.textContent = d.storage_used || '0 B';
  } catch(e) {}
}

function animNum(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  let cur = 0; const dur = 1200; const step = target / (dur / 16);
  const t = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.textContent = Math.floor(cur).toLocaleString();
    if (cur >= target) clearInterval(t);
  }, 16);
}

// ── PLAN INFO ─────────────────────────────────────
let _quotaCache = null;

function buildQuotaBarHTML(remaining, limit, color) {
  if (limit === 'Unlimited' || remaining === 'Unlimited') {
    return `<div class="qbar-wrap"><div class="qbar-fill" style="width:100%;background:${color}"></div></div><span class="qbar-txt">∞ Unlimited</span>`;
  }
  const pct = limit > 0 ? Math.min((remaining / limit) * 100, 100) : 0;
  const barColor = pct > 50 ? color : pct > 20 ? '#f59e0b' : '#ef4444';
  return `<div class="qbar-wrap"><div class="qbar-fill" style="width:${pct}%;background:${barColor}"></div></div><span class="qbar-txt">${remaining}/${limit}</span>`;
}

async function loadPlanInfo() {
  try {
    const r = await fetch('/api/me/quota');
    if (!r.ok) return;
    const d = await r.json();
    _quotaCache = d;
    const name  = d.plan_name || 'Free';
    const dRem  = d.decrypt_remaining;
    const fRem  = d.fix_remaining;
    const dLim  = d.decrypt_limit === -1 ? 'Unlimited' : (d.decrypt_limit ?? 1);
    const fLim  = d.fix_limit     === -1 ? 'Unlimited' : (d.fix_limit     ?? 1);
    const dBar  = buildQuotaBarHTML(dRem, dLim, 'var(--teal)');
    const fBar  = buildQuotaBarHTML(fRem, fLim, 'var(--orange)');

    ['d','f'].forEach(px => {
      const nameEl = document.getElementById(px+'-planname');
      const limEl  = document.getElementById(px+'-planlim');
      if (nameEl) nameEl.textContent = name;
      if (limEl) {
        const isDecrypt = px === 'd';
        limEl.innerHTML =
          `<div class="qrow"><span class="qlbl">${T[currentLang].stDecrypts||'Decrypts'}</span>${dBar}</div>` +
          `<div class="qrow"><span class="qlbl">${T[currentLang].stFixes||'Fixes'}</span>${fBar}</div>`;
      }
    });

    const badge = document.getElementById('plan-up-badge');
    if (badge) badge.textContent = `${name}  •  ${dRem === 'Unlimited' ? '∞' : dRem} decrypt${dRem!==1?'s':''} left`;

    // Update quota widget if visible
    _renderQuotaWidget(d);
  } catch(e) {}
}

function _renderQuotaWidget(d) {
  const w = document.getElementById('quota-widget');
  if (!w || !d) return;
  const now = Date.now() / 1000;
  const secLeft = d.midnight_ts ? (d.midnight_ts - now) : 0;
  const hLeft = Math.max(0, Math.floor(secLeft / 3600));
  const mLeft = Math.max(0, Math.floor((secLeft % 3600) / 60));
  const _tqw = T[currentLang] || T['en'];
  const resetLine = d.is_web_account
    ? `<div class="qw-reset"><i class="fa fa-infinity"></i> ${_tqw.fixedCredits||'Fixed credits'}</div>`
    : `<div class="qw-reset"><i class="fa fa-clock"></i> ${_tqw.resetsIn||'Resets in'} ${hLeft}h ${mLeft}m</div>`;
  const dRem = d.decrypt_remaining === 'Unlimited' ? '∞' : d.decrypt_remaining;
  const fRem = d.fix_remaining     === 'Unlimited' ? '∞' : d.fix_remaining;
  const dLim = d.decrypt_limit === 'Unlimited' || d.decrypt_limit === -1 ? '∞' : d.decrypt_limit;
  const fLim = d.fix_limit     === 'Unlimited' || d.fix_limit     === -1 ? '∞' : d.fix_limit;
  w.innerHTML = `
    <div class="qw-title"><i class="fa fa-battery-three-quarters" style="color:var(--teal)"></i> ${d.plan_name||'Free'}</div>
    <div class="qw-row">
      <span class="qw-lbl">🔓 ${_tqw.qwDecrypt||'Decrypt'}</span>
      <span class="qw-val">${dRem} / ${dLim}</span>
    </div>
    <div class="qw-barwrap"><div class="qw-bar" style="width:${dLim==='∞'?100:(dLim>0&&typeof dRem==='number'?Math.min(Math.round((dRem/dLim)*100),100):0)}%;background:var(--teal)"></div></div>
    <div class="qw-row">
      <span class="qw-lbl">🔧 ${_tqw.qwFix||'Fix'}</span>
      <span class="qw-val">${fRem} / ${fLim}</span>
    </div>
    <div class="qw-barwrap"><div class="qw-bar" style="width:${fLim==='∞'?100:(fLim>0&&typeof fRem==='number'?Math.min(Math.round((fRem/fLim)*100),100):0)}%;background:var(--orange)"></div></div>
    ${resetLine}`;
}

// ── FILE HANDLING ─────────────────────────────────
function _checkFileSizeLimit(file) {
  if (_uploadLimitBytes && isFinite(_uploadLimitBytes) && file.size > _uploadLimitBytes) {
    const msg = currentLang === 'ar'
      ? `حجم الملف (${formatBytes(file.size)}) يتجاوز حد خطتك (${formatBytes(_uploadLimitBytes)})`
      : currentLang === 'en'
      ? `File size (${formatBytes(file.size)}) exceeds your plan limit (${formatBytes(_uploadLimitBytes)})`
      : `Размер файла (${formatBytes(file.size)}) превышает лимит вашего плана (${formatBytes(_uploadLimitBytes)})`;
    showToast('error', msg);
    return false;
  }
  return true;
}

function onFile(input, type) {
  const file = input.files[0];
  if (!file) return;
  if (!_checkFileSizeLimit(file)) { input.value = ''; return; }
  if (type === 'd') {
    decryptFile = file;
    showFileChosen('d', file);
    document.getElementById('d-actbtn').disabled = false;
  } else {
    fixFile = file;
    showFileChosen('f', file);
    document.getElementById('f-actbtn').disabled = false;
  }
}
// keep old name as alias
function handleFile(input, type) { onFile(input, type === 'decrypt' ? 'd' : 'f'); }

function showFileChosen(type, file) {
  document.getElementById(type+'-fname').textContent = file.name;
  document.getElementById(type+'-fsize').textContent = formatBytes(file.size);
  document.getElementById(type+'-chosen').classList.add('show');
}

function clearFile(type) {
  if (type === 'd' || type === 'decrypt') {
    decryptFile = null;
    document.getElementById('d-file').value = '';
    document.getElementById('d-chosen').classList.remove('show');
    document.getElementById('d-actbtn').disabled = true;
    document.getElementById('d-result').classList.remove('show');
    document.getElementById('d-prog').classList.remove('show');
  } else {
    fixFile = null;
    document.getElementById('f-file').value = '';
    document.getElementById('f-chosen').classList.remove('show');
    document.getElementById('f-actbtn').disabled = true;
    document.getElementById('f-result').classList.remove('show');
    document.getElementById('f-prog').classList.remove('show');
  }
}

function onDrop(e, type) {
  e.preventDefault();
  e.stopPropagation();
  document.getElementById(type === 'd' ? 'dzone' : 'fzone').classList.remove('drag');
  const file = e.dataTransfer?.files?.[0];
  if (!file || !file.name.endsWith('.zip')) { showToast('error', T[currentLang].zipOnly || 'ZIP only'); return; }
  if (!_checkFileSizeLimit(file)) return;
  if (type === 'd') { decryptFile = file; showFileChosen('d', file); document.getElementById('d-actbtn').disabled = false; }
  else { fixFile = file; showFileChosen('f', file); document.getElementById('f-actbtn').disabled = false; }
}
function handleDrop(e, type) { onDrop(e, type === 'decrypt' ? 'd' : 'f'); }

function onDover(e, type) {
  e.preventDefault();
  document.getElementById(type === 'd' ? 'dzone' : 'fzone').classList.add('drag');
}
function handleDragover(e, type) { onDover(e, type === 'decrypt' ? 'd' : 'f'); }

function onDleave(type) {
  document.getElementById(type === 'd' ? 'dzone' : 'fzone').classList.remove('drag');
}
function handleDragleave(type) { onDleave(type === 'decrypt' ? 'd' : 'f'); }

function onGrants(input) {
  grantsFile = input.files[0];
  document.getElementById('grants-chosen').textContent = grantsFile ? grantsFile.name : '';
}
function handleGrants(input) { onGrants(input); }

function selKey(method, el) {
  selectedKeyMethod = method;
  document.querySelectorAll('.km').forEach(m => m.classList.remove('sel'));
  if (el) el.classList.add('sel');
  // cfx-inp = wrapper div, cfx-val = actual input
  const cfxWrap = document.getElementById('cfx-inp');
  const grantsWrap = document.getElementById('grants-inp');
  if (cfxWrap) cfxWrap.classList.toggle('show', method === 'cfx');
  if (grantsWrap) grantsWrap.classList.toggle('show', method === 'grants');
}
function selectKey(method) { selKey(method, event?.currentTarget); }

// ── DECRYPT ───────────────────────────────────────
async function startDecrypt() {
  if (!decryptFile) return;
  // Validate CFX key if selected
  if (selectedKeyMethod === 'cfx') {
    const cfxVal = document.getElementById('cfx-val')?.value?.trim();
    if (!cfxVal) {
      showToast('error', currentLang==='ar' ? 'الرجاء إدخال CFX License Key' : currentLang==='en' ? 'Please enter CFX License Key' : 'Введите CFX License Key');
      return;
    }
  }
  // Validate grants file if selected
  if (selectedKeyMethod === 'grants' && !grantsFile) {
    showToast('error', currentLang==='ar' ? 'الرجاء رفع ملف grants.txt' : currentLang==='en' ? 'Please upload grants.txt file' : 'Загрузите файл grants.txt');
    return;
  }
  const btn = document.getElementById('d-actbtn');
  btn.disabled = true;
  document.getElementById('d-prog').classList.add('show');
  document.getElementById('d-result').classList.remove('show');
  document.getElementById('d-log').innerHTML = '';
  setProgress('d-bar','d-pct','d-stage', 5, currentLang==='ar'?'جارٍ الرفع...':'Uploading...');
  addLog('d-log','info', currentLang==='ar'?'→ جارٍ رفع ومعالجة الملف...':'→ Uploading & processing file...');
  try {
    // ── إرسال كل شيء في طلب واحد multipart لـ /api/decrypt ──
    const fd = new FormData();
    fd.append('file', decryptFile, decryptFile.name);
    fd.append('keyMethod', selectedKeyMethod);
    if (selectedKeyMethod === 'cfx') {
      fd.append('cfxKey', document.getElementById('cfx-val')?.value || '');
    }
    if (selectedKeyMethod === 'grants' && grantsFile) {
      fd.append('grantsFile', grantsFile, grantsFile.name);
    }

    setProgress('d-bar','d-pct','d-stage', 15, currentLang==='ar'?'جارٍ الرفع...':'Uploading...');

    const decR = await fetch('/api/decrypt', { method: 'POST', body: fd });
    if (!decR.ok) {
      const err = await decR.json().catch(()=>({}));
      throw new Error(err.error || 'Decrypt failed');
    }
    const dec = await decR.json();
    setProgress('d-bar','d-pct','d-stage', 30, currentLang==='ar'?'جارٍ فك التشفير...':'Decrypting...');
    addLog('d-log','info', currentLang==='ar'?'→ جارٍ فك التشفير...':'→ Decrypting...');
    decryptProgressToken = dec.token || dec.progressToken;
    await pollProgress('decrypt', decryptProgressToken);
  } catch(e) {
    addLog('d-log','error', '✗ ' + e.message);
    setProgress('d-bar','d-pct','d-stage', 0, currentLang==='ar'?'فشل':'Failed');
    showToast('error', e.message);
    btn.disabled = false;
  }
}

async function startFix() {
  if (!fixFile) return;
  const btn = document.getElementById('f-actbtn');
  btn.disabled = true;
  document.getElementById('f-prog').classList.add('show');
  document.getElementById('f-result').classList.remove('show');
  document.getElementById('f-log').innerHTML = '';
  setProgress('f-bar','f-pct','f-stage', 5, currentLang==='ar'?'جارٍ الرفع...':'Uploading...');
  addLog('f-log','info', currentLang==='ar'?'→ جارٍ رفع ومعالجة الملف...':'→ Uploading & processing file...');
  try {
    const fd = new FormData();
    fd.append('file', fixFile, fixFile.name);
    const fixR = await fetch('/api/fix', { method: 'POST', body: fd });
    if (!fixR.ok) {
      const err = await fixR.json().catch(()=>({}));
      throw new Error(err.error || 'Fix failed');
    }
    const fix = await fixR.json();
    setProgress('f-bar','f-pct','f-stage', 20, currentLang==='ar'?'جارٍ الإصلاح...':'Fixing models...');
    addLog('f-log','info', currentLang==='ar'?'→ جارٍ إصلاح النماذج...':'→ Fixing models...');
    fixProgressToken = fix.token || fix.progressToken;
    await pollProgress('fix', fixProgressToken);
  } catch(e) {
    addLog('f-log','error', '✗ ' + e.message);
    setProgress('f-bar','f-pct','f-stage', 0, currentLang==='ar'?'فشل':'Failed');
    showToast('error', e.message);
    btn.disabled = false;
  }
}

async function pollProgress(type, token) {
  const isDecrypt = type === 'decrypt';
  const prefix = isDecrypt ? 'd' : 'f';
  const resultId = isDecrypt ? 'd-result' : 'f-result';
  const urlId = isDecrypt ? 'd-url' : 'f-url';
  const dlId = isDecrypt ? 'd-dl' : 'f-dl';
  const btnId = isDecrypt ? 'd-actbtn' : 'f-actbtn';
  const endpoint = isDecrypt ? '/api/decrypt/progress/' : '/api/fix/progress/';
  let tries = 0;
  while (tries < 600) {
    tries++;
    await sleep(1500);
    try {
      const r = await fetch(endpoint + token);
      if (!r.ok) continue;
      const d = await r.json();
      if (d.pct !== undefined) setProgress(prefix+'-bar', prefix+'-pct', prefix+'-stage', d.pct, d.stage || '');
      if (d.logs) d.logs.forEach(l => addLog(prefix+'-log', l.type || 'info', l.msg));
      if (d.status === 'done' || d.pct >= 100) {
        setProgress(prefix+'-bar', prefix+'-pct', prefix+'-stage', 100, '✓ Done');
        if (d.url || d.downloadUrl) {
          const url = d.url || d.downloadUrl;
          const urlEl = document.getElementById(urlId);
          const dlEl = document.getElementById(dlId);
          if (urlEl) { urlEl.href = url; urlEl.textContent = url; }
          if (dlEl) dlEl.href = url;
          document.getElementById(resultId).classList.add('show');
          showToast('success', isDecrypt ? (currentLang==='ar'?'اكتمل فك التشفير!':'Decryption complete!') : (currentLang==='ar'?'اكتمل الإصلاح!':'Fix complete!'));
        }
        document.getElementById(btnId).disabled = false;
        // Refresh quota after operation completes
        await loadPlanInfo();
        if (isDecrypt) loadHistory(); else loadFixHistory();
        return;
      }
      if (d.status === 'error') {
        addLog(prefix+'-log','error', '✗ ' + (d.error || 'Error'));
        showToast('error', d.error || 'Failed');
        document.getElementById(btnId).disabled = false;
        return;
      }
    } catch(e) {}
  }
  const toMsg = currentLang==='ar' ? 'انتهت مهلة العملية، حاول مجدداً' : currentLang==='ru' ? 'Время ожидания истекло, попробуйте снова' : 'Operation timed out, please try again';
  showToast('error', toMsg);
  document.getElementById(btnId).disabled = false;
}

function setProgress(barId, pctId, stageId, pct, stage) {
  const bar = document.getElementById(barId);
  const pctEl = document.getElementById(pctId);
  const stEl = document.getElementById(stageId);
  if (bar) bar.style.width = pct + '%';
  if (pctEl) pctEl.textContent = pct + '%';
  if (stEl) stEl.textContent = stage;
}

function addLog(logId, type, msg) {
  const log = document.getElementById(logId);
  if (!log) return;
  const line = document.createElement('div');
  line.className = 'log-l ' + (type==='info'?'inf':type==='error'?'err':type);
  line.textContent = msg;
  log.appendChild(line);
  log.scrollTop = log.scrollHeight;
}

function copyUrl(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const text = (el.href && el.href !== '#' && el.href !== window.location.href) ? el.href : el.textContent.trim();
  if (!text || text === '#' || text === '—') return;
  // Try modern clipboard API first
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => showToast('success', currentLang==='ar'?'تم النسخ!':currentLang==='en'?'Copied!':'Скопировано!'))
      .catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    if (ok) showToast('success', currentLang==='ar'?'تم النسخ!':currentLang==='en'?'Copied!':'Скопировано!');
    else showToast('error', currentLang==='ar'?'انسخ يدوياً':'Copy manually');
  } catch(e) {
    showToast('error', currentLang==='ar'?'انسخ يدوياً':'Copy manually');
  }
}

// ── HISTORY ───────────────────────────────────────
async function loadHistory() {
  try {
    const r = await fetch('/api/history');
    if (!r.ok) return;
    const d = await r.json();
    const list = document.getElementById('d-hist');
    if (!list) return;
    if (!d.length) { list.innerHTML = `<div class="empty-s"><i class="fa fa-inbox"></i><span>${T[currentLang].noHistory}</span></div>`; return; }
    list.innerHTML = d.slice(0,8).map(item => `
      <div class="hist-item">
        <div class="hist-icon" style="background:rgba(108,99,255,0.1);color:var(--indigo-l)"><i class="fa fa-unlock"></i></div>
        <div class="hist-name">${escHtml(item.filename || item.file_name || '—')}</div>
        <div class="hist-time">${timeAgo(item.created_at)}</div>
        ${(item.url||item.download_url) ? `<a href="${escHtml(item.url||item.download_url)}" target="_blank" class="hist-dl"><i class="fa fa-download"></i></a>` : ''}
      </div>`).join('');
  } catch(e) {}
}

async function loadFixHistory() {
  try {
    const r = await fetch('/api/history?type=fix');
    if (!r.ok) return;
    const d = await r.json();
    const list = document.getElementById('f-hist');
    if (!list) return;
    if (!d.length) { list.innerHTML = `<div class="empty-s"><i class="fa fa-cube"></i><span>${T[currentLang].noHistory}</span></div>`; return; }
    list.innerHTML = d.slice(0,8).map(item => `
      <div class="hist-item">
        <div class="hist-icon" style="background:rgba(249,115,22,0.1);color:var(--orange-l)"><i class="fa fa-cube"></i></div>
        <div class="hist-name">${escHtml(item.filename || item.file_name || '—')}</div>
        <div class="hist-time">${timeAgo(item.created_at)}</div>
        ${(item.url||item.download_url) ? `<a href="${escHtml(item.url||item.download_url)}" target="_blank" class="hist-dl"><i class="fa fa-download"></i></a>` : ''}
      </div>`).join('');
  } catch(e) {}
}

// ── FILES TAB ─────────────────────────────────────
async function loadFiles() {
  try {
    const r = await fetch('/api/files');
    if (!r.ok) {
      if (r.status === 401) {
        document.getElementById('files-wrap').innerHTML = '<div class="empty-state" style="padding:56px"><i class="fa fa-lock"></i>' + T[currentLang].fileLoginMsg + '</div>';
        return;
      }
    }
    const d = await r.json();
    const wrap = document.getElementById('files-wrap');
    if (!d.files || !d.files.length) {
      wrap.innerHTML = `<div class="empty-state" style="padding:56px"><i class="fa fa-folder"></i><span>${T[currentLang].filesEmpty}</span></div>`;
      return;
    }
    wrap.innerHTML = `<table class="files-table">
      <thead><tr>
        <th>${T[currentLang].thFile}</th><th>${T[currentLang].thType}</th><th>${T[currentLang].thSize}</th><th>${T[currentLang].thDate}</th><th>${T[currentLang].thLink}</th>
      </tr></thead>
      <tbody>${d.files.map(f => `
        <tr>
          <td><div class="file-row-name"><div class="file-row-icon" style="background:rgba(108,99,255,0.1);color:var(--indigo-l)"><i class="fa fa-file-zipper"></i></div>${escHtml(f.original_name||f.filename||'—')}</div></td>
          <td><span class="file-type-chip ${f.file_type||'upload'}">${escHtml(f.file_type||'upload')}</span></td>
          <td style="font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--t3)">${formatBytes(f.size||0)}</td>
          <td style="font-size:12px;color:var(--t3)">${timeAgo(f.created_at)}</td>
          <td style="display:flex;gap:6px">
            ${f.url ? `<a href="${escHtml(f.url)}" target="_blank" class="icon-btn" title="${T[currentLang].tooltipOpen}"><i class="fa fa-external-link"></i></a>` : ''}
            ${f.url ? `<button class="icon-btn" onclick="fallbackCopy('${escHtml(f.url)}')" title="${T[currentLang].tooltipCopy}"><i class="fa fa-copy"></i></button>` : ''}
          </td>
        </tr>`).join('')}
      </tbody>
    </table>`;
  } catch(e) {
    document.getElementById('files-wrap').innerHTML = '<div class="empty-state" style="padding:56px"><i class="fa fa-exclamation-circle"></i>' + T[currentLang].fileErrMsg + '</div>';
  }
}

function uploadGeneral(input) {
  const file = input.files[0];
  if (!file) return;
  const txt = document.getElementById('gen-uptxt');
  if (txt) txt.textContent = file.name + ' (' + formatBytes(file.size) + ')';
  uploadGeneralFile(file);
}
function handleGeneralFile(input) { uploadGeneral(input); }

async function uploadGeneralFile(file) {
  if (!file) return;
  const prog = document.getElementById('gen-progwrap');
  const bar  = document.getElementById('gen-bar');
  const pct  = document.getElementById('gen-pct');
  const res  = document.getElementById('gen-result');

  // Client-side size check (server enforces this too, this is just for instant feedback)
  if (_uploadLimitBytes && isFinite(_uploadLimitBytes) && file.size > _uploadLimitBytes) {
    const msg = currentLang === 'ar'
      ? `حجم الملف (${formatBytes(file.size)}) يتجاوز حد خطتك (${formatBytes(_uploadLimitBytes)})`
      : currentLang === 'en'
      ? `File size (${formatBytes(file.size)}) exceeds your plan limit (${formatBytes(_uploadLimitBytes)})`
      : `Размер файла (${formatBytes(file.size)}) превышает лимит вашего плана (${formatBytes(_uploadLimitBytes)})`;
    if (res) res.innerHTML = `<div style="padding:12px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);border-radius:12px;color:var(--red);font-size:13px;margin-top:8px"><i class="fa fa-exclamation-circle"></i> ${escHtml(msg)}</div>`;
    showToast('error', msg);
    return;
  }

  if (prog) prog.style.display = 'block';
  if (bar)  bar.style.width = '0%';
  if (pct)  pct.textContent = '0%';
  if (res)  res.innerHTML = '';

  // رفع الملف كـ raw stream مع X-Filename header (يتوافق مع /api/upload-file)
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/upload-file');
  xhr.setRequestHeader('X-Filename', encodeURIComponent(file.name));

  xhr.upload.onprogress = (e) => {
    if (e.lengthComputable) {
      const p = Math.round(e.loaded / e.total * 90);
      if (bar) bar.style.width = p + '%';
      if (pct) pct.textContent = p + '%';
    }
  };

  xhr.onload = () => {
    if (bar) bar.style.width = '100%';
    if (pct) pct.textContent = '100%';
    // 401 = غير مسجل → وجّه لتسجيل الدخول
    if (xhr.status === 401) {
      if (res) res.innerHTML = `<div style="padding:12px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);border-radius:12px;color:var(--red);font-size:13px;margin-top:8px">
        <i class="fa fa-lock"></i> ${currentLang==='ar'?'يجب تسجيل الدخول أولاً للرفع':'You must log in first to upload'}
      </div>`;
      showToast('error', currentLang==='ar'?'سجّل دخولك أولاً':'Login required');
      setTimeout(() => { if(prog) prog.style.display='none'; }, 2500);
      return;
    }
    try {
      const d = JSON.parse(xhr.responseText);
      if (xhr.status >= 400 || d.error) throw new Error(d.error || 'Upload failed');
      const url = d.url || (window.location.origin + '/f/' + d.token);
      if (res) res.innerHTML = `<div style="padding:12px;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:12px;display:flex;align-items:center;gap:10px;margin-top:8px">
        <i class="fa fa-check-circle" style="color:var(--green)"></i>
        <a href="${escHtml(url)}" target="_blank" style="color:var(--teal);font-size:12px;font-family:'JetBrains Mono',monospace;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escHtml(url)}</a>
        <button class="icon-btn" onclick="fallbackCopy('${escHtml(url)}')"><i class="fa fa-copy"></i></button>
      </div>`;
      showToast('success', currentLang==='ar'?'تم الرفع بنجاح!':'Uploaded successfully!');
      setTimeout(() => loadFiles(), 1000);
    } catch(e) {
      if (res) res.innerHTML = `<div style="padding:12px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);border-radius:12px;color:var(--red);font-size:13px;margin-top:8px"><i class="fa fa-exclamation-circle"></i> ${escHtml(e.message)}</div>`;
      showToast('error', e.message);
    }
    setTimeout(() => {
      if(prog) prog.style.display='none';
      if(bar) bar.style.width='0%';
      const txt = document.getElementById('gen-uptxt');
      if (txt) txt.textContent = currentLang==='ar' ? 'اسحب أو انقر للاختيار' : currentLang==='en' ? 'Drag or click to choose' : 'Перетащите или нажмите для выбора';
      // Reset file input so same file can be reuploaded
      const inp = document.getElementById('gen-file');
      if (inp) inp.value = '';
    }, 2500);
  };

  xhr.onerror = () => {
    showToast('error', currentLang==='ar'?'فشل الاتصال':'Connection failed');
    if (prog) prog.style.display = 'none';
  };

  xhr.send(file);
}

// ── ANNOUNCEMENT ──────────────────────────────────
async function loadAnnouncement() {
  try {
    const r = await fetch('/api/announcement');
    if (!r.ok) return;
    const d = await r.json();
    if (d.active && d.text) {
      const bar = document.getElementById('ann-bar');
      if (bar) {
        bar.className = 'ann-bar ' + (d.type || 'info');
        bar.style.display = 'flex';
        bar.innerHTML = `<i class="fa fa-${d.type==='warn'?'triangle-exclamation':d.type==='error'?'circle-xmark':d.type==='success'?'circle-check':'circle-info'}"></i><span style="flex:1">${escHtml(d.text)}</span><button class="ann-close" onclick="this.parentElement.style.display='none'"><i class="fa fa-times"></i></button>`;
      }
    }
  } catch(e) {}
}

// ── ADMIN ─────────────────────────────────────────
async function loadAdminStats() {
  try {
    const r = await fetch('/api/admin/stats');
    if (!r.ok) return;
    const d = await r.json();
    const set = (id, v) => { const el=document.getElementById(id); if(el) el.textContent = v ?? '—'; };
    set('as1', (d.total_decrypts||0).toLocaleString());
    set('as2', (d.total_fixes||0).toLocaleString());
    set('as3', (d.total_users||0).toLocaleString());
    set('as4', (d.visits_24h||0).toLocaleString());
    set('as5', (d.banned_users||0).toLocaleString());
    set('as6', (d.banned_ips||0).toLocaleString());
    set('as7', (d.logins_24h||0).toLocaleString());
    set('as8', (d.decrypts_24h||0).toLocaleString());
    // Toggle states
    const siteSw = document.getElementById('sw-site');
    const decSw = document.getElementById('sw-decrypt');
    if (siteSw) siteSw.classList.toggle('on', d.site_enabled !== false);
    if (decSw) decSw.classList.toggle('on', d.decrypt_enabled !== false);
  } catch(e) {}
}

async function toggleSite() {
  try {
    const sw = document.getElementById('sw-site');
    const isOn = sw.classList.contains('on');
    const r = await fetch('/api/admin/toggle-site', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({enabled:!isOn})});
    if (r.ok) { sw.classList.toggle('on'); showToast('success','Updated'); }
  } catch(e) {}
}

async function toggleDecrypt() {
  try {
    const sw = document.getElementById('sw-decrypt');
    const isOn = sw.classList.contains('on');
    const r = await fetch('/api/admin/toggle-decrypt', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({enabled:!isOn})});
    if (r.ok) { sw.classList.toggle('on'); showToast('success','Updated'); }
  } catch(e) {}
}

async function banUser() {
  const id = document.getElementById('ban-id')?.value.trim();
  const reason = document.getElementById('ban-reason')?.value.trim();
  const ip = document.getElementById('ban-ip')?.value.trim();
  const username = document.getElementById('ban-uname')?.value.trim();
  if (!id) { showToast('error', 'Enter Discord ID'); return; }
  try {
    const r = await fetch('/api/admin/ban', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({discord_id:id, reason, ip, username})});
    const d = await r.json();
    if (r.ok) { showToast('success', 'User banned'); loadAdminStats(); }
    else showToast('error', d.error || 'Failed');
  } catch(e) { showToast('error', 'Error'); }
}

async function unbanUser() {
  const id = document.getElementById('ban-id')?.value.trim();
  if (!id) { showToast('error', 'Enter Discord ID'); return; }
  try {
    const r = await fetch('/api/admin/unban', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({discord_id:id})});
    if (r.ok) { showToast('success', 'User unbanned'); loadAdminStats(); }
    else showToast('error', 'Failed');
  } catch(e) { showToast('error', 'Error'); }
}

async function grantBonus() {
  const id = document.getElementById('bon-id')?.value.trim();
  const decrypt = parseInt(document.getElementById('bon-d')?.value)||0;
  const fix = parseInt(document.getElementById('bon-f')?.value)||0;
  if (!id) { showToast('error', 'Enter Discord ID'); return; }
  try {
    const r = await fetch('/api/admin/bonus', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({discord_id:id, decrypt_bonus:decrypt, fix_bonus:fix})});
    if (r.ok) showToast('success', 'Bonus granted');
    else showToast('error', 'Failed');
  } catch(e) { showToast('error', 'Error'); }
}

async function lookupUser() {
  const id = document.getElementById('look-id')?.value.trim();
  if (!id) return;
  const res = document.getElementById('look-res');
  if (res) res.innerHTML = '<div style="color:var(--t3);font-size:12px">Searching...</div>';
  try {
    const r = await fetch('/api/admin/user/' + encodeURIComponent(id));
    if (!r.ok) { if(res) res.innerHTML = '<div style="color:var(--red);font-size:12px">User not found</div>'; return; }
    const u = await r.json();
    if (res) res.innerHTML = `<div class="user-lookup-result">
      <div class="user-lookup-stat"><i class="fa fa-user" style="color:var(--indigo-l)"></i><span>${escHtml(u.username||'—')}</span></div>
      <div class="user-lookup-stat"><i class="fa fa-crown" style="color:var(--gold)"></i><span>${escHtml(u.plan_name||'Free')}</span></div>
      <div class="user-lookup-stat"><i class="fa fa-unlock" style="color:var(--indigo-l)"></i><span>Decrypts: ${u.total_decrypts||0}</span></div>
      <div class="user-lookup-stat"><i class="fa fa-cube" style="color:var(--orange-l)"></i><span>Fixes: ${u.total_fixes||0}</span></div>
      ${u.is_banned ? '<div class="user-lookup-stat"><i class="fa fa-ban" style="color:var(--red)"></i><span style="color:var(--red)">BANNED</span></div>' : ''}
    </div>`;
  } catch(e) { if(res) res.innerHTML = '<div style="color:var(--red);font-size:12px">Error</div>'; }
}

async function loadAuthLog() {
  try {
    const r = await fetch('/api/admin/auth-log');
    if (!r.ok) return;
    const d = await r.json();
    const wrap = document.getElementById('auth-log');
    if (!wrap) return;
    if (!d.length) { wrap.innerHTML = '<div class="empty-state"><i class="fa fa-shield"></i>No logs</div>'; return; }
    wrap.innerHTML = `<table class="files-table">
      <thead><tr><th>User</th><th>Action</th><th>Status</th><th>Time</th><th>IP</th></tr></thead>
      <tbody>${d.slice(0,20).map(l => `<tr>
        <td style="font-size:12px">${escHtml(l.username||l.discord_id||'—')}</td>
        <td style="font-size:11px;font-family:'JetBrains Mono',monospace;color:var(--t3)">${escHtml(l.action||'—')}</td>
        <td><span style="font-size:10px;padding:2px 8px;border-radius:99px;background:${l.status==='success'?'rgba(16,185,129,0.12)':'rgba(239,68,68,0.12)'};color:${l.status==='success'?'var(--green)':'var(--red)'}">${escHtml(l.status||'—')}</span></td>
        <td style="font-size:11px;color:var(--t3)">${timeAgo(l.created_at)}</td>
        <td style="font-size:11px;font-family:'JetBrains Mono',monospace;color:var(--t4)">${escHtml(l.ip||'—')}</td>
      </tr>`).join('')}
      </tbody>
    </table>`;
  } catch(e) {}
}

async function sendAnnouncement() {
  const text = document.getElementById('ann-inp')?.value.trim();
  const type = document.getElementById('ann-type')?.value;
  if (!text) return;
  try {
    await fetch('/api/admin/announcement', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({text, type})});
    showToast('success', 'Announcement sent');
    loadAnnouncement();
  } catch(e) {}
}

async function clearAnnouncement() {
  try {
    await fetch('/api/admin/announcement', {method:'DELETE'});
    const bar = document.getElementById('ann-bar');
    if (bar) bar.style.display = 'none';
    const inp = document.getElementById('ann-inp');
    if (inp) inp.value = '';
    showToast('success', 'Cleared');
  } catch(e) {}
}

// ── TOAST ─────────────────────────────────────────
function showToast(type, msg) {
  const wrap = document.getElementById('toast-wrap');
  if (!wrap) return;
  const t = document.createElement('div');
  t.className = 'toast ' + type;
  const icons = {success:'fa-check-circle', error:'fa-times-circle', info:'fa-info-circle', warn:'fa-triangle-exclamation'};
  t.innerHTML = `<i class="fa ${icons[type]||'fa-info-circle'}"></i><span>${escHtml(msg)}</span>`;
  wrap.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 3500);
}

// ── UTILS ─────────────────────────────────────────
function escHtml(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function formatBytes(b) {
  if (!b) return '0 B';
  const u = ['B','KB','MB','GB']; let v=b, i=0;
  while(v>=1024&&i<3){v/=1024;i++;}
  return (v>=100?v.toFixed(0):v.toFixed(1))+' '+u[i];
}
function timeAgo(d) {
  if (!d) return '—';
  const diff = Date.now() - new Date(d).getTime();
  const m = Math.floor(diff / 60000);
  const h = Math.floor(m / 60);
  const dy = Math.floor(h / 24);
  const lang = currentLang || 'ar';
  if (lang === 'ar') {
    if (m < 1)  return 'الآن';
    if (m < 60) return `منذ ${m} د`;
    if (h < 24) return `منذ ${h} س`;
    return `منذ ${dy} ي`;
  }
  if (lang === 'ru') {
    if (m < 1)  return 'только что';
    if (m < 60) return `${m} мин назад`;
    if (h < 24) return `${h} ч назад`;
    return `${dy} д назад`;
  }
  // en
  if (m < 1)  return 'Just now';
  if (m < 60) return `${m}m ago`;
  if (h < 24) return `${h}h ago`;
  return `${dy}d ago`;
}
const sleep = ms => new Promise(r => setTimeout(r, ms));
function doDiscordLogin() { window.location.href = '/login.html'; }
function goLogin() { window.location.href = '/login.html'; }

// ── Admin function aliases (HTML uses short names) ────────────────
function doBan()    { banUser(); }
function doUnban()  { unbanUser(); }
function doBonus()  { grantBonus(); }
function doLookup() { lookupUser(); }
function sendAnn()  { sendAnnouncement(); }
function clearAnn() { clearAnnouncement(); }

// ── KEYBOARD SHORTCUTS ────────────────────────────
document.addEventListener('keydown', e => {
  if (e.altKey) {
    if(e.key==='1') showTab('home');
    if(e.key==='2') showTab('decrypt');
    if(e.key==='3') showTab('fix');
    if(e.key==='4') showTab('files');
  }
});

// ── INIT ──────────────────────────────────────────
// ── PASTE SUPPORT (Ctrl+V to upload zip) ─────────────────────────────────────
document.addEventListener('paste', (e) => {
  const items = e.clipboardData?.items;
  if (!items) return;
  for (const item of items) {
    if (item.kind === 'file') {
      const file = item.getAsFile();
      if (!file || !file.name.endsWith('.zip')) return;
      if (!_checkFileSizeLimit(file)) return;
      // Drop to active tab
      const activeTab = document.querySelector('.tab.active')?.id;
      if (activeTab === 'tab-decrypt') {
        decryptFile = file;
        showFileChosen('d', file);
        document.getElementById('d-actbtn').disabled = false;
        showToast('info', currentLang==='ar'?'تم لصق الملف ✓':currentLang==='ru'?'Файл вставлен ✓':'File pasted ✓');
      } else if (activeTab === 'tab-fix') {
        fixFile = file;
        showFileChosen('f', file);
        document.getElementById('f-actbtn').disabled = false;
        showToast('info', currentLang==='ar'?'تم لصق الملف ✓':currentLang==='ru'?'Файл вставлен ✓':'File pasted ✓');
      }
      break;
    }
  }
});

async function init() {
  applyLang();
  // Handle auth error redirect from OAuth
  const params = new URLSearchParams(window.location.search);
  const authErr = params.get('auth_error');
  if (authErr) {
    const msgs = {
      '1': currentLang==='ar'?'فشل تسجيل الدخول':'Login failed',
      'csrf': currentLang==='ar'?'انتهت الجلسة':'Session expired',
      'not_member': currentLang==='ar'?'يجب أن تكون عضواً في السيرفر':'You must be a member of the server'
    };
    setTimeout(() => showToast('error', msgs[authErr]||'Login error'), 500);
    // Clean URL
    history.replaceState({}, '', window.location.pathname);
  }
  // انتظر checkAuth قبل إخفاء شاشة التحميل
  await checkAuth();
  document.getElementById('pg-load').classList.add('hide');
  // تحميل بقية البيانات بعد إظهار الواجهة
  loadStats();
  loadAnnouncement();
  loadSiteConfig();
  loadPlanLimits();
}

// ── SITE CONFIG (discord invite, etc) ─────────────
async function loadSiteConfig() {
  try {
    const r = await fetch('/api/config');
    if (!r.ok) return;
    const cfg = await r.json();
    if (cfg.discordInvite) {
      // Footer discord button
      const ftLink = document.getElementById('ft-discord-link');
      if (ftLink) { ftLink.href = cfg.discordInvite; ftLink.style.display = 'inline-flex'; }
      const ftTxt = document.getElementById('ft-discord-txt');
      if (ftTxt) ftTxt.textContent = T[currentLang]?.footerDiscord || 'Discord';
    }
  } catch(e) {}
  // Load team
  loadTeam();
}

// ── LOAD TEAM (owners) ─────────────────────────────
// ── PLAN LIMITS TABLE (footer) ─────────────────────
async function loadPlanLimits() {
  const container = document.getElementById('footer-limits');
  if (!container) return;
  try {
    const r = await fetch('/api/limits-info?lang=' + currentLang);
    if (!r.ok) throw new Error('failed');
    const { plans } = await r.json();
    const _t = T[currentLang] || T['en'];
    const lblDecrypt = _t.qwDecrypt || 'Decrypt';
    const lblFix     = _t.qwFix || 'Fix';
    const lblUpload  = currentLang === 'ar' ? 'حجم الملف' : currentLang === 'en' ? 'File size' : 'Размер файла';
    const lblPerDay  = currentLang === 'ar' ? 'يوم' : currentLang === 'en' ? 'day' : 'день';
    const unlimitedLbl = currentLang === 'ar' ? '∞ غير محدود' : currentLang === 'en' ? '∞ Unlimited' : '∞ Без лимита';
    container.innerHTML = plans.map(p => {
      const uploadTxt = p.upload_limit_bytes === -1 ? unlimitedLbl : formatBytes(p.upload_limit_bytes);
      return `
      <div class="plan-limit-card">
        <div class="plan-limit-name">${escHtml(p.name)}</div>
        <div class="plan-limit-row"><span>🔓 ${escHtml(lblDecrypt)}</span><span>${escHtml(String(p.decrypt_limit))}/${escHtml(lblPerDay)}</span></div>
        <div class="plan-limit-row"><span>🔧 ${escHtml(lblFix)}</span><span>${escHtml(String(p.fix_limit))}/${escHtml(lblPerDay)}</span></div>
        <div class="plan-limit-row"><span>📦 ${escHtml(lblUpload)}</span><span>${escHtml(uploadTxt)}</span></div>
      </div>
    `;}).join('');
  } catch(e) {
    if (container) container.innerHTML = '';
  }
}

async function loadTeam() {
  const container = document.getElementById('footer-members');
  if (!container) return;
  try {
    const r = await fetch('/api/team');
    if (!r.ok) throw new Error('failed');
    const members = await r.json();
    if (!members.length) { container.innerHTML = ''; return; }

    const roleClass = (role) => {
      const r = role.toLowerCase();
      if (r.includes('dev'))  return 'role-dev';
      if (r.includes('admin')) return 'role-admin';
      if (r.includes('mod'))  return 'role-moderator';
      return 'role-owner';
    };

    container.innerHTML = members.map(m => {
      const bannerStyle = m.banner
        ? `background-image:url('${m.banner}')`
        : (m.accent_color ? `background-color:${m.accent_color}` : '');
      return `
      <div class="footer-member">
        <div class="footer-member-banner" style="${bannerStyle}"></div>
        <div class="footer-member-body">
          <img class="footer-member-avatar" src="${m.avatar}" alt="${escHtml(m.display)}"
               onerror="this.src='https://cdn.discordapp.com/embed/avatars/0.png'">
          <div class="footer-member-info">
            <div class="footer-member-name">${escHtml(m.display)}</div>
            <span class="footer-member-role ${roleClass(m.role)}">${escHtml(m.role)}</span>
          </div>
          <button class="footer-member-copy" title="Copy username"
            onclick="navigator.clipboard.writeText('${escHtml(m.username)}').then(()=>showToast('success','${T[currentLang]?.copyUsername||'Copied'}: @${escHtml(m.username)}'))">
            <i class="fa fa-copy"></i>
          </button>
        </div>
      </div>
    `;}).join('');
  } catch(e) {
    if (container) container.innerHTML = '';
  }
}

document.addEventListener('DOMContentLoaded', init);