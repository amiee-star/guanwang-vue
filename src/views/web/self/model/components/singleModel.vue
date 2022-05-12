<template>
    <div class="box flex-center-column" :style="{borderColor : isRename? '#19A0F1' : ''}">
        <img :src="data.thumbnail ? fileHost + data.thumbnail : require('@/assets/images/self/logo-hui.png')" :class="data.thumbnail ? '' : 'defaultImg'"/>
        <div class="name">
            <p class="tow" v-if="!isRename">{{name}}</p>
            <p class="flex" v-else><el-input v-model="name" maxlength="24"></el-input><el-button type="primary" @click="reName">确定</el-button></p>
        </div>

        <ul class="editors flex">
            <li v-for="(item, index) in editors" :key="index">
                <p v-if="!item.popover" @click="lookOrEdit(item.text)">{{item.text}}</p>
                <el-popover
                        v-else
                        popper-class="popover_operate"
                        placement="top"
                        width="140"
                        trigger="hover">
                    <ul>
                        <li v-if="data.visionDone" @click="isRename=!isRename">重命名</li>
                        <li @click="del">删除</li>
                    </ul>
                    <i class="el-icon-more" slot="reference"></i>
                </el-popover>
            </li>
        </ul>
        <div class="status">
            <div class="objStatus" v-if="!data.visionDone || !data.objDone || !data.panaDone">
                <img src="@/assets/images/self/loading.png" alt="">处理合成中
            </div>
            <div class="bojOperate flex-center-column cursor" v-else @click="makeHall(data)">
                制作展厅
            </div>
        </div>
        <div class="pubState" v-if="data.errors">
            <el-tooltip popper-class="popper_checkNote" effect="light" content="ggg" placement="bottom-start">
                <el-button><i class="el-icon-warning-outline"></i>处理失败</el-button>
            </el-tooltip>
        </div>
    </div>
</template>

<script>
  export default {
    name: "singleModel",
    props: ['data', 'token'],
    data() {
      return {
        edit: [
          {
            text: '预览',
            popover: false
          }, {
            text: '编辑',
            popover: false
          }, {
            text: '',
            popover: true
          },
        ],
        name: this.data.name,
        isRename: false,
        baseUrl: process.env.VUE_APP_artHost + '/scene-portal/',
        fileHost: process.env.VUE_APP_pdfHost
      }
    },
    computed: {
      editors() {
        let me = this;
        if (me.data.error) {
          return me.edit.slice(2,3);
        } else if (!me.data.visionDone) {
          // 合成超过两个小时就出现删除
          let time = new Date(this.data.updateTs).getTime() - new Date(this.data.createTs).getTime();
          if (time > 2*60*60*1000) {
            return me.edit.slice(2,3);
          } else {
            return []
          }
        } else {
          return me.edit
        }
      }
    },
    methods: {
      del() {
        let me = this;
        if (me.data.templateCount > 0) {
          me.$Ruler.warn({
            msg: '删除失败',
            desc: '此模板已经关联展厅，不可删除'
          })
        } else {
          me.$Ruler.confirm({
            msg: '确认执行删除吗？',
            desc: '删除后将无法恢复，请谨慎操作！'
          }).then(res => {
            if (res === 'ok') {
              me.$http.deleteScene({
                sid: me.data.id
              }).then( ress => {
                me.$Ruler.success('删除成功');
                me.$emit('getList');
              })
            }
          })
        }

      },
      async reName() {
        let me = this;
        await me.$http.editScene({name: me.name, sid: me.data.id});
        me.isRename = !me.isRename ;
      },
      reUp() {
        // this.$store.commit('setStates', {k: 'modelId',v: this.data.sid});
        this.$store.commit('toUploadModel', true)
      },
      lookOrEdit(text) {
        let me = this;
        if (text === '预览') {
          window.open(`${process.env.VUE_APP_ViewURL}showcase/3.2/view.html?sceneId=${me.data.id}&play=1&qs=1`)
        } else {
          if (me.data.templateCount > 0) {
            me.$Ruler.warn({
              msg: '提醒',
              desc: '此模板已经关联展厅，重新配置模板会影响相应展厅'
            }).then(res => {
              if (res === 'ok') {
                window.open(`${process.env.VUE_APP_ViewURL}showcase/3.2/smallMap.html?sceneId=${me.data.id}&token=${me.token}&isWeb=1`)
              }
            })
          } else {
            window.open(`${process.env.VUE_APP_ViewURL}showcase/3.2/smallMap.html?sceneId=${me.data.id}&token=${me.token}&isWeb=1`)
          }
        }
      },
      async makeHall(item) {
        var me = this;
        var sid = item.id;
        let scenId = await me.$http.myCreat({sid});
        console.log(this.token);
        let url = await me.$utils.getArtEditorUrl({tempId: scenId, token: this.token});
        window.open(url)
      }
    },
    mounted() {
      console.log(this.data)
    }
  }
</script>

<style scoped lang="scss">
    .box{
        position: relative;
        border-bottom: 1px solid #fff;
        background: #eee;
        &:hover{
           .editors,.bojOperate{
               display: flex;
           }
        }
        >img{
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
            &.defaultImg {
                width: 175px;
                height: auto;
                max-width: 100%;
                max-height: 100%;
                margin-top: -40px;
            }
        }
        .name{
            width: 100%;
            position: absolute;
            bottom: 0;
            background: #fff;
            padding: 0px 12px;
            height: 45px;
            .tow {
                height: 45px;
                line-height: 45px;
            }
            &::v-deep {
                .el-input__inner{
                    border: none;
                    padding-left: 0;
                    height: 30px;
                    line-height: 30px;
                }
                .el-button{
                    padding: 8px 20px;
                    background: #19A0F1;
                    border-color: #19A0F1;
                }
            }
        }
        ul.editors {
            position: absolute;
            right: 10px;
            top: 10px;
            z-index: 5;
            display: none;

            li {
                width:42px;
                height:30px;
                /*padding: 6px 12px;*/
                background: rgba(255, 255, 255, 0.9);
                border-radius: 3px;
                text-align: center;
                line-height: 30px;
                margin-left: 5px;
                cursor: pointer;
                &:hover {
                    /*background: rgba(255, 255, 255, 0.6);*/
                    color: #23B8FF;
                }
                i{
                    width: 100%;
                    height: 100%;
                }
                img {
                    vertical-align: middle;
                    max-width: 18px;
                }
            }
        }
        div.status {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-100%);
            .objStatus {
                height: 30px;
                line-height: 30px;
                background: rgba(255, 255, 255, 1);
                border-radius: 15px;
                font-size: 14px;
                color: #666666;
                padding: 0 16px;
                white-space: nowrap;
                img {
                    position: relative;
                    top: -2px;
                    vertical-align: middle;
                }
            }


        }
        div.bojOperate{
            width:108px;
            height:36px;
            background:rgba(35,184,255,1);
            border-radius:18px;
            color:rgba(255,255,255,1);
            display: none;
            &:hover{
                background: #0090FF;
            }
        }
        div.pubState {
            position: absolute;
            top: 10px;
            left: 10px;
            /*width: 54px;*/
            /*height: 24px;*/
            /*background: #FBB03B;*/
            /*border-radius: 3px;*/
            /*color: #fff;*/
            /*text-align: center;*/
            /*line-height: 24px;*/
            ::v-deep.el-button{
                width:98px;
                height:24px;
                background:rgba(255,90,95,1);
                border-radius:3px;
                color: #fff;
                padding: 0;
                border: none;
                i{
                    margin-right: 5px;
                }
            }
        }
    }
</style>
<style lang="scss">
    .popover_operate {
        padding: 0 !important;
        min-width: 140px !important;
        border: none;
        border-radius: 0;
        ul {
            text-align: center;
            li {
                height: 38px;
                line-height: 38px;
                border-bottom: 1px solid #E7E7E7;
                cursor: pointer;
                &:hover{
                    background: #23B8FF;
                    color: #FFFFFF;
                }
                &:last-of-type {
                    border-bottom: none;
                }
            }

            .active {
                background: #23B8FF;
                color: #FFFFFF;
            }
        }
    }
    .popper_checkNote{
        box-shadow:0px 3px 12px 0px rgba(4,0,0,0.15)!important;
        border-color: #fff!important;
        .popper__arrow{
            border-width: 0!important;
        }
    }
</style>
