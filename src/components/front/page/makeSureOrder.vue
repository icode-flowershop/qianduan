<template>
  <div>

    <!--表头-->
    <div class="title" style="width: 80%;margin-left: 10%;">
      <h3>确认订单</h3>
      <br>
      <hr>

      <el-table
                :data='orderInfo'
                style="width: 100%"
            >

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
                        {{scope.row.selling_num}}
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


            </el-table>
    </div>
    <div style="width: 80%;margin-left: 10%;">

      <!--描述：商品结算开始-->
      <div class="balance">
        <ul class="balance_ul1">
          <span class="balance_ul2">
              <span>共<span class="spanText"></span>件商品</span>
              <span>总价<span class="spanText">&yen;</span></span>
              <span>
                 <router-link to="/submitOrder">
                    <el-button>提交订单</el-button>
                 </router-link>
              </span>
          </span>
        </ul>
      </div>
      <!--描述：商品结算结束-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "makeSureOrder",
    data()
    {
      return{
        orderInfo:[],
      }
    },
   mounted(){
     console.log(this.$store.state.goodsOrder);
      this.orderInfo=this.$store.state.goodsOrder;
      console.log(this.orderInfo);
   },
    methods:{

    }
  }
</script>

<style scoped>

  .title h3{
    font-size: 23px;
    color: #c91623;
  }

  /*商品结算*/
  .balance{
    height: 50px;
    border: 1px solid gray;
    margin-top: 40px;
  }
  .balance li{
    float: left;
    line-height: 5px;
    margin-left: 22px;
  }
  .balance_ul2{
    float: right;
    margin-right: 10px;
  }
  .balance_ul1 .button1{
    margin-top: 5px;
  }
  .balance_ul2 .spanText{
    font-size: 25px;
    color: #C91623 ;
    font-weight: bold;
  }
  .balance_ul2 button{
    width: 100px;
    height: 50px;
    background-color: brown;
    border: 1px solid #c91623;
    font-weight: bold;
    font-size: 20px;
    color: white;
  }
  .balance_ul2 button:hover{
    background-color:#C91623 ;
  }
</style>
