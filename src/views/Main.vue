<style lang="less">
    @import "./main.less";
    @import "../styles/iconfont/iconfont.css";
</style>
<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <div class="sidebar-menu-con" :style="{width: shrink?'60px':'220px', overflow: shrink ? 'visible' : 'auto'}">
            <shrinkable-menu 
                :shrink="shrink"
                :before-push="beforePush"
                :open-names="openedSubmenuArr"
                :menu-list="menuList">
                <div slot="top" class="logo-con">
                    <img v-show="!shrink"  src="../images/logo.png" key="max-logo" class="max"/>
                    <img v-show="shrink" src="../images/logo-min.png" key="min-logo" class="min" />
                </div>
            </shrinkable-menu>
        </div>
        <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'220px'}">
            <div class="main-header">
                <div class="navicon-con">
                    <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
                        <Icon type="navicon" size="24" color="#a3adc8"></Icon>
                    </Button>
                </div>
                <div class="header-avator-con">
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <span class="main-user-name"><b>{{ userName }}，</b>欢迎回来！</span>
                            <i class="iconfont icon-lingdang"></i>
                            <i class="iconfont icon-wenti"></i>
                            <i class="iconfont icon-guanji" @click="loginout"></i>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
        <!-- 消息通知 -->
        <div class="notice-page-on"></div>
        <div class="single-page-con" :style="{left: shrink?'60px':'220px'}">
            <div class="single-page">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import Cookies from 'js-cookie';
import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue';
import util from '@/libs/util.js';

export default {
    components: {
        shrinkableMenu
    },
    data () {
        return {
            shrink: false,
            userName: '',
            openedSubmenuArr: this.$store.state.app.openedSubmenuArr
        };
    },
    computed: {
        menuList () {
            return this.$store.state.app.menuList;
        }
    },
    methods: {
        init () {
            // 更新导航 当有二姐菜单被选中，展开一级菜单
            let pathArr = util.setCurrentPath(this, this.$route.name);
            this.$store.commit('updateMenulist');
            if (pathArr.length >= 2) {
                this.$store.commit('addOpenSubmenu', pathArr[1].name);
            }

            if(Cookies.get('userName')){
                this.userName = Cookies.get('userName');
            }
            else{
                this.userName = '我是个测试号'
            }

            
            // util.ajax.get('/api/promotion/v1/shop-member')
            //     .then(function (response) {
            //         console.log(response);
            // })
            //     .catch(function (response) {
            //         console.log(response);
            // });
            
        },

        toggleClick () {
            this.shrink = !this.shrink;
        },
        loginout () {
            this.$Modal.confirm({
                title: '温馨提示',
                content: '<p style="font-size:14px;">您确定要退出系统吗?</p>',
                onOk: () => {
                    util.ajax.get('/web/api/logout')
                    .then(function (response) {
                        console.log(response);
                    })
                    if(Cookies.get('rememberPwd') == 'false'){
                        this.$store.commit('logout', this);
                    }
                    this.$store.commit('clearOpenedSubmenu');
                    this.$router.push({
                        name: 'login'
                    });
                
                }
            });
            
        },
        beforePush (name) {
            // if (name === 'accesstest_index') {
            //     return false;
            // } else {
            //     return true;
            // }
            return true;
        },
    },
    watch: {
        '$route' (to) {
            let pathArr = util.setCurrentPath(this, to.name);
            if (pathArr.length > 2) {
                this.$store.commit('addOpenSubmenu', pathArr[1].name);
            }
            
        },
        lang () {
            util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
        }
    },
    mounted () {
        this.init();
    }
};
</script>
