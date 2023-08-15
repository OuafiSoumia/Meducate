// ** Types
import { Dispatch } from 'redux'

export type ChatsObj = {
  _id: string | null
  messages: MessageType[]
  lastMessage?: MessageType
  title: string
  description?: string
}

export type ChatObjWithoutMessages = {
  id: string
  title: string
  description?: string
  lastMessage?: MessageType
}

export type SelectedChatType = null | ChatsObj

export type ChatStoreType = {
  chats: ChatObjWithoutMessages[] | null
  selectedChat: ChatsObj | null
}

export type SendMsgPayload = {
  chatId: string | null
  message: string
}

export type SendMsgResponse = {
  id: string
  message: string
  status: number
}

export type ChatContentType = {
  hidden: boolean
  mdAbove: boolean
  store: ChatStoreType
  sidebarWidth: number
  dispatch: Dispatch<any>
  handleLeftSidebarToggle: () => void
  getInitials: (val: string) => string
  sendMsg: (params: SendMsgPayload) => void
  handleUserProfileRightSidebarToggle: () => void
}

export type ChatSidebarLeftType = {
  hidden: boolean
  mdAbove: boolean
  store: ChatStoreType
  sidebarWidth: number
  dispatch: Dispatch<any>
  leftSidebarOpen: boolean
  userProfileLeftOpen: boolean
  removeSelectedChat: () => void
  selectChat: (id: string) => void
  handleLeftSidebarToggle: () => void
  getInitials: (val: string) => string
  handleUserProfileLeftSidebarToggle: () => void
  formatDateToMonthShort: (value: string, toTimeForCurrentDay: boolean) => void
}

export type SendMsgComponentType = {
  store: ChatStoreType
  dispatch: Dispatch<any>
  sendMsg: (params: SendMsgPayload) => void
}

export type ChatLogType = {
  hidden: boolean
  chat: ChatsObj
}

export type MessageType = {
  time: string | Date
  message: string
  senderId: string
}

export type ChatLogChatType = {
  msg: string
  time: string | Date
}

export type FormattedChatsType = {
  senderId: string
  messages: ChatLogChatType[]
}

export type MessageGroupType = {
  senderId: string
  messages: ChatLogChatType[]
}
