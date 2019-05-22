<template>
<div>
    <wxhtml:view class="container">
    <wxhtml:swiper class="goodsimgs" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
        <wxhtml:swiper-item v-for="(item, index) of gallery" :key="item.id" :data-index="index">
        <img :src="item.img_url" background-size="cover"/>
        </wxhtml:swiper-item>
    </wxhtml:swiper>
    <wxhtml:view class="service-policy">
        <wxhtml:view class="item">30天无忧退货</wxhtml:view>
        <wxhtml:view class="item">48小时快速退款</wxhtml:view>
        <wxhtml:view class="item">满88元免邮费</wxhtml:view>
    </wxhtml:view>
    <wxhtml:view class="goods-info">
        <wxhtml:view class="c">
        <wxhtml:text class="name">{{goods.name}}</wxhtml:text>
        <wxhtml:text class="desc">{{goods.goods_brief}}</wxhtml:text>
        <wxhtml:text class="price">￥{{goods.retail_price}}</wxhtml:text>
        <wxhtml:view class="brand" v-if="brand.name">
            <wxhtml:navigator :url="'../brand/brandDetail?id=' + brand.id">
            <wxhtml:text>{{brand.name}}</wxhtml:text>
            </wxhtml:navigator>
        </wxhtml:view>
        </wxhtml:view>
    </wxhtml:view>
    <wxhtml:view class="section-nav section-attr" @click="switchAttrPop">
        <wxhtml:view class="t">请选择规格数量</wxhtml:view>
        <img class="i" src="/static/images/address_right.png" background-size="cover"/>
    </wxhtml:view>
    <wxhtml:view class="section-nav section-act">
        <wxhtml:view class="t">
            <wxhtml:view class="label">1个促销:</wxhtml:view>
            <wxhtml:view class="tag">万圣趴</wxhtml:view>
            <wxhtml:view class="text">全场满499，额外送糖果</wxhtml:view>
        </wxhtml:view>
        <img class="i" src="/static/images/address_right.png" background-size="cover"/>
    </wxhtml:view>
    <wxhtml:view class="comments" v-if="comment.count > 0">
        <wxhtml:view class="h">
        <wxhtml:navigator :url="'../comment/comment?valueId=' + goods.id + '&typeId=0'">
            <wxhtml:text class="t">评价({{comment.count > 999 ? '999+' : comment.count}})</wxhtml:text>
            <wxhtml:text class="i">查看全部</wxhtml:text>
        </wxhtml:navigator>
        </wxhtml:view>
        <wxhtml:view class="b">
        <wxhtml:view class="item">
            <wxhtml:view class="info">
            <wxhtml:view class="user">
                <img :src="comment.data.avatar"/>
                <wxhtml:text>{{comment.data.nickname}}</wxhtml:text>
            </wxhtml:view>
            <wxhtml:view class="time">{{comment.data.add_time}}</wxhtml:view>
            </wxhtml:view>
            <wxhtml:view class="content">
            {{comment.data.content}}
            </wxhtml:view>
            <wxhtml:view class="imgs" v-if="comment.data.pic_list.length">
            <image class="img" v-for="(item, index) of comment.data.pic_list" :key="item.id" :data-index="index" :src="item.pic_url"/>
            </wxhtml:view>
            <wxhtml:view class="spec">白色 2件</wxhtml:view>
        </wxhtml:view>
        </wxhtml:view>
    </wxhtml:view>
    <wxhtml:view class="goods-attr">
        <wxhtml:view class="t">商品参数</wxhtml:view>
        <wxhtml:view class="l">
        <wxhtml:view class="item" v-for="(item, index) of attribute" :key="item.name" :data-index="index">
            <wxhtml:text class="left">{{item.name}}</wxhtml:text>
            <wxhtml:text class="right">{{item.value}}</wxhtml:text>
        </wxhtml:view>
        </wxhtml:view>
    </wxhtml:view>
    <wxhtml:view>
        <!-- <wxParse :content="goodDetailHTMLstr" /> -->
        {{goodDetailHTMLstr}}
    </wxhtml:view>
    <wxhtml:view class="common-problem">
        <wxhtml:view class="h">
        <wxhtml:view class="line"></wxhtml:view>
        <wxhtml:text class="title">常见问题</wxhtml:text>
        </wxhtml:view>
        <wxhtml:view class="b">
        <wxhtml:view class="item" v-for="(item, index) of issueList" :key="item.id" :data-index="index">
            <wxhtml:view class="question-box">
            <wxhtml:text class="spot"></wxhtml:text>
            <wxhtml:text class="question">{{item.question}}</wxhtml:text>
            </wxhtml:view>
            <wxhtml:view class="answer">
            {{item.answer}}
            </wxhtml:view>
        </wxhtml:view>
        </wxhtml:view>
    </wxhtml:view>

    <wxhtml:view class="related-goods" v-if="relatedGoods.length">
        <wxhtml:view class="h">
        <wxhtml:view class="line"></wxhtml:view>
        <wxhtml:text class="title">大家都在看</wxhtml:text>
        </wxhtml:view>
        <wxhtml:view class="b">
        <wxhtml:view class="item" v-for="(item, index) of relatedGoods" :key="item.id" :data-index="index">
            <wxhtml:navigator :url="'/pages/goods/goods?id=' + item.id">
            <img class="img" :src="item.list_pic_url" background-size="cover"/>
            <wxhtml:text class="name">{{item.name}}</wxhtml:text>
            <wxhtml:text class="price">￥{{item.retail_price}}</wxhtml:text>
            </wxhtml:navigator>
        </wxhtml:view>
        </wxhtml:view>
    </wxhtml:view>
    </wxhtml:view>
    <wxhtml:view class="attr-pop-box" :hidden="!openAttr" v-show="openAttr">
    <wxhtml:view class="attr-pop">
        <wxhtml:view class="close" @click="closeAttr">
        <img class="icon" src="/static/images/icon_close.png"/>
        </wxhtml:view>
        <wxhtml:view class="img-info">
        <img class="img" :src="gallery[0].img_url"/>
        <wxhtml:view class="info">
            <wxhtml:view class="c">
            <wxhtml:view class="p">价格：￥{{goods.retail_price}}</wxhtml:view>
            <wxhtml:view class="a" v-if="productList.length">已选择：{{checkedSpecText}}</wxhtml:view>
            </wxhtml:view>
        </wxhtml:view>
        </wxhtml:view>
        <wxhtml:view class="spec-con">
        <wxhtml:view class="spec-item" v-for="(item, index) of specificationList" :key="item.specification_id" :data-index="index">
            <wxhtml:view class="name">{{item.name}}</wxhtml:view>
            <wxhtml:view class="values">
            <wxhtml:view :class="iitem.checked ? 'selected value' : 'value'" @click="clickSkuValue" v-for="(iitem, iindex) of item.valueList" :key="iitem.id" :data-value-id="iitem.id" :data-index="iindex" :data-name-id="iitem.specification_id">{{iitem.value}}</wxhtml:view>
            </wxhtml:view>
        </wxhtml:view>
        <wxhtml:view class="number-item">
            <wxhtml:view class="name">数量</wxhtml:view>
            <wxhtml:view class="selnum">
            <wxhtml:view class="cut" @click="cutNumber">-</wxhtml:view>
            <input :value="number" class="number" disabled="true" type="number" />
            <wxhtml:view class="add" @click="addNumber">+</wxhtml:view>
            </wxhtml:view>
        </wxhtml:view>
        </wxhtml:view>
    </wxhtml:view>
    </wxhtml:view>
    <wxhtml:view class="bottom-btn">
    <wxhtml:view class="l l-collect" @click="addCannelCollect">
        <img class="icon" :src="collectBackImage"/>
    </wxhtml:view>
    <wxhtml:view class="l l-cart">
        <wxhtml:view class="box">
        <wxhtml:text class="cart-count">{{cartGoodsCount}}</wxhtml:text>
        <img @click="openCartPage" class="icon" src="/static/images/ic_menu_shoping_nor.png"/>
        </wxhtml:view>
    </wxhtml:view>
    <wxhtml:view class="c">立即购买</wxhtml:view>
    <wxhtml:view class="r" @click="addToCart">加入购物车</wxhtml:view>
    </wxhtml:view>
</div>
</template>

<script>
/* eslint-disable */
import api from '@/utils/api'
// import wx from '@/utils/wx'
// import test from '@/utils/test'
// import wxParse from 'mpvue-wxparse'

export default {
  components: {
    // wxParse
  },
  data () {
    return {
      id: 0,
      goods: {},
      gallery: [{ img_url: '' }],
      attribute: [],
      issueList: [],
      comment: [],
      brand: {},
      specificationList: [],
      productList: [],
      relatedGoods: [],
      cartGoodsCount: 0,
      userHasCollect: 0,
      number: 1,
      checkedSpecText: '请选择规格数量',
      openAttr: false,
      noCollectImage: '/static/images/icon_collect.png',
      hasCollectImage: '/static/images/icon_collect_checked.png',
      collectBackImage: '/static/images/icon_collect.png',
      goodDetailHTMLstr: ''
    }
  },
  async mounted () {
    if (this.$route.query.id) {
      this.id = parseInt(this.$route.query.id);
    }
    await Promise.all([
      this.getGoodsInfo()
    ]);
    const res = await api.getCartGoodsCount();
    // console.log('购物车商品数量,请求结果', res);
    if (res.errno === 0) {
      this.cartGoodsCount = res.data.cartTotal.goodsCount;
    }
  },
  methods: {
    // 获取商品详情
    async getGoodsInfo () {
      const res = await api.getGoodsDetail({ id: this.id });
      // console.log('商品详情,请求结果', res);
      if (res.errno === 0) {
        this.goods = res.data.info;
        this.gallery = res.data.gallery.length > 0 ? res.data.gallery : [{ img_url: '/static/images/icon_error.png' }];
        this.attribute = res.data.attribute;
        this.issueList = res.data.issue;
        this.comment = res.data.comment;
        this.brand = res.data.brand;
        this.specificationList = res.data.specificationList;
        this.productList = res.data.productList;
        this.userHasCollect = res.data.userHasCollect;
        if (res.data.userHasCollect === 1) {
          this.collectBackImage = this.hasCollectImage;
        } else {
          this.collectBackImage = this.noCollectImage;
        }
        // wxParse的内容
        this.goodDetailHTMLstr = res.data.info.goods_desc ? res.data.info.goods_desc : '暂无详情数据';
        // 取“相关商品推荐”信息
        // this.getGoodsRelated();
      }
    },
    // 获得“相关商品推荐”信息
    async getGoodsRelated () {
      const res = await api.getGoodsRelated({ id: this.id });
      // console.log('相关商品推荐', res);
      if (res.errno === 0) {
        this.relatedGoods = res.data.goodsList;
      }
    },
    // 规格弹窗中，每个规则项的点击事件
    clickSkuValue (event) {
      let specNameId = event.currentTarget.dataset.nameId;
      let specValueId = event.currentTarget.dataset.valueId;
      // 判断是否可以点击
      // TODO 性能优化，可在v-for中添加index，可以直接获取点击的属性名和属性值，不用循环
      let _specificationList = this.specificationList;
      for (let i = 0; i < _specificationList.length; i++) {
        if (_specificationList[i].specification_id === specNameId) {
          for (let j = 0; j < _specificationList[i].valueList.length; j++) {
            if (_specificationList[i].valueList[j].id === specValueId) {
              // 如果已经选中，则反选
              if (_specificationList[i].valueList[j].checked) {
                _specificationList[i].valueList[j].checked = false;
              } else {
                _specificationList[i].valueList[j].checked = true;
              }
            } else {
              _specificationList[i].valueList[j].checked = false;
            }
          }
        }
      }
      this.specificationList = _specificationList;
      // 重新计算spec改变后的信息
      this.changeSpecInfo();
      // 重新计算哪些值不可以点击
    },
    // 获取选中的规格信息,存到数组中，其他方法有3处调用
    getCheckedSpecValue () {
      let checkedValues = [];
      let _specificationList = this.specificationList;
      for (let i = 0; i < _specificationList.length; i++) {
        let _checkedObj = {
          nameId: _specificationList[i].specification_id,
          valueId: 0,
          valueText: ''
        };
        for (let j = 0; j < _specificationList[i].valueList.length; j++) {
          if (_specificationList[i].valueList[j].checked) {
            _checkedObj.valueId = _specificationList[i].valueList[j].id;
            _checkedObj.valueText = _specificationList[i].valueList[j].value;
          }
        }
        checkedValues.push(_checkedObj);
      }
      return checkedValues;
    },
    // 根据已选的值，计算其它值的状态
    setSpecValueStatus () {

    },
    // 判断规格是否选择完整(每一种至少选择一项)，加入购物车前进行判断
    isCheckedAllSpec () {
      return !this.getCheckedSpecValue().some(function (v) {
        if (v.valueId === 0) {
          return true;
        }
      });
    },
    // 拿到规格的key，库存判断时调用
    getCheckedSpecKey () {
      let checkedValue = this.getCheckedSpecValue().map(function (v) {
        return v.valueId;
      });
      // console.log('getCheckedSpecKey', checkedValue.join('_'));
      return checkedValue.join('_');
    },
    // 每次点击规格项，重新计算规格的信息
    changeSpecInfo () {
      let checkedNameValue = this.getCheckedSpecValue();
      // 设置选择的信息
      let checkedValue = checkedNameValue.filter(function (v) {
        if (v.valueId !== 0) {
          return true;
        } else {
          return false;
        }
      }).map(function (v) {
        return v.valueText;
      });
      if (checkedValue.length > 0) {
        this.checkedSpecText = checkedValue.join('　');
      } else {
        this.checkedSpecText = '请选择规格数量';
      }
    },
    // 判断库存时调用，key是计算我们选择的规则，类似1_3_7
    getCheckedProductItem (key) {
      // console.log('this.data.productList', this.data.productList);
      return this.productList.filter(function (v) {
        if (v.goods_specification_ids === key) {
          return true;
        } else {
          return false;
        }
      });
    },
    // 打开商品规格选择弹窗
    switchAttrPop () {
      if (this.openAttr === false) {
        this.openAttr = !this.openAttr;
      }
    },
    // 关闭规格弹窗
    closeAttr () {
      console.log('closeAttr');
      this.openAttr = false;
    },
    // 购物车的五角星，添加或是取消收藏
    async addCannelCollect () {
      const res = await api.CollectAddOrDelete({ typeId: 0, valueId: this.id });
      // console.log('添加或取消收藏', res);
      if (res.errno === 0) {
        if (res.data.type === 'add') {
          this.collectBackImage = this.hasCollectImage;
        } else {
          this.collectBackImage = this.noCollectImage;
        }
      } else {
        wx.showToast({
          image: '/static/images/icon_error.png',
          title: res.errmsg,
          mask: true
        });
      }
    },
    // 跳转到购物车页面
    openCartPage () {
      wx.switchTab({
        url: '/pages/cart/cart'
      });
    },
    // 加入购物车，多种判断哦~
    async addToCart () {
      if (this.openAttr === false) {
        // 打开规格选择弹窗
        this.openAttr = !this.openAttr;
      } else {
        // 提示选择完整规格
        if (!this.isCheckedAllSpec()) {
          wx.showToast({
            image: '/static/images/icon_error.png',
            title: '规格选择不完整',
            mask: true
          });
          return false;
        }
        // 根据选中的规格，判断是否有对应的sku信息
        let checkedProduct = this.getCheckedProductItem(this.getCheckedSpecKey());
        // console.log('checkedProduct', checkedProduct);
        // 验证商品型号
        if (!checkedProduct || checkedProduct.length <= 0) {
          // 提示没有库存
          wx.showToast({
            image: '/static/images/icon_error.png',
            title: '库存型号不足',
            mask: true
          });
          return false;
        }
        // 验证商品数量
        if (checkedProduct.goods_number < this.number) {
          wx.showToast({
            image: '/static/images/icon_error.png',
            title: '库存数量不足',
            mask: true
          });
          return false;
        }
        // 添加到购物车
        const res = await api.CartAdd({ goodsId: this.goods.id, number: this.number, productId: checkedProduct[0].id });
        // console.log('添加到购物车，请求结果', res);
        if (res.errno === 0) {
          wx.showToast({
            title: '添加成功'
          });
          this.openAttr = !this.openAttr;
          this.cartGoodsCount = res.data.cartTotal.goodsCount;
        } else {
          wx.showToast({
            image: '/static/images/icon_error.png',
            title: res.errmsg,
            mask: true
          });
        }
      }
    },
    // 减少数量
    cutNumber () {
      this.number = (this.number - 1 > 1) ? this.number - 1 : 1;
    },
    // 增加数量
    addNumber () {
      this.number = this.number + 1;
    }
  },
  // 原生的分享功能
  onShareAppMessage: function () {
    return {
      title: 'xbyjShop',
      desc: '仿网易严选小程序商城',
      path: '/pages/goods/goods'
    }
  }
}
</script>

<style lang="less">
@rpx: 32rem;

wxhtml\:view {
  display: block;
  /* box-sizing: border-box; */
  word-break: break-all;
  /* overflow:auto; */
}

.container {
  margin-bottom: 100/@rpx;
}

.goodsimgs {
  width: 750/@rpx;
  height: 750/@rpx;
}

.goodsimgs image {
  width: 750/@rpx;
  height: 750/@rpx;
  background-color: #eee;
}

.service-policy {
  width: 720/@rpx;
  height: 73/@rpx;
  background: #f4f4f4;
  padding: 0 15/@rpx;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
}

.service-policy .item {
  background: url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/servicePolicyRed-518d32d74b.png) 0 center no-repeat;
  background-size: 10/@rpx;
  padding-left: 15/@rpx;
  display: flex;
  align-items: center;
  font-size: 25/@rpx;
  color: #666;
}

.goods-info {
  width: 750/@rpx;
  height: 306/@rpx;
  overflow: hidden;
  background: #fff;
}

.goods-info .c {
  display: block;
  width: 720/@rpx;
  height: 100%;
  margin-left: 15/@rpx;
  padding: 38/@rpx 15/@rpx 38/@rpx 0;
  border-bottom: 1px solid #f4f4f4;
}

.goods-info .c text {
  display: block;
  width: 687.5/@rpx;
  text-align: center;
}

.goods-info .name {
  height: 41/@rpx;
  margin-bottom: 5.208/@rpx;
  font-size: 41/@rpx;
  line-height: 41/@rpx;
}

.goods-info .desc {
  height: 43/@rpx;
  margin-bottom: 41/@rpx;
  font-size: 24/@rpx;
  line-height: 36/@rpx;
  color: #999;
}

.goods-info .price {
  height: 35/@rpx;
  font-size: 35/@rpx;
  line-height: 35/@rpx;
  color: #b4282d;
}

.goods-info .brand {
  margin-top: 23/@rpx;
  min-height: 40/@rpx;
  text-align: center;
}

.goods-info .brand text {
  display: inline-block;
  width: auto;
  padding: 2px 30/@rpx 2px 10.5/@rpx;
  line-height: 35.5/@rpx;
  border: 1px solid #f48f18;
  font-size: 25/@rpx;
  color: #f48f18;
  border-radius: 4px;
  background: url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/detailTagArrow-18bee52dab.png) 95% center no-repeat;
  background-size: 10.75/@rpx 18.75/@rpx;
}

.section-nav {
  width: 750/@rpx;
  height: 108/@rpx;
  background: #fff;
  margin-bottom: 20/@rpx;
}

.section-nav .t {
  float: left;
  width: 600/@rpx;
  height: 108/@rpx;
  line-height: 108/@rpx;
  font-size: 29/@rpx;
  color: #333;
  margin-left: 31.25/@rpx;
}

.section-nav .i {
  float: right;
  width: 52/@rpx;
  height: 52/@rpx;
  margin-right: 16/@rpx;
  margin-top: 28/@rpx;
}

.section-act .t {
  float: left;
  display: flex;
  align-items: center;
  width: 600/@rpx;
  height: 108/@rpx;
  overflow: hidden;
  line-height: 108/@rpx;
  font-size: 29/@rpx;
  color: #999;
  margin-left: 31.25/@rpx;
}

.section-act .label {
  color: #999;
}

.section-act .tag {
  display: flex;
  align-items: center;
  padding: 0 10/@rpx;
  border-radius: 3px;
  height: 37/@rpx;
  width: auto;
  color: #f48f18;
  overflow: hidden;
  border: 1px solid #f48f18;
  font-size: 25/@rpx;
  margin: 0 10/@rpx;
}

.section-act .text {
  display: flex;
  align-items: center;
  height: 37/@rpx;
  width: auto;
  overflow: hidden;
  color: #f48f18;
  font-size: 29/@rpx;
}

.comments {
  width: 720/@rpx;
  height: auto;
  padding-left: 30/@rpx;
  background: #fff;
  margin: 20/@rpx 0;
}

.comments .h {
  height: 102.5/@rpx;
  line-height: 100.5/@rpx;
  width: 718.75/@rpx;
  padding-right: 16/@rpx;
  border-bottom: 1px solid #d9d9d9;
}

.comments .h .t {
  display: block;
  float: left;
  width: 50%;
  font-size: 38.5/@rpx;
  color: #333;
}

.comments .h .i {
  display: block;
  float: right;
  width: 164/@rpx;
  height: 100.5/@rpx;
  line-height: 100.5/@rpx;
  background: url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/address-right-990628faa7.png) right center no-repeat;
  background-size: 52/@rpx;
}

.comments .b {
  height: auto;
  width: 720/@rpx;
}

.comments .item {
  height: auto;
  width: 720/@rpx;
  overflow: hidden;
}

.comments .info {
  height: 127/@rpx;
  width: 100%;
  padding: 33/@rpx 0 27/@rpx 0;
}

.comments .user {
  float: left;
  width: auto;
  height: 67/@rpx;
  line-height: 67/@rpx;
  font-size: 0;
}

.comments .user image {
  float: left;
  width: 67/@rpx;
  height: 67/@rpx;
  margin-right: 17/@rpx;
  border-radius: 50%;
}

.comments .user text {
  display: inline-block;
  width: auto;
  height: 66/@rpx;
  overflow: hidden;
  font-size: 29/@rpx;
  line-height: 66/@rpx;
}

.comments .time {
  display: block;
  float: right;
  width: auto;
  height: 67/@rpx;
  line-height: 67/@rpx;
  color: #7f7f7f;
  font-size: 25/@rpx;
  margin-right: 30/@rpx;
}

.comments .content {
  width: 720/@rpx;
  padding-right: 30/@rpx;
  line-height: 45.8/@rpx;
  font-size: 29/@rpx;
  margin-bottom: 24/@rpx;
}

.comments .imgs {
  width: 720/@rpx;
  height: auto;
  margin-bottom: 25/@rpx;
}

.comments .imgs .img {
  height: 150/@rpx;
  width: 150/@rpx;
  margin-right: 28/@rpx;
}

.comments .spec {
  width: 720/@rpx;
  padding-right: 30/@rpx;
  line-height: 30/@rpx;
  font-size: 24/@rpx;
  color: #999;
  margin-bottom: 30/@rpx;
}

.goods-attr {
  width: 720/@rpx;
  height: auto;
  overflow: hidden;
  padding: 0 15/@rpx 25/@rpx 15/@rpx;
  background: #fff;
}

.goods-attr .t {
  width: 687.5/@rpx;
  height: 104/@rpx;
  line-height: 104/@rpx;
  font-size: 38.5/@rpx;
  margin-left: 10/@rpx;
}

.goods-attr .item {
  width: 687.5/@rpx;
  height: 68/@rpx;
  padding: 11/@rpx 20/@rpx;
  margin-bottom: 11/@rpx;
  background: #f7f7f7;
  font-size: 38.5/@rpx;
  margin-left: 10/@rpx;
}

.goods-attr .left {
  float: left;
  font-size: 25/@rpx;
  width: 134/@rpx;
  height: 45/@rpx;
  line-height: 45/@rpx;
  overflow: hidden;
  color: #999;
}

.goods-attr .right {
  float: left;
  font-size: 36.5/@rpx;
  margin-left: 20/@rpx;
  width: 480/@rpx;
  height: 45/@rpx;
  line-height: 45/@rpx;
  overflow: hidden;
  color: #333;
}

.wxParse view {
    margin-bottom: -15/@rpx;
}

.detail {
  width: 750/@rpx;
  height: auto;
  overflow: hidden;
}

.detail image {
  width: 750/@rpx;
  display: block;
}

.common-problem {
  width: 750/@rpx;
  height: auto;
  overflow: hidden;
}

.common-problem .h {
  position: relative;
  height: 145.5/@rpx;
  width: 750/@rpx;
  padding: 56.25/@rpx 0;
  background: #fff;
  text-align: center;
}

.common-problem .h .line {
  display: inline-block;
  position: absolute;
  top: 72/@rpx;
  left: 0;
  z-index: 2;
  height: 1px;
  margin-left: 225/@rpx;
  width: 300/@rpx;
  background: #ccc;
}

.common-problem .h .title {
  display: inline-block;
  position: absolute;
  top: 56.125/@rpx;
  left: 0;
  z-index: 3;
  height: 33/@rpx;
  margin-left: 285/@rpx;
  width: 180/@rpx;
  background: #fff;
}

.common-problem .b {
  width: 720/@rpx;
  height: auto;
  overflow: hidden;
  padding: 0/@rpx 15/@rpx;
  background: #fff;
}

.common-problem .item {
  height: auto;
  overflow: hidden;
  padding-bottom: 25/@rpx;
}

.common-problem .question-box .spot {
  float: left;
  display: block;
  height: 8/@rpx;
  width: 8/@rpx;
  background: #b4282d;
  border-radius: 50%;
  margin-top: 11/@rpx;
}

.common-problem .question-box .question {
  /* float: left; */
  line-height: 30/@rpx;
  padding-left: 20/@rpx;
  display: block;
  font-size: 26/@rpx;
  padding-bottom: 15/@rpx;
  color: #303030;
}

.common-problem .answer {
  line-height: 36/@rpx;
  padding-left: 16/@rpx;
  font-size: 26/@rpx;
  color: #787878;
}

.related-goods {
  width: 750/@rpx;
  height: auto;
  overflow: hidden;
}

.related-goods .h {
  position: relative;
  height: 145.5/@rpx;
  width: 750/@rpx;
  padding: 56.25/@rpx 0;
  background: #fff;
  text-align: center;
  border-bottom: 1px solid #f4f4f4;
}

.related-goods .h .line {
  display: inline-block;
  position: absolute;
  top: 72/@rpx;
  left: 0;
  z-index: 2;
  height: 1px;
  margin-left: 225/@rpx;
  width: 300/@rpx;
  background: #ccc;
}

.related-goods .h .title {
  display: inline-block;
  position: absolute;
  top: 56.125/@rpx;
  left: 0;
  z-index: 3;
  height: 33/@rpx;
  margin-left: 285/@rpx;
  width: 200/@rpx;
  background: #fff;
}

.related-goods .b {
  width: 750/@rpx;
  height: auto;
  overflow: hidden;
}

.related-goods .b .item {
  float: left;
  background: #fff;
  width: 312/@rpx;
  height: auto;
  overflow: hidden;
  text-align: center;
  padding: 15/@rpx 31.25/@rpx;
  border-right: 1px solid #f4f4f4;
  border-bottom: 1px solid #f4f4f4;
}

.related-goods .item .img {
  width: 311.45/@rpx;
  height: 311.45/@rpx;
}

.related-goods .item .name {
  display: block;
  width: 311.45/@rpx;
  height: 35/@rpx;
  margin: 11.5/@rpx 0 15/@rpx 0;
  text-align: center;
  overflow: hidden;
  font-size: 30/@rpx;
  color: #333;
}

.related-goods .item .price {
  display: block;
  width: 311.45/@rpx;
  height: 30/@rpx;
  text-align: center;
  font-size: 30/@rpx;
  color: #b4282d;
}

.bottom-btn {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 10;
  width: 750/@rpx;
  height: 100/@rpx;
  display: flex;
  background: #fff;
}

.bottom-btn .l {
  float: left;
  height: 100/@rpx;
  width: 162/@rpx;
  border: 1px solid #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bottom-btn .l.l-collect {
  border-right: none;
  border-left: none;
  text-align: center;
}

.bottom-btn .l.l-cart .box {
  position: relative;
  height: 60/@rpx;
  width: 60/@rpx;
}

.bottom-btn .l.l-cart .cart-count {
  height: 28/@rpx;
  width: 28/@rpx;
  z-index: 10;
  position: absolute;
  top: 0;
  right: 0;
  background: #b4282d;
  text-align: center;
  font-size: 18/@rpx;
  color: #fff;
  line-height: 28/@rpx;
  border-radius: 50%;
}

.bottom-btn .l.l-cart .icon {
  position: absolute;
  top: 10/@rpx;
  left: 0;
}

.bottom-btn .l .icon {
  display: block;
  height: 44/@rpx;
  width: 44/@rpx;
}

.bottom-btn .c {
  float: left;
  height: 100/@rpx;
  line-height: 96/@rpx;
  flex: 1;
  text-align: center;
  color: #333;
  border-top: 1px solid #f4f4f4;
  border-bottom: 1px solid #f4f4f4;
}

.bottom-btn .r {
  border: 1px solid #b4282d;
  background: #b4282d;
  float: left;
  height: 100/@rpx;
  line-height: 96/@rpx;
  flex: 1;
  text-align: center;
  color: #fff;
}

.attr-pop-box {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, .5);
  z-index: 8;
  bottom: 0;
  /* display: none; */
}

.attr-pop {
  width: 700/@rpx;
  height: auto;
  max-height: 780/@rpx;
  padding: 31.25/@rpx 30/@rpx;
  background: #fff;
  position: fixed;
  z-index: 9;
  bottom: 100/@rpx;
  overflow-y: auto;
}

.attr-pop .close {
  position: absolute;
  width: 48/@rpx;
  height: 48/@rpx;
  right: 48/@rpx;
  overflow: hidden;
  top: 31.25/@rpx;
}

.attr-pop .close .icon {
  width: 48/@rpx;
  height: 48/@rpx;
}

.attr-pop .img-info {
  width: 687.5/@rpx;
  height: 177/@rpx;
  overflow: hidden;
  margin-bottom: 41.5/@rpx;
}

.attr-pop .img {
  float: left;
  height: 177/@rpx;
  width: 177/@rpx;
  background: #f4f4f4;
  margin-right: 31.25/@rpx;
}

.attr-pop .info {
  float: left;
  height: 177/@rpx;
  width: 440/@rpx;
  display: flex;
  align-items: center;
}

.attr-pop .p {
  font-size: 33/@rpx;
  color: #333;
  height: 33/@rpx;
  line-height: 33/@rpx;
  margin-bottom: 10/@rpx;
}

.attr-pop .a {
  font-size: 29/@rpx;
  color: #333;
  height: 40/@rpx;
  line-height: 40/@rpx;
}

.spec-con {
  width: 100%;
  height: auto;
  overflow: hidden;
}

.spec-con .name {
  height: 32/@rpx;
  margin-bottom: 22/@rpx;
  font-size: 29/@rpx;
  color: #333;
}

.spec-con .values {
  height: auto;
  margin-bottom: 31.25/@rpx;
  font-size: 0;
}

.spec-con .value {
  display: inline-block;
  height: 62/@rpx;
  padding: 0 35/@rpx;
  line-height: 56/@rpx;
  text-align: center;
  margin-right: 25/@rpx;
  margin-bottom: 16.5/@rpx;
  border: 1px solid #333;
  font-size: 25/@rpx;
  color: #333;
}

.spec-con .value.disable {
  border: 1px solid #ccc;
  color: #ccc;
}

.spec-con .value.selected {
  border: 1px solid #b4282d;
  color: #b4282d;
}

.number-item .selnum {
  width: 500/@rpx;
  height: 71/@rpx;
  border: 1px solid #ccc;
  display: flex;
}

.number-item .cut {
  width: 93.75/@rpx;
  height: 100%;
  text-align: center;
  line-height: 65/@rpx;
}

.number-item .number {
  flex: 1;
  height: 100%;
  text-align: center;
  line-height: 68.75/@rpx;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  float: left;
}

.number-item .add {
  width: 93.75/@rpx;
  height: 100%;
  text-align: center;
  line-height: 65/@rpx;
}

</style>
