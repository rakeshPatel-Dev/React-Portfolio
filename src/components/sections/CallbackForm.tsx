"use client"

import React, { useState } from "react"
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldContent,
} from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

export default function CallbackForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [date, setDate] = useState<Date | undefined>()
  const [time, setTime] = useState("10:00") // default time
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    let whatsappMessage = `Hi, my name is ${name}. Please call me at ${phone}.`
    if (date) whatsappMessage += ` Preferred callback: ${format(date, "PPP")} at ${time}.`
    if (message) whatsappMessage += ` Message: ${message}`

    const whatsappUrl = `https://wa.me/9779825256068?text=${encodeURIComponent(
      whatsappMessage
    )}`

    window.open(whatsappUrl, "_blank")
    setIsOpen(false)
  }

  // Optional times list (you can adjust intervals)
  const times = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0")
    return [`${hour}:00`, `${hour}:30`]
  }).flat()

  return (
    <>
      {/* Trigger Button */}
      <Button onClick={() => setIsOpen(true)}>Request a Callback</Button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-lg flex items-center justify-center z-50">
          <div className="border bg-primary/10 backdrop-blur-2xl rounded-xl shadow-xl p-8 w-full max-w-md relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 dark:hover:text-white font-bold text-lg"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-2 text-primary">
              Request a Callback
            </h2>
            <p className="text-sm mb-6 text-neutral-600 dark:text-neutral-300">
              Fill in your details and I’ll contact you on WhatsApp.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Field>
                <FieldLabel>Enter full name</FieldLabel>
                {/* <FieldDescription>Enter your full name</FieldDescription> */}
                <FieldContent>
                  <input
                  title="Enter Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-md border border-primary/50 p-2 text-primary"
                  />
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel>Phone Number</FieldLabel>
                {/* <FieldDescription>Your contact number</FieldDescription> */}
                <FieldContent>
                  <input
                  title="Enter Phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full rounded-md border border-primary/50 p-2 text-primary"
                  />
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel>Preferred Callback</FieldLabel>
                <FieldDescription>Select date and time</FieldDescription>
                <FieldContent>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full text-left">
                        {date ? `${format(date, "PPP")} at ${time}` : "Select date & time"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-4 flex flex-col gap-4">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                      />
                      <select 
                      title="Select Day & time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full  dark:bg-[#0A0A0A] rounded-md border p-2"
                      >
                        {times.map((t, idx) => (
                          <option key={idx} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </PopoverContent>
                  </Popover>
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel>Message (Optional)</FieldLabel>
                {/* <FieldDescription>Write any additional info</FieldDescription> */}
                <FieldContent>
                  <textarea 
                  title="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-md border border-primary/50 p-2 text-primary"
                    rows={3}
                  />
                </FieldContent>
              </Field>

              <div className="flex items-center justify-end gap-4">
                <Button onClick={() => setIsOpen(false)} variant="outline">
                  Cancel
                </Button>
                <Button variant="default" type="submit">
                  Send on WhatsApp
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
