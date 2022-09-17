import { ElNotification, ElMessageBox } from "element-plus";
import nprogress from "nprogress";

// 消息提示
export function toast(message, type = 'success', dangerouslyUseHTMLString = true) {
    ElNotification({
        message,
        type,
        dangerouslyUseHTMLString,
        duration: 1000,
    });
}


export function showModal(content = '提示内容', type = 'warning', title = '') {
    return ElMessageBox.confirm(
        content,
        title,
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type,
        }
    )
}


// 显示顶部加载进度条
export function showFullLoading() {
    nprogress.start()
}



// 隐藏顶部加载进度条
export function hideFullLoading() {
    nprogress.done()
}

// 弹出输入框
export function showPrompt(tip, value = '') {
    return ElMessageBox.prompt(tip, '', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputValue: value
    })
}


// 将query对象转换成url参数

export function queryParams(query) {
    let q = []
    for (const key in query) {
        if (query[key]) {
            q.push(`${key}=${encodeURIComponent(query[key])}`)
        }
    }
    let r = q.join('&')
    r = r ? ('?' + r) : ''

    return r
}


// 数组上移
// arr 当前操作的数组
// index 当前操作的索引
export function useArrayMoveUp(arr, index) {
    swapArray(arr, index, index - 1)
}


// 数组下移
export function useArrayMoveDown(arr, index) {
    swapArray(arr, index, index + 1)
}


// 调换数组索引的方法
function swapArray(arr, index1, index2) {
    // 交换数组中两个相邻元素的位置
    arr[index1] = arr.splice(index2, 1, arr[index1])[0]
    return arr
}