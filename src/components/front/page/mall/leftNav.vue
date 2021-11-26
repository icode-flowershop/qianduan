<template>

<div class="nav">

            <div>
                <p id="nav_title">SHOPPING OPTIONS</p>
            </div>

            <div>
                <ul class="itemClass">
                    <p class="itemClass_big">Price</p>
                    <li class="itemClass_little">0~100</li>
                    <li class="itemClass_little">100~399</li>
                    <li class="itemClass_little">400以上</li>
                </ul>
            </div>
            <div>
                <ul class="itemClass">
                    <p class="itemClass_big">种类</p>
                    <li class="itemClass_little">0~100</li>
                    <li class="itemClass_little">100~399</li>
                    <li class="itemClass_little">400以上</li>
                </ul>
            </div>
            <div>
                <ul class="itemClass">
                    <p class="itemClass_big">颜色</p>
                    <li class="itemClass_little">0~100</li>
                    <li class="itemClass_little">100~399</li>
                    <li class="itemClass_little">400以上</li>
                </ul>
            </div>
        </div>
</template>

<script>
export default {
  name:'leftNav',


}
</script>

<style scoped>
 .nav {
        float: left;
        width: 25%;
        border: 1px solid black;
        height: fit-content;
    }
    #nav_title {
        margin: 10% auto;
        margin-left: 3%;
    }
    .itemClass {
        margin: 0;
        padding-left: 10%;
    }
    .itemClass_big {
        font-size: 15px;
    }
    .itemClass_little {
        font-size: 13px;
        color: rgb(61, 80, 69);
    }
    .showFlower {
        float: left;
        width: 74%;
    }
    #flower_title {
        font-size: 24px;
        float: left;
        margin: 1%;
        margin-right: 39%;
    }
    #flower_sort {
        margin-left: 3%;
        width: 130px;
    }

</style>
