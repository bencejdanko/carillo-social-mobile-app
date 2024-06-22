migrate((db) => {
    const dao = new Dao(db)

    let admin = new Admin()
    admin.email = process.env.CAR_RILLO_ADMIN_EMAIL
    admin.setPassword(process.env.CAR_RILLO_ADMIN_PASSWORD)
    dao.saveAdmin(admin)
})