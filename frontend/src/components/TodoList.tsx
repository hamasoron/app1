import type { Todo } from '@/types'
import { format } from 'date-fns'

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <p className="text-gray-500 text-lg">📭 No todos yet</p>
        <p className="text-gray-400 text-sm mt-2">Add a new todo using the form above!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start gap-3">
            {/* Checkbox */}
            <button
              onClick={() => onToggle(todo.id)}
              className="mt-1 flex-shrink-0"
            >
              <div
                className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                  todo.completed
                    ? 'bg-green-500 border-green-500'
                    : 'border-gray-300 hover:border-green-400'
                }`}
              >
                {todo.completed && (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </button>

            {/* Todo content */}
            <div className="flex-1 min-w-0">
              <h3
                className={`font-medium text-lg ${
                  todo.completed
                    ? 'line-through text-gray-400'
                    : 'text-gray-800'
                }`}
              >
                {todo.title}
              </h3>
              {todo.description && (
                <p className="text-gray-600 text-sm mt-1">{todo.description}</p>
              )}
              <div className="flex flex-wrap gap-2 mt-2">
                {todo.category && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {todo.category}
                  </span>
                )}
                <span className="text-xs text-gray-500">
                  Created: {format(new Date(todo.created_at), 'yyyy/MM/dd HH:mm')}
                </span>
              </div>
            </div>

            {/* Delete button */}
            <button
              onClick={() => onDelete(todo.id)}
              className="flex-shrink-0 text-red-500 hover:text-red-700 transition-colors"
              aria-label="Delete"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

