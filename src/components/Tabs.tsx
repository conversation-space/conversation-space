import './Tabs.less'

import { Children, ReactNode, useState } from 'react'
import { classnames } from 'conversation-space/utils'
import { AnimatePresence, motion } from 'framer-motion'

export interface TabsProps {
  tabs?: ReactNode[]
  active?: number
  defaultActive?: number
  children?: ReactNode
}

export default function (props: TabsProps) {
  const [active, setActive] = useState(props.active || props.defaultActive || 0)
  const children = Children.map(props.children, child => child)
  const activeChild = children?.[active]
  return <>
    <div className='tabs'>
      {props.tabs?.map((t, i) => (
        <div className={classnames(
          'tab',
          i === active ? 'active' : undefined
        )} onClick={() => setActive(i)}>{t}</div>
      ))}
    </div>
    <AnimatePresence mode='wait'>
      <motion.div
        key={`${active}`}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className='tabs-content'
      >
        {activeChild}
      </motion.div>
    </AnimatePresence>
  </>
}
