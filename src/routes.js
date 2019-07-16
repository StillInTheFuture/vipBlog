import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Home from './components/Home.vue'
import BlogContent from './components/BlogContent.vue'
import News from './components/News.vue'
import NewsList from './components/NewsList.vue'
import NewsDetail from './components/NewsDetail.vue'
import BlogStudy from './components/BlogStudy.vue'
import BlogList from './components/BlogList.vue'
import BlogDetail from './components/BlogDetail.vue'
import ResourceDownload from './components/ResourceDownload.vue'
import WriteBlog from './components/WriteBlog.vue'
import Personal from './components/Personal.vue'
import PersonalInfo from './components/PersonalInfo.vue'
import PersonalBlog from './components/PersonalBlog.vue'
import PersonalColl from './components/PersonalColl.vue'
import ResetPsw from './components/ResetPsw.vue'
export default[
  {
    path:'/',component:Home,
    children:[
      {
        path:'/',
        component:BlogContent,
      },
      {
        path:'/news',
        component:News,
        children:[
          {
            path:'/news',
            component:NewsList,
          },
          {
            path:'/newsDetail/:id',
            component:NewsDetail,
          },
        ]
      },
      {
        path:'/blog',
        component:BlogStudy,
        children:[
          {
            path:'/blog',
            component:BlogList,
          },
          {
            path:'/blogDetail/:id',
            component:BlogDetail,
          },

        ]
      },
      {
        path:'/resource/:id',
        component:ResourceDownload,
      },
      {
        path:'/writeBlog',
        component:WriteBlog,
      },
      {
        path:'/personal',
        component:Personal,
        children:[
          {
            path:'/personal',
            component:PersonalInfo,
          },
          {
            path:'/personal/blog',
            component:PersonalBlog,
          },
          {
            path:'/personal/coll',
            component:PersonalColl,
          },
        ]
      },
      {
        path:'/reset',
        component:ResetPsw,
      }

    ]
  },
  {path:'/login',component:Login},
  {path:'/register',component:Register},

]
