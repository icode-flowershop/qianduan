<template>
    <div id="all">
        <div class="container1">
            <span class="error animated tada" id="msg"></span>
            <form name="form1" class="box">
                <h4>BELOVING商城</h4>
                <input type="text" placeholder="账号" autocomplete="off" v-model="user.username" />
                <i class="typcn typcn-eye" id="eye"></i>
                <input type="password" name="password" placeholder="密码" id="pwd" autocomplete="off" v-model="user.password" />
                <a href="#" class="dnthave" id="register" @click="registerShow">注册</a>
                <a href="#" class="forgetpass" @click="forgetPwd">忘记密码?</a>
                <input type="checkbox" name="" id="changeRole" v-model="checkIdentity" /><span>管理员登录</span>

                <input type="submit" value="登 录" class="btn1" @click.prevent="login()" />
            </form>
        </div>
        <div class="container2">
            <span class="error animated tada" id="msg"></span>
            <form name="form1" class="box">
                <h4>填写注册信息</h4>
                <input type="text" id="_user" placeholder="账号" autocomplete="off" />
                <i class="typcn typcn-eye" id="eye"></i>
                <input type="password" id="_password" placeholder="密码" autocomplete="off" />
                <input type="text" id="_phone" placeholder="手机号" autocomplete="off" />

                <input type="submit" value="注册" class="btn1" @click="registerInfo" />
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                role: 0,
                checkIdentity: false,
                user: {
                    username: '',
                    password: '',
                    phone: '',
                    address: '',
                    id: '',
                },
            }
        },

        methods: {
            login() {
                if (this.checkIdentity) this.role = 1

                axios.get(`/api/beloving/login?username=${this.user.username}&password=${this.user.password}&role=${this.role}`).then(resp => {
                  console.log(resp);
                    if (resp.data) {
                      this.user.id = resp.data;
                        this.$message.success('登录成功')
                        if (this.checkIdentity) {
                            //push到后台路由
                            this.$router.push('/backHome')
                        } else {
                            //将用户信息存储在$store中
                            this.userStorage();
                            this.$router.push('/')
                        }
                    } else {
                        this.$message.warning('账号密码错误,登录失败')
                    }
                })
            },


            userStorage() {
                this.axios.get('/api/beloving/userDetail?id=' + this.user.id)
                .then(response => {
                  console.log(response)
                    this.$store.userInfo = {
                      username:this.user.username,
                      id:this.user.id
                    }
                    //加入缓存前先清除之前用户登录的缓存
                    localStorage.removeItem('userInfo')
                    //将用户信息和id传如浏览器缓存中
                    localStorage.setItem('userInfo', JSON.stringify(this.$store.userInfo));
                    this.$store.isSignIn = true;
                    localStorage.setItem('isSignIn', JSON.stringify(this.$store.isSignIn));
                    localStorage.setItem('defaultAddress', JSON.stringify(response.data.faddress));



                })
            },

            forgetPwd() {
                this.$message.warning('请联系管理员 QQ:1035821043')
            },
            registerShow() {
                $('.container1').css('left', '40%')
                $('.container2').css('display', 'block')
            },
            registerClose() {
                $('.container1').css('left', '50%')
                $('.container2').css('display', 'none')
            },

            /*  */
            verifyRegisterInfo(user) {
                if (!user.username && !user.password && !user.phone) {
                    return 1
                } else {
                    this.$message.warning('注册信息不能为空')
                    return 0
                }
            },
            registerInfo() {
                this.user.username = $('#_user').val()
                this.user.password = $('#_password').val()
                this.user.phone = $('#_phone').val()

                if (this.verifyRegisterInfo(this.user)) {
                    this.axios
                        .get(
                            `/api/beloving/register?username=${this.user.username}&password=
                ${this.user.password}&phone=${this.user.phone}&role=${this.role}`
                        )
                        .then(response => {
                            this.$message.success('注册成功')
                        })
                    this.registerClose()
                }
            },
        },
    }
</script>
<style>
    #all {
        height: 100%;
        background-repeat: no-repeat;
        background-size: 100% auto;
        background-image: linear-gradient(-225deg, #e3fdf5 0%, #ffe6fa 100%);
        background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
        background-attachment: fixed;
    }

    #particles-js {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .container1,
    .container2 {
        margin: 0;
        top: 50px;
        left: 50%;
        position: absolute;
        text-align: center;
        transform: translateX(-50%);
        border-radius: 9px;
        border-top: 0px solid;
        border-bottom: 0px solid;
        width: 30%;
        height: 70%;
        box-shadow: 1px 1px 108.8px 19.2px rgb(192, 212, 210);
        background-image: linear-gradient(-225deg, #e3fdf5 50%, #ffe6fa 50%);
    }
    .container2 {
        display: none;
        left: 70%;
        background-image: linear-gradient(-225deg, #ffe6fa 50%, #e3fdf5 50%);
    }

    .box h4 {
        font-family: 'Source Sans Pro', sans-serif;
        color: #5c6bc0;
        font-size: 18px;
        margin-top: 94px;
    }

    .box h4 span {
        color: #dfdeee;
        font-weight: lighter;
    }

    .box h5 {
        font-family: 'Source Sans Pro', sans-serif;
        font-size: 13px;
        color: #a1a4ad;
        letter-spacing: 1.5px;
        margin-top: -15px;
        margin-bottom: 70px;
    }

    .box input[type='text'],
    .box input[type='password'] {
        display: block;
        margin: 20px auto;
        background: #262e49;

        border: 0;
        border-radius: 5px;
        padding: 14px 10px;
        width: 320px;
        outline: none;
        color: #d6d6d6;
        -webkit-transition: all 0.2s ease-out;
        -moz-transition: all 0.2s ease-out;
        -ms-transition: all 0.2s ease-out;
        -o-transition: all 0.2s ease-out;
        transition: all 0.2s ease-out;
    }
    ::-webkit-input-placeholder {
        color: #565f79;
    }

    .box input[type='text']:focus,
    .box input[type='password']:focus {
        border: 1px solid #79a6fe;
    }

    a {
        color: #5c7fda;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    label input[type='checkbox'] {
        display: none; /* hide the default checkbox */
    }

    /* style the artificial checkbox */
    label span {
        height: 13px;
        width: 13px;
        border: 2px solid #464d64;
        border-radius: 2px;
        display: inline-block;
        position: relative;
        cursor: pointer;

        left: 7.5%;
    }

    .btn1 {
        border: 0;
        background: #7f5feb;
        color: #dfdeee;
        border-radius: 100px;
        width: 340px;
        height: 49px;
        font-size: 16px;
        position: absolute;
        top: 79%;
        left: 8%;
        transition: 0.3s;
        cursor: pointer;
    }

    .btn1:hover {
        background: #5d33e6;
    }

    .rmb {
        position: absolute;
        margin-left: -24%;
        margin-top: 0px;
        color: #dfdeee;
        font-size: 13px;
    }

    .forgetpass {
        position: relative;
        float: right;
        right: 28px;
    }
    #changeRole {
        position: relative;
    }

    .dnthave {
        position: relative;
        top: 92%;
        left: 38%;
    }

    [type='checkbox']:checked + span:before {
        /* <-- style its checked state */
        font-family: FontAwesome;
        font-size: 16px;
        content: '\f00c';
        position: absolute;
        top: -4px;
        color: #896cec;
        left: -1px;
        width: 13px;
    }

    .typcn {
        position: absolute;
        left: 339px;
        top: 282px;
        color: #3b476b;
        font-size: 22px;
        cursor: pointer;
    }

    .typcn.active {
        color: #7f60eb;
    }

    .error {
        background: #ff3333;
        text-align: center;
        width: 337px;
        height: 20px;
        padding: 2px;
        border: 0;
        border-radius: 5px;
        margin: 10px auto 10px;
        position: absolute;
        top: 31%;
        left: 7.2%;
        color: white;
        display: none;
    }

    .footer {
        position: relative;
        left: 0;
        bottom: 0;
        top: 605px;
        width: 100%;
        color: #78797d;
        font-size: 14px;
        text-align: center;
    }

    .footer .fa {
        color: #7f5feb;
    }
</style>
