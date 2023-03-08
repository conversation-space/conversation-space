import { createContext } from 'react'
import { Message, User } from 'conversation-space'
import { Datasource, DSChatroom } from 'conversation-space/plugins'

export interface DatasourceContext {
  readonly types: string[]
  readonly datasources: Datasource[]
  getChatrooms(): Promise<DSChatroom[]>
  getMessages(dsChatroom: Pick<DSChatroom, 'id' | 'dsIndex'>): Promise<Message[]>
  getChatroomUsers(dsChatroom: Pick<DSChatroom, 'dsIndex'>, userIds: string[]): Promise<User[]>
  send(
    dsChatroom: Pick<DSChatroom, 'id' | 'dsIndex'>,
    content: Message['content'],
  ): void
  // on(type: 'message', dsChatroom: Pick<DSChatroom, 'dsIndex'>): void
}

export const datasourceContext = createContext<DatasourceContext | null>(null)

export function createDatasourceContext(datasources: Datasource[]) {
  return {
    get types() {
      return datasources.map(ds => ds.type)
    },
    get datasources() {
      return datasources
    },
    async send(chatroom, message) {
      const ds = datasources[chatroom.dsIndex]
      if (!ds) {
        throw new Error(`Datasource with type ${chatroom} not found`)
      }
      return ds.addMessage(chatroom.id, {
        userId: ds.me.id,
        content: message,
        datetime: new Date().toISOString(),
      })
    },
    async getChatrooms() {
      const chatroomsArr = await Promise.all(datasources.map(async (ds, index) => {
        const oldData = await ds.getChatrooms()
        return oldData.map(item => ({
          ...item,
          type: ds.type,
          dsIndex: index,
        }))
      }))
      return chatroomsArr.reduce(
        (acc, chatrooms) => acc.concat(...chatrooms),
        []
      )
    },
    async getMessages(chatroom) {
      const datasource = datasources[chatroom.dsIndex]
      return datasource.getMessages(chatroom.id, 0, 9999)
    },
    async getChatroomUsers(chatroom, userIds) {
      const datasource = datasources[chatroom.dsIndex]
      return datasource.getUsers(userIds)
    }
  } as DatasourceContext
}
