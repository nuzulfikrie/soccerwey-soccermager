interface KitPreviewProps {
  jersey: string
  pants: string
  socks: string
}

export default function KitPreview({ jersey, pants, socks }: KitPreviewProps) {
  return (
    <div className="mt-4 p-4 border rounded-md bg-gray-50">
      <div className="flex items-center justify-center space-x-4">
        {/* Jersey */}
        <div className="relative w-20 h-24">
          <div
            className="absolute inset-0 rounded-lg"
            style={{ backgroundColor: jersey }}
          />
          <div className="absolute inset-x-0 top-0 h-6 bg-white/20 rounded-t-lg" />
        </div>

        {/* Pants */}
        <div className="relative w-16 h-16">
          <div
            className="absolute inset-0 rounded"
            style={{ backgroundColor: pants }}
          />
        </div>

        {/* Socks */}
        <div className="flex space-x-2">
          <div
            className="w-4 h-12 rounded"
            style={{ backgroundColor: socks }}
          />
          <div
            className="w-4 h-12 rounded"
            style={{ backgroundColor: socks }}
          />
        </div>
      </div>
    </div>
  )
} 