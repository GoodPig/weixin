//index.js
//获取应用实例
var app = getApp()
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const system = app.getAppSysInfo()
Page({
  data: {
    tabs: ["排队取号", "大额取现", "外币取现"],
    activeIndex: "0",
    sliderOffset: 0,
    sliderLeft: 0,
    mapheight: 0,
    cur_pos: [],

    markdata: [{
      "id": "8961722031359351008", "title": "北京瑞安宾馆(公安部招待所)洗手间", "address": "北京市东城区正义路7号(近最高人民法院)", "tel": " ", "category": "基础设施:公共设施:公共厕所", "type": 0, "location": { "lat": 39.90356, "lng": 116.40657 }, "_distance": 96.75, "pano": { "id": "100135JF140414134812200", "heading": null, "pitch": null, "zoom": null }, "ad_info": { "adcode": 110101, "province": "北京市", "city": "北京市", "district": "东城区" }
    }, {
      "id": "16577367284433806072", "title": "东交民巷饭店洗手间", "address": "北京市东城区东交民巷甲23号东交民巷饭店内", "tel": " ", "category": "基础设施:公共设施:公共厕所", "type": 0, "location": { "lat": 39.90291, "lng": 116.40788 }, "_distance": 128.55, "pano": { "id": "100130Y2131114112309770", "heading": null, "pitch": null, "zoom": null }, "ad_info": { "adcode": 110101, "province": "北京市", "city": "北京市", "district": "东城区" }
    }, { "id": "7750686651005167863", "title": "公共厕所", "address": "北京市东城区东华门街道正义路", "tel": " ", "category": "基础设施:公共设施:公共厕所", "type": 0, "location": { "lat": 39.90253, "lng": 116.40699 }, "_distance": 173.01, "pano": { "id": "10011007131115144138800", "heading": null, "pitch": null, "zoom": null }, "ad_info": { "adcode": 110101, "province": "北京市", "city": "北京市", "district": "东城区" } }, { "id": "4404794621616304401", "title": "首都大酒店-洗手间", "address": "北京市东城区前门东大街3号(正义路与前门东大街交汇处东侧)", "tel": " ", "category": "基础设施:公共设施:公共厕所", "type": 0, "location": { "lat": 39.9021, "lng": 116.40855 }, "_distance": 231.93, "pano": { "id": "10011007131118153857800", "heading": null, "pitch": null, "zoom": null }, "ad_info": { "adcode": 110101, "province": "北京市", "city": "北京市", "district": "东城区" } }, { "id": "2934085403390525891", "title": "公共厕所", "address": "北京市东城区前门东大街天安招待所旁", "tel": " ", "category": "基础设施:公共设施:公共厕所", "type": 0, "location": { "lat": 39.9007, "lng": 116.40798 }, "_distance": 372.77, "pano": { "id": "10011049131129105515300", "heading": null, "pitch": null, "zoom": null }, "ad_info": { "adcode": 110101, "province": "北京市", "city": "北京市", "district": "东城区" } }, { "id": "9119297836012965012", "title": "公共厕所", "address": "北京市东城区台基厂二条北京市总工会(北京市政府东)", "tel": " ", "category": "基础设施:公共设施:公共厕所", "type": 0, "location": { "lat": 39.90483, "lng": 116.41213 }, "_distance": 403.49, "pano": { "id": "10011029131209153040900", "heading": null, "pitch": null, "zoom": null }, "ad_info": { "adcode": 110101, "province": "北京市", "city": "北京市", "district": "东城区" } }, { "id": "16051029126406057607", "title": "公共厕所", "address": "北京市东城区前门东大街北京市公安局西南50米", "tel": " ", "category": "基础设施:公共设施:公共厕所", "type": 0, "location": { "lat": 39.90095, "lng": 116.40355 }, "_distance": 482.35, "pano": { "id": "10011013150323141947000", "heading": null, "pitch": null, "zoom": null }, "ad_info": { "adcode": 110101, "province": "北京市", "city": "北京市", "district": "东城区" } }, { "id": "2488251048649581703", "title": "公共厕所", "address": "北京市东城区北京市公安局东城分局前门派出所", "tel": " ", "category": "基础设施:公共设施:公共厕所", "type": 0, "location": { "lat": 39.89911, "lng": 116.40756 }, "_distance": 547.81, "pano": { "id": "10011029131204125334300", "heading": null, "pitch": null, "zoom": null }, "ad_info": { "adcode": 110101, "province": "北京市", "city": "北京市", "district": "东城区" } }, { "id": "9313861776896815428", "title": "公共厕所", "address": "北京市东城区西打磨厂街54号附近", "tel": " ", "category": "基础设施:公共设施:公共厕所", "type": 0, "location": { "lat": 39.89899, "lng": 116.40876 }, "_distance": 570.81, "pano": { "id": "10011029131204125410100", "heading": null, "pitch": null, "zoom": null }, "ad_info": { "adcode": 110101, "province": "北京市", "city": "北京市", "district": "东城区" } }, { "id": "3630939372408279488", "title": "公共厕所", "address": "北京市东城区草厂三条临汾会馆(利群烤鸭店北50米)", "tel": " ", "category": "基础设施:公共设施:公共厕所", "type": 0, "location": { "lat": 39.89898, "lng": 116.40633 }, "_distance": 571.47, "pano": { "id": "10011029131204125257700", "heading": null, "pitch": null, "zoom": null }, "ad_info": { "adcode": 110101, "province": "北京市", "city": "北京市", "district": "东城区" } }, { "id": "18410514417958946893", "title": "公共厕所", "address": "北京市东城区南河沿大街菖蒲河公园旁(北京饭店西)", "tel": " ", "category": "基础设施:公共设施:公共厕所", "type": 0, "location": { "lat": 39.90892, "lng": 116.40546 }, "_distance": 572.32, "ad_info": { "adcode": 110101, "province": "北京市", "city": "北京市", "district": "东城区" } }, { "id": "8239806190788015951", "title": "北京饭店-洗手间", "address": "北京市东城区东长安街33号", "tel": " ", "category": "基础设施:公共设施:公共厕所", "type": 0, "location": { "lat": 39.90896, "lng": 116.41032 }, "_distance": 598.22, "pano": { "id": "100139J1140402152925000", "heading": null, "pitch": null, "zoom": null }, "ad_info": { "adcode": 110101, "province": "北京市", "city": "北京市", "district": "东城区" } }, { "id": "14816864556594848198", "title": "公共厕所", "address": "北京市东城区南河沿大街105号旁", "tel": " ", "category": "基础设施:公共设施:公共厕所", "type": 0, "location": { "lat": 39.9094, "lng": 116.40662 }, "_distance": 602.91, "pano": { "id": "10011007131115144422600", "heading": null, "pitch": null, "zoom": null }, "ad_info": { "adcode": 110101, "province": "北京市", "city": "北京市", "district": "东城区" } }, { "id": "4438544471407674475", "title": "公共厕所(新活馆)", "address": "北京市东城区东打磨厂街7号新活馆B1层", "tel": " ", "category": "基础设施:公共设施:公共厕所", "type": 0, "location": { "lat": 39.90002, "lng": 116.41266 }, "_distance": 625.67, "pano": { "id": "10011029131205145622400", "heading": null, "pitch": null, "zoom": null }, "ad_info": { "adcode": 110101, "province": "北京市", "city": "北京市", "district": "东城区" } }, { "id": "6052309123093899454", "title": "女洗手间", "address": "北京市东城区霞公府街7号附近", "tel": " ", "category": "基础设施:公共设施:公共厕所", "type": 0, "location": { "lat": 39.90948, "lng": 116.40962 }, "_distance": 632.72, "pano": { "id": "10011007131204130553200", "heading": null, "pitch": null, "zoom": null }, "ad_info": { "adcode": 110101, "province": "北京市", "city": "北京市", "district": "东城区" } }, { "id": "5035338659938611468", "title": "公共厕所", "address": "北京市东城区西打磨厂街186号附近", "tel": " ", "category": "基础设施:公共设施:公共厕所", "type": 0, "location": { "lat": 39.89914, "lng": 116.40357 }, "_distance": 640.53, "pano": { "id": "10011029131204125124100", "heading": null, "pitch": null, "zoom": null }, "ad_info": { "adcode": 110101, "province": "北京市", "city": "北京市", "district": "东城区" } }, { "id": "11455346854485288610", "title": "北京天安瑞嘉酒店-洗手间", "address": "北京市东城区南河沿大街华龙街天安大厦(近天安门广场)", "tel": " ", "category": "基础设施:公共设施:公共厕所", "type": 0, "location": { "lat": 39.90979, "lng": 116.40697 }, "_distance": 642.98, "pano": { "id": "10011007131115144428200", "heading": null, "pitch": null, "zoom": null }, "ad_info": { "adcode": 110101, "province": "北京市", "city": "北京市", "district": "东城区" } }, { "id": "17321112338344582843", "title": "公共厕所", "address": "北京市东城区东长安街16号天安门广场东侧中国国家博物馆内", "tel": " ", "category": "基础设施:公共设施:公共厕所", "type": 0, "location": { "lat": 39.90626, "lng": 116.40052 }, "_distance": 647.62, "ad_info": { "adcode": 110101, "province": "北京市", "city": "北京市", "district": "东城区" } }, { "id": "3534111118132400138", "title": "男洗手间", "address": "北京市东城区王府井大街301号新燕莎金街购物广场F5", "tel": " ", "category": "基础设施:公共设施:公共厕所", "type": 0, "location": { "lat": 39.90938, "lng": 116.41051 }, "_distance": 647.96, "pano": { "id": "10011007131204130542400", "heading": null, "pitch": null, "zoom": null }, "ad_info": { "adcode": 110101, "province": "北京市", "city": "北京市", "district": "东城区" } }, { "id": "1665934838323831977", "title": "公共厕所", "address": "北京市东城区中国国家博物馆", "tel": " ", "category": "基础设施:公共设施:公共厕所", "type": 0, "location": { "lat": 39.90395, "lng": 116.3998 }, "_distance": 659.39, "pano": { "id": "10011007131118114918700", "heading": null, "pitch": null, "zoom": null }, "ad_info": { "adcode": 110101, "province": "北京市", "city": "北京市", "district": "东城区" } }],

    controls: [{
      id: 1,
      iconPath: '/resources/u11.png',
      position: {
        left: 10,
        top: system.windowHeight - 100,
        width: 20,
        height: 20
      },
      clickable: true
    }, {
      id: 2,
      iconPath: '/resources/my_hl.png',
      position: {
        left: system.windowWidth - 50,
        top: system.windowHeight - 100,
        width: 40,
        height: 20
      },
      clickable: false
    }]
  },
  controltap(e) {
    console.log("重新定位,id:" + e.controlId)
    this.onLoad()
    this.mapCtx.moveToLocation()
    // wx.getLocation({
    //   type: 'wgs84',
    //   success: (res) => {
    //     this.setData({
    //       cur_pos: [res.longitude, res.latitude]
    //     })
    //     console.log(res.longitude, res.latitude)
    //   }
    // })
  },
  regionchange(e) {
    console.log(e)
    //this.onLoad()
  },
  markertap(e) {
    console.log(e)
    let mark = {}
    this.data.markers.map((ele) => {
      if (ele.id == e.markerId)
        mark = ele
    })
    wx.navigateTo({
      url: '../logs/logs?lat=' + mark.latitude + '&lng=' + mark.longitude + '&address=' + mark.address + '&distance=' + mark._distance
    })
    return
    wx.showModal({
      title: '厕所地址',
      content: mark.address + ' (' + mark._distance.toFixed(0) + 'm)',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },
  onLoad() {
    console.log("load")
    this.setData({
      mapheight: system.windowHeight - 50,
      sliderLeft: (system.windowWidth / this.data.tabs.length - sliderWidth) / 2
    })
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        this.setData({
          cur_pos: [res.longitude, res.latitude]
        })
        console.log(res.longitude, res.latitude)
        wx.request({
          url: 'https://api.getweapp.com/vendor/qqmap/search/toilet',
          data: {
            lat: res.latitude,
            lng: res.longitude,
            page: 1
          },
          success: (res) => {
            res.data.data.map((e) => {
              e.iconPath = "/resources/location.png"
              e.width = 20
              e.height = 20
              e.latitude = e.location.lat
              e.longitude = e.location.lng
            })
            this.setData({
              markers: res.data.data
            })
            console.log(res.data.data)
          }
        })
      }
    })
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('myMap')
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
})


