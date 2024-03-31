import { useToast } from '@chakra-ui/react'

const ToastNotification = () => {
  const toast = useToast()

  const toastNotification = (
    title: string,
    status: 'info' | 'warning' | 'success' | 'error' | 'loading' | undefined,
    description: string,
  ) =>
    toast({
      title,
      description,
      status,
      duration: 3000,
      isClosable: true,
    })

  return { toastNotification }
}

export default ToastNotification
