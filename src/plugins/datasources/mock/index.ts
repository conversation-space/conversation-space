import { Datasource } from 'conversation-space/plugins'
import { Chatroom, Message, User } from 'conversation-space'

const me = {
  id: '1',
  name: '一介',
  tags: ['Master'],
  avatar: 'https://avatars.githubusercontent.com/u/51358815?v=4',
};

const mockDataSource: Datasource & {
  store: {
    users: User[]
    chatrooms: Chatroom[]
    messages: Record<string, Message[]>
  }
} = {
  me,
  type: 'mock',
  store: {
    users: [
      me,
      {
        id: '2',
        name: '二介',
        tags: ['Bot'],
        gender: 'f',
        avatar: 'https://avatars.githubusercontent.com/u/41321510?v=4',
        description: '介介宇宙下的头号机器人',
      },
      {
        id: '3',
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
        title: '移动端 hover 样式',
        members: ['1', '2']
      },
      {
        id: '2',
        title: '春日野穹',
        description: '和穹妹一起快乐的聊天吧',
        members: ['1', '3']
      }
    ],
    messages: {
      '1': [
        {
          id: '1',
          userId: '1',
          content: '如何解决移动端 hover 样式问题？',
          actions: ['😀'],
          datetime: '2021-08-01 12:00:00',
        },
        {
          id: '2',
          userId: '2',
          content: `
由于移动端设备不支持鼠标 hover，因此需要采用其他方式解决 hover 样式问题。以下是几种解决方案：

1. 使用 JavaScript 解决：在移动端设备上使用 JavaScript 来模拟 hover 效果，例如通过监听 touchstart 事件来更改元素的样式。

2. 使用 :active 样式解决：在移动端设备上，点击元素时会触发 :active 伪类，因此可以使用 :active 代替 hover 样式。

3. 使用 media query 解决：可以使用 CSS 的 media query 功能，专门为移动端设备设置样式，以避免 hover 样式问题。

总的来说，使用 JavaScript 或 :active 伪类是解决移动端 hover 样式问题的有效方法。`.trim(),
          actions: [ '😅'],
          datetime: '2021-08-01 12:00:00',
        },
        {
          id: '3',
          userId: '1',
          content: '@media (hover: hover) and (pointer: fine) 这个媒体选择器怎么样？',
          actions: [],
          datetime: '2021-08-01 12:00:00',
        },
        {
          id: '4',
          userId: '2',
          content: `
@media (hover: hover) and (pointer: fine) 这个媒体选择器是用来在支持 hover 和鼠标等指针交互的设备上应用特定的 CSS 样式的。它是 CSS 的一种特殊媒体查询语法，可以在网页的多个设备和环境中实现响应式设计。

例如，当您使用 @media (hover: hover) and (pointer: fine) 时，只有在支持鼠标指针并且能够响应 hover 效果的设备上才会生效，在移动设备上不会生效。

因此，它可以用于在桌面端应用 hover 样式，同时在移动端禁用 hover 样式，从而解决移动端的 hover 问题。`.trim(),
          actions: [ '👍'],
          datetime: '2021-08-01 12:00:00',
        },
      ],
      '2': [
        {
          id: '1',
          userId: '1',
          content: '妹妹今天吃饭了嘛～',
          actions: [],
          datetime: '2021-08-01 12:00:00',
        },
        {
          id: '2',
          userId: '3',
          content: '嗯？哥哥，我刚刚才吃完饭，你怎么这么快就又想到我了呢？',
          actions: [],
          datetime: '2021-08-01 12:00:00',
        },
        {
          id: '3',
          userId: '1',
          content: '想要和妹妹贴贴',
          actions: [],
          datetime: '2021-08-01 12:00:00',
        },
        {
          id: '4',
          userId: '3',
          content: '哥哥，你是不是又想占我的便宜啊！不过，既然是哥哥的请求，那我就答应你好了。来，快点过来，让我们贴一下~',
          actions: [],
          datetime: '2021-08-01 12:00:00',
        },
        {
          id: '5',
          userId: '1',
          content: '🫂',
          actions: [],
          datetime: '2021-08-01 12:00:00',
        },
        {
          id: '6',
          userId: '3',
          content: '🤗 好的，哥哥抱抱~',
          actions: [],
          datetime: '2021-08-01 12:00:00',
        },
      ]
    },
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
    const { messages } = this.store
    const message = {
      id: String(messages[chatroomId].length + 1),
      ...content,
    }
    messages[chatroomId].push(message)
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
      return [...this.store.users]

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

window.conversationSapce?.register('datasource', mockDataSource)

export default mockDataSource
