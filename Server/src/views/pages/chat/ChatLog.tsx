// ** React Imports
import { useRef, useEffect, Ref, ReactNode } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Third Party Components
import PerfectScrollbarComponent, { ScrollBarProps } from 'react-perfect-scrollbar'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import dotAnimation from '../../../../public/lottie/50817-three-dots.json'
import ReactMarkdown from 'react-markdown'

// ** Utils Imports
import { getInitials } from 'src/@core/utils/get-initials'
import Lottie from 'lottie-react'

// ** Types Imports
import { ChatLogType, MessageType, ChatLogChatType, MessageGroupType, FormattedChatsType } from 'src/types/apps/chat'
import { useAuth } from 'src/hooks/useAuth'
import { useSelector } from 'react-redux'

const PerfectScrollbar = styled(PerfectScrollbarComponent)<ScrollBarProps & { ref: Ref<unknown> }>(({ theme }) => ({
  padding: theme.spacing(5)
}))


const ChatLog = (props: ChatLogType) => {
  // ** Props
  const { chat, hidden } = props

  const { user } = useAuth()

  const { aiStatus } = useSelector((state: any) => state.chat)

  // ** Ref
  const chatArea = useRef(null)

  // ** Scroll to chat bottom
  const scrollToBottom = () => {
    if (chatArea.current) {
      if (hidden) {
        // @ts-ignore
        chatArea.current.scrollTop = Number.MAX_SAFE_INTEGER
      } else {
        // @ts-ignore
        chatArea.current._container.scrollTop = Number.MAX_SAFE_INTEGER
      }
    }
  }

  // ** Formats chat data based on sender
  const formattedChatData = () => {
    let chatLog: MessageType[] | [] = []
    if (chat) {
      chatLog = chat.messages
    }

    const formattedChatLog: FormattedChatsType[] = []
    let chatMessageSenderId = chatLog[0] ? chatLog[0].senderId : '11'
    let msgGroup: MessageGroupType = {
      senderId: chatMessageSenderId,
      messages: []
    }
    chatLog.forEach((msg: MessageType, index: number) => {
      if (chatMessageSenderId === msg.senderId) {
        msgGroup.messages.push({
          time: msg.time,
          msg: msg.message
        })
      } else {
        chatMessageSenderId = msg.senderId

        formattedChatLog.push(msgGroup)
        msgGroup = {
          senderId: msg.senderId,
          messages: [
            {
              time: msg.time,
              msg: msg.message
            }
          ]
        }
      }

      if (index === chatLog.length - 1) formattedChatLog.push(msgGroup)
    })

    return formattedChatLog
  }

  useEffect(() => {
    if (chat && chat.messages.length) {
      scrollToBottom()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chat])

  // ** Renders user chat
  const renderChats = () => {
    return (
      <>
        {formattedChatData().map((item: FormattedChatsType, index: number) => {
          const isSender = item.senderId === user?._id

          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: !isSender ? 'row' : 'row-reverse',
                mb: index !== formattedChatData().length - 1 ? 4 : undefined
              }}
            >
              <div>
                <CustomAvatar
                  skin='light'
                  sx={{
                    width: '2rem',
                    height: '2rem',
                    fontSize: '0.875rem',
                    ml: isSender ? 3.5 : undefined,
                    mr: !isSender ? 3.5 : undefined
                  }}
                  {...(isSender
                    ? {
                        src: user?.avatar,
                        alt: user?.firstName + ' ' + user?.lastName
                      }
                    : {})}
                >
                  {getInitials(chat.title)}
                </CustomAvatar>
              </div>

              <Box className='chat-body' sx={{ maxWidth: ['calc(100% - 5.75rem)', '75%', '65%'] }}>
                {item.messages.map((chat: ChatLogChatType, index: number) => {
                  return (
                    <Box key={index} sx={{ '&:not(:last-of-type)': { mb: 3.5 } }}>
                      <div>
                        <Typography
                          sx={{
                            boxShadow: 1,
                            borderRadius: 1,
                            width: 'fit-content',
                            fontSize: '0.875rem',
                            p: theme => theme.spacing(3, 4),
                            ml: isSender ? 'auto' : undefined,
                            borderTopLeftRadius: !isSender ? 0 : undefined,
                            borderTopRightRadius: isSender ? 0 : undefined,
                            color: isSender ? 'common.white' : 'text.primary',
                            backgroundColor: isSender ? 'primary.main' : 'background.paper'
                          }}
                        >
                          {isSender ? chat.msg : <ReactMarkdown >{chat.msg}</ReactMarkdown>}
                        </Typography>
                      </div>
                    </Box>
                  )
                })}
              </Box>
            </Box>
          )
        })}
        {aiStatus === 'pending' && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              mb: 4
            }}
          >
            <div>
              <CustomAvatar
                skin='light'
                sx={{
                  width: '2rem',
                  height: '2rem',
                  fontSize: '0.875rem',
                  ml: 3.5,
                  mr: undefined
                }}
              >
                {getInitials(chat.title)}
              </CustomAvatar>
            </div>

            <Box className='chat-body' sx={{ maxWidth: ['calc(100% - 5.75rem)', '75%', '65%'] }}>
              <Box sx={{ '&:not(:last-of-type)': { mb: 3.5 } }}>
                <div>
                  <Box
                    mb={2}
                    sx={{
                      p: 1,
                      backgroundColor: 'grey.100',
                      mr: 'auto',
                      maxWidth: '320px'
                    }}
                  >
                    <Lottie
                      animationData={dotAnimation}
                      style={{
                        flex: 1
                      }}
                    />
                  </Box>
                </div>
              </Box>
            </Box>
          </Box>
        )}
      </>
    )
  }

  const ScrollWrapper = ({ children }: { children: ReactNode }) => {
    if (hidden) {
      return (
        <Box ref={chatArea} sx={{ p: 5, height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
          {children}
        </Box>
      )
    } else {
      return (
        <PerfectScrollbar ref={chatArea} options={{ wheelPropagation: false }}>
          {children}
        </PerfectScrollbar>
      )
    }
  }

  return (
    <Box sx={{ height: 'calc(100% - 8.4375rem)' }}>
      <ScrollWrapper>{renderChats()}</ScrollWrapper>
    </Box>
  )
}

export default ChatLog
