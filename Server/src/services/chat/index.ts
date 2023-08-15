import apiClient from 'src/axios/client'
import { ChatObjWithoutMessages, ChatsObj, SendMsgPayload, SendMsgResponse } from 'src/types/apps/chat'

class ChatService {
  static async getChats() {
    try {
      const response = await apiClient.get<ChatObjWithoutMessages[]>('/chats')

      return response.data
    } catch (err: any) {
      throw err
    }
  }

  static async getChatById(id: string) {
    try {
      const response = await apiClient.get<ChatsObj>(`/chats/${id}`)

      return response.data
    } catch (err: any) {
      throw err
    }
  }

  static async sendMsg(params: SendMsgPayload) {
    try {
      const response = await apiClient.post<SendMsgResponse>('/chats/send-msg', params)

      return response.data
    } catch (err: any) {
      throw err
    }
  }
  static async getAiResponse(chatId: string) {
    try {
      const response = await apiClient.get<SendMsgResponse>('/chats/get-ai-response/' + chatId)

      return response.data
    } catch (err: any) {
      throw err
    }
  }
}

export default ChatService
