"use client"

import { useState } from "react"
import { OpenClawCodeBlock } from "./OpenClawCodeBlock"

const TABS = [
  { id: "mac", label: "macOS" },
  { id: "linux", label: "Linux (Ubuntu/Debian)" },
  { id: "windows", label: "Windows" },
]

const CODES: Record<string, string> = {
  mac: `# 1. Instalar Homebrew (si no lo tienes)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Instalar dependencias
brew install python node git

# 3. Clonar el repositorio
git clone https://github.com/openclaw/openclaw.ai.git
cd openclaw.ai

# 4. Instalar paquetes de Node
npm install

# 5. Configurar variables de entorno
cp .env.example .env`,
  linux: `# 1. Actualizar repositorios e instalar dependencias
sudo apt update && sudo apt install -y python3 python3-pip nodejs npm git

# 2. Clonar el repositorio
git clone https://github.com/openclaw/openclaw.ai.git
cd openclaw.ai

# 3. Instalar paquetes de Node
npm install

# 4. Configurar variables de entorno
cp .env.example .env`,
  windows: `# Abre PowerShell como Administrador

# 1. Instalar dependencias usando Winget
winget install Python.Python.3.11
winget install OpenJS.NodeJS
winget install Git.Git

# 2. Clonar el repositorio
git clone https://github.com/openclaw/openclaw.ai.git
cd openclaw.ai

# 3. Instalar paquetes de Node
npm install

# 4. Configurar variables de entorno
copy .env.example .env`,
}

export function OpenClawInstallationTabs() {
  const [active, setActive] = useState("mac")

  return (
    <div className="mt-6">
      <div className="flex space-x-1 border-b border-white/10 mb-1 overflow-x-auto">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors relative whitespace-nowrap ${
              active === tab.id ? "text-[#e05a3a]" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {tab.label}
            {active === tab.id && (
              <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#e05a3a] rounded-full" />
            )}
          </button>
        ))}
      </div>
      <OpenClawCodeBlock code={CODES[active]} language="bash" />
    </div>
  )
}
