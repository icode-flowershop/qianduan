jQuery(document).ready(function($) {
    let Afont = 0
    $('body').click(function(e) {
        const language = [
          '❤春兰❤',
          '❤香堇❤',
          '❤慈菇花❤',
          '❤风信子❤',
          '❤郁金香❤',
          '❤紫罗兰❤',
          '❤梅花❤',
          '❤桃花❤',
          '❤牡丹❤',
          '❤海棠❤',
          '❤玉兰❤',
          '❤木笔❤',
          '❤紫荆❤',
          '❤连翘❤',
          '❤金钟❤',
          '❤丁香❤',
          '❤紫藤❤',
          '❤春鹃❤',
          '❤杜鹃花❤',
          '❤石榴花❤',
          '❤含笑花❤',
          '❤白兰花❤',
          '❤茉莉花❤',
          '❤栀子花❤',
          '❤桂花❤',
          '❤木芙蓉❤',
          '❤腊梅❤',
          '❤免牙红❤',
          '❤银芽柳❤',
          '❤山茶花❤',
          '❤迎春花❤',
        ]
        const x = e.pageX
        const y = e.pageY
        const $i = $('<span/>').text(language[Math.floor(Math.random() * language.length)])
        Afont = (Afont + 1) % language.length
        $i.css({
            'z-index': 9999,
            top: y - 20,
            left: x,
            position: 'absolute',
            'font-weight': 'bold',
            color: randomColor(),
            'font-size': '20px',
        })
        function randomColor() {
            return 'rgb(' + ~~(Math.random() * 255) + ',' + ~~(Math.random() * 255) + ',' + ~~(Math.random() * 255) + ')'
        }
        $('body').append($i)
        $i.animate(
            {
                top: y - 180,
                opacity: 0,
            },
            1500,
            function() {
                $i.remove()
            }
        )
    })
})
