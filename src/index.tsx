import './index.less'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Plugin, Datasource } from './plugins'
import { createDatasourceContext, datasourceContext } from 'conversation-space/contexts/datasource'
import * as Store from 'conversation-space/plugins/store'

export * from './types'

export function renderConversationSpace(
  elementId: string, {
    store = Store,
    plugins = [] as Plugin[],
    datasources = [] as Datasource[],
  } = {}
) {
  const ele = document.getElementById(elementId)
  if (!ele) {
    throw new Error(`Element with id ${elementId} not found`)
  }
  ReactDOM
    .createRoot(ele)
    .render(
      <React.StrictMode>
        <datasourceContext.Provider value={createDatasourceContext(datasources)}>
          <App />
        </datasourceContext.Provider>
      </React.StrictMode>,
    )
}

export const plugins: Plugin[] = []
export const datasources: Datasource[] = []

window.conversationSapce = {
  get plugins() {
    return plugins
  },
  get datasources() {
    return datasources
  },
  register(type: 'plugin' | 'datasource', target: Plugin | Datasource) {
    if (type === 'plugin') {
      plugins.push(target as Plugin)
    } else {
      datasources.push(target as Datasource)
    }
  }
}

export {}
