<template>
  <div class="statistics">
    <!--    <page-header v-if="!isIframe" :gradual="false"></page-header>-->
    <div class="self-base-container">
      <p class="title">{{ hallName }}</p>
      <div class="hall-visit">
        <div class="access-data">
          <p class="a-tit">访问数据</p>
          <p class="update-time">
            <i class="el-icon-warning-outline"></i>
            数据更新至{{ dateFormat(date) }}
          </p>
          <div class="today-visit">
            <img
              class="icon-bg"
              src="~@/assets/mimg/statistics/t-icon-bg.png"
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
        <div class="access-trends">
          <div class="a-header">
            <p class="trends-tit">展厅访问趋势</p>
            <div class="a-right">
              <ul>
                <li
                  v-for="item in timeData"
                  :key="item.value"
                  @click="selectTimeHandle1(item.value)"
                  :class="{ active: activeValue1 == item.value }"
                >
                  {{ item.label }}
                </li>
              </ul>
              <el-date-picker
                v-model="selectDateVisit"
                size="mini"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                @change="selectDateVisitHandle"
                :picker-options="pickerDisabled"
              ></el-date-picker>
            </div>
          </div>
          <div class="line-chart" ref="lineChart"></div>
        </div>
      </div>
      <div class="provincial">
        <!-- 头部 -->
        <div class="areaHead">
          <p class="c-tit">区域分布</p>
          <div class="t-right">
            <ul>
              <li
                v-for="item in timeData"
                :key="item.value"
                @click="selectTimeHandle2(item.value)"
                :class="{ active: activeValue2 == item.value }"
              >
                {{ item.label }}
              </li>
            </ul>
            <el-date-picker
              v-model="selectDateMap"
              size="mini"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              @change="selectDateMapHandle"
            ></el-date-picker>
          </div>
        </div>
        <!-- data  -->
        <div class="areaData">
          <!-- 省级  -->
          <div class="provinceData">
            <div class="header-tit">
              <p>省份分布</p>
              <el-button
                type="primary"
                size="small"
                class="export exportMaterial"
                @click="exportProvincialHandle('Provinc')"
              >导出
              </el-button>
            </div>

            <div class="flexBox">
              <div class="chart-box">
                <div class="map-chart" ref="mapChart"></div>
              </div>
              <div class="table">
                <el-table :data="provincialData" style="width: 100%" max-height="300">
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
                  <el-table-column
                    prop="ratio"
                    label="占比"
                    width="70"
                    align="left"
                  >
                    <template slot-scope="scope">
                      <span>{{ scope.row.ratio + "%" }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
          <!-- 国家  -->
          <div class="countryData">
            <div class="header-tit">
              <p>国家分布</p>
              <el-button
                type="primary"
                size="small"
                class="export exportMaterial"
                @click="exportProvincialHandle('Country')"
              >导出
              </el-button>
            </div>
            <div class="table">
              <el-table :data="countryData" style="width: 100%" max-height="300">
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
                <el-table-column
                  prop="ratio"
                  label="占比"
                  width="70"
                  align="left"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.ratio + "%" }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <div class="provincial terminal">
        <div class="chart-box">
          <p class="c-tit">终端分布</p>
          <div
            v-if="!isNODataChart"
            class="map-chart circle-chart"
            ref="circleChart"
          ></div>
          <div v-else class="circle-chart nodata-chart" ref="noDataChart"></div>
        </div>
        <div class="table-box">
          <div class="t-right">
            <ul>
              <li
                v-for="item in timeData"
                :key="item.value"
                @click="selectTimeHandle3(item.value)"
                :class="{ active: activeValue3 == item.value }"
              >
                {{ item.label }}
              </li>
            </ul>
            <el-date-picker
              v-model="selectDateTerminal"
              size="mini"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              @change="selectDateTerminalHandle"
            ></el-date-picker>
          </div>
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
              <el-table-column
                prop="ratio"
                label="占比"
                width="70"
                align="left"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.ratio + "%" }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="visitor-list" v-if="myBrowseService===2">
        <!-- <div class="visitor-list"> -->
        <div class="a-header">
          <p class="trends-tit">
            访客列表<span>
              <!-- <i class="el-icon-warning-outline"></i>
              仅展示微信访问并通过授权和绑定手机号的访客信息 -->
            </span>
          </p>
          <div class="a-right">
            <ul>
              <li
                v-for="item in visitorTimeData"
                :key="item.value"
                @click="selectVisitorHandle(item.value)"
                :class="{ active: activeValue4 == item.value }"
              >
                {{ item.label }}
              </li>
            </ul>
            <el-date-picker
              v-model="selectDateVisitor"
              size="mini"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              @change="selectDateVisitorHandle"
            ></el-date-picker>
            <el-button
              type="primary"
              size="small"
              class="export isUse"
              @click="exportHandle"
            >导出
            </el-button>
          </div>
        </div>
        <div class="table-box">
          <div class="table">
            <el-table :data="visitorData" style="width: 100%">
              <el-table-column
                prop="nickname"
                label="访客名称"
                align="left"
              ></el-table-column>
              <el-table-column
                prop="phone"
                label="联系方式"
                align="left"
              ></el-table-column>
              <el-table-column
                prop="province"
                label="地区"
                align="left"
              ></el-table-column>
              <el-table-column
                label="最近访问时间"
                align="left">
                <template slot-scope="scope">
                  {{scope.row.viewTime|formatTime}}
                </template>
              </el-table-column>
              <el-table-column
                prop="viewCount"
                label="访问次数"
                width="80"
                align="left"
              ></el-table-column>
            </el-table>
          </div>
          <div class="commonPagina" v-if="visitorTotal > 10">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize"
              layout="total,prev, pager, next"
              :total="visitorTotal"
            >
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="material-statistics">
        <div class="a-header">
          <p class="trends-tit">
            素材统计<span
          >(统计展厅中图片、动图、视频、音频、模型的打开次数，打开一次，热度+1)</span
          >
          </p>
          <div class="a-right">
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
            <el-button
              type="primary"
              size="small"
              class="export exportMaterial"
              @click="exportMaterialHandle"
            >导出
            </el-button>
          </div>
        </div>
        <div class="table-box">
          <div class="table">
            <el-table
              ref="materialTable"
              :data="materialData"
              style="width: 100%"
              max-height="440"
            >
              <el-table-column label="排行" type="index" width="280">
              </el-table-column>
              <el-table-column
                prop="extName"
                label="素材名称"
                align="left"
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
              ></el-table-column>
              <el-table-column
                label="操作"
                width="80"
                align="right"
                fixed="right"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.fileType == 14" class="nullVal">-</span>
                  <span v-else class="view" @click="viewHandle(scope.row)"
                  >查看</span
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="hall-clues" v-if="buttonOptions && buttonOptions.consultSetting">
        <div class="a-header">
          <p class="trends-tit">
            展厅线索
          </p>
          <div class="a-right">
            <el-input size="mini" type="text" v-model="telephoneOrName" placeholder="请输入手机号或名称" :clearable="true"
                      @clear="getHallCluesList()">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="getHallCluesList()"></i>
            </el-input>
            <el-date-picker
              v-model="selectDateHall"
              size="mini"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
              @change="selectDateHallHandle"
            ></el-date-picker>
            <!--            <el-tooltip-->
            <!--                class="item"-->
            <!--                effect="dark"-->
            <!--                content="请先选择时间段"-->
            <!--                placement="bottom"-->
            <!--                :disabled="selectDateHall ? true : false"-->
            <!--            >-->
            <!--              <el-button-->
            <!--                  :class="`${selectDateHall ? 'isUse' : ''}`"-->
            <!--                  type="primary"-->
            <!--                  size="small"-->
            <!--                  class="export"-->
            <!--                  @click="exportHallCluesHandle"-->
            <!--              >导出-->
            <!--              </el-button>-->
            <!--            </el-tooltip>-->
            <el-button
              type="primary"
              size="small"
              class="export isUse"
              @click="exportHallCluesHandle"
            >导出
            </el-button>
          </div>
        </div>
        <div class="table-box">
          <div class="table">
            <el-table
              ref="hallCluesTable"
              :data="hallCluesData"
              style="width: 100%"
              max-height="440"
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
              ></el-table-column>
              <el-table-column
                prop="remark"
                label="咨询信息"
                align="left"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="createTs"
                label="创建时间"
                align="left"
                width="160"
              >
                <template slot-scope="scope">
                  <span>{{ $utils.commonDateFormat(scope.row.createTs, "yyyy-MM-dd hh:mm:ss") }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <!--    <page-footer v-if="!isIframe"></page-footer>-->
    <playShow
      :playClass="'picIframe'"
      :isPlay="isPlay"
      @closeDialog="isPlay = false"
      :url="url"
    />
  </div>
</template>

<script>
  import Echarts from "echarts";
  import "echarts/map/js/china.js";
  import allCities from "../../../../assets/json/china.json";
  import AnimatedNumber from "animated-number-vue";
  import Crypto from "@/utils/crypto.js";
  import playShow from "@/components/materialManage/play-material.vue";
  import QS from "qs";

  export default {
    components: {
      AnimatedNumber,
      playShow,
    },
    data() {
      const materialTypes = this.$commConst.MATERIALTYPE;
      return {
        // isIframe: window.parent !== window,
        dialogVisible: false,
        materialTypes,
        currentPage: 1,
        currentPage2: 1,
        currentPage3: 1,
        pageSize: 10,
        pageSize2: 10,
        todayCount: 0,
        allCount: 0,
        telephoneOrName: "",
        // isShowAll2: false,
        todayCountData: [],
        allCountData: [],
        date: new Date(),
        hallName: "",
        hallInfo: "",
        selectDateVisit: "",
        selectDateMap: "",
        selectDateTerminal: "",
        selectDateVisitor: "",
        selectDateHall: "",
        visitorTotal: 0,
        myCharts: null,
        isPlay: false,
        url: "",
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
        provincialData: [],
        countryData: [],
        terminalData: [],
        visitorData: [],
        xAxisData: [],
        interval: 0,
        pickerMinDate: "",
        materialType: "",
        materialImgUrl: "",
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
        materialTotal: 0,
        hallCluesData: [],
        hallCluesTotal: 0,
        pickerDisabled: {
          onPick: ({maxDate, minDate}) => {
            this.pickerMinDate = minDate.getTime();
            if (maxDate) {
              this.pickerMinDate = "";
            }
          },
          disabledDate: (time) => {
            if (this.pickerMinDate !== "") {
              const day30 = (60 - 1) * 24 * 3600 * 1000;
              let maxTime = this.pickerMinDate + day30;
              let minTime = this.pickerMinDate - day30;
              if (maxTime > new Date()) {
                maxTime = new Date();
              }
              return time.getTime() > maxTime || time.getTime() < minTime;
            }
            return time.getTime() > Date.now();
          },
        },
        pickerDisabled2: {
          onPick: ({maxDate, minDate}) => {
            this.pickerMinDate = minDate.getTime();
            if (maxDate) {
              this.pickerMinDate = "";
            }
          },
          disabledDate: (time) => {
            if (this.pickerMinDate !== "") {
              const day30 = (30 - 1) * 24 * 3600 * 1000;
              let maxTime = this.pickerMinDate + day30;
              let minTime = this.pickerMinDate - day30;
              if (maxTime > new Date()) {
                maxTime = new Date();
              }
              return time.getTime() > maxTime || time.getTime() < minTime;
            }
            return time.getTime() > Date.now();
          },
        },
        circleDeviceOS: [],
        circleRatio: [],
        count: [],
        tempid: "",
        isNODataChart: false,
        totalData2: [],
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
      this.getVisitorList(1);
      this.getCountry();
      this.scrollMaterialList();
      this.scrollHallCluesList();
      this.$nextTick(() => {
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
          startTime: this.selectDateHall ? this.selectDateHall[0] : "",
          endTime: this.selectDateHall ? this.selectDateHall[1] : "",
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

      //查看
      viewHandle(item) {
        // this.materialImgUrl = item.fileUrl;
        // this.dialogVisible = true;
        this.isPlay = true;
        if (item.fileType === this.materialTypes.model) {
          this.url = `${process.env.VUE_APP_APIURL}model/?code=${item.picId}&desc=0&icon=1&type=1&quick=0&opacity=0&full=0`;
        } else {
          this.url = `${process.env.VUE_APP_ViewURL}imageView/index.html?picid=${item.picId}`;
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
          let params = {
            obj: this.tempid,
          };
          this.$http.getVisitsNum(params).then((res) => {
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

      //获取终端分布数据
      getCircleChartData() {
        let params = {
          obj: this.tempid,
          queryType: this.activeValue3,
        };
        this.terminalInterface(params);
      },

      //获取访客列表
      getVisitorList(val) {
        if (val) {
          this.currentPage = val;
        }
        let params = {
          obj: this.tempid,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          startTimeStr: this.selectDatevisitor ? this.selectDatevisitor[0] : "",
          endTimeStr: this.selectDatevisitor ? this.selectDatevisitor[1] : "",
          queryType: this.activeValue4,
          tempId: this.tempid,
          dataSource: 1,
        };
        this.$http.getVisitorList(params).then((res) => {
          this.visitorData = res.list;
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

      //自定义查询展厅访问趋势
      selectDateVisitHandle(val) {
        if (val) {
          let params = {
            obj: this.tempid,
            queryType: "4",
            startTimeStr: val[0],
            endTimeStr: val[1],
          };
          this.activeValue1 = "4";
          this.trendsInterface(params);
          this.seriesName = "当日"
        }
      },

      //自定义查询省级分布,国家分布
      selectDateMapHandle(val) {
        if (val) {
          this.activeValue2 = "4";
          let mapData = this.geoJson.features.map((item) => {
            return {
              name: item.properties.name,
              value: 0,
              cityCode: item.properties.adcode,
              ratio: "0%",
            };
          });
          let params = {
            obj: this.tempid,
            queryType: "4",
            startTimeStr: val[0],
            endTimeStr: val[1],
          };
          this.provincialInterface(params);
          this.$http.getCountrySpread(params).then((res) => {
            this.countryData = res.slice(0, 5);
          });
        }
      },

      //自定义查询终端分布
      selectDateTerminalHandle(val) {
        if (val) {
          this.activeValue3 = "4";
          let params = {
            obj: this.tempid,
            queryType: "4",
            startTimeStr: val[0],
            endTimeStr: val[1],
          };
          this.terminalInterface(params);
        }
      },

      //自定义查询访客统计
      selectDateVisitorHandle(val) {
        this.selectDatevisitor = val;
        this.getVisitorList(1);
      },

      selectDateHallHandle(val) {
        this.selectDateHall = val;
        this.getHallCluesList()
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
          this.provincialData.map((item) => {
            let obj = {};
            obj.name = item.province;
            obj.value = item.countId;
            obj.ratio = item.ratio;
            arr.push(obj);
          });

          // for (var i = 0; i < mapData.length; i++) {
          //   cloneData.map((item) => {
          //     if (
          //       item.province.search(mapData[i].name) !== -1 ||
          //       mapData[i].name.search(item.province) !== -1
          //     ) {
          //       mapData[i].value = item.countId;
          //       mapData[i].ratio = item.ratio + "%";
          //     }
          //   });
          // }
          // arr = arr.sort(function(a, b) {
          //   return b.value - a.value;
          // });
          this.initEcharts(arr);
        });
      },
      // 国家分布接口
      getCountry() {
        let countryParams = {
          obj: this.tempid,
          queryType: this.activeValue2,
        };
        this.$http.getCountrySpread(countryParams).then((res) => {
          // console.log(res, "国家分布");
          this.countryData = res.slice(0, 5);
        });
      },
      //终端接口
      async terminalInterface(params) {
        await this.$http.getTerminalSpread(params).then((res) => {
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

      //导出
      exportHandle() {
        let params = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          queryType: this.activeValue4,
          startTimeStr: this.selectDateVisitor ? this.selectDateVisitor[0] : "",
          endTimeStr: this.selectDateVisitor ? this.selectDateVisitor[1] : "",
          tempId: this.tempid,
          dataSource: 1,
          tempName: this.hallName
        }
        window.open(
          `${process.env.VUE_APP_tongjiHost}/v1/m/template/tbl/event/user/getPageListExport?${QS.stringify(params)}`
        );
      },
      //素材统计导出
      exportMaterialHandle() {
        let params = {
          tempId: this.tempid,
          fileType: this.materialType
        }
        window.open(
          `${process.env.VUE_APP_tongjiHost}/v1/m/template/tbl/event/ext/getPageListExport?${QS.stringify(params)}`
        );
      },

      //展厅线索导出
      exportHallCluesHandle() {
        let me = this;
        let params = {
          tempIdOrName: this.tempid,
          telephoneOrName: this.telephoneOrName,
          startTime: this.selectDateHall ? this.selectDateHall[0] : "",
          endTime: this.selectDateHall ? this.selectDateHall[1] : ""
        }
        // window.open(
        //     `${process.env.VUE_APP_tongjiHost}/v1/m/template/visitors/export?${QS.stringify(params)}`
        // );
        me.$http.exportVisitors(params).then(res => {
          this.$utils.DownloadFile(res, "访客信息", "application/vnd.ms-excel")
        })
      },

      //省份统计导出
      exportProvincialHandle(type) {
        let params = {
          obj: this.tempid,
          queryType: this.activeValue2,
          startTimeStr: this.selectDateMap ? this.selectDateMap[0] : "",
          endTimeStr: this.selectDateMap ? this.selectDateMap[1] : "",
          userId: window.localStorage.getItem("userId")
        }
        if (type === "Provinc") {
          window.open(
            `${process.env.VUE_APP_tongjiHost}/v1/m/template/tbl/event/getCountProvinceExport?${QS.stringify(params)}`
          );
        } else {
          window.open(
            `${process.env.VUE_APP_tongjiHost}/v1/m/template/tbl/event/getCountCountryExport?${QS.stringify(params)}`
          );
        }

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
            left: "20px",
            right: "30px",
            bottom: "0",
            containLabel: true,
          },
          xAxis: {
            type: "category",
            boundaryGap: false, //坐标轴两边留白
            data: this.xAxisData,
            axisLabel: {
              //坐标轴刻度标签的相关设置。
              interval: this.interval, //设置为 1，表示『隔一个标签显示一个标签』
              //	margin:15,
              textStyle: {
                color: "#666",
                fontStyle: "normal",
                fontFamily: "微软雅黑",
                fontSize: 12,
              },
              formatter: function (params) {
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
                formatter: function () {
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
        setTimeout(function () {
          window.onresize = function () {
            myChart.resize();
          };
        }, 200);
      },

      //获取数据
      getMapData() {
        let mapData = this.geoJson.features.map((item) => {
          return {
            name: item.properties.name,
            value: 0,
            cityCode: item.properties.adcode,
            ratio: "0%",
          };
        });
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
                if (p.data) {
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
                top: 20,
                left: 35,
                width: 200,
                roam: false, //是否可缩放
                zoom: 1.25, //缩放比例
                data: mapData,
                label: {
                  normal: {
                    show: false, //是否默认显示省份名字
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
            formatter: function (params) {
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
            left: "18%",
            bottom: 15,
            itemWidth: 10,
            itemHeight: 10,
            icon: "circle",
            data: getName,
            formatter: function (name) {
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
                  // width: 60,
                  // height: 30,
                  padding: [0, 10, 0, 3],
                  color: "#999",
                },
              },
            },
          },
          series: [
            {
              type: "pie",
              radius: ["55%", "70%"],
              center: ["40%", "40%"],
              itemStyle: {
                normal: {
                  color: function (params) {
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

      selectTimeHandle1(val) {
        this.activeValue1 = val;
        this.selectDateVisit = "";
        this.getTrends();
        if (val == "1") {
          this.seriesName = "时段"
        } else {
          this.seriesName = "当日"
        }

      },
      selectTimeHandle2(val) {
        this.activeValue2 = val;
        this.selectDateMap = "";
        this.getMapData();
        this.getCountry();
      },
      selectTimeHandle3(val) {
        this.activeValue3 = val;
        this.selectDateTerminal = "";
        this.getCircleChartData();
      },
      selectVisitorHandle(val) {
        this.activeValue4 = val;
        this.getVisitorList(1);
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.getVisitorList(1);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getVisitorList();
      },
    },
  };
</script>

<style src="./statistics.scss" lang="scss" scoped></style>
<style type="text/css" lang="scss">
  .el-tooltip__popper {
    max-width: 400px;
  }
</style>
