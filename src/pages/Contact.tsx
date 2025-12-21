"use client"

import ContactForm from "@/components/ContactForm"
import PageTransition from "@/components/PageTransition"
import RequestCallback from "@/components/sections/RequestCallback"

export default function ContactPage() {
  return (
    <PageTransition>
      <div className="min-h-screen max-w-4xl mx-auto px-6 py-12 mt-15">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h1 className="text-3xl heading-bold text-gray-900 dark:text-white">
            Get in Touch
          </h1>
          <p className="text-base font-body px-2 text-gray-600 dark:text-gray-300">
            Have questions, suggestions, or just want to say hi? Fill out the form below and I'll get back to you as soon as possible.
          </p>
        </div>

        <div className="mt-12">
          <ContactForm />
          <RequestCallback />
        </div>
      </div>
    </PageTransition>
  )
}
