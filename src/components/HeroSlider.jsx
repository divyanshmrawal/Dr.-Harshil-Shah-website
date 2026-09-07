import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

const SLIDES = [
  {
    id: 0,
    eyebrow: 'EXPERT ORTHOPAEDIC CARE IN AHMEDABAD',
    title: (
      <>
        Better Movement.<br />
        <span className="text-highlight-blue">A Healthier Tomorrow.</span>
      </>
    ),
    desc: 'Thoughtful care for sports injuries, arthroscopy, joint preservation and replacement — explained in simple terms, with your well-being at the centre.',
    primaryBtn: { text: 'Book Appointment', link: '/appointment' },
    secondaryBtn: { text: 'Explore Treatments', link: '/treatments' },
    features: [
      {
        icon: (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        ),
        text: 'Personalised Treatment Plans'
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 11 14 15 10" />
          </svg>
        ),
        text: 'Evidence-Based Approach'
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7z" />
          </svg>
        ),
        text: 'Focus on Long-Term Mobility'
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        ),
        text: 'Compassionate Patient Care'
      }
    ],
    image: '/doctor-hero-office.png',
    alt: 'Dr. Harshil Shah Orthopaedic Surgeon',
  },
  {
    id: 1,
    eyebrow: 'LESS PAIN  •  MORE POSSIBILITY',
    title: (
      <>
        Get Back to<br />
        <span className="text-highlight-blue">What You Love.</span>
      </>
    ),
    desc: 'Specialised care for joint pain, sports injuries and mobility issues — so you can move with confidence in everyday life.',
    primaryBtn: { text: 'Book Appointment', link: '/appointment' },
    secondaryBtn: { text: 'Learn More', link: '/about' },
    features: [
      {
        icon: (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7z" />
          </svg>
        ),
        text: 'Sports Injury Management'
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v20M7 8h10M7 16h10" />
          </svg>
        ),
        text: 'Arthroscopy & Joint Preservation'
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        ),
        text: 'Joint Replacement Solutions'
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          </svg>
        ),
        text: 'Rehabilitation & Recovery Support'
      }
    ],
    image: '/rehab-knee-hero.jpg',
    alt: 'Knee Joint Rehabilitation Runner',
  }
];

export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const timerRef = useRef(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handlePrev = useCallback(() => {
    setActiveSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
    startTimer();
  }, [startTimer]);

  const handleNext = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    startTimer();
  }, [startTimer]);

  return (
    <section className="v2-hero-section">
      <div className="shell v2-hero-container">

        {/* Slides Track */}
        <div className="v2-hero-slides-wrapper">
          {SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`v2-hero-slide-item ${activeSlide === idx ? 'is-active' : ''}`}
              style={{ backgroundImage: `url("${slide.image}")` }}
            >
              <div className="v2-hero-grid">

                {/* Left Content Column */}
                <div className="v2-hero-left">
                  <h1 className="v2-hero-title">{slide.title}</h1>

                  <p className="v2-hero-desc">{slide.desc}</p>

                  {/* Action Buttons */}
                  <div className="v2-hero-actions">
                    <Link to={slide.primaryBtn.link} className="v2-hero-btn-primary">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span>{slide.primaryBtn.text}</span>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>

                    <Link to={slide.secondaryBtn.link} className="v2-hero-btn-secondary">
                      <span>{slide.secondaryBtn.text}</span>
                    </Link>
                  </div>

                  {/* 4 Trust Features Row under buttons */}
                  <div className="v2-hero-features-grid">
                    {slide.features.map((feat, fIdx) => (
                      <div key={fIdx} className="v2-hero-feat-item">
                        <div className="v2-feat-icon">{feat.icon}</div>
                        <span className="v2-feat-text">{feat.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Stage Visual */}
                <div className="v2-hero-right">
                  <div className="v2-hero-image-stage">
                    <span className="sr-only">{slide.alt}</span>

                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Centered Controls: < ( • — ) > */}
        <div className="v2-hero-controls-bar">
          <button type="button" className="v2-ctrl-btn" onClick={handlePrev} aria-label="Previous banner slide">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="v2-ctrl-dots">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`v2-dot-item ${activeSlide === idx ? 'is-active' : ''}`}
                onClick={() => { setActiveSlide(idx); startTimer(); }}
                aria-label={`Show banner ${idx + 1}`}
              >
                <span className="v2-dot-bar" />
              </button>
            ))}
          </div>

          <button type="button" className="v2-ctrl-btn" onClick={handleNext} aria-label="Next banner slide">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Floating Bottom Stats Card Overlay */}
        <div className="v2-floating-stats-wrapper">
          <div className="v2-stats-card">

            {/* Stat 1 */}
            <div className="v2-stat-box">
              <div className="v2-stat-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#2563eb" strokeWidth="1.8">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c0 2 6 3 6 3s6-1 6-3v-5" />
                </svg>
              </div>
              <div className="v2-stat-info">
                <strong>15+</strong>
                <span className="v2-stat-title">Years of Experience</span>
                <span className="v2-stat-sub">In advanced orthopaedic care</span>
              </div>
            </div>

            <div className="v2-stat-divider" />

            {/* Stat 2 */}
            <div className="v2-stat-box">
              <div className="v2-stat-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#2563eb" strokeWidth="1.8">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="v2-stat-info">
                <strong>5000+</strong>
                <span className="v2-stat-title">Happy Patients</span>
                <span className="v2-stat-sub">Trust us for better movement</span>
              </div>
            </div>

            <div className="v2-stat-divider" />

            {/* Stat 3 */}
            <div className="v2-stat-box">
              <div className="v2-stat-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#2563eb" strokeWidth="1.8">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div className="v2-stat-info">
                <strong>2000+</strong>
                <span className="v2-stat-title">Successful Procedures</span>
                <span className="v2-stat-sub">Across a wide range of conditions</span>
              </div>
            </div>

            <div className="v2-stat-divider" />

            {/* Stat 4 */}
            <div className="v2-stat-box">
              <div className="v2-stat-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#2563eb" strokeWidth="1.8">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#2563eb" fillOpacity="0.15" />
                </svg>
              </div>
              <div className="v2-stat-info">
                <strong>98%</strong>
                <span className="v2-stat-title">Patient Satisfaction</span>
                <span className="v2-stat-sub">Because your recovery matters</span>
              </div>
            </div>

          </div>

          {/* Sub-line under stats card */}
          <div className="v2-stats-bottom-line">
            <span className="v2-line-dash" />
            <p>Trusted orthopaedic care. Experience, precision, and patient-first.</p>
            <span className="v2-line-dash" />
          </div>
        </div>

      </div>
    </section>
  );
}
