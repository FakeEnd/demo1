import React, { Component } from 'react'
import { Menu, Dropdown, Button, Card, Input, Table, message } from 'antd';
import { search } from '../../requests'
import './index.less'
const { Search } = Input;

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
  },
];


export default class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      prop: '课程号查询',
      list: []
    }
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
          this.setState({ list: newlist })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  render() {
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
            size="small"
            dataSource={this.state.list} columns={columns}
            pagination={{
              total: this.state.list.length,
              pageSize: 6
            }}
          />
        </Card>
      </>
    )
  }
}
