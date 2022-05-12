<template>
  <div class="screen-tags-filter">
    <div class="toptags">
      <div class="condation" v-show="showCondation">
        <span class="bread">
          <!--<template>-->
            <!--<span v-if="filterTitle">精品案例</span>-->
            <!--<span v-else></span>-->
          <!--</template>-->
          <span class="arrow" v-show="showArrow && filterTitle">
            <img src="@/assets/images/case/bread.png" alt />
          </span>
        </span>
        <ul class="tags clear">
          <li
            v-for="(item, index) in search"
            :key="index"
            @click="clearTag(index, item)"
          >
            {{ item.name }}
            <img src="@/assets/images/case/tagClose.png" alt />
          </li>
        </ul>
      </div>
    </div>
    <ul class="types-w" ref="typesw">
      <li v-for="(item, index) in selectData" :key="index">
        <div class="tip">{{ item.name }}：</div>
        <div class="content-w">
          <div class="content" :class="{hiddenMore: item.more && !tagOpen[index]}">
            <span
              v-if="item.name == '分类'"
              v-for="(opt, idx) in typeList"
              :key="idx"
              :class="{ active: isActive(item.value, opt) }"
              @click="selctChange(item.value, opt, 'typeId', idx)"
              >{{ opt.typeName }}</span
            >
            <span
              v-if="item.name == '面积'"
              v-for="(opt, idx) in areaList"
              :key="idx"
              :class="{ active: isActive(item.value, opt) }"
              @click="selctChange(item.value, opt, 'id', idx)"
              >{{ opt.name }}</span
            >
            <span
              v-if="item.name == '类型'"
              v-for="(opt, idx) in moldList"
              :key="idx"
              :class="{ active: isActive(item.value, opt) }"
              @click="selctChange(item.value, opt, 'id', idx)"
              >{{ opt.name }}</span
            >
            <span
              v-if="item.name == '行业'"
              v-for="(opt, idx) in styleList"
              :key="idx"
              :class="{ active: isActive(item.value, opt) }"
              @click="selctChange(item.value, opt, 'styleId', idx)"
              >{{ opt.styleName }}</span
            >
          </div>
        </div>
        <div class="more-w">
          <div
            class="more"
            v-if="item.more"
            @click="togoMore(index)"
            :class="{ close: tagOpen[index] }">
            {{ tagOpen[index] ? "收起" : "更多" }}
            <img src="@/assets/images/case/bread.png" alt />
          </div>
        </div>
      </li>
      <div class="showMore" v-if="showMore">
        <span :class="{ close: moreOpen }" @click="moreOpen = !moreOpen">
          <i :class="[moreOpen ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i>
        </span>
      </div>
    </ul>
  </div>
</template>
<script>
export default {
  name: "screen-tags-filter",
  props: {
    selectData: {
      type: Array,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    filterTitle: {
      type: Boolean,
      default: false,
    },
    showCondation: {
      type: Boolean,
      default: true,
    },
    showMore: {
      type: Boolean,
      default: false,
    },
    defval: {
      // 默认选中哪些
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      typeList: [],
      styleList: [],
      areaList: [],
      moldList: [
        {
          id: "",
          name: "全部",
        },
        {
          id: 1,
          cateId: 1,
          name: "实景展厅",
        },
        {
          id: 2,
          cateId: 2,
          name: "虚拟展厅",
        },
      ],
      search: {},
      tagOpen: {},
      isOpen: true,
      moreOpen: true,
      activeIndexS: 0,
      activeIndexA: 0,
      activeIndexH: 0,
    };
  },
  computed: {
    showArrow() {
      const me = this;
      for (let i in me.search) {
        if (me.search[i] && me.search[i].id) {
          return true;
        }
      }
      return false;
    },
  },
  created() {},
  mounted() {
    this.getTypeList();
    this.getStyleList();
    this.getAreaType();
    this.forHandle(this.moldList, "cateId");
    if (this.showMore) {
      // 如果展示加载更多，则需要默认收起
      this.moreOpen = false;
    }

  },
  methods: {
    //获取分类
    async getTypeList() {
      let res = await this.$http.getTypeList();
      res.unshift({ id: "", typeName: "全部" });
      this.typeList = res;
      this.forHandle(this.typeList, "typeId");
      this.judgeOpen();
    },

    //获取面积
    async getAreaType() {
      let res = await this.$http.getAreaType();
      res.unshift({ id: "", name: "全部" });
      this.areaList = res;
      this.forHandle(this.areaList, "code");
    },
    //获取行业
    async getStyleList() {
      let res = await this.$http.getStyleList();
      res.unshift({ id: "", styleName: "全部" });
      this.styleList = res;
      this.forHandle(this.styleList, "styleId");
      this.judgeOpen();
    },
    //获取类型
    // async getMoldList() {
    //   let res = await this.$http.getMoldList();
    //   res.unshift({ typeName: "全部" });
    //   this.moldList = res;
    // },

    forHandle(data, type) {
      for (var i = 0; i < data.length; i++) {
        let opt = data[i];
        if (opt.id == this.defval[type]) {
          this.$set(this.search, type, opt);
          break;
        }
      }
    },

    selctChange(type, opt, id, index) {
      let search = this.search;
      if (this.isLoading) {
        return;
      }
      if (search[type] !== opt) {
        if (opt[id]) {
          this.$set(this.search, type, opt);
          this.emitChange(id);
        } else {
          this.clearTag(type);
        }
      }
    },

    clearTag(type) {
      this.$delete(this.search, type);
      this.emitChange();
    },
    emitChange() {
      if (this.isLoading) {
        return;
      }
      const me = this;
      let params = {};
      for (let i in me.search) {
        if (me.search[i] && me.search[i].id) {
          params[i] = me.search[i].id;
        }
      }
      me.$emit("change", params);
    },
    isActive(type, opt) {
      if (this.search[type] === opt) {
        return true;
      } else if (this.search[type] === undefined && opt.id === "") {
        return true;
      }
      return false;
    },
    judgeOpen() {
      //更多 收起
      const me = this;
      me.$nextTick(() => {
        let li = $(me.$refs.typesw).find("div.content");
        li.each((index, ele) => {
          if ($(ele).height() > 34) {
            me.$set(me.selectData[index], "more", true);
          }
        });
      })

    },
    togoMore(index) {
      this.$set(this.tagOpen, index, !this.tagOpen[index]);
    },
    toCase() {
      window.location.replace("/case");
    },
  },
};
</script>
<style lang="scss" scoped>
.screen-tags-filter {
  div.toptags {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    div.condation {
      flex: 1;
      height: 28px;
      line-height: 28px;
      span.bread {
        color: #333;
        font-size: 14px;
        position: relative;
        top: 1px;
        span {
          cursor: pointer;
        }
        span.split {
          margin: 0 4px;
        }
        span.arrow {
          margin-left: 8px;
          margin-right: 8px;
          img {
            width: 6px;
            height: 10px;
          }
        }
      }
      ul.tags {
        display: inline-block;
        vertical-align: middle;
        li {
          float: left;
          height: 26px;
          line-height: 24px;
          border: 1px solid rgba(187, 187, 187, 1);
          font-size: 14px;
          color: #222222;
          text-align: center;
          margin-right: 8px;
          padding: 0 9px;
          background-color: #fff;
          img {
            width: 9px;
            height: 9px;
            margin-left: 4px;
            cursor: pointer;
          }
        }
      }
    }

    div.open-close {
      width: 103px;
      height: 33px;
      line-height: 33px;
      text-align: center;
      font-size: 15px;
      color: #666;
      border: 1px solid rgba(233, 233, 233, 1);
      background: rgba(247, 247, 247, 1);
      cursor: pointer;
      img {
        transform: rotateZ(-90deg);
        width: 5px;
        height: 9px;
        margin-left: 8px;
      }
      &.close {
        img {
          transform: rotateZ(90deg);
        }
      }
    }
  }

  ul.types-w {
    border: 1px solid rgba(233, 233, 233, 1);
    padding: 0 24px;
    position: relative;
    background-color: #fff;
    li {
      display: flex;
      padding-top: 12px;
      border-bottom: 1px dashed #eeeeee;
      transition: 0.3s;
      &:last-child {
        border: none;
      }
      div.tip {
        color: #999999;
        font-size: 14px;
        font-weight: bold;
      }
      div.content-w {
        flex: 1;
        margin-left: 20px;
        //height: 34px;
        overflow: hidden;
        &.open {
          height: auto;
        }
        div.content {
          /*height: auto;*/
          span {
            display: inline-block;
            height: 22px;
            line-height: 22px;
            padding: 0 8px;
            color: #222222;
            margin: 0 22px 12px 0;
            cursor: pointer;
            &.active {
              background: #222222;
              color: #fff;
              &:hover {
                color: #222222;
              }
            }
            &:hover {
              background: #eeeeee;
              color: #222222;
            }
          }
        }
        .hiddenMore{
          height: 34px!important;
        }
      }

      div.more-w {
        width: 54px;
        div.more {
          width: 54px;
          height: 22px;
          line-height: 20px;
          border: 1px solid rgba(219, 217, 217, 1);
          text-align: center;
          font-size: 14px;
          color: #222222;
          cursor: pointer;
          img {
            width: 5px;
            height: 9px;
            margin-left: 5px;
            transform: rotateZ(90deg);
          }
          &.close {
            img {
              transform: rotateZ(-90deg);
            }
          }
        }
      }
    }

    &.moreClose {
      li:nth-child(3),
      li:nth-child(4) {
        height: 0;
        overflow: hidden;
        border: 0;
        padding: 0;
        margin: 0;
      }
    }
  }

  .showMore {
    line-height: 50px;
    text-align: center;
    font-size: 14px;
    color: #666666;
    width: 24px;
    height: 24px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: -12px;
    top: 32px;
    span {
      cursor: pointer;
      img {
        margin-left: 4px;
        width: 6px;
        transform: rotate(90deg);
        transition: 0.2s;
      }
      &.close {
        img {
          transform: rotateZ(-90deg);
        }
      }
      &:hover {
        color: #19A0F1;
      }
      &:hover i {
        color: #19A0F1;
      }
    }
  }
}
</style>
