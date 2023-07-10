// 所有用户相关的工具类方法,都放在这个文件

// 创建一个标识
// 标识的特点:
// 1. 唯一(uuid)
// 2. 不能老变

import {v4 as uuidv4} from 'uuid'

export function getUserTempId(){
    let userTempId = localStorage.getItem('USERTEMPID')
    if(!userTempId){
        userTempId = uuidv4()
        localStorage.setItem('USERTEMPID',userTempId)
    }
    return userTempId
}