import DockNavigate from '../shared/dock-nav'

export default function PageLayout({
  children,
}: {
  children?: React.ReactNode
}) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        {children}
      </main>
      <DockNavigate
        direction="middle"
        iconSize={52}
        iconMagnification={72}
        className="absolute bottom-4 rounded-lg bg-white/80 backdrop-blur-sm dark:bg-black/80"
      />
    </div>
  )
}
