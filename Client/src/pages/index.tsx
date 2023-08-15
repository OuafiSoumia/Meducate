// ** React Imports
import { useEffect , ReactNode} from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

// ** Hook Imports
import BlankLayout from 'src/@core/layouts/BlankLayout'

/**
 *  Set Home URL based on User Roles
 */


const Home = () => {
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }
    
    
    router.replace('/home')
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Spinner />
}

Home.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>


export default Home
