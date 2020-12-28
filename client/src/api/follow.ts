import request from '@/utils/request'
interface author {
  username?: string | (string | null)[]
  author?: string | (string | null)[]
}

export const getfollow = (data: author) =>
  request({
    url: 'api/actions/following',
    method: 'post',
    data
  })

export const getunfollow = (data: author) =>
  request({
    url: 'api/actions/unfollow',
    method: 'post',
    data
  })

export const getfollowList = (params?: author) =>
  request({
    url: 'api/actions/followList',
    method: 'get',
    params
  })