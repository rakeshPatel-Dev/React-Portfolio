"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import {
  Copy, RefreshCw, Info, Check, RotateCcw,
  History, Fingerprint,
  BarChart3, Trash2,
  X, AlertCircle,
  ArrowLeft
} from "lucide-react"
import { Tooltip } from "../ui/tooltip-card"
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

interface PasswordHistory {
  password: string;
  timestamp: string; // Store as string for JSON serialization
  entropy: number;
}

interface TooltipContentProps {
  [key: string]: string;
  uppercase: string;
  lowercase: string;
  numbers: string;
  symbols: string;
  leet: string;
}

interface OptionsProps {
  [key: string]: any; // or specify a more specific type if you know what the values should be
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  leet: boolean;
}

const PasswordGenerator = () => {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(16)
  const [copied, setCopied] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [history, setHistory] = useState<PasswordHistory[]>([])
  const [customWord, setCustomWord] = useState("")
  const [showWarning, setShowWarning] = useState(false)
  const [options, setOptions] = useState<OptionsProps>({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
    leet: false
  })

  const defaultOptions = {
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
    leet: false
  }

  // Load history from localStorage on mount
  useEffect(() => {
    const loadHistory = () => {
      try {
        const savedHistory = localStorage.getItem('passwordHistory')
        if (savedHistory) {
          const parsed = JSON.parse(savedHistory)
          if (!Array.isArray(parsed)) {
            localStorage.removeItem('passwordHistory')
            return
          }
          // Filter out entries older than 24 hours
          const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000
          const validHistory = parsed.filter((item: PasswordHistory) =>
            item?.password && item?.timestamp && typeof item?.entropy === "number" && new Date(item.timestamp).getTime() > twentyFourHoursAgo
          )
          setHistory(validHistory)

          // If we filtered out some items, update localStorage
          if (validHistory.length !== parsed.length) {
            localStorage.setItem('passwordHistory', JSON.stringify(validHistory))
          }
        }
      } catch (error) {
        console.error('Failed to load history:', error)
      }
    }

    loadHistory()
  }, [])

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('passwordHistory', JSON.stringify(history))
    } else {
      // Clear localStorage if history is empty
      localStorage.removeItem('passwordHistory')
    }
  }, [history])

  const characters = useMemo(() => {
    return {
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      numbers: "0123456789",
      symbols: "!@#$%&*()_+-=[]{}|;:,.<>?",
      leet: {
        'a': ['4', '@', '/\\', '/-\\', '^'],
        'e': ['3', '€', '[-', '|=-'],
        'i': ['1', '!', '|', '] ['],
        'o': ['0', '()', '[]', '<>', 'Ø'],
        's': ['5', '$'],
        't': ['7', '+'],
        'b': ['8'],
        'g': ['9']
      }
    }
  }, [])



  const tooltipContent: TooltipContentProps = {
    uppercase: "Include uppercase letters (A-Z) in your password for increased complexity",
    lowercase: "Include lowercase letters (a-z) in your password",
    numbers: "Include numeric digits (0-9) in your password",
    symbols: "Include special characters (!@#$%^&*) in your password",
    leet: "Replace letters with numbers (e.g., 3 for E, 4 for A)"
  };


  // Auto-clean history after 24 hours
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000
      setHistory(prev => {
        const filtered = prev.filter(item => new Date(item.timestamp).getTime() > twentyFourHoursAgo)
        // Update localStorage if we filtered anything
        if (filtered.length !== prev.length) {
          localStorage.setItem('passwordHistory', JSON.stringify(filtered))
        }
        return filtered
      })
    }, 60 * 60 * 1000)

    return () => clearInterval(cleanupInterval)
  }, [])

  // Toast auto-hide
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [showToast])

  const calculateEntropy = useCallback(() => {
    let poolSize = 0
    if (options.uppercase) poolSize += characters.uppercase.length
    if (options.lowercase) poolSize += characters.lowercase.length
    if (options.numbers) poolSize += characters.numbers.length
    if (options.symbols) poolSize += characters.symbols.length

    if (poolSize === 0) {
      return { entropy: 0, poolSize: 0 }
    }

    const entropy = Math.log2(Math.pow(poolSize, length))
    return { entropy, poolSize }
  }, [options, length, characters])

  const getEntropyColor = (entropy: number) => {
    if (entropy >= 80) return "bg-green-500"
    if (entropy >= 60) return "bg-blue-500"
    if (entropy >= 40) return "bg-yellow-500"
    return "bg-orange-500"
  }

  const getEntropyPercentage = (entropy: number) => {
    return Math.min(100, (entropy / 128) * 100)
  }

  const applyLeet = useCallback(
    (text: string) => {
      let leetText = text.toLowerCase()
      Object.entries(characters.leet).forEach(([char, replacements]) => {
        if (Math.random() > 0.5) {
          const replacement = replacements[Math.floor(Math.random() * replacements.length)]
          // Escape special regex characters
          const escapedChar = char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          leetText = leetText.replace(new RegExp(escapedChar, 'g'), replacement)
        }
      })
      return leetText
    },
    [characters]
  )

  const generateRandomString = (count: number, charSet: string) => {
    if (!charSet) return ""
    const array = new Uint32Array(count)
    window.crypto.getRandomValues(array)
    let result = ""
    for (let i = 0; i < count; i++) {
      result += charSet[array[i] % charSet.length]
    }
    return result
  }

  // Warning auto-hide
  useEffect(() => {
    if (showWarning) {
      const timer = setTimeout(() => setShowWarning(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showWarning])

  const generatePassword = useCallback(() => {
    // Check if any character options are selected
    const hasCharOptions = options.uppercase || options.lowercase || options.numbers || options.symbols

    if (!hasCharOptions) {
      setShowWarning(true)

      // If no options selected but custom word exists, enable lowercase by default for entropy
      if (customWord.trim()) {
        setOptions(prev => ({ ...prev, lowercase: true }))
        return // Let the useEffect trigger regeneration with new options
      }

      setPassword("Select at least one option")
      return
    }

    setShowWarning(false)

    if (customWord.trim()) {
      // Transform custom word
      let transformed = customWord

      if (options.leet) {
        transformed = applyLeet(transformed)
      }

      // Build character set for additional random chars
      let availableChars = ""
      if (options.uppercase) availableChars += characters.uppercase
      if (options.lowercase) availableChars += characters.lowercase
      if (options.numbers) availableChars += characters.numbers
      if (options.symbols) availableChars += characters.symbols

      // Ensure we have at least some characters to work with
      if (!availableChars) {
        availableChars = characters.lowercase + characters.numbers
      }
      // Generate random prefix and suffix, reserving space for word
      const wordMinLength = Math.min(transformed.length, Math.floor(length * 0.4))
      const remainingLength = length - wordMinLength
      const prefixLength = Math.floor(remainingLength / 2)
      const suffixLength = remainingLength - prefixLength
      const wordMaxLength = Math.max(1, length - prefixLength - suffixLength)

      // Trim word if needed
      if (transformed.length > wordMaxLength) {
        transformed = transformed.slice(0, wordMaxLength)
      }

      const prefix = generateRandomString(prefixLength, availableChars)
      const suffix = generateRandomString(suffixLength, availableChars)

      // Multiple format variations with good entropy
      const formats = [
        `${prefix}${transformed}${suffix}`,
        `${transformed}${prefix}${suffix}`,
        `${prefix}${suffix}${transformed}`,
        `${transformed.slice(0, 2)}${prefix}${transformed.slice(2)}${suffix}`,
        `${prefix.slice(0, 2)}${transformed}${suffix}${prefix.slice(2)}`
      ]

      let finalPassword = formats[Math.floor(Math.random() * formats.length)]

      // Ensure it meets length requirement
      if (finalPassword.length < length) {
        const padding = generateRandomString(length - finalPassword.length, availableChars)
        finalPassword = finalPassword + padding
      } else if (finalPassword.length > length) {
        finalPassword = finalPassword.slice(0, length)
      }

      setPassword(finalPassword)
    } else {
      // Regular password generation
      let availableChars = ""
      if (options.uppercase) availableChars += characters.uppercase
      if (options.lowercase) availableChars += characters.lowercase
      if (options.numbers) availableChars += characters.numbers
      if (options.symbols) availableChars += characters.symbols

      if (availableChars === "") {
        setPassword("Select at least one option")
        return
      }

      let generatedPassword = ""
      const array = new Uint32Array(length)
      window.crypto.getRandomValues(array)

      for (let i = 0; i < length; i++) {
        generatedPassword += availableChars[array[i] % availableChars.length]
      }

      setPassword(generatedPassword)
    }
  }, [options, length, characters, customWord, applyLeet])

  const copyToClipboard = async () => {
    if (password && password !== "Select at least one option") {
      try {
        await navigator.clipboard.writeText(password)
        setCopied(true)
        setShowToast(true)

        // Calculate entropy for this password
        const { entropy } = calculateEntropy()

        // Create new history item
        const newItem: PasswordHistory = {
          password,
          timestamp: new Date().toISOString(),
          entropy
        }

        // Update history state
        setHistory(prev => {
          const updated = [newItem, ...prev.slice(0, 9)]
          // Immediately save to localStorage
          localStorage.setItem('passwordHistory', JSON.stringify(updated))
          return updated
        })

        setTimeout(() => setCopied(false), 2000)
      } catch (error) {
        console.error("Failed to copy to clipboard:", error)
        setCopied(false)
        setShowToast(false)
      }
    }
  }

  const handleCopy = (item: string) => {
    navigator.clipboard.writeText(item);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    // Trigger toast here (assuming you have a toast function)
    setShowToast(true);
  };

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem('passwordHistory')
  }

  const resetToDefaults = () => {
    setOptions(defaultOptions)
    setLength(16)
    setCustomWord("")
    setShowWarning(false)
  }

  const handleOptionChange = (option: keyof typeof options) => {
    setOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }))
  }

  const { entropy } = calculateEntropy()
  const entropyPercentage = getEntropyPercentage(entropy)
  const entropyBarColor = getEntropyColor(entropy)

  // Generate initial password
  useEffect(() => {
    generatePassword()
  }, [generatePassword])

  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-foreground text-background px-4 py-3 text-sm font-medium z-50 animate-in slide-in-from-top-2">
          ✓ Password copied to clipboard
        </div>
      )}

      {/* Warning Notification */}
      {showWarning && (
        <div className="fixed top-4 right-4 bg-orange-500 text-background px-4 py-3 text-sm font-medium z-50 animate-in slide-in-from-top-2 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          Please select at least one character set
        </div>
      )}

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-[720px] w-full space-y-12">
          {/* Header */}
          <div className="space-y-3 flex items-center justify-between">
            <div>

              <h1 className="text-foreground heading-bold text-3xl font-light tracking-tight flex items-center gap-3">
                <Fingerprint className="w-8 h-8" />
                Key Generation
              </h1>
              <p className="text-muted-foreground heading-medium text-sm font-medium uppercase tracking-widest">
                Industrial grade cryptographic utility
              </p>
            </div>
            <div>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => {
                  if (window.history.length > 1) {
                    navigate(-1)
                  } else {
                    navigate('/') // or another sensible default route
                  }
                }}
              >
                <ArrowLeft />
                Go Back
              </Button>
            </div>
          </div>

          <div className="bg-card border border-border p-8 space-y-10">
            {/* Output Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Generated Password
                </label>
                <button
                  onClick={resetToDefaults}
                  className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </button>
              </div>
              <div className="group relative flex items-center justify-between bg-background/40 border border-border px-6 py-6 transition-colors hover:border-border/80">
                <span className="text-xl font-mono font-medium tracking-normal text-foreground break-all">
                  {password || "Generating..."}
                </span>
                <button
                  onClick={copyToClipboard}
                  className="text-muted-foreground cursor-pointer border hover:border-border border-transparent p-2 rounded hover:text-foreground transition-colors ml-4"
                  title="Copy to clipboard"
                  disabled={!password || password === "Select at least one option"}
                >
                  {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Custom Word Input */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Base Word (Optional)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customWord}
                  onChange={(e) => setCustomWord(e.target.value)}
                  placeholder="Enter a word to transform..."
                  className="flex-1 bg-background/40 border border-border px-4 py-3 text-foreground font-mono text-sm focus:outline-none focus:border-border/80"
                />
                {customWord && (
                  <button
                    title="clear"
                    onClick={() => setCustomWord("")}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Character Sets */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Character Sets</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {[
                  { key: 'uppercase', label: 'A-Z' },
                  { key: 'lowercase', label: 'a-z' },
                  { key: 'numbers', label: '0-9' },
                  { key: 'symbols', label: '!@#$%' },
                  { key: 'leet', label: 'Leet' }
                ].map(({ key, label }) => (
                  <Tooltip
                    key={key}
                    containerClassName="text-xs text-muted-foreground"
                    content={tooltipContent[key]}
                  >
                    <label className="flex items-center justify-between p-4 border border-border bg-background/20 cursor-pointer group hover:border-border/80 transition-colors">
                      <span className="text-xs font-mono text-muted-foreground/70 group-hover:text-foreground">
                        {label}
                      </span>
                      <input
                        type="checkbox"
                        checked={options[key]}
                        onChange={() => handleOptionChange(key)}
                        className="rounded-none border-border bg-background text-foreground focus:ring-0"
                      />
                    </label>
                  </Tooltip>
                ))}
              </div>
            </div>

            {/* Length Control */}
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">
                  Length
                </span>
                <span className="text-lg font-mono text-foreground">
                  {length}
                </span>
              </div>
              <input
                title="range"
                className="w-full accent-foreground"
                max={64}
                min={8}
                type="range"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
              />
            </div>

            {/* Entropy Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Entropy Strength
                </span>
                <span className="text-sm font-mono font-bold">
                  {entropy.toFixed(1)} bits
                </span>
              </div>
              <div className="h-2 w-full bg-border overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${entropyBarColor}`}
                  style={{ width: `${entropyPercentage}%` }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <button
                onClick={generatePassword}
                className="flex items-center justify-center gap-3 bg-foreground text-background font-bold text-xs uppercase tracking-[0.2em] py-5 transition-all hover:bg-foreground/90 active:scale-[0.99]"
              >
                <RefreshCw className="w-4 h-4" />
                Regenerate
              </button>
              <button
                onClick={copyToClipboard}
                className="flex items-center justify-center gap-3 border border-border text-foreground font-bold text-xs uppercase tracking-[0.2em] py-5 transition-all hover:bg-accent active:scale-[0.99]"
                disabled={!password || password === "Select at least one option"}
              >
                <Copy className="w-4 h-4" />
                Copy & Save
              </button>
            </div>
          </div>

          {/* History Section - Now at Bottom */}
          {history.length > 0 && (
            <div className="bg-card border border-border p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Copied Passwords (auto-deletes in 24h)
                  </h3>
                </div>
                <button
                  onClick={clearHistory}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  title="Clear history"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {history.map((item, index) => {
                  const timeAgo = Math.floor((Date.now() - new Date(item.timestamp).getTime()) / (1000 * 60 * 60))
                  const expiryColor = timeAgo > 20 ? "text-orange-500" : "text-muted-foreground"
                  const entropyColor = getEntropyColor(item.entropy).replace('bg-', 'text-')

                  return (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 border border-border bg-background/40 transition-all duration-200 ${copied ? 'bg-green-500/20 border-green-500' : 'hover:bg-background/60 active:bg-background/80'
                        }`}
                      onClick={() => handleCopy(item.password)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && handleCopy(item.password)}
                      style={{ cursor: 'pointer' }}
                    >
                      <span className="font-mono text-sm text-foreground">{item.password}</span>
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] ${entropyColor} font-mono`}>
                          {item.entropy.toFixed(1)} bits
                        </span>
                        <span className={`text-[8px] ${expiryColor}`}>
                          {24 - timeAgo}h left
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Security Note */}
          <div className="flex items-start gap-4 p-6 border border-border/50 bg-background">
            <Info className="text-foreground w-5 h-5 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-foreground uppercase tracking-widest">
                Security Note
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                Using window.crypto.getRandomValues() for secure generation.
                Passwords are saved to your browser's local storage when copied. Auto-deletes after 24 hours.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default PasswordGenerator 