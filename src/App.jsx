import { useEffect, useState } from 'react'
import { profile, stats, skills, projects, oss, awards } from './data.js'
import { useInView, useCountUp, useScrollProgress } from './hooks.js'

/* ---------- 공통 ---------- */

function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, inView] = useInView()
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'in' : ''} ${className}`}
      style={{ '--d': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

function Section({ title, children }) {
  return (
    <section className="section">
      <Reveal as="h2" className="section-title">
        {title}
      </Reveal>
      {children}
    </section>
  )
}

function Tags({ items }) {
  const [ref, inView] = useInView()
  return (
    <ul ref={ref} className={`tags ${inView ? 'in' : ''}`}>
      {items.map((t, i) => (
        <li key={t} style={{ '--i': i }}>
          {t}
        </li>
      ))}
    </ul>
  )
}

/* ---------- 테마 아이콘 ---------- */

const iconProps = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

function SunIcon() {
  return (
    <svg {...iconProps} className="icon icon-sun">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg {...iconProps} className="icon icon-moon">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function getInitialTheme() {
  try {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
  } catch {}
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/* ---------- 섹션 컴포넌트 ---------- */

function Stat({ s, index }) {
  const [ref, inView] = useInView()
  const n = useCountUp(s.value, inView)
  return (
    <div ref={ref} className={`stat reveal ${inView ? 'in' : ''}`} style={{ '--d': `${index * 80}ms` }}>
      <strong>
        {n}
        <span>{s.suffix}</span>
      </strong>
      <span className="muted">{s.label}</span>
    </div>
  )
}

function Project({ p }) {
  return (
    <article className="project">
      <Reveal as="header">
        <div className="project-head">
          <h3>{p.name}</h3>
          <span className="muted">{p.tagline}</span>
        </div>
        <p className="meta">{p.period}</p>
        <p className="meta">{p.team}</p>
        <p className="meta">{p.role}</p>
        <p className="meta">{p.links.join(' · ')}</p>
      </Reveal>

      <Reveal as="p">{p.description}</Reveal>
      <Tags items={p.stack} />

      <Reveal as="h4">기여</Reveal>
      <ul className="list">
        {p.contributions.map((c, i) => (
          <Reveal as="li" key={c.title} delay={i * 70}>
            <strong>{c.title}</strong> — {c.body}
          </Reveal>
        ))}
      </ul>

      <Reveal as="h4">문제 해결 사례</Reveal>
      {p.cases.map((c) => (
        <Reveal className="case" key={c.title}>
          <h5>{c.title}</h5>
          <dl>
            <dt>원인</dt>
            <dd>{c.cause}</dd>
            <dt>해결</dt>
            <dd>{c.solution}</dd>
            <dt>회고</dt>
            <dd>{c.lesson}</dd>
          </dl>
        </Reveal>
      ))}
    </article>
  )
}

/* ---------- App ---------- */

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const progress = useScrollProgress()

  useEffect(() => {
    const root = document.documentElement
    // 테마 전환 시 모든 요소가 동시에 애니메이션되지 않도록 잠깐 끈다
    root.dataset.themeSwitching = ''
    root.dataset.theme = theme
    void root.offsetHeight
    const id = requestAnimationFrame(() => delete root.dataset.themeSwitching)
    try {
      localStorage.setItem('theme', theme)
    } catch {}
    return () => cancelAnimationFrame(id)
  }, [theme])

  const dark = theme === 'dark'

  return (
    <>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />

      <main className="page">
        <button
          className="theme-toggle"
          data-mode={theme}
          onClick={() => setTheme(dark ? 'light' : 'dark')}
          aria-label={dark ? '라이트 모드로 전환' : '다크 모드로 전환'}
          title={dark ? '라이트 모드' : '다크 모드'}
        >
          <SunIcon />
          <MoonIcon />
        </button>

        <header className="hero">
          <div>
            <h1 className="hero-item" style={{ '--i': 0 }}>
              {profile.name}
            </h1>
            <p className="title hero-item" style={{ '--i': 1 }}>
              {profile.title}
            </p>
          </div>
          <ul className="contact">
            {[profile.email, profile.phone].map((t, i) => (
              <li className="hero-item" style={{ '--i': i + 2 }} key={t}>
                {t}
              </li>
            ))}
            {profile.links.map((l, i) => (
              <li className="hero-item" style={{ '--i': i + 4 }} key={l.label}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </header>

        <Section title="소개">
          <Reveal as="p">{profile.summary}</Reveal>
          <div className="stats">
            {stats.map((s, i) => (
              <Stat key={s.label} s={s} index={i} />
            ))}
          </div>
        </Section>

        <Section title="기술">
          <dl className="skills">
            {skills.map((s, i) => (
              <Reveal key={s.group} delay={i * 60}>
                <dt>{s.group}</dt>
                <dd>
                  <Tags items={s.items} />
                </dd>
              </Reveal>
            ))}
          </dl>
        </Section>

        <Section title="프로젝트">
          {projects.map((p) => (
            <Project key={p.name} p={p} />
          ))}
        </Section>

        <Section title="오픈소스 기여 / 패키지">
          {oss.map((o) => (
            <Reveal as="article" className="oss" key={o.name}>
              <div className="project-head">
                <h3>{o.name}</h3>
                <span className="muted">
                  {o.kind} · {o.date}
                </span>
              </div>
              <p>{o.body}</p>
            </Reveal>
          ))}
        </Section>

        <Section title="수상 및 자격증">
          <ul className="awards">
            {awards.map((a, i) => (
              <Reveal as="li" key={a.name} delay={i * 70}>
                <span>
                  <strong>{a.name}</strong> <span className="muted">{a.org}</span>
                </span>
                <span className="muted">{a.date}</span>
              </Reveal>
            ))}
          </ul>
        </Section>
      </main>
    </>
  )
}
