'use client'

import KitPreview from '@/components/kit-preview'
import { TeamFormData, teamFormSchema } from '@/lib/validations/team'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function TeamSetupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  const form = useForm<TeamFormData>({
    resolver: zodResolver(teamFormSchema),
    defaultValues: {
      name: '',
      mainKit: {
        jersey: '#ff0000',
        pants: '#ffffff',
        socks: '#ff0000',
      },
      secondKit: {
        jersey: '#ffffff',
        pants: '#000000',
        socks: '#ffffff',
      },
      thirdKit: {
        jersey: '#0000ff',
        pants: '#ffffff',
        socks: '#0000ff',
      },
    },
  })

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Logo must be less than 5MB')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: TeamFormData) => {
    try {
      setIsLoading(true)

      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('mainKit', JSON.stringify(data.mainKit))
      formData.append('secondKit', JSON.stringify(data.secondKit))
      formData.append('thirdKit', JSON.stringify(data.thirdKit))

      if (form.watch('logo')?.[0]) {
        formData.append('logo', form.watch('logo')[0])
      }

      const response = await fetch('/api/teams', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to create team')
      }

      const result = await response.json()
      toast.success('Team created successfully')
      router.push(`/team-sheet/${result.id}`)
    } catch (error) {
      toast.error('Failed to create team')
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Team Setup</h1>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Team Name
              </label>
              <input
                type="text"
                {...form.register('name')}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter team name"
              />
              {form.formState.errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Team Logo
              </label>
              <input
                type="file"
                accept="image/*"
                {...form.register('logo')}
                onChange={handleLogoChange}
                className="w-full"
              />
              {logoPreview && (
                <div className="mt-2">
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="w-32 h-32 object-contain"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Main Kit</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Jersey</label>
                  <input
                    type="color"
                    {...form.register('mainKit.jersey')}
                    className="w-full h-10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Pants</label>
                  <input
                    type="color"
                    {...form.register('mainKit.pants')}
                    className="w-full h-10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Socks</label>
                  <input
                    type="color"
                    {...form.register('mainKit.socks')}
                    className="w-full h-10"
                  />
                </div>
              </div>
              <KitPreview
                jersey={form.watch('mainKit.jersey')}
                pants={form.watch('mainKit.pants')}
                socks={form.watch('mainKit.socks')}
              />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Second Kit</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Jersey</label>
                  <input
                    type="color"
                    {...form.register('secondKit.jersey')}
                    className="w-full h-10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Pants</label>
                  <input
                    type="color"
                    {...form.register('secondKit.pants')}
                    className="w-full h-10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Socks</label>
                  <input
                    type="color"
                    {...form.register('secondKit.socks')}
                    className="w-full h-10"
                  />
                </div>
              </div>
              <KitPreview
                jersey={form.watch('secondKit.jersey')}
                pants={form.watch('secondKit.pants')}
                socks={form.watch('secondKit.socks')}
              />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Third Kit</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Jersey</label>
                  <input
                    type="color"
                    {...form.register('thirdKit.jersey')}
                    className="w-full h-10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Pants</label>
                  <input
                    type="color"
                    {...form.register('thirdKit.pants')}
                    className="w-full h-10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Socks</label>
                  <input
                    type="color"
                    {...form.register('thirdKit.socks')}
                    className="w-full h-10"
                  />
                </div>
              </div>
              <KitPreview
                jersey={form.watch('thirdKit.jersey')}
                pants={form.watch('thirdKit.pants')}
                socks={form.watch('thirdKit.socks')}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? 'Creating...' : 'Create Team'}
          </button>
        </div>
      </form>
    </div>
  )
} 