import { ref } from 'vue'
import { createGoodsSkusCard } from '@/api/goods.js'
// 当前商品的ID
export const goodsId = ref(0)

// 规格选项列表
export const sku_card_list = ref([])


// 初始化规格选项列表
export function initSkuCardList(d) {
    console.log(d);
    sku_card_list.value = d.goodsSkusCard.map(item => {
        item.text = item.name
        item.loading = false
        item.goodsSkusCardValue.map(v => {
            v.text = v.value || '属性值'
            return v
        })

        return item
    })
}

// 添加规格选项
export const btnLoading = ref(false)
export function addSkuCardEvent() {
    btnLoading.value = true
    createGoodsSkusCard({
        goods_id: goodsId.value,
        name: '规格选项',
        order: 50,
        type: 0
    }).then(res => {
        sku_card_list.value.push({
            ...res, text: res.name, loading: false, goodsSkusCardValue: []
        })

    }).finally(() => {
        btnLoading.value = false
    })
}


// 初始化规格值
export function initSkusCardItem(id) {
    // 对象
    const item = sku_card_list.value.find(o => o.id === id)
    console.log(item);
    return {
        item
    }
}