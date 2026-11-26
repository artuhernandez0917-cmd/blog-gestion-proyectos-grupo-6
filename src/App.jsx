import { useMemo, useState } from 'react'
import {
  Activity,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Bot,
  Copy,
  FileCheck2,
  PenLine,
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
  { id: 'publicaciones', label: 'Publicaciones', icon: BookOpen },
  { id: 'ia', label: 'Uso de IA', icon: Bot },
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


const articles = [
  {id:'taller-2', title:'Plan integral del proyecto AgroScan', date:'13 de noviembre de 2026', type:'Taller 2', description:'Planificación integral del sistema de auditoría y control ambiental agroindustrial.', searchText:'alcance viabilidad técnica económica operativa legal cronograma riesgos calidad requerimientos personal presupuesto',},
  {id:'taller-1', title:'AgroScan: propuesta de software ambiental', date:'12 de noviembre de 2026', type:'Taller 1', description:'Identificación del problema, propuesta de solución, actores involucrados y planificación inicial.', searchText:'palmeras bananeras cliente interesados pesticidas deforestación agua alcance riesgos presupuesto cronograma',},
]
// Ejemplos de prompts relacionados con las actividades del Grupo 6.
const aiPromptExamples = [
  {
    id: 'chatgpt',
    number: '01',
    tool: 'ChatGPT',
    title: 'Estructuración de la propuesta AgroScan',
    label: 'Ejemplo · planteamiento del proyecto',
    text: 'Actúa como asesor en gestión de proyectos de software. Ayúdame a organizar una propuesta académica para AgroScan, una plataforma web orientada al control ambiental en cultivos de palma y banano. Sugiere cómo presentar el problema, el propósito, los interesados, el alcance y las limitaciones. No inventes datos de la empresa y señala qué información debería verificarse.',
  },
  {
    id: 'deepseek',
    number: '02',
    tool: 'DeepSeek',
    title: 'Revisión de un plan integral',
    label: 'Ejemplo · revisión y claridad',
    text: 'Revisa la estructura de un plan integral académico para AgroScan. Comprueba que queden diferenciados el alcance, los entregables, la viabilidad, los riesgos, el aseguramiento de calidad y los requerimientos funcionales y no funcionales. Sugiere mejoras de redacción y coherencia para un cronograma estimado de 12 semanas y un presupuesto propuesto de $35.000.000 COP, sin presentar estos valores como resultados ejecutados.',
  },
]

const schedule = [['Análisis de requerimientos',2],['Diseño del sistema',2],['Desarrollo y programación',4],['Pruebas del software',2],['Implementación y capacitación',1],['Entrega final',1]]
const budget = [['Análisis y diseño',5000000],['Desarrollo del software',18000000],['Base de datos y alojamiento',3000000],['Pruebas y seguridad',4000000],['Implementación y capacitación',3000000],['Mantenimiento inicial',2000000]]
const modules = [
 ['Pesticidas','Registro de productos, cantidades, fechas, zonas e historial de aplicaciones.'],
 ['Consumo de agua','Medición por zona y periodo; alertas ante excesos frente a umbrales.'],
 ['Cobertura vegetal','Registro de áreas intervenidas y cambios de cobertura; imágenes satelitales solo mediante fuente externa.'],
 ['Vertimientos','Registro básico de vertimientos de plantas de beneficio y frigoríficos.'],
 ['Auditoría y alertas','Informes por zona y periodo, exportación PDF/Excel y alertas ambientales.'],
 ['Usuarios y campo','Roles y permisos; captura sin conexión y sincronización posterior prevista.'],
]
const risks = [
 ['Registro incorrecto de pesticidas','Validar rangos, unidades y catálogos.'],
 ['Fallas de conexión','Almacenamiento temporal y sincronización posterior.'],
 ['Pérdida de información','Copias diarias y pruebas de restauración.'],
 ['Acceso no autorizado','Autenticación, roles y registro de accesos.'],
 ['Datos de agua incorrectos','Verificación periódica de las mediciones.'],
 ['Retrasos del desarrollo','Seguimiento semanal y priorización del alcance.'],
]
const stakeholders = [
 ['Gerente general','Aprueba el proyecto, toma decisiones y recibe informes.'],
 ['Ingeniero ambiental','Define parámetros ambientales y valida los reportes.'],
 ['Ingeniero agrónomo','Supervisa pesticidas y productos químicos.'],
 ['Trabajadores agrícolas','Registran datos y participan en capacitación.'],
 ['Desarrolladores','Diseñan, programan e implementan la plataforma.'],
 ['Autoridades ambientales','Verifican el cumplimiento y la evidencia disponible.'],
]
const requirements = [
 ['Usuarios y permisos','RF-01 a RF-03','Acceso, administración de usuarios y autorización por rol.'],
 ['Pesticidas','RF-04 a RF-06','Aplicaciones, historial y catálogos.'],
 ['Agua','RF-07 a RF-08','Consumo y detección de excesos.'],
 ['Cobertura y vertimientos','RF-09 a RF-12','Zonas, mapas, fuente satelital externa y vertimientos.'],
 ['Alertas y reportes','RF-13 a RF-16','Alertas, reportes, exportaciones e indicadores.'],
 ['Auditoría y campo','RF-17 a RF-18','Trazabilidad y sincronización sin conexión.'],
]
const quality = [
 ['Fiabilidad','Cero pérdidas en las pruebas de respaldo.'],
 ['Seguridad','Cero fallas críticas en la revisión.'],
 ['Usabilidad','Registro de campo en menos de 2 minutos.'],
 ['Adecuación funcional','100 % de requisitos de prioridad alta aceptados.'],
 ['Eficiencia','Consultas habituales en menos de 3 segundos.'],
 ['Mantenibilidad','Código documentado y versionado.'],
]
const formatCOP = (v) => '$' + v.toLocaleString('es-CO')
function ArticleSection({title, eyebrow, children}) {return <section className="article-section"><div className="eyebrow">{eyebrow}</div><h2>{title}</h2>{children}</section>}
function Timeline() {let offset=0;return <div className="timeline"><div className="timeline-head"><span>CRONOGRAMA PROPUESTO</span><strong>12 semanas</strong></div>{schedule.map(([name,weeks],i)=>{const start=offset;offset+=weeks;return <div className="timeline-row" key={name}><div className="timeline-name"><span>{String(i+1).padStart(2,'0')}</span>{name}</div><div className="timeline-track"><div className="timeline-bar" style={{marginLeft:`${start/12*100}%`,width:`${weeks/12*100}%`}}/></div><strong>{weeks} {weeks===1?'semana':'semanas'}</strong></div>})}<p className="article-caption">Duraciones estimadas en el documento; no representan avance ejecutado.</p></div>}
function Budget() {return <div className="budget-panel"><div className="budget-total"><span>PRESUPUESTO ESTIMADO</span><strong>$35.000.000 <small>COP</small></strong><p>La mayor partida corresponde al desarrollo del software.</p></div><div className="budget-items">{budget.map(([name,value])=><div className="budget-item" key={name}><div><span>{name}</span><strong>{formatCOP(value)}</strong></div><div className="budget-track"><span style={{width:`${value/35000000*100}%`}}/></div></div>)}</div></div>}
function FactGrid({items}) {return <div className="fact-grid">{items.map(([title,desc],i)=><div className="fact-card" key={title}><span className="fact-number">{String(i+1).padStart(2,'0')}</span><h3>{title}</h3><p>{desc}</p></div>)}</div>}
function RiskList(){return <div className="risk-list">{risks.map(([risk,action],i)=><div className="risk-row" key={risk}><span>{String(i+1).padStart(2,'0')}</span><strong>{risk}</strong><p>{action}</p></div>)}</div>}
function ArticleOne(){return <>
 <div className="article-lead"><p>AgroScan se plantea como una plataforma web de auditoría y control ambiental para empresas palmeras y bananeras. La propuesta responde a la necesidad de centralizar registros de pesticidas, consumo de agua, cobertura vegetal y vertimientos, y facilitar la elaboración de informes.</p><div className="article-lead-stat"><Activity size={25}/><strong>AgroScan</strong><span>Software ambiental agroindustrial</span></div></div>
 <ArticleSection eyebrow="01 / CONTEXTO" title="La necesidad y el cliente"><p>El caso académico identifica como cliente a <strong>Agroindustrias del Caribe S.A.S.</strong>, empresa del sector agroindustrial ubicada en Magdalena, Colombia. La necesidad planteada es controlar y auditar el impacto ambiental de las operaciones agrícolas mediante información organizada y verificable.</p></ArticleSection>
 <ArticleSection eyebrow="02 / SOLUCIÓN PROPUESTA" title="Tres frentes de control"><div className="feature-three"><div><span>01</span><h3>Pesticidas</h3><p>Productos, cantidades aplicadas, fechas y zonas de cultivo.</p></div><div><span>02</span><h3>Deforestación</h3><p>Áreas intervenidas y cambios en la cobertura vegetal.</p></div><div><span>03</span><h3>Agua</h3><p>Consumo de riego y detección de posibles excesos.</p></div></div><p>Como funciones de apoyo, se proponen reportes, alertas e indicadores ambientales para las auditorías y la toma de decisiones.</p></ArticleSection>
 <ArticleSection eyebrow="03 / PARTICIPANTES" title="Interesados del proyecto"><FactGrid items={stakeholders}/></ArticleSection>
 <ArticleSection eyebrow="04 / PLANIFICACIÓN INICIAL" title="Tiempo y presupuesto"><Timeline/><Budget/></ArticleSection>
 <ArticleSection eyebrow="05 / ALCANCE" title="¿Qué se contempla en la propuesta?"><p>El alcance inicial comprende registro e historial de pesticidas, consumo de agua por zona, cambios de cobertura vegetal, informes de auditoría, alertas y administración de usuarios y permisos. No reemplaza inspecciones físicas ni análisis ambientales; las imágenes satelitales dependen de una fuente externa.</p></ArticleSection>
 <ArticleSection eyebrow="06 / GESTIÓN DEL PROYECTO" title="Equipo y riesgos"><p>Se identifican las funciones de dirección del proyecto, análisis de sistemas, diseño UX/UI, desarrollo frontend y backend, administración de base de datos, validación ambiental y pruebas. Entre los riesgos previstos están errores de registro, fallas de conectividad, pérdida de datos, accesos no autorizados y retrasos.</p><RiskList/></ArticleSection>
 <div className="article-conclusion"><strong>Resultado esperado</strong><p>Una plataforma tecnológica que contribuya al control de actividades agrícolas, la reducción de impactos ambientales y el cumplimiento de obligaciones ambientales. Es el resultado previsto en la propuesta, no un producto ya implementado.</p></div>
 </>}
function ArticleTwo(){return <>
 <div className="article-lead"><p>El segundo taller profundiza la propuesta AgroScan y la transforma en un plan integral: define entregables, criterios de aceptación, viabilidad, riesgos, calidad, requerimientos y responsabilidades para orientar su ejecución.</p><div className="article-lead-stat"><CalendarDays size={25}/><strong>12 semanas</strong><span>Horizonte planificado</span></div></div>
 <ArticleSection eyebrow="01 / PROPÓSITO Y ALCANCE" title="Una plataforma de control ambiental"><p>AgroScan busca sustituir registros dispersos en cuadernos, hojas de cálculo y reportes sueltos por una fuente de información centralizada, con historial útil para auditorías. El objetivo propuesto es entregar una plataforma web funcional en 12 semanas.</p><FactGrid items={modules}/><div className="article-note"><strong>Fuera del alcance:</strong> suministro de imágenes satelitales, aplicación móvil nativa, integración con ERP y sensores físicos. La primera versión contempla captura web adaptable a celular y registro manual de datos de cobertura.</div></ArticleSection>
 <ArticleSection eyebrow="02 / ENTREGABLES" title="Hitos de entrega"><div className="milestone-list">{[['Semana 2','Requerimientos aprobados'],['Semana 4','Arquitectura, datos y prototipos'],['Semana 8','Software de pruebas con prioridades altas'],['Semana 10','Informe de pruebas sin defectos críticos'],['Semana 11','Producción, respaldo, manual y capacitación'],['Semana 12','Código, documentación y acta de cierre']].map(([when,what])=><div key={when}><span>{when}</span><strong>{what}</strong></div>)}</div><p>La aceptación requiere módulos validados con el ingeniero ambiental, reportes generables por el auditor y capacitación completada.</p></ArticleSection>
 <ArticleSection eyebrow="03 / VIABILIDAD" title="Cinco dimensiones de evaluación"><FactGrid items={[["Técnica","API REST, PostgreSQL con soporte geográfico, reportes y aplicación web adaptable; especial cuidado con conexión y satélites."],["Económica","Inversión estimada de $35 millones COP, sin imágenes satelitales ni sensores."],["Operativa","Interfaz sencilla, piloto y capacitación para facilitar la adopción."],["Legal y normativa","Trazabilidad de registros, protección de datos y parámetros ambientales definidos con el cliente."],["Cronograma","Doce semanas, con priorización estricta y seguimiento semanal."]]}/></ArticleSection>
 <ArticleSection eyebrow="04 / RECURSOS" title="Presupuesto y cronograma"><Budget/><Timeline/><div className="article-note">La prioridad inicial se concentra en pesticidas, agua, usuarios y reportes. Los valores y plazos son estimaciones que el documento propone validar con el cliente.</div></ArticleSection>
 <ArticleSection eyebrow="05 / RIESGOS" title="Prevenir antes de corregir"><p>El plan propone revisar los riesgos semanalmente y activar respuestas según su impacto, como restaurar respaldos, cargar registros posteriormente o ajustar requisitos de menor prioridad.</p><RiskList/></ArticleSection>
 <ArticleSection eyebrow="06 / CALIDAD" title="Metas verificables"><p>El documento toma como referencia ISO/IEC 25010 y establece objetivos de fiabilidad, seguridad, usabilidad, funcionalidad, eficiencia y mantenibilidad.</p><FactGrid items={quality}/><p>Se contemplan pruebas de integración, sistema, seguridad, usabilidad, trabajo sin conexión, restauración y aceptación con datos reales. La entrega exige que no queden defectos críticos ni altos abiertos.</p></ArticleSection>
 <ArticleSection eyebrow="07 / REQUERIMIENTOS" title="Del requisito a la prueba"><p>El proceso comprende captura, documentación, validación, trazabilidad y control de cambios. La priorización se plantea mediante MoSCoW: obligatorio (M), debería estar (S) y podría estar (C).</p><div className="requirement-list">{requirements.map(([name,codes,desc])=><div key={name}><span>{codes}</span><div><strong>{name}</strong><p>{desc}</p></div></div>)}</div><div className="article-note"><strong>Requisitos no funcionales:</strong> rendimiento inferior a 3 segundos, disponibilidad mensual de al menos 99 % en horario laboral, HTTPS y contraseñas con hash, registros en menos de 2 minutos, copias diarias, integridad, mantenibilidad y privacidad.</div></ArticleSection>
 <ArticleSection eyebrow="08 / PERSONAS Y SEGUIMIENTO" title="Organización del trabajo"><p>El plan identifica dirección, análisis, UX/UI, frontend, backend, administración de datos, validación ambiental y pruebas. El equipo central lo conforman dos integrantes que cubren varios cargos, con apoyo puntual del cliente. La asignación concreta se acuerda en la semana 1.</p><p>Se propone un enfoque iterativo con ciclos de una o dos semanas, seguimiento semanal, informes al gerente y demostraciones quincenales a los usuarios clave.</p></ArticleSection>
 <div className="article-conclusion"><strong>Conclusión del plan</strong><p>El documento considera viable el proyecto bajo condiciones: validar cifras y parámetros con el cliente, priorizar requisitos esenciales, cuidar la adopción y controlar los riesgos. Las funcionalidades descritas son propuestas de desarrollo, no características ya implementadas.</p></div>
 </>}
function PublicationsPage(){const [selected,setSelected]=useState('taller-2');const article=articles.find(a=>a.id===selected);return <div className="inner-page content-wrap publication-page">
 <PageHeading eyebrow="BITÁCORA / ACTIVIDADES ACADÉMICAS" title="Publicaciones" description="Un registro ordenado de los talleres, propuestas y aprendizajes de Gestión de Proyectos. Cada actividad tiene su propia entrada y el blog seguirá creciendo." icon={BookOpen}/>
 <div className="publication-layout"><aside className="publication-sidebar"><span className="eyebrow">ARCHIVO DE ENTRADAS</span>{articles.map(a=><button key={a.id} onClick={()=>{setSelected(a.id);window.scrollTo({top:0,behavior:'smooth'})}} className={`publication-select ${selected===a.id?'active':''}`}><span>{a.type} · 2026</span><strong>{a.title}</strong><small>{a.date}</small><ArrowUpRight size={16}/></button>)}<div className="publication-upcoming"><BookOpen size={20}/><strong>Próximas actividades</strong><p>Las nuevas entregas se agregarán como publicaciones independientes.</p></div></aside>
 <article className="publication-article"><div className="article-cover"><div className="article-cover-top"><span>{article.type.toUpperCase()} · GRUPO 6</span><Activity size={23}/></div><h1>{article.title}</h1><p>{article.description}</p><div className="article-cover-bottom"><span><CalendarDays size={15}/>{article.date}</span><span>INGENIERÍA DE SISTEMAS</span></div></div><div className="article-byline"><span><Users size={17}/> Arturo Hernández Hernández · Juan Felipe Velasco Tobón</span><span>UTS · Bucaramanga</span></div><div className="article-body">{selected==='taller-1'?<ArticleOne/>:<ArticleTwo/>}<div className="article-end"><span>FIN DE LA PUBLICACIÓN</span><button onClick={()=>{setSelected(selected==='taller-1'?'taller-2':'taller-1');window.scrollTo({top:0,behavior:'smooth'})}}>Leer {selected==='taller-1'?'Taller 2':'Taller 1'} <ArrowRight size={17}/></button></div></div></article></div>
 </div>}

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
    ...articles.map((item) => ({ id: item.id, name: item.title, short: item.description, definition: item.searchText, type: 'Publicación', section: 'publicaciones' })),
    { id: 'uso-ia', name: 'Uso de inteligencia artificial', short: 'ChatGPT, DeepSeek, ejemplos de prompts y declaración de responsabilidad', type: 'Transparencia', section: 'ia' },
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
            <div className="search-box"><Search size={18} /><input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Busca publicaciones, roles o conceptos..." /><button onClick={() => setShowSearch(false)} aria-label="Cerrar búsqueda"><X size={18} /></button></div>
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
        {activeSection === 'publicaciones' && <PublicationsPage />}
        {activeSection === 'ia' && <AiDisclosurePage />}
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

    <section className="content-wrap journal-home">
      <div className="section-topline"><span className="eyebrow">04 / BITÁCORA ACADÉMICA</span><span className="section-note">Noviembre 2026</span></div>
      <div className="journal-home-head"><h2>Últimas <em>publicaciones.</em></h2><button className="inline-link" onClick={() => navigate('publicaciones')}>Ver todas las entradas <ArrowRight size={16}/></button></div>
      <div className="journal-preview-grid">
        <button onClick={() => navigate('publicaciones')} className="journal-preview"><span className="journal-preview-art"><Activity size={38}/></span><span className="journal-kicker">TALLER 2 · 13 NOV 2026</span><strong>Plan integral del proyecto AgroScan</strong><span>Alcance, viabilidad, presupuesto, riesgos, calidad y requerimientos.</span><span className="journal-read">Leer publicación <ArrowUpRight size={16}/></span></button>
        <button onClick={() => navigate('publicaciones')} className="journal-preview"><span className="journal-preview-art alternate"><Target size={38}/></span><span className="journal-kicker">TALLER 1 · 12 NOV 2026</span><strong>AgroScan: propuesta de software ambiental</strong><span>Problema, interesados, propósito, alcance y planificación inicial.</span><span className="journal-read">Leer publicación <ArrowUpRight size={16}/></span></button>
      </div>
    </section>
    <section className="content-wrap next-section">
      <div className="next-banner"><div className="next-icon"><BookOpen size={23} /></div><div className="next-copy"><span className="eyebrow light">NUEVAS PUBLICACIONES · AGROSCAN</span><h2>Del concepto a la planificación.</h2><p>Ya incorporamos dos nuevas publicaciones sobre AgroScan: la propuesta inicial y el plan integral del proyecto.</p></div><div className="next-decoration"><div className="deco-ring" /><div className="deco-ring ring-two" /><Layers3 size={48} /></div></div>
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

function AiDisclosurePage() {
  const [copyStatus, setCopyStatus] = useState('')

  const copyExample = async (id, content) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopyStatus(id)
    } catch {
      setCopyStatus(`error-${id}`)
    }
  }

  return <div className="inner-page content-wrap ai-page">
    <PageHeading
      eyebrow="05 / TRANSPARENCIA ACADÉMICA"
      title="Uso de inteligencia artificial"
      description="Cómo utilizamos la IA como apoyo para elaborar y contrastar los documentos entregados por ATENA y, después, para organizar el blog académico. Incluye ejemplos de prompts y el compromiso de los autores."
      icon={Bot}
    />

    <section className="ai-hero">
      <div className="ai-hero-copy">
        <span className="eyebrow light">HERRAMIENTAS DE APOYO</span>
        <h2>De los documentos académicos al blog: un proceso revisado por sus autores.</h2>
        <p>Durante la elaboración de los talleres de Gestión de Proyectos, incluidos la propuesta de AgroScan y su plan integral, utilizamos ChatGPT y DeepSeek como herramientas de apoyo para consultar conceptos, organizar ideas y revisar textos. Contrastamos la información obtenida antes de incorporarla a los documentos académicos entregados por ATENA. Posteriormente, utilizamos esos documentos revisados como base para desarrollar y organizar las publicaciones de este blog. Las decisiones y el contenido final corresponden a los autores.</p>
        <div className="ai-hero-chips"><span><CheckCircle2 size={15}/> Apoyo en documentos</span><span><FileCheck2 size={15}/> Información contrastada</span><span><BookOpen size={15}/> Blog a partir de los talleres</span></div>
      </div>
      <div className="ai-hero-art" aria-hidden="true">
        <div className="ai-orbit ai-orbit-one"/><div className="ai-orbit ai-orbit-two"/>
        <div className="ai-symbol"><Bot size={51} strokeWidth={1.5}/><span>IA</span></div>
        <div className="ai-float ai-float-first"><PenLine size={15}/> Ideas</div>
        <div className="ai-float ai-float-second"><FileCheck2 size={15}/> Revisión</div>
      </div>
    </section>

    <section className="ai-block">
      <div className="ai-section-heading"><div><span className="eyebrow">01 / IDENTIFICACIÓN</span><h2>Herramientas utilizadas</h2></div></div>
      <div className="ai-tools-grid">
        <div className="ai-tool-card chatgpt"><div className="ai-tool-top"><span className="ai-tool-icon"><MessageCircle size={25}/></span><span className="ai-tool-count">HERRAMIENTA 01</span></div><h3>ChatGPT</h3><p>Se utilizó como apoyo para consultar conceptos, estructurar ideas y proponer formas de presentar la información de los talleres. También apoyó la organización del contenido al adaptarlo a las publicaciones del blog.</p><span className="ai-tool-tag">Documentos académicos y blog</span></div>
        <div className="ai-tool-card deepseek"><div className="ai-tool-top"><span className="ai-tool-icon"><Bot size={25}/></span><span className="ai-tool-count">HERRAMIENTA 02</span></div><h3>DeepSeek</h3><p>Se utilizó como apoyo para examinar explicaciones, revisar la claridad de los textos y contrastar enfoques durante la preparación de los documentos. Las sugerencias se revisaron antes de incorporarlas al trabajo final.</p><span className="ai-tool-tag">Documentos académicos y contraste</span></div>
      </div>
    </section>

    <section className="ai-block ai-prompts-block">
      <div className="ai-section-heading"><div><span className="eyebrow">02 / EJEMPLOS</span><h2>Dos ejemplos de prompts</h2></div></div>
      <div className="ai-prompts-grid">{aiPromptExamples.map(example => <article className="ai-prompt-card" key={example.id}>
        <div className="ai-prompt-head"><span className="ai-prompt-index">{example.number}</span><span className="ai-prompt-platform">{example.tool}</span></div>
        <span className="ai-prompt-label">{example.label}</span>
        <h3>{example.title}</h3>
        <div className="ai-prompt-quote"><span className="ai-quote-mark">“</span><p>{example.text}</p></div>
        <button type="button" className="ai-copy-button" onClick={() => copyExample(example.id, example.text)} aria-label={`Copiar el ejemplo de prompt de ${example.tool}`}>
          {copyStatus === example.id ? <Check size={16}/> : <Copy size={16}/>}
          {copyStatus === example.id ? 'Prompt copiado' : copyStatus === `error-${example.id}` ? 'No se pudo copiar' : 'Copiar ejemplo'}
        </button>
      </article>)}</div>
    </section>

    <section className="ai-responsibility" aria-labelledby="ai-responsibility-title">
      <div className="ai-responsibility-icon"><ShieldCheck size={28}/></div>
      <div className="ai-responsibility-content"><span className="eyebrow light">03 / COMPROMISO DE LOS AUTORES</span><h2 id="ai-responsibility-title">Declaración de responsabilidad</h2><blockquote>“Nos hacemos responsables de toda la información publicada en este blog, incluida aquella que haya sido elaborada o redactada con apoyo de herramientas de inteligencia artificial, así como de la información suministrada en los documentos entregados a través de ATENA. Asumimos la responsabilidad de revisar, verificar y corregir su contenido cuando sea necesario.”</blockquote><div className="ai-signature"><span>Arturo Hernández Hernández</span><span>Juan Felipe Velasco Tobón</span><small>Autores · Grupo 6 · Ingeniería de Sistemas</small></div></div>
    </section>
  </div>
}

function Footer({ navigate }) {
  return <footer className="site-footer"><div className="content-wrap footer-main"><div className="footer-brand"><BrandMark /><div><strong>Gestión de Proyectos</strong><span>Blog académico · Grupo 6</span></div></div><p>Un espacio de consulta y aprendizaje sobre los temas desarrollados en clase.</p><div className="footer-links"><button onClick={() => navigate('inicio')}>Inicio</button><button onClick={() => navigate('roles')}>Roles</button><button onClick={() => navigate('conceptos')}>Conceptos</button><button onClick={() => navigate('publicaciones')}>Publicaciones</button><button onClick={() => navigate('ia')}>Uso de IA</button><button onClick={() => navigate('grupo')}>Grupo 6</button></div></div><div className="content-wrap footer-bottom"><span>© 2026 · Ingeniería de Sistemas · UTS</span><span>Uso de IA en los documentos y el blog · Declaración de responsabilidad conjunta.</span></div></footer>
}

export default App
