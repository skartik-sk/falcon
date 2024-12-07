"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'

export default function BlackWhiteForm() {
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    description: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would typically send the data to an API
  }

  return (
    <>
      <div className={"flex min-h-screen w-full text-white bg-black"}>
      {/* Mobile Menu Button */}
      <Sheet>
        <SheetTrigger asChild className="lg:hidden absolute left-4 top-20 z-8 text-white bg-black border-none">
          <Button variant="outline" size="icon">
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px] text-white bg-black">
          <nav className="flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <Button variant="ghost" className="justify-start">
                Home
              </Button>
              <Button variant="ghost" className="justify-start">
                Markets
              </Button>
              <Button variant="ghost" className="justify-start">
                Portfolio
              </Button>
              <Button variant="ghost" className="justify-start">
                Leaderboard
              </Button>
            </div>
            <Button variant="ghost" className="justify-start">
              Logout
            </Button>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Left Sidebar - Navigation */}
      <nav className="hidden h-[85vh] lg:fixed mt-24 lg:flex w-[240px] flex-col justify-between border-r p-6 text-white bg-black">
        <div className="flex flex-col gap-4">
          <Button variant="ghost" className="justify-start">
            Home
          </Button>
          <Button variant="ghost" className="justify-start">
            Markets
          </Button>
          <Button variant="ghost" className="justify-start">
            Portfolio
          </Button>
          <Button variant="ghost" className="justify-start">
            Leaderboard
          </Button>
        </div>
        <Button variant="ghost" className="justify-start">
          Logout
        </Button>
      </nav>

      {/* Main Content Area */}
      <div className="min-h lg:ml-[240px] w-full flex mt-24 items-center justify-center bg-black text-white p-4">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold text-center mb-6">Submit Form</h2>
          
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="Enter title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="text-white">Image URL</Label>
            <Input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="Enter image URL"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="Enter description"
              rows={4}
            />
          </div>

          <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
            Submit
          </Button>
        </form>
      </div>

      {/* Right Sidebar - Verified Users */}
      {/* <aside className="hidden mt-24 fixed right-0 lg:block w-[300px] border-1 p-6">
        <h2 className="text-lg font-semibold mb-4">Verified Users</h2>
        
      </aside> */}
      </div>
    </>
  )
}

