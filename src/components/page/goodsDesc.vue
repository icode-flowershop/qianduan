<template >
    <div>
        <div class="goodsBox">
            <div class="goods-img">
                <img :src="goodsInfo.img" alt="" />
            </div>

            <div class="goods-info">
                <div class="info-title">
                    <p>{{ goodsInfo.fname }}</p>
                </div>
                <hr />

                <div class="info-msg">
                    <span class="fl">材料:</span>
                    <p class="fr">{{ goodsInfo.material }}</p>
                </div>
                <div class="info-msg">
                    <span class="fl">包装:</span>
                    <p class="fr">{{ goodsInfo.packaging }}</p>
                </div>
                <div class="info-msg">
                    <span class="fl">花语:</span>
                    <p class="fr">{{ goodsInfo.says }}</p>
                </div>
                <div class="info-msg">
                    <span class="fl">配送说明:</span>
                    <p class="fr">请提前一天预定</p>
                </div>
                <div class="info-msg">
                    <span class="fl">优惠卷:</span>
                    <p class="fr">暂无优惠卷</p>
                </div>

                <div class="info-price">
                    <div class="info-price-top">
                        <span>店铺价:</span><span>￥{{ goodsInfo.price }}</span>
                    </div>
                    <div class="info-price-bottom">
                        <span>市场价:</span
                        ><span style="text-decoration: line-through"
                            >￥{{ goodsInfo.price + 100 }}</span
                        >
                        <p>
                            销量
                            <span style="font-size: 25px; color: red">{{
                                goodsInfo.sold
                            }}</span
                            >笔
                        </p>
                    </div>
                </div>
                <span>数量：</span>
                <el-input-number
                    size="large"
                    v-model="num"
                    :min="1"
                    :max="goodsInfo.inventory"
                    @change="handleChange"
                    label="商品数量"
                ></el-input-number>
                <el-button
                    id="addCart"
                    size="medium"
                    type="danger"
                    @click="add1"
                    >加入购物车</el-button
                >
                <p style="color: #777777">{{ tips }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "goodsDesc",
    data() {
        return {
            goodsId: "0",
            goodsInfo: {
                /* 需要展示商品信息 */
                id: 0,
                img: "",
                fname: "",
                price: "",
                sold: "",
                says: "",
                material: "",
                packaging: "",
                inventory: 0,
            },
            num: 1,
            tips: "温馨提示·不支持7天无理由退货",

            //隐形窗口
            ishow: false,
            current: 0,

            //按钮点击限制
            add1_can_press: true,
            err_can_press: true,

            //商品详情
        };
    },
    created() {
        if (this.$route.query.goodId == null) {
            this.$router.push("/helloHome");
        }
        this.goodsId = this.$route.query.goodId;
        this.getdate();
    },
    methods: {
        //数据更新
        getdate() {
            this.axios
                .get("/api/beloving/flowerDetail?id=" + this.goodsId)
                .then((resp) => {
                    this.goodsInfo = resp.data;
                });
        },

        handleChange(value) {
            this.money = value * this.prize;
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
        },
        //添加购物车
        add1() {
            if (this.add1_can_press) {
                this.$notify({
                    title: "添加购物车",
                    message: "商品已添加到你的购物车",
                    type: "success",
                });
                this.add1_can_press = false;
                setTimeout(() => {
                    this.add1_can_press = true;
                }, 2000);
            } else {
                this.$notify.error({
                    title: "错误",
                    message: "请求过于频繁，2秒后重试",
                });
                this.err_can_press = false;
                setTimeout(() => {
                    this.err_can_press = true;
                }, 1000);
            }
        },
    },
};
</script>

<style scoped>
.goodsBox {
    width: 100%;
    margin: 50px auto;
    background-color: rgb(245, 245, 245);
}

.info-title {
    font-weight: 600;
    font-size: 20px;
    padding-bottom: 25px;
    border-bottom: 1px solid #ccc;
}
.fr {
    margin: 0;
    padding: 0;
}
.fl {
    float: left;
    margin: 0;
    padding: 0;
    margin-right: 20px;
}
.goods-img {
    float: left;
    box-sizing: content-box;
    margin: 0 50px;
}
.goods-img > img {
    width: 360px;
    height: 500px;
}
.info-msg {
    margin-top: 10px;
    font-size: 14px;
    color: #666;
}
.clearfix {
    clear: both;
    content: "";
    overflow: hidden;
}

.goods-info {
    float: left;
    width: 670px;
    height: 505px;
    margin-bottom: 0;
}
.info-price {
    height: 100px;
    margin: 30px 0;
    background-color: rgb(240, 240, 240);
}
.info-price span {
    margin: 10px;
    display: inline-block;
}
.info-price-bottom p {
    float: right;
}
#addCart {
    margin-left: 90px;
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
</style>
