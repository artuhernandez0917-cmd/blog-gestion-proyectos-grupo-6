import { useMemo, useState } from 'react'
import {
  Activity,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  Code2,
  Compass,
  FileText,
  GraduationCap,
  Layers3,
  Lightbulb,
  ListChecks,
  Menu,
  MessageCircle,
  Moon,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  Target,
  Users,
  Workflow,
  X,
  Zap,
} from 'lucide-react'

const sections = [
  { id: 'inicio', label: 'Inicio', icon: Compass },
  { id: 'roles', label: 'Roles de Scrum', icon: Users },
  { id: 'conceptos', label: 'Conceptos', icon: Layers3 },
  { id: 'daily', label: 'Daily Scrum', icon: MessageCircle },
  { id: 'grupo', label: 'Grupo 6', icon: GraduationCap },
]

const roles = [
  {
    id: 'product-owner',
    number: '01',
    name: 'Product Owner',
    short: 'Representa el negocio y a los usuarios. Decide qué aporta más valor y en qué orden debe construirse.',
    focus: 'Qué se construye y para qué',
    icon: Target,
    tone: 'blue',
    duties: [
      'Definir y priorizar el Product Backlog.',
      'Decidir qué funcionalidades aportan más valor.',
      'Ser la voz del cliente ante el equipo de desarrollo.',
      'Aceptar o rechazar el trabajo terminado según los criterios de aceptación.',
    ],
    boundary: 'No decide cómo se programa ni se encarga de gestionar al equipo técnico.',
  },
  {
    id: 'scrum-master',
    number: '02',
    name: 'Scrum Master',
    short: 'Facilita el trabajo del equipo, promueve la aplicación de Scrum y ayuda a eliminar los obstáculos.',
    focus: 'Cómo trabaja el equipo',
    icon: ShieldCheck,
    tone: 'violet',
    duties: [
      'Enseñar y recordar las prácticas y principios de Scrum.',
      'Eliminar los impedimentos que frenan al equipo.',
      'Facilitar eventos como el Daily Scrum, la planificación y la retrospectiva.',
      'Proteger al equipo de interrupciones externas y apoyar la mejora continua mediante coaching.',
    ],
    boundary: 'No decide qué se construye ni se encarga de programar el producto.',
  },
  {
    id: 'equipo-desarrollo',
    number: '03',
    name: 'Equipo de Desarrollo',
    short: 'Construye el producto y convierte los requisitos seleccionados en incrementos funcionales y de calidad.',
    focus: 'Cómo se construye técnicamente',
    icon: Code2,
    tone: 'orange',
    duties: [
      'Auto-organizarse para decidir cómo realizar el trabajo.',
      'Estimar el esfuerzo de las tareas.',
      'Reunir las habilidades necesarias para desarrollo, pruebas, diseño y otras actividades.',
      'Entregar un producto funcional y de calidad al final de cada Sprint.',
    ],
    boundary: 'No prioriza el Product Backlog ni gestiona el proceso Scrum.',
  },
]

const concepts = [
  {
    id: 'sprint',
    number: '01',
    title: 'Sprint',
    category: 'Ciclo de trabajo',
    icon: Zap,
    tone: 'blue',
    summary: 'Un periodo de tiempo fijo en el que el equipo trabaja para alcanzar objetivos definidos.',
    definition: 'Un Sprint es un período de tiempo fijo, generalmente de una a cuatro semanas, durante el cual el equipo de desarrollo trabaja para completar un conjunto de tareas y objetivos previamente definidos. Cada Sprint tiene como propósito entregar una versión funcional y mejorada del producto, permitiendo obtener resultados de manera continua e incremental. Al finalizar, se revisa el trabajo realizado y se identifican oportunidades de mejora para el siguiente ciclo.',
  },
  {
    id: 'product-backlog',
    number: '02',
    title: 'Product Backlog',
    category: 'Lista priorizada',
    icon: ListChecks,
    tone: 'violet',
    summary: 'Reúne los requisitos, funcionalidades, mejoras y correcciones que pueden formar parte del producto.',
    definition: 'El Product Backlog es una lista ordenada y priorizada de todos los requisitos, funcionalidades, mejoras y correcciones que pueden formar parte del producto. Esta lista es gestionada principalmente por el Product Owner, quien se encarga de organizar los elementos según su valor y prioridad para el negocio. El Product Backlog es dinámico, ya que evoluciona constantemente conforme cambian las necesidades del proyecto y de los usuarios.',
  },
  {
    id: 'sprint-backlog',
    number: '03',
    title: 'Sprint Backlog',
    category: 'Trabajo seleccionado',
    icon: FileText,
    tone: 'orange',
    summary: 'Contiene los elementos elegidos del Product Backlog y las tareas para cumplir el objetivo del Sprint.',
    definition: 'El Sprint Backlog es el conjunto de elementos seleccionados del Product Backlog que el equipo se compromete a desarrollar durante un Sprint específico. Incluye las tareas necesarias para cumplir los objetivos establecidos y sirve como guía diaria para el equipo de trabajo. Este backlog puede ajustarse durante el Sprint siempre que los cambios ayuden a alcanzar la meta propuesta.',
  },
  {
    id: 'incremento',
    number: '04',
    title: 'Incremento',
    category: 'Resultado funcional',
    icon: CheckCircle2,
    tone: 'green',
    summary: 'Es el resultado del trabajo completado durante un Sprint: una nueva versión funcional del producto.',
    definition: 'El Incremento es el resultado del trabajo completado durante un Sprint y representa una nueva versión funcional del producto. Debe cumplir con los criterios de calidad definidos por el equipo y estar en condiciones de ser utilizado o entregado al cliente. Cada incremento se suma a los anteriores, aportando nuevas funcionalidades o mejoras al producto de manera progresiva.',
  },
  {
    id: 'daily-scrum',
    number: '05',
    title: 'Daily Scrum',
    category: 'Reunión diaria',
    icon: MessageCircle,
    tone: 'cyan',
    summary: 'Una reunión breve para sincronizar actividades, revisar avances e identificar obstáculos.',
    definition: 'El Daily Scrum es una reunión breve y diaria, normalmente de 15 minutos, en la que los miembros del equipo sincronizan sus actividades y revisan el avance hacia el objetivo del Sprint. Durante este encuentro, se identifican progresos, posibles obstáculos y las tareas más importantes para el día. Su finalidad es mejorar la comunicación, la coordinación y la eficiencia del equipo.',
  },
]

function BrandMark() {
  return <div className="brand-mark"><Layers3 size={19} strokeWidth={2.2} /></div>
}

function App() {
  const [activeSection, setActiveSection] = useState('inicio')
  const [expandedRole, setExpandedRole] = useState('product-owner')
  const [expandedConcept, setExpandedConcept] = useState('')
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const searchableItems = useMemo(() => [
    ...roles.map((item) => ({ ...item, type: 'Rol', section: 'roles' })),
    ...concepts.map((item) => ({ ...item, name: item.title, short: item.summary, type: 'Concepto', section: item.id === 'daily-scrum' ? 'daily' : 'conceptos' })),
  ], [])

  const searchResults = search.trim()
    ? searchableItems.filter((item) => `${item.name} ${item.short} ${item.definition || ''}`.toLowerCase().includes(search.toLowerCase())).slice(0, 6)
    : []

  const navigate = (id) => {
    setActiveSection(id)
    setMobileMenu(false)
    setShowSearch(false)
    setSearch('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openSearchResult = (item) => {
    navigate(item.section)
    if (item.type === 'Rol') setExpandedRole(item.id)
    else if (item.id === 'daily-scrum') setExpandedConcept('daily-scrum')
    else setExpandedConcept(item.id)
  }

  return (
    <div className={`app-shell ${darkMode ? 'dark-mode' : ''}`}>
      <header className="topbar">
        <div className="topbar-inner">
          <button className="brand" onClick={() => navigate('inicio')} aria-label="Ir al inicio">
            <BrandMark />
            <span><strong>Gestión de Proyectos</strong><small>Blog académico · Grupo 6</small></span>
          </button>

          <nav className="desktop-nav" aria-label="Navegación principal">
            {sections.map((section) => (
              <button key={section.id} className={activeSection === section.id ? 'nav-link active' : 'nav-link'} onClick={() => navigate(section.id)}>
                {section.label}
              </button>
            ))}
          </nav>

          <div className="top-actions">
            <button className={`icon-button ${showSearch ? 'selected' : ''}`} onClick={() => setShowSearch((value) => !value)} aria-label="Buscar contenido"><Search size={18} /></button>
            <button className="icon-button theme-button" onClick={() => setDarkMode((value) => !value)} aria-label="Cambiar tema">{darkMode ? <Sun size={18} /> : <Moon size={18} />}</button>
            <button className="icon-button mobile-toggle" onClick={() => setMobileMenu((value) => !value)} aria-label="Abrir menú">{mobileMenu ? <X size={20} /> : <Menu size={20} />}</button>
          </div>
        </div>
        {showSearch && (
          <div className="search-panel">
            <div className="search-box"><Search size={18} /><input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Busca roles o conceptos de Scrum..." /><button onClick={() => setShowSearch(false)} aria-label="Cerrar búsqueda"><X size={18} /></button></div>
            {search.trim() && <div className="search-results">
              {searchResults.length ? searchResults.map((item) => <button key={`${item.type}-${item.id}`} onClick={() => openSearchResult(item)}><span className="search-result-icon">{item.type === 'Rol' ? <Users size={16} /> : <BookOpen size={16} />}</span><span><strong>{item.name}</strong><small>{item.type} · {item.short}</small></span><ArrowUpRight size={16} /></button>) : <p className="empty-search">No encontramos resultados para “{search}”.</p>}
            </div>}
          </div>
        )}
        {mobileMenu && <nav className="mobile-nav" aria-label="Navegación móvil">{sections.map((section) => <button key={section.id} onClick={() => navigate(section.id)} className={activeSection === section.id ? 'active' : ''}><section.icon size={17} />{section.label}<ChevronRight size={16} /></button>)}</nav>}
      </header>

      <main>
        {activeSection === 'inicio' && <HomePage navigate={navigate} />}
        {activeSection === 'roles' && <RolesPage expandedRole={expandedRole} setExpandedRole={setExpandedRole} />}
        {activeSection === 'conceptos' && <ConceptsPage expandedConcept={expandedConcept} setExpandedConcept={setExpandedConcept} />}
        {activeSection === 'daily' && <DailyPage />}
        {activeSection === 'grupo' && <GroupPage />}
      </main>

      <Footer navigate={navigate} />
    </div>
  )
}

function PageHeading({ eyebrow, title, description, icon: Icon }) {
  return <div className="page-heading"><div className="heading-icon"><Icon size={22} /></div><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div></div>
}

function HomePage({ navigate }) {
  return <>
    <section className="hero-section">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="eyebrow light"><span className="eyebrow-dot" /> TALLER TEÓRICO · GESTIÓN DE PROYECTOS</div>
          <h1>Conociendo<br /><em>Scrum.</em></h1>
          <p className="hero-lead">Una mirada a los roles, conceptos y prácticas que organizan el trabajo en equipo dentro de un proyecto.</p>
          <div className="hero-actions"><button className="primary-button" onClick={() => navigate('roles')}>Explorar el contenido <ArrowRight size={17} /></button><button className="text-button" onClick={() => navigate('grupo')}>Conocer el grupo <ArrowUpRight size={16} /></button></div>
          <div className="hero-meta"><span><CalendarDays size={15} /> Bucaramanga · 2026</span><span><BookOpen size={15} /> Ingeniería de Sistemas</span></div>
        </div>
        <div className="hero-art" aria-label="Ilustración de flujo de trabajo Scrum">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
          <div className="art-label label-top"><span className="mini-dot blue-dot" /> PRODUCT BACKLOG</div>
          <div className="art-label label-right"><span className="mini-dot violet-dot" /> SPRINT</div>
          <div className="art-label label-bottom"><span className="mini-dot green-dot" /> INCREMENTO</div>
          <div className="art-core"><div className="core-symbol"><Workflow size={42} /></div><strong>SCRUM</strong><small>Trabajo incremental</small></div>
          <div className="floating-card card-a"><ListChecks size={16} /><span>Priorizar</span><b>01</b></div>
          <div className="floating-card card-b"><Users size={16} /><span>Colaborar</span><b>02</b></div>
          <div className="floating-card card-c"><CheckCircle2 size={16} /><span>Entregar</span><b>03</b></div>
          <div className="art-spark spark-a">✳</div><div className="art-spark spark-b">✦</div>
        </div>
      </div>
      <div className="hero-bottom"><span>FUNDAMENTOS DE SCRUM</span><span className="bottom-line" /><span>GRUPO 6 <ArrowDown size={13} /></span></div>
    </section>

    <section className="content-wrap intro-section">
      <div className="intro-main">
        <div className="eyebrow">01 / PRESENTACIÓN</div>
        <h2>Organizar el trabajo.<br /><em>Construir valor.</em></h2>
        <p>La gestión de proyectos requiere organización, distribución de responsabilidades y seguimiento del trabajo. En este espacio reunimos los fundamentos de Scrum desarrollados en el taller teórico: sus roles principales y los conceptos que permiten organizar el trabajo en ciclos.</p>
        <button className="inline-link" onClick={() => navigate('conceptos')}>Conocer los conceptos <ArrowRight size={16} /></button>
      </div>
      <div className="intro-aside">
        <div className="aside-mark"><Sparkles size={21} /></div>
        <span className="aside-kicker">EN ESTA PRIMERA ENTREGA</span>
        <strong>Una base para seguir aprendiendo.</strong>
        <p>El blog está preparado para incorporar las próximas actividades del curso sin perder su estructura.</p>
      </div>
    </section>

    <section className="content-wrap overview-section">
      <div className="section-topline"><span className="eyebrow">02 / CONTENIDO DEL TALLER</span><span className="section-note">Una guía para explorar</span></div>
      <div className="overview-grid">
        <button className="overview-card role-overview" onClick={() => navigate('roles')}>
          <div className="overview-icon"><Users size={21} /></div><span className="card-index">01 — ROLES</span><h3>Las personas detrás del proceso</h3><p>Conoce las responsabilidades del Product Owner, Scrum Master y Equipo de Desarrollo.</p><div className="card-foot"><span>3 roles principales</span><ArrowUpRight size={18} /></div>
        </button>
        <button className="overview-card concept-overview" onClick={() => navigate('conceptos')}>
          <div className="overview-icon"><Layers3 size={21} /></div><span className="card-index">02 — CONCEPTOS</span><h3>El lenguaje de Scrum</h3><p>Explora los elementos que se utilizan para planificar, organizar y entregar el trabajo.</p><div className="card-foot"><span>5 conceptos fundamentales</span><ArrowUpRight size={18} /></div>
        </button>
        <button className="overview-card daily-overview" onClick={() => navigate('daily')}>
          <div className="overview-icon"><MessageCircle size={21} /></div><span className="card-index">03 — REUNIÓN</span><h3>Daily Scrum</h3><p>Una reunión breve para sincronizar las actividades y revisar el avance del Sprint.</p><div className="card-foot"><span>15 minutos habitualmente</span><ArrowUpRight size={18} /></div>
        </button>
      </div>
    </section>

    <section className="content-wrap flow-section">
      <div className="flow-heading"><div><div className="eyebrow">03 / VISTA GENERAL</div><h2>Del listado al <em>incremento.</em></h2></div><p>Una representación resumida de cómo se conectan algunos de los conceptos desarrollados en el taller.</p></div>
      <div className="flow-track">
        <FlowStep num="01" title="Product Backlog" text="Lista priorizada de elementos del producto." tone="blue" />
        <div className="flow-arrow"><ArrowRight size={19} /></div>
        <FlowStep num="02" title="Sprint Backlog" text="Elementos seleccionados para el Sprint." tone="violet" />
        <div className="flow-arrow"><ArrowRight size={19} /></div>
        <FlowStep num="03" title="Sprint" text="Periodo de trabajo con un objetivo definido." tone="orange" />
        <div className="flow-arrow"><ArrowRight size={19} /></div>
        <FlowStep num="04" title="Incremento" text="Nueva versión funcional del producto." tone="green" />
      </div>
      <div className="flow-caption"><span><span className="caption-dot" /> Durante el Sprint, el equipo realiza reuniones Daily Scrum.</span><button onClick={() => navigate('daily')}>Ver Daily Scrum <ArrowUpRight size={15} /></button></div>
    </section>

    <section className="content-wrap next-section">
      <div className="next-banner"><div className="next-icon"><BookOpen size={23} /></div><div className="next-copy"><span className="eyebrow light">BLOG EN CONSTRUCCIÓN</span><h2>Este espacio seguirá creciendo.</h2><p>Las siguientes actividades de Gestión de Proyectos podrán incorporarse como nuevas publicaciones y secciones.</p></div><div className="next-decoration"><div className="deco-ring" /><div className="deco-ring ring-two" /><Layers3 size={48} /></div></div>
    </section>
  </>
}

function FlowStep({ num, title, text, tone }) {
  return <div className={`flow-step ${tone}`}><span className="flow-number">{num}</span><strong>{title}</strong><p>{text}</p></div>
}

function RolesPage({ expandedRole, setExpandedRole }) {
  return <div className="inner-page content-wrap">
    <PageHeading eyebrow="01 / ORGANIZACIÓN DEL EQUIPO" title="Roles de Scrum" description="Cada rol aporta una responsabilidad diferente para organizar el trabajo y orientar el desarrollo del producto." icon={Users} />
    <div className="role-lead"><div className="role-lead-icon"><Users size={22} /></div><p>En el taller se identifican tres roles principales: quien prioriza el valor del producto, quien facilita el proceso Scrum y el equipo que construye el producto.</p><span>3 ROLES</span></div>
    <div className="role-list">{roles.map((role) => {
      const Icon = role.icon
      const isOpen = expandedRole === role.id
      return <article key={role.id} className={`role-card ${role.tone} ${isOpen ? 'expanded' : ''}`}>
        <button className="role-card-header" onClick={() => setExpandedRole(isOpen ? '' : role.id)} aria-expanded={isOpen}>
          <div className="role-number">{role.number}</div><div className="role-icon"><Icon size={23} /></div><div className="role-heading"><h2>{role.name}</h2><p>{role.short}</p></div><div className="expand-indicator">{isOpen ? <X size={17} /> : <ChevronDown size={19} />}</div>
        </button>
        {isOpen && <div className="role-details"><div className="role-details-main"><span className="detail-label">FUNCIÓN Y RESPONSABILIDADES</span><ul>{role.duties.map((duty) => <li key={duty}><Check size={15} />{duty}</li>)}</ul></div><div className="role-focus"><span className="detail-label">ENFOQUE PRINCIPAL</span><strong>{role.focus}</strong><div className="role-boundary"><Lightbulb size={17} /><p>{role.boundary}</p></div></div></div>}
      </article>
    })}</div>
    <div className="note-strip"><Sparkles size={18} /><p><strong>Idea clave:</strong> los roles se complementan. El enfoque de cada uno permite diferenciar el valor del producto, el funcionamiento del proceso y la construcción técnica.</p></div>
  </div>
}

function ConceptsPage({ expandedConcept, setExpandedConcept }) {
  return <div className="inner-page content-wrap">
    <PageHeading eyebrow="02 / VOCABULARIO FUNDAMENTAL" title="Conceptos de Scrum" description="Cinco términos del taller que ayudan a comprender cómo se organiza y se desarrolla el trabajo." icon={Layers3} />
    <div className="concept-intro"><div><span className="eyebrow">APRENDER POR PARTES</span><h2>Un concepto a la vez.</h2></div><p>Selecciona cada concepto para consultar su definición completa, conservando el enfoque desarrollado en el documento del taller.</p></div>
    <div className="concept-grid">{concepts.filter((concept) => concept.id !== 'daily-scrum').map((concept) => <ConceptCard key={concept.id} concept={concept} expanded={expandedConcept === concept.id} onToggle={() => setExpandedConcept(expandedConcept === concept.id ? '' : concept.id)} />)}</div>
    <div className="daily-promo"><div className="daily-promo-icon"><MessageCircle size={25} /></div><div><span className="eyebrow">CONCEPTO 05</span><h3>Daily Scrum</h3><p>La reunión diaria merece una sección propia por su papel en la comunicación y coordinación del equipo.</p></div><div className="promo-time"><Clock3 size={17} /><strong>15 min</strong><small>habitualmente</small></div><button onClick={() => setExpandedConcept('daily-scrum')}>Ver definición <ArrowRight size={16} /></button></div>
    {expandedConcept === 'daily-scrum' && <div className="daily-inline-definition"><span className="detail-label">DEFINICIÓN DEL TALLER</span><p>{concepts.find((concept) => concept.id === 'daily-scrum').definition}</p><button onClick={() => setExpandedConcept('')}>Cerrar definición <X size={15} /></button></div>}
    <div className="concept-footnote"><BookOpen size={17} /><span>Las definiciones de esta sección se basan en las respuestas del punto 8 del taller teórico.</span></div>
  </div>
}

function ConceptCard({ concept, expanded, onToggle }) {
  const Icon = concept.icon
  return <article className={`concept-card ${concept.tone} ${expanded ? 'expanded' : ''}`}>
    <div className="concept-card-top"><div className="concept-icon"><Icon size={21} /></div><span className="concept-number">{concept.number}</span></div>
    <span className="concept-category">{concept.category}</span><h3>{concept.title}</h3><p className="concept-summary">{concept.summary}</p>
    {expanded && <div className="concept-definition"><span className="detail-label">DEFINICIÓN DEL TALLER</span><p>{concept.definition}</p></div>}
    <button className="concept-toggle" onClick={onToggle}>{expanded ? 'Ocultar definición' : 'Leer definición completa'}{expanded ? <X size={15} /> : <ArrowUpRight size={16} />}</button>
  </article>
}

function DailyPage() {
  const daily = concepts.find((concept) => concept.id === 'daily-scrum')
  return <div className="inner-page content-wrap daily-page">
    <PageHeading eyebrow="03 / SINCRONIZACIÓN DEL EQUIPO" title="Daily Scrum" description="Un espacio breve y diario para revisar el avance, sincronizar actividades e identificar obstáculos." icon={MessageCircle} />
    <div className="daily-feature">
      <div className="daily-feature-copy"><span className="eyebrow light">REUNIÓN DIARIA</span><h2>15 <em>minutos.</em></h2><p>Normalmente, el Daily Scrum tiene una duración de 15 minutos. Su propósito es que los miembros del equipo revisen cómo avanzan hacia el objetivo del Sprint.</p><div className="daily-tags"><span><Clock3 size={15} /> Breve</span><span><CalendarDays size={15} /> Diaria</span><span><Users size={15} /> En equipo</span></div></div>
      <div className="daily-clock"><div className="clock-ring"><div className="clock-center"><Clock3 size={39} /><strong>15</strong><small>MINUTOS</small></div><span className="clock-tick tick-one" /><span className="clock-tick tick-two" /><span className="clock-tick tick-three" /><span className="clock-tick tick-four" /></div><span className="clock-caption">Una reunión breve para sincronizar.</span></div>
    </div>
    <div className="daily-details-grid"><div className="daily-detail-card"><div className="detail-icon blue"><Activity size={20} /></div><span className="detail-label">SE REVISA</span><h3>El avance</h3><p>El progreso del equipo hacia el objetivo establecido para el Sprint.</p></div><div className="daily-detail-card"><div className="detail-icon violet"><ShieldCheck size={20} /></div><span className="detail-label">SE IDENTIFICA</span><h3>Los obstáculos</h3><p>Las dificultades que pueden afectar el trabajo o el avance del equipo.</p></div><div className="daily-detail-card"><div className="detail-icon orange"><Target size={20} /></div><span className="detail-label">SE ORGANIZA</span><h3>El día de trabajo</h3><p>Las tareas más importantes y las actividades que siguen.</p></div></div>
    <div className="daily-definition"><div className="definition-mark"><MessageCircle size={22} /></div><div><span className="detail-label">DEFINICIÓN DEL TALLER</span><p>{daily.definition}</p></div></div>
  </div>
}

function GroupPage() {
  return <div className="inner-page content-wrap group-page">
    <PageHeading eyebrow="04 / INFORMACIÓN ACADÉMICA" title="Sobre este trabajo" description="Datos de identificación del taller teórico de Gestión de Proyectos, desarrollado por el Grupo 6." icon={GraduationCap} />
    <div className="group-banner"><div className="group-banner-mark"><GraduationCap size={32} /></div><div><span className="eyebrow light">UNIVERSIDAD TECNOLÓGICA DE SANTANDER</span><h2>Ingeniería de Sistemas</h2><p>Bucaramanga · 2026</p></div><div className="group-stamp">GRUPO<br /><strong>06</strong></div></div>
    <div className="group-info-grid"><div className="group-info-card"><span className="detail-label">INTEGRANTES</span><div className="member-row"><div className="member-avatar">AH</div><div><strong>Arturo Hernández Hernández</strong><small>Estudiante · Grupo 6</small></div></div><div className="member-row"><div className="member-avatar avatar-violet">JV</div><div><strong>Juan Felipe Velasco Tobón</strong><small>Estudiante · Grupo 6</small></div></div></div><div className="group-info-card instructor-card"><span className="detail-label">DOCENTE</span><div className="instructor-icon"><GraduationCap size={24} /></div><h3>Gretcheen Kathleen<br />Gelvez Ricciulli</h3><p>Docente de Gestión de Proyectos</p><div className="class-code"><span>GRUPO ACADÉMICO</span><strong>A194</strong></div></div></div>
    <div className="academic-note"><FileText size={19} /><div><strong>Sobre el contenido</strong><p>Esta primera versión presenta los roles y conceptos de Scrum desarrollados en el Taller Teórico de Gestión de Proyectos. Las próximas actividades podrán añadirse como nuevas secciones del blog.</p></div></div>
  </div>
}

function Footer({ navigate }) {
  return <footer className="site-footer"><div className="content-wrap footer-main"><div className="footer-brand"><BrandMark /><div><strong>Gestión de Proyectos</strong><span>Blog académico · Grupo 6</span></div></div><p>Un espacio de consulta y aprendizaje sobre los temas desarrollados en clase.</p><div className="footer-links"><button onClick={() => navigate('inicio')}>Inicio</button><button onClick={() => navigate('roles')}>Roles</button><button onClick={() => navigate('conceptos')}>Conceptos</button><button onClick={() => navigate('grupo')}>Grupo 6</button></div></div><div className="content-wrap footer-bottom"><span>© 2026 · Ingeniería de Sistemas · UTS</span><span>Contenido basado en el taller académico del Grupo 6.</span></div></footer>
}

export default App
