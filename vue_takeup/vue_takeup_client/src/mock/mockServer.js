//引入mockjs
import Mock from 'mockjs'
import data from './data.json'
//返回goods的接口
Mock.mock('/goods', { code: 0, data: data.goods })
//返回rating的接口
Mock.mock('/rating', { code: 0, data: data.ratings })
//返回info的接口
Mock.mock('/info', { code: 0, data: data.info })
//不需要暴露，只要执行一次就行