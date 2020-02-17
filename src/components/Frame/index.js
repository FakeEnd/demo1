import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { withRouter } from 'react-router-dom'
import { adminRoutes } from '../../routes'

const { Header, Content } = Layout

@withRouter

class Frame extends Component {

  onMenuClick = ({ key }) => {
    this.props.history.push(key)
  }

  render() {
    return (
      <Layout className="layout" style={{ minHeight: '100%',height: '40px' }}>
        <Header style={{ height: '45px' }}>
          <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[this.props.location.pathname]}
              style={{ lineHeight: '45px'}}
              onClick={this.onMenuClick}
            >
              {
                adminRoutes.map(item => {
                  return (
                    <Menu.Item key={item.pathname}>
                      <Icon type={item.icon} />
                      {item.title}
                    </Menu.Item>
                  )
                })
              }
            </Menu>
        </Header>
        <Content style={{ padding: '0px 20px',margin:'20px 20px 0px',height: '100%' }}>
          <div style={{ background: '#fff', padding:"20px 10px",height: '100%' }}>{this.props.children}</div>
        </Content>
      </Layout>
    )
  }
}
export default Frame
