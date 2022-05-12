<template>
    <ul>
        <slot name="top"></slot>
        <li class="bx" v-for="(item,index) in list" :key="index" :class="{link:!!item.link}" >
            <div class="bimg">
              <img :src="item.img" alt />
            </div>
            <div class="text">
              <h3>{{item.name}}</h3>
              <p>{{item.desc}}</p>
            </div>
            <div class="arrow" @click="skipTo(item)">
              <span class="txt">{{item.arrow}}</span>
              <span class="r">→</span>
            </div>
        </li>
        <slot name="bottom"></slot>
    </ul>
</template>
<script>
export default {
    name:"schemeBlock",
    props:{
        list:{
            type:Array,
            default(){
                return [];
            }
        }
    },
    methods:{
        skipTo(item){
            if(item.link){
                window.open(item.link,"__blank");
            }
        }
    }
}
</script>