<template>
    <div>
        <div id="userInfo">
            <div>
                <img src="../../../assets/img/userIMG.png" alt="" />
            </div>
            <br />
            <el-form :model="userInfo" label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="userInfo.username" size="medium" :disabled="editable"></el-input>
                </el-form-item>
                <el-form-item label="密码" v-show="!editable">
                    <el-input v-model="userInfo.password" size="medium"></el-input>
                </el-form-item>

                <el-form-item label="用户id" v-show="editable">
                    <el-input v-model="userInfo.id" size="medium" :disabled="editable"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" v-show="!editable">提交修改</el-button>
                    <el-button type="primary" @click="editabled" v-show="editable">修改用户信息</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'userInfo',
        data() {
            return {

                editable: true,

                userInfo: {//获取的所有用户信息
                    username: '',
                    password: '',
                    phone: '',
                    faddress: '',
                    saddress: '',
                    taddress: '',
                    id: '',
                },
                 userInfoChanged: {//获取的所有用户信息
                    username: '',
                    password: '',
                    phone: '',
                    faddress: '',
                    saddress: '',
                    taddress: '',
                    id: '',
                },
                user: {
                    username: '',
                    id: '',
                },
            }
        },
        mounted() {
            this.user = JSON.parse(localStorage.getItem('userInfo'))

            if (!this.user) {
                this.$message.warning('用户未登录，请登录')
                this.$router.push('/')
            } else {
                this.getData()
            }
        },
        methods: {
            getData() {
                this.axios.get('/api/beloving/userDetail?username=' + this.user.username).then(response => {
                    //接收传来的用户信息
                    this.userInfo = response.data;
                    this.userInfoChanged = JSON.parse(JSON.stringify(this.userInfo));
                })
            },
            editabled() {
                this.editable = !this.editable
                let userInfo = document.querySelector('#userInfo')
                let addressInfo = document.querySelector('#addressInfo')
                userInfo.style.marginLeft = '20%'
                addressInfo.style.display = 'block'
            },
            onSubmit() {
                this.editable = !this.editable
                //修改样式
                let userInfo = document.querySelector('#userInfo')
                let addressInfo = document.querySelector('#addressInfo')
                userInfo.style.marginLeft = '40%'
                addressInfo.style.display = 'none'
                //发送请求
                this.sendUpdateRequest();
                this.exit();
            },
            sendUpdateRequest() {
              //修改用户名
                if(this.userInfoChanged.username!=this.userInfo.username){
                   this.axios.get(`/api/beloving/updateUsername?id=${this.userInfo.id}&username=${this.userInfo.username}`).then(response => {
                })
                }

              //修改用户密码
                if(this.userInfoChanged.password!=this.userInfo.password){
                this.axios
                    .get('/api/beloving/updatePassword?id=' + this.userInfo.id + '&password=' + this.userInfo.password + '&valid=' + this.userInfo.password)
                    .then(response => {
                    })
                    }
            },
              exit(){
              this.$store.isSignIn = false;
              localStorage.setItem('isSignIn', JSON.stringify(false));
              localStorage.setItem('userInfo', JSON.stringify(null));
              this.$router.push('/');
            },
        },
    }
</script>

<style scoped>
    .avatar {
        width: 100px;
        height: 100px;
    }
    img {
        width: 100px;
        height: 100px;
        line-height: 100px;
        margin-left: 60px;
    }

    #userInfo {
        text-align: center;
        float: left;
        width: 20%;
        margin-left: 40%;
        margin-top: 5%;
    }
    #addressInfo {
        float: right;
        margin-top: 8%;
        margin-right: 20%;
        display: none;
    }

    /* 卡片 */
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: '';
    }
    .clearfix:after {
        clear: both;
    }

    .box-card {
        width: 480px;
    }
</style>
