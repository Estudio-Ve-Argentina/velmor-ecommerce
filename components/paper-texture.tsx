export function PaperTexture({ className = "" }: { className?: string }) {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Mar%2012%2C%202026%2C%2011_58_23%20AM-TWBL6hgagmKiIl8MPPGFWeC7YCWJus.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.6,
        mixBlendMode: "multiply"
      }}
    />
  )
}
