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
  return { greeting: 'You are in frontend section' }
})
/** User Admin */
Route.post('/api/admin-user-register', 'AuthUserAdminController.register')    // Free
Route.post('/api/admin-user-authenticate', 'AuthUserAdminController.authenticate')    // Free

/** Course Category */
Route.get('/api/course-category', 'CourseCategoryController.index')   // Free
Route.get('/api/course-category/:id', 'CourseCategoryController.show')    // Free
Route.get('/api/course-category-admin/:pages/:limit', 'CourseCategoryController.getCategories') // Free
Route.post('/api/course-category', 'CourseCategoryController.store').middleware('auth:admin')   // Admin
Route.put('/api/course-category/:id', 'CourseCategoryController.update').middleware('auth:admin')   // Admin
Route.delete('/api/course-category/:id', 'CourseCategoryController.destroy').middleware('auth:admin')   // Admin

/** Newsletter */
Route.post('/api/newsletter', 'NewsletterController.store')   // Free

/** Speaker */
Route.get('/api/speaker', 'CourseSpeakerController.index')   // Free
Route.get('/api/speaker/:id', 'CourseSpeakerController.show')   // Free
Route.post('/api/speaker', 'CourseSpeakerController.store').middleware('auth:admin')   // Admin
Route.put('/api/speaker/:id', 'CourseSpeakerController.update').middleware('auth:admin')   // Admin
Route.delete('/api/speaker/:id', 'CourseSpeakerController.destroy').middleware('auth:admin')   // Admin
Route.get('/api/get-speakers/:pages/:limit', 'CourseSpeakerController.getSpeakers') // Free
Route.post('/api/get-speaker-name/:pages/:limit', 'CourseSpeakerController.getSpeakersByName') // Free
Route.post('/api/speaker-image/:id', 'CourseSpeakerController.saveImage').middleware('auth:admin')   // Admin
Route.get('/api/speaker-image/:path', 'CourseSpeakerController.downloadImage')    // Free

/** Contact */
Route.get('/api/contact', 'ContactController.index').middleware('auth:admin')   // Admin
Route.get('/api/contact/:id', 'ContactController.show').middleware('auth:admin')   // Admin
Route.post('/api/contact', 'ContactController.store') // Free
Route.put('/api/contact/:id', 'ContactController.update').middleware('auth:admin')   // Admin
Route.delete('/api/contact/:id', 'ContactController.destroy').middleware('auth:admin')   // Admin
Route.get('/api/get-contacts/:pages/:limit', 'ContactController.getContacts').middleware('auth:admin')   // Admin

/** Course */
Route.get('/api/course', 'CourseController.index')   // Free
Route.get('/api/course/:id', 'CourseController.show')    // Free
Route.post('/api/course', 'CourseController.store').middleware('auth:admin')   // Admin
Route.put('/api/course/:id', 'CourseController.update').middleware('auth:admin')   // Admin
Route.delete('/api/course/:id', 'CourseController.destroy').middleware('auth:admin')   // Admin
Route.get('/api/name-asc-not-active/:pages/:limit', 'CourseController.getNameAscNotActive')     // Free
Route.get('/api/name-asc/:pages/:limit', 'CourseController.getNameAsc')     // Free
Route.post('/api/courses-image/:id', 'CourseController.saveImage').middleware('auth:admin')   // Admin
Route.get('/api/courses-image/:path', 'CourseController.downloadImage')    // Free
Route.post('/api/filterCourse/:pages/:limit', 'CourseController.getCoursesFilter')    // Free
Route.get('/api/course/highlight/:pages/:limit', 'CourseController.getHighlight')    // Free
Route.get('/api/course/recorded/:pages/:limit', 'CourseController.getRecorded')    // Free

/** Course Type */
Route.get('/api/course-type', 'CourseTypeController.index')   // Free
Route.get('/api/course-type/:id', 'CourseTypeController.show')    // Free
Route.get('/api/course-type-admin/:pages/:limit', 'CourseTypeController.getTypes') // Free
Route.post('/api/course-type', 'CourseTypeController.store').middleware('auth:admin')   // Admin
Route.put('/api/course-type/:id', 'CourseTypeController.update').middleware('auth:admin')   // Admin
Route.delete('/api/course-type/:id', 'CourseTypeController.destroy').middleware('auth:admin')   // Admin

/** Student *//*
Route.get('/api/student', 'StudentController.index').middleware('auth:admin')   // Admin
Route.get('/api/student/:id', 'StudentController.show').middleware('auth:admin')   // Admin
Route.post('/api/student', 'StudentController.store').middleware('auth:admin')   // Admin
Route.put('/api/student/:id', 'StudentController.update').middleware('auth:admin')   // Admin
Route.delete('/api/student/:id', 'StudentController.destroy').middleware('auth:admin')   // Admin
*/
/** My Courses *//*
Route.get('/api/my-course', 'MyCourseController.index').middleware('auth:admin')   // Admin
Route.get('/api/my-course/:id', 'MyCourseController.show').middleware('auth:admin')   // Admin
Route.post('/api/my-course', 'MyCourseController.store').middleware('auth:admin')   // Admin
Route.put('/api/my-course/:id', 'MyCourseController.update').middleware('auth:admin')   // Admin
Route.delete('/api/my-course/:id', 'MyCourseController.destroy').middleware('auth:admin')   // Admin
*/

/** Banners */
Route.get('/api/banner', 'BannerController.index')   // Free
Route.get('/api/banner/:id', 'BannerController.show')    // Free
Route.post('/api/banner', 'BannerController.store').middleware('auth:admin')   // Admin
Route.put('/api/banner/:id', 'BannerController.update').middleware('auth:admin')   // Admin
Route.delete('/api/banner/:id', 'BannerController.destroy').middleware('auth:admin')   // Admin
Route.post('/api/banner/save-image', 'BannerController.saveImage').middleware('auth:admin')   // Admin
Route.get('/api/images/:path', 'BannerController.downloadImage')    // Free

/** Email */
Route.post('/api/send-contact-email', 'SendEmailController.sendContactEmail').middleware('auth:admin')   // Admin
Route.post('/api/send-buy-email/:courseId', 'SendEmailController.sendShopEmail')   // Free
Route.post('/api/send-course-invite-qrcode/:courseId/:studentId', 'SendEmailController.sendInviteToPresentialCourse').middleware('auth:admin')   // Admin
Route.post('/api/send-link-manual', 'SendEmailController.sendCourseLinkEmailByAdmin').middleware('auth:admin')   // Admin

/** Mercado Pago */
Route.post('/api/mercadopago/cc_create', 'MercadoPagoController.createPayment')   // Free
Route.get('/api/mercadopago', 'MercadoPagoController.index').middleware('auth:admin')
Route.get('/api/mercadopago/credit/:pages/:limit', 'MercadoPagoController.getCreditCards').middleware('auth:admin')    // Admin
Route.get('/api/mercadopago/credit-process/:pages/:limit', 'MercadoPagoController.getProcessPayments').middleware('auth:admin')    // Admin
Route.get('/api/mercadopago/:id', 'MercadoPagoController.show').middleware('auth:admin')   // Admin
Route.get('/api/mercadopago/pending-invite-link/:pages/:limit', 'MercadoPagoController.getPendingInvite').middleware('auth:admin')    // Admin
Route.post('/api/mercadopago', 'MercadoPagoController.store').middleware('auth:admin')   // Admin
Route.put('/api/mercadopago/:id', 'MercadoPagoController.update').middleware('auth:admin')   // Admin
Route.delete('/api/mercadopago/:id', 'MercadoPagoController.destroy').middleware('auth:admin')   // Admin
Route.post('/api/mercadopago-pro', 'MercadoPagoController.checkoutPro')   // Free
Route.post('/api/mercadopago-postback', 'MercadoPagoController.postbackMP')   // Free
Route.post('/api/mercadopago-update', 'MercadoPagoController.updatePaymentStatus')   // Free
