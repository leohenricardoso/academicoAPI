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
