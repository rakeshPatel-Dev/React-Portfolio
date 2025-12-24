"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import {
  CheckIcon,
  ArrowRightIcon,
  CalendarDays,
  CalendarClock,
} from "lucide-react"
import { format } from "date-fns"

type Step = {
  id: number
  label: string
  field: "name" | "phone" | "datetime" | "message"
  required: boolean
}

type MultiStepFormProps = {
  onSuccess?: () => void
}

const steps: Step[] = [
  { id: 1, label: "Full name *", field: "name", required: true },
  { id: 2, label: "Phone number *", field: "phone", required: true },
  { id: 3, label: "Callback date & time *", field: "datetime", required: true },
  { id: 4, label: "Message (optional)", field: "message", required: false },
]

export function MultiStepForm({ onSuccess }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [date, setDate] = useState<Date | undefined>()
  const [time, setTime] = useState("")
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [sending, setSending] = useState(false)

  const step = steps[currentStep]

  /* lock body scroll if this form is used inside modal */
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  /* generate time slots (15 min interval) */
  const times = Array.from({ length: 24 * 4 }, (_, i) => {
    const h = String(Math.floor(i / 4)).padStart(2, "0")
    const m = String((i % 4) * 15).padStart(2, "0")
    return `${h}:${m}`
  })

  const isStepValid = () => {
    if (!step.required) return true
    if (step.field === "datetime") return Boolean(date && time)
    return Boolean(formData[step.field]?.trim())
  }

  const handleNext = () => {
    if (!isStepValid()) return

    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1)
    } else {
      sendToWhatsApp()
    }
  }

  const resetForm = () => {
    setCurrentStep(0)
    setFormData({})
    setDate(undefined)
    setTime("")
    setSending(false)
  }

  const sendToWhatsApp = () => {
    if (sending) return
    setSending(true)

    const message = `
Hi, my name is ${formData.name}.
Phone: ${formData.phone}

Preferred callback:
${date ? format(date, "PPP") : "Any day"} at ${time}

Message:
${formData.message || "—"}
`.trim()

    const encoded = encodeURIComponent(message)

    window.open(
      `https://wa.me/9779825256068?text=${encoded}`,
      "_blank"
    )

    onSuccess?.()
    resetForm()
  }

  return (
    <div className="w-full max-w-sm space-y-8">
      {/* Progress */}
      <div className="flex items-center justify-center gap-3">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors",
                i < currentStep && "bg-foreground/10",
                i === currentStep && "bg-foreground text-background",
                i > currentStep && "bg-muted text-muted-foreground"
              )}
            >
              {i < currentStep ? (
                <CheckIcon className="h-4 w-4" />
              ) : (
                s.id
              )}
            </div>
            {i < steps.length - 1 && (
              <div className="h-px w-10 bg-border" />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="space-y-4">
        <Label className="text-lg font-medium">{step.label}</Label>

        {step.field === "name" && (
          <Input
            autoFocus
            placeholder="Your full name"
            value={formData.name || ""}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
        )}

        {step.field === "phone" && (
          <Input
            autoFocus
            type="tel"
            inputMode="numeric"
            pattern="[0-9+ ]{10,15}"
            placeholder="+977 98XXXXXXXX"
            value={formData.phone || ""}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        )}

        {step.field === "datetime" && (
          <div className="space-y-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="p-0 z-50">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => d < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Select value={time} onValueChange={setTime}>
              <SelectTrigger className="h-12 w-full flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Select time" />
              </SelectTrigger>

              <SelectContent className="max-h-64 z-50 overflow-auto">
                {times.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {step.field === "message" && (
          <Textarea
            placeholder="Anything you want to add..."
            value={formData.message || ""}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
        )}

        {!isStepValid() && (
          <p className="text-sm text-destructive">
            This field is required
          </p>
        )}
      </div>

      {/* Actions */}
      <Button
        onClick={handleNext}
        disabled={!isStepValid() || sending}
        className="w-full group"
      >
        {sending
          ? "Opening WhatsApp..."
          : currentStep === steps.length - 1
            ? "Send via WhatsApp"
            : "Continue"}
        <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Button>

      {currentStep > 0 && !sending && (
        <button
          onClick={() => setCurrentStep((s) => s - 1)}
          className="w-full text-sm text-muted-foreground hover:text-foreground"
        >
          Go back
        </button>
      )}
    </div>
  )
}
