import { useState, useEffect } from 'react'
import { Plus, X } from 'lucide-react'
import '../FacultyTambolaRegister.css'

interface Faculty {
  id: string
  name: string
  facultyNumber: string
  registeredAt: string
}

interface FacultyTambolaRegisterProps {
  isOpen: boolean
  onClose: () => void
}

export default function FacultyTambolaRegister({ isOpen, onClose }: FacultyTambolaRegisterProps) {
  const [faculty, setFaculty] = useState<Faculty[]>([])
  const [formData, setFormData] = useState({ name: '', facultyNumber: '' })

  // Load faculty from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('facultyTambola')
    if (saved) {
      try {
        setFaculty(JSON.parse(saved))
      } catch (error) {
        console.error('Failed to load faculty data:', error)
      }
    }
  }, [])

  // Save to localStorage whenever faculty changes
  useEffect(() => {
    localStorage.setItem('facultyTambola', JSON.stringify(faculty))
  }, [faculty])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddFaculty = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.facultyNumber.trim()) {
      alert('Please fill in all fields')
      return
    }

    const newFaculty: Faculty = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      facultyNumber: formData.facultyNumber.trim(),
      registeredAt: new Date().toLocaleString('en-IN'),
    }

    setFaculty(prev => [...prev, newFaculty])
    setFormData({ name: '', facultyNumber: '' })
  }

  return (
    <div className="faculty-tambola-overlay" style={{ display: isOpen ? 'flex' : 'none' }}>
      <div className="faculty-tambola-modal">
        <div className="modal-header">
          <h2>Faculty Tambola Register</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-content">
          <div className="registration-section">
            <h3>Register Faculty Member</h3>
            <form onSubmit={handleAddFaculty} className="registration-form">
              <div className="form-group">
                <label htmlFor="name">Faculty Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter faculty name"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="facultyNumber">Faculty Number</label>
                <input
                  id="facultyNumber"
                  type="text"
                  name="facultyNumber"
                  value={formData.facultyNumber}
                  onChange={handleInputChange}
                  placeholder="Enter faculty number"
                  className="form-input"
                />
              </div>
              <button type="submit" className="submit-btn">
                <Plus size={18} /> Add Faculty
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
