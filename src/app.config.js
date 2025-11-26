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
        'consultation/index',
        'consultationDetail/index',
        'messageBoard/index',
        'notice/index',
        'room/index',
        'roomDetail/index',
      ]
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}
