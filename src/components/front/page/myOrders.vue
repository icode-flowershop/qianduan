import axios from 'axios';
<template>
  <div>
    <!--表头-->
    <div class="title" style="width: 80%;margin-left: 10%;">
      <h3>我的订单</h3>
      <el-table
        ref="multipleTable"
        :data="orderList"
        style="width: 100%;">
        <el-table-column align="center" type="selection" width="100%"></el-table-column>
        <el-table-column label="订单号" prop="id" align="center"></el-table-column>
        <!--        商品图片-->
        <el-table-column label="商品"  width="110px" align="center">
          <template slot-scope="scope">
            <el-image style="width: 100px; height: 100px;" :src="scope.row.img"/>
          </template>
        </el-table-column>
        <!--        商品名字-->
        <el-table-column label="商品名" prop="flower.fname" align="center"></el-table-column>
        <!--        商品单价-->
        <el-table-column label="单价"  prop="flower.price" width="110px" align="center">
        </el-table-column>
          <!--        上下架状态-->
        <el-table-column label="订单状态"  prop="pay" width="110px" align="center">
          <template slot-scope="scope" class="payStatus">
            {{(!scope.row.pay)?'未支付':'已支付'}}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="width: 80%;margin-left: 10%;">

    </div>
  </div>
</template>

<script>
  export default {
    name: "myOrders",
    data()
    {
      return{
        orderList: [],
        search : '',
      }
    },
    mounted(){
       if(!JSON.parse(localStorage.getItem('userInfo'))){
              this.$message.warning("用户未登录，请登录");
              this.$router.push('/');
            }else{
              this.getData();

            }


    },
    methods:{
      getData(){
        let { name,id} = JSON.parse(localStorage.getItem('userInfo'));
        console.log(id);
        this.axios.get('/api/beloving/queryOrder?userId='+id).then((response) =>{

          for (const item of response.data) {
            let {id,pay,img,fname,price} = {
            }

          }


          this.orderList = response.data;
          console.log(this.orderList)
        })
      },


    }
  }
</script>

<style scoped>
  .title{
    margin-top: 50px;
  }
  .title h3{
    /*float: left;*/
    font-size: 23px;
    color: #c91623;
  }
  .payStatus{
    border: 1px solid #000;

  }
</style>
