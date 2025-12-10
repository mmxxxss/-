export default {
  pages: [
    'pages/zuke/index',
    'pages/mine/index',
    'pages/login/index',
    'pages/register/index',
    'pages/consultation/index',
    'pages/consultationDetail/index',
    'pages/messageBoard/index',
    'pages/notice/index',
    'pages/room/index',
    'pages/roomDetail/index',
    'pages/userinfo/index',
    'pages/updatePassWord/index',
    'pages/yuyuekanfang/index',
    'pages/yuyuekanfangdetail/index',
  ],
  tabBar: {
    custom: true,
    color: "#666",
    selectedColor: "#007AFF",
    backgroundColor: "#fff",
    borderStyle: "black",
    list: [
      {
        pagePath: 'pages/zuke/index',
        text: '首页'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的'
      }
    ]
  },
  usingComponents: {},
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '租房管理系统',
    navigationBarTextStyle: 'black'
  }
}
