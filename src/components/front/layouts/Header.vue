<template>
    <div>
        <div id="nav">
          <div id="nav_content">
 <router-link class="left logo" to="/" tag="div"> <img src="../../../assets/img/logo.png" alt=""/></router-link>
            <router-link class="left" to="/">Home</router-link>
            <router-link class="left" to="/">FlowerWorld</router-link>
            <router-link class="left" to="/">Explore</router-link>

            <el-col :span="12" class="right" style="width:fit-content">
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link" v-show="isSignIn">
                        <a class="icon-shezhi iconfont"></a>
                    </span>

                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                                <router-link to="/addressInfo" class="icon-tuichudenglu iconfont dropdown">地址管理</router-link>
                        </el-dropdown-item>


                        <el-dropdown-item>
                            <div @click="exit">
                                <router-link to="/login" class="icon-tuichudenglu iconfont dropdown">退出登录</router-link>
                            </div>
                        </el-dropdown-item>

                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <div v-show="!isSignIn">
                <router-link class="signup" to="/login" tag="a">Sign Up</router-link>
                <div id="shuxian">|</div>
                <router-link class="signin " to="/login" tag="a">Sign In</router-link>
            </div>

            <router-link class="right icon-yonghu iconfont" to="/userInfo" tag="a"></router-link>
            <router-link class="right icon-dingdan iconfont" to="/myOrders" tag="a"></router-link>
            <router-link class="right icon-gouwuche iconfont" to="/carts" tag="a"></router-link>

          </div>

        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                collapse: false,
                name: 'user',

                isSignIn: false,

            }
        },
        mounted() {
            if (document.body.clientWidth < 1500) {
                this.collapseChage()
            }
            //判断是否用户登入 若登入则显示设置 否则显示signIn signUp

            this.isSignIn = JSON.parse(localStorage.getItem('isSignIn'))
            console.log(this.isSignIn)
            this.isSignIn = JSON.parse(localStorage.getItem('isSignIn'))
            console.log(this.isSignIn)
        },
        computed: {
            username() {
                let username = localStorage.getItem('ms_username')
                return username ? username : this.name
            },
        },
        methods: {


            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if (command == 'loginout') {
                    localStorage.removeItem('ms_username')
                    this.$router.push('/login')
                }
            },
            // 侧边栏折叠
            collapseChage() {
                this.collapse = !this.collapse
                bus.$emit('collapse', this.collapse)
            },

            goBackPath() {
                if (window.history.length > 1) {
                    this.$router.back()
                } else {
                    this.$router.push('/')
                }
            },
            exit() {
                this.$store.isSignIn = false
                localStorage.setItem('isSignIn', JSON.stringify(false))
                localStorage.setItem('userInfo', JSON.stringify(null))
            },
        },
    }
</script>
<style scoped>
    @import '../../../assets/icon/header.css';
    #nav{
        position: fixed;
        padding: 2% 15%;
        top:0;
        left:0;
        height: 10%;
        width:73%;
        z-index: 999;
        padding-bottom: 0;
    background-color: #f0e0d9
    }
    .left{
        font-size: 16px;
        float: left;
        padding: 1% 1%;
        line-height: 5%;
    }
    .right {
        float: right;
        padding: 2% 1%;
        line-height: 5%;
    }
    .signup,
    .signin {
        float: right;
        font-size: 14px;
        text-align: center;
        margin-right: 1%;
        margin-top: 1.5%;
    }
    #shuxian {
        float: right;
        margin-top: 1.2%;
        margin-right: 0.5%;
    }
    .logo {
        padding: 0;
        margin-left: 4%;
        margin-right: 2%;
    }
    .logo img {
        height: 70px;
    }
    a {
        text-decoration: none;
        text-align: center;
        margin-top: 1%;
        color: black;
    }
    .iconfont {
        margin-top: 0;
    }
   

    /* 下拉 */
    .dropdown {
        font-size: 14px;
    }
    .demonstration {
        display: block;

        color: #8492a6;
        font-size: 14px;
        margin-bottom: 20px;
    }
</style>
