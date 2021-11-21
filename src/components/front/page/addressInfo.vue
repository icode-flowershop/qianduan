<template>
    <div>
        <div id="addressInfo">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>地址管理</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="changeAddress">修改地址</el-button>
                </div>
                <div v-for="(item, index) of addresses" :key="index" class="text item">
                    <el-checkbox v-model="item.isDefault" :checked="item.isDefault" @change="changeDefaultAddress(item)"></el-checkbox>
                    <span v-show="item.isDefault">(默认)</span>
                    地址{{ index + 1 + ':' + item.name + '   ' + item.phone + '   ' + item.address }}
                </div>
            </el-card>
        </div>
        <div class="input">
           <el-input placeholder="请输入内容" v-model="defalutAddress.address" clearable width='fit-content'> </el-input>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'addressInfo',
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
                    //获取的所有用户信息
                    username: '',
                    password: '',
                    phone: '',
                    faddress: '',
                    saddress: '',
                    taddress: '',
                    id: '',
                },
                userInfoChanged: {
                    //获取的所有用户信息
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
                    this.userInfo = response.data
                    this.userInfoChanged = JSON.parse(JSON.stringify(this.userInfo))
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

            changeAddress() {
                //修改用户地址
                let constant = 0
                for (const [index, item] of this.addresses.entries()) {
                    if (item == this.defalutAddress) constant = index + 1
                }
                let { name, phone, _address, isDefault } = this.defalutAddress
                let info = ''
                info = ((info.concat(name) + ',').concat(phone) + ',').concat('123')
                this.axios.get(`/api/beloving/updateAddress?constant=${constant}&id=${this.userInfo.id}&address=${info}`).then(response => {
                   if(response){
                  this.$message.success("修改地址成功");
                }
                })

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

    #addressInfo,.input{
        float: right;
        margin-top: 8%;
        margin-right: 35%;
    }
    .input {
      margin-top: 1%;
      width: 480px;
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
