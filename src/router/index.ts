import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import CurrentMonth from '@/views/CurrentMonth.vue';
import CreateRecord from '@/views/CreateRecord.vue';
import TimelinePage from '@/views/TimelinePage.vue';
import { useRecordStore } from '@/stores/record.ts'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
    },
    {
      path: '/current-month',
      name: 'CurrentMonth',
      component: CurrentMonth,
    },
    {
      path: '/timeline/:year?',
      name: 'Timeline',
      component: TimelinePage,
      beforeEnter: (to, from) => {
        const recordStore = useRecordStore();

        if (!to.params.year) {
          const year = recordStore.defaultTimelineYear;
          return {
            name: 'Timeline',
            params: { year: year.toString() },
            replace: true,
          };
        }
      },
    },
    {
      path: '/create',
      name: 'Create',
      component: CreateRecord,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/old-examples/AboutView.vue'),
    },
  ],
});

export default router;
