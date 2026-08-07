'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Shield, FileText, Lock, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const EASE = [0.22, 1, 0.36, 1] as const;

const LEGAL_DATA = [
  {
    id: 'privacy',
    title: 'Privacy Policy',
    icon: Shield,
    items: [
      {
        question: 'Information We Collect',
        answer: 'We collect information you provide directly to us, such as when you create an account, fill out a form, request customer support, or otherwise communicate with us. The types of information we may collect include your name, email address, phone number, and any other information you choose to provide.'
      },
      {
        question: 'How We Use Your Information',
        answer: 'We use the information we collect to provide, maintain, and improve our services. This includes processing transactions, sending technical notices, responding to your comments and questions, and analyzing trends to better understand how users interact with our platform.'
      },
      {
        question: 'Cookies',
        answer: 'We use essential cookies to maintain secure sessions and ensure the core functionality of our platform. We do not use intrusive tracking cookies for third-party advertising.'
      },
      {
        question: 'Analytics',
        answer: 'We use privacy-friendly analytics tools to measure website traffic and improve our user experience. This data is aggregated and does not personally identify you.'
      },
      {
        question: 'Third Party Services',
        answer: 'We may share your information with trusted third-party vendors, consultants, and other service providers who need access to such information to carry out work on our behalf. These partners are bound by strict confidentiality agreements.'
      },
      {
        question: 'Data Storage',
        answer: 'Your data is securely stored on enterprise-grade cloud infrastructure located in highly secure data centers. We maintain strict access controls to ensure your information is never exposed to unauthorized personnel.'
      },
      {
        question: 'Data Protection',
        answer: 'We implement robust technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage.'
      },
      {
        question: 'User Rights',
        answer: 'Depending on your location, you may have the right to access, correct, or delete your personal data. You can exercise these rights at any time by contacting our privacy team.'
      },
      {
        question: 'Contact Information',
        answer: 'If you have any questions about this Privacy Policy or our data practices, please contact us at privacy@smorce.com.'
      }
    ]
  },
  {
    id: 'terms',
    title: 'Terms & Conditions',
    icon: FileText,
    items: [
      {
        question: 'Acceptance of Terms',
        answer: 'By accessing or using our services, you agree to be bound by these Terms. If you do not agree to these terms, you may not access or use our services.'
      },
      {
        question: 'Services',
        answer: 'Smorce provides custom software development, AI automations, and digital product engineering. We reserve the right to modify or discontinue, temporarily or permanently, the services with or without notice.'
      },
      {
        question: 'Quotes',
        answer: 'All project quotes are valid for 30 days from the date of issue. Scope changes requested after a quote has been accepted may require a revised agreement.'
      },
      {
        question: 'Payments',
        answer: 'Payment schedules are defined in your specific project agreement. Typically, we require an upfront deposit before work commences, with subsequent milestones billed throughout the project lifecycle.'
      },
      {
        question: 'Intellectual Property',
        answer: 'Upon full payment, you retain all intellectual property rights to the final deliverables. Smorce retains the rights to any pre-existing code, libraries, or methodologies used to create your product.'
      },
      {
        question: 'Client Responsibilities',
        answer: 'You agree to provide timely feedback, necessary assets, and prompt communication to ensure project timelines are met. Delays on your end may result in corresponding delays to the delivery schedule.'
      },
      {
        question: 'Project Timelines',
        answer: 'While we strive to meet all estimated delivery dates, timelines are approximations based on the initial scope. We will communicate proactively if any timeline adjustments are necessary.'
      },
      {
        question: 'Limitation of Liability',
        answer: 'In no event shall Smorce be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, or goodwill, arising out of your use of our services.'
      },
      {
        question: 'Changes to Terms',
        answer: 'We reserve the right to modify these terms at any time. We will provide notice of significant changes by updating the date at the top of these terms and, in some cases, providing additional notice.'
      },
      {
        question: 'Contact',
        answer: 'For any questions regarding these Terms & Conditions, please reach out to legal@smorce.com.'
      }
    ]
  },
  {
    id: 'security',
    title: 'Security',
    icon: Lock,
    items: [
      {
        question: 'Data Encryption',
        answer: 'All data transmitted between your browser and our servers is encrypted using industry-standard TLS. Data at rest is encrypted using AES-256 encryption to ensure it remains completely inaccessible to unauthorized parties.'
      },
      {
        question: 'Secure Authentication',
        answer: 'We utilize state-of-the-art authentication mechanisms, including secure JWT tokens and bcrypt password hashing, to protect user identities and prevent unauthorized access.'
      },
      {
        question: 'Password Protection',
        answer: 'We never store passwords in plaintext. All passwords are salted and hashed using advanced cryptographic algorithms, meaning even our own database administrators cannot read them.'
      },
      {
        question: 'Database Security',
        answer: 'Our databases are isolated within private subnets, accessible only by our internal application servers. We employ continuous monitoring and automated backups to prevent data loss.'
      },
      {
        question: 'Infrastructure Security',
        answer: 'Our infrastructure is hosted on enterprise cloud providers with SOC 2 and ISO 27001 certifications. We maintain strict firewall rules and conduct regular vulnerability assessments.'
      },
      {
        question: 'Responsible Disclosure',
        answer: 'We welcome security researchers to responsibly report any potential vulnerabilities they discover. We are committed to addressing verified security issues promptly.'
      },
      {
        question: 'Security Best Practices',
        answer: 'Our development team strictly follows OWASP guidelines to prevent common vulnerabilities such as SQL injection, Cross-Site Scripting (XSS), and Cross-Site Request Forgery (CSRF).'
      },
      {
        question: 'Reporting Security Issues',
        answer: 'If you believe you have discovered a security vulnerability in our platform, please report it immediately to security@smorce.com. We prioritize all security-related communications.'
      }
    ]
  }
];

export default function LegalCenter() {
  const [activeSection, setActiveSection] = useState('privacy');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll spy logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = LEGAL_DATA.map(section => document.getElementById(section.id));
      const scrollPosition = window.scrollY + 150; // Offset for sticky header

      let currentSection = LEGAL_DATA[0].id;
      for (const section of sections) {
        if (section && section.offsetTop <= scrollPosition) {
          currentSection = section.id;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg pt-32 pb-24 text-ink">
      {/* Header */}
      <header className="mx-auto max-w-4xl px-6 text-center mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
        >
          Legal Center
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="text-lg md:text-xl text-muted max-w-2xl mx-auto"
        >
          Everything you need to know about how Smorce protects your data, delivers services and keeps your information secure.
        </motion.p>
      </header>

      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row gap-12 relative">
        
        {/* Desktop Sidebar TOC */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="sticky top-32 flex flex-col space-y-2 relative">
            {LEGAL_DATA.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-left z-10 transition-colors duration-200 ${
                    isActive ? 'text-ink font-medium' : 'text-muted hover:text-ink'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSidebar"
                      className="absolute inset-0 bg-ink/5 rounded-xl shadow-sm border border-line/50 z-[-1]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <section.icon className={`h-4 w-4 relative z-10 transition-colors duration-200 ${isActive ? 'text-accent' : ''}`} />
                  <span className="text-sm relative z-10">{section.title}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Mobile Dropdown TOC */}
        <div className="md:hidden sticky top-24 z-40 bg-bg/80 backdrop-blur-md pb-4 pt-2 -mx-6 px-6">
          <div className="relative">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full flex items-center justify-between bg-white dark:bg-[#0D0E12] border border-line rounded-xl px-5 py-4 shadow-sm"
            >
              <span className="font-medium text-sm">
                {LEGAL_DATA.find(s => s.id === activeSection)?.title || 'Select a section'}
              </span>
              <ChevronDown className={`h-4 w-4 text-muted transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-[#0D0E12] border border-line rounded-xl shadow-xl overflow-hidden z-50 flex flex-col"
                >
                  {LEGAL_DATA.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`flex items-center gap-3 px-5 py-4 text-left border-b border-line/50 last:border-0 transition-colors ${
                        activeSection === section.id ? 'bg-ink/5 text-ink font-medium' : 'text-muted hover:bg-ink/5'
                      }`}
                    >
                      <section.icon className={`h-4 w-4 ${activeSection === section.id ? 'text-accent' : ''}`} />
                      <span className="text-sm">{section.title}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Content Area */}
        <main className="flex-1 max-w-3xl pb-32">
          {LEGAL_DATA.map((section, index) => (
            <motion.div 
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className={`mb-24 ${index === LEGAL_DATA.length - 1 ? 'mb-0' : ''}`}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 rounded-xl bg-ink/5 flex items-center justify-center border border-line/50">
                  <section.icon className="h-5 w-5 text-accent" />
                </div>
                <h2 className="text-2xl font-bold">{section.title}</h2>
              </div>

              <div className="space-y-4">
                {section.items.map((item, itemIdx) => {
                  const itemId = `${section.id}-${itemIdx}`;
                  const isOpen = expandedItem === itemId;
                  
                  return (
                    <div 
                      key={itemId}
                      className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                        isOpen 
                        ? 'bg-white border-line shadow-sm dark:bg-[#0D0E12]' 
                        : 'bg-transparent border-transparent hover:bg-ink/5'
                      }`}
                    >
                      <button
                        onClick={() => setExpandedItem(isOpen ? null : itemId)}
                        className="w-full flex items-center justify-between px-6 py-5 text-left"
                      >
                        <span className="text-[15px] font-semibold tracking-tight pr-8">{item.question}</span>
                        <div className={`shrink-0 flex items-center justify-center h-8 w-8 rounded-full transition-colors duration-300 ${isOpen ? 'bg-ink/10 text-ink' : 'bg-transparent text-muted group-hover:bg-ink/5'}`}>
                          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                        </div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: EASE }}
                          >
                            <div className="px-6 pb-6 pt-1 text-[14px] leading-relaxed text-muted border-t border-line/50 mt-2 mx-6 pt-4">
                              {item.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </main>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mt-8 border-t border-line/50 pt-16 flex justify-center max-w-4xl mx-auto px-6"
      >
        <Link
          href="/#contact"
          className="group btn-primary w-full sm:w-auto px-10 py-5 text-[16px] md:text-[18px]"
        >
          <span className="relative z-10">Book a free Strategy call right now</span>
          <ArrowUpRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
        </Link>
      </motion.div>
    </div>
  );
}
