"use client"

import { useState } from "react"
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

type FormValues = {
  name: string
  email: string
  message: string
}

type Errors = Partial<FormValues>

export default function ContactForm() {
  const [state, handleSubmit] = useForm("xyzjaeql")

  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    message: "",
  })

  const handleClear = () => {
    setValues({
      name: "",
      email: "",
      message: "",
    })
  }
  const [errors, setErrors] = useState<Errors>({})

  const validateField = (name: keyof FormValues, value: string) => {
    let error = ""

    if (name === "name") {
      if (!value.trim()) error = "Name is required."
      else if (value.length < 3) error = "Name must be at least 3 characters."
      else if (!/^[A-Za-z\s]+$/.test(value))
        error = "Only letters and spaces allowed."
    }

    if (name === "email") {
      if (!value.trim()) error = "Email is required."
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        error = "Enter a valid email."
    }

    if (name === "message") {
      if (!value.trim()) error = "Message is required."
      else if (value.length < 10)
        error = "Message must be at least 10 characters."
      else if (value.length > 500)
        error = "Message cannot exceed 500 characters."
    }

    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    setValues((prev) => ({ ...prev, [name]: value }))
    validateField(name as keyof FormValues, value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    Object.entries(values).forEach(([key, value]) =>
      validateField(key as keyof FormValues, value)
    )

    const hasErrors = Object.values(errors).some(Boolean)
    if (hasErrors) return

    handleSubmit(e)
  }

  if (state.succeeded) {
    return (
      <div className="flex items-center justify-center flex-col gap-10">
        <p className="text-green-500 text-lg font-medium">
          Thanks for reaching out! I&apos;ll get back to you soon.
        </p>
        <Button variant="outline">
          <Link to="/">Go Home</Link>
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-2xl mx-auto">
      {/* Name */}
      <Field>
        <FieldLabel>Name</FieldLabel>
        <FieldContent>
          <Input
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Your full name"
          />
        </FieldContent>
        <FieldError>
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </FieldError>
      </Field>

      {/* Email */}
      <Field>
        <FieldLabel>Email</FieldLabel>
        <FieldContent>
          <Input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="your@email.com"
          />
        </FieldContent>
        <FieldError>
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </FieldError>
      </Field>

      {/* Message */}
      <Field>
        <FieldLabel>Message</FieldLabel>
        <FieldContent>
          <Textarea
            name="message"
            rows={6}
            value={values.message}
            onChange={handleChange}
            placeholder="Write your message..."
          />
        </FieldContent>
        <FieldDescription className="flex justify-between">
          <span>Min 10 characters</span>
          <span>{values.message.length} / 500</span>
        </FieldDescription>
        <FieldError>
          {errors.message && <p className="text-red-500">{errors.message}</p>}
        </FieldError>
      </Field>

      <div className="flex items-center max-w-6xl w-full gap-4 flex-row">
        <Button onClick={handleClear} className="w-1/4" variant="outline">
          Clear Fields
        </Button>
        <Button type="submit" className="flex-1" disabled={state.submitting}>
          {state.submitting ? "Sending..." : "Send Message"}
        </Button>
      </div>

      <ValidationError errors={state.errors} />
    </form>
  )
}
