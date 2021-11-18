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

                <el-form-item label="收获地址">
                    <el-input v-model="defalutAddress.address" size="medium" :disabled="editable"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit" v-show="!editable">提交修改</el-button>
                    <el-button type="primary" @click="editabled" v-show="editable">修改用户信息</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div id="addressInfo">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>地址管理</span>
                    <el-button style="float: right; padding: 3px 0" type="text">设置为默认地址</el-button>
                </div>
                <div v-for="(item, index) of addresses" :key="index" class="text item">
                    <el-checkbox v-model="item.isDefault" :checked="item.isDefault" @change="changeDefaultAddress(item)"></el-checkbox>
                    <span v-show="item.isDefault">(默认)</span>
                    地址{{ index + 1 + ':' + item.name + '   ' + item.phone + '   ' + item.address }}
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'userInfo',
        data() {
            return {
                addressInfo: {
                    name: '',
                    phone: '',
                    address: '',
                    isDefault: false,
                },
                defalutAddress: {},
                addresses: [],
                editable: true,
                userInfo: {
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
            this.getData()
        },
        methods: {
            getData() {
                this.axios.get('/api/beloving/userDetail?username=' + this.user.username).then(response => {
                    //接收传来的用户信息
                    this.userInfo = response.data
                    //将地址信息转换
                    this.addressTransform(this.userInfo.faddress)
                    this.addressTransform(this.userInfo.saddress)
                    this.addressTransform(this.userInfo.taddress)
                    for (const item of this.addresses) {
                        if (item.isDefault) this.defalutAddress = item
                    }
                })
            },
            //将地址转换为对象数组
            addressTransform(address) {
                if (address == null) return
                let arr = address.split(',')
                const names = Object.getOwnPropertyNames(this.addressInfo)
                for (let i = 0; i < arr.length; i++) {
                    this.addressInfo[names[i]] = arr[i]
                }
                if (this.addresses.length == 0) {
                    this.addressInfo.isDefault = true
                }
                //将地址信息push到addresses数组里面
                this.addresses.push(this.addressInfo)
                this.addressInfo = {
                    name: '',
                    phone: '',
                    address: '',
                    isDefault: false,
                }
            },
            //改变默认地址
            changeDefaultAddress(address) {
                for (const item of this.addresses) {
                    item.isDefault = item == address ? true : false
                }
                this.defalutAddress = address
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
                this.sendUpdateRequest()
            },
            sendUpdateRequest() {
                this.axios.get(`/api/beloving/updateUsername?id=${this.userInfo.id}&username=${this.userInfo.username}`).then(response => {
                    response && console.log('修改用户名成功')
                })
                this.axios
                    .get('/api/beloving/updatePassword?id=' + this.userInfo.id + '&password=' + this.userInfo.password + '&valid=' + this.userInfo.password)
                    .then(response => {
                        response && console.log('修改密码成功')
                    })
                let constant = 0
                for (const [index, item] of this.addresses.entries()) {
                    if (item == this.defalutAddress)
                    constant = index+1;
                }
                let { name, phone, _address,isDefault} = this.defalutAddress;
                console.log(_address)
                let info = '';
                info =( (info.concat(name)+',').concat(phone)+',').concat('123');
                console.log(info)
                this.axios.get(`/api/beloving/updateAddress?constant=${constant}&id=${this.userInfo.id}&address=${info}`).then(response => {
                    response && console.log('修改地址成功！')
                })
            },
            editPwd() {},
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
