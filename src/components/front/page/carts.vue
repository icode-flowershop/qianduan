<template>
    <div>
        <!--头部-->
        <div style="width: 80%; margin-left: 20%"></div>
        <!--表头-->
        <div class="title" style="width: 100%;">
            <el-table :data="goodsInfos" @selection-change="handleSelectionChange" style="width: 80%;margin-left:10%">
                <!--        多选框-->
                <el-table-column align="center" type="selection" width="100%"></el-table-column>
                <!--        商品图片-->
                <el-table-column label="商品" prop="img" width="110px" align="center">
                    <template slot-scope="scope">
                        <el-image style="width: 100px; height: 100px" :src="scope.row.img" />
                    </template>
                </el-table-column>
                <!--        商品名字-->
                <el-table-column label="商品名" prop="fname" align="center" width="210px"></el-table-column>

                <!--        商品单价-->
                <el-table-column label="单价" prop="price" width="70px" align="center">
                    <template slot-scope="scope"> <span>&yen;</span>{{ scope.row.price }} </template>
                </el-table-column>

                <!--        商品小计-->
                <el-table-column label="小计" prop="allPrize" width="110px" align="center">
                    <template slot-scope="scope"> <span>&yen;</span>{{ parseFloat(scope.row.price ).toFixed(2) }} </template>
                </el-table-column>
                <!--        操作-->
                <el-table-column align="right">
                    <template slot-scope="scope">
                        <el-button size="mini" type="success">结算</el-button>
                        <el-button size="mini" type="danger" @click="removeCart(scope.row)">移出购物车</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="width: 80%; margin-left: 10%">

  <div class="balance">
                <router-link to="/makeSureOrder">
                    <el-button @click="Settlement">购买商品</el-button>
                </router-link>
            </div>


        </div>
    </div>
</template>

<script>
    export default {
        name: 'carts',
        data() {
            return {
                data: [],
                goodsInfos: [],
                //选中列表
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
            //获取用户购物车信息
            getData() {
                let userInfo = JSON.parse(localStorage.getItem('userInfo'))
                let { name, id } = userInfo;

                this.axios.get('/api/beloving/queryCart?userId=' + id).then(response => {
                    if (response) {
                        //返回1或0
                        this.data = []
                        this.goodsInfos = []
                        this.data = response.data //返回的是一个数组对象 每一个对象里有一个商品对象flower 和 一个购物车Id

                        for (const item of this.data) {
                            item.flower.cartId = item.id
                            this.goodsInfos.push(item.flower)
                        }
                    } else {
                        this.$message.warning('您的购物车为空 快去选购吧！')
                    }
                })
            },
            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            Settlement() {

                this.$store.state.goodsOrder =[];
                for (const item of this.goodsInfos) {
                    this.$store.state.goodsOrder.push(item);

                }

            },
            submitAllOrder() {
                let obj = [...this.multipleSelection];
                for (const item of obj) {
                    this.$store.state.goodsOrder.push(item)
                }
            },
            //将商品移出
            removeCart(item) {
                this.axios.get('/api/beloving/cartDelete?id=' + item.cartId).then(response => {
                    this.goodsInfos = []
                    this.getData()
                })
            },
            //删除所有选中的商品
          /*   removeCheckedCart() {
                for (const item of this.multipleSelection) {
                    this.removeCart(item)
                }
            }, */
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
