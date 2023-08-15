// ** React Imports
import { useState, useEffect, ReactNode } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Drawer from '@mui/material/Drawer'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'


// ** Types
import {  ChatObjWithoutMessages, ChatSidebarLeftType } from 'src/types/apps/chat'

// ** Custom Components Import
import CustomAvatar from 'src/@core/components/mui/avatar'
import { Button } from '@mui/material'
import { addNewChat } from 'src/store/apps/chat'


const ScrollWrapper = ({ children, hidden }: { children: ReactNode; hidden: boolean }) => {
  if (hidden) {
    return <Box sx={{ height: '100%', overflow: 'auto' }}>{children}</Box>
  } else {
    return <PerfectScrollbar options={{ wheelPropagation: false }}>{children}</PerfectScrollbar>
  }
}

const SidebarLeft = (props: ChatSidebarLeftType) => {
  // ** Props
  const {
    store,
    hidden,
    mdAbove,
    dispatch,
    selectChat,
    getInitials,
    sidebarWidth,
    leftSidebarOpen,
    removeSelectedChat,
    formatDateToMonthShort,
    handleLeftSidebarToggle,
  } = props

  // ** States
  const [active, setActive] = useState<null | string>(null)

  // ** Hooks
  const router = useRouter()

  const handleChatClick = (id: string) => {
    dispatch(selectChat(id))
    setActive(id )
    if (!mdAbove) {
      handleLeftSidebarToggle()
    }
  }

  const handleNewChatClick = () => {
    dispatch(addNewChat())
  }

  useEffect(() => {
    if (store && store.selectedChat) {
      setActive(store.selectedChat._id)
    }
  }, [store])

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      setActive(null)
      dispatch(removeSelectedChat())
    })

    return () => {
      setActive(null)
      dispatch(removeSelectedChat())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  const renderChats = () => {
    if (store && store.chats && store.chats.length) {
      
        const arrToMap =store.chats

        return arrToMap.map((chat: ChatObjWithoutMessages, index: number) => {
          const { lastMessage } = chat
          const activeCondition = active !== null && active === chat.id 
          
          
          return (
            <ListItem key={index} disablePadding sx={{ '&:not(:last-child)': { mb: 1.5 } }}>
              <ListItemButton
                disableRipple
                onClick={() => handleChatClick(chat.id)}
                sx={{
                  px: 3,
                  py: 2.5,
                  width: '100%',
                  borderRadius: 1,
                  alignItems: 'flex-start',
                  ...(activeCondition && {
                    backgroundImage: theme =>
                      `linear-gradient(98deg, ${theme.palette.customColors.primaryGradient}, ${theme.palette.primary.main} 94%)`
                  })
                }}
              >
                <ListItemAvatar sx={{ m: 0 }}>
                  
                   
                      <CustomAvatar
                        skin={activeCondition ? 'light-static' : 'light'}
                        sx={{
                          width: 38,
                          height: 38,
                          fontSize: '1rem',
                          ...(activeCondition && { border: theme => `2px solid ${theme.palette.common.white}` })
                        }}
                      >
                        {getInitials(chat.title)}
                      </CustomAvatar>
                   
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    my: 0,
                    ml: 4,
                    mr: 1.5,
                    '& .MuiTypography-root': { ...(activeCondition && { color: 'common.white' }) }
                  }}
                  primary={
                    <Typography noWrap sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                      {chat.title}
                    </Typography>
                  }
                  secondary={
                    <Typography noWrap variant='body2' sx={{ ...(!activeCondition && { color: 'text.disabled' }) }}>
                      {lastMessage ? lastMessage.message : null}
                    </Typography>
                  }
                />
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    flexDirection: 'column',
                    justifyContent: 'flex-start'
                  }}
                >
                  <Typography
                    variant='body2'
                    sx={{ whiteSpace: 'nowrap', color: activeCondition ? 'common.white' : 'text.disabled' }}
                  >
                    <>{lastMessage ? formatDateToMonthShort(lastMessage.time as string, true) : new Date()}</>
                  </Typography>
                  
                </Box>
              </ListItemButton>
            </ListItem>
          )
        })
     
    }
  }




  return (
    <div>
      <Drawer
        open={leftSidebarOpen}
        onClose={handleLeftSidebarToggle}
        variant={mdAbove ? 'permanent' : 'temporary'}
        ModalProps={{
          disablePortal: true,
          keepMounted: true // Better open performance on mobile.
        }}
        sx={{
          zIndex: 7,
          height: '100%',
          display: 'block',
          position: mdAbove ? 'static' : 'absolute',
          '& .MuiDrawer-paper': {
            boxShadow: 'none',
            width: sidebarWidth,
            position: mdAbove ? 'static' : 'absolute',
            borderTopLeftRadius: theme => theme.shape.borderRadius,
            borderBottomLeftRadius: theme => theme.shape.borderRadius
          },
          '& > .MuiBackdrop-root': {
            borderRadius: 1,
            position: 'absolute',
            zIndex: theme => theme.zIndex.drawer - 1
          }
        }}
      >

        <Box sx={{ height: `calc(100% - 4.125rem)` }}>
          <ScrollWrapper hidden={hidden}>
            <Box sx={{ p: theme => theme.spacing(7, 3, 3) }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 3
              }}>
<Typography variant='h6' sx={{ ml: 3, mb: 3, color: 'primary.main' }}>
                Chats
              </Typography>
              <Button variant='contained' color='primary' sx={{ mr: 3, mb: 3 }} onClick={handleNewChatClick}>
                New Chat
              </Button>
              </Box>
              
              <List sx={{ mb: 4, p: 0 }}>{renderChats()}</List>
             
            </Box>
          </ScrollWrapper>
        </Box>
      </Drawer>

      
    </div>
  )
}

export default SidebarLeft
