// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'


interface GuestGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children } = props
  
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }

   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route])
  
 

  return <>{children}</>
}

export default GuestGuard
