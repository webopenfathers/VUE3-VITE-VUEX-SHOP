import { reactive, ref, computed } from "vue";
import { toast } from "@/utils/util";

// 表格列表--分页---搜索
export function useInitTable(opt = {}) {
    let searchForm = null
    let resetSearchForm = null
    if (opt.searchForm) {
        // 通过结构变成响应式
        searchForm = reactive({
            ...opt.searchForm
        })
        resetSearchForm = () => {
            for (const key in opt.searchForm) {
                searchForm[key] = opt.searchForm[key]
            }
            getData();
        }
    }


    const tableData = ref([]);
    // 加载动画
    const loading = ref(false);

    // 分页
    const currentPage = ref(1);
    const total = ref(0);
    const limit = ref(10);

    // 获取数据
    function getData(p = null) {
        if (typeof p === "number") {
            currentPage.value = p;
        }
        loading.value = true;
        opt.getList(currentPage.value, searchForm)
            .then((res) => {
                if (opt.onGetListSuccess && typeof opt.onGetListSuccess == 'function') {
                    opt.onGetListSuccess(res)
                } else {
                    tableData.value = res.list;
                    total.value = res.totalCount;
                }

            })
            .finally(() => {
                loading.value = false;
            });
    }

    getData();

    return {
        // return 以后也是响应式
        searchForm,
        resetSearchForm,
        tableData,
        loading,
        currentPage,
        total,
        limit,
        getData
    }
}


// 新增---修改
export function useInitForm(opt = {}) {

    //表单部分
    const formDrawerRef = ref(null);
    const formRef = ref(null);
    const defaultForm = opt.form
    const form = reactive({});
    // 拿到
    const currentPage = ref(opt.currentPage);

    const rules = opt.rules || {};

    const editId = ref(0);
    const drawerTitle = computed(() => (editId.value ? "修改" : "新增"));
    const handleSubmit = () => {
        formRef.value.validate((valid) => {
            if (!valid) return;

            formDrawerRef.value.showLoading();
            const fun = editId.value
                ? opt.update(editId.value, form)
                : opt.create(form);
            // 创建
            fun
                .then((res) => {
                    toast(drawerTitle.value + "成功");
                    // 修改刷新当前页，新增刷新第一页
                    opt.getData(editId.value ? currentPage.value : 1);
                    formDrawerRef.value.close();
                })
                .finally(() => {
                    formDrawerRef.value.hideLoading();
                });
        });
    };
    // 重置表单
    function resetForm(row) {
        if (formRef.value) formRef.value.clearValidate();
        for (const key in defaultForm) {
            form[key] = row[key];
        }
    }

    // 新增
    const handleCreate = () => {
        editId.value = 0;
        resetForm(defaultForm);
        formDrawerRef.value.open();
    };

    // 修改
    const handleEdit = (row) => {
        editId.value = row.id;
        resetForm(row);
        formDrawerRef.value.open();
    };


    return {
        formDrawerRef,
        formRef,
        form,
        rules,
        editId,
        drawerTitle,
        handleSubmit,
        resetForm,
        handleCreate,
        handleEdit
    }
}
