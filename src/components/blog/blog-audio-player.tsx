"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, SkipForward, SkipBack } from "lucide-react"
import { motion } from "framer-motion"

interface BlogAudioPlayerProps {
  playlist: string[]
  title?: string
}

export function BlogAudioPlayer({ playlist, title = "Escuchar artículo" }: BlogAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentTrackIndex]) // Re-trigger on track change

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime
      const duration = audioRef.current.duration
      setProgress((current / duration) * 100)
    }
  }

  const handleEnded = () => {
    if (currentTrackIndex < playlist.length - 1) {
      // Play next track
      setCurrentTrackIndex(prev => prev + 1)
      setIsPlaying(true) // Ensure next track plays
    } else {
      // Playlist finished
      setIsPlaying(false)
      setCurrentTrackIndex(0)
      setProgress(0)
    }
  }

  const togglePlay = () => setIsPlaying(!isPlaying)

  return (
    <div className="w-full max-w-2xl mx-auto p-4 rounded-xl border border-zinc-200 dark:border-emerald-500/20 bg-white/10 dark:bg-zinc-900/50 backdrop-blur-md shadow-xl relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Audio Element Hidden */}
      <audio
        ref={audioRef}
        src={playlist[currentTrackIndex]}
        onTimeUpdate={handleTimeUpdate}
         onEnded={handleEnded}
      />

      <div className="flex items-center gap-4 relative z-10">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-emerald-500/20"
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
        </button>

        <div className="flex-1 space-y-2">
           <div className="flex justify-between items-center text-xs font-medium text-zinc-600 dark:text-emerald-400 tracking-wider uppercase">
             <span>{title}</span>
             <span>Parte {currentTrackIndex + 1} de {playlist.length}</span>
           </div>
           
           {/* Progress Bar */}
           <div className="h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden w-full relative">
              <motion.div 
                className="h-full bg-emerald-500 relative"
                style={{ width: `${progress}%` }}
                layoutId="progress"
              >
                  {/* Glow tip */}
                  <div className="absolute right-0 top-0 bottom-0 w-2 bg-white blur-[2px]" />
              </motion.div>
           </div>
        </div>

        {/* Visualizer Icon */}
         <div className="hidden sm:flex items-center gap-0.5 h-6">
            {[1, 2, 3, 4].map((i) => (
                <motion.div
                    key={i}
                    className="w-1 bg-emerald-500/50 rounded-full"
                    animate={isPlaying ? { height: ["20%", "80%", "40%"] } : { height: "20%" }}
                    transition={{
                        repeat: Infinity,
                        duration: 0.6,
                        delay: i * 0.1,
                        ease: "easeInOut"
                    }}
                    style={{ height: "40%" }}
                />
            ))}
        </div>
      </div>
    </div>
  )
}
