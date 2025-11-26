export default {
  pages: [
    'pages/zuke/index',
    'pages/login/index',
    'pages/register/index',
    'pages/fangdong/index',
    'pages/users/index',
  ],
  subPackages: [
    {
      root: 'zuke',
      pages: [
        'pages/consultation/index',
        'pages/consultationDetail/index',
        'pages/messageBoard/index',
        'pages/notice/index',
        'pages/room/index',
        'pages/roomDetail/index',
      ],
      independent: true,
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}
