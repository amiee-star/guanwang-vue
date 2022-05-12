<template>
    <div class="edit-com">
        <el-dialog
                :visible.sync="isShowEdit"
                :fullscreen="false"
                :modal="true"
                custom-class="comEdit"
                :show-close="true"
                :before-close="onbeforeClose"
                :close-on-click-modal="false"
        >
            <div class="nav">
                <span class="active">编辑素材</span>
            </div>
            <div class="content">
                <el-form
                        :model="materialUp"
                        :rules="rules"
                        ref="materialUp"
                        label-width="100px"
                        class="demo-ruleForm flex"
                >
                    <div class="box left-form">
                        <el-form-item label="模型编码：" v-if="edit.modelTypeCode">
                            <div class="modelInfo">
                                <span>{{ edit.code }}、</span>
                                <span>{{ edit.faces }}面、</span>
                                <span
                                >{{
                    parseFloat(edit.modelFileSize / 1024 / 1024).toFixed(2)
                  }}MB</span
                                >
                            </div>
                        </el-form-item>
                        <el-form-item
                                label="素材名称："
                                prop="name"
                                v-if="!edit.modelTypeCode"
                        >
                            <el-input
                                    v-model="materialUp.name"
                                    maxlength="30"
                                    placeholder="请输入素材名称"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                                label="模型名称："
                                prop="name"
                                v-if="edit.modelTypeCode"
                        >
                            <el-input
                                    v-model="materialUp.name"
                                    maxlength="15"
                                    placeholder="请输入模型名称"
                            ></el-input>
                        </el-form-item>
                        <template v-if="materialUp.fileType == $commConst.FILETYPE.picgif">
                            <el-form-item label="总帧数">
                                <el-input
                                        v-model="materialUp.totalSize"
                                        @blur="picFrame($event)"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="总时长">
                                <el-input
                                        v-model="materialUp.allTime"
                                        @blur="picAllTime($event)"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="单帧时长">
                                <el-input
                                        v-model="materialUp.time"
                                        @blur="picTime($event)"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="播放方式" prop="playType">
                                <el-radio v-model="materialUp.playType" :label="0"
                                >自动播放
                                </el-radio
                                >
                                <el-radio v-model="materialUp.playType" :label="1"
                                >点击播放
                                </el-radio
                                >
                            </el-form-item>
                        </template>
                        <el-form-item
                                label="实际宽高："
                                class="realSize"
                                v-if="materialUp.fileType == $commConst.FILETYPE.pic"
                        >
                            <div class="picWidth flex">
                                <span>宽</span>
                                <el-form-item prop="width">
                                    <el-input
                                            class="width"
                                            maxlength="5"
                                            v-model="materialUp.width"
                                            @input="changeWidth(materialUp.width)"
                                    ></el-input>
                                </el-form-item>
                                <span class="unit">mm</span>
                            </div>
                            <span @click="limitScale = !limitScale" class="bangding"
                            ><svg-icon
                                    :iconClass="limitScale ? 'lock-rate' : 'unlock-rate'"
                            ></svg-icon>
              </span>
                            <div class="picWidth flex">
                                <span>高</span>
                                <el-form-item prop="height">
                                    <el-input
                                            class="width"
                                            maxlength="5"
                                            v-model="materialUp.height"
                                            @input="changeHeight(materialUp.height)"
                                    ></el-input>
                                </el-form-item>
                                <span class="unit">mm</span>
                            </div>
                        </el-form-item>
                        <el-form-item label="分类标签：">
                            <addTags v-model="tagList" ref="tags" v-if="isShowEdit"></addTags>
                        </el-form-item>
                        <el-form-item
                                label="展示配置："
                                v-if="edit.modelTypeCode && edit.showType == 0">
                            <el-radio v-model="radio" :label="0">高清</el-radio>
                            <el-radio v-model="radio" :label="1">超清</el-radio>
                        </el-form-item>
                        <p v-if="edit.modelTypeCode && edit.showType == 0" class="tip-text">
                            注:此配置仅控制模型在热点弹框中的展示效果,不影响模型拖入展厅中的效果,为保障在手机端正常展示系统将默认为"高清";当模型面数大于10万面或体积大于10MB时,<span>强烈建议不要设置超清展示</span>
                        </p>
                        <!--                    <el-form-item label="素材描述：" prop="discripe" class="upDiscripe">-->
                        <!--                        <el-input-->
                        <!--                        type="textarea"-->
                        <!--                        v-model="materialUp.discripe"-->
                        <!--                        maxlength="300"-->
                        <!--                        show-word-limit-->
                        <!--                        resize="none"-->
                        <!--                        placeholder="说点什么呢"-->
                        <!--                        ></el-input>-->
                        <!--                    </el-form-item>-->
                        <!--                    <div v-if="showDetail">-->
                        <!--                        <el-form-item label="音频：" prop="mp3">-->
                        <!--                            <span class="upSpan"><label>上传MP3<input type="file" @change="upMP3($event)" accept="audio/mp3,audio/mpeg" /></label></span>-->
                        <!--                        </el-form-item>-->
                        <!--                        <p class="explain">支持上传5MB以内的MP3文件</p>-->
                        <!--                        <p class="explain re-upload flex-start" v-if="materialUp.mp3">-->
                        <!--                            <img class="file-img" src="@/assets/images/self/file.png" alt />-->
                        <!--                            <span class="tow">Music.mp3</span>-->
                        <!--                            <i class="icon" @click="delMp3"></i>-->
                        <!--                        </p>-->
                        <!--                     </div>-->
                        <!--                     <div v-if="materialUp.fileType != $commConst.FILETYPE.video">-->
                        <!--                        <el-form-item label="跳转链接：" prop="url">-->
                        <!--                            <el-input v-model="materialUp.url" placeholder="http//:"></el-input>-->
                        <!--                        </el-form-item>-->
                        <!--                        <el-form-item>-->
                        <!--                            <el-checkbox label="弹窗模式" v-model="materialUp.isTarget"></el-checkbox>-->
                        <!--                        </el-form-item>-->
                        <!--                     </div>-->
                    </div>
                    <div class="box right-box" v-if="!edit.modelTypeCode">
                        <el-form-item :label="showDetail ? '素材预览：' : '素材封面：'">
                            <div
                                    class="wrap-img canvas-w"
                                    v-if="materialUp.fileType == $commConst.FILETYPE.picgif"
                            >
                                <div ref="wrap"></div>
                            </div>
                            <div class="wrap-img" v-else>
                                <img :src="materialUp._picPathCompre" alt=""/>
                                <div class="cover" v-if="!showDetail">
                                    <label
                                    ><span>修 改</span
                                    ><input
                                            type="file"
                                            @change="upThumb($event)"
                                            accept="image/jpg,image/png,image/jpeg"
                                    /></label>
                                </div>
                            </div>
                            <p v-if="!showDetail" class="tips">支持2MB以内的PNG/JPG</p>
                        </el-form-item>
                        <div class="edit-thumb">
                            <el-dialog
                                    :visible.sync="isChangeThumb"
                                    :fullscreen="true"
                                    :modal="false"
                                    :show-close="false"
                            >
                                <div class="content-thumb">
                                    <div class="img-list flex">
                                        <ClipImage :max="400" ref="ClipImage"></ClipImage>
                                    </div>
                                    <div class="btn-list">
                                        <el-button @click="sureReload">确认</el-button>
                                        <el-button @click="cancelReload">取消</el-button>
                                    </div>
                                </div>
                            </el-dialog>
                        </div>
                        <!--                     <div v-if="showDetail">-->
                        <!--                        <el-form-item label="细节图：">-->
                        <!--                            <p class="explain tab-explain">支持上传单张5MB以内的JPG文件</p>-->
                        <!--                            <ul class="flex-wrap picks-list">-->
                        <!--                                <li  class="picks-li" v-for="(item,index) in picksList" :key="index" >-->
                        <!--                                    <img  :src="item.base"  alt="">-->
                        <!--                                    <div v-if="item.state != 'success'">-->
                        <!--                                        <div class="cover"  ><label>修 改<input type="file" @change="upPick($event,index)"  accept="images/jpeg"></label> </div>-->
                        <!--                                        <img class="del"  src="@/assets/images/self/delPic.png" alt="" @click="delePicks(item,index)">-->
                        <!--                                    </div>-->
                        <!--                                </li>-->
                        <!--                                <li class="up-li flex" v-if="picksList.length <4">-->
                        <!--                                    <label>-->
                        <!--                                        <img src="@/assets/images/self/upload.png" alt="">-->
                        <!--                                        <span>上传图片</span> <input type="file" multiple @change="upPick($event,-1)" accept="images/jpeg" />-->
                        <!--                                    </label>-->
                        <!--                                </li>-->
                        <!--                            </ul>-->
                        <!--                        </el-form-item>-->
                        <!--                     </div>-->
                    </div>
                    <div class=" right-box1" v-else>
                        <p class="title-name" style="padding-bottom:10px;">模型封面</p>
                        <div class="img-box" v-if="edit.thumbnail">
                            <img
                                    :src="edit.thumbnail"
                                    alt=""
                                    class="cover-img"
                                    style="width:300px;"
                            />
                        </div>
                        <div class=" default-box" v-else>
                            <img :src="defaultImg" alt="" class="default-img"/>
                        </div>
                    </div>
                </el-form>
            </div>
            <div class="dialog-footer flex">
                <div v-if="!edit.modelTypeCode">
                    <el-checkbox
                            label="设为热点图标"
                            v-model="materialUp.setHot"
                            v-if="materialUp.fileType == FILETYPE.pic"
                    ></el-checkbox>
                    <el-checkbox
                            label="在展厅内不可点击"
                            v-model="materialUp.enable"
                            v-if="materialUp.fileType !== $commConst.FILETYPE.video"
                    ></el-checkbox>
                    <el-checkbox
                            label="设为解说人物"
                            v-model="materialUp.narrateMan"
                            v-if="materialUp.fileType === $commConst.FILETYPE.gif"
                    ></el-checkbox>
                    <p v-if="materialUp.fileType === $commConst.FILETYPE.video">
                        <el-checkbox label="设为背景透明" v-model="materialUp.backLucency"></el-checkbox>
                        <el-tooltip popper-class="needOpacity" effect="dark"
                                    content="若选择“背景透明”属性，则视频背景需为绿幕（#00ff00）才可生效；常用于解说人物等。" placement="top">
                            <i class="el-icon-warning-outline"></i>
                        </el-tooltip>
                    </p>
                </div>
                <div class="handleBtn">
                    <el-button
                            :disabled="isCanUploadMaterial"
                            type="primary"
                            @click="editMaterial"
                    >确认
                    </el-button>
                    <el-button @click="onbeforeClose()">取 消</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import formRules from "@/config/form-rules.js";
    import ClipImage from "@/components/clip-image.vue";
    import FrameGif from "@/utils/frame_gif.js";
    import addTags from "@/components/add-tags";

    export default {
        name: "editMaterial",
        props: ["isShowEdit", "edit"],
        data() {
            return {
                materialUp: {
                    name: "",
                    width: "",
                    height: "",
                    discripe: "",
                    mp3: "",
                    url: "",
                    target: true,
                    picks: "",
                    enable: false,
                    totalSize: 1,
                    allTime: 0.1,
                    time: 0.1,
                    playType: 0,
                    setHot: false,
                    narrateMan: false
                },
                rules: {
                    name: [{required: true, message: "素材名称", trigger: "blur"}],
                    width: [{validator: formRules.newcheckNum, trigger: "change"}],
                    height: [{validator: formRules.newcheckNum, trigger: "change"}],
                    discripe: [
                        {
                            min: 0,
                            max: 300,
                            message: "长度在 0 到 300 个字符",
                            trigger: "blur",
                        },
                    ],
                    url: [
                        {
                            validator: formRules.checkUrl,
                            trigger: "blur",
                        },
                    ],
                },
                tagList: [],
                picksList: [],
                isCanUploadMaterial: false,
                order: -1, // order add img -1 从头 其他 从尾
                hideSuccess: true,
                showDetail: true, // video model 可替换
                isChangeThumb: false,
                testThumb: "",
                gif: new FrameGif(),
                FILETYPE: this.$commConst.FILETYPE,
                limitScale: true,
                radio: 0,
                defaultImg: require("@/assets/logo-w.png"),
            };
        },
        components: {
            ClipImage,
            addTags,
        },
        watch: {
            async edit(val) {
                if (Object.keys(val).length > 0) {
                    // let obj = { ...val, isTarget: false, scale: 1, delMp3: false };
                    // this.handleData(obj);
                    // this.radio = obj.definition || 0
                    // this.tagList = obj.tags;
                    let data = ""
                    if (val.code) {
                        data = await this.$http.modalInfo(val.code)
                        data = Object.assign(val, data)
                    } else if (val.picId) {
                        data = await this.$http.getEditInfo(val.picId)
                    }

                    let obj = {...data, isTarget: false, scale: 1, delMp3: false};
                    this.handleData(obj);
                }
            },
        },
        methods: {
            picFrame(e) {
                // e
                let totalSize = parseInt(e.target.value) || 1;
                if (totalSize < 1) {
                    totalSize = 1;
                }
                if (totalSize > 999) {
                    totalSize = 999;
                }

                let allTime = this.materialUp.allTime || 0.1;
                let time = Number((allTime / totalSize).toFixed(2));
                if (time < 0.01) {
                    time = 0.01;
                }
                allTime = (time * totalSize).toFixed(2);
                this.materialUp.allTime = allTime;
                this.materialUp.time = time;
                this.materialUp.totalSize = totalSize;
                this.gif.setOptions({
                    time: time,
                    frame: totalSize,
                });
            },
            picAllTime(e) {
                let allTime = parseFloat(e.target.value) || 0.1;
                allTime = allTime.toFixed(2);
                let totalSize = this.materialUp.totalSize || 1;
                let time = Number((allTime / totalSize).toFixed(2));
                if (time < 0.01) {
                    time = 0.01;
                }
                allTime = (time * totalSize).toFixed(2);
                this.materialUp.allTime = allTime;
                this.materialUp.time = time;
                this.materialUp.totalSize = totalSize;
                this.gif.setOptions({
                    time: time,
                    frame: totalSize,
                });
            },
            picTime(e) {
                let totalSize = this.materialUp.totalSize || 1;
                let time = parseFloat(e.target.value) || 0.1;
                if (time < 0.01) {
                    time = 0.01;
                }
                let allTime = (time * totalSize).toFixed(2);
                this.materialUp.allTime = allTime;
                this.materialUp.time = time;
                this.materialUp.totalSize = totalSize;
                this.gif.setOptions({
                    time: time,
                    frame: totalSize,
                });
            },
            commonRestData() {
                try {
                    window.opener && window.opener._materialRefresh(true);
                } catch (e) {
                    console.warn(e);
                }
            },
            sureReload() {
                this.materialUp._picPathCompre = this.$refs.ClipImage.exportBase();
                let videoThumb = this.materialUp.videoThumb;
                let _videoThumb = this.$refs.ClipImage.exportFile(
                    videoThumb.name,
                    videoThumb.type
                );
                this.materialUp.videoThumb = _videoThumb;
                this.isChangeThumb = false;
            },
            cancelReload() {
                this.isChangeThumb = false;
            },
            upThumb(e) {
                var target = e.target.cloneNode();
                e.target.value = "";
                var file = target.files[0];
                if (!file) {
                    return;
                }
                var fileType = file.type;
                var fileSize = file.size / 1024 / 1024;
                if (fileType !== "image/jpeg" && fileType !== "image/png" && fileType !== "image/jpg") {
                    this.$message({
                        type: "warning",
                        message: "请上传正确的图片格式",
                    });
                    return;
                }
                if (fileSize > 2) {
                    this.$message({
                        type: "warning",
                        message: "图片大小超过2M",
                    });
                    return;
                }

                if (this.materialUp.fileType == this.$commConst.FILETYPE.video) {
                    this.materialUp.videoThumb = file;
                    this.isChangeThumb = true;
                    let me = this;
                    let video = document.createElement("video");
                    video.src = this.materialUp.picPath;
                    new Promise((resolve, reject) => {
                        video.oncanplay = function () {
                            me.$refs.ClipImage.setClip({
                                width: video.videoWidth,
                                height: video.videoHeight,
                            });
                            let imgSrc = URL.createObjectURL(file);
                            me.$refs.ClipImage.setSrc(imgSrc);
                        };
                    });
                }
                if (
                    this.materialUp.fileType == this.$commConst.FILETYPE.model ||
                    this.materialUp.fileType == this.$commConst.FILETYPE.v3d
                ) {
                    this.materialUp.glbThumb = file;
                    this.materialUp._picPathCompre = URL.createObjectURL(file);
                }
            },
            async handleData(materialUp) {
                if (
                    materialUp.fileType == this.$commConst.FILETYPE.video ||
                    materialUp.fileType == this.$commConst.FILETYPE.model ||
                    materialUp.fileType == this.$commConst.FILETYPE.v3d
                ) {
                    this.showDetail = false;
                } else {
                    this.showDetail = true;
                }

                materialUp.enable = !materialUp.enable; // 取反
                this.picksList = [];
                if (materialUp.picks && materialUp.picks.length > 0) {
                    materialUp.picks.forEach((item, index) => {
                        let obj = {
                            state: "init", // init 可传
                            base: "",
                            file: null,
                        };
                        obj.base = item;
                        this.picksList.push(obj);
                    });
                }
                if (materialUp.tags && materialUp.tags.length > 0) {
                    let _list = [];
                    materialUp.tags.forEach((item) => {
                        if (item.name) {
                            _list.push(item.name);
                        } else {
                            _list.push(item);
                        }
                    });
                    this.tagList = _list;
                } else {
                    this.tagList = [];
                }
                materialUp.isTarget = materialUp.target === 2 ? true : false;
                materialUp.setHot = materialUp.isIcon || false;
                // if(materialUp.name && materialUp.name.length > 15){
                //     materialUp.name = materialUp.name.substring(0,15);
                // }
                if (materialUp.fileType == this.$commConst.FILETYPE.pic) {
                    if (!materialUp.width || !materialUp.height) {
                        let me = this;
                        let img = await me.$utils.load.img(materialUp.picPath);
                        me.materialUp.scale = img.width / img.height;
                    }
                    if (materialUp.width && materialUp.height) {
                        materialUp.scale = materialUp.width / materialUp.height;
                    }
                }
                if (materialUp.fileType == this.$commConst.FILETYPE.picgif) {
                    materialUp.totalSize = materialUp.delay.delay.length;
                    materialUp.time = materialUp.delay.delay[0] / 1000;
                    materialUp.allTime = (materialUp.time * materialUp.totalSize).toFixed(
                        2
                    );
                    materialUp.playType = materialUp.playType || 0;

                    this.$nextTick(() => {
                        // wrap
                        this.gif.loadUrl(materialUp.picPath, {
                            parent: this.$refs.wrap,
                            frame: materialUp.totalSize,
                            time: materialUp.time,
                        });
                    });
                }
                this.materialUp = materialUp;
                let compre = '?height=0&width=512&x-image-process=image/resize,w_512&t=' + Date.now();
                if (materialUp.videoThumb) {
                    materialUp._picPathCompre = materialUp.videoThumb + compre;
                } else if (materialUp.glbThumb) {
                    materialUp._picPathCompre = materialUp.glbThumb + compre;
                } else {
                    materialUp._picPathCompre = materialUp.picPath + compre;
                }
                console.log(materialUp)
                this.materialUp = materialUp;
            },
            onbeforeClose(val) {
                this.$emit("closeDialog", typeof val == "boolean" ? true : false);
                this.isCanUploadMaterial = false;
            },
            changeWidth(width) {
                if (Number(width)) {
                    if (this.limitScale) {
                        this.materialUp.height = (width / this.materialUp.scale).toFixed(0);
                    } else {
                        this.materialUp.scale = width / this.materialUp.height;
                    }
                }
            },
            changeHeight(height) {
                if (Number(height)) {
                    if (this.limitScale) {
                        this.materialUp.width = (height * this.materialUp.scale).toFixed(0);
                    } else {
                        this.materialUp.scale = this.materialUp.width / height;
                    }
                }
            },
            upMP3(e) {
                let target = e.target.cloneNode();
                e.target.value = "";
                let upfile = target.files[0];
                if (!upfile) {
                    return;
                }
                let fileType = upfile.type;
                let fileSize = upfile.size / 1024 / 1024;
                if (fileType != "audio/mp3" && fileType != "audio/mpeg") {
                    this.$message({
                        type: "warning",
                        message: "请上传音频格式",
                    });
                    return;
                }
                if (fileSize > 5) {
                    this.$message({
                        type: "warning",
                        message: "音频大小超过5M",
                    });
                    return;
                }
                this.materialUp.mp3 = upfile;
            },
            upPick(e, editIndex) {
                let temp = e.target.cloneNode();
                e.target.value = "";
                if (editIndex == -1) {
                    let len = temp.files.length; // 准备上传
                    let existList = this.getExistList();
                    let maxLen = 4;
                    let validNum = maxLen - existList.length; // 允许上传
                    for (let i = 0; i < validNum && i < len; i++) {
                        let item = temp.files[i];
                        this.commonRest(item, editIndex);
                    }
                    if (len > validNum) {
                        this.$message.warning(`您的文件超过${maxLen}个！`);
                    }
                } else {
                    let item = temp.files[0]; // 修改
                    this.commonRest(item, editIndex);
                }
            },
            commonRest(item, editIndex) {
                let fileType = item.type;
                let fileSize = item.size / 1024 / 1024;
                if (fileType != "image/jpeg") {
                    this.$message({
                        type: "warning",
                        message: "请上传正确的图片格式",
                    });
                    return;
                }
                if (fileSize > 5) {
                    this.$message({
                        type: "warning",
                        message: "图片大小大于5M",
                    });
                    return;
                }
                this.addPicks(item, editIndex);
            },
            getExistList() {
                var arr = [];
                for (var i = 0; i < this.picksList.length; i++) {
                    if (this.picksList[i].state !== "delete") {
                        arr.push(this.picksList[i]);
                    }
                }
                return arr;
            },
            addPicks(file, editIndex) {
                let obj = {
                    file: file,
                    state: "init", // init 可传 success 成功
                    base: "",
                };
                if (editIndex == -1) {
                    if (this.order == -1) {
                        this.picksList.unshift(obj);
                    } else {
                        this.picksList.shift(obj);
                    }
                } else {
                    this.picksList.splice(editIndex, 1, obj);
                }
                //    this.convertToBase(obj);
                obj.base = URL.createObjectURL(file);
            },
            convertToBase(obj) {
                var reader = new FileReader();
                reader.readAsDataURL(obj.file);
                reader.onload = function (e) {
                    obj.base = this.result;
                };
            },
            delePicks(item, index) {
                //  删除
                //    item.state = "delete"
                this.picksList.splice(index, 1);
            },
            async editMaterial() {
                //   确认上传
                try {
                    await this.$refs["materialUp"].validate();
                    this.isCanUploadMaterial = true;
                    await this.upload();
                    this.picksList.forEach((item, index) => {
                        if (!item.file) {
                            item.state = "success";
                        }
                    });
                    let materialUp = this.materialUp;
                    let obj = {
                        picId: materialUp.picId,
                        mp3: materialUp.mp3 || "",
                        name: materialUp.name || "",
                        url: materialUp.url || "",
                        discripe: materialUp.discripe || "",
                        enable: !materialUp.enable,
                        tags: "" || [], // this.tagList 取出tag
                        width: materialUp.width || "",
                        height: materialUp.height || "",
                        picks: "" || [], // this.changeList 取出pick
                        target: materialUp.isTarget ? 2 : 1,
                        useMp3: materialUp.useMp3 || false,
                        delMp3: materialUp.delMp3,
                        videoThumb: materialUp.videoThumb || "",
                        glbThumb: materialUp.glbThumb || "",
                        time: materialUp.time * 1000 || 10,
                        totalSize: materialUp.totalSize || 1,
                        playType: materialUp.playType || 0,
                        setHot: materialUp.setHot || false,
                        narrateMan: materialUp.narrateMan || false,
                    };
                    if (materialUp.backLucency !== "undefined") {
                        obj["backLucency"] = materialUp.backLucency
                    }
                    if (this.picksList && this.picksList.length > 0) {
                        let _list = [];
                        this.picksList.forEach((item, index) => {
                            _list.push(item.base);
                        });
                        obj.picks = _list.join(",");
                    }

                    let FILETYPE = this.$commConst.FILETYPE;
                    if (this.tagList && this.tagList.length > 0) {
                        let tags = this.tagList.slice(0);
                        if (materialUp.fileType == FILETYPE.pic) {
                            // if(obj.setHot && this.tagList.indexOf("热点") === -1){
                            //    tags.push("热点");
                            // }
                        } else {
                            obj.setHot = false;
                        }
                        if (this.edit.modelTypeCode) {
                            obj.tags = tags;
                        } else {
                            obj.tags = tags.join(",");
                        }
                    }

                    if (
                        materialUp.fileType == FILETYPE.picgif ||
                        materialUp.fileType == FILETYPE.zip ||
                        materialUp.fileType == FILETYPE.gif
                    ) {
                        await this.$http.editGif(obj);
                    } else if (
                        materialUp.fileType == FILETYPE.video ||
                        materialUp.fileType == FILETYPE.pic
                    ) {
                        await this.$http.editMaterial(obj);
                    } else if (
                        materialUp.fileType == FILETYPE.v3d ||
                        materialUp.fileType == FILETYPE.model ||
                        materialUp.code
                    ) {
                        let midalParams = {
                            code: this.edit.code,
                            name: this.materialUp.name,
                            tags: this.tagList,
                            definition: this.radio,
                        };
                        await this.$http.modalEdit(midalParams);
                    } else {
                        console.error("数据错误:", materialUp);
                        return;
                    }

                    this.onbeforeClose(true);
                    this.$Ruler.success("修改成功");
                    this.commonRestData();

                    this.$refs.tags.setTagsList();
                } catch (e) {
                    console.log("catch--" + e);
                }
                this.isCanUploadMaterial = false;
            },
            async upload() {
                if (this.picksList.length > 0) {
                    for (let i = 0; i < this.picksList.length; i++) {
                        let item = this.picksList[i];
                        if (item.file) {
                            await this.uploadAllPick(item, i);
                        }
                    }
                }
            },

            async uploadAllPick(item, i) {
                try {
                    let me = this;
                    let obj = {
                        file: item.file,
                    };
                    let res = await me.$http.uploadPicks(obj);
                    this.picksList[i].base = res;
                    item.state = "success";
                } catch (e) {
                    item.state = "error";
                    console.log("catch--" + e);
                    return Promise.reject(e);
                }
            },
            delMp3() {
                this.materialUp.mp3 = "";
                this.materialUp.delMp3 = true;
                this.materialUp.useMp3 = false;
            },
        },
    };
</script>
<style lang="scss" src="./editCom.scss"></style>
