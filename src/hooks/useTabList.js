import { useCookies } from "@vueuse/integrations/useCookies";
import { ref } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { router } from "@/router";

export function useTabList() {

    const route = useRoute();
    const cookie = useCookies();

    const activeTab = ref(route.path);
    const tabList = ref([
        {
            title: "后台首页",
            path: "/",
        },
    ]);
    // 添加标签导航
    function addTab(tab) {
        let noTab = tabList.value.findIndex((t) => t.path == tab.path) == -1;
        if (noTab) {
            tabList.value.push(tab);
        }

        cookie.set("tabList", tabList.value);
    }

    // 初始化标签导航列表
    function initTabList() {
        let tabs = cookie.get("tabList");
        if (tabs) {
            tabList.value = tabs;
        }
    }

    initTabList();

    // 下拉菜单
    const handleClose = (c) => {
        console.log(c);
        if (c == "clearAll") {
            // 切换回首页
            activeTab.value = "/";
            // 过滤只剩下首页
            tabList.value = [
                {
                    title: "后台首页",
                    path: "/",
                },
            ];
        } else if (c == "clearOther") {
            // 过滤只剩下首页和当前激活页
            tabList.value = tabList.value.filter(
                (tab) => tab.path === "/" || tab.path === activeTab.value
            );
            console.log(tabList.value);
        }
        cookie.set("tabList", tabList.value);
    };

    onBeforeRouteUpdate((to, from) => {
        activeTab.value = to.path;
        addTab({
            title: to.meta.title,
            path: to.path,
        });
    });

    const changeTab = (path) => {
        activeTab.value = path;
        router.push(path);
    };

    // 关闭当前标签页的处理
    const removeTab = (t) => {
        let a = activeTab.value;
        let tabs = tabList.value;
        if (a === t) {
            tabs.forEach((tab, index) => {
                if (tab.path == t) {
                    const nextTab = tabs[index + 1] || tabs[index - 1];
                    if (nextTab) {
                        a = nextTab.path;
                    }
                }
            });
        }
        activeTab.value = a;
        tabList.value = tabList.value.filter((tab) => tab.path != t);
        cookie.set("tabList", tabList.value);
    };


    return {
        activeTab,
        tabList,
        changeTab,
        removeTab,
        handleClose
    }
}