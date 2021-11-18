<template>
  <div>


    <el-carousel :interval="4000" type="card" height="200px" style="background: #F2F8FE">
      <el-carousel-item v-for="item in imageList" :key="item.id">
        <img src="../../../assets/img/001.jpeg">
      </el-carousel-item>
    </el-carousel>
    <br>
    <el-container>
      <div style="float: left;width: 25%;">
        <!--左边栏空白占位  -->
      </div>
      <div style="float: left;width: 50%;">
        <el-input placeholder="查询商品" v-model="selectd" class="input-with-select" size="1000px">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <p style="color: #BFBFBF;">
          <span>热门搜索：</span>
        </p>
      </div>
    </el-container>

    <br>
    <div>
      <el-container >
        <div style="float: left;width: 10%;background-color: #DCDFE6;">
          <!--左边栏空白占位  -->
        </div>
        <div style="float: left;width: 80%;">
              <div class="card"  v-for="(item, index) in goodsList" :key="item.id" v-on:mouseenter="showDialog(index)" v-on:mouseleave="hideDialog(index)">
                  <div class="ribbon" @click="goGoodsDesc(item.id)">
                    <!--鼠标移入移出事件-->
                    <div class="handleDialog" v-if="ishow && index==current">
                    </div>
                    <img :src="item.img" style="height: 100%;width: 100%">

                </div>
                <div style="text-align:center">
                  <span>{{item.fname}}</span>
                  <span>&yen;{{item.price}}</span>
                  <span style="overflow:hidden">{{item.says}}</span>
                </div>
              </div>
        </div>
        <div style="float: left;width: 10%;background-color: #DCDFE6;">
          <!--右边栏空白占位  -->
        </div>

      </el-container>
      <br>
      <center>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </center>
    </div>
  </div>
</template>

<script>
  export default {
      name: "index",
      data() {
        return {
          ishow: false,
          current: 0,
          selectd: '',
          currentDate: new Date(),
          imageList:[
            {id:1,title:"test1", address:""},
            {id:2,title:"test1", address:""},
            {id:3,title:"test1", address:""},
            {id:4,title:"test1", address:""},
          ],
          goodsList:[

          ]
        };
      },
      mounted(){
        this.getAllGoods();


      },
      methods:{
         showShufflingFigure(){
          this.axios.post('/api/beloving/shuffling').then((resp) => {
            this.imagelist =resp.data;
            console.log(resp);
          })

        },

        getAllGoods(){
          this.axios.get('/api/beloving/showFlower')
          .then((resp)=>{
            console.log(resp)
            this.goodsList = resp.data;

          })
        },
        //前往商品详情页
        goGoodsDesc(goodId) {
          this.$router.push({
            path:'/goodsDesc',
            query:{
              goodId:goodId
            }
          });
        },
        //显示操作项
        showDialog(index, item) {
          this.ishow = true;
          this.current = index;
        },
        //隐藏蒙层
        hideDialog(index, item) {
          this.ishow = false;
          this.current = null;
        }
      }
    }
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .el-carousel__item img {
    width: 100%;
  }
  /**
  隐藏页
  */
  .handleDialog {
    position: absolute;
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
  }


  /**
  卡片
   */

  .card{
    height: 350px;
    width: 266px;
    margin-left: 30px;
    margin-top: 30px;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 4px;
    float: left;
    overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .card img {
    width: 100%;
    height: 70%;
  }
  .card span {
    font-size: 15px;
    color: #BFBFBF;
    display: block;
    letter-spacing: 2px;
  }
/**
丝带
 */

  .ribbon {
    display: inline-block;
    width: 100%;
    height: 70%;
    position: relative;
    margin-bottom: 30px;
    background-size: cover;
    text-transform: uppercase;
    color: white;
  }




</style>
