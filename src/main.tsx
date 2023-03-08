import { renderConversationSpace } from './index'
import mock from 'conversation-space/plugins/datasources/mock'
import openai from 'conversation-space/plugins/datasources/openai'

renderConversationSpace('root', {
  datasources: [openai]
})
