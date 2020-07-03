<table>
    <tr>
        <td>
            <img src="https://scontent.fldb3-1.fna.fbcdn.net/v/t1.0-9/53021185_1408666499275512_17328144339959808_o.jpg?_nc_cat=110&_nc_sid=09cbfe&_nc_ohc=VgoEf3I7xXkAX86YC2t&_nc_ht=scontent.fldb3-1.fna&oh=506e420af1916588e8d5526da15bc9ea&oe=5F24495C" height="70px" width="70px">
        </td>
        <td>
            <h1 style="font-weight:bold">Academico</h1>
        </td>
    </tr>
</table>

# Adonis API application

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick --api-only
```

or manually clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```
## Routes Api

### Contact
```
Post -> /api/contact
Delete -> /api/contact/:id
Update -> /api/contact/:id
Get -> /api/contact/:id
Get -> /api/contact/
```

