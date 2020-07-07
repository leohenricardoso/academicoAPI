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

or manually clone the repo and then run `npm install`.

### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

## Routes Api
Download export insomnia
https://drive.google.com/file/d/1_MbBvyHNeFEcz_M4uLoHUj48fa9gvfHv/view?usp=sharing
### Contact
```
Post -> /api/contact
Delete -> /api/contact/:id
Update -> /api/contact/:id
Get -> /api/contact/:id
Get -> /api/contact/
```
### Newsletter
```
Post -> /api/newsletter
Delete -> /api/newsletter/:id
Update -> /api/newsletter/:id
Get -> /api/newsletter/:id
Get -> /api/newsletter/
```
### BusinessContact
```
Post -> /api/business-contact
Delete -> /api/business-contact/:id
Update -> /api/business-contact/:id
Get -> /api/business-contact/:id
Get -> /api/business-contact/
```
### PaymentPagarme
```
Post -> /api/paymentpagarme
Delete -> /api/paymentpagarme/:id
Update -> /api/paymentpagarme/:id
Get -> /api/paymentpagarme/:id
Get -> /api/paymentpagarme/
```
### Course
```
Post -> /api/course
Delete -> /api/course/:id
Update -> /api/course/:id
Get -> /api/course/:id
Get -> /api/course/
```
### CourseType
```
Post -> /api/course-type
Delete -> /api/course-type/:id
Update -> /api/course-type/:id
Get -> /api/course-type/:id
Get -> /api/course-type/
```
### CourseCategory
```
Post -> /api/course-category
Delete -> /api/course-category/:id
Update -> /api/course-category/:id
Get -> /api/course-category/:id
Get -> /api/course-category/
```
### CourseSpeaker
```
Post -> /api/speaker
Delete -> /api/speaker/:id
Update -> /api/speaker/:id
Get -> /api/speaker/:id
Get -> /api/speaker/
```

### Student
```
Post -> /api/student
Delete -> /api/student/:id
Update -> /api/student/:id
Get -> /api/student/:id
Get -> /api/student/
```

### MyCourse
```
Post -> /api/my-course
Delete -> /api/my-course/:id
Update -> /api/my-course/:id
Get -> /api/my-course/:id
Get -> /api/my-course/
```

