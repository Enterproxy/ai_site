export default function DocumentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      {children}
    </div>
  )
}
