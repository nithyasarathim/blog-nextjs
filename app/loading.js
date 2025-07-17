'use client'

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-24 h-24 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-sm text-gray-600">Loading...</p>
    </div>
  )
}
