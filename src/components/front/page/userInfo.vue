<template>
    <div>
        <div id="userInfo">
            <div>
                <img src="../../../assets/img/userIMG.png" alt="" />
            </div>
            <br />

            <el-form :model="userInfo" label-width="80px">
                <el-form-item label="用户名">
                    <el-input
                        v-model="userInfo.username"
                        size="medium"
                        :disabled="editable"
                    ></el-input>
                </el-form-item>

                <el-form-item label="用户id">
                    <el-input
                        v-model="userInfo.id"
                        size="medium"
                        :disabled="editable"
                    ></el-input>
                </el-form-item>

                <el-form-item label="收获地址">
                    <el-input
                        v-model="addressInfo.address"
                        size="medium"
                        :disabled="editable"
                    ></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button
                        type="primary"
                        @click="onSubmit"
                        v-show="!editable"
                        >提交修改</el-button
                    >
                    <el-button
                        type="primary"
                        @click="editabled"
                        v-show="editable"
                        >修改收货地址</el-button
                    >
                </el-form-item>
            </el-form>
        </div>
        <div id="addressInfo">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>地址管理</span>
                    <el-button style="float: right; padding: 3px 0" type="text"
                        >设置为默认地址</el-button
                    >
                </div>
                <div
                    v-for="(item, index) of addresses"
                    :key="index"
                    class="text item"
                >
                    地址{{
                        index +
                        1 +
                        ":" +
                        item.name +
                        "   " +
                        item.phone +
                        "   " +
                        item.address
                    }}
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    name: "userInfo",
    data() {
        return {
            addressInfo: {
                name: "",
                phone: "",
                address: "",
            },
            addresses: [],

            editable: true,
            userInfo: {
                username: "",
                password: "",
                phone: "",
                address: "",
                id: "",
            },
        };
    },
    mounted() {
        this.userInfo = this.$store.userInfo;
        this.getData();
    },
    methods: {
        getData() {
            this.axios
                .get(
                    "/api/beloving/userDetail?username=" +
                        this.userInfo.username
                )
                .then((response) => {
                    //接收传来的用户信息
                    this.userInfo = response.data;
                    //将地址信息转换
                    this.addressTransform();
                });
        },
        modify() {},
        //将地址转换为对象数组
        addressTransform() {
            //将地址信息转换为数组
            let arr = this.userInfo.address.split(",");
            const names = Object.getOwnPropertyNames(this.addressInfo);

            for (let i = 0; i < arr.length; i++) {
                this.addressInfo[names[i]] = arr[i];
            }

            //将地址信息push到addresses数组里面
            this.addresses.push(this.addressInfo);
            console.log(this.addresses);
        },

        editabled() {
            this.editable = !this.editable;
            let userInfo = document.querySelector("#userInfo");
            let addressInfo = document.querySelector("#addressInfo");
            userInfo.style.marginLeft = "20%";
            addressInfo.style.display = "block";
        },
        onSubmit() {
            this.editable = !this.editable;
            let userInfo = document.querySelector("#userInfo");
            let addressInfo = document.querySelector("#addressInfo");
            userInfo.style.marginLeft = "40%";
            addressInfo.style.display = "none";
        },
        editPwd() {},
    },
};
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
    content: "";
}
.clearfix:after {
    clear: both;
}

.box-card {
    width: 480px;
}
</style>
