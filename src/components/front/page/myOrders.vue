import axios from 'axios';
<template>
    <div>
        <!--表头-->
        <div class="title" style="width: 80%;margin-left: 10%;">
            <h3>我的订单</h3>
            <el-button type="button" @click="showHistory">查看历史订单</el-button>
            <el-button type="button" @click="payAll">立即付款</el-button>
            <el-table ref="multipleTable" @selection-change="handleSelectionChange" :data="nonpayOrderList" style="width: 100%;">
                <el-table-column align="center" type="selection"></el-table-column>
                <el-table-column label="订单号" prop="id" align="center"></el-table-column>
                <el-table-column label="商品" align="center">
                    <template slot-scope="scope">
                        <router-link tag="a" :to="{ path: '/goodsDesc', query: { goodId: scope.row.flowerId } }">
                            <el-image style="width: 100px; height: 100px;" :src="scope.row.img" />
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column label="商品名" prop="fname" align="center"></el-table-column>
                <el-table-column label="单价" prop="price" align="center"> </el-table-column>
                <el-table-column label="订单状态" prop="pay" align="center">
                    <template slot-scope="scope" class="payStatus">
                        {{ scope.row.pay ? '已支付' : '未支付' }}
                    </template>
                </el-table-column>
                <el-table-column label="收货信息" prop="address" align="center" width="200px"></el-table-column>
                <el-table-column align="right" width="200px">
                    <template slot-scope="scope">
                        <el-button size="mini" type="success">立即支付</el-button>
                        <el-button size="mini" type="danger" @click="removeOrder(scope.row)">删除订单</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="width: 80%;margin-left: 10%;"></div>
    </div>
</template>

<script>
    export default {
        name: 'myOrders',
        data() {
            return {
                orderList: [],
                paidOrderList: [],
                nonpayOrderList: [],
                multipleSelection: [],
            }
        },
        mounted() {
            if (!JSON.parse(localStorage.getItem('userInfo'))) {
                this.$message.warning('用户未登录，请登录')
                this.$router.push('/')
            } else {
                this.getData()
            }
        },
        methods: {
            getData() {
                let { name, id } = JSON.parse(localStorage.getItem('userInfo'))
                this.axios.get('/api/beloving/queryOrder?userId=' + id).then(response => {
                    this.paidOrderList = response.data.filter(item => {
                        return item.pay == 1
                    })
                    this.nonpayOrderList = response.data.filter(item => {
                        return item.pay == 0
                    })
                    this.orderList = this.nonpayOrderList
                })
            },
            removeOrder(item) {
                this.axios.get('/api/beloving/deleteOrder?id=' + item.id).then(response => {
                    this.orderList = []
                    this.getData()
                })
            },
            payAll() {
                for (const item of this.orderList) {
                    this.axios.get('/api/beloving/payOrder?id=' + item.id).then(response => {})
                }
                this.$message.success('支付成功,谢谢惠顾！')
                this.$router.push('/')
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            submitAllOrder() {
                let obj = [...this.multipleSelection]
                for (const item of obj) {
                }
            },
            showHistory() {
                this.orderList = this.paidOrderList
            },
        },
    }
</script>

<style scoped>
    .title {
        margin-top: 50px;
    }
    .title h3 {
        /*float: left;*/
        font-size: 23px;
        color: #c91623;
    }
    .payStatus {
        border: 1px solid #000;
    }
</style>
