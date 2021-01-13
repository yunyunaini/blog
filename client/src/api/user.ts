import request from '@/utils/request'
import { IUserInfo } from './types'
import { IRegister } from '../store/modules/user'
interface author {
  username?: string | (string | null)[]
  author?: string | (string | null)[]
}
export const login = (data: {username: string, password: string}) =>
  request({
    url: 'api/user/login',
    method: 'post',
    data
})

export const logout = (data: {author: string}) =>
  request({
    url: 'api/user/logout',
    method: 'post',
    data
})
export const getuserList = (params: {top?: number, page?: number}) =>
  request({
    url: 'api/user/getuserList',
    method: 'get',
    params
})

export const getoauth = (data: {code: string}) =>
  request({
    url: 'api/user/oauth',
    method: 'post',
    data
})

export const register = (data: IRegister) =>
  request({
    url: 'api/user/register',
    method: 'post',
    data
})
export const sendSmsCodeToUser = (data: {username: string}) =>
  request({
    url: 'api/user/sendSmsCodeToUser',
    method: 'post',
    data
})

export const getUserInfo = (params?: author) =>
  request({
    url: 'api/user/getInfo',
    method: 'get',
    params
})

export const updateUserInfo = (data: IUserInfo) => 
  request({
    url: 'api/user/updateUser',
    method: 'post',
    data: data
  })