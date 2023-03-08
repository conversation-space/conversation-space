import { User } from 'conversation-space'
import { Form, Input, TagInput, Select, Textarea, InputNumber } from 'tdesign-react/esm'
import { InputNumberProps } from 'tdesign-react'

export interface UserConfigurationProps {
  user: User
}

type InputNumberConfigure = Omit<InputNumberProps, 'value' | 'onChange'>

export function NumberArrayInput(props: {
  inline?: boolean
  value?: number[]
  onChange?: (value: number[]) => void
  configures: (null | InputNumberConfigure)[]
} & InputNumberConfigure) {
  const {
    inline = false,
    value,
    onChange,
    configures,
    ...inputNumberProps
  } = props
  return <div style={{
    display: inline ? 'inline-flex' : 'flex',
    flexDirection: inline ? 'row' : 'column',
    gap: 10,
  }}>
    {configures.map((configure, index) => <InputNumber
      key={index}
      {...Object.assign(inputNumberProps, configure ?? {})}
    />)}
  </div>
}

export default function ({
  user
}: UserConfigurationProps) {
  return <Form
    labelAlign='right'
    labelWidth='100px'
    layout='vertical'
    resetType='empty'
    showErrorMessage
    preventSubmitDefault
  >
    <Form.FormItem
      initialData={user.name}
      label='名称'
      name='name'
    >
      <Input
        type='text'
        align='left'
        placeholder='请输入内容'
      />
    </Form.FormItem>
    <Form.FormItem
      initialData={user.gender}
      label='性别'
      name='gender'
    >
      <Select
        options={[
          {
            label: '不能说的秘密',
            value: 'null'
          },
          {
            label: '男',
            value: 'm'
          },
          {
            label: '女',
            value: 'f'
          }
        ]}
        popupProps={{
          zIndex: 6100
        }}
      />
    </Form.FormItem>
    <Form.FormItem
      initialData={user.tags}
      label='标签'
      name='tags'
    >
      <TagInput
        clearable
        placeholder='请输入标签'
      />
    </Form.FormItem>
    <Form.FormItem
      initialData={user.bust}
      label='三维'
      name='bust'
    >
      <NumberArrayInput
        configures={[{
          placeholder: '胸围'
        }, {
          placeholder: '腰围'
        }, {
          placeholder: '臀围'
        }]}
        style={{
          width: '100%'
        }}
      />
    </Form.FormItem>
    <Form.FormItem
      initialData={user.height}
      label='身高'
      name='height'
    >
      <InputNumber
        placeholder='请输入身高(单位 cm)'
        style={{ width: '100%' }}
      />
    </Form.FormItem>
    <Form.FormItem
      initialData={user.weight}
      label='体重'
      name='weight'
    >
      <InputNumber
        placeholder='请输入体重(单位 kg)'
        style={{ width: '100%' }}
      />
    </Form.FormItem>
    <Form.FormItem
      initialData={user.description}
      label='介绍'
      name='description'
    >
      <Textarea
        placeholder='请输入介绍'
        autosize={{
          maxRows: 5,
          minRows: 1,
        }}
      />
    </Form.FormItem>
  </Form>
}
