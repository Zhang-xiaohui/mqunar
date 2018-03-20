import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => { require(['@/views/login.vue'], resolve); }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['@/views/error-page/404.vue'], resolve); }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => { require(['@//views/error-page/403.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => { require(['@/views/error-page/500.vue'], resolve); }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    component: Main,
    redirect: '/home',
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: resolve => { require(['@/views/home/home.vue'], resolve); } },
        { path: '/add-template/', title: '新增运费模板', name: 'AddTemplate', component: resolve => { require(['@/views/shop/freight-template/add-template.vue'], resolve); } },
        { path: '/ecoupon-check-detail/:id', title: '电子券详情', name: 'EcouponCheckDetail', component: resolve => { require(['@/views/service-trade/ecoupon-check/ecoupon-check-detail.vue'], resolve); } },
        { path: '/add-service-goods/', title: '新增商品', name: 'AddServiceGoods', component: resolve => { require(['@/views/service-trade/service-goodslist/add-service-goods.vue'], resolve); } },
        { 
            path: '/marketing/seckilling-goods-list', 
            title: '商品列表', 
            name: 'SeckillingGoodsList', 
            component: resolve => { require(['@/views/marketing/seckilling/seckilling-goods-list.vue'], resolve); } 
        },
        { 
            path: '/marketing/seckilling-setting', 
            title: '设置秒杀规则', 
            name: 'SeckillingSetting', 
            component: resolve => { require(['@/views/marketing/seckilling/seckilling-setting.vue'], resolve); } 
        },
        { 
            path: '/distribution/distribution-income-detail/:id', 
            title: '分销订单详情', 
            name: 'DistributionIncomeDetail', 
            component: resolve => { require(['@/views/distribution/distribution-income/distribution-income-detail.vue'], resolve); } 
        },
        { 
            path: '/distribution/distribution-set-form', 
            title: '分销设置表单', 
            name: 'DistributionSetForm', 
            component: resolve => { require(['@/views/distribution/distribution-set/distribution-set-form.vue'], resolve); } 
        },
        { 
            path: '/entity-trade/aftersale-detail', 
            title: '实物类退货详情', 
            name: 'EntityAftersaleDetail', 
            component: resolve => { require(['@/views/entity-trade/aftersale-service/aftersale-detail.vue'], resolve); } 
        }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/home',
        icon: 'icon-shouye2',
        title: '首页',
        name: 'home',
        component: Main,
        children: [
            { path: 'index', title: '首页', name: 'index', component: resolve => { require(['@/views/home/home.vue'], resolve); } }
        ]
    },
    {
        path: '/entity-trade',
        icon: 'icon-shoucang',
        name: 'entity_trade',
        title: '实物类交易',
        component: Main,
        children: [
            {
                path: 'order-manage',
                icon: 'ios-list-outline',
                name: 'EntityOrderList',
                title: '订单列表',
                component: resolve => { require(['@/views/entity-trade/order-manage/order-list.vue'], resolve); }
            },
            {
                path: 'aftersale-service',
                icon: 'ios-paper-outline',
                name: 'EntityAftersaleList',
                title: '售后列表',
                component: resolve => { require(['@/views/entity-trade/aftersale-service/aftersale-list.vue'], resolve); }
            },
            
        ]
    },
    {
        path: '/service-trade',
        icon: 'icon-fenlei',
        title: '服务类交易',
        name: 'service_trade',
        component: Main,
        children: [
            {
                path: 'service-goodslist',
                icon: 'ios-paper-outline',
                name: 'ServiceGoodslist',
                title: '商品列表',
                component: resolve => { require(['@/views/service-trade/service-goodslist/service-goodslist.vue'], resolve); }
            },
            {
                path: 'ecoupon-check',
                icon: 'ios-paper-outline',
                name: 'EcouponCheck',
                title: '电子券验证',
                component: resolve => { require(['@/views/service-trade/ecoupon-check/ecoupon-check.vue'], resolve); }
            }
        ]
    },
    {
        path: '/distribution',
        icon: 'icon-fenxiao',
        title: '分销管理',
        name: 'distribution',
        component: Main,
        children: [
            {
                path: 'distribution-lib',
                icon: 'ios-paper-outline',
                name: 'DistributionLib',
                title: '分销商品库',
                component: resolve => { require(['@/views/distribution/distribution-lib/distribution-lib.vue'], resolve); }
            },
            {
                path: 'distribution-set',
                icon: 'ios-paper-outline',
                name: 'DistributionSet',
                title: '分销设置',
                component: resolve => { require(['@/views/distribution/distribution-set/distribution-set.vue'], resolve); }
            },
            {
                path: 'distribution-income',
                icon: 'ios-paper-outline',
                name: 'DistributionIncome',
                title: '分销收入',
                component: resolve => { require(['@/views/distribution/distribution-income/distribution-income.vue'], resolve); }
            }
        ]
    },
    {
        path: '/partner',
        icon: 'icon-xing',
        title: '合伙人店铺专享',
        name: 'partner',
        component: Main,
        children: [
            {
                path: 'goods-endorsement',
                icon: 'ios-paper-outline',
                name: 'GoodsEndorsement',
                title: '代言商品',
                component: resolve => { require(['@/views/partner/goods-endorsement/goods-endorsement.vue'], resolve); }
            },
            {
                path: 'returns-detail',
                icon: 'ios-paper-outline',
                name: 'ReturnsDetail',
                title: '收益明细',
                component: resolve => { require(['@/views/partner/returns-detail/returns-detail.vue'], resolve); }
            }
        ]
    },
    {
        path: '/marketing',
        icon: 'icon-yingxiao',
        title: '营销管理',
        name: 'marketing',
        component: Main,
        hasSubMenu: true,
        children: [
           {
                path: 'seckilling',
                icon: 'ios-paper-outline',
                name: 'Seckilling',
                title: '秒杀管理',
                component: resolve => { require(['@/views/marketing/seckilling/seckilling.vue'], resolve); }
            }
        ]
    },
    {
        path: '/fund-settlement',
        icon: 'icon-zijin',
        title: '资金结算',
        name: 'fund-settlement',
        component: Main,
        children: [
           {
                path: 'fund-details',
                icon: 'ios-paper-outline',
                name: 'FundDetails',
                title: '明细列表',
                component: resolve => { require(['@/views/fund-settlement/fund-details/fund-details.vue'], resolve); }
            },
            {
                path: 'fund-withdraw',
                icon: 'ios-paper-outline',
                name: 'FundWithdraw',
                title: '提现记录',
                component: resolve => { require(['@/views/fund-settlement/fund-withdraw/fund-withdraw.vue'], resolve); }
            }
        ]
    },
    {
        path: '/member',
        icon: 'icon-huiyuan',
        title: '客户管理',
        name: 'member',
        component: Main,
        hasSubMenu: true,
        children: [
            {
                path: 'member',
                icon: 'ios-paper-outline',
                name: 'Member',
                title: '客户列表',
                component: resolve => { require(['@/views/member/member.vue'], resolve); }
            }
        ]
    },
    {
        path: '/shop',
        icon: 'icon-dianpu',
        title: '店铺管理',
        name: 'shop',
        component: Main,
        children: [
            {
                path: 'base-info',
                icon: 'ios-paper-outline',
                name: 'BaseInfo',
                title: '店铺资料',
                component: resolve => { require(['@/views/shop/base-info/base-info.vue'], resolve); }
            },
            {
                path: 'goods-category',
                icon: 'ios-paper-outline',
                name: 'GoodsCategory',
                title: '商品分类',
                component: resolve => { require(['@/views/shop/goods-category/goods-category.vue'], resolve); }
            },
            {
                path: 'freight-template',
                icon: 'ios-paper-outline',
                name: 'FreightTemplate',
                title: '运费模板',
                component: resolve => { require(['@/views/shop/freight-template/freight-template.vue'], resolve); }
            },
            {
                path: 'qrcode',
                icon: 'ios-paper-outline',
                name: 'Qrcode',
                title: '店铺二维码',
                component: resolve => { require(['@/views/shop/qrcode/qrcode.vue'], resolve); }
            },
            {
                path: 'notice',
                icon: 'ios-paper-outline',
                name: 'Notice',
                title: '发布公告',
                component: resolve => { require(['@/views/shop/notice/notice.vue'], resolve); }
            },
            {
                path: 'home-setting',
                icon: 'ios-paper-outline',
                name: 'HomeSetting',
                title: '首页管理',
                component: resolve => { require(['@/views/shop/home-setting/home-setting.vue'], resolve); }
            },
        ]
    },
    {
        path: '/usinghelp',
        icon: 'icon-wendang',
        title: '使用帮助',
        name: 'usinghelp',
        component: Main,
        children: [
            {
                path: 'suggest',
                icon: 'ios-paper-outline',
                name: 'Suggest',
                title: '建议反馈',
                component: resolve => { require(['@/views/usinghelp/suggest/suggest.vue'], resolve); }
            },
            {
                path: 'question-list',
                icon: 'ios-paper-outline',
                name: 'QuestionList',
                title: '码店使用帮助',
                component: resolve => { require(['@/views/usinghelp/question-list/question-list.vue'], resolve); }
            }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    ...appRouter,
    page500,
    page403,
    page404
];
