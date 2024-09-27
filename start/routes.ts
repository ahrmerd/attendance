/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const LoginUsersController = () => import('#controllers/login_users_controller')
const ApiLoginController = () => import('#controllers/api/v1/login_controller')
const RegisterUsersController = () => import('#controllers/register_users_controller')

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
// import AttendancesController from 'app/controllers/attendances_controller.js'
const ClassesController = () => import('#controllers/classes_controller')
// import StudentsController from 'app/controllers/students_controller.js'
const StudentsController = () => import('#controllers/students_controller')
const StudentsApiController = () => import('#controllers/api/v1/students_controller')
const DashboardController = () => import('#controllers/dashboard_controller')
const ClassesApiController = () => import('#controllers/api/v1/classes_controller')
const AttendancesApiController = () => import('#controllers/api/v1/attendances_controller')
const DownloadsApiController = () => import('#controllers/api/v1/downloads_controller')
const RolesController = () => import('#controllers/roles_controller')
const UsersController = () => import('#controllers/users_controller')
const SchoolsController = () => import('#controllers/schools_controller')
const AttendancesController = () => import('#controllers/attendances_controller')
const SchoolRoleController = () => import('#controllers/school_roles_controller')

router.on('/').renderInertia('home', { version: 6 }).as('home')
// router.on('/').renderInertia('admin/dashboard', { version: 6 }).as('home-dash')

router
  .group(() => {
    router.get('/login', [LoginUsersController, 'create']).as('login')

    router.post('/login', [LoginUsersController, 'login'])
    router.get('/register', [RegisterUsersController, 'create'])
    router.post('/register', [RegisterUsersController, 'register'])
  })
  .middleware(middleware.guest())

router
  .group(() => {
    router.get('/myschools/dashboard', [DashboardController, 'schoolDashboard']).as('myschools')
    // router.on('/myschools').renderInertia('myschools/my_school_dashboard').as('myschools')
    router.resource('/myschools/classes', ClassesController).as('classes')
    router.resource('/myschools/students', StudentsController).as('students')

    router
      .get('/myschools/classes/:id/attendances', [AttendancesController, 'index'])
      .as('attendances.index')
    router
      .get('/myschools/classes/:id/students', [StudentsController, 'classStudents'])
      .as('classes.students')
    router.resource('/myschools/staffs', SchoolRoleController).as('school_role')
    //roles for schools
    //attendance
    // router.resource('/myschools/students', StudentsController).as('students')
  })
  .middleware(middleware.schoolAuth())
router
  .group(() => {
    router.on('not-school').renderInertia('not_school').as('notSchool')
    router.on('not-admin').renderInertia('not_admin').as('notAdmin')
    router.post('/logout', [LoginUsersController, 'logout']).as('logout')
  })
  .middleware(middleware.auth())
router
  .group(() => {
    //User

    // router.post('/logout', [LoginUsersController, 'logout']).as('logout')
    router.get('/dashboard', [DashboardController, 'index']).as('dashboard')
    router.get('schools/search', [SchoolsController, 'search']).as('schools.search')
    router.get('users/search', [UsersController, 'search']).as('users.search')
    router.resource('schools', SchoolsController).as('schools').except(['edit', 'show'])
    router.put('users/:id/password', [UsersController, 'changePassword']).as('users.changePassword')
    router.resource('users', UsersController).as('users')
    router.resource('roles', RolesController).as('roles')
    // router.on('/dashboard').renderInertia('admin/dashboard', { version: 6 }).as('dashboard')
    // router.get('/dashboard', )
  })
  .middleware(middleware.adminAuth())

//api routes
router
  .group(() => {
    router.group(() => {
      router.post('/api/v1/login', [ApiLoginController, 'login']).as('login')
    })
    router
      .group(() => {
        router.get('/api/v1/students', [StudentsApiController, 'index']).as('students.index')
        router.post('/api/v1/students', [StudentsApiController, 'store']).as('students.store')
        router.get('/api/v1/classes', [ClassesApiController, 'index']).as('classes.index')
        router.get('/api/v1/download-data', [DownloadsApiController, 'index']).as('download-data')
        router
          .get('/api/v1/attendances', [AttendancesApiController, 'index'])
          .as('attendances.index')
        router
          .post('/api/v1/attendances', [AttendancesApiController, 'store'])
          .as('attendances.store')
        router
          .get('/api/v1/class/:id/attendances', [AttendancesApiController, 'classIndex'])
          .as('class.attendances')
      })
      .middleware(middleware.auth({ guards: ['api'] }))
  })
  .as('api.')
