import AV from 'leancloud-storage';

var APP_ID = 'aQ9824hhWRrhe0w4sYNsKh2n-gzGzoHsz';
var APP_KEY = 'S9GjlavvSp4fS7yrFGN9G7lv';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

export default AV

export function signUp(username, email, password, successFn, errorFn) {
  // 新建 AVUser 对象实例
  var user = new AV.User()
  // 设置用户名
  user.setUsername(username)
  // 设置邮箱
  user.setEmail(email)
  // 设置密码
  user.setPassword(password)

  user.signUp().then(function (loginedUser) {
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null, user)
  }, function (error) {
    errorFn.call(null, error)
  })

  return undefined

}

export function getCurrentUser(){
  let user = AV.User.current()
  if(user){
    return getUserFromAVUser(user)
  }else{
    return null
  }
}

function getUserFromAVUser(AVUser) {
  return {
    id: AVUser.id,
    username: AVUser.username,
    email: AVUser.email,
    password: AVUser.password
  }
}