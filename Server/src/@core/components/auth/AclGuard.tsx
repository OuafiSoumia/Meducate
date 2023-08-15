// ** React Imports
import { ReactNode, useState } from 'react'

// ** Types
import type { ACLObj, AppAbility } from 'src/configs/acl'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Config Import
import { buildAbilityFor } from 'src/configs/acl'

// ** Component Import
import NotAuthorized from 'src/pages/401'
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

interface AclGuardProps {
  children: ReactNode
  authGuard: boolean
  aclAbilities: ACLObj
}

const AclGuard = (props: AclGuardProps) => {
  // ** Props
  const { aclAbilities, children, authGuard } = props

  const [ability, setAbility] = useState<AppAbility | undefined>(undefined)

  // ** Hooks
  const auth = useAuth()
  

  if (auth.user && auth.user.role && !ability) {
    setAbility(buildAbilityFor(auth.user.role, aclAbilities.subject))
  }

  if (authGuard) {
    // Check the access of current user and render pages
    if (ability && ability.can(aclAbilities.action, aclAbilities.subject)) {
      return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
    }

    // Render Not Authorized component if the current user has limited access
    return (
      <BlankLayout>
        <NotAuthorized />
      </BlankLayout>
    )
  } else {
    if (ability) {
      return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
    }
  }

  // If guestGuard is true and user is not logged in or its an error page, render the page without checking access

  return <>{children}</>

  // User is logged in, build ability for the user based on his role
}

export default AclGuard
