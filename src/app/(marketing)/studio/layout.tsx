export const metadata = {
  title: 'Content Studio',
  description: 'Admin area for content management',
  robots: {
    index: false,
    follow: false,
  },
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-black min-h-screen">
      {children}
    </div>
  )
}
