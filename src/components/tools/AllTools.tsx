import {
  Lock,
  Repeat,
  QrCode,
  Palette,
  Globe,
  Code2,
  ArrowRight,
} from "lucide-react"
import { Link } from "react-router-dom"
import PageTransition from "../PageTransition"

const AllTools = () => {
  const tools = [
    {
      icon: Lock,
      title: "Password Generator",
      description: "Generate cryptographically secure strings with custom parameters.",
      href: "/tools/password-generator"
    },
    {
      icon: Repeat,
      title: "File Converter",
      description: "Optimized conversion for SVG, WebP, and JSON assets.",
      href: "/tools/image-converter"

    },
    {
      icon: QrCode,
      title: "QR Generator",
      description: "Minimalist QR codes for deployment links and contact data.",
      href: "/tools/qr-generator"
    },
    {
      icon: Palette,
      title: "Neutral Palettes",
      description: "Sophisticated monochromatic schemes for high-end UI design.",
      href: "/tools/neutral-palettes"
    },
    {
      icon: Globe,
      title: "REST Client",
      description: "Lightweight browser-based tester for MERN endpoints.",
      href: "/tools/rest-client"
    },
    {
      icon: Code2,
      title: "Code Snippets",
      description: "Ready-to-use React hooks and Express middleware templates.",
      href: "/tools/code-snippets"
    }
  ]

  return (
    <PageTransition>

      <div>
        <main className="flex-1 max-w-7xl mx-auto w-full px-8 lg:px-24 py-20">
          <div className="mb-24 max-w-2xl">
            <h1 className="text-foreground text-5xl heading-bold lg:text-6xl font-normal mb-6 leading-tight">            Tools & Resources
            </h1>
            <p className="text-muted-foreground heading-normal text-lg leading-relaxed font-light">
              A curated collection of minimalist utilities for the modern full-stack
              workflow. Precise, fast, and neutral.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {tools.map((tool, index) => {
              const Icon = tool.icon
              return (
                <Link key={index} to={tool.href} >
                  <div
                    className="bg-card group p-10 flex flex-col justify-between transition-all duration-500 hover:bg-accent group cursor-pointer h-80"
                  >
                    <div>
                      <Icon className="text-foreground w-8 h-8 mb-8 stroke-1" />
                      <h3 className="text-foreground text-xl heading-medium font-medium mb-3 tracking-tight">
                        {tool.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 heading-normal transition-colors">
                        {tool.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50 group-hover:text-foreground transition-all group-hover:scale-105">
                      <span>Launch Tool</span>
                      <ArrowRight className=" group-hover:translate-x-2 transition-all w-3 h-3 group-hover:scale-105" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </main>
      </div>
    </PageTransition>

  )
}

export default AllTools