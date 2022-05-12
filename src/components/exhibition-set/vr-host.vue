<template>
  <div class="vr-host">
    <el-dialog :visible.async="dialogVisible" width="30%" @close="closeDialog">
      <div slot="title" class="header-title">
        <p>“VR带看”主持人列表<span>（最多选择三个）</span></p>
        <el-tooltip class="tooltip" effect="light" content="用户发起带看请求时，填写的手机号将收到短信通知" placement="top">
          <i class="el-icon-warning-outline"></i>
        </el-tooltip>
      </div>
      <div class="select">
        <el-input v-model="keyword" size="small" maxLength="20" placeholder="请输入手机号或昵称" clearable @clear="searchHandle">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="searchHandle"></i>
        </el-input>
        <el-button size="medium" @click="addHost" :disabled="!isAdd">+ 添加</el-button>
      </div>
      <div class="table">
        <el-table ref="vrTable" :data="tableData" style="width: 100%" max-height="436px"
          :row-class-name="tableRowClassName" @select="handleSelectionChange">
          <el-table-column type="selection" width="80" align="center" :selectable="selectable">
          </el-table-column>
          <el-table-column prop="accid" label="手机号">
            <template slot-scope="scope">
              <template v-if="scope.row.show && !scope.row.id">
                <el-input v-model="scope.row.accid" size="small" @blur="changePhone(scope.row.accid)" maxLength="11">
                </el-input>
                <span class="error" v-if="phoneError">{{phoneErrorValue}}</span>
              </template>
              <template v-else>
                <span>{{ scope.row.accid }}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="nickname" label="昵称">
            <template slot-scope="scope">
              <template v-if="scope.row.show">
                <el-input v-model="scope.row.nickname" size="small" maxLength="6"
                  @blur="changeNickName(scope.row.nickname)"></el-input>
                <span class="error" v-if="nameError">{{nameErrorValue}}</span>
              </template>
              <template v-else>
                <span>{{ scope.row.nickname }}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <template slot-scope="scope">
              <template v-if="scope.row.show && scope.row.id">
                <span class="save" @click="saveRow(scope.row)">保存</span><span class="line">|</span><span class="cancel"
                  @click="cancelEditHandle(scope.row)">取消</span>
              </template>
              <template v-if="scope.row.show && !scope.row.id">
                <span class="save" @click="saveRow(scope.row)">保存</span><span class="line">|</span><span class="cancel"
                  @click="cancelAddHandle(scope.row)">取消</span>
              </template>
              <template v-if="!scope.row.show && scope.row.id">
                <span :class="isAdd ? 'edit' :'edit disabled'" @click="editHandle(scope.row)">编辑</span>
              </template>
            </template>
          </el-table-column>
        </el-table>
        <p class="tips" v-if="isShowAll">已显示全部主持人</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import formRules from "@/config/form-rules.js";
  export default {
    name: "vrHost",
    props: {
      visible: {
        type: Boolean
      },
      hostList: {
        type: Array,
      },
      tempId: {
        type: String
      }
    },
    
    data() {
      return {
        arrs: [],
        isShowAll: false,
        dialogVisible: false,
        phoneError: false,
        phoneErrorValue: "",
        nameError: false,
        nameErrorValue: "",
        isAdd: true,
        keyword: "",
        pageSize: 300,
        currentPage: 1,
        options: [{
          value: "",
          label: '全部'
        }, {
          value: 1,
          label: '启用'
        }, {
          value: 0,
          label: '禁用'
        }],
        tableData: [],
        totalData: [],
        vrTotal: 0,
        dom: '',
        multipleSelection: [],
      }
    },
    watch: {
      visible(val) {
        this.dialogVisible = val;
        if (val) {
          this.isShowAll = false;
          this.keyword = "";
          this.getList();
          let flag = false;
          if(this.multipleSelection.length == this.hostList.length) {
            this.multipleSelection.forEach(item1 => {
              this.hostList.map(item2 => {
                if (item1.id !== item2.id) {
                  flag = true;
                }
              })
            })
          }else {
            flag = true;
          }
          if (flag) {
            this.multipleSelection = JSON.parse(JSON.stringify(this.$store.state.yuanHostList))
          }
        }
      },
      tableData(val) {
        this.selectHandle(this.multipleSelection, val)
      },
      multipleSelection(val) {
        this.selectHandle(val, this.tableData)
      },
      hostList: {
        deep: true,
        handler(val) {
          if (val) {
            this.multipleSelection = [];
            this.multipleSelection = JSON.parse(JSON.stringify(val));
          }
        }
      }
    },

    mounted() {
      if(this.dialogVisible) {
        this.getList();
      }
    },
    methods: {
      toggleSelection(arrs) {
        arrs.forEach(id => {
          if (this.$refs.vrTable) {
            this.$refs.vrTable.toggleRowSelection(this.tableData.find(item => id === item.id), true);
          }
        })
      },
      selectHandle(multipleSelection, data) {
        this.arrs = [];
        if (this.dialogVisible) {
          this.$nextTick(() => {
            multipleSelection.forEach(row => {
              data.map(item => {
                if (row && row.imUserId) {
                  if (item.id == row.imUserId) {
                    this.arrs.push(item.id)
                  }
                } else if (row && row.id) {
                  if (item.id == row.id) {
                    this.arrs.push(item.id)
                  }
                }
              })
            })
          })
          setTimeout(() => {
            this.toggleSelection(this.arrs)
          }, 50)
        }
      },
      //关闭弹窗
      saveHandle() {
        this.$emit("closepop", this.multipleSelection);
        this.isAdd = true;
        this.$store.commit("setStates", {
          k: "yuanHostList",
          v: this.multipleSelection
        })
      },
      closeDialog() {
        this.$emit("closepop");
        this.isAdd = true;
      },
      //获取主持人列表
      getList() {
        let params = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          keyword: this.keyword,
          tempId: this.tempId
        }
        this.$http.getCompere(params)
          .then(res => {
            res.list.map(item => {
              item.show = false;
            })
            this.tableData = res.list;
            this.vrTotal = res.count;
            this.isAdd = true;
          })
      },
      //添加主持人
      addHost() {
        this.isAdd = false;
        let newRow = {
          accid: "",
          nickname: "",
          show: true
        }
        this.tableData.unshift(newRow);
        this.phoneError = false;
        this.nameError = false;
      },

      //编辑
      editHandle(row) {
        if (this.isAdd) {
          this.isAdd = false;
          row.show = true;
          this.phoneError = false;
          this.nameError = false;
        }
      },

      saveRow(row) {
        if (!row.accid) {
          this.phoneError = true;
          this.phoneErrorValue = "手机号不能为空";
        }
        if (!row.nickname) {
          this.nameError = true;
          this.nameErrorValue = "昵称不能为空";
          return false;
        }
        if (!this.phoneError && !this.nameError && row.accid && row.nickname) {
          //编辑
          if (row.id) {
            let params = {
              accid: row.accid,
              nickname: row.nickname,
              id: row.id
            }
            this.$http.editCompere(params)
              .then(res => {
                row.show = false;
                this.isAdd = true;
                this.getList();
                this.$message.success("保存成功！")
              })
          } else {
            //新增
            let params = {
              accid: row.accid,
              nickname: row.nickname,
              tempId: this.tempId
            }
            this.$http.creatCompere(params)
              .then(res => {
                row.show = false;
                this.isAdd = true;
                this.getList();
                this.$message.success("保存成功！")
              }).catch(error => {
                console.log(error)
              })
          }
        }

      },
      //输入手机号
      changePhone(val) {
        var mobile = /^1[23456789]\d{9}$/;
        if (!val) {
          this.phoneError = true;
          this.phoneErrorValue = "手机号不能为空";
        } else {
          if (!mobile.test(val)) {
            this.phoneError = true;
            this.phoneErrorValue = "请输入正确的手机号";
          } else {
            this.phoneError = false;
          }
        }
      },
      changeNickName(val) {
        if (!val) {
          this.nameError = true;
          this.nameErrorValue = "昵称不能为空";
        } else {
          this.nameError = false;
        }
      },
      tableRowClassName({
        row
      }) {
        if (row.show && (this.phoneError || this.nameError)) {
          return 'errowRow';
        }
        if (!row.id || (row.id && row.show)) {
          return 'noCheckBox';
        }
        return '';
      },
      cancelAddHandle(row) {
        row.show = false;
        this.tableData.shift();
        this.isAdd = true;
        this.getList();
      },
      cancelEditHandle(row) {
        row.show = false;
        this.isAdd = true;
        this.getList();
      },
      //筛选
      searchHandle() {
        this.getList();
      },

      handleSelectionChange(val, row) {
        if (JSON.stringify(this.multipleSelection).indexOf(row.id) === -1) {
          this.multipleSelection.push(row)
        } else {
          let selectIndex = this.multipleSelection.findIndex((item, index) => {
            if (item && item.id && row.id == item.id) {
              return item && item.id && row.id == item.id
            } else if (item && item.imUserId && row.id == item.imUserId) {
              return item && item.imUserId && row.id == item.imUserId
            }
          })
          this.multipleSelection.splice(selectIndex, 1)
        }
      },
      selectable(row, index, tag) {
        if (this.multipleSelection.length === 3) {
          if (JSON.stringify(this.multipleSelection).indexOf(row.id) == -1) {
            return false
          } else {
            return true
          }
        } else {
          return true
        }
      },
    }
  }
</script>

<style lang="scss" src="./vr-host.scss"></style>
