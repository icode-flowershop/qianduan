<template>
    <div style="margin-left:15%">

        <!--表头-->
        <div class="title" style="width: 83%;">
            <h3>填写订单</h3>
             <div>
            <div class="box-Info">
                <span>收货人:</span>
                <div class="input">
                    <span v-html="defaultAddress.name"></span>
                </div>
                <span>联系电话:</span>
                <div class="input">
                    <span v-html="defaultAddress.phone"></span>
                </div>
                <span>收获地址:</span>
                <div class="input">
                    <span v-html="defaultAddress.address"></span>
                </div>
                <router-link to="/addressInfo">修改</router-link>
            </div>
        </div>
        <br><br>


        <div>
          <el-radio-group v-model="payWay">
  <el-radio label="zfb">支付宝支付</el-radio>
  <el-radio label="wx">微信支付</el-radio>
  <el-radio label="yhk">银行卡支付</el-radio>
</el-radio-group>
        </div>
         <br>

            <el-table :data="orderInfo" style="width: 100%" class="el-table">
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
                    <el-button @click="payOrder">提交订单</el-button>
            </div>
            <div class="backCart">
                <router-link to="/carts">
                    <el-button>返回购物车</el-button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'makeSureOrder',
        data() {
            return {
                orderInfo: [],
                defaultAddress: {},
                payWay:''
            }
            },
        mounted() {
            console.log(this.$store.state.goodsOrder)
            this.orderInfo = this.$store.state.goodsOrder
            this.defaultAddress = JSON.parse(localStorage.getItem('defaultAddress'))
        },
        methods: {
            payOrder() {
                let userInfo = JSON.parse(localStorage.getItem('userInfo'))
                let { username, id } = userInfo
                let { address, isDefault, name, phone } = this.defaultAddress
                let info = ''
                let num = 0
                info = ((info.concat(name) + ',').concat(phone) + ',').concat(address)
                for (const item of this.orderInfo) {
                  if(this.payWay){
                    this.axios.get('/api/beloving/insertOrder?userId=' + id + '&flowerId=' + item.id + '&money=' + item.price + '&oaddress=' + info + '&pay=' + num)
                        .then(response => {
                            if (response) {
                              console.log(response)
                            }
                        })
                  }else{
                    this.$message.warning('请选择支付方式');
                  }

                }
                this.$router.push('/myOrders');
            },
        },
    }
</script>

<style scoped>
    .title h3 {
        font-size: 23px;
        color: #c91623;
    }

    .box-Info {
        width: 100%;
        float: right;
        height: 100%;
        margin-left: 10%;
        margin-top: 0%;
        background-color: rgb(240, 224, 217);
    }
    .box-Info span {
        display: inline-block;
        float: left;
    }
    .input {
        float: left;
        margin-right: 3%;
        margin-left: 1%;
        margin-top: 0%;
    }
    /*商品结算*/
    .balance {
        height: 50px;
        margin-top: 40px;
    }
    .balance button,
    .backCart button {
        width: 100px;
        height: 50px;
        background-color: brown;
        font-weight: bold;
        float: left;
        margin-left: 80%;
        font-size: 20px;
        color: white;
    }
    .backCart button {
        width: 130px;
        margin-left: 60%;
        margin-top: -6.3%;
    }
</style>
