import './App.less'
import 'tdesign-react/esm/style/index.js'

import useSwr from 'swr'
import { useContext, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { datasourceContext } from 'conversation-space/contexts/datasource'

import About from './views/About'
import Create from './views/index/Create'
import Chatroom from './views/index/Chatroom'
import Setting from './views/setting'
import TouchBar from './components/TouchBar'
import Loading from './components/Loading'
import { historyContext } from './hooks/history'

export default function App() {
  const datasourceCtx = useContext(datasourceContext)
  if (!datasourceCtx)
    throw new Error('Datasource context not found')

  const [index, setIndex] = useState(0)
  const { data: chatrooms = [], isLoading, error } = useSwr('chatrooms', datasourceCtx.getChatrooms)

  const chatroom = chatrooms[index]

  const [path, setPath] = useState('/chatrooms')

  const menu = useMemo(() => [
    {
      name: 'About',
      path: '/about',
      Component: About,
    },
    {
      name: 'Create Chatroom',
      path: '/create-chatroom',
      Component: Create,
    },
    {
      name: 'Chatroom',
      path: '/chatrooms',
      Component: () => {
        if (isLoading)
          return <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}>
            <Loading />
          </div>

        return <Chatroom {...chatroom} />
      },
    },
    {
      name: 'Setting',
      path: '/settings',
      Component: Setting
    }
  ], [chatroom])

  const DisplayComp = useMemo(() => {
    const { Component } = menu.find(item => path.startsWith(item.path)) || {
      Component: () => <div>Not Found</div>
    }
    return Component
  }, [menu, path])

  return <div className='app'>
    <historyContext.Provider value={{ path, goto: setPath }}>
      <TouchBar
        style={{
          minWidth: 250,
        }}
        isLoading={isLoading}
        chatrooms={chatrooms}
        index={index}
        onSelect={setIndex}
      />

      <AnimatePresence mode='wait'>
        <motion.div
          key={path}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className='tabs-content'
        >
          <DisplayComp />
        </motion.div>
      </AnimatePresence>
    </historyContext.Provider>
  </div>
}
