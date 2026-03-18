import { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";
import profilePhoto from "../assets/images/foto1.jpeg";

// ══════════════════════════════════════
// CUSTOM HOOKS FOR ANIMATIONS
// ══════════════════════════════════════

// Hook for scroll-triggered animations
function useIntersectionObserver(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setIsVisible(true);
        setHasAnimated(true);
      }
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
      ...options
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated, options]);

  return [ref, isVisible];
}

// Hook for counting animation
function useCountUp(end, duration = 2000, start = 0) {
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isAnimating) {
        setIsAnimating(true);
        const startTime = Date.now();
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(start + (end - start) * easeOut);
          setCount(current);
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [end, duration, start, isAnimating]);

  return [ref, count];
}

// Hook for typing effect
function useTypingEffect(text, speed = 100, delay = 500) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isTyping) {
        setIsTyping(true);
        setTimeout(() => {
          let index = 0;
          const typeInterval = setInterval(() => {
            if (index < text.length) {
              setDisplayText(text.slice(0, index + 1));
              index++;
            } else {
              clearInterval(typeInterval);
              setTimeout(() => setShowCursor(false), 2000);
            }
          }, speed);
        }, delay);
      }
    }, { threshold: 0.5 });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [text, speed, delay, isTyping]);

  return [ref, displayText, showCursor];
}

// Animated Section Component
function AnimatedSection({ children, className = "", delay = 0, direction = "up" }) {
  const [ref, isVisible] = useIntersectionObserver();
  
  const getAnimationClass = () => {
    if (!isVisible) return "scroll-hidden";
    switch (direction) {
      case "left": return "scroll-visible animate-slide-left";
      case "right": return "scroll-visible animate-slide-right";
      case "scale": return "scroll-visible animate-scale-in";
      default: return "scroll-visible animate-fade-in-up";
    }
  };

  return (
    <div 
      ref={ref} 
      className={`${getAnimationClass()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const EXP = [
  {
    period: "Dec 2025 - Present",
    company: "Kementerian Keuangan RI",
    location: "Central Jakarta",
    role: "Data / Application Analyst Intern",
    bullets: [
      "Mengolah dan menganalisis data performa skala besar untuk menghasilkan business insight strategis.",
      "Merancang tools simulasi perilaku kerja berbasis data untuk memprediksi outcome performa pegawai.",
      "Menyusun User Requirements komprehensif dan membangun solusi full-stack end-to-end.",
    ],
    tags: ["React.js", "Flutter", "Node.js", "MySQL"],
    color: "#4f8cff",
  },
  {
    period: "Apr 2025 - Sep 2025",
    company: "CNN Indonesia",
    location: "South Jakarta",
    role: "Electronic Graphic Operator",
    bullets: [
      "Mengoperasikan sistem Resolume dan Vizrt untuk siaran langsung, mengelola 9 layar plasma di Studio 1 dan 4 layar di Studio 2.",
      "Mendukung 10+ program unggulan CNN Indonesia termasuk The Big Idea Forum, Insight with Desi Anwar, dan Prime News.",
      "Berkontribusi pada event Indonesia Leading Women dan meningkatkan efisiensi tim sebesar 90%.",
    ],
    tags: ["Resolume", "Vizrt", "IT Broadcast", "Live Production"],
    color: "#ff6b6b",
  },
  {
    period: "Jul 2023 - Dec 2023",
    company: "Dinas Perhubungan Kab. Bogor",
    location: "Bogor",
    role: "Android Developer Intern",
    bullets: [
      "Mengembangkan aplikasi absensi Android berbasis Flutter dengan BLoC Cubit state management.",
      "Menyelesaikan 19 halaman aplikasi mencakup UI dan business logic dalam deadline ketat.",
      "Mengintegrasikan layanan Firebase (Cloud, Storage, Database) dan memanfaatkan Git untuk version control.",
    ],
    tags: ["Flutter", "Firebase", "BLoC Cubit", "Git"],
    color: "#38d9a9",
  },
  {
    period: "Sep 2023 - Jan 2024",
    company: "Universitas Pakuan",
    location: "Bogor",
    role: "Teaching Assistant - Algorithms and Programming",
    bullets: [
      "Mendampingi pengajaran mata kuliah Algoritma dan Pemrograman (C++) untuk 30 mahasiswa.",
      "Menyusun materi pembelajaran berbasis jurnal akademik terkini untuk meningkatkan kualitas instruksi.",
      "Memberikan bimbingan praktis dan latihan pemrograman untuk memperkuat pemahaman konsep fundamental.",
    ],
    tags: ["C++", "Algorithms", "Teaching", "Mentoring"],
    color: "#b48cff",
  },
];

const PROJ = [
  {
    num: "01",
    title: "Full-Stack Web Application",
    sub: "Kementerian Keuangan RI",
    desc: "Aplikasi web end-to-end mencakup simulasi perilaku kerja dan analisis data performa pegawai.",
    tags: ["React.js", "Node.js", "MySQL"],
    year: "2025",
    link: "https://website-kementerian.vercel.app/login",
    linkLabel: "Live Demo",
    color: "#4f8cff",
  },
  {
    num: "02",
    title: "Sistem Informasi Absensi Non-ASN",
    sub: "Dinas Perhubungan Kab. Bogor",
    desc: "Aplikasi absensi Android untuk pegawai Non-ASN dibangun dengan Flutter, Firebase, dan BLoC.",
    tags: ["Flutter", "Firebase", "Android"],
    year: "2023",
    link: "https://youtu.be/J1LN7FQeMG8",
    linkLabel: "Demo Video",
    color: "#38d9a9",
  },
  {
    num: "03",
    title: "IoT Waste Volume Monitoring",
    sub: "Final Project D-III",
    desc: "Sistem monitoring volume sampah otomatis berbasis IoT menggunakan sensor ultrasonik dan mikrokontroler.",
    tags: ["IoT", "MQTT", "C/C++", "Smart City"],
    year: "2024",
    link: "https://youtu.be/K7GKxpyISBM",
    linkLabel: "Demo Video",
    color: "#38d9a9",
  },
];

const SKILLS = [
  { label: "Frontend", items: ["React.js", "Flutter", "HTML/CSS", "JavaScript"] },
  { label: "Backend & DB", items: ["Node.js", "MySQL", "Firebase"] },
  { label: "IoT & Embedded", items: ["C/C++", "Wi-Fi IoT", "Microcontroller"] },
  { label: "Tools", items: ["Git", "Resolume", "Vizrt", "Cursor AI", "Trae"] },
  { label: "Soft Skills", items: ["Communication", "Teamwork", "Time Management", "Adaptability"] },
];

// StatItem Component with counter animation
function StatItem({ value, label, delay = 0 }) {
  const numericValue = parseFloat(value);
  const isDecimal = value.includes('.');
  const [ref, count] = useCountUp(numericValue * 100, 2000);
  
  const displayValue = isDecimal 
    ? (count / 100).toFixed(2) 
    : Math.floor(count / 100) + (value.includes('+') ? '+' : '');

  return (
    <div ref={ref} className="stat-item" style={{ animationDelay: `${delay}ms` }}>
      <span className="stat-val counter-animate">{displayValue}</span>
      <span className="stat-lbl">{label}</span>
    </div>
  );
}

// 3D Tilt Card Component
function TiltCard({ children, className = "" }) {
  const cardRef = useRef(null);
  
  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    }
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`${className} hover-lift`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [nameRef, typedName, showCursor] = useTypingEffect("Raden Muhammad Faqih", 80, 300);
  
  return (
    <div className="page">

      {/* ── NAVBAR ── */}
      <nav className="nav animate-fade-in">
        <div className="nav-inner">
          <span className="nav-logo">RMF</span>
          
          <div className="nav-links">
            <a href="#about" className="magnetic-btn">About</a>
            <a href="#experience" className="magnetic-btn">Experience</a>
            <a href="#projects" className="magnetic-btn">Projects</a>
            <a href="#skills" className="magnetic-btn">Skills</a>
            <a href="#contact-section" className="magnetic-btn">Contact</a>
          </div>
          
          <a href="mailto:faqihintiatom@gmail.com" className="nav-hire ripple desktop-only">Hire Me</a>
          
          <div 
            className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        
        <div className={`mobile-nav ${mobileMenuOpen ? 'active' : ''}`}>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#experience" onClick={() => setMobileMenuOpen(false)}>Experience</a>
          <a href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</a>
          <a href="#skills" onClick={() => setMobileMenuOpen(false)}>Skills</a>
          <a href="#contact-section" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          <a href="mailto:faqihintiatom@gmail.com" className="nav-hire ripple" style={{marginTop: '10px', textAlign: 'center'}}>Hire Me</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="about">
        <div className="hero-inner">
          <div className="particles">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="particle" 
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: `${6 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>

          <div className="hero-left">
            <AnimatedSection delay={0} direction="left">
              <div className="hero-badge animate-glow">
                <span className="badge-dot"></span>
                Available for opportunities
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={100} direction="left">
              <h1 ref={nameRef} className={`hero-name ${showCursor ? 'typing-cursor' : ''}`}>
                {typedName || "Raden Muhammad\nFaqih"}
              </h1>
            </AnimatedSection>
            
            <AnimatedSection delay={200}>
              <p className="hero-roles animate-fade-in delay-200">
                Junior Website Developer &nbsp;&middot;&nbsp; Android Developer 
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={300}>
              <p className="hero-bio">
                Lulusan D-III Teknik Komputer Universitas Pakuan (IPK 3.63) spesialisasi sofware developer.
                Berpengalaman hampir 2 tahun membangun aplikasi Android (Flutter, Firebase), web app (React.js, Node.js)
                
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={400}>
              <div className="hero-stats">
                <StatItem value="3.63" label="GPA" delay={0} />
                <div className="stat-sep animate-fade-in delay-500"></div>
                <StatItem value="2+" label="Years Exp" delay={200} />
                <div className="stat-sep animate-fade-in delay-600"></div>
                <StatItem value="4" label="Companies" delay={400} />
                <div className="stat-sep animate-fade-in delay-700"></div>
                <StatItem value="10+" label="TV Programs" delay={600} />
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={500}>
              <div className="hero-btns">
                <a href="mailto:faqihintiatom@gmail.com" className="btn-primary ripple magnetic-btn">Email Me</a>
                <a href="https://www.linkedin.com/in/raden-muhammad-faqih-059411252/" target="_blank" rel="noreferrer" className="btn-secondary ripple magnetic-btn">LinkedIn</a>
                <a href="https://www.canva.com/design/DAGxWvWtG-4/IIwtNwEI4BHT1pC6ZEJ74g/edit" target="_blank" rel="noreferrer" className="btn-ghost ripple magnetic-btn">Portfolio PDF</a>
              </div>
            </AnimatedSection>
          </div>

          <div className="hero-right">
            <AnimatedSection delay={200} direction="right">
              <div className="photo-wrap animate-float hover-glow">
                <img src={profilePhoto} alt="Raden Muhammad Faqih" className="photo" />
              </div>
            </AnimatedSection>
            
            
          </div>

        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section className="sec" id="experience">
        <div className="sec-inner">
          <AnimatedSection>
            <div className="sec-head">
              <h2 className="sec-title">Intern Experience</h2>
              <span className="sec-badge">{EXP.length} positions</span>
            </div>
          </AnimatedSection>
          
          <div className="exp-list">
            {EXP.map(function(e, i) {
              return (
                <AnimatedSection key={i} delay={i * 100} direction={i % 2 === 0 ? "left" : "right"}>
                  <TiltCard className="exp-card hover-glow">
                    <div className="exp-left">
                      <span className="exp-period">{e.period}</span>
                      <span className="exp-loc">{e.location}</span>
                    </div>
                    <div className="exp-right">
                      <div className="exp-accent" style={{ background: e.color }}></div>
                      <div className="exp-body">
                        <p className="exp-company">{e.company}</p>
                        <p className="exp-role" style={{ color: e.color }}>{e.role}</p>
                        <ul className="exp-bullets">
                          {e.bullets.map(function(b, j) {
                            return <li key={j}>{b}</li>;
                          })}
                        </ul>
                        <div className="exp-tags">
                          {e.tags.map(function(t) {
                            return (
                              <span key={t} className="etag shimmer" style={{ color: e.color, borderColor: e.color + "55" }}>
                                {t}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section className="sec" id="education">
        <div className="sec-inner">
          <AnimatedSection>
            <div className="sec-head">
              <h2 className="sec-title">Education</h2>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={100}>
            <TiltCard className="edu-card hover-glow">
              <div className="edu-top">
                <div>
                  <p className="edu-school">Universitas Pakuan</p>
                  <p className="edu-degree">Diploma III - Teknik Komputer (Internet of Things)</p>
                  <p className="edu-meta">Bogor, Jawa Barat &nbsp;&middot;&nbsp; Aug 2021 - Nov 2024</p>
                </div>
                <span className="edu-gpa gradient-text">IPK 3.63</span>
              </div>
              <div className="edu-proj">
                <p className="edu-proj-label">Final Project</p>
                <p className="edu-proj-title">
                  Automatic Waste Volume Monitoring and Detection System Based on Internet of Things (IoT)
                </p>
                <p className="edu-proj-desc">
                  Sistem cerdas berbasis IoT untuk memonitor dan mendeteksi volume sampah secara otomatis menggunakan
                  sensor ultrasonik dan mikrokontroler. Menerapkan konsep smart city dalam lingkungan berkelanjutan.
                </p>
                <a href="https://youtu.be/K7GKxpyISBM" target="_blank" rel="noreferrer" className="edu-link ripple">
                  Watch Demo &#8599;
                </a>
              </div>
            </TiltCard>
          </AnimatedSection>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section className="sec" id="projects">
        <div className="sec-inner">
          <AnimatedSection>
            <div className="sec-head">
              <h2 className="sec-title">Projects</h2>
              <span className="sec-badge">{PROJ.length} projects</span>
            </div>
          </AnimatedSection>
          
          <div className="proj-grid">
            {PROJ.map(function(p, i) {
              return (
                <AnimatedSection key={i} delay={i * 150} direction="scale">
                  <TiltCard className="proj-card hover-glow">
                    <div className="proj-top">
                      <span className="proj-num" style={{ color: p.color }}>{p.num}</span>
                      <span className="proj-year">{p.year}</span>
                    </div>
                    <p className="proj-title">{p.title}</p>
                    <p className="proj-sub">{p.sub}</p>
                    <p className="proj-desc">{p.desc}</p>
                    <div className="proj-tags">
                      {p.tags.map(function(t) {
                        return <span key={t} className="ptag">{t}</span>;
                      })}
                    </div>
                    <a href={p.link} target="_blank" rel="noreferrer" className="proj-link ripple" style={{ color: p.color }}>
                      {p.linkLabel} &#8599;
                    </a>
                  </TiltCard>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section className="sec" id="skills">
        <div className="sec-inner">
          <AnimatedSection>
            <div className="sec-head">
              <h2 className="sec-title">Skills</h2>
            </div>
          </AnimatedSection>
          
          <div className="skills-list">
            {SKILLS.map(function(g, i) {
              return (
                <AnimatedSection key={g.label} delay={i * 100}>
                  <div className="skill-row hover-lift">
                    <span className="skill-label">{g.label}</span>
                    <div className="skill-chips">
                      {g.items.map(function(s, j) {
                        return (
                          <span key={s} className="schip ripple" style={{ animationDelay: `${j * 50}ms` }}>
                            {s}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      
      
      {/* ── CONTACT SECTION ── */}
      <section className="sec" id="contact-section">
        <div className="sec-inner">
          <AnimatedSection>
            <div className="sec-head">
              <h2 className="sec-title">Get In Touch</h2>
              <span className="sec-badge">Let's Connect</span>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={100}>
            <div className="contact-grid">
              <TiltCard className="contact-card-large hover-glow">
                <div className="contact-card-icon">&#9993;</div>
                <h3 className="contact-card-title">Email</h3>
                <p className="contact-card-desc">Ready to discuss opportunities? Send me an email directly!</p>
                <a href="mailto:faqihintiatom@gmail.com?subject=Job%20Opportunity%20-%20Raden%20Faqih&body=Hi%20Raden,%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20potential%20opportunity%20with%20you.%0A%0ABest%20regards," className="btn-primary ripple magnetic-btn contact-btn">
                  Email Me Now
                </a>
                <p className="contact-email-display">faqihintiatom@gmail.com</p>
              </TiltCard>
              
              <TiltCard className="contact-card-large hover-glow">
                <div className="contact-card-icon">&#128279;</div>
                <h3 className="contact-card-title">LinkedIn</h3>
                <p className="contact-card-desc">Connect with me professionally and see my career journey.</p>
                <a href="https://www.linkedin.com/in/raden-muhammad-faqih-059411252/" target="_blank" rel="noreferrer" className="btn-secondary ripple magnetic-btn contact-btn">
                  Connect on LinkedIn
                </a>
                <p className="contact-email-display">Raden Muhammad Faqih</p>
              </TiltCard>
              
              <TiltCard className="contact-card-large hover-glow">
                <div className="contact-card-icon">&#128205;</div>
                <h3 className="contact-card-title">Location</h3>
                <p className="contact-card-desc">Based in Bogor, Jawa Barat. Open to remote and on-site opportunities.</p>
                <div className="contact-location-display">
                  <span>Bogor, Jawa Barat</span>
                  <span className="location-badge">Indonesia</span>
                </div>
              </TiltCard>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={200}>
            <div className="contact-suggestion glass">
              <h4 className="suggestion-title">&#128161; Why Hire Me?</h4>
              <ul className="suggestion-list">
                <li><strong>Fast Learner:</strong> Quickly adapts to new technologies and environments</li>
                <li><strong>Problem Solver:</strong> Analytical thinking with practical solutions</li>
                <li><strong>Team Player:</strong> Great communication and collaboration skills</li>
                <li><strong>Result Oriented:</strong> Focused on delivering quality work on time</li>
                <li><strong>Passionate:</strong> Genuine love for coding and technology</li>
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          
        </div>
        <div className="footer-copy">
          &copy; 2026 Raden Muhammad Faqih &middot; Built with React.js + Vite
        </div>
      </footer>

    </div>
  );
}
