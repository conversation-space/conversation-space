import './ThemeSelector.less'

import { useState } from 'react'
import { Card } from 'tdesign-react/esm'
import { classnames } from 'conversation-space/utils'

export interface ThemeSelectorProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
}

export default function (props: ThemeSelectorProps) {
  const { value, defaultValue, onChange } = props
  const [theme, setTheme] = useState(value || defaultValue || 'light')
  function changeTheme(theme: string) {
    setTheme(theme)
    onChange?.(theme)
  }
  const themes = [
    {
      key: 'light',
      title: '白色主题',
      Component: <>
        <div
          style={{
            width: 20,
            height: '100%',
            backgroundColor: '#E8E8E8',
          }}
        >
          {[...new Array(4)].map((_, i) => <div key={i} style={{
            margin: '0 auto',
            marginTop: 4,
            width: 12,
            height: 4,
            borderRadius: 1,
            border: '1px solid #5D5D5D'
          }}></div>)}
        </div>
      </>
    },
    {
      key: 'dark',
      title: '黑色主题',
      Component: <>
        <div
          style={{
            width: 20,
            height: '100%',
            backgroundColor: '#242424',
          }}
        >
          {[...new Array(4)].map((_, i) => <div key={i} style={{
            margin: '0 auto',
            marginTop: 4,
            width: 12,
            height: 4,
            borderRadius: 1,
            border: '1px solid #4B4B4B'
          }}></div>)}
        </div>
        <div style={{
          flexGrow: 1,
          height: '100%',
          backgroundColor: '#181818'
        }}></div>
      </>
    },
    {
      key: 'system',
      title: '跟随系统',
      Component: '跟随系统'
    }
  ]
  return <div className='theme-selector'>
    {themes.map(t => (
      <div
        key={t.key}
        className={classnames(
          'theme',
          t.key === theme ? 'active' : undefined
        )}
        onClick={changeTheme.bind(null, t.key)}
      >
        <Card hoverShadow>
          {t.Component}
        </Card>
        {t.title}
      </div>
    ))}
  </div>
}
