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

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

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

