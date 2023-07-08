import { reqAddCart } from "@/api"

const state = {}
const mutations = {}
const actions = {
    async addCart({commit},{skuId,skuNum}){
        try {
            let result = await reqAddCart('aaa',skuNum)
            if(result && result.code == 200){
                console.log(result);
            }else{
                console.error(result);
            }
        } catch (error) {
            console.error(error);
        }
    }
}
const getters = {}

export default {
namespaced:true,
state,mutations,actions,getters,
}