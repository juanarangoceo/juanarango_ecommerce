"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

export function TermsModal({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-zinc-950 border-zinc-800 text-zinc-100">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Términos y Condiciones</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Última actualización: {new Date().toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[400px] w-full rounded-md border border-zinc-800 p-4 bg-zinc-900/50">
          <div className="space-y-4 text-sm text-zinc-300">
             <p><strong>1. Introducción</strong></p>
             <p>Al suscribirte a nuestro boletín, aceptas recibir correos electrónicos de Juan Arango con noticias, actualizaciones y promociones.</p>

             <p><strong>2. Uso de Datos</strong></p>
             <p>Tu dirección de correo electrónico se almacenará de forma segura y solo se utilizará para enviarte el contenido al que te has suscrito. No compartiremos tu información con terceros sin tu consentimiento explícito.</p>

             <p><strong>3. Cancelación de la Suscripción</strong></p>
             <p>Puedes optar por dejar de recibir nuestros correos en cualquier momento haciendo clic en el enlace "darse de baja" que aparece en el pie de página de cada correo electrónico.</p>

             <p><strong>4. Responsabilidad</strong></p>
             <p>Nos esforzamos por proporcionar información precisa, pero no nos hacemos responsables de errores u omisiones en el contenido enviado.</p>
             
             <p><strong>5. Cambios en los Términos</strong></p>
             <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Te notificaremos de cualquier cambio significativo.</p>
          </div>
        </ScrollArea>
        <div className="flex justify-end">
          <DialogTrigger asChild>
            <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800 hover:text-white">Entendido</Button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
}
