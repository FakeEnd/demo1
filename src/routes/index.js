import {
  Search,
  Login,
  NotFound,
  Update,
  All,
} from '../views'

export const mainRoutes = [{
  pathname: '/login',
  component: Login
}, {
  pathname: '/404',
  component: NotFound
}]

export const adminRoutes = [{
  pathname: '/admin/search',
  component: Search,
  title: '搜索课程附加信息',
  icon: 'search',
  isNav: true,
},{
  pathname: '/admin/update',
  component: Update,
  title: '更新课程附加信息',
  icon: 'form',
  isNav: true,
},{
  pathname: '/admin/all',
  component: All,
  title: '获取课程附加信息列表',
  icon: 'unordered-list',
  isNav: true,
}]