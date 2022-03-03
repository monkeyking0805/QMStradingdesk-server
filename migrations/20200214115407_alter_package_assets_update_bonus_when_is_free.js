exports.up = (knex, promise) => {
  return knex.select()
    .from('packages_assets')
    .then((packages) => {
      const packageData = packages.map((item) => {
        return { asset_id: item.asset_id, package_id: item.package_id, slots: item.slots, isFree: item.is_free }
      })
      return knex.transaction((trx) => {
        return knex('packages_assets')
          .transacting(trx)
          .then(() => {
            return (promise || Promise).all(
              packageData.map((row) => {
                return knex('packages_assets')
                  .update({ bonus: row.isFree ? row.slots : 0 })
                  .where({
                    package_id: row.package_id,
                    asset_id: row.asset_id
                  })
                  .transacting(trx)
              })
            )
          })
          .then(trx.commit)
          .catch(trx.rollback)
      })
    })
}

exports.down = (knex, Promise) => {}
