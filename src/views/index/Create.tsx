import './Create.less'
import { Button, Card, Form, Input, Select, Space } from 'tdesign-react/esm'
import useSwr from 'swr'
import { useContext } from 'react'
import { datasourceContext } from 'conversation-space/contexts/datasource'
import UserCard from 'conversation-space/components/UserCard'

export interface CreateProps {}

export default function (props: CreateProps) {
  const [form] = Form.useForm()
  const datasourceIndex = Form.useWatch('datasource', form)
  const datasourceCtx = useContext(datasourceContext)
  const { data: users } = useSwr(['getDatasource', datasourceIndex, 'users'], () => {
    return datasourceCtx?.datasources[datasourceIndex].getUsers()
  })

  return <div className='create'>
    <Card title='新建聊天室'>
      <Form form={form}>
        <Form.FormItem
          label='选择数据源'
          name='datasource'
        >
          <Select
            options={
              datasourceCtx?.datasources.map(({ type }, index) => ({
                label: type,
                value: index
              }))
            }
          />
        </Form.FormItem>
        <Form.FormItem
          label='聊天室名称'
          name='title'
        >
          <Input/>
        </Form.FormItem>
        <Form.FormItem
          label='选择用户'
          name='title'
        >
          <Select multiple
                  popupProps={{ overlayClassName: 'create-overlay' }}
                  max={2}
          >
            {(users && users.length > 0)
              ? users.map(user => (<Select.Option className='select-users-option'
                                                   key={user.id}
                                                   label={user.name}
                                                   value={user.id}>
                <UserCard
                  user={user}
                  onlyHeader
                />
              </Select.Option>))
              : <div className='empty'>
                暂无数据，请先创建用户或选择数据源
              </div>}
          </Select>
        </Form.FormItem>
        <Form.FormItem style={{ marginLeft: 100 }}>
          <Space>
            <Button type="submit" theme="primary">
              提交
            </Button>
          </Space>
        </Form.FormItem>
      </Form>
    </Card>
  </div>
}
