<template>
    <div>
        <!--表头-->
        <div class="title" style="width: 80%;margin-left: 10%;">
            <h3>确认订单</h3>
            <el-table :data="orderInfo" style="width: 100%">
                <!--        商品图片-->
                <el-table-column label="商品" prop="img" width="110px" align="center">
                    <template slot-scope="scope">
                        <el-image style="width: 100px; height: 100px" :src="scope.row.img" />
                    </template>
                </el-table-column>
                <!--        商品名字-->
                <el-table-column label="商品名" prop="fname" align="center"></el-table-column>
                <!--        商品单价-->
                <el-table-column label="单价" prop="price" width="110px" align="center">
                    <template slot-scope="scope"> <span>&yen;</span>{{ scope.row.price }} </template>
                </el-table-column>

                <!--        商品小计-->
                <el-table-column label="小计" prop="allPrize" width="110px" align="center">
                    <template slot-scope="scope"> <span>&yen;</span>{{ parseFloat(scope.row.price).toFixed(2) }} </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="width: 80%;margin-left: 10%;">
            <!--描述：商品结算开始-->
            <div class="balance">
                <router-link to="/submitOrder">
                    <el-button @click="submitOrder">提交订单</el-button>
                </router-link>
            </div>
            <!--描述：商品结算结束-->
        </div>
    </div>
</template>

<script>
    export default {
        name: 'makeSureOrder',
        data() {
            return {
                orderInfo: [],
                address: '12341212',
            }
        },
        mounted() {
            console.log(this.$store.state.goodsOrder)
            this.orderInfo = this.$store.state.goodsOrder
        },
        methods: {
            submitOrder() {
                let userInfo = JSON.parse(localStorage.getItem('userInfo'))
                let { name, id } = userInfo
                for (const item of this.orderInfo) {
                    this.axios
                        .post(
                            '/api/beloving/insertOrder?user=' +
                                id +
                                '&goods=' +
                                item.id +
                                '&money=' +
                                item.price * item.selling_num +
                                '&oaddress=' +
                                this.address +
                                '&pay=' +
                                1
                        )
                        .then(response => {
                            console.log(response)
                        })
                }
            },
        },
    }
</script>

<style scoped>
    .title h3 {
        font-size: 23px;
        color: #c91623;
    }

    /*商品结算*/
    .balance {
        height: 50px;
        margin-top: 40px;
    }
    .balance button {
        width: 100px;
        height: 50px;
        background-color: brown;
        font-weight: bold;
        margin-left: 80%;
        font-size: 20px;
        color: white;
    }
</style>
