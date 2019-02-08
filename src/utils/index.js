import { toast } from 'react-semantic-toasts'

export const setToast = ({ title, description, time = 5000, type }) => {
  toast({ title, description, time, type })
}
