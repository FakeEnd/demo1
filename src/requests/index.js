import axios from 'axios'
import qs from 'qs'
import { message } from 'antd'

//const token = window.sessionStorage.getItem('Token') 
const service = axios.create({
  baseURL: 'https://sduonline.cn/isduapi/api',
  //不清楚，如果header加此处则会第一次请求的token会失效,似乎是异步的问题放弃了。。。(我好菜)
  //headers: { 'Token': window.sessionStorage.getItem('Token') }
})

service.interceptors.response.use((resp) => {
  if (resp.data.data === "请登录后重试") {
    message.error('请登录后重试', 5)    
  } 
  return resp
})

export const update = (data) => {
  let pa = qs.stringify(data);
  return service.post('/edu/course_addition/update',
    pa,
    {
      headers: { 'Token': window.sessionStorage.getItem('Token') }
    }
  )
}

export const search = (prop, key) => {
  return service.get('/edu/course_addition/search', {
    params: {
      prop,
      key,
    },
    headers: { 'Token': window.sessionStorage.getItem('Token') }
  })
}

export const all = () => {
  return service.get('/edu/course_addition',{
    headers: { 'Token': window.sessionStorage.getItem('Token') }
  })
}
