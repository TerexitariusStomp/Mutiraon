export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            {/* Brand */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg" />
              <span className="text-xl font-bold">Amaz-One Dollar</span>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed max-w-2xl mx-auto">
              Building sustainable financial infrastructure for Brazil's solidarity economy through USD-pegged,
              impact-backed stablecoins.
            </p>
          </div>

          <div className="border-t border-primary-foreground/10 pt-8 text-center">
            <p className="text-sm text-primary-foreground/70">© 2025 Amaz-One Dollar. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
