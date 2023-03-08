import './index.less'

import { InputNumber, InputAdornment } from 'tdesign-react/esm'
import DatasourceCard from 'conversation-space/views/setting/DatasourceCard'
import FormCard from 'conversation-space/components/FormCard'
import Tabs from 'conversation-space/components/Tabs'
import { FormCardItem } from 'conversation-space/components/FormCard/FormCardItem'
import ThemeSelector from 'conversation-space/components/ThemeSelector'

export interface SettingProps {}

export default function (props: SettingProps) {
  return <div className='setting-page'>
    <Tabs
      tabs={[
        <><span className='material-icons'>settings</span>通用</>,
        <><span className='material-icons'>analytics</span>数据源</>,
        <><span className='material-icons'>extension</span>插件</>,
      ]}
    >
      <>
        <h2>个性化</h2>
        <FormCard>
          <FormCardItem uKey='theme'>
            <ThemeSelector />
          </FormCardItem>
          <FormCardItem uKey='font-size'
                        label='字体大小'>
            <InputAdornment append='px'>
              <InputNumber
                defaultValue={14}
              />
            </InputAdornment>
          </FormCardItem>
        </FormCard>
      </>
      <DatasourceCard
        type='mock'
        me={{ id: '1', name: '1' }}
        style={{
          marginTop: 20,
        }}
      />
      <div style={{
        width: '100%',
        height: '300px',
        textAlign: 'center',
        lineHeight: '300px',
        fontSize: 20
      }}>
        🏗Building...
      </div>
    </Tabs>
  </div>
}
