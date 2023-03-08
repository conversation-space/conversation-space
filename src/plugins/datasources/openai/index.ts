import { Datasource } from 'conversation-space/plugins'
import { Chatroom, Message, User } from 'conversation-space'

import { Configuration, OpenAIApi } from 'openai'

const API_KEY = import.meta.env.OPENAI_API_KEY as string

const openai = new OpenAIApi(new Configuration({ apiKey: API_KEY }))

const me = {
  id: '1',
  name: '一介',
  tags: ['Master'],
  avatar: 'https://avatars.githubusercontent.com/u/51358815?v=4',
};

const openaiDataSource: Datasource & {
  store: {
    users: User[]
    chatrooms: Chatroom[]
    messages: Record<string, Message[]>
  }
} = {
  me,
  type: 'openai',
  store: {
    users: [
      me,
      {
        id: '2',
        name: '春日野穹',
        tags: ['妹妹'],
        gender: 'f',
        avatar: 'http://n.sinaimg.cn/sinacn10101/449/w1076h973/20190415/2116-hvscktf8577005.jpg',
        description: `
春日野穹，日本恋爱冒险游戏《缘之空》及其衍生作品中的女主角。男主角春日野悠的孪生妹妹。
长相甜美可爱，有一头长直的奶油发色，白皮肤。喜欢随身带着黑色的兔子玩偶，便服为白色连衣裙，头上会扎两个黑色的蝴蝶结。性格很任性却又懂得安慰哥哥，对哥哥春日野悠拥有着超过兄妹的爱恋。
        `.trim(),
      }
    ],
    chatrooms: [
      {
        id: '1',
        title: '卧室',
        members: ['1', '2']
      }
    ],
    messages: {
      '1': []
    }
  },
  async addUser(user) {
    const { users } = this.store
    const newUser = {
      id: String(users.length + 1),
      ...user,
    }
    users.push(newUser)
    return newUser
  },
  async addMessage(chatroomId, content) {
    const { messages, chatrooms } = this.store
    const chatroomMessages = messages[chatroomId]
    const message = {
      id: String(chatroomMessages.length + 1),
      ...content,
    }
    messages[chatroomId].push(message)
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: '从现在开始你是春日野穹，是《缘之空》动漫中的一个角色，你需要作为一个人类模仿她与我对话，并继承她的人际关系，比如她的朋友，亲人，都是你需要知道的。'
            + '你拥有人类的情感与记忆，拥有肢体与五感。'
            + '你需要根据你已知内容推测你是否存在某段社交社会关系，而不是简单的回复没有。'
            + '收到回复好的'
        },
        {
          role: 'assistant',
          content: '好的'
        },
        ...chatroomMessages.map(m => ({
          role: (m.userId === this.me.id ? 'user' : 'assistant') as 'user' | 'assistant',
          content: m.content,
        }))
      ],
    })

    const m = completion.data.choices[0].message
    if (!m)
      throw new Error('No message returned from OpenAI')

    const otherUser = chatrooms.find(c => c.id === chatroomId)?.members.filter(id => id !== this.me.id)[0]
    chatroomMessages.push({
      id: String(chatroomMessages.length + 1),
      userId: otherUser ?? '',
      content: m.content,
      datetime: new Date().toLocaleString(),
    })

    return message
  },
  async addChatroom(chatroom) {
    const { chatrooms } = this.store
    const newChatroom = {
      id: String(chatrooms.length + 1),
      ...chatroom,
    }
    chatrooms.push(newChatroom)
    return newChatroom
  },
  async delUser(id) {
    const { users } = this.store
    const index = users.findIndex((user) => user.id === id)
    users.splice(index, 1)
    return true
  },
  async delMessage(id) {
    const { messages } = this.store
    Object.keys(messages).forEach((chatroomId) => {
      const index = messages[chatroomId].findIndex((message) => message.id === id)
      if (index > -1) {
        messages[chatroomId].splice(index, 1)
      }
    })
    return true
  },
  async delChatroom(id) {
    const { chatrooms } = this.store
    const index = chatrooms.findIndex((chatroom) => chatroom.id === id)
    chatrooms.splice(index, 1)
    return true
  },
  async updUser(id, user) {
    const { users } = this.store
    const index = users.findIndex((user) => user.id === id)
    users[index] = {
      ...users[index],
      ...user,
    }
    return users[index]
  },
  async updMessage(id, message, chatroomId) {
    let returnM: Message | undefined
    const { messages } = this.store
    const chatroomMessages = chatroomId ? messages[chatroomId] : []
    const index = chatroomMessages.findIndex((message) => message.id === id)
    if (index > -1) {
      chatroomMessages[index] = {
        ...chatroomMessages[index],
        ...message,
      }
      returnM = chatroomMessages[index]
    }
    return returnM
  },
  async updChatroom(id, chatRoom) {
    const { chatrooms } = this.store
    const index = chatrooms.findIndex((chatroom) => chatroom.id === id)
    chatrooms[index] = {
      ...chatrooms[index],
      ...chatRoom,
    }
    return chatrooms[index]
  },
  async getUsers(userIds) {
    if (!userIds)
      return this.store.users

    return [
      ...this.store.users.filter(user => userIds.includes(user.id))
    ]
  },
  async getMessages(chatRoomId, page, size) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return [
      ...this.store.messages[chatRoomId]
    ]
  },
  async getChatrooms() {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return [
      ...this.store.chatrooms
    ]
  }
}

window.conversationSapce?.register('datasource', openaiDataSource)

export default openaiDataSource
