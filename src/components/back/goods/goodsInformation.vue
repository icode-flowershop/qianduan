<template>
  <div class="all">
    <div class="left">
      <img :src=information.img :alt="information.fname">
    </div>
    <div class="right">
      <table>
        <tbody>
        <h2>{{ information.fname }}</h2>
        <tr>
          <td>价格</td>
          <td>
            {{ information.price }}
          </td>
        </tr>
        <tr>
          <td>已售出</td>
          <td>
            {{ information.sold }}
          </td>
        </tr>
        <tr>
          <td>花语</td>
          <td>
            <div contenteditable="true" v-html="information.says"
                 @input="information.says=$event.target.innerHTML"></div>
          </td>
        </tr>
        <tr>
          <td>材料</td>
          <td>
            {{ information.material }}
          </td>
        </tr>
        <tr>
          <td>包装</td>
          <td>
            {{ information.material }}
          </td>
        </tr>
        <tr>
          <td>库存</td>
          <td>
            {{ information.packaging }}
          </td>
        </tr>
        </tbody>
      </table>
      <button @click="printInformation()">lalla</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "goodsInformation",
  data() {
    return {
      id: this.$route.query.id,
      information: {}
    }
  },
  mounted() {
    this.getInformation()
  },
  watch: {
    "information": {
      handler: function () {
        console.log(this.information.says)
      },
      deep: true,
    }
  },
  methods: {
    printInformation() {
      console.log(says)
    },
    getInformation() {
      // this.axios.get("/api/beloving/flowerDetail?id=" + this.id)
      //   .then((resp) => {
      //     this.information =  resp.data;
      //     console.log(resp)
      //   })
      this.information =
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
        }
    },
    // inputDiv(e) {
    //   this.information.says = e.target.innerHTML
    // }
    changeText() {
      setTimeout(() => {
        this.$emit('input',this.$el.innerHTML.trim())
      },5)
    }
  }
}

</script>

<style scoped>
.all {
  display: flex;
  /*background-color: #fcf16e;*/
  height: 100%;
  justify-content: space-around;
}

img {
  width: 400px;
}

.right {
  text-align: center;
  font-family: 华文仿宋;
  font-size: 20px;
}

tr {
  margin: 10px 0;
}

td {
  width: 50%;
  height: 50px;
}

</style>
