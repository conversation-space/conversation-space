import { Chatroom, Message, User } from 'conversation-space'

export interface Plugin {
}

export interface DatasourceFetcher {
  addUser: (user: Omit<User, 'id'>) => void
  addMessage: (chatroomId: string, message: Omit<Message, 'id'>) => void
  addChatroom: (chatroom: Omit<Chatroom, 'id'>) => void
  delUser: (id: string) => void
  delMessage: (id: string) => void
  delChatroom: (id: string) => void
  updUser: (id: string, user: Partial<User>) => Promise<User | void>
  updMessage: (id: string, message: Partial<Message>, chatroomId?: string) => Promise<Message | void>
  updChatroom: (id: string, chatRoom: Partial<Chatroom>) => Promise<Chatroom | void>
  getUsers: (userIds?: string[]) => Promise<User[]>
  getMessages: (chatRoomId: string, page: number, size: number) => Promise<Message[]>
  getChatrooms: () => Promise<Chatroom[]>
}

export interface Datasource extends DatasourceFetcher {
  type: string
  me: User
}

export interface DSChatroom extends Chatroom {
  type: string
  dsIndex: number
}
