<template>
    <div>
        <!--头部-->
        <div style="width: 80%; margin-left: 20%"></div>
        <!--表头-->
        <div class="title" style="width: 80%; margin-left: 10%">
            <h3>购物车</h3>
            <el-table
                :data="
                    goodsInfos.filter(
                        (data) =>
                            !search ||
                            data.name
                                .toLowerCase()
                                .includes(search.toLowerCase())
                    )
               " @selection-change="handleSelectionChange"
                style="width: 100%"
            >
                <!--        多选框-->
                <el-table-column
                    align="center"
                    type="selection"
                    width="55"
                ></el-table-column>
                <!--        商品图片-->
                <el-table-column
                    label="商品"
                    prop="img"
                    width="110px"
                    align="center"
                >
                    <template slot-scope="scope">
                        <el-image
                            style="width: 100px; height: 100px"
                            :src="scope.row.img"
                        />
                    </template>
                </el-table-column>
                <!--        商品名字-->
                <el-table-column
                    label="商品名"
                    prop="fname"
                    align="center"
                ></el-table-column>
                <!--        花语-->
                <el-table-column
                    label="花语"
                    prop="says"
                    width="110px"
                    align="center"
                >
                </el-table-column>
                <!--        商品单价-->
                <el-table-column
                    label="单价"
                    prop="price"
                    width="110px"
                    align="center"
                >
                    <template slot-scope="scope">
                        <span>&yen;</span>{{ scope.row.price }}
                    </template>
                </el-table-column>
                <!--        商品数量-->
                <el-table-column
                    label="数量"
                    prop="inventory"
                    width="140px"
                    align="center"
                >
                    <template slot-scope="scope">
                        <el-input-number
                            :min="1"
                            :max='scope.row.inventory'
                            v-model="scope.row.selling_num"
                        ></el-input-number>
                    </template>
                </el-table-column>
                <!--        商品小计-->
                <el-table-column
                    label="小计"
                    prop="allPrize"
                    width="110px"
                    align="center"
                >
                    <template slot-scope="scope">
                        <span>&yen;</span
                        >{{
                            parseFloat(
                                scope.row.price * scope.row.selling_num
                            ).toFixed(2)
                        }}
                    </template>
                </el-table-column>
                <!--        操作-->
                <el-table-column align="right">
                    <template slot="header" >
                        <el-input
                            v-model="search"
                            size="mini"
                            placeholder="输入关键字搜索"
                        />
                    </template>
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="removeCart(scope.$index)"
                            >移出购物车</el-button
                        >
                        <el-button size="mini" type="success">结算</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="width: 80%; margin-left: 10%">
            <!--描述：商品结算开始-->
            <div class="balance">
                <ul class="balance_ul1">
                    <el-button type="danger" size="medium" class="button1" plain  @click="removeCheckedCart"
                        >删除选中商品</el-button
                    >

                    <el-button
                        type="success"
                        size="medium"
                        class="button1"
                        plain

                        >结算选中商品</el-button
                    >
                    <span class="balance_ul2">
                        <span>共<span class="spanText" ></span>件商品</span>
                        <span>总价<span class="spanText">&yen;</span></span>
                        <span>
                            <router-link to="/makeSureOrder">
                                <el-button @click="submitOrder">全部结算</el-button>
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
    name: "carts",
    data() {
        return {
            goodsInfos: [],
            search: "",
            //选中列表
            multipleSelection: [],
            chooseList: [],
        };
    },
    mounted(){

      this.goodsInfos= this.$store.state.goodsCart;
   console.log(this.$store.state.goodsCart)
    },

    methods: {
        // 多选操作
        handleSelectionChange(val) {
          console.log(val)

            this.multipleSelection = val;

        },
        submitOrder(){
          let obj = [...this.multipleSelection]
          for (const item of obj) {
             this.$store.state.goodsOrder.push(item)
          }

        },
        removeCart(index){
          console.log(index)
          this.$store.state.goodsCart.splice(index,1)
        },
        removeCheckedCart(){
          let map = new Map(this.$store.state.goodsCart,this.multipleSelection);

console.log(Array.from([...map]))
          return Array.from([...map]);


        }

    },
};
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
