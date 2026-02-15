"use client"

import { useState, useEffect } from "react"
import { client } from "@/sanity/lib/client"
import { supabaseClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Loader2, Play, CheckCircle, AlertCircle, Wand2 } from "lucide-react"

export default function AudioGeneratorPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("")
  const [logs, setLogs] = useState<string[]>([])

  // Fetch posts without audio
  useEffect(() => {
    const fetchPosts = async () => {
      const query = `*[_type == "post" && !defined(audio) && !defined(audioRef)] | order(_createdAt desc)[0...20] {
        _id,
        title,
        slug,
        body
      }`
      // Note: We're fetching 'body' to extract text later. Ideally, we fetch body on selection.
      const data = await client.fetch(query)
      setPosts(data)
    }
    fetchPosts()
  }, [])

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
      // 1. Crear documento de audioResource en Sanity
      addLog("Creando recurso en Sanity...")
      const audioDoc = await client.create({
        _type: 'audioResource',
        post: { _type: 'reference', _ref: selectedPost._id },
        status: 'generating',
        voice: 'onyx',
        audioSegments: []
      })
      addLog(`Documento creado: ${audioDoc._id}`)

      // 2. Extraer y dividir texto
      const fullText = extractTextFromBody(selectedPost.body)
      if (!fullText) throw new Error("El post no tiene contenido de texto")
      
      const chunks = chunkText(fullText)
      addLog(`Texto dividido en ${chunks.length} segmentos.`)
      
      const audioUrls: string[] = []

      // 3. Generar audio por chunks (Secuencial)
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
        addLog(`Segmento ${i + 1} generado: ${data.url.slice(-20)}`)
      }

      // 4. Actualizar Sanity con las URLs
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
      addLog("Proceso finalizado con éxito.")

    } catch (error: any) {
      console.error(error)
      setStatus("Error")
      addLog(`FATAL ERROR: ${error.message}`)
      // Update status to error
      // Note: In a real app we'd keep the ID to update it here
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-20 px-4 max-w-4xl text-white">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <Wand2 className="text-emerald-400" /> Generador de Audio IA
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">1. Seleccionar Post</h2>
          <div className="space-y-2 h-[400px] overflow-y-auto pr-2 bg-zinc-900/50 p-4 rounded-xl border border-white/10">
            {posts.map(post => (
              <div 
                key={post._id}
                onClick={() => setSelectedPost(post)}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  selectedPost?._id === post._id 
                    ? "bg-emerald-500/20 border-emerald-500/50 border" 
                    : "hover:bg-white/5 border border-transparent"
                }`}
              >
                <h3 className="font-medium text-sm line-clamp-1">{post.title}</h3>
                <p className="text-xs text-zinc-500 mt-1">{post.slug?.current}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">2. Estado del Proceso</h2>
          
          <div className="bg-zinc-950 p-6 rounded-xl border border-white/10 min-h-[300px] flex flex-col">
            {selectedPost ? (
              <>
                <div className="mb-4">
                  <h3 className="font-bold text-lg mb-1">{selectedPost.title}</h3>
                  <p className="text-sm text-zinc-400">Listo para procesar</p>
                </div>

                {loading || progress > 0 ? (
                  <div className="space-y-4">
                     <div className="flex justify-between text-sm mb-1">
                        <span>{status}</span>
                        <span>{progress}%</span>
                     </div>
                     <Progress value={progress} className="h-2 bg-zinc-800" indicatorClassName="bg-emerald-500" />
                  </div>
                ) : (
                  <Button 
                    onClick={generateAudio} 
                    disabled={loading}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                  >
                    <Play className="w-4 h-4 mr-2" /> Iniciar Generación
                  </Button>
                )}

                <div className="mt-6 flex-1 bg-black/50 p-3 rounded text-xs font-mono text-zinc-400 overflow-y-auto max-h-[150px]">
                  {logs.length === 0 ? <p className="opacity-50">Log de operaciones...</p> : logs.map((l, i) => <div key={i}>{l}</div>)}
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-zinc-500 flex-col gap-2">
                <AlertCircle />
                <p>Selecciona un post para comenzar</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
