import axios from 'axios'
import type { Todo, TodoCreate, TodoUpdate, TodoStats } from '@/types'

// Use production URL for Vercel deployment, localhost for local development
const API_URL = process.env.NEXT_PUBLIC_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname !== 'localhost' 
    ? 'https://app1-yx9c.onrender.com' 
    : 'http://localhost:8000')

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const api = {
  // Health check
  async healthCheck() {
    const response = await apiClient.get('/health')
    return response.data
  },

  // Get todo list
  async getTodos(params?: { completed?: boolean; category?: string; search?: string }): Promise<Todo[]> {
    const response = await apiClient.get('/api/todos', { params })
    return response.data
  },

  // Get single todo
  async getTodo(id: number): Promise<Todo> {
    const response = await apiClient.get(`/api/todos/${id}`)
    return response.data
  },

  // Create todo
  async createTodo(todo: TodoCreate): Promise<Todo> {
    const response = await apiClient.post('/api/todos', todo)
    return response.data
  },

  // Update todo
  async updateTodo(id: number, todo: TodoUpdate): Promise<Todo> {
    const response = await apiClient.put(`/api/todos/${id}`, todo)
    return response.data
  },

  // Delete todo
  async deleteTodo(id: number): Promise<void> {
    await apiClient.delete(`/api/todos/${id}`)
  },

  // Get statistics
  async getStats(): Promise<TodoStats> {
    const response = await apiClient.get('/api/todos/stats/summary')
    return response.data
  },
}
