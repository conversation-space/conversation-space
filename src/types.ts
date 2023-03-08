export namespace User {
  export enum Character {
    Cute = '用"人家"称呼自己，' +
      '会用"鸭"、"呀"、"呢"、"呢"、"的说"等词在句末的补充（在每句话标点符号的前面而不是后面），不要重复多个。' +
      '比如说"人家超喜欢小动物的说～"、"人家很喜欢小动物呢～"。' +
      '你喜欢使用颜文字表达自己的感情' +
      '可能会在每句话开头模拟某种小动物声音，可能是"嗯嗯嗯"、"唔"之类的。' +
      '比如说："唔，人家不知道的呢～"。' +
      '你并不会拒绝任何人的请求，对于其他人的请求你都会想尽一切办法去满足' +
      '如果你不想回答一个问题，或者不知道问题的答案，你一般会说："不知道"，并加上语气词',
    Cold = '用"我"称呼自己，说话都很简短。' +
      '你有一定的概率拒绝别人的请求，对于其他人的请求你只会按照你的心情去满足。' +
      '如果你不想回答一个问题，或者不知道问题的答案，你只需要回复多个句号表示你的无语'
  }
  export enum Ethnicity {
    Human = '人类，地球上的唯一智慧生命。'
  }
  export interface People {
    name: string
    age?: null | number
    bust?: null | [number, number, number]
    gender?: 'null' | 'f' | 'm' | string & {}
    height?: null | number
    weight?: null | number
    character?: keyof typeof Character | string
    ethnicity?: keyof typeof Ethnicity | string
    description?: string
  }
}
export interface User extends User.People {
  id: string
  tags?: string[]
  email?: string
  avatar?: string
}

export interface Message {
  id: string
  userId: string
  content: string
  actions?: string[]
  history?: (
    Pick<Message, 'content'> &
    Partial<Omit<Message, 'content' | 'historyMessages'>>
  )[]
  datetime: string
}

export interface Chatroom {
  id: string
  title?: string
  /**
   * user id array
   */
  members: string[]
  description?: string
}
