<template>
  <div class="exhibition-info-wrap">
    <el-dialog
      :visible.sync="visible"
      :fullscreen="false"
      :modal="true"
      :show-close="true"
      title="设置"
      width="670px"
      :close-on-click-modal="false"
      custom-class="exhibition-info"
      :before-close="onbeforeClose"
    >
      <div class="flex-start" v-loading="loading" element-loading-text="保存中">
        <ul>
          <li
            class="tabLi"
            :class="{ active: tabIndex == index }"
            v-for="(item, index) in tabList"
            :key="index"
            @click="scrollTo(item.id)"
          >
            {{ item.text }}
<!--            <svg-icon v-if="index === 3" icon-class="NEW"></svg-icon>-->
          </li>
        </ul>
        <el-form
          :model="materialUp"
          :rules="rules"
          ref="materialUp"
          label-width="100px"
        >
          <div @scroll="scroll" class="materialUp">
            <div class="select-item logo" id="info">
              <el-form-item label="LOGO：">
                <div class="logo" @click="updateLogo">
                  <img :src="logoUrl"/>
                  <p class="flex-center-column">更换</p>
                  <input
                    type="file"
                    ref="logo"
                    accept="image/jpg,image/png,image/jpeg"
                    @change="logoChange"
                  />
                </div>
                <p class="tips">支持2MB以内的PNG/JPG</p>
              </el-form-item>
              <el-form-item label="展厅名称：" prop="name">
                <el-input
                  v-model="materialUp.name"
                  maxlength="30"
                  placeholder="请输入1-30个文字"
                ></el-input>
              </el-form-item>
              <el-form-item label="展厅描述：">
                <el-input
                  type="textarea"
                  rows="3"
                  maxlength="300"
                  show-word-limit
                  v-model="materialUp.discripe"
                  placeholder="请输入展厅描述"
                ></el-input>
              </el-form-item>
              <div class="flex">
                <div>
                  <div class="flex-start">
                    <el-form-item label="联系人：">
                      <el-input
                        v-model="materialUp.contactName"
                        maxlength="8"
                        placeholder="请输入联系人"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="flex-start">
                    <el-form-item label="电话：" prop="contactPhone">
                      <el-input
                        v-model="materialUp.contactPhone"
                        placeholder="请输入电话"
                        maxlength="15"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="flex-start">
                    <el-form-item label="邮箱：" prop="contactEmail">
                      <el-input
                        v-model="materialUp.contactEmail"
                        placeholder="请输入邮箱号码"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="wxcode">
                  <el-form-item label="微信二维码：">
                    <div class="pc upimg">
                      <div class="fileup">
                        <div class="hasimg" v-if="showImg.wxQrcode">
                          <label>
                            <input
                              ref="wxQrcode"
                              type="file"
                              @change="wxQrcode"
                              accept="image/jpeg,image/png"
                            />
                            <img class="video" :src="showImg.wxQrcode"/>
                            <div class="cover">
                              <span>重新上传</span>
                            </div>
                          </label>
                          <span
                            class="delete-video-icon"
                            @click="deletewxCodeHandle"
                          >
                          <svg-icon icon-class="delete"></svg-icon>
                        </span>
                        </div>
                        <label v-else>
                          <input
                            ref="wxQrcode"
                            type="file"
                            @change="wxQrcode"
                            accept="image/jpeg,image/png"
                          />
                          <div class="noimg">
                            <svg-icon iconClass="upimg"></svg-icon>
                            <p>上传二维码</p>
                          </div>
                        </label>
                      </div>
                      <p class="desc">2M以内的PNG/JPG</p>
                    </div>
                  </el-form-item>
                </div>
              </div>
              <el-form-item label="展厅地址：">
                <el-input
                  maxlength="50"
                  v-model="materialUp.contactAddress"
                  placeholder="请输入展厅所在地址"
                ></el-input>
              </el-form-item>
            </div>
            <div class="select-item" id="cover">
              <el-form-item label="封面图片：">
                <div class="thumbnail flex">
                  <div class="pc upimg">
                    <p class="desc desctop">仅限JPG/PNG格式，2MB以内</p>
                    <div class="fileup">
                      <div class="hasimg" v-if="showImg.pcthumb">
                        <label>
                          <input
                            type="file"
                            @change="pcthumb"
                            accept="image/jpeg,image/png"
                          />
                          <img :src="showImg.pcthumb" alt="" class="tar"/>
                          <div class="cover">
                            <span>重新上传</span>
                          </div>
                        </label>
                        <span
                          class="delete-video-icon"
                          @click="deleteCoverHandle"
                        >
                          <svg-icon icon-class="delete"></svg-icon>
                        </span>
                      </div>
                      <label v-else>
                        <input
                          type="file"
                          @change="pcthumb"
                          accept="image/jpeg,image/png"
                        />
                        <div class="noimg">
                          <svg-icon iconClass="upimg"></svg-icon>
                          <p>上传图片</p>
                        </div>
                      </label>
                    </div>
                    <p class="desc">建议尺寸1920*1080px</p>
                  </div>
                  <div class="moblie upimg">
                    <p class="desc desctop">手机端：</p>
                    <div class="fileup ">
                      <div class="hasimg" v-if="showImg.mobilethumb">
                        <label>
                          <input
                            type="file"
                            @change="mobilethumb"
                            accept="image/jpeg,image/png"
                          />
                          <img :src="showImg.mobilethumb" alt="" class="tar"/>
                          <div class="cover">
                            <span>重新上传</span>
                          </div>
                        </label>
                        <span
                          class="delete-video-icon"
                          @click="deleteCoverMHandle"
                        >
                          <svg-icon icon-class="delete"></svg-icon>
                        </span>
                      </div>
                      <label v-else>
                        <input
                          type="file"
                          @change="mobilethumb"
                          accept="image/jpeg,image/png"
                        />
                        <div class="noimg">
                          <svg-icon iconClass="upimg"></svg-icon>
                          <p>上传图片</p>
                        </div>
                      </label>
                    </div>
                    <p class="desc">1242*2016px</p>
                  </div>
                </div>
              </el-form-item>

              <el-form-item label="封面视频：">
                <div class="thumbnail flex">
                  <div class="pc upimg">
                    <p class="desc desctop">
                      {{ videoMaxSize }}MB以内MP4，建议H.264编码
                    </p>
                    <div class="fileup">
                      <div class="hasimg" v-if="showVideo.videoUrl">
                        <label>
                          <input
                            type="file"
                            @change="uploadVideoCover"
                            accept="video/mp4"
                          />
                          <video class="video" :src="showVideo.videoUrl"></video>
                          <div class="cover">
                            <span>重新上传</span>
                          </div>
                        </label>
                        <span
                          class="delete-video-icon"
                          @click="deleteVideoHandle"
                        >
                          <svg-icon icon-class="delete"></svg-icon>
                        </span>
                      </div>
                      <label v-else>
                        <input
                          type="file"
                          @change="uploadVideoCover"
                          accept="video/mp4"
                        />
                        <div class="noimg">
                          <svg-icon iconClass="upimg"></svg-icon>
                          <p>上传视频</p>
                        </div>
                      </label>
                    </div>
                    <p class="desc">建议尺寸1920*1080px</p>
                  </div>
                  <div class="moblie upimg upvideo">
                    <p class="desc desctop">手机端：</p>
                    <div class="fileup">
                      <div class="hasimg" v-if="showVideo.videoUrlMobile">
                        <label>
                          <input
                            type="file"
                            @change="uploadVideoCoverMobile"
                            accept="video/mp4"
                          />
                          <video class="video" :src="showVideo.videoUrlMobile"></video>
                          <div class="cover">
                            <span>重新上传</span>
                          </div>
                        </label>
                        <span
                          class="delete-video-icon"
                          @click="deleteVideoMHandle"
                        >
                          <svg-icon icon-class="delete"></svg-icon>
                        </span>
                      </div>
                      <label v-else>
                        <input
                          type="file"
                          @change="uploadVideoCoverMobile"
                          accept="video/mp4"
                        />
                        <div class="noimg">
                          <svg-icon iconClass="upimg"></svg-icon>
                          <p>上传视频</p>
                        </div>
                      </label>
                    </div>
                    <p class="desc">1242*2016px</p>
                  </div>
                </div>
              </el-form-item>
            </div>
            <div class="select-item music" id="music">
                <el-form-item label="背景音乐：">
                  <el-button type="info" size="medium" @click="addMusicHandle">+ 添加音频</el-button>
                  <div class="checkbox">
                    <el-checkbox v-model="materialUp.musicAutoPlay" :disabled="!materialUp.musicId">自动播放背景音乐</el-checkbox>
                  </div>
                  <div class="chooseMusic" v-if="materialUp.musicId">
                    <div class="left">
                      <span>{{materialUp.musicName}}</span>
                      <i class="el-icon-video-play" v-if="!playMusicId" @click.stop="playMusic(materialUp.musicId, musicUrl)"></i>
                      <i class="el-icon-video-pause" v-else @click.stop="pauseMusic()"></i>
                    </div>
                    <i class="el-icon-error" @click="clearMusic"></i>
                  </div>
                </el-form-item>
<!--                  <el-switch-->
<!--                    v-model="materialUp.closeMusic"-->
<!--                    inactive-color="#DCDFE6"-->
<!--                    active-color="#19A0F1"-->
<!--                  >-->
<!--                  </el-switch>-->
<!--                <p class="mine" v-if="materialUp.closeMusic">-->
<!--                  <span-->
<!--                    :class="{ active: musicTabIndex == index }"-->
<!--                    v-for="(item, index) in musicTab"-->
<!--                    :key="index"-->
<!--                    @click="myMusic(index)"-->
<!--                  >-->
<!--                    {{ item }}-->
<!--                    <a v-if="index == 0">|</a>-->
<!--                  </span>-->
<!--                </p>-->
<!--              <div v-if="materialUp.closeMusic" class="musicList">-->
<!--                <ul-->
<!--                  v-if="musicTypeId !== selfType"-->
<!--                  class="flex-wrap-start musicType"-->
<!--                  :style="{ height: isOpen ? 'auto' : '' }"-->
<!--                >-->
<!--                  <li-->
<!--                    v-for="(item, index) in musicType"-->
<!--                    :key="index"-->
<!--                    @click="searchMusicByType(item.musicTypeId, index)"-->
<!--                    :class="{ isChooseed: musicTypeId === item.musicTypeId }"-->
<!--                  >-->
<!--                    {{ item.name }}-->
<!--                  </li>-->
<!--                </ul>-->
<!--                <div class="border">-->
<!--                  <div-->
<!--                    class="upMp3"-->
<!--                    v-if="musicTypeId === selfType"-->
<!--                    @click="musicClick"-->
<!--                  >-->
<!--                    <svg-icon icon-class="upload"></svg-icon>-->
<!--                    <span>上传 MP3</span>-->
<!--                    <input-->
<!--                      type="file"-->
<!--                      ref="upMusic"-->
<!--                      @change="uploadMusic"-->
<!--                      accept="audio/mpeg"-->
<!--                    />-->
<!--                  </div>-->
<!--                  <div class="noData" v-if="getchoosedMusic.length <= 0">-->
<!--                    很抱歉，该分类下无音乐！-->
<!--                  </div>-->
<!--                  <p-->
<!--                    v-else-->
<!--                    v-for="(item, index) in getchoosedMusic"-->
<!--                    :class="{-->
<!--                      isChooseMusic: item.musicId === materialUp.musicId,-->
<!--                    }"-->
<!--                    class="flex"-->
<!--                    :key="index"-->
<!--                    @click="chooseMusic(item.musicId)"-->
<!--                  >-->
<!--                    <svg-icon-->
<!--                      icon-class="play"-->
<!--                      v-if="playMusicId !== item.musicId"-->
<!--                      @click.stop="playMusic(item.musicId, item.musicFile)"-->
<!--                    ></svg-icon>-->
<!--                    <svg-icon-->
<!--                      icon-class="pause1"-->
<!--                      v-else-->
<!--                      @click.stop="pauseMusic()"-->
<!--                    ></svg-icon>-->
<!--                    <span class="otw">{{ item.name }}</span>-->
<!--                    <a v-if="item.musicId !== materialUp.musicId"></a>-->
<!--                    <i-->
<!--                      class="el-icon-success"-->
<!--                      v-if="item.musicId === materialUp.musicId"-->
<!--                    ></i>-->
<!--                  </p>-->
<!--                </div>-->
<!--                <p-->
<!--                  v-if="musicTypeId !== selfType"-->
<!--                  class="more flex-center-column"-->
<!--                  @click="typeMore"-->
<!--                >-->
<!--                  <i-->
<!--                    :style="{ transform: isOpen ? 'rotateZ(-180deg)' : '' }"-->
<!--                    class="el-icon-arrow-down"-->
<!--                  ></i>-->
<!--                </p>-->
<!--              </div>-->
            </div>
            <div class="select-item live" id="serve">
<!--              <p class="title">-->
<!--                <i class="el-icon-warning-outline"></i-->
<!--                >选择增值服务后，需购买才可生效-->
<!--              </p>-->
              <div
                class="addValue"
                v-for="(item, index) in addValue"
                :key="index"
              >
                <div class="flex">
                  <p class="text">
                    {{ item.text }}
                    <span v-if="item.text2" class="text2">{{
                      item.text2
                    }}</span>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      :content="item.desc"
                      placement="top-start"
                    >
                      <i class="el-icon-warning-outline"></i>
                    </el-tooltip>
<!--                    <el-button-->
<!--                      class="take-look"-->
<!--                      v-if="index == 3 && materialUp.varLook !== 2"-->
<!--                      size="mini"-->
<!--                      @click="varLookHandle"-->
<!--                    >体验带看-->
<!--                    </el-button>-->
                  </p>
<!--                  <div>-->
<!--                    <span v-if="item.isCheck === 2" class="paid">已付费</span>-->
<!--                    <el-checkbox-->
<!--                      v-else-->
<!--                      v-model="item.isCheck"-->
<!--                      :true-label="1"-->
<!--                      :false-label="0"-->
<!--                    ></el-checkbox>-->
<!--                  </div>-->
                  <!--                  <p class="desc">{{item.desc}}</p>-->
                </div>
                <p class="flex code" v-if="index === 0">
                  <label>客服代码：</label>
                  <el-input v-model="materialUp.custServiceCode"/>
                </p>
                <div
                  class="liveService"
                  v-if="index === 1"
                >
                  <p class="tips">
                    建议使用一直播、企鹅电竞、YY直播；其他直播平台会出现兼容性问题
                  </p>
                  <el-form-item
                    class="selectTime liveTime"
                    prop="liveStartTime"
                    label="直播时间："
                  >
                    <el-date-picker
                      style="margin-right: 10px;"
                      v-model="materialUp.liveStartTime"
                      type="datetime"
                      placeholder="选择开始日期时间"
                      value-format="yyyy-MM-dd HH:mm"
                      format="yyyy-MM-dd HH:mm"
                      :picker-options="{
                        disabledDate: pickerStartDisabled,
                        selectableRange: `00:00:00 -${
                          rangStartTime ? rangStartTime + ':00' : '23:59:00'
                        }`,
                      }"
                    ></el-date-picker>
                    <el-form-item prop="liveEndTime">
                      <el-date-picker
                        v-model="materialUp.liveEndTime"
                        type="datetime"
                        placeholder="选择结束日期时间"
                        value-format="yyyy-MM-dd HH:mm"
                        format="yyyy-MM-dd HH:mm"
                        :picker-options="{
                          disabledDate: pickerEndDisabled,
                          selectableRange: `${
                            rangEndTime ? rangEndTime + ':00' : '00:00:00'
                          } - 23:59:00`,
                        }"
                      ></el-date-picker>
                    </el-form-item>
                  </el-form-item>

                  <el-form-item label="直播链接：" prop="liveUrl">
                    <el-input
                      v-model="materialUp.liveUrl"
                      placeholder="请输入直播链接"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="打开方式：" prop="liveOpenType">
                    <el-radio v-model="materialUp.liveOpenType" :label="0"
                    >当前页打开
                    </el-radio>
                    <el-radio v-model="materialUp.liveOpenType" :label="1"
                    >新页面打开
                    </el-radio>
                  </el-form-item>
                </div>
              </div>
            </div>
            <div class="select-item vr" id="vr" v-if="materialUp.varLook === 2">
              <div class="addValue">
                <div class="flex">
                  <p class="text">
                    VR带看
                    <span class="text2">1对1</span>
                    <el-tooltip
                            class="item"
                            effect="dark"
                            content="开通VR带看，用户可邀请主持人实现1对1同屏互动及语音讲解"
                            placement="top-start"
                    >
                      <i class="el-icon-warning-outline"></i>
                    </el-tooltip>
                  </p>
                </div>
                <div
                        class="VRService"
                >
                  <el-form-item label="带看时间段：" prop="vrTime">
                    <div>
                      <el-time-picker
                              is-range
                              v-model="materialUp.vrTime"
                              range-separator="-"
                              start-placeholder="00:00"
                              end-placeholder="24:00"
                              placeholder="选择时间范围"
                              value-format="HH:mm"
                              format="HH:mm"
                      >
                      </el-time-picker>
                    </div>
                  </el-form-item>
                  <el-form-item label="">
                    <div class="addHost">
                      <el-button class="host" size="medium" @click="addHost"
                      >+ 添加主持人
                      </el-button
                      >
                    </div>
                    <ul class="hostList">
                      <li v-for="(item, index) in hostList" :key="index">
                        <span class="phone">{{ item.accid }}</span>
                        <span class="name">{{ item.nickname }}</span>
                        <i class="el-icon-error" @click="deleteHost(index)"></i>
                      </li>
                    </ul>
                  </el-form-item>
                </div>
              </div>
            </div>
            <div class="select-item" id="map">
              <el-form-item label="上传图片：">
                <p>
                  仅限JPG/PNG格式，2MB以内；上传并保存后，展厅浏览时所在点位的顶面和底面会显示该图片
                </p>
              </el-form-item>
              <el-form-item label="">
                <div class="fileup panoImg">
                  <label>
                    <input
                      type="file"
                      @change="pcthumb($event, true)"
                      accept="image/jpeg,image/png"
                    />
                    <div class="hasimg" v-if="showImg.panoImg">
                      <img :src="showImg.panoImg" alt="" class="tar"/>
                      <div class="cover">
                        <svg-icon icon-class="delete" @click.prevent="deletePano"></svg-icon>
                        <span>重新上传</span>
                      </div>
                    </div>
                    <div v-else class="noimg">
                      <svg-icon iconClass="upimg"></svg-icon>
                      <p>上传图片</p>
                    </div>
                  </label>
                </div>
              </el-form-item>
            </div>
            <div class="select-item skin" id="skin">
              <el-form-item label="皮肤：">
                <p>可选择展厅浏览时底部栏按钮皮肤。</p>
                <ul>
                  <li v-for="(item, index) in skinList" :key="index">
                    <el-radio
                      v-model="materialUp.skinSetting"
                      :label="item.label"
                    >
                      <el-popover
                        popper-class="show-skin"
                        placement="top-end"
                        offset="104"
                        trigger="hover"
                      >
                        <img :src="item.img" alt=""/>
                        <img slot="reference" :src="item.icons" alt=""/>
                      </el-popover>
                    </el-radio>
                  </li>
                </ul>
              </el-form-item>
              <el-form-item label="按钮：">
                <p>可显示/隐藏展厅底部栏按钮，勾选后展厅浏览时显示该按钮。</p>
                <ul class="buttons">
                  <li
                    v-for="(item, index) in buttons"
                    :key="index"
                    v-if="!!item.text"
                  >
                    <el-checkbox v-model="item.isCheck"
                    >{{ item.text }}
                    </el-checkbox>
                  </li>
                </ul>
              </el-form-item>
            </div>
            <div class="select-item" id="set">
              <el-form-item label="权限设置：">
                <ul>
                  <li
                    v-if="materialUp.custService && materialUp.custServiceCode"
                  >
                    <el-checkbox v-model="materialUp.myCustService"
                    >客服
                    </el-checkbox>
                  </li>
                  <li
                    v-for="(item, index) in power"
                    :key="index"
                    class="flex"
                    v-if="!!item.text"
                  >
                    <el-checkbox v-model="item.isCheck"
                    >{{ item.text }}
                    </el-checkbox>
                    <el-input
                      class="password"
                      v-if="item.key === 'usePwd' && item.isCheck"
                      type="password"
                      v-model="materialUp.password"
                      placeholder="请输入密码"
                    ></el-input>
                  </li>
                </ul>
              </el-form-item>
            </div>
          </div>
          <p class="footer flex-end">
            <el-button @click="onbeforeClose">取消</el-button>
            <el-button type="primary" :disabled="btnDisabled" @click="saveInfo"
            >保存
            </el-button>
          </p>
        </el-form>
        <audio ref="tryAudio" :src="musicUrl" loop></audio>
        <logoClip
          :isvisible="isvisible"
          :coverUrl="coverUrl"
          @changeImg="changeImg"
          @close="isvisible = false"
        />
      </div>
    </el-dialog>
<!--    <pay :visible="payVisible" :obj="payObj" @close="pay"></pay>-->
    <vrHost
      :visible="vrHostVisible"
      :hostList="hostList"
      :tempId="tempId"
      @closepop="closevrHost"
    ></vrHost>
    <musicList
      :visible="musicListVisible"
      :musicId="materialUp.musicId"
      @closepop="closeMusicListHost"
    ></musicList>
  </div>
</template>

<script>
  import formRules from "@/config/form-rules.js";
  import clipImage from "@/components/clip-image.vue";
  import {checkFile} from "@/utils/files";
  import logoClip from "./logo-clip";
  import md5 from "js-md5";
  // import pay from "@/components/popup/pay";
  import vrHost from "./vr-host.vue";
  import musicList from "./musicList.vue";

  export default {
    name: "exhibition-setInfo",
    data() {
      var checkLiveStartTime = (rule, value, callback) => {
        if ((this.materialUp.liveEndTime || this.materialUp.liveUrl) && !value) {
          callback(new Error("选择开始日期时间"));
        } else {
          callback();
        }
      };
      var checkLiveEndTime = (rule, value, callback) => {
        if (
            (this.materialUp.liveStartTime || this.materialUp.liveUrl) &&
            !value
        ) {
          callback(new Error("选择结束日期时间"));
        } else {
          callback();
        }
      };
      var checkLiveUrl = (rule, value, callback) => {
        if (
            (this.materialUp.liveStartTime || this.materialUp.liveEndTime) &&
            !value
        ) {
          callback(new Error("直播链接不能为空"));
        } else {
          callback();
        }
      };

      var checkVRTime = (rule, value, callback) => {
        if (
            !value ||
            this.materialUp.vrTime[0] == "-" ||
            this.materialUp.vrTime[1] == "-"
        ) {
          if (this.hostList && this.hostList.length > 0) {
            callback(new Error("请选择带看时间段"));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };

      return {
        visible: false,
        materialUp: {},
        hostList: [],
        buttons: [],
        rules: {
          name: [
            {
              required: true,
              validator: formRules.sceneName,
              trigger: "blur",
            },
          ],
          typeId: [
            {
              required: true,
              message: "所属行业不能为空",
              trigger: "blur",
            },
          ],
          contactEmail: [
            {
              required: false,
              validator: formRules.checkEmail,
              trigger: "blur",
            },
          ],
          contactPhone: [
            {
              required: false,
              validator: formRules.checkPhone2,
              trigger: 'blur'
            }
          ],
          liveStartTime: [
            {
              trigger: "blur",
              validator: checkLiveStartTime,
            },
          ],
          liveEndTime: [
            {
              trigger: "blur",
              validator: checkLiveEndTime,
            },
          ],
          liveUrl: [
            {
              validator: checkLiveUrl,
              trigger: "blur",
            },
          ],
          vrTime: [
            {
              validator: checkVRTime,
              trigger: "blur",
            },
          ],
        },
        showImg: {},
        showVideo: {
          videoUrl: "",
          videoUrlMobile: ""
        },
        videoMaxSize: 50,
        industrys: [],
        tabList: [
          {
            text: "展厅信息",
            id: "info"
          },
          {
            text: "展厅封面",
            id: "cover"
          },
          {
            text: "背景音乐",
            id: "music"
          },
          {
            text: "直播/客服",
            id: "serve"
          },
          {
            text: "天地图",
            id: "map"
          },
          {
            text: "皮肤&按钮",
            id: "skin"
          },
          {
            text: "权限设置",
            id: "set"
          }
        ],
        skinList: [
          {
            label: 1,
            icons: require("@/assets/images/skin/skin-icons2.png"),
            img: require("@/assets/images/skin/skin2.png"),
          },
          {
            label: 2,
            icons: require("@/assets/images/skin/skin-icons3.png"),
            img: require("@/assets/images/skin/skin3.png"),
          },
          {
            label: 3,
            icons: require("@/assets/images/skin/skin-icons1.png"),
            img: require("@/assets/images/skin/skin1.png"),
          },
        ],
        tabIndex: 0,
        scrollDiv: "",
        musicType: [],
        musicList: [],
        selfType: "mine",
        musicTypeId: "",
        playMusicId: "",
        musicUrl: "",
        btnDisabled: false,
        power: [],
        isOpen: false,
        loading: false,
        musicTab: ["音乐库", "我的"],
        musicTabIndex: 0,
        isvisible: false,
        coverUrl: "",
        logoUrl: "",
        liveService: false,
        pickerMinDate: "",
        pickerDate: "",
        rangStartTime: "",
        rangEndTime: "",
        addValue: [],
        payData: {},
        payObj: {},
        tempId: "",
        payVisible: false,
        vrHostVisible: false,
        musicListVisible: false,
        isVR: false
      };
    },
    components: {
      clipImage,
      logoClip,
      // pay,
      vrHost,
      musicList
    },
    computed: {
      // getchoosedMusic() {
      //   var $this = this,
      //       getchoosedMusic = [];
      //   this.musicList.forEach(function (item) {
      //     if (item.musicId == $this.musicId) {
      //       getchoosedMusic.unshift(item);
      //     } else {
      //       getchoosedMusic.push(item);
      //     }
      //   });
      //   return getchoosedMusic;
      // },
      // userInfo() {
      //   return this.$store.state.userinfo
      // }
    },
    methods: {
      //体验带看
      varLookHandle() {
        // let url = `${location.protocol +
        //   process.env.VUE_APP_ViewURL}sceneFront/index.html?G_TEMP_ID=${
        //   this.tempId
        // }&testVr=1`;
        window.open("https://obs.3dyunzhan.com/sceneFront/index.html?G_TEMP_ID=b986d4487bb04eae8a1448a06559c476", "_blank");
      },
      deletePano(e) {
        e.stopPropagation();
        this.showImg.panoImg = "";
        this.materialUp.isPanoImg = true;
      },

      liveStateHandle(state) {
        if (!this.materialUp.liveState) {
          this.$nextTick(() => {
            this.$refs["materialUp"].resetFields();
          });
        }
        if (!state && this.materialUp.liveEndTime) {
          let liveEndTime = this.materialUp.liveEndTime.valueOf();
          let liveStartTime = this.materialUp.liveStartTime.valueOf();
          let currentTime = this.getCurrentDate().valueOf();
          if (liveEndTime > currentTime && liveStartTime < currentTime) {
            this.$Ruler
                .confirm({
                  msg: "您有正在进行的直播，是否要关闭？",
                })
                .then((res) => {
                  if (res == "ok") {
                    this.$nextTick(() => {
                      this.materialUp.liveStartTime = "";
                      this.materialUp.liveEndTime = "";
                      this.materialUp.liveUrl = "";
                    });
                    this.rules.liveStartTime = [
                      {
                        required: false,
                      },
                    ];
                    this.rules.liveEndTime = [
                      {
                        required: false,
                      },
                    ];
                    this.rules.liveUrl = [
                      {
                        required: false,
                      },
                    ];
                  } else {
                    this.materialUp.liveState = true;
                  }
                });
          } else {
            this.$nextTick(() => {
              this.materialUp.liveStartTime = "";
              this.materialUp.liveEndTime = "";
              this.materialUp.liveUrl = "";
            });
            this.rules.liveStartTime = [
              {
                required: false,
              },
            ];
            this.rules.liveEndTime = [
              {
                required: false,
              },
            ];
            this.rules.liveUrl = [
              {
                required: false,
              },
            ];
          }
        } else if (!state) {
          this.$nextTick(() => {
            this.materialUp.liveStartTime = "";
            this.materialUp.liveEndTime = "";
            this.materialUp.liveUrl = "";
          });
          this.rules.liveStartTime = [
            {
              required: false,
            },
          ];
          this.rules.liveEndTime = [
            {
              required: false,
            },
          ];
          this.rules.liveUrl = [
            {
              required: false,
            },
          ];
        } else {
          this.rules.liveStartTime = [
            {
              required: true,
              message: "请选择直播开始日期和时间",
              trigger: "blur",
            },
          ];
          this.rules.liveEndTime = [
            {
              required: true,
              message: "请选择直播结束日期和时间",
              trigger: "blur",
            },
          ];
          this.rules.liveUrl = [
            {
              required: true,
              validator: formRules.checkUrl,
              trigger: "blur",
            },
          ];
        }
      },
      //获取当前时间
      getCurrentDate() {
        var now = new Date();
        var year = now.getFullYear(); //得到年份
        var month = now.getMonth(); //得到月份
        var date = now.getDate(); //得到日期
        var hour = now.getHours(); //得到小时
        var minu = now.getMinutes(); //得到分钟
        month = month + 1;
        if (month < 10) month = "0" + month;
        if (date < 10) date = "0" + date;
        if (hour < 10) hour = "0" + hour;
        if (minu < 10) minu = "0" + minu;
        var time = "";
        //精确到分
        time = year + "-" + month + "-" + date + " " + hour + ":" + minu;
        return time;
      },
      pickerStartDisabled(time) {
        let that = this;
        if (that.materialUp.liveEndTime) {
          let timeStr = that.materialUp.liveEndTime.substring(0, 10);
          let endTime = new Date(timeStr);
          let endTimeTemp = endTime.getTime();

          let maxTime = endTimeTemp;
          let minTime = endTimeTemp - 24 * 60 * 60 * 1000 * 2;

          if (that.materialUp.liveStartTime) {
            let timeStr2 = that.materialUp.liveStartTime.substring(0, 10);
            let startTime = new Date(timeStr2);
            let startTimeTemp = startTime.getTime();
            if (endTimeTemp === startTimeTemp) {
              let Str = that.materialUp.liveEndTime.substring(11, 16);
              that.rangStartTime = Str + ":00";
            } else {
              that.rangStartTime = "";
            }
          }

          return time.getTime() < minTime || time.getTime() > maxTime;
        } else {
          const day30 = (30 - 1) * 24 * 3600 * 1000;
          let max = Date.now() + day30;
          let min = new Date() - 24 * 60 * 60 * 1000;
          that.rangStartTime = "";
          return time.getTime() < min || time.getTime() > max;
        }
      },

      pickerEndDisabled(time) {
        let that = this;
        if (that.materialUp.liveStartTime) {
          let timeStr = that.materialUp.liveStartTime.substring(0, 10);
          let startTime = new Date(timeStr);
          let startTimeTemp = startTime.getTime();

          let maxTime = startTimeTemp + 24 * 60 * 60 * 1000;
          let minTime = startTimeTemp - 24 * 60 * 60 * 1000;

          if (that.materialUp.liveEndTime) {
            let timeStr2 = that.materialUp.liveEndTime.substring(0, 10);
            let endTime = new Date(timeStr2);
            let endTimeTemp = endTime.getTime();
            if (endTimeTemp === startTimeTemp) {
              let Str = that.materialUp.liveStartTime.substring(11, 16);
              that.rangEndTime = Str + ":00";
            } else {
              that.rangEndTime = "";
            }
          }

          return time.getTime() < minTime || time.getTime() > maxTime;
        } else {
          const day30 = (30 - 1) * 24 * 3600 * 1000;
          let max = Date.now() + day30;
          let min = new Date() - 24 * 60 * 60 * 1000;
          that.rangEndTime = "";
          return time.getTime() < min || time.getTime() > max;
        }
      },
      // getPublicMusic(musicTypeId) {
      //   var $this = this;
      //   this.$http
      //       .publicMusic({
      //         musicTypeId: musicTypeId,
      //       })
      //       .then(function (res) {
      //         $this.musicList = res.list || [];
      //       })
      //       .catch(function (res) {
      //         console.log(res);
      //       });
      // },
      pauseMusic() {
        this.$nextTick(() => {
          if (this.$refs.tryAudio) {
            this.$refs.tryAudio.pause();
          }
        });
        this.playMusicId = "";
      },
      playMusic(musicId, musicFile) {
        this.musicUrl = musicFile;
        this.$nextTick(() => {
          if (this.$refs.tryAudio) {
            this.$refs.tryAudio.play();
          }
        });
        this.playMusicId = musicId;
      },
      // initVar() {
      //   this.musicType = [];
      //   this.musicList = [];
      //   this.musicTypeId = "";
      //   this.musicUrl = "";
      //   // this.isHaveMusic = this.closeMusic;
      //   // this.materialUp.musicId = this.musicId;
      //   // console.log(this.musicId)
      // },
      // getMusicTypeList() {
      //   var $this = this;
      //   this.initVar();
      //   this.$http
      //       .getMusicType()
      //       .then(function (res) {
      //         var arr = res || [];
      //         arr.unshift({
      //           name: "全部",
      //           musicTypeId: "",
      //         });
      //         $this.musicType = arr;
      //         $this.openMusicList = true;
      //         $this.getPublicMusic("");
      //       })
      //       .catch(function (res) {
      //         console.log(res);
      //       });
      // },
      // searchMusicByType(musicTypeId, index) {
      //   if(musicTypeId == this.selfType){
      //     this.getUserMusic();
      //   }else {
      //     this.getPublicMusic(musicTypeId);
      //   }
      //   this.getPublicMusic(musicTypeId);
      //   this.musicTypeId = musicTypeId;
      // },
      onbeforeClose() {
        if (!this.loading) {
          this.visible = false;
          // this.$refs["materialUp"].resetFields();
          this.removeUnScroll();
        }
        // this.materialUp.liveState = false;
      },
      async open(item, val) {
        let me = this;
        me.unScroll();
        me.tempId = item.tempId;
        let info = await me.$http.getHallInfo(item.tempId);
        let contact = info.contact || {};
        me.visible = true;
        if(val === 'vr') {
          me.isVR = true;
        }else {
          me.isVR = false;
        }
        // if (info.liveService && !this.liveService) {
        //   this.tabList.splice(this.tabList.length - 1, 0, { text: '直播配置' });
        //   this.liveService = true;
        // } else if (!info.liveService && this.liveService) {
        //   this.tabList.splice(this.tabList.length - 2, 1);
        //   this.liveService = false;
        // }
        if(info.varLook === 2) {
          if(JSON.stringify(this.tabList).indexOf("VR带看") === -1) {
            this.tabList.splice(4, 0, {
              text: "VR带看",
              id: "vr"
            });
          }
        }else {
          if(JSON.stringify(this.tabList).indexOf("VR带看") !== -1) {
            this.tabList.splice(4, 1);
          }
        }
        let obj = {
          tempid: item.tempId,
          name: info.name || "",
          typeId: info.typeId || "",
          discripe: info.description || "",
          contactEmail: contact.contactEmail || "",
          contactPhone: contact.contactPhone || "",
          contactName: contact.contactName || "",
          contactAddress: contact.contactAddress || "",
          wxQrcode: contact.wxQrcode,
          titleFlag: info.titleFlag || false,
          descFlag: info.descFlag || false,
          usePwd: info.usePwd || false,
          enLang: info.enLang || false,
          tempToUser: info.tempToUser,
          // closeMusic: !info.closeMusic || false,
          consultSetting:
              (info.buttonOptions && info.buttonOptions.consultSetting) || false,
          hideHeader:
                  (info.buttonOptions && info.buttonOptions.hideHeader) || false,
          share: (info.buttonOptions && info.buttonOptions.share) || false,
          comment: (info.buttonOptions && info.buttonOptions.comment) || false,
          likeSetting: (info.buttonOptions && info.buttonOptions.likeSetting) || false,
          birdEyeSetting: (info.buttonOptions && info.buttonOptions.birdEyeSetting) || false,
          threeSetting: (info.buttonOptions && info.buttonOptions.threeSetting) || false,
          tempMapSetting: (info.buttonOptions && info.buttonOptions.tempMapSetting) || false,
          // useThumbLoading: info.useThumbLoading || false,
          musicAutoPlay: info.musicId ? info.musicAutoPlay : false,
          password: info.password || "",
          logo: info.customLogo || "",
          mobilethumb: info.mobileThumb,
          pcthumb: info.thumb,
          loadingVideo: info.loadingVideo,
          mobileLoadingVideo: info.mobileLoadingVideo,
          musicId: info.musicId || "",
          musicName: info.musicName,
          liveOpenType: info.sceneTemplateLive.liveOpenType || 0,
          liveUrl: info.sceneTemplateLive.liveUrl || "",
          liveStartTime: info.sceneTemplateLive.liveStartTime,
          liveEndTime: info.sceneTemplateLive.liveEndTime,
          liveService: info.liveService,
          custServiceCode: info.custServiceCode,
          // liveState: Boolean(info.sceneTemplateLive.liveState),
          myCustService: info.myCustService,
          // myBrowseService: info.myBrowseService,
          skinSetting: info.skinSetting,
          varLook: info.varLook,
          // floorSetting: info.floorSetting,
          vrTime: [
            this.$utils.commonDateFormat(info.lookStartTime, "hh:mm"),
            this.$utils.commonDateFormat(info.lookEndTime, "hh:mm"),
          ],
          hostList: info.compereList,
        };
        this.musicUrl = `${location.protocol + process.env.VUE_APP_pdfHost + info.musicFile}`

        for (let i in obj) {
          if (obj[i] === "null") {
            obj[i] = "";
          }
        }
        me.logoUrl = info.customLogo;
        me.materialUp = obj;
        me.hostList = [];
        me.hostList = info.compereList;
        me.showImg = {
          mobilethumb: info.mobileThumb,
          pcthumb: info.thumb,
          wxQrcode: contact.wxQrcode ? `${contact.wxQrcode +'?t=' +new Date().getTime()}` : "",
          panoImg: info.panoImg,
        };
        me.showVideo.videoUrl = info.loadingVideo;
        me.showVideo.videoUrlMobile = info.mobileLoadingVideo;
        me.buttons = [
          {
            text: "鸟瞰",
            isCheck: me.materialUp.birdEyeSetting,
            key: "birdEyeSetting",
          },
          {
            text: "三维",
            isCheck: me.materialUp.threeSetting,
            key: "threeSetting",
          },
          // {
          //   text: "音乐",
          //   isCheck: me.materialUp.usePwd,
          //   key: "usePwd",
          // },
          {
            text: "留言",
            isCheck: me.materialUp.comment,
            key: "comment",
          },
          {
            text: "分享",
            isCheck: me.materialUp.share,
            key: "share",
          },
          {
            text: "点赞",
            isCheck: me.materialUp.likeSetting,
            key: "likeSetting",
          },
          {
            text: "地图",
            isCheck: me.materialUp.tempMapSetting,
            key: "tempMapSetting",
          },
          // {
          //   text: "楼层",
          //   isCheck: me.materialUp.floorSetting,
          //   key: "floorSetting",
          // },
          {
            text: '展厅 “头像”',
            isCheck: me.materialUp.hideHeader,
            key: "hideHeader",
          },
          {
            text: '咨询',
            isCheck: me.materialUp.consultSetting,
            key: "consultSetting",
          }
        ];
        me.power = [
          {
            text: "访问密码",
            isCheck: me.materialUp.usePwd,
            key: "usePwd",
          },
          {
            text: "加载时显示“展厅名称”",
            isCheck: me.materialUp.titleFlag,
            key: "titleFlag",
          },
          {
            text: "加载时显示“展厅描述”",
            isCheck: me.materialUp.descFlag,
            key: "descFlag",
          },
          // {
          //   text: "封面作为加载背景图",
          //   isCheck: me.materialUp.useThumbLoading,
          //   key: "useThumbLoading",
          // },
          {
            text: "英文站",
            isCheck: me.materialUp.enLang,
            key: "enLang",
          },
          {
            text: '展厅“头像”可跳至个人中心',
            isCheck: me.materialUp.tempToUser,
            key: "tempToUser",
          },
        ];
        me.addValue = [
          {
            text: "在线客服",
            desc:
                "可支持内嵌第三方客服工具，需自行将客服代码添加至输入框中。若您需使用3D云展（定制版）在线客服，可联系400-080-9959。",
            code: "",
            isCheck: me.materialUp.myCustService,
            key: "myCustService",
          },
          // {
          //   text: "访客信息",
          //   desc:
          //       "访客通过微信浏览展厅会被要求授权并绑定手机号，展厅可统计来自微信的访客信息。",
          //   isCheck: me.materialUp.myBrowseService,
          //   key: "myBrowseService",
          // },
          // {
          //   text: me.$t('addValue.noLogo.title'),
          //   desc: me.$t('addValue.noLogo.desc'),
          //   img: "",
          //   isPlay: false,
          //   isCheck: me.materialUp.hideLogo,
          //   key: "hideLogo"
          // },
          {
            text: "直播",
            desc: "可设置直播时间、直播链接及打开方式。",
            isCheck: me.materialUp.liveService,
            key: "liveService",
          },
          // {
          //   text: "VR带看",
          //   text2: "1对1",
          //   desc: "开通VR带看，用户可邀请主持人实现1对1同屏互动及语音讲解",
          //   // isCheck: me.materialUp.VRService,
          //   isCheck: me.materialUp.varLook,
          //   key: "varLook",
          // }
        ];

        me.$nextTick(() => {
          me.scrollDiv = document.querySelector(".materialUp");
          if(me.isVR) {
            me.scrollTo("vr");
          }else {
            me.scrollTo("info");
          }
        });
      },
      async wxQrcode(e) {
        let file = e.target.files[0];
        e.target.value = "";
        if (file.type !== "image/jpeg" && file.type !== "image/png") {
          this.$message({
            message: "请选择 jpg 或 png 的图片",
            type: "warning",
          });
          return;
        }
        if (file.size / 1024 / 1024 > 2) {
          this.$message({
            message: "请选择 2MB 以内的图片",
            type: "warning",
          });
          return;
        }
        this.showImg.wxQrcode = URL.createObjectURL(file);
        this.materialUp.wxQrcode = file;
        // this.$refs.clipImage.init(URL.createObjectURL(file), {
        //   width: 200,
        //   height: 200,
        // });
      },
      //上传图片封面
      async pcthumb(e, panoImg) {
        var target = e.target.cloneNode();
        e.target.value = "";
        var file = target.files[0];
        if (file.type !== "image/jpeg" && file.type !== "image/png") {
          this.$message({
            message: "请选择 jpg 或 png 的图片",
            type: "warning",
          });
          return;
        }

        if (file.size / 1024 / 1024 > 2) {
          this.$message({
            message: "请选择 2MB 以内的图片",
            type: "warning",
          });
          return;
        }
        if (panoImg) {
          this.materialUp.panoImg = file;
          this.showImg.panoImg = URL.createObjectURL(file);
          this.materialUp.isPanoImg = false;
        } else {
          this.materialUp.pcthumb = file;
          this.showImg.pcthumb = URL.createObjectURL(file);
        }
      },

      //上传视频封面
      async uploadVideoCover(e) {
        const target = e.target.cloneNode();
        e.target.value = "";
        const file = target.files[0];
        if (file.type !== "video/mp4") {
          this.$message.warning("请选择mp4格式的视频");
          return;
        }
        if (file.size > this.videoMaxSize * Math.pow(1024, 2)) {
          this.$message.warning(`视频大小超过${this.videoMaxSize}MB`);
          return;
        }
        if (file) {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.showVideo.videoUrl = reader.result;
            this.materialUp.loadingVideo = file;
          };
        }
      },

      //上传移动端视频封面
      uploadVideoCoverMobile(e) {
        const target = e.target.cloneNode();
        e.target.value = "";
        const file = target.files[0];
        if (file.type !== "video/mp4") {
          this.$message.warning("请选择mp4格式的视频");
          return;
        }
        if (file.size > this.videoMaxSize * Math.pow(1024, 2)) {
          this.$message.warning(`视频大小超过${this.videoMaxSize}MB`);
          return;
        }
        if (file) {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.showVideo.videoUrlMobile = reader.result;
            this.materialUp.mobileLoadingVideo = file;
          };
        }
      },

      deleteVideoHandle() {
        this.showVideo.videoUrl = "";
        this.materialUp.loadingVideo = "";
      },

      deleteVideoMHandle() {
        this.showVideo.videoUrlMobile = "";
        this.materialUp.mobileLoadingVideo = "";
      },
      deletewxCodeHandle() {
        this.showImg.wxQrcode = "";
        this.materialUp.wxQrcode = "";
      },

      deleteCoverHandle() {
        this.showImg.pcthumb = "";
        this.materialUp.pcthumb = "";
      },

      deleteCoverMHandle() {
        this.showImg.mobilethumb = "";
        this.materialUp.mobilethumb = "";
      },

      async mobilethumb(e) {
        var target = e.target.cloneNode();
        e.target.value = "";
        var file = target.files[0];
        if (file.type !== "image/jpeg" && file.type !== "image/png") {
          this.$message({
            message: "请选择 jpg 或 png 的图片",
            type: "warning",
          });
          return;
        }
        if (file.size / 1024 / 1024 > 2) {
          this.$message({
            message: "请选择 2MB 以内的图片",
            type: "warning",
          });
          return;
        }
        this.materialUp.mobilethumb = file;
        this.$set(this.showImg, "mobilethumb", URL.createObjectURL(file));
      },
      scroll(e) {
        let me = this;
        let select = document.querySelectorAll(".select-item");
        let offsetTopArr = [];
        let last = select[select.length - 1].clientHeight;
        select.forEach((item) => {
          offsetTopArr.push(item.offsetTop);
        });
        let scrollTop = e.target.scrollTop;
        let navIndex = 0;
        offsetTopArr.forEach((item, index) => {
          if (index === select.length - 1) {
            item -= last + 140; // 为了最后一个可以选中
          }
          // console.log(scrollTop)
          // console.log(item - 55)
          if (scrollTop >= item - 55) {
            // 减去头部的高度
            navIndex = index;
          }
        });
        me.tabIndex = navIndex;
      },
      scrollTo(id) {
        let me = this;
        let targetOffsetTop = document.getElementById(id).offsetTop;
        me.scrollDiv.scrollTop = targetOffsetTop - 55; // 减去头部的高度
      },
      chooseMusic(id) {
        this.materialUp.musicId = id;
      },
      updateLogo() {
        this.$refs.logo.click();
      },
      logoChange(e) {
        let file = e.target.files[0],
            me = this;
        var fileSize = file.size / 1024 / 1024;
        e.target.value = "";
        let r = checkFile(file, false, "image/png,image/jpg,image/jpeg");
        if (fileSize > 2) {
          this.$message({
            type: 'warning',
            message: "上传图片大小不能超过2MB!"
          });
          return;
        }
        if (r) {
          me.isvisible = true;
          me.coverUrl = file;
          // me.materialUp.logo = file;
          // me.$refs.clipLogo.init(URL.createObjectURL(file), {width: 68, height: 68});
        }

      },
      changeImg(file, url) {
        let me = this;
        me.materialUp.logo = file;
        me.logoUrl = url;
      },
      async saveInfo() {
        let me = this;
        try {
          // if (this.$refs.clipImage.hasClip() && this.materialUp.wxQrcode) {
          //   // 本身就选择了文件，然后又产生了裁剪
          //   let wxQrcode = this.materialUp.wxQrcode;
          //   this.materialUp.wxQrcode = this.$refs.clipImage.exportFile(
          //       wxQrcode.name,
          //       wxQrcode.type
          //   );
          // }

          await me.$refs.materialUp.validate();
          me.btnDisabled = true;

          me.loading = true;
          if (me.materialUp.password) {
            me.materialUp.password = md5(me.materialUp.password);
          }

          let obj = {
            ...me.materialUp,
            // closeMusic: !me.materialUp.closeMusic, // 关闭音乐取反
          };
          delete obj.vrTime;
          delete obj.musicName;
          if (!this.materialUp.vrTime) {
            if (this.hostList && this.hostList.length > 0) {
              this.rules.vrTime = [
                {
                  message: "请选择带看时间段",
                  trigger: "blur",
                },
              ];
            }
          } else if (
              this.materialUp.vrTime[0] == "-" ||
              this.materialUp.vrTime[1] == "-"
          ) {
            if (this.hostList && this.hostList.length > 0) {
              this.rules.vrTime = [
                {
                  message: "请选择带看时间段",
                  trigger: "blur",
                },
              ];
            } else {
              this.materialUp.vrTime = ["", ""];
            }
          } else {
            let varUserJson = [];
            let host;
            if (this.hostList && this.hostList.length > 0) {
              this.hostList.map((item) => {
                if (item.id) {
                  host = {
                    imUserId: item.id,
                  };
                } else {
                  host = {
                    imUserId: item.imUserId,
                  };
                }

                varUserJson.push(host);
              });
              obj.varUserJson = JSON.stringify(varUserJson);
            } else {
              obj.varUserJson = [];
            }
            obj.lookStartTimeStr = this.materialUp.vrTime[0];
            obj.lookEndTimeStr = this.materialUp.vrTime[1];
          }

          //封面图片
          if (typeof obj.pcthumb == "string") {
            obj.deleteCover = obj.pcthumb;
          } else {
            obj.deleteCover = "";
          }

          //微信二维码
          if (typeof obj.wxQrcode == "string") {
            obj.deleteWxQrcode = obj.wxQrcode;
          } else {
            obj.deleteWxQrcode = "";
          }

          //移动端封面图片
          if (typeof obj.mobilethumb == "string") {
            obj.deleteMobileCover = obj.mobilethumb;
          } else {
            obj.deleteMobileCover = "";
          }

          //视频封面
          if (typeof obj.loadingVideo == "string") {
            obj.deleteVideo = obj.loadingVideo;
          } else {
            obj.deleteVideo = "";
          }
          //移动端视频封面
          if (typeof obj.mobileLoadingVideo == "string") {
            obj.deleteMobileVideo = obj.mobileLoadingVideo;
          } else {
            obj.deleteMobileVideo = "";
          }

          // let hasAdd = false;
          me.power.forEach((item) => {
            obj[item.key] = item.isCheck;
          });
          me.buttons.forEach((item) => {
            obj[item.key] = item.isCheck;
          });
          // me.addValue.forEach((item) => {
          //   obj[item.key] = Number(item.isCheck);
          //   if (item.isCheck === 1) {
          //     hasAdd = true;
          //   }
          // });
          await me.$http.sceneSave(obj);
          me.$emit("close", me.materialUp.tempid);
          // if (hasAdd) {
          //   let obj = {
          //     isImg: false,
          //     title: "您已选择增值服务，购买后可生效",
          //     leftBtn: "预览",
          //     rightBtn: "去购买",
          //     tips: "预览可查看效果",
          //     bgColor: "#FE5A60",
          //   };
          //   me.$Ruler
          //       .save({
          //         obj,
          //       })
          //       .then(async (res) => {
          //         if (res === "right") {
          //           let viewHref = this.$utils.getArtPreviewUrl(
          //               {
          //                 G_TEMP_ID: me.materialUp.tempid,
          //                 ispreview: true,
          //                 isAddValue: true,
          //                 token: this.$utils.getUserToken(),
          //               },
          //               process.env.VUE_APP_HTML
          //           );
          //           window.open(viewHref);
          //         } else {
          //           let data = await me.$http.getBuyServe(me.materialUp.tempid);
          //           me.payData = data;
          //           let list = [];
          //           data.serverList.forEach((item) => {
          //             switch (item.name) {
          //               case "在线客服":
          //                 list.push({
          //                   text: "在线客服",
          //                   price: "￥" + item.price,
          //                 });
          //                 break;
          //               case "访客统计":
          //                 list.push({
          //                   text: "访客统计",
          //                   price: "￥" + item.price,
          //                 });
          //                 break;
          //               case "直播":
          //                 list.push({
          //                   text: "直播",
          //                   price: "￥" + item.price,
          //                 });
          //                 break;
          //               case "VR带看":
          //                 list.push({
          //                   text: "VR带看",
          //                   price: "￥" + item.price,
          //                 });
          //                 break;
          //             }
          //           });
          //           let onMoney = data.totalPrices > data.balance;
          //           me.payObj = {
          //             title: "增值服务",
          //             tips: "增值服务需购买才可生效",
          //             list,
          //             rigthBtn: onMoney ? "余额不足，请充值" : "立即支付",
          //             balance: data.balance,
          //             totalPrices: data.totalPrices,
          //             bgColor: onMoney ? "#F69A23" : "#FE5A60",
          //           };
          //           me.payVisible = true;
          //           // let datas = await me.$Ruler.pay({obj})
          //         }
          //       });
          // } else {
          //   me.$message.success("修改成功");
          // }
          me.$message.success("修改成功");
          me.loading = false;
          me.onbeforeClose();
        } catch (e) {
          console.log(e);
        }
        me.btnDisabled = false;
        me.removeUnScroll();
      },
      // async pay(datas) {
      //   let me = this;
      //   if (datas) {
      //     let data = me.payData;
      //     let onMoney = data.totalPrices > data.balance ? true : false;
      //     if (onMoney) {
      //       me.$Ruler.payment({
      //         balances: data.balance,
      //       });
      //     } else {
      //       try {
      //         await me.$http.buyServe({
      //           tempId: me.materialUp.tempid,
      //           payPassword: md5(datas),
      //         });
      //         let obj1 = {
      //           isImg: true,
      //           title: "扣费成功！",
      //           leftBtn: "知道了",
      //           rightBtn: "",
      //           tips: "",
      //         };
      //         me.payVisible = false;
      //         me.$Ruler
      //             .save({
      //               obj: obj1,
      //             })
      //             .then((res) => {
      //               if (res === "right") {
      //                 // let viewHref = this.$utils.getArtViewUrl({G_TEMP_ID, ispreview: true, token: this.$utils.getUserToken()}, process.env.VUE_APP_HTML);
      //                 // window.open(viewHref)
      //               }
      //             });
      //       } catch (e) {
      //       }
      //     }
      //   } else {
      //     me.payVisible = false;
      //   }
      // },
      musicClick() {
        this.$refs.upMusic.click();
      },
      // myMusic(index) {
      //   let me = this;
      //   if (me.musicTabIndex === index) {
      //     return;
      //   }
      //   me.musicTabIndex = index;
      //   if (index === 1) {
      //     me.musicTypeId = "mine";
      //     me.getUserMusic();
      //   } else {
      //     me.musicTypeId = "";
      //     me.getPublicMusic();
      //   }
      // },
      // getUserMusic() {
      //   var $this = this;
      //   this.$http
      //       .musicUserGet()
      //       .then(function (res) {
      //         $this.musicList = res.list || [];
      //       })
      //       .catch(function (res) {
      //         console.log(res);
      //       });
      // },
      // uploadMusic(e) {
      //   var $this = this;
      //   let file = e.target.files[0];
      //   if (file.type != "audio/mpeg") {
      //     this.$message({
      //       type: "warning",
      //       message: "请上传音乐文件",
      //     });
      //     return;
      //   }
      //
      //   let fileSize = file.size / 1024 / 1024;
      //   if (fileSize > 5) {
      //     this.$message({
      //       type: "warning",
      //       message: "文件大小超过5M",
      //     });
      //     return;
      //   }
      //
      //   let obj = {
      //     tempId: $this.materialUp.tempid,
      //     file,
      //     name: file.name,
      //   };
      //   this.$http
      //       .uploadMusic(obj)
      //       .then(function () {
      //         $this.$Ruler.success("上传成功");
      //         $this.getUserMusic();
      //       })
      //       .catch(function (res) {
      //         console.log(res);
      //       });
      // },
      typeMore() {
        this.isOpen = !this.isOpen;
      },
      mousemove(e) {
        console.log(e);
      },
      //添加主持人
      addHost() {
        this.vrHostVisible = true;
        this.$store.commit("setStates", {
          k: "yuanHostList",
          v: this.hostList,
        });
      },
      addMusicHandle() {
        this.musicListVisible = true;
      },
      closevrHost(val) {
        if (val) {
          this.hostList = val;
        }
        this.vrHostVisible = false;
      },
      closeMusicListHost(val) {
        if (val) {
          this.materialUp.musicId = val.musicId;
          this.materialUp.musicName = val.name;
          this.musicUrl = val.musicFile;
        }
        this.musicListVisible = false;
      },

      clearMusic() {
        this.materialUp.musicId = "";
        this.materialUp.musicName = "";
        this.musicUrl = "";
        this.materialUp.musicAutoPlay = false;
      },


      deleteHost(index) {
        this.hostList.splice(index, 1);
      },
      //禁止滚动条滚动
      unScroll() {
        let body = document.getElementsByTagName("body")[0]
        body.style.overflow = "hidden";
      },
      //移除禁止滚动条滚动
      removeUnScroll() {
        let body = document.getElementsByTagName("body")[0]
        body.style.overflow = "unset";
      },
    },
    mounted() {
      let me = this;
      me.$http.getSceneType().then((res) => {
        me.industrys = res;
      });
    },
  };
</script>

<style lang="scss" src="./exhibition-setinfo.scss"></style>
<style lang="scss">
  .el-tooltip__popper {
    max-width: 200px;
  }
</style>
