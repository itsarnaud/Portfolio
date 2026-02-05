'use client'

import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { MagneticButton } from '@/src/components/ui/MagneticButton'
import AnimatedText from '@/src/components/gsap/AnimatedText'
import emailjs from '@emailjs/browser'
import gsap from 'gsap'

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/itsarnaud",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/royer-arnaud",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  }
]

const ContactPage = () => {
  const headerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.querySelectorAll(".animate-in") || [],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.8 },
      )

      gsap.fromTo(
        formRef.current?.querySelectorAll(".form-field") || [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 1.2 },
      )
    })

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const subjectLabels: Record<string, string> = {
      project: 'Nouveau projet',
      collaboration: 'Collaboration',
      job: "Opportunité d'emploi",
      other: 'Autre'
    }

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formState.name,
          from_email: formState.email,
          subject: subjectLabels[formState.subject] || formState.subject,
          message: formState.message,
          date: new Date().toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )

      setIsSubmitted(true)
      setFormState({ name: "", email: "", subject: "", message: "" })
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (err) {
      console.error('Erreur EmailJS:', err)
      setError('Une erreur est survenue lors de l\'envoi. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="min-h-screen pt-32 pb-16">
      <header ref={headerRef} className="px-6 md:px-12 lg:px-24 mb-16">
        <p className="animate-in text-sm tracking-widest text-muted-foreground mb-4 font-mono">CONTACT</p>
        <h1 className="animate-in text-4xl md:text-6xl lg:text-7xl font-display leading-tight mb-8 max-w-4xl text-balance">
          Discutons de votre projet
        </h1>
        <p className="animate-in text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Vous avez une idée, un projet ou simplement envie d&apos;échanger ? N&apos;hésitez pas à me contacter, je
          réponds généralement sous 24h.
        </p>
      </header>

      <div className="px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            {isSubmitted ? (
              <div className="p-8 border border-foreground bg-secondary/50">
                <div className="flex items-center gap-3 mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-foreground">
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-lg font-medium">Message envoyé !</span>
                </div>
                <p className="text-muted-foreground">
                  Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                {error && (
                  <div className="p-4 border border-red-500 bg-red-500/10 text-red-500">
                    <p>{error}</p>
                  </div>
                )}
                <div className="form-field">
                  <label
                    htmlFor="name"
                    className={`block text-sm mb-2 transition-colors ${focusedField === "name" ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-foreground focus:outline-none transition-colors"
                    placeholder="Votre nom complet"
                  />
                </div>

                <div className="form-field">
                  <label
                    htmlFor="email"
                    className={`block text-sm mb-2 transition-colors ${focusedField === "email" ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-foreground focus:outline-none transition-colors"
                    placeholder="votre@email.com"
                  />
                </div>

                <div className="form-field">
                  <label
                    htmlFor="subject"
                    className={`block text-sm mb-2 transition-colors ${focusedField === "subject" ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    Sujet
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("subject")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-foreground focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="project">Nouveau projet</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="job">Opportunité d&apos;emploi</option>
                    <option value="other">Autre</option>
                  </select>
                </div>

                <div className="form-field">
                  <label
                    htmlFor="message"
                    className={`block text-sm mb-2 transition-colors ${focusedField === "message" ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={5}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-foreground focus:outline-none transition-colors resize-none"
                    placeholder="Décrivez votre projet ou votre demande..."
                  />
                </div>

                <div className="form-field pt-4">
                  <MagneticButton>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-3 px-10 py-5 bg-foreground text-background text-sm tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          Envoyer le message
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                              d="M3 8H13M13 8L8 3M13 8L8 13"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </>
                      )}
                    </button>
                  </MagneticButton>
                </div>
              </form>
            )}
          </div>

          <div className="lg:pt-8">
            <div className="mb-12">
              <p className="text-sm tracking-widest text-muted-foreground mb-3 font-mono">EMAIL</p>
              <a
                href="mailto:arnaud.royer77@gmail.com"
                className="text-2xl md:text-3xl font-display hover:opacity-70 transition-opacity"
              >
                arnaud.royer77@gmail.com
              </a>
            </div>

            <div className="mb-12">
              <p className="text-sm tracking-widest text-muted-foreground mb-3 font-mono">LOCALISATION</p>
              <p className="text-2xl md:text-3xl font-display">Montpellier, France</p>
              <p className="text-muted-foreground mt-2">Disponible pour du remote</p>
            </div>

            <div className="mb-12">
              <p className="text-sm tracking-widest text-muted-foreground mb-3 font-mono">DISPONIBILITÉ</p>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-lg">Disponible pour de nouveaux projets</span>
              </div>
            </div>

            <div>
              <p className="text-sm tracking-widest text-muted-foreground mb-6 font-mono">RÉSEAUX</p>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link) => (
                  <MagneticButton key={link.name} strength={0.2}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-14 h-14 border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-all"
                      aria-label={link.name}
                    >
                      {link.icon}
                    </a>
                  </MagneticButton>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-32 px-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="border-t border-border pt-16">
          <AnimatedText trigger className="text-5xl md:text-7xl lg:text-9xl font-display text-center leading-none">
            Créons ensemble
          </AnimatedText>
        </div>
      </section>
    </div>
  )
}

export default ContactPage;