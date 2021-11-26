<template>
    <div>
        <leftNav />
        <div style="margin-left:2%">
            <div style="margin-bottom: 1.7%;">
                <p id="flower_title">Browse Design</p>
                <div class="search">
                    <el-input placeholder="查询商品" v-model="searchContent" maxlength="100px">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                </div>
            </div>
            <div>
                <hr />
            </div>
            <div>
                <el-select v-model="value" placeholder="请选择" id="flower_sort" size="small" style="margin-left: 0.8%;width: 130px;">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
                <el-pagination id="pagination" background layout="prev, pager, next" :total="flowers.length" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
            <div class="showFlower">
                <el-container>
                    <div>
                        <div
                            class="card"
                            v-for="(item, index) in goodsList"
                            :key="item.id"
                            v-on:mouseenter="showDialog(index)"
                            v-on:mouseleave="hideDialog(index)"
                        >
                            <router-link tag="a" :to="{ path: '/goodsDesc', query: { goodId: item.id } }">
                                <div class="ribbon">
                                    <!--鼠标移入移出事件-->
                                    <div class="handleDialog" v-if="ishow && index == current"></div>
                                    <img :src="item.img" style="height: 100%;width: 100%" />
                                </div>
                                <div>
                                    <a><span style="float:left; margin-left:10%">{{ item.fname }}</span></a>
                                    <a><span style="float: right">￥{{ item.price }}</span></a>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </el-container>
            </div>
            <div>
                <el-pagination id="pagination" background layout="prev, pager, next" :total="flowers.length" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import leftNav from './leftNav.vue'
    export default {
        name: 'index',
        components: { leftNav },
        data() {
            return {
                ishow: false,
                current: 0,
                selectd: '',
                goodsList: [],
                currentPage: 1,
                searchContent: '',
                searchList: [],
                options: [
                    {
                        value: '选项1',
                        label: '按评分最高',
                    },
                    {
                        value: '选项2',
                        label: '按价格最高',
                    },
                    {
                        value: '选项3',
                        label: '按价格最低',
                    },
                ],
                value: '选择排序方式',
                flowers: JSON.parse(localStorage.getItem('showFlower')),
            }
        },
        mounted() {
            //获取需要展示的商品信息 如果缓存为空 调取接口加入缓存
            if (!this.flowers) {
                this.getAllGoods()
            } else {
                this.goodsList = this.flowers.slice((this.currentPage - 1) * 12, this.currentPage * 12)
            }
        },
        methods: {
            handleCurrentChange(currentPage) {
                console.log(currentPage)
                this.currentPage = currentPage
                this.goodsList = this.flowers.slice((this.currentPage - 1) * 12, this.currentPage * 12)
            },
            search() {
                this.searchContent = ''
                if (this.searchContent) {
                    this.axios.get('/api/beloving/showFlower?message=' + this.searchContent).then(response => {
                        this.flowers = response.data
                    })
                }
            },
            getAllGoods() {
                this.axios.get('/api/beloving/showFlower').then(resp => {
                    localStorage.setItem('showFlower', JSON.stringify(resp.data))
                })
            },

            //显示操作项
            showDialog(index, item) {
                this.ishow = true
                this.current = index
            },
            //隐藏蒙层
            hideDialog(index, item) {
                this.ishow = false
                this.current = null
            },
        },
    }
</script>
<style scoped>
    .el-input-group {
        width: 20%;
        padding-top: 0.81%;
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

    #pagination {
        float: right;
    }
    /**
  卡片
   */
    .card {
        height: 300px;
        width: 32%;
        margin-left: 1%;
        margin-top: 1%;
        background-color: white;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        float: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .card span {
        font-size: 15px;
        color: #bfbfbf;
        display: block;
        letter-spacing: 2px;
    }
    /**
丝带
 */

    .ribbon {
        display: inline-block;
        width: 100%;
        height: 80%;
        position: relative;
        margin-bottom: 6%;
        background-size: cover;
        text-transform: uppercase;
        color: white;
    }
</style>
