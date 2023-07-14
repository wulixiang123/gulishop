import Communication from '@/pages/Communication'
export default {
    path: '/communication',
    component: Communication,
    meta: { isHide: true },
    children: [
        {
            path: '/props',
            meta: { isHide: true },
            component: () => import('@/pages/Communication/comp/01_props/PropsTest.vue'),
        },
        {
            path: '/event',
            meta: { isHide: true },
            component: () => import('@/pages/Communication/comp/02_custom-event/EventTest'),
        },
        {
            path: '/bus',
            meta: { isHide: true },
            component: () => import('@/pages/Communication/comp/03_event-bus/EventBusTest'),
        },
        {
            path: '/model',
            meta: { isHide: true },
            component: () => import('@/pages/Communication/comp/04_v-model/ModelTest'),
        },
        {
            path: '/sync',
            meta: { isHide: true },
            component: () => import('@/pages/Communication/comp/05_sync/SyncTest'),
        },
        {
            path: '/attrs-listeners',
            meta: { isHide: true },
            component: () => import('@/pages/Communication/comp/06_attrs-listeners/AttrsListenersTest'),
        },
        {
            path: '/ref-children-parent',
            meta: { isHide: true },
            component: () => import('@/pages/Communication/comp/07_ref-children-parent/RefChildrenParentTest'),
        },
        {
            path: '/mixin',
            meta: { isHide: true },
            component: () => import('@/pages/Communication/comp/08_mixin/RefChildrenParentTest'),
        },
        {
            path: '/provide-inject',
            meta: { isHide: true },
            component: () => import('@/pages/Communication/comp/09_provide-inject/ProvideInjectTest'),
        },
        {
            path: '/vuex',
            meta: { isHide: true },
            component: () => import('@/pages/Communication/comp/10_vuex/VuexTest'),
        },
        {
            path: '/slot',
            meta: { isHide: true },
            component: () => import('@/pages/Communication/comp/11_slot/SlotTest'),
        },
        {
            path: '/pubsub',
            meta: { isHide: true },
            component: () => import('@/pages/Communication/comp/12_pubsub/index'),
        },

        /* --------------------------------------- */
        {
            path: '/props_pre',
            meta: { isHide: true },
            component: () => import('@/pages/Communication/comp_pre/01_props/PropsTest.vue'),
        },
        {
            path: '/event_pre',
            meta: { isHide: true },
            component: () => import('@/pages/Communication/comp_pre/02_custom-event/EventTest'),
        },
        {
            path: '/bus_pre',
            meta: { isHide: true },
            component: () => import('@/pages/Communication/comp_pre/03_event-bus/EventBusTest'),
        },
        {
            path: '/model_pre',
            meta: { isHide: true },
            component: () => import('@/pages/Communication/comp_pre/04_v-model/ModelTest'),
        },
        {
            path: '/sync_pre',
            meta: { isHide: true },
            component: () => import('@/pages/Communication/comp_pre/05_sync/SyncTest'),
        },
        {
            path: '/attrs-listeners_pre',
            meta: { isHide: true },
            component: () => import('@/pages/Communication/comp_pre/06_attrs-listeners/AttrsListenersTest'),
        },
        {
            path: '/ref-children-parent_pre',
            meta: { isHide: true },
            component: () => import('@/pages/Communication/comp_pre/07_ref-children-parent/RefChildrenParentTest'),
        },
        {
            path: '/mixin_pre',
            meta: { isHide: true },
            component: () => import('@/pages/Communication/comp_pre/08_mixin/RefChildrenParentTest'),
        },
        {
            path: '/provide-inject_pre',
            meta: { isHide: true },
            component: () => import('@/pages/Communication/comp_pre/09_provide-inject/ProvideInjectTest'),
        },
        {
            path: '/vuex_pre',
            meta: { isHide: true },
            component: () => import('@/pages/Communication/comp_pre/10_vuex/VuexTest'),
        },
        {
            path: '/slot_pre',
            meta: { isHide: true },
            component: () => import('@/pages/Communication/comp_pre/11_slot/SlotTest'),
        },
        {
            path: '/pubsub_pre',
            meta: { isHide: true },
            component: () => import('@/pages/Communication/comp_pre/12_pubsub/index'),
        },
    ]
}