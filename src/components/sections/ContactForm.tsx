"use client"

import { useForm, ValidationError } from "@formspree/react"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function ContactForm() {
  const [state, handleSubmit] = useForm("xyzjaeql")

  if (state.succeeded) {
    return (
      <div className="flex items-center justify-center flex-col gap-10">
      <p className="text-center text-green-500 text-lg font-medium">
        Thanks for reaching out! I&apos;ll get back to you soon.
      </p>
      <Button variant="outline">
        <Link to="/">
        Go Home
        </Link>
      </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      {/* Name */}
      <Field>
        <FieldLabel htmlFor="name">Name</FieldLabel>
        <FieldContent>
          <Input id="name" name="name" placeholder="Your full name" required />
        </FieldContent>
        <FieldDescription>Enter your full name.</FieldDescription>
        <FieldError>
          <ValidationError prefix="Name" field="name" errors={state.errors} />
        </FieldError>
      </Field>

      {/* Email */}
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <FieldContent>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            required
          />
        </FieldContent>
        <FieldDescription>We'll never share your email.</FieldDescription>
        <FieldError>
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </FieldError>
      </Field>

      {/* Message */}
      <Field>
        <FieldLabel htmlFor="message">Message</FieldLabel>
        <FieldContent>
          <Textarea
            id="message"
            name="message"
            placeholder="Write your message here..."
            rows={6}
            required
          />
        </FieldContent>
        <FieldDescription>Write your questions, suggestions, or just say hi!</FieldDescription>
        <FieldError>
          <ValidationError prefix="Message" field="message" errors={state.errors} />
        </FieldError>
      </Field>

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={state.submitting}>
        {state.submitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}
