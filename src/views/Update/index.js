import React, { Component } from 'react'
import { update } from '../../requests'
import {
  Card,
  Button,
  Form,
  Input,
  Spin,
  message
} from 'antd'

const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 16
  }
}
@Form.create()

class Edit extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: false
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          isLoading: true
        })
        update(values)
          .then((resp) => {
            if (resp.data.data !== "请登录后重试") {
              message.success(resp.data.message)
            }
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            this.setState({ isLoading: false })
          })
      }
    })
  }

  render() {
    const {
      getFieldDecorator
    } = this.props.form
    return (
      <Card
        title="更新课程附加信息"
        bordered={false}
      >
        <Spin spinning={this.state.isLoading}>
          <Form
            onSubmit={this.handleSubmit}
            {...formItemLayout}
          >
            <Form.Item
              label="课程号"
            >

              {getFieldDecorator('courseId', {
                rules: [
                  {
                    required: true,
                    message: '课程号是必填的'
                  }
                ]
              })(
                <Input
                  placeholder="课程号"
                />,
              )}
            </Form.Item>
            <Form.Item
              label="课序号"
            >
              {getFieldDecorator('courseIndex', {
                rules: [
                  {
                    required: true,
                    message: '课序号是必填的'
                  }
                ],
              })(
                <Input
                  placeholder="课序号"
                />,
              )}
            </Form.Item>
            <Form.Item
              label="课程名称"
            >
              {getFieldDecorator('courseName', {
                rules: [
                  {
                    required: true,
                    message: '课程名称是必填的'
                  }
                ],
              })(
                <Input
                  placeholder="课程名称"
                />,
              )}
            </Form.Item>
            <Form.Item
              label="附加信息"
            >
              {getFieldDecorator('addition', {
                rules: [
                  {
                    required: true,
                    message: '附加信息是必填的'
                  }
                ],
              })(
                <Input
                  placeholder="附加信息"
                />,
              )}

              <Button type="primary" htmlType="submit" style={{ margin: '30px 0px' }}>
                确定更新
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    )
  }
}

export default Edit
