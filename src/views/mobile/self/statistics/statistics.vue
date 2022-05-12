<template>
  <div class="statistics">
    <pageHeader />
    <div class="base-container">
      <p class="title">{{ hallName }}</p>
      <div class="data-box">
        <div class="access-data">
          <div class="sm-title">
            <p>访问数据</p>
            <span
              ><i class="el-icon-warning-outline"></i> 数据更新至{{
                dateFormat(date)
              }}</span
            >
          </div>
          <div class="count-box">
            <div class="today-visit">
              <img
                class="icon-bg"
                src="../../../../assets/mimg/statistics/t-icon-bg.png"
                alt=""
              />
              <div class="txt">
                <p class="t-tit">当日访问次数</p>
                <animated-number
                  class="t-num"
                  :value="todayCount"
                  :formatValue="formatToPrice"
                  :duration="1000"
                >
                </animated-number>
              </div>
            </div>
            <div class="cumulative-visit">
              <img
                class="icon-bg"
                src="../../../../assets/mimg/statistics/c-icon-bg.png"
                alt=""
              />
              <div class="txt">
                <p class="t-tit">累计访问次数</p>
                <animated-number
                  class="t-num"
                  :value="allCount"
                  :formatValue="formatToPrice"
                  :duration="1000"
                >
                </animated-number>
              </div>
            </div>
          </div>
        </div>
        <div class="split-line"></div>
        <div class="trend">
          <div class="sm-title">
            <p>展厅访问趋势</p>
          </div>
          <ul>
            <li
              v-for="item in timeData"
              :key="item.value"
              @click="selectTimeHandle1(item.value)"
              :class="{ active: activeValue1 == item.value }"
            >
              {{ item.label }}
            </li>
            <li
              class="el-icon-date"
              @click="selectTimeHandle1('4')"
              :class="{ active: activeValue1 == '4' }"
            ></li>
          </ul>
          <div class="line-chart" ref="lineChart"></div>
          <calendar
            ref="myCalendar"
            :minDate="minDate"
            :maxDate="maxDate"
            :show.sync="calendarVisible"
            :defaultDate="defaultDate"
            mode="during"
            @change="handleConfirm"
            :dayClick="dayClick"
          />
        </div>
      </div>
      <div class="provincial">
        <div class="sm-title">
          <p>区域分布</p>
        </div>
        <ul>
          <li
            v-for="item in timeData"
            :key="item.value"
            @click="selectTimeHandle2(item.value)"
            :class="{ active: activeValue2 == item.value }"
          >
            {{ item.label }}
          </li>
          <li
            class="el-icon-date"
            @click="selectTimeHandle2('4')"
            :class="{ active: activeValue2 == '4' }"
          ></li>
        </ul>
        <div class="sm-title2">
          <p>省份分布</p>
        </div>
        <div class="map-chart" ref="mapChart"></div>
        <div class="table">
          <el-table :data="provincialData" style="width: 100%" max-height="288">
            <el-table-column prop="province" label="省份" align="left">
              <template slot-scope="scope">
                <span v-if="scope.row.province == '0'">未知</span>
                <span v-else>{{ scope.row.province }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="countId"
              label="访客数"
              align="left"
            ></el-table-column>
            <el-table-column prop="ratio" label="占比" width="68" align="left">
              <template slot-scope="scope">
                <span>{{ scope.row.ratio + "%" }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="sm-title2">
          <p>国家分布</p>
        </div>
        <div class="table country">
          <el-table :data="countryData" style="width: 100%" max-height="288">
            <el-table-column prop="country" label="国家" align="left">
              <template slot-scope="scope">
                <span v-if="scope.row.country == '0'">未知</span>
                <span v-else>{{ scope.row.country }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="countId"
              label="访客数"
              align="left"
            ></el-table-column>
            <el-table-column prop="ratio" label="占比" width="70" align="left">
              <template slot-scope="scope">
                <span>{{ scope.row.ratio + "%" }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="terminal">
        <div class="sm-title">
          <p>终端分布</p>
        </div>
        <ul>
          <li
            v-for="item in timeData"
            :key="item.value"
            @click="selectTimeHandle3(item.value)"
            :class="{ active: activeValue3 == item.value }"
          >
            {{ item.label }}
          </li>
          <li
            class="el-icon-date"
            @click="selectTimeHandle3('4')"
            :class="{ active: activeValue3 == '4' }"
          ></li>
        </ul>
        <div
          v-if="!isNODataChart"
          class="map-chart circle-chart"
          ref="circleChart"
        ></div>
        <div v-else class="circle-chart nodata-chart" ref="noDataChart"></div>
        <div class="table">
          <el-table :data="terminalData" style="width: 100%">
            <el-table-column
              prop="deviceOS"
              label="终端"
              align="left"
            ></el-table-column>
            <el-table-column
              prop="countId"
              label="访客数"
              align="left"
            ></el-table-column>
            <el-table-column prop="ratio" label="占比" width="68" align="left">
              <template slot-scope="scope">
                <span>{{ scope.row.ratio + "%" }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="visitor-list" v-if="myBrowseService===2">
        <div class="sm-title">
          <p>访客列表</p>
        </div>
        <ul>
          <li
            v-for="item in visitorTimeData"
            :key="item.value"
            @click="selectVisitorHandle(item.value)"
            :class="{ active: activeValue4 == item.value }"
          >
            {{ item.label }}
          </li>
          <li
            class="el-icon-date"
            @click="selectVisitorHandle('4')"
            :class="{ active: activeValue4 == '4' }"
          ></li>
        </ul>
        <div class="table">
          <el-table
            ref="visitorTable"
            :data="visitorData"
            style="width: 100%"
            max-height="250"
          >
            <el-table-column
              prop="nickname"
              label="访客名称"
              align="left"
              fixed
            ></el-table-column>
            <el-table-column
              prop="phone"
              label="联系方式"
              width="120"
              align="left"
            ></el-table-column>
            <el-table-column
              prop="province"
              label="地区"
              align="left"
            ></el-table-column>
            <el-table-column
              prop="viewTime"
              label="最近访问时间"
              width="150"
              align="left"
            ></el-table-column>
            <el-table-column
              prop="viewCount"
              label="访问次数"
              align="left"
            ></el-table-column>
          </el-table>
          <p class="tips" v-if="isShowAll">已显示全部数据</p>
        </div>
      </div>
      <div class="material-statistics">
        <div class="sm-title">
          <p>
            素材统计<i class="el-icon-warning-outline" @click="tipsHandle"></i>
          </p>
        </div>
        <el-select
          size="mini"
          v-model="materialType"
          placeholder="请选择素材类型"
          @change="getMaterialList()"
        >
          <el-option
            v-for="item in materialOptions"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <div class="table">
          <el-table
            ref="materialTable"
            :data="materialData"
            style="width: 100%"
            max-height="320"
          >
            <el-table-column
              label="排行"
              type="index"
              min-width="50"
              fixed="left"
            >
            </el-table-column>
            <el-table-column
              prop="extName"
              label="素材名称"
              align="left"
              min-width="130"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column prop="fileType" label="素材类型" align="left">
              <template slot-scope="scope">
                <span v-if="scope.row.fileType == 1">图片</span>
                <span v-if="scope.row.fileType == 2">动图</span>
                <span v-if="scope.row.fileType == 3">视频</span>
                <span v-if="scope.row.fileType == 14">音频</span>
                <span v-if="scope.row.fileType == 11">模型</span>
                <span v-if="scope.row.fileType == 12">热点</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="clickCount"
              label="热度"
              align="left"
              min-width="100"
            ></el-table-column>
            <el-table-column label="操作" align="center" fixed="right">
              <template slot-scope="scope">
                <span v-if="scope.row.fileType == 14" class="nullVal">-</span>
                <span v-else class="view" @click="viewHandle(scope.row)"
                  >查看</span
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- <p class="tips" v-if="isShowAll2">已显示全部数据</p> -->
        </div>
      </div>
      <div class="hall-clues" v-if="buttonOptions && buttonOptions.consultSetting">
        <div class="sm-title">
          <p>展厅线索</p>
        </div>
        <div class="search-box">
          <el-input size="mini" type="text" v-model="telephoneOrName" placeholder="请输入手机号或名称" :clearable="true" @clear="getHallCluesList()">
            <i slot="suffix" class="el-input__icon el-icon-search" @click="getHallCluesList()"></i>
          </el-input>
          <ul>
            <li
                class="el-icon-date"
                @click="selectHallHandle('5')"
                :class="{ active: activeValue5 == '5' }"
            ></li>
          </ul>
        </div>
        <div class="table">
          <el-table
              ref="hallCluesTable"
              :data="hallCluesData"
              style="width: 100%"
              max-height="320"
          >
            <el-table-column
                prop="realName"
                label="访客名称"
                align="left"
                fixed="left"
            ></el-table-column>
            <el-table-column
                prop="telephone"
                label="联系方式"
                align="left"
                width="120px"
            ></el-table-column>
            <el-table-column
                prop="remark"
                label="咨询信息"
                align="left"
                show-overflow-tooltip
            ></el-table-column>
            <el-table-column
                prop="createTs"
                label="创建时间"
                align="left"
                width="150"
            >
              <template slot-scope="scope">
                <span>{{ $utils.commonDateFormat(scope.row.createTs, "yyyy-MM-dd hh:mm:ss") }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <calendar
        ref="myCalendar2"
        :minDate="minDate"
        :maxDate="maxDate"
        :show.sync="calendarVisible2"
        :defaultDate="defaultDate"
        mode="during"
        @change="handleConfirm2"
        :dayClick="dayClick"
    />
    <el-dialog
      class="tipsDialog"
      title="提示"
      :center="true"
      :show-close="false"
      :visible.sync="dialogVisible"
      width="70%"
    >
      <span
        >统计展厅中图片、动图、视频、音频、模型的打开次数，打开一次，热度+1</span
      >
    </el-dialog>
    <pageFooter />
    <playShow
      :playClass="playClass"
      :isPlay="isPlay"
      @closeDialog="isPlay = false"
      :url="url"
    />
  </div>
</template>

<script>
import pageHeader from "mobile/components/page-header/page-header.vue";
import pageFooter from "mobile/components/page-footer/page-footer.vue";
import playShow from "@/components/materialManage/play-material.vue";
import Echarts from "echarts";
import "echarts/map/js/china.js";
import allCities from "../../../../assets/json/china.json";
import AnimatedNumber from "animated-number-vue";
import Crypto from "@/utils/crypto.js";
let nowDate = new Date(new Date().toLocaleDateString());
export default {
  components: {
    pageHeader,
    pageFooter,
    AnimatedNumber,
    playShow,
  },
  data() {
    const materialTypes = this.$commConst.MATERIALTYPE;
    return {
      dialogVisible: false,
      materialTypes,
      currentPage: 1,
      currentPage2: 1,
      currentPage3: 1,
      pageSize: 10,
      pageSize2: 10,
      minDate: null, //设置过期时间
      maxDate: new Date(),
      calendarDate: "",
      selectDateArr: "",
      defaultDate: [],
      telephoneOrName: "",
      calendarVisible: false,
      calendarVisible2: false,
      todayCount: 0,
      allCount: 0,
      todayCountData: [],
      allCountData: [],
      date: new Date(),
      hallName: "",
      myCharts: null,
      geoJson: {
        features: [],
      },
      parentInfo: [
        {
          cityName: "全国",
          code: 100000,
        },
      ],
      timeData: [{
        label: "昨天",
        value: "1"
      }, {
        label: "最近7天",
        value: "2"
      }, {
        label: "最近30天",
        value: "3"
      }],
      visitorTimeData: [{
        label: "按访问时间",
        value: 1
      }, {
        label: "按访问次数",
        value: 2
      }],
      activeValue1: "2",
      activeValue2: "2",
      activeValue3: "2",
      activeValue4: 1,
      activeValue5: 1,
      xAxisData: [],
      provincialData: [],
      countryData: [],
      terminalData: [],
      visitorData: [],
      interval: 0,
      circleDeviceOS: [],
      circleRatio: [],
      count: [],
      clickCalendarTag: "",
      tempid: "",
      isNODataChart: false,
      startTimeVisitor: "",
      startTimeVisitor2: "",
      endTimeVisitor: "",
      endTimeVisitor2: "",
      selectDateHall: "",
      isShowAll: false,
      // isShowAll2: false,
      isVisit: false,
      materialType: "",
      isPlay: false,
      url: "",
      visitorTotal: 0,
      materialTotal: 0,
      hallCluesTotal: 0,
      materialOptions: [
        {
          value: "",
          label: "全部类型",
        },
        {
          value: materialTypes.pic,
          label: "图片",
        },
        {
          value: materialTypes.gif,
          label: "动图",
        },
        {
          value: materialTypes.video,
          label: "视频",
        },
        {
          value: materialTypes.audio,
          label: "音频",
        },
        {
          value: materialTypes.model,
          label: "模型",
        },
      ],
      materialData: [],
      hallCluesData: [],
      playClass: "",
      seriesName: "当日",
      buttonOptions: {},
      myBrowseService: 0
    };
  },
  computed: {
    userinfo() {
      return this.$store.state.userinfo;
    },
  },
  mounted() {
    this.tempid = Crypto.get(unescape(this.$route.query.tempid));
    this.getTempInfo();
    this.geoJson = allCities;
    this.getMapData();
    this.getVisitsNum();
    this.getTrends();
    this.getCircleChartData();
    this.getVisitorList();
    this.getCountry();
    this.scrollMaterialList();
    this.scrollHallCluesList();
    this.$nextTick(() => {
      if (this.$refs.visitorTable) {
        let dom = this.$refs.visitorTable.bodyWrapper;
        dom.addEventListener(
          "scroll",
          (res) => {
            // 变量windowHeight是可视区的高度
            let windowHeight = dom.clientHeight || dom.clientHeight;
            // // 变量scrollHeight是滚动条的总高度
            let scrollHeight = dom.scrollHeight || dom.scrollHeight;
            //说明滚动条触底
            if (dom.scrollTop + windowHeight === scrollHeight) {
              if (this.visitorData.length !== this.visitorTotal) {
                this.currentPage++;
                this.getVisitorList();
                this.isShowAll = false;
              } else {
                this.isShowAll = true;
              }
            }
          },
          true
        );
      }

      if (this.$refs.materialTable) {
       let dom = this.$refs.materialTable.bodyWrapper;
        dom.addEventListener(
          "scroll",
          (res) => {
            // 变量windowHeight是可视区的高度
            let windowHeight = dom.clientHeight || dom.clientHeight;
            // // 变量scrollHeight是滚动条的总高度
            let scrollHeight = dom.scrollHeight || dom.scrollHeight;
            //说明滚动条触底
            if (dom.scrollTop + windowHeight === scrollHeight) {
              if (this.materialData.length !== this.materialTotal) {
                this.currentPage2++;
                this.scrollMaterialList();
                // this.isShowAll2 = false;
              }
            }
          },
          true
        );
      }

      if (this.$refs.hallCluesTable) {
        let dom = this.$refs.hallCluesTable.bodyWrapper;
        dom.addEventListener(
            "scroll",
            (res) => {
              // 变量windowHeight是可视区的高度
              let windowHeight = dom.clientHeight || dom.clientHeight;
              // // 变量scrollHeight是滚动条的总高度
              let scrollHeight = dom.scrollHeight || dom.scrollHeight;
              //说明滚动条触底
              if (dom.scrollTop + windowHeight === scrollHeight) {
                if (this.hallCluesData.length !== this.hallCluesTotal) {
                  this.currentPage3++;
                  this.scrollHallCluesList();
                }
              }
            },
            true
        );
      }
    });
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); //在vue实例销毁钱，清除我们的定时器
    }
  },
  methods: {
    //素材统计 - 分页列表
    getMaterialList() {
      this.currentPage2 = 1;
      let params = {
        currentPage: this.currentPage2,
        pageSize: this.pageSize2,
        tempId: this.tempid,
        fileType: this.materialType,
      };
      this.$http.getMaterialList(params).then((res) => {
        this.materialData = res.list;
      });
    },

    //展厅线索 - 分页列表
    getHallCluesList() {
      this.currentPage3 = 1;
      let params = {
        pageNum: this.currentPage3,
        pageSize: this.pageSize2,
        tempIdOrName: this.tempid,
        telephoneOrName: this.telephoneOrName,
        startTime: this.startTimeVisitor2 ? this.startTimeVisitor2 : "",
        endTime: this.endTimeVisitor2 ? this.endTimeVisitor2 : "",
      };
      this.$http.getHallCluesList(params).then((res) => {
        this.hallCluesData = res.list;
      });
    },

    scrollMaterialList() {
      let params = {
        currentPage: this.currentPage2,
        pageSize: this.pageSize2,
        tempId: this.tempid,
        fileType: this.materialType,
      };
      this.$http.getMaterialList(params).then((res) => {
        this.materialData = this.materialData.concat(res.list);
        this.materialTotal = res.count;
      });
    },

    scrollHallCluesList() {
      let params = {
        pageNum: this.currentPage3,
        pageSize: this.pageSize2,
        tempIdOrName: this.tempid,
        startTime: this.selectDateHall ? this.selectDateHall[0] : "",
        endTime: this.selectDateHall ? this.selectDateHall[1] : "",
      };
      this.$http.getHallCluesList(params).then((res) => {
        this.hallCluesData = this.hallCluesData.concat(res.list);
        this.hallCluesTotal = res.count;
      });
    },

    tipsHandle() {
      this.dialogVisible = true;
    },
    //查看
    viewHandle(item) {
      // this.materialImgUrl = item.fileUrl;
      // this.dialogVisible = true;
      this.isPlay = true;
      if (item.fileType === this.materialTypes.model) {
        this.url = `${process.env.VUE_APP_APIURL}model?code=${item.picId}&desc=0&icon=1&type=1&quick=0&opacity=0&full=0`;
        this.playClass = "modelIframe2";
      } else {
        this.url = `${process.env.VUE_APP_ViewURL}imageView/index.html?picid=${item.picId}`;
        this.playClass = "picIframe";
      }
    },
    //通过展厅id获取展厅信息
    getTempInfo() {
      this.$http.getHallInfo(this.tempid).then((res) => {
        this.hallName = res.name;
        this.myBrowseService = res.myBrowseService;
        this.buttonOptions = res.buttonOptions;
      });
    },

    //获取访问次数
    getVisitsNum() {
      let timer = () => {
        this.$http
          .getVisitsNum({
            obj: this.tempid,
          })
          .then((res) => {
            this.allCount = res.allCount;
            this.todayCount = res.todayCount;
          });
      };
      timer();
      setInterval(() => {
        timer();
      }, 3600000);
    },

    //获取展厅访问趋势
    getTrends() {
      let params = {
        obj: this.tempid,
        queryType: this.activeValue1,
      };
      this.trendsInterface(params);
    },

    //获取访客列表
    getVisitorList(val) {
      if(val) {
        this.currentPage = val;
      }
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        queryType: this.activeValue4,
        startTimeStr: this.startTimeVisitor ? this.startTimeVisitor : "",
        endTimeStr: this.endTimeVisitor ? this.endTimeVisitor : "",
        tempId: this.tempid,
        dataSource: 1,
      };
      this.$http.getVisitorList(params).then((res) => {
        this.visitorData = this.visitorData.concat(res.list);
        this.visitorTotal = res.count;
      });
    },

    formatToPrice(value) {
      return `${value
        .toFixed(0)
        .toString()
        .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,")}`;
    },

    //获取当前时间
    dateFormat(time) {
      var date = new Date(time);
      var year = date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // 拼接
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
    },

    //绘制折线图
    drawLineChart() {
      let myChart = Echarts.init(this.$refs.lineChart);
      let option = {
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: 20,
          left: "3%",
          right: "8%",
          bottom: "10",
          containLabel: true,
        },
        dataZoom: [
          //给x轴设置滚动条
          {
            start: 0, //默认为0
            end: 100 - 1500 / 31, //默认为100
            type: "slider",
            show: true,
            xAxisIndex: [0],
            handleSize: 0, //滑动条的 左右2个滑动条的大小
            height: 8, //组件高度
            left: "8%", //左边的距离
            right: "6%", //右边的距离
            bottom: 0, //下边的距离
            borderColor: "rgba(0,0,0,.2)",
            fillerColor: "#40C1FF",
            borderRadius: 5,
            backgroundColor: "rgba(0,0,0,.1)", //两边未选中的滑动条区域的颜色
            showDataShadow: false, //是否显示数据阴影 默认auto
            showDetail: false, //即拖拽时候是否显示详细数值信息 默认true
            realtime: true, //是否实时更新
            filterMode: "filter",
          },
        ],
        xAxis: {
          type: "category",
          boundaryGap: false, //坐标轴两边留白
          data: this.xAxisData,
          axisLabel: {
            //坐标轴刻度标签的相关设置。
            interval: this.interval, //设置为 1，表示『隔一个标签显示一个标签』,
            textStyle: {
              color: "#666",
              fontStyle: "normal",
              fontFamily: "微软雅黑",
              fontSize: 12,
            },
            formatter: function(params) {
              var newParamsName = "";
              var paramsNameNumber = params.length;
              var provideNumber = 10; //一行显示几个字
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
              if (paramsNameNumber > provideNumber) {
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = "";
                  var start = p * provideNumber;
                  var end = start + provideNumber;
                  if (p == rowNumber - 1) {
                    tempStr = params.substring(start, paramsNameNumber);
                  } else {
                    tempStr = params.substring(start, end) + "\n";
                  }
                  newParamsName += tempStr;
                }
              } else {
                newParamsName = params;
              }
              return newParamsName;
            },
            //rotate:50,
          },
          axisTick: {
            //坐标轴刻度相关设置。
            show: false,
          },
          axisLine: {
            //坐标轴轴线相关设置
            lineStyle: {
              color: "#E5E9ED",
              // opacity:0.2
            },
          },
          splitLine: {
            //坐标轴在 grid 区域中的分隔线。
            show: false,
            lineStyle: {
              color: "#E5E9ED",
              // 	opacity:0.1
            },
          },
        },
        yAxis: [
          {
            type: "value",
            minInterval: 1,
            splitNumber: 5,
            axisLabel: {
              textStyle: {
                color: "#666",
                fontStyle: "normal",
                fontFamily: "微软雅黑",
                fontSize: 12,
              },
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#E5E9ED",
                // 	opacity:0.1
              },
            },
          },
          {
            type: "value",
            minInterval: 1,
            splitNumber: 5,
            axisLabel: {
              formatter: function() {
                return "";
              },
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: this.seriesName + "访问次数",
            type: "line",
            smooth: true, //这句就是让曲线变平滑的
            itemStyle: {
              normal: {
                color: "#23B8FF",
                lineStyle: {
                  color: "#23B8FF",
                  width: 1,
                },
                areaStyle: {
                  color: new Echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(35, 184, 255, 0)",
                    },
                    {
                      offset: 1,
                      color: "rgba(35, 184, 255, 0.35)",
                    },
                  ]),
                },
              },
            },
            data: this.todayCountData,
          },
          {
            name: "累计访问次数",
            type: "line",
            symbolSize: 0, // symbol的大小设置为0
            showSymbol: false, // 不显示symbol
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: "#F79F05",
              },
            },
            lineStyle: {
              width: 0,
              color: "rgba(0,0,0,0)",
            },
            data: this.allCountData,
          },
        ],
      };
      myChart.setOption(option, true);
      setTimeout(function() {
        window.onresize = function() {
          myChart.resize();
        };
      }, 200);
    },

    //获取数据
    getMapData() {
      // let mapData = this.geoJson.features.map((item) => {
      //   return {
      //     name: item.properties.name,
      //     value: 0,
      //     cityCode: item.properties.adcode,
      //     ratio: "0%",
      //   };
      // });
      let params = {
        obj: this.tempid,
        queryType: this.activeValue2,
      };
      this.provincialInterface(params);
    },
    initEcharts(mapData) {
      // var min = 0;
      // var max = 100;
      // if(mapData && mapData.length > 0) {
      //   min = mapData[mapData.length - 1].value;
      //   max = mapData[0].value;
      //   if (mapData.length === 1) {
      //     min = 0;
      //   }
      // }
      this.myChart = Echarts.init(this.$refs.mapChart);
      Echarts.registerMap("china", this.geoJson); //注册
      this.myChart.setOption(
        {
          tooltip: {
            trigger: "item",
            formatter: (p) => {
              let val;
              let ratio;
              if(p.data) {
                val = p.data.value;
                ratio = p.data.ratio;
              }
              if (!val || !ratio) {
                val = 0;
                ratio = 0;
              }
              let txtCon =
                  p.name +
                  "<br/>" +
                  "访客数: " +
                  val +
                  "<br/>" +
                  "占比: " +
                  ratio;
              return txtCon;
            },
          },
          visualMap: {
            show: false,
            // min: min,
            // max: max,
            left: 0,
            bottom: 0,
            itemWidth: 18,
            itemHeight: 100,
            calculable: false,
            seriesIndex: [0],
            inRange: {
              color: ["#d1efd1", "#1aad19"],
            },
            textStyle: {
              color: "#1aad19",
            },
          },
          series: [
            {
              name: "地图",
              type: "map",
              mapType: "china",
              top: 50,
              width: 200,
              roam: false, //是否可缩放
              zoom: 1.25, //缩放比例
              data: mapData,
              label: {
                normal: {
                  show: false, //是否默认显示省份名字
                  color: "rgb(249, 249, 249)", //省份标签字体颜色
                  formatter: (p) => {
                    switch (p.name) {
                      case "内蒙古自治区":
                        p.name = "内蒙古";
                        break;
                      case "西藏自治区":
                        p.name = "西藏";
                        break;
                      case "新疆维吾尔自治区":
                        p.name = "新疆";
                        break;
                      case "宁夏回族自治区":
                        p.name = "宁夏";
                        break;
                      case "广西壮族自治区":
                        p.name = "广西";
                        break;
                      case "香港特别行政区":
                        p.name = "香港";
                        break;
                      case "澳门特别行政区":
                        p.name = "澳门";
                        break;
                      default:
                        break;
                    }
                    return p.name;
                  },
                },
                emphasis: {
                  show: false, //滑过显示每个区域名
                  color: "#d1efd1",
                },
              },
              itemStyle: {
                normal: {
                  areaColor: "#EEEEEE",
                  borderColor: "#FFFFFF"
                },
                emphasis: {
                  areaColor: "#018000"
                },
              },
            },
          ],
        },
        true
      );
    },

    // 国家分布接口
    getCountry(params) {
      let newCountryParams;
      if (params) {
        newCountryParams = params;
      } else {
        newCountryParams = {
          obj: this.tempid,
          queryType: this.activeValue2,
        };
      }
      this.$http.getCountrySpread(newCountryParams).then((res) => {
        // console.log(res, "国家分布");
        this.countryData = Object.assign(res);
      });
    },

    //获取终端分布数据
    getCircleChartData() {
      let params = {
        obj: this.tempid,
        queryType: this.activeValue3,
      };
      this.terminalInterface(params);
    },

    //展厅访问趋势接口
    trendsInterface(params) {
      this.$http.getTrends(params).then((res) => {
        this.todayCountData = [];
        this.allCountData = [];
        this.xAxisData = res.xaxisData;
        this.interval = parseInt(this.xAxisData.length / 10);
        if (res.seriesList[0] && res.seriesList[1]) {
          this.todayCountData = res.seriesList[0].seriesData;
          this.allCountData = res.seriesList[1].seriesData;
          this.drawLineChart();
        }
      });
    },

    //省级分布接口
    provincialInterface(params) {
      this.$http.getProvincialSpread(params).then((res) => {
        this.provincialData = Object.assign(res);
        let arr = [];
        this.provincialData.map(item => {
          let obj = {};
          obj.name = item.province;
          obj.value = item.countId;
          obj.ratio = item.ratio;
          arr.push(obj)
        });
        // arr = arr.sort(function(a, b) {
        //   return b.value - a.value;
        // });
        this.initEcharts(arr);
      });
    },

    //终端接口
    terminalInterface(params) {
      this.$http.getTerminalSpread(params).then((res) => {
        this.terminalData = res;
        this.circleDeviceOS = [];
        this.circleRatio = [];
        this.count = [];
        if (this.terminalData.length !== 0) {
          this.isNODataChart = false;
          res.map((item) => {
            this.circleDeviceOS.push(item.deviceOS);
            this.circleRatio.push(item.ratio);
            this.count.push(item.countId);
          });
          this.$nextTick(() => {
            this.drawCircleChart();
          });
        } else {
          this.isNODataChart = true;
          this.$nextTick(() => {
            this.drawNoDataChart();
          });
        }
      });
    },

    //绘制环形图
    drawCircleChart() {
      let getName = this.circleDeviceOS;
      let getValue = this.circleRatio;
      var data = [];
      for (var i = 0; i < getName.length; i++) {
        data.push({
          name: getName[i],
          value: getValue[i],
          count: this.count[i],
        });
      }
      var colorList = [
        {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#36CBCB", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#36CBCB", // 100% 处的颜色
            },
          ],
        },
        {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#23B8FF", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#23B8FF", // 100% 处的颜色
            },
          ],
        },
        {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#FEAE5C", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#FECC84", // 100% 处的颜色
            },
          ],
        },
      ];
      let myChart = Echarts.init(this.$refs.circleChart);
      let option = {
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            return (
              params.data.name +
              "<br/>" +
              "访客数: " +
              params.data.count +
              "<br/>" +
              "占比: " +
              params.data.value +
              "%"
            );
          },
        },
        legend: {
          type: "scroll",
          orient: "horizontal",
          x: "center", //可设定图例在左、右、居中
          bottom: -10, //可设定图例在上、下、居中
          itemWidth: 10,
          itemHeight: 10,
          icon: "circle",
          data: getName,
          formatter: function(name) {
            for (var i = 0; i < getName.length; i++) {
              if (name == data[i].name) {
                return "{name|" + name + "}";
              }
            }
          },
          textStyle: {
            rich: {
              name: {
                fontSize: 15,
                fontWeight: 400,
                //width: 170,
                // width: 45,
                height: 25,
                padding: [0, 10, 0, 3],
                color: "#999",
              },
            },
          },
        },
        series: [
          {
            type: "pie",
            radius: ["60%", "75%"],
            center: ["center", "43%"],
            itemStyle: {
              normal: {
                color: function(params) {
                  return colorList[params.dataIndex];
                },
              },
            },
            label: {
              normal: {
                show: false,
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: data,
          },
        ],
      };
      myChart.clear();
      myChart.setOption(option, true);
    },

    //如果饼状图没有数据时
    async drawNoDataChart() {
      let getName = ["nodata"];
      let getValue = [100];

      var data = [];
      for (var i = 0; i < getName.length; i++) {
        data.push({
          name: getName[i],
          value: getValue[i],
        });
      }
      let myChart = Echarts.init(this.$refs.noDataChart);
      let option = {
        legend: {
          show: false,
        },
        series: [
          {
            type: "pie",
            radius: ["60%", "75%"],
            center: ["center", "43%"],
            itemStyle: {
              normal: {
                color: "#ccc",
              },
            },
            label: {
              normal: {
                show: false,
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: data,
          },
        ],
      };
      myChart.setOption(option, true);
    },

    //自定义查询展厅访问趋势
    selectTimeHandle1(val) {
      this.activeValue1 = val;
      if(val == "1") {
        this.seriesName = "时段"
      }else {
        this.seriesName = "当日"
      }
      if (val === "4") {
        this.minDate = null;
        this.maxDate = new Date();
        this.calendarVisible = true;
        this.$refs.myCalendar.changeDate(nowDate);
        this.$refs.myCalendar.changeDateView(nowDate);
        this.clickCalendarTag = "1";
      } else {
        this.getTrends();
      }

    },

    //自定义查询省级分布
    selectTimeHandle2(val) {
      this.activeValue2 = val;
      if (val === "4") {
        this.minDate = null;
        this.maxDate = new Date();
        this.calendarVisible2 = true;
        this.$refs.myCalendar2.changeDate(nowDate);
        this.$refs.myCalendar2.changeDateView(nowDate);
        this.clickCalendarTag = "2";
      } else {
        this.getMapData();
        this.getCountry();
      }
    },
    //自定义查询终端分布
    selectTimeHandle3(val) {
      this.activeValue3 = val;
      if (val === "4") {
        this.minDate = null;
        this.maxDate = new Date();
        this.calendarVisible2 = true;
        this.$refs.myCalendar2.changeDate(nowDate);
        this.$refs.myCalendar2.changeDateView(nowDate);
        this.clickCalendarTag = "3";
      } else {
        this.getCircleChartData();
      }
    },

    selectVisitorHandle(val) {
      this.activeValue4 = val;
      if (val === "4") {
        this.minDate = null;
        this.maxDate = new Date();
        this.calendarVisible2 = true;
        this.$refs.myCalendar2.changeDate(nowDate);
        this.$refs.myCalendar2.changeDateView(nowDate);
        this.clickCalendarTag = "4";
      } else {
        this.visitorData = [];
        this.getVisitorList();
      }
    },

    selectHallHandle(val) {
      this.activeValue5 = val;
      if (val === "5") {
        this.minDate = null;
        this.maxDate = new Date();
        this.calendarVisible2 = true;
        this.$refs.myCalendar2.changeDate(nowDate);
        this.$refs.myCalendar2.changeDateView(nowDate);
        this.clickCalendarTag = "5";
      } else {
        this.hallCluesData = [];
        this.getVisitorList();
      }
    },

    formatDateMin(secs) {
      var t = new Date(secs);
      var year = t.getFullYear();
      var month = t.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      var date = t.getDate();
      if (date < 10) {
        date = "0" + date;
      }
      var hour = t.getHours();
      if (hour < 10) {
        hour = "0" + hour;
      }
      var minute = t.getMinutes();
      // if (minute < 10) { minute = '0' + minute }
      // var second = t.getSeconds()
      // if (second < 10) { second = '0' + second }
      // return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
      return year + "-" + month + "-" + date;
    },

    //选择日历日期
    handleConfirm(date) {
      // this.minDate = new Date(nowDate.getTime()-24*60*60*1000*6000000);
      // this.maxDate = new Date();
      this.seriesName = "当日"
      this.calendarDate = JSON.stringify(
        date.map((item) => item.format("YYYY-MM-DD"))
      );
      this.selectDateArr = JSON.stringify(
        this.selectDateArr.format("YYYY-MM-DD")
      );
      let arr = eval("(" + this.calendarDate + ")");
      if (arr.length === 1 && arr[0] !== this.selectDateArr) {
        let currentDate = date[0].$d;
        this.minDate = new Date(currentDate.getTime());
        if (
          new Date(currentDate.getTime() + 24 * 60 * 60 * 1000 * 59) >
          new Date(nowDate.getTime())
        ) {
          this.maxDate = new Date(nowDate.getTime());
        } else {
          this.maxDate = new Date(
            currentDate.getTime() + 24 * 60 * 60 * 1000 * 59
          );
        }
      } else if ('"' + arr[0] + '"' === this.selectDateArr) {
        this.$refs.myCalendar.changeDate(arr[0]);
        this.$refs.myCalendar.changeDateView(arr[0]);
        arr = [];
        this.minDate = null;
        this.maxDate = new Date();
      } else if (
        arr.length === 2 &&
        '"' + arr[0] + '"' !== this.selectDateArr
      ) {
        this.calendarVisible = false;
        let params = {
          obj: this.tempid,
          queryType: "4",
          startTimeStr: arr[0],
          endTimeStr: arr[1],
        };
        if (this.clickCalendarTag === "1") {
          this.trendsInterface(params);
        }
      }
    },

    handleConfirm2(date) {
      this.calendarDate = JSON.stringify(
          date.map((item) => item.format("YYYY-MM-DD"))
      );
      this.selectDateArr = JSON.stringify(
          this.selectDateArr.format("YYYY-MM-DD")
      );
      let arr = eval("(" + this.calendarDate + ")");
      if(arr.length === 2) {
        this.calendarVisible2 = false;
        let params = {
          obj: this.tempid,
          queryType: "4",
          startTimeStr: arr[0],
          endTimeStr: arr[1],
        };
        if (this.clickCalendarTag === "2") {
          this.provincialInterface(params);
          this.getCountry(params);
        } else if (this.clickCalendarTag === "3") {
          this.terminalInterface(params);
        } else if (this.clickCalendarTag === "4") {
          this.startTimeVisitor = arr[0];
          this.endTimeVisitor = arr[1];
          this.getVisitorList(1);
        } else if (this.clickCalendarTag === "5") {
          this.calendarDate = JSON.stringify(
              date.map((item) => item.valueOf())
          );
          arr = eval("(" + this.calendarDate + ")")
          this.startTimeVisitor2 = arr[0];
          this.endTimeVisitor2 = arr[1];
          this.getHallCluesList()
        }
      }

    },

    dayClick(val) {
      this.selectDateArr = val;
      return true;
    },
  },
};
</script>

<style src="./statistics.scss" lang="scss" scoped></style>
<style type="text/css" lang="scss" >
  .el-tooltip__popper {
    max-width: 94%;
  }
</style>
