'use client'

import { useState, useEffect } from 'react'
import { TodoList } from '@/components/TodoList'
import { TodoForm } from '@/components/TodoForm'
import { TodoStats } from '@/components/TodoStats'
import { api } from '@/lib/api'
import type { Todo } from '@/types'

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  // Fetch todo list
  const fetchTodos = async () => {
    try {
      setLoading(true)
      const data = await api.getTodos()
      setTodos(data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch todos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  // Create todo
  const handleCreate = async (title: string, description?: string, category?: string) => {
    try {
      const newTodo = await api.createTodo({ title, description, category, completed: false })
      setTodos([...todos, newTodo])
    } catch (err) {
      setError('Failed to create todo')
      console.error(err)
    }
  }

  // Update todo
  const handleToggle = async (id: number) => {
    try {
      const todo = todos.find(t => t.id === id)
      if (!todo) return

      const updated = await api.updateTodo(id, { completed: !todo.completed })
      setTodos(todos.map(t => (t.id === id ? updated : t)))
    } catch (err) {
      setError('Failed to update todo')
      console.error(err)
    }
  }

  // Delete todo
  const handleDelete = async (id: number) => {
    try {
      await api.deleteTodo(id)
      setTodos(todos.filter(t => t.id !== id))
    } catch (err) {
      setError('Failed to delete todo')
      console.error(err)
    }
  }

  // Filter todos
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📝 Todo App
          </h1>
          <p className="text-gray-600">
            Modern task management app built with Next.js and FastAPI
          </p>
        </header>

        {/* Error display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Statistics */}
        <TodoStats todos={todos} />

        {/* Todo creation form */}
        <TodoForm onSubmit={handleCreate} />

        {/* Filter */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                filter === 'active'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                filter === 'completed'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Todo list */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        ) : (
          <TodoList
            todos={filteredTodos}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        )}

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-600 text-sm">
          <p>© 2025 Todo App - Portfolio Project</p>
          <p className="mt-1">Built with Next.js, TypeScript, FastAPI, and ❤️</p>
        </footer>
      </div>
    </main>
  )
}

