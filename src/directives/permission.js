import store from '@/store'


function hasPermission(value, el = false) {
    if (!Array.isArray(value)) {
        throw new Error(`需要配置权限,例如v-permission="['getStatistics3,GET']"`)
    }

    // 查到有包含别名
    const hasAuth = value.findIndex(v => store.state.ruleNames.includes(v)) != -1
    if (el && !hasAuth) {
        el.parentNode && el.parentNode.removeChild(el)
    }
    return hasAuth
}

export default {
    install(app) {
        app.directive('permission', {
            mounted(el, binding) {
                console.log(el.parentNode);
                hasPermission(binding.value, el)
            },
        })
    }
}