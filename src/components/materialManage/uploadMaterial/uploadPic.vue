<template>
    <div class="upload-pic com-upload">
        <el-dialog
            :visible.sync="isUploadPic"
            :fullscreen="false"
            :modal="true"
            custom-class="comUpload uploadPic"
            :show-close="true"
            :before-close="onbeforeClose"
            :close-on-click-modal="false"
            @open="resetData">
            <div class="nav">
                <span :class="{ active: chooseIndex == 0 }" class="has-border" @click="changeTab(0)">上传图片</span>
                <span :class="{ active: chooseIndex == 1 }" @click="changeTab(1)">批量上传</span>
            </div>
            <div v-show="chooseIndex == 0">
                <div class="content">
                    <el-form :model="materialUp" :rules="rules" ref="materialUp" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="素材名称：" prop="name"><el-input v-model="materialUp.name" maxlength="30" placeholder="请输入素材名称"></el-input></el-form-item>
                        <el-form-item label=" 上传素材：" prop="imgURl" class="upImg">
                            <el-input class="test-input" v-model="materialUp.imgURl"></el-input>
                            <span class="upSpan">
                                <label>
                                    上传素材
                                    <input type="file" ref="upPic" @change="upPic($event)" :accept="accept.join(',')" />
                                </label>
                            </span>
                        </el-form-item>
                        <p class="explain ">图片支持{{ maxSize }}MB以内的jpg、png文件，建议分辨率不超过4096X4096</p>
                        <p class="explain re-upload flex-start" v-if="materialUp.imgURl">
                            <img class="file-img" src="@/assets/images/self/file.png" alt="" />
                            <span class="tow">{{ materialUp.imgURl }}</span>
                            <i class="icon" @click="delSingleImg"></i>
                        </p>
                        <div class="auto-image" v-show="materialUp.imgURl"><canvas ref="canvas"></canvas></div>
                        <!--            <el-form-item label="实际宽高：" class="realSize" v-if="materialUp.imgURl" >-->
                        <!--              <div class="picWidth flex">-->
                        <!--                <span>宽</span>-->
                        <!--                <el-form-item prop="width">-->
                        <!--                  <el-input class="width" maxlength="5" v-model.number="materialUp.width" @input="changeWidth(materialUp.width)"></el-input>-->
                        <!--                </el-form-item>-->
                        <!--                <span class="unit">mm</span>-->
                        <!--              </div>-->
                        <!--              <img class="bangding" src="@/assets/images/self/bangding.png"/>-->
                        <!--              <div class="picWidth flex">-->
                        <!--                <span>高</span>-->
                        <!--                <el-form-item prop="height">-->
                        <!--                  <el-input class="width" maxlength="5" v-model.number="materialUp.height" @input="changeHeight(materialUp.height)"></el-input>-->
                        <!--                </el-form-item>-->
                        <!--                <span class="unit">mm</span>-->
                        <!--              </div>-->
                        <!--            </el-form-item>-->
                        <p class="explain" v-if="materialUp.imgURl">用于展厅默认展示的大小,最小50mm,最大20000mm</p>
                        <el-form-item label="分类标签："><addTags v-model="tagList" ref="singleTags" v-if="isUploadPic"></addTags></el-form-item>
                        <!--            <el-form-item label="跳转链接：" prop="url">-->
                        <!--              <el-input v-model="materialUp.url" placeholder="http//:"></el-input>-->
                        <!--            </el-form-item>-->
                        <!--            <el-form-item label="素材描述：" prop="discripe" class="upDiscripe">-->
                        <!--              <el-input type="textarea" v-model="materialUp.discripe" maxlength="300" show-word-limit resize="none"></el-input>-->
                        <!--            </el-form-item>-->
                    </el-form>
                </div>
                <div class="dialog-footer flex">
                    <div>
                        <el-checkbox label="设为热点图标" v-model="materialUp.setHot"></el-checkbox>
                        <el-checkbox label="在展厅内不可点击" v-model="materialUp.enable"></el-checkbox>
                    </div>
                    <div class="handleBtn">
                        <el-button class="submitBtn" :disabled="isCanUploadMaterial" type="primary" @click="uploadMaterial()">确认上传</el-button>
                        <el-button @click="onbeforeClose">取 消</el-button>
                    </div>
                </div>
            </div>
            <div v-show="chooseIndex == 1">
                <div class="content mu-content">
                    <el-form label-width="100px" @submit.native.prevent>
                        <el-form-item label="分类标签：" required="required" v-show="manyStep == 1">
                            <addTags v-model="tagList" ref="allTags" v-show="isUploadPic"></addTags>
                        </el-form-item>
                        <div v-if="manyStep == 2">
                            <p class="explain">支持{{ maxSize }}MB以内的jpg、png图片</p>
                            <ul class="many-upload flex-wrap">
                                <li class="add">
                                    <label class="flex">
                                        <span>+</span>
                                        选择图片素材
                                        <input type="file" :accept="accept.join(',')" multiple @change="upChange($event)" />
                                    </label>
                                </li>
                                <li class="flex-center" v-for="(item, index) in list" :key="index" v-if="showRule(item)">
                                    <img class="material-img" :src="item.base" alt="" />
                                    <p>{{ stateText(item) }}</p>
                                    <img class="delete-img" src="@/assets/images/self/delPic.png" @click="deleteMaterial(item, index)" />
                                    <div class="masker" :style="{ height: 100 - item.progress + '%' }"></div>
                                    <div class="file-name tow">{{ item.name }}</div>
                                </li>
                            </ul>
                        </div>
                    </el-form>
                </div>
                <div class="dialog-footer flex">
                    <div class="uploadCount">
                        <p class="all" v-if="false">
                            已上传 {{ upStates.success }}个
                            <span>(上限50个)</span>
                        </p>
                        <p v-if="upStates.fail > 0" class="error">上传失败{{ upStates.fail }}个</p>
                    </div>
                    <div class="btn materialBtn">
                        <el-button type="primary" class="submitBtn" @click="manyMaterialUpload" :disabled="manyStep == 2 && upStates.init == 0">{{ buttonText }}</el-button>
                        <el-button @click="onbeforeClose(true)">关 闭</el-button>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import formRules from '@/config/form-rules.js';
import autoImage from './auto-image.js';
import addTags from '@/components/add-tags';
export default {
    name: 'uploadPic',
    props: ['isUploadPic'],
    components: {
        addTags
    },
    data() {
        return {
            chooseIndex: 0,
            materialUp: {
                name: '',
                url: '',
                imgURl: '',
                width: '',
                height: '',
                discripe: '',
                enable: false,
                followCamera: false,
                file: '',
                scale: 0,
                setHot: false
            },
            rules: {
                name: [{ required: true, message: '素材名称', trigger: 'blur' }],
                imgURl: [{ required: true, message: '请选择图片素材', trigger: 'change' }],
                discripe: [
                    {
                        min: 0,
                        max: 300,
                        message: '长度在 0 到 300 个字符',
                        trigger: 'blur'
                    }
                ],
                width: [{ validator: formRules.newcheckNum, trigger: 'change' }],
                height: [{ validator: formRules.newcheckNum, trigger: 'change' }],
                url: [
                    {
                        validator: formRules.checkUrl,
                        trigger: 'blur'
                    }
                ]
            },
            accept: ['image/png', 'image/jpeg'], //单个上传 ["image/png","image/jpeg","image/gif",]
            tagList: [],
            isCanUploadMaterial: false,
            upStates: {
                fail: 2,
                success: 0,
                delete: 0,
                init: 0,
                loading: 0
            },
            buttonText: '下一步-选择图片素材',
            manyStep: 1,
            list: [],
            maxSize: 5,
            order: -1, // 添加图片的排序
            uploading: [], // 多个上传
            hideSuccess: true, // 隐藏上传成功的
            maxLen: 50 //最多上传
        };
    },
    methods: {
        initCanvas(baseurl) {
            if (!this.autoImage) {
                this.autoImage = new autoImage({
                    canvas: this.$refs.canvas,
                    boundary: {
                        width: 320,
                        height: 320
                    },
                    gap: 20
                });
            }
            this.autoImage.setImg(baseurl);
        },
        getImgScale() {
            let clipParams = this.autoImage.getClipParams();
            this.materialUp.scale = clipParams.w / clipParams.h || 1;
        },
        changeWidth(width) {
            this.getImgScale();
            if (Number(width)) {
                this.materialUp.height = (width / this.materialUp.scale).toFixed(0);
            }
        },
        changeHeight(height) {
            this.getImgScale();
            if (Number(height)) {
                this.materialUp.width = (height * this.materialUp.scale).toFixed(0);
            }
        },
        commonRestData() {
            try {
                window.opener && window.opener._materialRefresh(true);
            } catch (e) {
                console.warn(e);
            }
        },
        changeTab(index) {
            this.chooseIndex = index;
            this.resetData();
        },
        resetData() {
            // this.chooseIndex = 0;
            this.upStates = {
                fail: 0,
                success: 0,
                delete: 0,
                init: 0,
                loading: 0
            };
            this.buttonText = '下一步-选择图片素材';
            this.tagList = [];
            this.manyStep = 1;
            this.materialUp = {
                name: '',
                url: '',
                imgURl: '',
                width: '',
                height: '',
                discripe: '',
                enable: false,
                followCamera: false,
                file: '',
                setHot: false,
                scale: 0
            };
            this.isCanUploadMaterial = false;
            this.list = [];
            if (this.$refs['materialUp']) {
                this.$nextTick(() => {
                    this.$refs['materialUp'].resetFields();
                });
            }
        },
        showRule(item) {
            var res = item.base && item.state != 'delete';
            if (this.hideSuccess) {
                return res && item.state != 'success';
            } else {
                return res;
            }
        },
        onbeforeClose(val) {
          var me = this;
            if (me.manyStep == 2 && (me.upStates.init > 0 || me.upStates.loading > 0)) {
                me.$Ruler
                    .confirm({ msg: '是否确认取消上传?' })
                    .then(res => {
                        if (res == 'ok') {
                            me.$emit('closeDialog');
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    });
            } else {
                me.$emit('closeDialog', typeof val == "boolean" ? true : false);
            }
        },
        upPic(e) {
            // 单个上传图片
            var target = e.target.cloneNode();
            e.target.value = '';
            var file = target.files[0];
            if (!file) {
                return;
            }
            var fileType = file.type;
            var fileSize = file.size / 1024 / 1024;
            if (this.accept.indexOf(fileType) == -1) {
                this.$message({
                    type: 'warning',
                    message: '请上传正确的图片格式'
                });
                return;
            }
            if (fileSize > this.maxSize) {
                this.$message({
                    type: 'warning',
                    message: `图片大小超过${this.maxSize}M`
                });
                return;
            }
            this.setUpPic(file);
        },
        setUpPic(file) {
            this.materialUp.file = file;
            this.materialUp.imgURl = file.name;
            let _name = file.name.split('.')[0];
            if (_name.length > 30) {
                _name = _name.substring(0, 30);
            }
            this.materialUp.name = _name;
            this.$utils.load.img(file, { crossOrigin: 'anonymous' }).then(res => {
                this.materialUp.scale = res.width / res.height;
            });
            let url = URL.createObjectURL(file);
            this.initCanvas(url);
        },
        delSingleImg() {
            this.materialUp.imgURl = '';
            this.materialUp.file = '';
        },

        async uploadMaterial() {
            try {
                let me = this;
                await this.$refs['materialUp'].validate();
                this.isCanUploadMaterial = true;
                let tags = this.tagList.slice(0);
                if (this.materialUp.setHot && tags.indexOf('热点') === -1) {
                    tags.push('热点');
                }
                let obj = { ...this.materialUp, tags: tags.join(',') };
                if (this.autoImage.isCliped()) {
                    obj.file = await this.autoImage.exportBlob(obj.imgURl, obj.file.type, 0.75);
                }
                delete obj.imgURl;
                delete obj.scale;
                obj.enable = !obj.enable;
                me.$loading();
                await me.$http.imgMaterial(obj);
                me.isCanUploadMaterial = false;
                me.$refs['materialUp'].resetFields(); // 重置
                me.onbeforeClose(true);
                me.$loading().close();
                me.$Ruler.success('上传成功');
                me.commonRestData();
                me.$refs.singleTags.setTagsList();
            } catch (e) {
                console.log('catch--', e);
            }
        },
        async manyMaterialUpload() {
            if (this.manyStep == 1) {
                if (this.tagList.length == 0) {
                    this.$message({
                        message: '请填写标签',
                        type: 'warning'
                    });
                    return;
                }
                this.buttonText = '开始上传';
                this.manyStep = 2;
            } else {
                //  上传图片
                this.uploading.length = 0;
                for (let i = 0, len = this.list.length; i < len; i++) {
                    let item = this.list[i];
                    if (item.state == 'init') {
                        item.state = 'loading';
                        this.uploading.push(item);
                    }
                }
                await this.nextUploading();
            }
        },
        async nextUploading() {
            if (this.uploading.length > 0) {
                for (let i = 0; i < this.uploading.length; i++) {
                    await this.uploadAllMaterial(this.uploading[i]);
                }
            }
        },
        async uploadAllMaterial(item) {
            try {
                let me = this;
                let obj = {
                    file: '',
                    tags: ''
                };
                obj.file = item.file;
                obj.tags = this.tagList.join(',');
                var config = {
                    onUploadProgress: progressEvent => {
                        var complete = parseInt((progressEvent.loaded / progressEvent.total) * 100) || 0;
                        item.progress = complete;
                    }
                };
                await me.$http.imgMaterial(obj, config);
                item.state = 'success';
                me.commonRestData();
                me.$refs.allTags.setTagsList();
            } catch (e) {
                item.stste = 'error';
                console.log(e + 'catch');
            }
        },
        upChange(e) {
            // 多个上传
            var target = e.target;
            var temp = target.cloneNode();
            target.value = '';
            var len = temp.files.length;
            var currList = this.getCurrentList();
            var validNum = len;
            if (this.maxLen > 0) {
                validNum = this.maxLen - currList.length;
            }
            for (var i = 0; i < len; i++) {
                var item = temp.files[i];
                //校验类型
                if (this.accept && this.accept.length > 0 && !this.accept.includes(item.type)) {
                    this.$message({
                        type: 'warning',
                        message: '请上传正确的图片格式'
                    });
                    return;
                }
                //校验大小
                if (this.maxSize > 0 && item.size / 1024 / 1024 > this.maxSize) {
                    this.$message({
                        type: 'warning',
                        message: `文件大小超过${this.maxSize}M`
                    });
                    return;
                }
                this.addFile(item);
            }
            // 校验是否达到最大可用数量
            // if(len > validNum){
            //   this.$message.warning(`抱歉，您的文件超过${this.maxLen}个！`)
            // }
        },
        deleteMaterial(item) {
            // 删除
            item.state = 'delete';
        },
        getCurrentList() {
            //获取当前的数据
            var arr = [];
            for (var i = 0, len = this.list.length; i < len; i++) {
                if (this.list[i].state !== 'delete') {
                    arr.push(this.list[i]);
                }
            }
            return arr;
        },
        addFile(file) {
            var obj = {
                file: file,
                url: '',
                state: 'init', //init 初始状态， loading 上传中， fail 上传失败 ， delete 已删除 , success 完成
                progress: 0, //上传进度
                base: '',
                name: file.name
            };
            if (this.order == -1) {
                this.list.unshift(obj);
            } else {
                this.list.push(obj);
            }
            obj.base = URL.createObjectURL(file);
            this.upStates = this.getAllState();
        },
        stateText(val) {
            var state = val.state;
            if (state == 'init') {
                return '未开始';
            } else if (state == 'loading') {
                return val.progress + '%';
            } else if (state == 'fail') {
                return '上传失败';
            } else if (state == 'delete') {
                return '已删除';
            } else if (val.progress == 100) {
                return '上传成功';
            } else if (state == 'success') {
                return '上传成功';
            }
            return '未知状态';
        },
        getAllState() {
            //获取所有的状态
            var states = {
                fail: 0,
                success: 0,
                delete: 0,
                init: 0,
                loading: 0
            };
            for (var i = 0, len = this.list.length; i < len; i++) {
                var state = this.list[i].state;
                if (states[state] === undefined) {
                    states[state] = 1;
                } else {
                    states[state]++;
                }
            }
            return states;
        }
    },
    watch: {
        list: {
            handler() {
                //注意此处就是handler
                this.upStates = this.getAllState();
            },
            deep: true,
            immediate: true // watch 的一个特点是，最初绑定的时候是不会执行的，要等到 list 改变时才执行监听计算。加上改字段让他最初绑定的时候就执行
        },
        isUploadPic(val) {
            if (val) {
                this.chooseIndex = 0;
            }
        }
    }
};
</script>
<style lang="scss" src="./uploadCom.scss"></style>
<style lang="scss" scoped>
.auto-image {
    border: 1px solid red;
    margin: 20px 0 20px 98px;
    width: 320px;
    height: 320px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAR0AAACgCAYAAAAxSbhkAAAIHElEQVR4Xu3dsXIbRxCE4VViR44UOHOoF+D7v4jewIEiRmakwu2ydFtL2BYL09CCHyOJhTpKg8F/Pd2zvE/tx9cfrbUvp7+//vG5tfb1je97fS+K+vQ66Af9cMbE1X74NJrl8uLfWmuf34DLS2vt2xvf9/peFPXpddAP+uGMiav9cIHO03ilO7Y79rlp9IN+KOkH0FklnDHBmPC/xgS2w/vGatABHZAF2ShkQQd0QAd0QIfHNJEQFEAhCoXqFPuidF5jcimMFObc3PpBP5T0wwU6r1/uqO6oD3VHrb5ju/7RLj+dcoLO6un8dBGlGO9LMXxo3/eh3b3fQAd0QNY+Tsk+zrWbCuiADuiADuiMCvCYeEw8pge8KTp7tb6pUhupTUlq42zjUdYXy4ErdCgsCovCKlRYoAM6IAuyUciCDuiADuiAzqiAVEWqEk1Vdt9/2eXfT+lQOpQOpRNXOs5ezeDxG/B6PaR4UrySFM9yYKFLb83/KK4x2Zg8jcmgAzqgAApR7wx0QAd0QAd0RgUYnAzOqMFpHM6Mw5QOpUPpUDpxpXNRFJcvqY3U5tx8+kE/lPSDPZ1V6RjrjHXGusIJAHRAB2RBNgpZ0AEd0AEd0BkVYHAyOKMG5y5nl3ZP2SgdSofSoXTiSsfZqxk8UhupTUlq01r7tt7jPl5qbE+n0KXfXQb79x/NYcy/8ZgPOqDjQ3XjDxVv6Cjo1bEddEAHdEAnatiDDuiADuiAzqiAVEWqEk1VeFgZD8tzr1al4zfm9ZpI8aR4JSmePR17OhQlRRlVlKADOqADOqAzKsDgZHBGDU5R979H3beqD6VD6VA6lA6lQ+lMJAQFUIhCoTrFuygdZ69mtSO1kdqUpDbOXvVU1HLgOl7xknhJvKRC2wF0QAdkQTYKWdABHdABHdAZFWCgMlAfykCtNmh3uT6lQ+lQOpROXOl47tUMHmevej2keFK8khTPcmChS3+rDc5dZLP/79FMbIH/sAVAB3R8SHhnUe8MdEAHdEAHdEYFGJwMzqjBaTzMjIeUDqVD6VA6caXj7NUMHqmN1KYktXH2qqei9nTs6RhjjbHRMRZ0QAd0QAd0RgV4DbyGqNdgH+ood/lNiNKhdMqbTCqUSYV2gSbogA7oGK/i45WzVzN4nL3q9ZDiSfFKUjx7OvZ0eGe8s6h3BjqgAzqgAzqjArwGXkPUa2B4ZwxvSofSoXQoHUqH0plICAqgEIVCdfTuuVer0pHaSG1KUhtnr3oqak/Hng7vjHcW9c5AB3RAB3RAZ1SAl8HLeCgvo9or2eX6lA6lQ+lQOpQOpTOREBRAIQqF6n2li9Jx9mpWO85e9XpI8aR4JSme5cB1vOIl8ZJ4SYW2A+iADsiCbBSyoAM6oAM6oDMqwEBloD6UgVpt0O5yfUqH0qF0KJ240vHcqxk8UhupTUlq4+xVT0UtBxa69LtsiO4iy9XzaNbtbQfQAZ3tmxg0jybeZkwGHdABHYZ91LAHHdABHdABnVGBbeQieb+XvPd+3ff9cvZqVTrOXvWaSPGkeCUpnj0dezoUpT2d+J7O0/iJZnuzfXS2N+bcd8y5V/0pHUqH0qF0KB3KayIhKIBCFArVS5iUDqUDaqAWhZrnXq3QkdpIbUpSG2eveipqOXCFDkOdoc5QL5wAQAd0QBZko5AFHdABHdABnVEBBieDM2pwVqc2rn+8nc+UDqVD6VA6caXjuVczeJy96vWQ4knxSlI8ezqFLv291szJ+C7j1f+owy9nU4AO6PxyTQmajw1N0AEd0GHYRw170AEd0AEd0BkVMJNLVaKpCg8o4wE5e7UqHamN1KYktXH2qqei9nTs6VCUFGVUUYIO6IAO6IDOqACDk8EZNThF9ZmontKhdCgdSofSoXQmEoICKEShUJ3iee7VqnScveo1keJJ8UpSPMuBK3R4SbwkXlKh7QA6oAOyIBuFLOiADuiADuiMCjBQGagPZaBWG7S7XJ/SoXQoHUonrnS+jJ8otZHanJtPP+iHkn6wHFjo0ttwPYprTDYmT2My6IAOKIBC1DsDHdABHdABnVEBBieDM2pwGocz4zClQ+lQOpROXOl47tUMHqmN1KYktWmtfV7vce3D9Zs9HXs6xlhjbHSMBR3QAR3QAZ1RAV4DryHqNexyjGB3w5vSoXQoHUqH0qF0JhKCAihEoVCtpDz3alU6fmNer8mHS1U8l+p438v7356OPR3eGe8s6p2BDuiADuiAzqgAL4OX8VBeRrVXssv1KR1Kh9KhdCgdSmciISiAQhQK1ftKnnu1Kh2pTa9JeYrhLNLHTAktB67Q4SXxknhJhbYD6IAOyIJsFLKgAzqgAzqgMyrAQGWgPpSBWm3Q7nJ9SofSoXQonbjS8dyrGTxSm14PKZ4U7/zJuFk/WA4sdOl32RDdRZar59Gs29sOoAM62zcxaB5NvM2YDDqgAzoM+6hhDzqgAzqgAzqjAtvIRfJ+L3nv/brv++Xs1ap0bubSO1skBTu1l1R0pKL2dOzpUJT2dOJ7Ok/jJ5rtzfbR2d6Yc98x5171p3QoHUqH0qF0KK+JhKAAClEoVC9hUjqUDqiBWhRqnnu1QkfKMFIGz4E6CqEfbtwPlgMtBwoQBAjRAAF0QAd0QAd0RgV4DbyGqNdQbaC6/vF2PlM6lA6lQ+lQOpTOREJQAIUoFKqXBp29WpWOs1e9JlKbG6c2zuIdBX2xp7NCh5fES+IlFdoOF+j8Na7/T2vt7/Vntd9ba3++8X2v70VRn14H/aAfzpi42g/fASYLwjjeopD0AAAAAElFTkSuQmCC)
        center repeat;
}
img.result {
    max-width: 320px;
}
</style>
