import { request } from './request'

//获取轮播图数据
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}
