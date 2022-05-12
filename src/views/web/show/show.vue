<template>
  <div class="show-content">
<!--    <PageHeader :gradual="false"></PageHeader>-->

    <div class="main">
      <div class="main-head">
        <div class="layout layout-head">
          <div
            class="head-center head-box"
            :class="this.number == 2 ? 'box-active' : ''"
            @click="toCenter()"
          >
            <div class="head-content">
              <img
                :src="
                  this.number == 2
                    ? require('../../../assets/images/show/head-center1.png')
                    : require('../../../assets/images/show/head-center.png')
                "
                alt=""
              />
              <div class="head-title">
                <div
                  class="title"
                  :class="this.number == 2 ? 'head-active' : ''"
                >
                  极速布展
                </div>
                <p>3D场景+3D产品，让展示和交互更真实</p>
              </div>
              <div class="line"></div>
            </div>
          </div>
          <div
            class="head-left head-box"
            :class="this.number == 1 ? 'box-active' : ''"
            @click="toLeft()"
          >
            <div class="head-content">
              <img
                :src="
                  this.number == 1
                    ? require('../../../assets/images/show/head-left1.png')
                    : require('../../../assets/images/show/head-left.png')
                "
                alt=""
              />
              <div class="head-title">
                <div class="title" :class="number == 1 ? 'head-active' : ''">
                  3D逛展
                </div>
                <p>突破空间限制，创造沉浸式体验</p>
              </div>
              <div class="line"></div>
            </div>
          </div>
          <div
            class="head-right head-box"
            :class="this.number == 3 ? 'box-active' : ''"
            @click="toRight()"
          >
            <div class="head-content">
              <img
                :src="
                  this.number == 3
                    ? require('../../../assets/images/show/head-right1.png')
                    : require('../../../assets/images/show/head-right.png')
                "
                alt=""
              />
              <div class="head-title">
                <div
                  class="title"
                  :class="this.number == 3 ? 'head-active' : ''"
                >
                  增值功能
                </div>
                <p>高效营销裂变，AI大数据分析</p>
              </div>
              <div class="line"></div>
            </div>
          </div>
        </div>
      </div>
      <div id="two" class="main-body-center">
        <div class="main-body main-box1  main-one">
          <div class="layout">
            <div class="body-img body-img-left">
              <div
                class="img-one top-img-one"
                :class="
                  this.count ? (this.count == 2 ? 'tolitter' : 'tobig') : ''
                "
              >
                <div class="img-top">
                  <div class="circles">
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                  </div>
                </div>
                <div class="img-img">
                  <img
                    src="../../../assets/images/show/center-1-2.png"
                    alt=""
                  />
                </div>
              </div>
              <div
                class="img-two bottom-img-two"
                :class="
                  this.count ? (this.count == 1 ? 'tolitter' : 'tobig') : ''
                "
              >
                <div class="img-top">
                  <div class="circles">
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                  </div>
                </div>
                <div class="img-img">
                  <img
                    src="../../../assets/images/show/center-1-1.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div class="body-content body-content-right ">
              <div class="title-top">模板自选</div>
              <div class="title-content">
                根据各行各业场景化展示需求，提供丰富的展厅模板，企业可在模板基础上自行搭配各类展示素材，快速拥有自己的3D展厅；降低建展成本，提升建展效率
              </div>
              <div class="title tip">
                标准模板、私人定制模板 各层级客户展示需求均可满足
              </div>
              <div
                class="tip-list tip-lists "
                :class="this.count == 1 ? 'tolists' : ''"
                @mouseenter="this.moveOne"
              >
                <div class="list-title ">标准模板</div>
                <div>面积、场景、风格多维度提供个性化模板选择</div>
              </div>
              <div
                class="tip-list tip-lists"
                :class="this.count == 2 ? 'tolists' : ''"
                @mouseenter="this.moveTwo"
              >
                <div class="list-title ">定制模板</div>
                <div>提供私有设计定制，为客户打造专属个性模板</div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-body main-box2">
          <div class="layout">
            <div class="body-content">
              <div class="title-top">图片视频布展</div>
              <div class="title-content">
                可自行上传JPG、PNG、GIF等素材，通过简单拖拽，即可直接在场景中放置图片/动图/视频等内容
              </div>
              <div class="title tip">
                标准模板、私人定制模板 各层级客户展示需求均可满足
              </div>
              <div
                class="tip-list tip-lists "
                :class="this.count1 == 3 ? 'tolists' : ''"
                @mouseenter="this.moveThree"
              >
                <div class="list-title">静态图片布展</div>
                <div>自动吸附墙面，随意拖动、缩放、便捷操作</div>
              </div>
              <div
                class="tip-list tip-lists "
                :class="this.count1 == 4 ? 'tolists' : ''"
                @mouseenter="this.moveFour"
              >
                <div class="list-title">动态图片、视频布展</div>
                <div>GIF、视频多格式支持，增添展厅动画效果</div>
              </div>
            </div>
            <div class="body-img">
              <div
                class="img-one"
                :class="
                  this.count1 ? (this.count1 == 4 ? 'tolitter' : 'tobig') : ''
                "
              >
                <div class="img-top">
                  <div class="circles">
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                  </div>
                </div>
                <div class="img-img">
                  <img
                    src="../../../assets/images/show/center-2-1.png"
                    alt=""
                  />
                </div>
              </div>
              <div
                class="img-two"
                :class="
                  this.count1 ? (this.count1 == 3 ? 'tolitter' : 'tobig') : ''
                "
              >
                <div class="img-top">
                  <div class="circles">
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                  </div>
                </div>
                <div class="img-img">
                  <img
                    src="../../../assets/images/show/center-2-2.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-body main-box1 main-box3">
          <div class="layout layout-center3">
            <div class="body-img">
              <img src="../../../assets/images/show/center-3.png" alt="" />
            </div>
            <div class="body-content">
              <div class="title-top">文字布展</div>
              <div class="title-content">
                强大的文字排版功能，可直接在三维场景中进行文字编辑与排版，功能全面，操作如同PPT般简单方便。
              </div>
              <div class="tip-list">
                <div class="list-title ">样式调整</div>
              </div>
              <div class="tip-list ">
                <div class="list-title ">字体及颜色调整</div>
              </div>
              <div class="tip-list ">
                <div class="list-title ">大小及行距调整</div>
              </div>
              <div class="tip-list ">
                <div class="list-title ">透明度调整</div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-body main-box2 main-box3">
          <div class="layout layout-center4">
            <div class="body-content">
              <div class="title-top">模型布展</div>
              <div class="title-detail">
                模型一键拖入，随时更换，在线编辑，简单方便
              </div>
              <div class="tip-list">
                <div class="list-title ">渲染光影实时调整</div>
              </div>
              <div class="tip-list">
                <div class="list-title ">位置、大小、角度动态编辑</div>
              </div>

              <div class="tip-list">
                <div class="list-title ">独立放大720°浏览</div>
              </div>
            </div>
            <div class="body-img center-4-gif">
              <img
                class="gif-bottom"
                src="../../../assets/images/show/center-4.png"
                alt=""
              />

              <div class="center-gif4">
                <img
                  class=""
                  src="../../../assets/images/show/center-4.gif"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div class="main-body main-box1 main-box3">
          <div class="layout layout-center5">
            <div class="body-img">
              <img src="../../../assets/images/show/center-5.png" alt="" />
            </div>
            <div class="body-content">
              <div class="title-top">展品热点配置</div>
              <div class="title-content">
                可在场景中动态添加热点，模板化配置热点属性，引导用户查看展品详情，或内嵌其它商城、活动等互动页面
              </div>
              <div class="tip-list">
                <div class="list-title ">热点样式名称自定义</div>
              </div>
              <div class="tip-list">
                <div class="list-title ">
                  可配置为4合1详情展示页面介绍展品信息
                </div>
              </div>
              <div class="tip-list">
                <div class="list-title ">可添加动画解说音自动介绍展品</div>
              </div>
              <div class="tip-list">
                <div class="list-title ">
                  可配置外链跳转官网、商场、活动页等页面
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-body main-box2 main-box3">
          <div class="layout layout-center6">
            <div class="body-content">
              <div class="title-top">导览配置</div>
              <div class="title-content">
                提供默认自动导览路径，并支持自行配置更改，配置素材热点及讲解音关联，快速实现展厅自动游览
              </div>
              <div class="tip-list">
                <div class="list-title ">游览点位选择及顺序调整</div>
              </div>
              <div class="tip-list">
                <div class="list-title ">点位停留时间、观看角度自定义</div>
              </div>
              <div class="tip-list">
                <div class="list-title ">点位展厅详情及自动解说自定义</div>
              </div>
            </div>
            <div class="body-img">
              <div class="img6">
                <img src="../../../assets/images/show/center-6.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="main-body main-box1">
          <div class="layout">
            <div class="body-img">
              <div
                class="img-one"
                :class="
                  this.count2 ? (this.count2 == 6 ? 'tolitter' : 'tobig') : ''
                "
              >
                <div class="img-top">
                  <div class="circles">
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                  </div>
                </div>
                <div class="img-img">
                  <img
                    src="../../../assets/images/show/center-7-1.png"
                    alt=""
                  />
                </div>
              </div>
              <div
                class="img-two"
                :class="
                  this.count2 ? (this.count2 == 5 ? 'tolitter' : 'tobig') : ''
                "
              >
                <div class="img-top">
                  <div class="circles">
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                  </div>
                </div>
                <div class="img-img">
                  <img
                    src="../../../assets/images/show/center-7-2.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div class="body-content">
              <div class="title-top">中英文界面</div>
              <div class="title-content">
                中英文布展及展示界面满足世界各地用户快速布展及漫游场景
              </div>
              <div class="title tip">
                标准模板、私人定制模板 各层级客户展示需求均可满足
              </div>
              <div
                class="tip-list tip-lists"
                :class="this.count2 == 5 ? 'tolists' : ''"
                @mouseenter="this.moveFive"
              >
                <div class="list-title">中英文布展工具操作界面</div>
                <div>面积、场景、风格多维度提供个性化模板选择</div>
              </div>
              <div
                class="tip-list tip-lists"
                :class="this.count2 == 6 ? 'tolists' : ''"
                @mouseenter="this.moveSix"
              >
                <div class="list-title ">
                  前端漫游界面中英文一键切换
                </div>
                <div>提供私有设计定制，为客户打造专属个性模板</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="one" class="main-body-left">
        <div class="main-body main-box1 main-box4">
          <div class="layout">
            <div class="body-content body-content-right transformRight">
              <div class="title-top">场景浏览</div>
              <div class="title-content">
                漫游、三维、鸟瞰三种场景浏览模式，游客既可在场景中自由行走也可快速查看场景全貌及空间结构
              </div>
              <div class="title tip">
                三种模式可无缝切换，并配合小地图实时定位
              </div>
              <div
                class="tip-list tip-lists "
                :class="this.counts == 1 ? 'tolists' : ''"
                @mouseenter="moveTwoleft(1)"
              >
                <div class="list-title ">漫游模式</div>
                <div>默认模式，游览者可在展厅自由行走，任意旋转视角</div>
              </div>
              <div
                class="tip-list tip-lists"
                :class="this.counts == 2 ? 'tolists' : ''"
                @mouseenter="moveTwoleft(2)"
              >
                <div class="list-title ">三维模式</div>
                <div>让游览者更直观地查看场景全貌及空间结构</div>
              </div>
              <div
                class="tip-list tip-lists"
                :class="this.counts == 3 ? 'tolists' : ''"
                @mouseenter="moveTwoleft(3)"
              >
                <div class="list-title ">鸟瞰模式</div>
                <div>让游览者更直观地查看展厅平面规划</div>
              </div>
            </div>
            <div class="body-img left-body-img body-img-left transformLeft">
              <div
                class="img-one top-img-one left-images"
                :class="this.counts == 1 ? 'toup' : ''"
              >
                <div class="img-top">
                  <div class="circles">
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                  </div>
                </div>
                <div class="img-img">
                  <img :src="img1" alt="" />
                </div>
              </div>
              <div
                class="img-two bottom-img-two left-images"
                :class="this.counts == 2 ? 'tobigleft' : 'tolitterleft'"
              >
                <div class="img-top">
                  <div class="circles">
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                  </div>
                </div>
                <div class="img-img">
                  <img :src="img2" alt="" />
                </div>
              </div>
              <div
                class="img-three bottom-img-three left-images"
                :class="this.counts == 3 ? 'tobigleft1' : 'tolitterleft1'"
              >
                <div class="img-top">
                  <div class="circles">
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                  </div>
                </div>
                <div class="img-img">
                  <img :src="img3" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-body main-box2 main-box4">
          <div class="layout">
            <div
              class="body-img left-body-img body-img-left body-img-left2 transformRight"
            >
              <div
                class="img-one img-ones top-img-one"
                :class="this.counts2 == 4 ? 'toup' : ''"
              >
                <div class="img-top">
                  <div class="circles">
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                  </div>
                </div>
                <div class="img-img">
                  <img :src="img4" alt="" />
                </div>
              </div>
              <div
                class="img-two img-twos bottom-img-two"
                :class="this.counts2 == 5 ? 'tobigleft' : 'tolitterleft'"
              >
                <div class="img-top">
                  <div class="circles">
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                  </div>
                </div>
                <div class="img-img">
                  <img :src="img5" alt="" />
                </div>
              </div>
              <div
                class="img-three img-threes bottom-img-three"
                :class="this.counts2 == 6 ? 'tobigleft1' : 'tolitterleft1'"
              >
                <div class="img-top">
                  <div class="circles">
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                  </div>
                </div>
                <div class="img-img">
                  <img :src="img6" alt="" />
                </div>
              </div>
            </div>
            <div class="body-content body-content-right transformLeft">
              <div class="title-top">快速导览</div>
              <div class="title-content">
                游客可通过平面布局图、区域导览及展品列表快速定位到场景指定位置
              </div>
              <div class="title tip">
                用户可通过场景配置，自行控制关键点位及展品列表
              </div>
              <div
                class="tip-list tip-lists "
                :class="this.counts2 == 4 ? 'tolists' : ''"
                @mouseenter="moveThreeleft(4)"
              >
                <div class="list-title ">小地图导览</div>
                <div>无需配置，自动生成平面小地图，实时展示访客位置</div>
              </div>
              <div
                class="tip-list tip-lists"
                :class="this.counts2 == 5 ? 'tolists' : ''"
                @mouseenter="moveThreeleft(5)"
              >
                <div class="list-title ">区域导览</div>
                <div>
                  自行配置场景关键区域及观看视角，通过区域缩略图快速跳转
                </div>
              </div>
              <div
                class="tip-list tip-lists"
                :class="this.counts2 == 6 ? 'tolists' : ''"
                @mouseenter="moveThreeleft(6)"
              >
                <div class="list-title ">展品列表导览</div>
                <div>
                  热点自动生成展品列表，配合展品封面及检索快速定位空间场景
                </div>
              </div>
              <a
                href="https://obs.3dyunzhan.com/sceneFront/index.html?G_TEMP_ID=a024b261af19c799359e74a753e3c14b"
                target="_blank"
                ><button class="button">查看案例 &gt;</button></a
              >
            </div>
          </div>
        </div>
        <div class="main-body main-box1 main-box3">
          <div class="layout left4-content4">
            <div class="body-content left-content3 ">
              <div class="title-top">自动导览</div>
              <div class="title-content ">
                根据预设路径自动带领用户游览展厅，实现场景自动展示，领导巡官需求
              </div>
              <div class="title tip">
                导览过程可随时手动操作，并可继续自动导览
              </div>
              <div class="tip-list">
                <div class="list-title ">导览路径自由编排</div>
              </div>
              <div class="tip-list">
                <div class="list-title ">区域停留时间及观看角度独立设置</div>
              </div>
              <div class="tip-list">
                <div class="list-title ">导览讲解词及卡通讲解员个性设置</div>
              </div>
              <div class="tip-list">
                <div class="list-title ">导览详情弹窗自由组合</div>
              </div>
              <a
                href="https://obs.3dyunzhan.com/sceneFront/index.html?G_TEMP_ID=562ba3a33e6e419aac36660ad6ef7df7"
                target="_blank"
                ><button>查看案例 &gt;</button></a
              >
            </div>
            <div class="body-img left-img">
              <div class="img6">
                <img src="../../../assets/images/show/left-3.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="main-body main-box2 main-box3">
          <div class="layout left4-content4">
            <div class="body-img left-img left-img4">
              <div class="left-img4-1">
                <img src="../../../assets/images/show/left4-1.png" alt="" />
              </div>
              <div class="left-img4-2">
                <img src="../../../assets/images/show/left4-2.png" alt="" />
              </div>
              <div class="left-img4-3">
                <img src="../../../assets/images/show/left4-3.png" alt="" />
              </div>
            </div>
            <div class="body-content left-content4">
              <div class="title-top">4合1展品详情展示</div>
              <div class="title-content ">
                可在场景中内嵌展品详情页面，主展示区+详情描述，为观众详细介绍展品内容；并支持外链跳转
              </div>
              <div class="tip-list">
                <div class="list-title ">
                  主展示区支持模型、视频、图片、动图4种展示形态
                </div>
              </div>
              <div class="tip-list ">
                <div class="list-title ">
                  详情描述支持图文综合描述或PDF内嵌文档
                </div>
              </div>
              <div class="tip-list">
                <div class="list-title ">背景音、解说员动画独立配置</div>
              </div>
              <div class="tip-list">
                <div class="list-title ">
                  支持官网或商城购买跳转
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-body main-box1 main-box3">
          <div class="layout layout-left5">
            <div class="body-content left-content5">
              <div class="title-top">真人讲解</div>
              <div class="title-content">
                展厅内添加真人讲解动画，对展厅指定区域展品进行专属讲解，为用户带来身临其境的VIP观展体验
              </div>
              <div class="tip-list">
                <div class="list-title ">
                  讲解员绑定展厅区域，进入自动讲解，离开自动停止
                </div>
              </div>
              <div class="tip-list">
                <div class="list-title ">
                  讲解员动画可自行制作上传，灵活配置
                </div>
              </div>
              <div class="tip-list">
                <div class="list-title ">一个展厅可配置多个讲解员</div>
              </div>
            </div>
            <div class="body-img left-img">
              <div class="img6">
                <img src="../../../assets/images/show/left5.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="main-body main-box2 main-box3">
          <div class="layout layout-left6">
            <div class="body-img left-img6">
              <img src="../../../assets/images/show/left6.png" alt="" />
            </div>
            <div class="body-content left-content6">
              <div class="title-top">一键分享</div>
              <div class="title-content">
                微信、微博、QQ等社交渠道一键分享；小程序、官网、APP、H5等无缝内嵌
              </div>
              <div class="tip-list">
                <div class="list-title ">
                  H5页面访问，社交媒体应用直接分享打开
                </div>
              </div>
              <div class="tip-list">
                <div class="list-title ">
                  通用iframe内嵌代码，0成本应用内嵌
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="three" class="main-body-right">
        <div class="main-body main-box1">
          <div class="layout layout1">
            <div class="body-content body-content1">
              <div class="title-top">VR带看</div>
              <div class="title-content">
                全新理念的VR远程营销利器，使用3D场景漫游、720模型、图文、视频、热点详情等展示形式，实现异地同屏、双向互动、实时语音、多人交流，创造营销新机遇
              </div>
              <div class="title tip">
                真正的同屏互动+语音连接，身在异地也能面对面交流
              </div>
              <div
                class="tip-list tip-lists "
                :class="this.img == 1 ? 'tolists' : ''"
                @mouseenter="showImg01"
              >
                <div class="list-title">同屏互动双向沟通</div>
                <div>
                  同屏连线，实时语音，访客和坐席可同时控制场景，沟通零距离
                </div>
              </div>
              <div
                class="tip-list tip-lists "
                :class="this.img == 2 ? 'tolists' : ''"
                @mouseenter="showImg02"
              >
                <div class="list-title">一对多实时在线连线</div>
                <div>
                  单场景支持多人同时在线，访客可申请连麦和控制场景，坐席统一控制，消除反复沟通的烦恼
                </div>
              </div>
              <div
                class="tip-list tip-lists "
                :class="this.img == 3 ? 'tolists' : ''"
                @mouseenter="showImg03"
              >
                <div class="list-title">离线预约带看</div>
                <div>
                  坐席忙或不在线时，为客户提供离线预约，上线后可主动邀请客户同屏带看
                </div>
              </div>
              <button class="showCase" @click="goDetail">
                查看案例<i class="el-icon-arrow-right"></i>
              </button>
            </div>
            <div class="body-img body-img1">
              <div class="img-one">
                <img
                  v-if="img == 1"
                  src="../../../assets/images/show/right1-1.png"
                  alt=""
                />
                <img
                  v-if="img == 2"
                  src="../../../assets/images/show/right1-2.png"
                  alt=""
                />
                <img
                  v-if="img == 3"
                  src="../../../assets/images/show/right1-3.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div class="main-body main-box2 main-box3">
          <div class="layout">
            <div class="body-img">
              <img src="../../../assets/images/show/right2.png" alt="" />
            </div>
            <div class="body-content">
              <div class="title-top">在线客服</div>
              <div class="title-content">
                访客可在展厅内随时呼叫企业客服，配备独立客服坐席系统，方便前端访客与企业实时沟通交流，及时完成线索转化
              </div>
              <!-- <div class="tip-list">
                <div class="list-title ">样式调整</div>
              </div> -->
              <div class="tip-list ">
                <div class="list-title ">在线图文聊天，支持附件发送</div>
              </div>
              <div class="tip-list ">
                <div class="list-title ">
                  支持设置客服机器人及关联题库自动解答
                </div>
              </div>
              <div class="tip-list ">
                <div class="list-title ">
                  独立管理后台，支持CRM管理及客服服务管理
                </div>
              </div>
              <div class="tip-list ">
                <div class="list-title ">支持客户现有客服系统对接</div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-body main-box1 main-box3">
          <div class="layout">
            <div class="body-content body-content2">
              <div class="title-top">在线直播</div>
              <div class="title-content">
                企业可自行选择直播平台接入，并支持公共直播平台及企业级直播平台对接，便于商家在展厅内进行会议直播或营销直播
              </div>
              <div class="tip-list">
                <div class="list-title ">now直播、一直播等公共直播简单内嵌</div>
              </div>
              <div class="tip-list">
                <div class="list-title ">
                  企业直播平台内嵌，支持暖场、白名单等权限配置
                </div>
              </div>
              <div class="tip-list">
                <div class="list-title ">
                  直播有效时段设置，自行控制直播显示状态
                </div>
              </div>
            </div>
            <div class="body-img">
              <div class="img6">
                <img src="../../../assets/images/show/right3.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="main-body main-box2 main-box3">
          <div class="layout">
            <div class="body-img">
              <img src="../../../assets/images/show/right4.png" alt="" />
            </div>
            <div class="body-content">
              <div class="title-top">访问统计</div>
              <div class="title-content">
                独立提供每个展厅的访问、点赞、停留、展品浏览等多维度数据统计及用户画像
              </div>
              <!-- <div class="tip-list">
                <div class="list-title ">样式调整</div>
              </div> -->
              <div class="tip-list ">
                <div class="list-title ">
                  展厅累计访问及不同时间维度访问趋势分析
                </div>
              </div>
              <div class="tip-list ">
                <div class="list-title ">国内外访客来源占比分析</div>
              </div>
              <div class="tip-list ">
                <div class="list-title ">用户基础画像分析</div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-body main-box1 main-box3">
          <div class="layout layout-right5">
            <div class="body-content body-content3">
              <div class="title-top">访客信息</div>
              <div class="title-content">
                独立提供每个展厅访问用户的手机号码、用户名、来源地区，为企业提供核心营销线索
              </div>
              <div class="tip-list">
                <div class="list-title ">分时段查看访问用户信息</div>
              </div>
              <div class="tip-list">
                <div class="list-title ">
                  支持一键导出客户信息数据
                </div>
              </div>
            </div>
            <div class="body-img body-img2">
              <div class="img6">
                <img src="../../../assets/images/show/right5.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="main-body main-box2 main-box3">
          <div class="layout layout-right6">
            <div class="body-img body-img3">
              <img src="../../../assets/images/show/right6.png" alt="" />
            </div>
            <div class="body-content">
              <div class="title-top">在线表单</div>
              <div class="title-content">
                企业可在线制作客户预约模板，发起活动预约、新品预约等专题活动，调研市场的同时收集精准用户信息
              </div>
              <!-- <div class="tip-list">
                <div class="list-title ">样式调整</div>
              </div> -->
              <div class="tip-list ">
                <div class="list-title ">
                  预约模板自定义，可设置预约主题、内容说明及有效时段
                </div>
              </div>
              <div class="tip-list ">
                <div class="list-title ">手机验证码校验，获取客户精准信息</div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-body main-box1 main-box3">
          <div class="layout">
            <div class="body-content">
              <div class="title-top">离线部署</div>
              <div class="title-content">
                提供展厅离线数据包下载服务，保证展厅数据完全私有化，满足展厅离线展示或私有云展示需求
              </div>
              <div class="tip-list">
                <div class="list-title ">展厅H5离线数据包，可直接打开访问</div>
              </div>
              <div class="tip-list">
                <div class="list-title ">
                  展厅H5离线数据包，可部署私有云访问
                </div>
              </div>
              <div class="tip-list">
                <div class="list-title ">
                  展厅场景数据及详情页数据（非外链）整体私有化
                </div>
              </div>
            </div>
            <div class="body-img body-img4">
              <div class="img6">
                <img src="../../../assets/images/show/right7.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="main-body main-box2 main-box3">
          <div class="layout layout-right8">
            <div class="body-img body-img2">
              <img src="../../../assets/images/show/right8.png" alt="" />
            </div>
            <div class="body-content">
              <div class="title-top">加密访问</div>
              <div class="title-content">
                每个展厅可独立设置访问密码，实现展厅无限传播的有效控制
              </div>
              <!-- <div class="tip-list">
                <div class="list-title ">样式调整</div>
              </div> -->
              <div class="tip-list ">
                <div class="list-title ">自主设置展厅访问权限及密码</div>
              </div>
              <div class="tip-list ">
                <div class="list-title ">实时设置即时生效</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <fixed-tool></fixed-tool>
  </div>
</template>
<script>
import PageFooter from "@/components/page-footer/page-footer.vue";
import PageHeader from "@/components/page-header/page-header.vue";
import countNumberVue from "../../mobile/components/count-number.vue";
import logo from "@/components/logo.vue";
import searchWord from "@/components/search-case.vue";
export default {
  name: "show",
  props: {
    gradual: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    logo,
    searchWord,
    PageFooter,
    PageHeader,
  },
  data() {
    return {
      openSearch: false,
      scrollTop: 0,
      routerName: "",
      imgshow: true,
      count: 1,
      count1: 3,
      count2: 5,

      counts: 1,
      counts2: 4,
      number: 2,
      img: 1,
      img1: require("../../../assets/images/show/manyou.gif"),
      img2: require("../../../assets/images/show/left1-2.png"),
      img3: require("../../../assets/images/show/left1-3.png"),
      img4: require("../../../assets/images/show/xiaoditu.gif"),
      img5: require("../../../assets/images/show/left2-2.png"),
      img6: require("../../../assets/images/show/left2-3.png"),
      defaultImg:
        "//3dshichuang.com/scene-portal/resources/wxapp/images/avatar.png",
      flag: true,
    };
  },
  methods: {
    moveOne() {
      if (this.count != null) {
        this.count = 1;
      }
    },
    moveTwo() {
      this.count = 2;
    },

    moveThree() {
      if (this.count1 != null) {
        this.count1 = 3;
      }
    },
    moveFour() {
      this.count1 = 4;
    },
    moveFive() {
      if (this.count2 != null) {
        this.count2 = 5;
      }
    },
    moveSix() {
      this.count2 = 6;
    },
    moveThreeleft(b) {
      this.counts2 = b;
      if (b == 4) {
        this.img4 = require("../../../assets/images/show/xiaoditu.gif");
        this.img5 = require("../../../assets/images/show/left2-2.png");
        this.img6 = require("../../../assets/images/show/left2-3.png");
      }
      if (b == 5) {
        this.img5 = require("../../../assets/images/show/daolan.gif");
        this.img4 = require("../../../assets/images/show/left2-1.png");
        this.img6 = require("../../../assets/images/show/left2-3.png");
      }
      if (b == 6) {
        this.img6 = require("../../../assets/images/show/shangpin.gif");
        this.img4 = require("../../../assets/images/show/left2-1.png");
        this.img5 = require("../../../assets/images/show/left2-2.png");
      }
    },
    moveTwoleft(a) {
      this.counts = a;
      if (a == 1) {
        this.img1 = require("../../../assets/images/show/manyou.gif");
        this.img2 = require("../../../assets/images/show/left1-2.png");
        this.img3 = require("../../../assets/images/show/left1-3.png");
      }
      if (a == 2) {
        this.img2 = require("../../../assets/images/show/sanwei.gif");
        this.img1 = require("../../../assets/images/show/left1-1.png");
        this.img3 = require("../../../assets/images/show/left1-3.png");
      }
      if (a == 3) {
        this.img3 = require("../../../assets/images/show/niaohan.gif");
        this.img1 = require("../../../assets/images/show/left1-1.png");
        this.img2 = require("../../../assets/images/show/left1-2.png");
      }
    },
    showImg01() {
      this.img = 1;
    },
    showImg02() {
      this.img = 2;
    },
    showImg03() {
      this.img = 3;
    },
    checkBox() {
      // if (this.flag) {
      //   this.number = 3;
      //   window.scrollTo(0, 7950);
      //   this.flag = false;
      // }

      let div = document.getElementsByClassName("main-body");

      for (let i = 0; i < div.length; i++) {
        const element = div[i].getBoundingClientRect().top;
        if (element - document.body.offsetHeight < -100) {
          div[i].children[0].children[0].classList.add("transformRight");
          div[i].children[0].children[1].classList.add("transformLeft");
        }
      }
      let div1 = document.getElementsByClassName("main-body-left");
      let div2 = document.getElementsByClassName("main-body-center");
      let div3 = document.getElementsByClassName("main-body-right");
      if (div1[0].getBoundingClientRect().top > 274) {
        this.number = 2;
      }
      if (div1[0].getBoundingClientRect().top <= 274) {
        this.number = 1;
      }
      if (div3[0].getBoundingClientRect().top <= 400) {
        this.number = 3;
      }
    },
    toLeft() {
      this.number = 1;
      // document.querySelector("#one").scrollIntoView();
      window.scrollTo(0, 4100);
    },
    toCenter() {
      this.number = 2;

      window.scrollTo(0, 0);
    },
    toRight() {
      this.number = 3;
      //document.querySelector("#three").scrollIntoView();
      window.scrollTo(0, 7950);
    },
    goDetail() {
      // this.$router.push("/show/vr")
      window.open(`${location.origin}/show/vr`);
    },
    scroll(e) {
      this.scrollTop = $(document).scrollTop();
    },
    searchw() {
      this.imgshow = false;
    },
    login(operate) {
      //operate = this.$router.history.current.name =='index' ? 2 : 1 ;
      this.$Ruler.account({
        options: {
          operate: operate,
        },
      });
    },
    oncreate() {
      this.$router.push({ name: "buyTpl" });
    },
    loginOut() {
      //推出登录
      this.$store.commit("setUserInfo", "");
      if (this.$route.meta && this.$route.meta.requireAuth) {
        this.$router.push({ name: "index" });
      }
    },
    toCase(e) {
      if (this.$route.name === "case") {
        this.$router.replace({
          path: "/case",
          query: {
            keyword: e,
          },
        });
      } else if (this.$route.name === "buyTpl") {
        this.$router.push({
          path: "/self/buy/tpl",
          query: {
            keyword: e,
          },
        });
      } else {
        this.$router.push({
          path: "/case",
          query: {
            keyword: e,
          },
        });
      }
    },
    refresh() {
      if (this.$route.name === "case") {
        window.location.replace(this.$route.path);
      } else {
        this.$router.push({ name: "case" });
      }
    },
    // 企业营销
    goMarketing() {
      // location.href = "/solution/marketing.html";
      location.href = "http://mo-v2.3dyunzhan.com/solution/marketing.html";
    },
    // 数字文博
    goExposition() {
      // location.href = "/solution/exposition.html";
      location.href = "http://mo-v2.3dyunzhan.com/solution/exposition.html";
    },
    //3D商城
    goMall() {
      // location.href = "/solution/mall.html";
      location.href = "http://mo-v2.3dyunzhan.com/solution/mall.html";
    },
    //军政党史
    goGovernment() {
      // location.href = "/solution/government.html";
      location.href = "http://mo-v2.3dyunzhan.com/solution/government.html";
    },
    //云上展会
    goExhibition() {
      // location.href = "/solution/exhibition.html";
      location.href = "http://mo-v2.3dyunzhan.com/solution/exhibition.html";
    },
  },
  computed: {
    userinfo() {
      return this.$store.state.userinfo;
    },
    // height() {
    //   if (!this.gradual) {
    //     return {
    //       height: "56px",
    //     };
    //   }
    //
    //   return {};
    // },
  },
  mounted() {
    let that = this;
    let div1 = document.getElementsByClassName("main-body-left");
    if (that.$route.query.number) {
      that.number = that.$route.query.number;
    } else {
      that.number = 2;
    }
    window.addEventListener("scroll", () => that.checkBox());

    // if (this.gradual) {
    //   window.addEventListener("scroll", this.scroll);
    // }
    if (this.$route.query.number == 1 || this.number == 1) {
      window.scrollTo(0, 4150);
    }
    if (this.$route.query.number == 2 || this.number == 2) {
      window.scrollTo(0, 0);
    }
    if (this.$route.query.number == 3 || this.number == 3) {
      window.scrollTo(0, 7950);
    }
  },

  watch: {
    $route(to, from) {
      this.openSearch = false;
    },
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.scroll);
  },
};
</script>

<style lang="scss" scoped src="./show.scss"></style>
