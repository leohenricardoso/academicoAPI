<table align="center" >
    <tr>
        <td>
            <img src="https://scontent.fldb3-1.fna.fbcdn.net/v/t1.0-9/53021185_1408666499275512_17328144339959808_o.jpg?_nc_cat=110&_nc_sid=09cbfe&_nc_ohc=VgoEf3I7xXkAX86YC2t&_nc_ht=scontent.fldb3-1.fna&oh=506e420af1916588e8d5526da15bc9ea&oe=5F24495C" height="70px" width="70px">
        </td>
        <td>
            <h1 style="font-weight:bold">ACADÊMICO</h1>
        </td>
    </tr>
</table>

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick --api-only
```

Init

```bash
adonis serve --dev
```

```js
adonis migration:run
```

```
Mercado Pago Credencial
Public Key: TEST-5d019c37-215a-482e-95f8-0034b3c28b01
Access Token: TEST-1253996926905747-071622-5a7906c929ecf8dfc4d05b898e8dc34d-188258831
```

### Front-end static
Home - https://leohenrique.me/project/academico/#/
Página do curso - https://leohenrique.me/project/academico/#/course
Página de pagamento do curso - https://leohenrique.me/project/academico/#/payment
Página de cursos - https://leohenrique.me/project/academico/#/courses
Página de contato - https://leohenrique.me/project/academico/#/contacts
Página Quem somos - https://leohenrique.me/project/academico/#/about
Login para admin - https://leohenrique.me/project/academico/#/admin
Página de gerenciamento de pagamentos (admin) - https://leohenrique.me/project/academico/#/admin/payments
Página de listagem de cursos cadastrados - https://leohenrique.me/project/academico/#/admin/courses
Página para gerenciamento de contatos no admin- https://leohenrique.me/project/academico/#/admin/contacts

## Routes Api
Download export insomnia
https://drive.google.com/file/d/1_MbBvyHNeFEcz_M4uLoHUj48fa9gvfHv/view?usp=sharing

/** User Admin */
##### Route.post('/api/admin-user-register', 'AuthUserAdminController.register')    // Free
##### Route.post('/api/admin-user-authenticate', 'AuthUserAdminController.authenticate')    // Free

/** Course Category */
##### Route.get('/api/course-category', 'CourseCategoryController.index')   // Free
##### Route.get('/api/course-category/:id', 'CourseCategoryController.show')    // Free
##### Route.post('/api/course-category', 'CourseCategoryController.store').middleware('auth:admin')   // Admin
##### Route.put('/api/course-category/:id', 'CourseCategoryController.update').middleware('auth:admin')   // Admin
##### Route.delete('/api/course-category/:id', 'CourseCategoryController.destroy').middleware('auth:admin')   // Admin

/** Newsletter */
##### Route.post('/api/newsletter', 'NewsletterController.store')   // Free

/** Speaker */
##### Route.get('/api/speaker', 'CourseSpeakerController.index')   // Free
##### Route.get('/api/speaker/:id', 'CourseSpeakerController.show')   // Free
##### Route.post('/api/speaker', 'CourseSpeakerController.store').middleware('auth:admin')   // Admin
##### Route.put('/api/speaker/:id', 'CourseSpeakerController.update').middleware('auth:admin')   // Admin
##### Route.delete('/api/speaker/:id', 'CourseSpeakerController.destroy').middleware('auth:admin')   // Admin
##### Route.get('/api/get-speakers/:pages/:limit', 'CourseSpeakerController.getSpeakers') // Free
##### Route.post('/api/get-speaker-name/:pages/:limit', 'CourseSpeakerController.getSpeakersByName') // Free

/** Contact */
##### Route.get('/api/contact', 'ContactController.index').middleware('auth:admin')   // Admin
##### Route.get('/api/contact/:id', 'ContactController.show').middleware('auth:admin')   // Admin
##### Route.post('/api/contact', 'ContactController.store') // Free
##### Route.put('/api/contact/:id', 'ContactController.update').middleware('auth:admin')   // Admin
##### Route.delete('/api/contact/:id', 'ContactController.destroy').middleware('auth:admin')   // Admin
##### Route.get('/api/get-contacts/:pages/:limit', 'ContactController.getContacts').middleware('auth:admin')   // Admin

/** Course */
##### Route.get('/api/course', 'CourseController.index')   // Free
##### Route.get('/api/course/:id', 'CourseController.show')    // Free
##### Route.post('/api/course', 'CourseController.store').middleware('auth:admin')   // Admin
##### Route.put('/api/course/:id', 'CourseController.update').middleware('auth:admin')   // Admin
##### Route.delete('/api/course/:id', 'CourseController.destroy').middleware('auth:admin')   // Admin
##### Route.get('/api/name-asc/:pages/:limit', 'CourseController.getNameAsc')    // Free
##### Route.post('/api/courses-image/:id', 'CourseController.saveImage').middleware('auth:admin')   // Admin
##### Route.get('/api/courses-image/:path', 'CourseController.downloadImage')    // Free
##### Route.post('/api/filterCourse/:pages/:limit', 'CourseController.getCoursesFilter')    // Free
##### Route.get('/api/course/highlight/:pages/:limit', 'CourseController.getHighlight')    // Free
##### Route.get('/api/course/recorded/:pages/:limit', 'CourseController.getRecorded')    // Free

/** Course Type */
##### Route.get('/api/course-type', 'CourseTypeController.index')   // Free
##### Route.get('/api/course-type/:id', 'CourseTypeController.show')    // Free
##### Route.post('/api/course-type', 'CourseTypeController.store').middleware('auth:admin')   // Admin
##### Route.put('/api/course-type/:id', 'CourseTypeController.update').middleware('auth:admin')   // Admin
##### Route.delete('/api/course-type/:id', 'CourseTypeController.destroy').middleware('auth:admin')   // Admin

/** Banners */
##### Route.get('/api/banner', 'BannerController.index')   // Free
##### Route.get('/api/banner/:id', 'BannerController.show')    // Free
##### Route.post('/api/banner', 'BannerController.store').middleware('auth:admin')   // Admin
##### Route.put('/api/banner/:id', 'BannerController.update').middleware('auth:admin')   // Admin
##### Route.delete('/api/banner/:id', 'BannerController.destroy').middleware('auth:admin')   // Admin
##### Route.post('/api/banner/save-image', 'BannerController.saveImage').middleware('auth:admin')   // Admin
##### Route.get('/api/images/:path', 'BannerController.downloadImage')    // Free

/** Email */
##### Route.post('/api/send-contact-email', 'SendEmailController.sendContactEmail').middleware('auth:admin')   // Admin
##### Route.post('/api/send-buy-email/:courseId', 'SendEmailController.sendShopEmail')   // Free
##### Route.post('/api/send-course-invite-qrcode/:courseId/:studentId', 'SendEmailController.sendInviteToPresentialCourse').middleware('auth:admin')   // Admin

/** Mercado Pago */
##### Route.post('/api/mercadopago/cc_create', 'MercadoPagoController.createPayment')   // Free
##### Route.get('/api/mercadopago', 'MercadoPagoController.index').middleware('auth:admin')   // Admin
##### Route.get('/api/mercadopago/:id', 'MercadoPagoController.show').middleware('auth:admin')   // Admin
##### Route.post('/api/mercadopago', 'MercadoPagoController.store').middleware('auth:admin')   // Admin
##### Route.put('/api/mercadopago/:id', 'MercadoPagoController.update').middleware('auth:admin')   // Admin
##### Route.delete('/api/mercadopago/:id', 'MercadoPagoController.destroy').middleware('auth:admin')   // Admin

