import * as React from "react"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"
import { cn } from "../Utils/cn"

const ToastContext = React.createContext({})

export const useToast = () => {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = React.useState([])

  const addToast = React.useCallback((toast) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { id, ...toast }
    setToasts((prev) => [...prev, newToast])

    // Auto remove after duration
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, toast.duration || 5000)

    return id
  }, [])

  const removeToast = React.useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = React.useCallback(
    ({ title, description, type = "default", duration = 5000 }) => {
      return addToast({ title, description, type, duration })
    },
    [addToast],
  )

  const value = {
    toast,
    toasts,
    removeToast,
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

const ToastContainer = () => {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  )
}

const Toast = ({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleRemove = () => {
    setIsVisible(false)
    setTimeout(() => onRemove(toast.id), 300)
  }

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-600" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case "info":
        return <Info className="w-5 h-5 text-blue-600" />
      default:
        return <Info className="w-5 h-5 text-gray-600" />
    }
  }

  const getBorderColor = () => {
    switch (toast.type) {
      case "success":
        return "border-l-green-500"
      case "error":
        return "border-l-red-500"
      case "warning":
        return "border-l-yellow-500"
      case "info":
        return "border-l-blue-500"
      default:
        return "border-l-gray-500"
    }
  }

  return (
    <div
      className={cn(
        "bg-white border border-gray-200 rounded-lg shadow-lg p-4 border-l-4 transition-all duration-300 ease-in-out transform",
        getBorderColor(),
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="flex-1 min-w-0">
          {toast.title && <div className="font-semibold text-gray-900 text-sm">{toast.title}</div>}
          {toast.description && <div className="text-gray-600 text-sm mt-1 break-words">{toast.description}</div>}
        </div>
        <button onClick={handleRemove} className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-full transition-colors">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  )
}

export { Toast, ToastContainer }
