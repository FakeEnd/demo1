import React, { Component } from 'react'
import { Typography, Modal, Form, message, Menu, Dropdown, Button, Card, Input, Table } from 'antd';
import { search, deletecourse, update } from '../../requests'
import './index.less'
const { Search } = Input;

const ButtonGroup = Button.Group
const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 16
  }
}

@Form.create()

class Searchpage extends Component {
  constructor() {
    super()
    this.state = {
      prop: '课程号查询',
      list: [],
      value: '',

      deleteCourseTitle: '',
      deleteCourseID: '',
      deleteCourseIndex: '',
      isShowDeleteModal: false,

      isShowEditModal: false,
      courseIndexmessage: '',
      courseIdmessage: '',
      courseNamemessage: '',
      additionmessage: ''
    }
  }
  showDeleteCourseModal = (record) => {
    this.setState({
      isShowDeleteModal: true,
      deleteCourseIndex: record.courseIndex.toString(),
      deleteCourseID: record.courseId,
      deleteCourseTitle: record.addition
    })
  }

  deleteCourse = (e) => {
    deletecourse({ courseId: this.state.deleteCourseID, courseIndex: this.state.deleteCourseIndex })
      .then((resp) => {
        if (resp.data.data !== "请登录后重试") {
          message.success(resp.data.message, 2)
          this.Search(this.state.value)
        }
        this.setState({
          isShowDeleteModal: false,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  hideDeleteModal = () => {
    this.setState({
      isShowDeleteModal: false,
    })
  }
  toEdit = (record) => {
    this.props.form.setFieldsValue({
      courseName: record.courseName,
      addition: record.addition
    })
    this.setState({
      isShowEditModal: true,
      courseIndexmessage: record.courseIndex,
      courseIdmessage: record.courseId,
      courseNamemessage: record.courseName,
      additionmessage: record.addition
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          isLoading: true
        })
        let data = {
          ...values,
          courseId: this.state.courseIdmessage,
          courseIndex: this.state.courseIndexmessage.toString(),
        }
        update(data)
          .then((resp) => {
            if (resp.data.data !== "请登录后重试") {
              message.success(resp.data.message, 2)
              this.Search(this.state.value)
            }
            this.setState({
              isShowEditModal: false,
            })
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
  hideEditModal = () => {
    this.setState({
      isShowEditModal: false,
      EditTitle: '',
      EditConfirmLoading: false
    })
  }

  Search = (value) => {
    let prop = this.state.prop === '课程号查询' ? 'id' : 'name'

    search(prop, value)
      .then((resp) => {
        if (resp.data.data !== "请登录后重试") {
          message.success('查询成功', 0.5);
          let newlist = resp.data.data.map((item, index) => {
            return {
              ...item,
              key: index
            }
          })
          this.setState({ list: newlist, value: value })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  render() {
    const {
      getFieldDecorator
    } = this.props.form

    const columns = [
      {
        title: '课程号',
        dataIndex: 'courseId',
        key: 'courseId',
      },
      {
        title: '课序号',
        dataIndex: 'courseIndex',
        key: 'courseIndex',
      },
      {
        title: '课程名称',
        dataIndex: 'courseName',
        key: 'courseName',
      }, {
        title: '附加信息',
        dataIndex: 'addition',
        key: 'addition',
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          return (
            <ButtonGroup>
              <Button size="small" type="primary" onClick={this.toEdit.bind(this, record)} >编辑</Button>
              <Button size="small" type="danger" onClick={this.showDeleteCourseModal.bind(this, record)} >删除</Button>
            </ButtonGroup>
          )
        }
      }
    ];
    const menu = (
      <Menu onClick={({ item }) => this.setState({ prop: item.props.children })}>
        <Menu.Item>
          课程号查询
        </Menu.Item>
        <Menu.Item>
          课程名称查询
        </Menu.Item>
      </Menu>
    );
    return (
      <>
        <Dropdown overlay={menu} placement="bottomCenter">
          <Button>{this.state.prop}</Button>
        </Dropdown>
        <Search
          style={{ margin: "15px 0px 0px" }}
          placeholder="课程号或者课程名称"
          enterButton="Search"
          size="default"
          onSearch={value => this.Search(value)}
        />
        <Card
          title="搜索结果"
          bordered={false}
        //style={{ margin: '0px'  }}
        >
          <Table
            tableLayout='fixed'
            size="small"
            dataSource={this.state.list} columns={columns}
            pagination={{
              total: this.state.list.length,
              pageSize: 6
            }}
          />
        </Card>
        <Modal
          title={`删除课程号${this.state.deleteCourseID}的该条附加信息`}
          visible={this.state.isShowDeleteModal}
          onCancel={this.hideDeleteModal}
          onOk={this.deleteCourse}
          okText='确认删除'
          cancelText='取消'
        >
          <Typography>
            确定要删除<span style={{ color: '#f00' }}>{this.state.deleteCourseTitle}</span>这条附加信息吗？
                    </Typography>
        </Modal>
        <Modal
          title={`更新课程号${this.state.courseIdmessage}的附加信息`}
          visible={this.state.isShowEditModal}
          onCancel={this.hideEditModal}
          onOk={this.handleSubmit}
          okText='确认更新'
          cancelText='取消'
        >
          <Form
            onSubmit={this.handleSubmit}
            {...formItemLayout}
          >
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
                <Input />,
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
                <Input />,
              )}
            </Form.Item>
          </Form>
        </Modal>
      </>
    )
  }
}
export default Searchpage