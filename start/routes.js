'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/api/register', 'AuthApiController.register')
Route.post('/api/authenticate', 'AuthApiController.authenticate')
Route.post('/api/admin-user-register', 'AuthUserAdminController.register')
Route.post('/api/admin-user-authenticate', 'AuthUserAdminController.authenticate')

Route.get('/', () => {
  return { greeting: 'You are in frontend section' }
}).middleware('auth')

Route.get('/admin', () => {
  return { greeting: 'You are in admin section' }
}).middleware('auth:admin')

Route.group(() => {
  Route.resource('api/admin-user', 'AuthUserAdminController').apiOnly()
}).middleware('auth')

Route.group(() => {
  Route.resource('api/course-category', 'CourseCategoryController').apiOnly()
}).middleware('auth')


Route.group(() => {
  Route.resource('api/newsletter', 'NewsletterController').apiOnly()
}).middleware('auth')

Route.group(() => {
  Route.resource('api/business-contact', 'BusinessContactController').apiOnly()
}).middleware('auth')

Route.group(() => {
  Route.resource('api/speaker', 'CourseSpeakerController').apiOnly()
}).middleware('auth')

Route.group(() => {
  Route.resource('api/contact', 'ContactController').apiOnly()
}).middleware('auth')

Route.group(() => {
  Route.resource('api/paymentpagarme', 'PaymentPagarmeController').apiOnly()
}).middleware('auth')

Route.group(() => {
  Route.resource('api/course', 'CourseController').apiOnly()
}).middleware('auth')

Route.group(() => {
  Route.resource('api/course-type', 'CourseTypeController').apiOnly()
}).middleware('auth')

Route.group(() => {
  Route.resource('api/student', 'StudentController').apiOnly()
}).middleware('auth')

Route.group(() => {
  Route.resource('api/my-course', 'MyCourseController').apiOnly()
}).middleware('auth')

Route.get('/api/courses-category/:category_id', 'CourseController.getCoursesByCategoryId').middleware(['auth'])
Route.get('/api/courses-search/:name', 'CourseController.getCoursesByName').middleware(['auth'])
Route.get('/api/courses-type/:type_id', 'CourseController.getCoursesByTypeId').middleware(['auth'])
Route.get('/api/courses-speaker/:speaker_id', 'CourseController.getCoursesBySpeakerId').middleware(['auth'])
Route.get('/api/courses-price/:price_min/:price_max', 'CourseController.getCoursesByPrice').middleware(['auth'])
Route.get('/api/courses-date/:date', 'CourseController.getCoursesByDate').middleware(['auth'])
Route.get('/api/price-asc', 'CourseController.getPriceAsc').middleware(['auth'])
Route.get('/api/price-desc', 'CourseController.getPriceDesc').middleware(['auth'])
Route.get('/api/name-asc', 'CourseController.getNameAsc').middleware(['auth'])
Route.get('/api/name-desc', 'CourseController.getNameDesc').middleware(['auth'])
Route.post('/api/courses-image/:id', 'CourseController.saveImage').middleware(['auth'])
Route.post('/api/send-contact-email', 'SendEmailController.sendContactEmail').middleware(['auth'])

