//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    src:'',
    address: '',
    distance: ''
  },
  onLoad: function (options) {
    this.setData({
      src: 'http://apis.map.qq.com/ws/streetview/v1/image?size=640x480&location='+options.lat+','+options.lng+'&pitch=-15&heading=119&key=EDWBZ-OTZ3R-YFPWJ-WA4ZS-4WK33-34F4U',
      address: options.address,
      distance: options.distance+'米'
    })
  }
})
