/// <reference types="vite/client" />

export declare global {
  import { Plugin, Datasource } from './plugins'
  interface ConversationSapce {
    readonly plugins: Plugin[]
    readonly datasources: Datasource[]
    register(type: 'plugin' | 'datasource', target: Plugin | Datasource): void
  }
  interface Window {
    conversationSapce: ConversationSapce
  }
}

declare module 'tdesign-react/esm' {
  import { Ref, ReactElement, JSXElementConstructor } from 'react'
  import { SwitchValue, TNode } from 'tdesign-react/esm'
  export interface SwitchProps<T extends SwitchValue> {
    customValue?: Array<T>;
    label?: Array<string | TNode> | TNode<{
      value: T;
    }>;
    value?: T;
    defaultValue?: T;
    onChange?: (value: T) => void;
  }
  export declare const Switch: <T extends SwitchValuea = SwitchValue>(props: SwitchProps<T> & {
    ref?: Ref<HTMLButtonElement>;
  }) => ReactElement<any, string | JSXElementConstructor<any>>;
}
