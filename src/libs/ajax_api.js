import util from '@/libs/util.js'

let ajaxApi = {};

// 获取店铺信息
ajaxApi.getShopInfo = function (id) {
    return util.ajax.get("/api/shop/v1/shop/" + id)
};

// 发布公告
ajaxApi.editShopNotice = function (id, params) {
    return util.ajax.put("/web/shop/v1/shop/notice/" + id, params)
};

// 获取运费模板
ajaxApi.getFreightTemplateList = function () {
    return util.ajax.get("/web/shop/v1/delivery-template")
};

// 删除运费模板
ajaxApi.delFreightTemplateItem = function (id) {
    return util.ajax.delete("/web/shop/v1/delivery-template/" + id)
};

// 新增运费模板
ajaxApi.addFreightTemplateItem = function (id, params) {
    return util.ajax.post("/web/shop/v1/delivery-template",params)
};

// 编辑运费模板
ajaxApi.editFreightTemplateItem = function (id, params) {
    return util.ajax.put("/web/shop/v1/delivery-template/" + id, params)
};

// 获取运费模板详情
ajaxApi.getFreightTemplateDetail = function (id) {
    return util.ajax.get("/web/shop/v1/delivery-template/"  + id)
};


//获取客户列表
ajaxApi.getCustomerList = function (id) { 
	return util.ajax.get("/web/promotion/v1/shop-member?shop_id=" + id)
}


//获取修改推荐人    //需修改
ajaxApi.getReferrerMobile = function (params) { 
	return util.ajax.put("/web/promotion/v1/team/1" ,params)
}

//获取代言商品
ajaxApi.getGoodsEndorsement = function (params) {  
	return util.ajax.get("/web/goods/v1/mditem/represent",params)
}

//获取店铺商品分类
ajaxApi.getShopGoodsCateList = function(params){
	return util.ajax.get('/web/goods/v1/shop-category/cate-list',{
		params: params
	})
}
//新增店铺商品分类
ajaxApi.addShopGoodsCate = function(params){
	return util.ajax.post('/web/goods/v1/shop-category/create',params)
}

//删除店铺商品分类
ajaxApi.delShopGoodsCate = function(id,params){
	return util.ajax.delete("/web/goods/v1/shop-category/" + id, {
		params: params
	})
}

//编辑店铺商品分类
ajaxApi.editShopGoodsCate = function(id,params){
	return util.ajax.put("/web/goods/v1/shop-category/" + id, params)
}

//编辑店铺资料
ajaxApi.editShopInfo = function(id,params){
	return util.ajax.put("/web/shop/v1/shop/" + id, params)
}

export default ajaxApi;
