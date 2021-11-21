<template>
    <div>
        <!--头部-->
        <div style="width: 80%; margin-left: 20%"></div>
        <!--表头-->
        <div class="title" style="width: 80%; margin-left: 10%">
            <h3>购物车</h3>
            <br />
            <el-table
                :data="goodsInfos.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                @selection-change="handleSelectionChange"
                style="width: 100%"
            >
                <!--        多选框-->
                <el-table-column align="center" type="selection" width="55"></el-table-column>
                <!--        商品图片-->
                <el-table-column label="商品" prop="img" width="110px" align="center">
                    <template slot-scope="scope">
                        <el-image style="width: 100px; height: 100px" :src="scope.row.img" />
                    </template>
                </el-table-column>
                <!--        商品名字-->
                <el-table-column label="商品名" prop="fname" align="center" width="210px"></el-table-column>
                <!--        花语-->
                <el-table-column label="花语" prop="says" width="310px" align="center"> </el-table-column>
                <!--        商品单价-->
                <el-table-column label="单价" prop="price" width="70px" align="center">
                    <template slot-scope="scope"> <span>&yen;</span>{{ scope.row.price }} </template>
                </el-table-column>
                <!--        商品数量-->
                <el-table-column label="数量" prop="inventory" width="70px" align="center">
                    <template slot-scope="scope">
                        <!-- <el-input-number :min="1" :max="scope.row.inventory" v-model="scope.row.selling_num"></el-input-number> -->
                        {{ scope.row.selling_num }}
                    </template>
                </el-table-column>
                <!--        商品小计-->
                <el-table-column label="小计" prop="allPrize" width="110px" align="center">
                    <template slot-scope="scope"> <span>&yen;</span>{{ parseFloat(scope.row.price * scope.row.selling_num).toFixed(2) }} </template>
                </el-table-column>
                <!--        操作-->
                <el-table-column align="right">
                    <template slot="header">
                        <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
                    </template>
                    <template slot-scope="scope">
                        <el-button size="mini" type="success">结算</el-button>
                        <el-button size="mini" type="danger" @click="removeCart(scope.row)">移出购物车</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="width: 80%; margin-left: 10%">
            <!--描述：商品结算开始-->
            <div class="balance">
                <ul class="balance_ul1">
                    <el-button type="danger" size="medium" class="button1" plain @click="removeCheckedCart">删除选中商品</el-button>
                    <router-link to="/makeSureOrder">
                        <el-button type="success" size="medium" class="button1" @click="Settlement" plain>结算选中商品</el-button>
                    </router-link>

                    <span class="balance_ul2">
                        <span>共<span class="spanText"></span>件商品</span>
                        <span>总价<span class="spanText">&yen;</span></span>
                        <span>
                            <router-link to="/makeSureOrder">
                                <el-button @click="submitAllOrder">全部结算</el-button>
                            </router-link>
                        </span>
                    </span>
                </ul>
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
                search: '',
                //选中列表
                multipleSelection: [],
                chooseList: [],
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
                let { name, id } = userInfo

                this.axios.get('/api/beloving/queryCart?userId=' + id).then(response => {
                    if (response) {
                        //返回1或0
                        this.data = []
                        this.goodsInfos = []
                        this.data = response.data //返回的是一个数组对象 每一个对象里有一个商品对象flower 和 一个购物车Id

                        for (const item of this.data) {
                            item.flower.cartId = item.id
                            item.flower.selling_num = 1
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
            //结算所有商品
            submitAllOrder() {
                let obj = this.goodsInfos
                for (const item of obj) {
                    this.$store.state.goodsOrder.push(item)
                }
            },
            Settlement() {
                let obj = [...this.multipleSelection]
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
            removeCheckedCart() {
                for (const item of this.multipleSelection) {
                    this.removeCart(item)
                }
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

    /*商品结算*/
    .balance {
        height: 50px;
        border: 1px solid gray;
        margin-top: 40px;
    }
    .balance li {
        float: left;
        line-height: 5px;
        margin-left: 22px;
    }
    .balance_ul2 {
        float: right;
        margin-right: 10px;
    }
    .balance_ul1 .button1 {
        margin-top: 5px;
    }
    .balance_ul2 .spanText {
        font-size: 25px;
        color: #c91623;
        font-weight: bold;
    }
    .balance_ul2 button {
        width: 100px;
        height: 50px;
        background-color: brown;
        border: 1px solid #c91623;
        font-weight: bold;
        font-size: 20px;
        color: white;
    }
    .balance_ul2 button:hover {
        background-color: #c91623;
    }
</style>
