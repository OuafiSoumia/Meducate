// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import ChatService from 'src/services/chat'
import { ChatObjWithoutMessages, SendMsgPayload } from 'src/types/apps/chat'

import { ChatsObj } from 'src/types/apps/chat'

const newChat: ChatsObj = {
  _id: null,
  title: 'new chat',
  messages: []
}

// ** Fetch Chats & Contacts
export const fetchChatsContacts = createAsyncThunk('appChat/fetchChatsContacts', async () => {
  try {
    const response = await ChatService.getChats()

    return { chats: response }
  } catch (err: any) {
    throw err
  }
})

// ** Select Chat
export const selectChat = createAsyncThunk('appChat/selectChat', async (id: string) => {
  try {
    const response = await ChatService.getChatById(id)

    return response
  } catch (err: any) {
    throw err
  }
})

export const getAiResponse = createAsyncThunk('appChat/getAiResponse', async (chatId: string, { dispatch }) => {
  try {
    const response = await ChatService.getAiResponse(chatId).then(res => {
      dispatch(selectChat(res.id))

      return res
    })

    return response
  } catch (err: any) {
    throw err
  }
})

// ** Send Msg
export const sendMsg = createAsyncThunk('appChat/sendMsg', async (obj: SendMsgPayload, { dispatch }) => {
  try {
    const response = await ChatService.sendMsg(obj).then(res => {
      dispatch(selectChat(res.id))
      dispatch(fetchChatsContacts())
      dispatch(getAiResponse(res.id))

      return res
    })

    return response
  } catch (err: any) {
    throw err
  }
})

const initialState: State = {
  chats: null,
  selectedChat: null,
  aiStatus: 'idle'
}

type State = {
  chats: ChatObjWithoutMessages[] | null
  selectedChat: ChatsObj | null
  aiStatus: 'idle' | 'pending' | 'success' | 'failed'
}

export const appChatSlice = createSlice({
  name: 'appChat',
  initialState: initialState,
  reducers: {
    removeSelectedChat: state => {
      state.selectedChat = null
    },
    addNewChat: state => {
      // state.chats.push(newChat)
      state.selectedChat = newChat
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchChatsContacts.fulfilled, (state, action) => {
      state.chats = action.payload.chats
    })
    builder.addCase(selectChat.fulfilled, (state, action) => {
      state.selectedChat = action.payload
    })
    builder.addCase(getAiResponse.pending, state => {
      state.aiStatus = 'pending'
    })
    builder.addCase(getAiResponse.fulfilled, state => {
      state.aiStatus = 'success'
    })
    builder.addCase(getAiResponse.rejected, state => {
      state.aiStatus = 'failed'
    })
  }
})

export const { removeSelectedChat, addNewChat } = appChatSlice.actions

export default appChatSlice.reducer
