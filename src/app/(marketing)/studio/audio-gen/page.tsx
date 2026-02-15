"use client"

import { useState, useEffect } from "react"
import { client } from "@/sanity/lib/client"
import { supabaseClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Loader2, Play, CheckCircle, AlertCircle, Wand2, Search, RefreshCw } from "lucide-react"

export default function AudioGeneratorPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [filteredPosts, setFilteredPosts] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("")
  const [logs, setLogs] = useState<string[]>([])

  // Fetch all posts
  useEffect(() => {
    const fetchPosts = async () => {
      // Remove filters to show all posts, allowing regeneration
      const query = `*[_type == "post"] | order(_createdAt desc)[0...100] {
        _id,
        title,
        slug,
        body,
        "existingAudio": *[_type == "audioResource" && post._ref == ^._id][0]
      }`
      const data = await client.fetch(query)
      setPosts(data)
      setFilteredPosts(data)
    }
    fetchPosts()
  }, [])

  // Filter posts when search changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPosts(posts)
    } else {
      const lower = searchQuery.toLowerCase()
      setFilteredPosts(posts.filter(p => 
        p.title?.toLowerCase().includes(lower) || 
        p.slug?.current?.toLowerCase().includes(lower)
      ))
    }
  }, [searchQuery, posts])

  const addLog = (msg: string) => setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`])

  const extractTextFromBody = (body: any[]) => {
    if (!body || !Array.isArray(body)) return ""
    return body
      .filter(block => block._type === 'block' && block.children)
      .map(block => block.children.map((child: any) => child.text).join(""))
      .join("\n\n")
  }

  const chunkText = (text: string, maxLength: number = 4000) => {
    const chunks = []
    let currentChunk = ""
    
    const paragraphs = text.split("\n\n")
    
    for (const para of paragraphs) {
      if ((currentChunk + para).length > maxLength) {
        chunks.push(currentChunk.trim())
        currentChunk = para + "\n\n"
      } else {
        currentChunk += para + "\n\n"
      }
    }
    if (currentChunk.trim()) chunks.push(currentChunk.trim())
    
    return chunks
  }

  const generateAudio = async () => {
    if (!selectedPost) return
    setLoading(true)
    setProgress(0)
    setLogs([])
    setStatus("Preparando texto...")

    try {
      // 1. Create or replace audioResource document in Sanity
      addLog("Creando/Actualizando recurso en Sanity...")
      
      // Check if exists? For now we create a new one or ideally we should update existing.
      // SImple approach: Create new, Sanity reference will just point to this new one eventually? 
      // Actually, if we create a new one, we might leave orphans. 
      // Let's just create one for now, logic can be refined to patch existing.
      const audioDoc = await client.create({
        _type: 'audioResource',
        post: { _type: 'reference', _ref: selectedPost._id },
        status: 'generating',
        voice: 'onyx',
        audioSegments: []
      })
      addLog(`Documento ID: ${audioDoc._id}`)

      // 2. Extract and chunk text
      const fullText = extractTextFromBody(selectedPost.body)
      if (!fullText) throw new Error("El post no tiene contenido de texto")
      
      const chunks = chunkText(fullText)
      addLog(`Texto dividido en ${chunks.length} segmentos.`)
      
      const audioUrls: string[] = []

      // 3. Generate audio by chunks (Sequential)
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i]
        const progressVal = Math.round(((i) / chunks.length) * 100)
        setProgress(progressVal)
        setStatus(`Generando segmento ${i + 1}/${chunks.length}...`)
        addLog(`Procesando segmento ${i + 1} (${chunk.length} chars)...`)

        const { data, error } = await supabaseClient.functions.invoke('generate-audio-chunk', {
          body: {
            text: chunk,
            voice: 'onyx',
            segmentIndex: i,
            postId: selectedPost._id
          }
        })

        if (error) throw new Error(`Error en Edge Function: ${error.message}`)
        if (!data.url) throw new Error("No se recibió URL del audio")

        audioUrls.push(data.url)
        addLog(`Segmento ${i + 1} generado.`)
      }

      // 4. Update Sanity with the URLs
      setStatus("Finalizando...")
      await client
        .patch(audioDoc._id)
        .set({ 
          audioSegments: audioUrls,
          status: 'completed' 
        })
        .commit()

      setProgress(100)
      setStatus("¡Completado!")
      addLog("✅ Proceso finalizado con éxito.")
      
      // Update local state to show it has audio
      setPosts(prev => prev.map(p => 
        p._id === selectedPost._id 
          ? { ...p, existingAudio: { status: 'completed' } } 
          : p
      ))

    } catch (error: any) {
      console.error(error)
      setStatus("Error")
      addLog(`❌ ERROR: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-20 px-4 max-w-6xl text-white min-h-screen bg-black">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Wand2 className="text-emerald-400" /> Generador de Audio IA
        </h1>
        <div className="text-xs text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
          v1.0 • OpenAI TTS-1
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Post List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <Input 
              placeholder="Buscar posts..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-zinc-900 border-zinc-800 focus:border-emerald-500"
            />
          </div>
          
          <div className="space-y-2 h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredPosts.map(post => (
              <div 
                key={post._id}
                onClick={() => setSelectedPost(post)}
                className={`p-4 rounded-xl cursor-pointer transition-all border group relative ${
                  selectedPost?._id === post._id 
                    ? "bg-emerald-500/10 border-emerald-500/50" 
                    : "bg-zinc-900/50 border-white/5 hover:border-white/20 hover:bg-zinc-900"
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-medium text-sm line-clamp-2 leading-snug">{post.title}</h3>
                  {post.existingAudio && (
                     <span className="shrink-0 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                       Audio OK
                     </span>
                  )}
                </div>
                <p className="text-xs text-zinc-500 mt-2 font-mono truncate opacity-60 group-hover:opacity-100 transition-opacity">
                  /{post.slug?.current}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Action Area */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-zinc-950 p-8 rounded-2xl border border-white/10 min-h-[600px] flex flex-col relative overflow-hidden">
            {selectedPost ? (
              <>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-20" />
                
                <div className="mb-8">
                  <span className="text-xs font-mono text-emerald-500 mb-2 block">Post Seleccionado</span>
                  <h3 className="text-2xl font-bold mb-2">{selectedPost.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-zinc-400">
                    <span>ID: {selectedPost._id.slice(0, 8)}...</span>
                    {selectedPost.existingAudio && (
                       <span className="flex items-center gap-1 text-emerald-400">
                         <CheckCircle className="w-4 h-4" /> Ya tiene audio
                       </span>
                    )}
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  {loading || progress > 0 ? (
                    <div className="space-y-6 max-w-md mx-auto w-full">
                       <div className="text-center space-y-2">
                           <Loader2 className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
                           <h4 className="text-lg font-medium">{status}</h4>
                           <p className="text-sm text-zinc-500">No cierres esta ventana</p>
                       </div>
                       <div className="space-y-2">
                          <div className="flex justify-between text-xs uppercase font-bold tracking-wider text-zinc-500">
                             <span>Progreso</span>
                             <span>{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2 bg-zinc-800" indicatorClassName="bg-emerald-500" />
                       </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-6">
                      <div className="p-6 bg-zinc-900/50 rounded-xl border border-dashed border-zinc-800 max-w-sm mx-auto">
                        <p className="text-zinc-400 text-sm mb-4">
                          {selectedPost.existingAudio 
                            ? "Este post ya tiene audio. ¿Quieres generarlo de nuevo?" 
                            : "Este post no tiene audio. Genera uno ahora."}
                        </p>
                        <Button 
                          onClick={generateAudio} 
                          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-12 text-lg shadow-lg shadow-emerald-500/20"
                        >
                          {selectedPost.existingAudio ? (
                             <><RefreshCw className="w-5 h-5 mr-2" /> Regenerar Audio</>
                          ) : (
                             <><Play className="w-5 h-5 mr-2" /> Crear Audio Ahora</>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                  <p className="text-xs font-mono text-zinc-500 mb-3 uppercase tracking-wider">Log del Sistema</p>
                  <div className="bg-black p-4 rounded-lg font-mono text-xs text-zinc-300 h-[150px] overflow-y-auto custom-scrollbar border border-white/5">
                    {logs.length === 0 ? (
                      <span className="text-zinc-700 italic">Esperando inicio del proceso...</span>
                    ) : (
                      logs.map((l, i) => (
                        <div key={i} className="mb-1 last:mb-0 border-l-2 border-emerald-500/30 pl-2">
                          {l}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-zinc-500 flex-col gap-4">
                <div className="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800">
                   <Wand2 className="w-8 h-8 opacity-50" />
                </div>
                <p className="text-lg font-medium">Selecciona un artículo del panel izquierdo</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
