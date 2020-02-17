import React, { Component } from 'react'
import { Card, Table, Spin } from 'antd';
import { all } from '../../requests'

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
export default class All extends Component {
    constructor() {
        super()
        this.state = {
            list: [],
            isLoading: true
        }
    }
    componentDidMount(){
        all()
        .then((resp)=>{
            if (resp.data.data !== "请登录后重试") {
                let newlist = resp.data.data.list.map((item,index)=>{
                    return{
                        ...item,
                        key:index
                    }
                })
                this.setState({list:newlist})
            }         
        })
        .catch((err)=>{
            console.log(err)
        })
        .finally(()=>{
            this.setState({isLoading:false})
        })       
    }
    
    render() {
        return (
            <div>
                <Card
                    title="课程列表"
                    bordered={false}
                //style={{ margin: '0px'  }}
                >
                    <Spin spinning={this.state.isLoading}>
                    <Table
                        size="small"
                        dataSource={this.state.list} columns={columns}
                        pagination={{
                            total: this.state.list.length,
                            pageSize: 6
                        }}
                    />
                    </Spin>
                </Card>
            </div>
        )
    }
}
