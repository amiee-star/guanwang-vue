<template>
    <div class="canvas-card">
        <div style="display:none">
            <canvas ref="mydraw"></canvas>
        </div>
        <img :src="src" alt="" v-if="src">
    </div>
</template>
<script>
  import * as jsonCanvas from "./jsonCanvas/json2canvas";
  import testTpls from "./tpl1.json"
  import qs from "qs"

  export default {
    name: "canvas-card",
    props: {
      hostImage: {
        type: String
      }
    },
    data() {
      return {
        src: "",
        list: [],
        cacheSrc: [],
        index: 0
      }
    },
    async mounted() {

    },
    methods: {
      change(dir) {
        let index = dir + this.index;
        if (index < 0) {
          index = this.list.length - 1;
        }
        if (index >= this.list.length) {
          index = 0;
        }
        this.changeTpl(index);
      },
      async handleData(data, tpls) {
        for (let i = 0; i < tpls.length; i++) {
          let item = tpls[i];
          await this.merage(item, data);
        }
      },
      drawn(data) {
        return new Promise((resolve, reject) => {
          jsonCanvas.draw(data, this.$refs.mydraw, null, resolve);
        });
      },
      async setData(data) {
        // 防止原始模板被污染
        var tpls = JSON.parse(JSON.stringify(testTpls));
        await this.handleData(data, tpls);
        this.list = tpls;
        this.cacheSrc = [];
        this.index = 0;
        await this.changeTpl(0);
      },
      async changeTpl(index) {
        this.index = index;
        let canvas = this.$refs.mydraw;
        // 多个模板之间的切换
        if (this.cacheSrc[index]) {
          let item = this.cacheSrc[index];
          canvas.width = item.w;
          canvas.height = item.h;
          if (!this.ctx) {
            this.ctx = canvas.getContext("2d");
          }
          let img = await this.getImageInfo(item.src);
          this.ctx.drawImage(img, 0, 0);
        } else {
          await this.drawn(this.list[index]);
        }
        let src = canvas.toDataURL("image/png");
        this.cacheSrc[index] = {
          src: src,
          w: canvas.width,
          h: canvas.height
        };
        this.src = src;
      },
      async merage(data, info) {
        // 对背景的处理，如果设置了背景图片，则替换为展厅的封面
        if (data.bg && info[data.bg]) {
          await this.imgUrl(data, info[data.bg]);
          let u = data.url;
          if (data.gblur) {
            // 是否需要高斯模糊
            data.url = `/scene-portal/xcx/gaussianBlur?url=${encodeURIComponent(u)}`;
          }
          data._url = u;
        }

        for (let i = 0; i < data.children.length; i++) {
          let item = data.children[i];
          await this.replaceKey(item, info);
          if (item.children) {
            for (let j = 0; j < item.children.length; j++) {
              await this.replaceKey(item.children[j], info);
            }
          }
        }
      },
      async replaceKey(item, info) {
        const val = info[item.fid];
        if (val !== undefined) {
          if (item.type == "text") {
            item.text = val || "";
          } else if (item.type == "image") {
            await this.imgUrl(item, val);
          }
        }
        if (item.type == "image" && item.fid == "_icon" && item.url && this.hostImage) {
          // 如果是 icon ，需要替换 host 为 当前环境的
          let url = item.url;
          url = url.split("/").pop();
          item.url = `${this.hostImage}/${url}`;
        }
      },
      async imgUrl(item, url) {
        url = url || "";
        if (url) {
          let h = item.height;
          let w = item.width;
          let urls = url.split("?");
          let obj = qs.parse(urls[1]);
          // 需要判断，是否压缩,只有存在compress 才行
          if (item.compress) {
            // 缩放
            h = parseInt(h * item.compress) || h;
            w = parseInt(w * item.compress) || w;
          }

          obj.width = w;
          obj.height = h;
          obj["x-obs-process"] = `image/resize,m_lfit,h_${h},w_${w},g_center`;

          if (item.compress) {
            // 强制裁剪为正确的比例
            try {
              let scale = 100;
              let compress = await this.getImgCompress(item, urls[0] + "?" + qs.stringify(obj));
              if (compress.scale) {
                // 将比例还原
                scale = compress.scale;
              }
              // obj["x-oss-process"] = `image/resize,m_mfit,h_${h},w_${w},g_center`;
              // x-oss-process=image/crop,x_10,y_10,w_200,h_200,g_center
              obj["x-obs-process"] = `image/resize,p_${scale},mage/crop,w_${w},h_${h},g_center`;
            } catch (e) {
              console.log(e);
            }
          }

          item.url = urls[0] + "?" + qs.stringify(obj);
        } else {
          item.url = "";
        }
      },
      compress(dominfo, img) {
        // 放大并裁剪
        var wRate = img.width / dominfo.width;
        var hRate = img.height / dominfo.height;
        var obj = {};
        if (wRate > hRate) {
          // 宽度需要缩放的小
          obj.height = dominfo.height;
          obj.width = obj.height / img.height * img.width;
        } else {
          obj.width = dominfo.width;
          obj.height = obj.width / img.width * img.height;
        }
        // 因为小程序真机处理小数点，会报错。。

        obj.width = Math.floor(obj.width);
        obj.height = Math.floor(obj.height);

        let wScale = obj.width / img.width;
        let hScale = obj.height / img.height;
        if (wScale > hScale) {
          obj.scale = wScale;
        } else {
          obj.scale = hScale;
        }
        obj.scale = Math.ceil(obj.scale * 100);
        return obj;
      },
      async getImgCompress(item, p) {
        // 获取图片压缩的比例
        const me = this;
        if (!p) {
          return Promise.reject(p);
        }
        let imgInfo = await me.getImageInfo(p);
        return me.compress(item, imgInfo)
      },
      getImageInfo(src) {
        let img = new Image();
        img.src = src;
        img.crossOrigin = "anonymous";
        return new Promise((resolve, reject) => {
          img.onload = function () {
            resolve(img);
          }
          img.onerror = reject;
        });
      },
      exportBase() {
        // 导出图片
        return this.src;
      },
      exportFile(filename, mime) {
        let base64 = this.src;
        return this.dataURLtoFile(base64, filename, mime);
      },
      dataURLtoFile(b64Data, filename, mime) {
        filename = filename || "test.png";
        mime = mime || "image/png";
        var bstr = atob(b64Data.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        // 转换成file对象
        return new File([u8arr], filename, {type: mime});
        // 转换成成blob对象
        // return new Blob([u8arr],{type:mime});
        // return blob;
      }

    }
  }
</script>
<style lang="scss" scoped>
    .canvas-card {
        height: 100%;

        img {
            height: 100%;
            width: 100%;
            display: block;
            object-fit: cover;
        }
    }
</style>