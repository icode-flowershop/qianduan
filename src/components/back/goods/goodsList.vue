<template>
  <div class="all">
    <div v-for="item in goodsList" :key="item.id">
      <div class="good" @click="information(item.id)">
        <img :src = item.img  alt=""/>
        <span>{{ item.fname }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "goodsList",
  data() {
    return {
      message: '',
      goodsList: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      // this.axios.get("/api/beloving/home?message=" + this.message)
      //   .then((resp) => {
      //     this.goodsList = resp.data;
      //     console.log(this.goodsList)
      //   });
      this.goodsList = [
        {
          "id": 1,
          "img": "https://img01.hua.com/uploadpic/newpic/9012177.jpg",
          "fname": "不变的承诺222",
          "price": 499,
          "sold": 78,
          "says": "下雨的时候，给她撑一把雨伞；寒冷的时候，给她一个温暖的臂弯；天黑了，永远有一盏灯为她点亮；晨起时，给她一缕温暖的阳光。爱她，就送她一束99枝的玫瑰花！",
          "material": "99枝卡罗拉红玫瑰",
          "packaging": " 黑色雪梨纸，黑色条纹纸，玻璃纸卷，酒红色缎带花结",
          "inventory": 595,
          "deleted": 0
        },
        {
          "id": 2,
          "img": "https://img01.hua.com/uploadpic/newpic/9012243.jpg",
          "fname": "恋恋情深",
          "price": 198,
          "sold": 45,
          "says": "喜欢像是一阵风，而爱你是细水长流",
          "material": "11枝香槟玫瑰，多头白百合2枝，栀子叶8枝",
          "packaging": "深浅绿双面人造纸2张，米白色缎带1.5米",
          "inventory": 67,
          "deleted": 0
        },
        {
          "id": 3,
          "img": "https://img01.hua.com/uploadpic/newpic/9012452.jpg",
          "fname": "韩式系列/一路向阳",
          "price": 296,
          "sold": 78,
          "says": "以秋色和暖阳为设计主题，打造全新韩式系列，在凛冽冬日，你的爱就像一束阳光，照进了我的心中！",
          "material": "韩式花束系列：向日葵3枝、香槟玫瑰9枝、橙色多头玫5枝、黄色（或橙色）腊梅5枝、大叶尤加利5枝（腊梅花期为11-4月初，其他季节用跳舞兰或其他黄色线状花材代替",
          "packaging": "姜黄色双面牛皮纸8张、白色雪梨纸1大张、浅粉色罗纹玫瑰金丝带2米",
          "inventory": 888,
          "deleted": 0
        },
        {
          "id": 5,
          "img": "https://img01.hua.com/uploadpic/newpic/202109161723490947.jpg",
          "fname": "心中洛神",
          "price": 389,
          "sold": 99,
          "says": "一眼足以定终身，我心佳人比洛神",
          "material": "洛神玫瑰33枝",
          "packaging": " 白色小号英文插画纸6张、白色雪梨纸2张、粉色罗纹烫金丝带2米",
          "inventory": 234,
          "deleted": 0
        }
      ]
    },
    information(e) {
      this.$router.push({path:  '/backInformation', query: {id: e}})
    }
  }
}
</script>

<style scoped>
* {
  text-align: center;
}
.all {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-around;
}
.good {
  width: 200px;
  border:1px solid #ffcc00;
  background:#fffff7
}
.good img {
  width: 200px;
}
</style>
