exports.up = (knex, promise) => {
  return knex.select()
    .from('packages_assets')
    .then((packages) => {
      const packageData = packages.map((item) => {
        return { asset_id: item.asset_id, package_id: item.package_id, market_rate: item.market_rate, discount: item.discount }
      })
      return knex.transaction((trx) => {
        return knex('packages_assets')
          .transacting(trx)
          .then(() => {
            return (promise || Promise).all(
              packageData.map((row) => {
                const newRate = row.market_rate - ((row.market_rate * row.discount) / 100)
                return knex('packages_assets')
                  .update({ market_rate: newRate })
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
