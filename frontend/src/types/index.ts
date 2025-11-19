export interface Todo {
  id: number
  title: string
  description?: string
  completed: boolean
  category?: string
  due_date?: string
  created_at: string
  updated_at: string
}

export interface TodoCreate {
  title: string
  description?: string
  completed: boolean
  category?: string
  due_date?: string
}

export interface TodoUpdate {
  title?: string
  description?: string
  completed?: boolean
  category?: string
  due_date?: string
}

export interface TodoStats {
  total: number
  completed: number
  pending: number
  completion_rate: number
  categories: Record<string, number>
}

export interface User {
  id: number
  email: string
  name: string
  created_at: string
}

export interface UserCreate {
  email: string
  password: string
  name: string
}

export interface UserLogin {
  email: string
  password: string
}

export interface Token {
  access_token: string
  token_type: string
}

