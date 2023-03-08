import './About.less'

import TDesignPng from '../assets/tdesign.png'
import GoogleFontsPng from '../assets/google-fonts.svg'

export default function () {
  return <div className='about-page'>
    <h1>关于本项目</h1>
    Conversion Space 目的是通过统一的 UI 交互，以及丰富的插件系统，从而使得人们能方便的在不同的平台上进行沟通。
    <br/>
    <br/>
    当然也配合你在当下火热的 ChatGPT 中快乐的使用，提供相应平台无法提供的快乐。
    <br/>
    <br/>
    如果你对本项目感兴趣，或者想要参与到本项目中来，欢迎访问 <a href='https://github.com/nwylzw' target='_blank'>nwylzw</a> 的 GitHub 仓库。
    <br/>
    也欢迎任何富有建设性的建议，与我们一起让 Conversion Space 变得更好。
    <h2>感谢</h2>
    <div className='icons'>
      <a href='https://tdesign.tencent.com/' target='_blank'>
        <img src={TDesignPng} alt='TDesign' style={{
          marginLeft: 30,
          marginTop: 37,
          height: 'calc(100% - 74px)',
          width: 'calc(100% - 60px)'
        }}/>
      </a>
      <a href='https://fonts.google.com/icons' target='_blank'>
        <img src={GoogleFontsPng} alt='Google Fonts' />
      </a>
    </div>
  </div>
}
