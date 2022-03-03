'use strict'
const createRepositoryService = require('../repository')
const packageRepository = createRepositoryService('packages')
const randid = require('../../helpers/randid')
const { removeTimestamps } = require('../../helpers/transformer')

module.exports = {
  createPackagesSql,
  createClient,
  createPackage,
  bindBrandCategoriesToPackage,
  bindAssetToPackage,
  countAll,
  list,
  archive,
  restore,
  exportList,
  getPackageStatus,
  deletePackagesAssets,
  deletePackagesBrandCategories,
  updatePackages
}

function createPackagesSql (conditionsString, orderByColumn, limitStatement, search = '') {
  return `
    WITH packages_brand_categories AS (
      SELECT
        package_id,
        ARRAY_AGG((SELECT categories FROM (SELECT brand_categories.id,brand_categories.name) categories)) brand_categories
      FROM
        packages_brand_categories
      INNER JOIN
        brand_categories ON brand_categories.id=packages_brand_categories.brand_category_id
      GROUP BY
        packages_brand_categories.package_id
    ),asset_units AS (
      SELECT
        asset_units.id,
        asset_units.name,
        asset_units.cost,
        asset_units.duration,
        asset_units.price_fta,
        asset_units.price_ppv,
        asset_units.price_min,
        asset_units.fee_production,
        asset_units.fee_installation,
        JSON_AGG((SELECT links FROM (SELECT asset_unit_links.id,asset_unit_links.link) links)) links
      FROM
        asset_units
      LEFT JOIN
        asset_unit_links ON asset_unit_links.asset_unit_id=asset_units.id AND TRIM(asset_unit_links.link) <> ''
      GROUP BY
        asset_units.id
    ), events AS (
      SELECT
        events.id,
        events.name,
        events.start_date,
        events.end_date,
        events.description,
        events.round,
        COALESCE(events.is_fta, FALSE) is_fta,
        COALESCE(events.is_ppv, FALSE) is_ppv,
        ROW_TO_JSON((SELECT sportCode FROM (SELECT codes.id,codes.name) sportCode)) event_code,
        ROW_TO_JSON((SELECT codeType FROM (SELECT code_types.id,code_types.name) codetype)) event_code_type,
        ROW_TO_JSON((SELECT venue FROM (SELECT venues.id,venues.name) venue)) event_venue,
        ROW_TO_JSON((SELECT hostClub FROM (SELECT clubs.id,clubs.name) hostClub)) event_host_club,
        ROW_TO_JSON((SELECT region FROM (SELECT regions.id,regions.name) region)) event_region,
        ROW_TO_JSON((SELECT country FROM (SELECT countries.id,countries.name) country)) event_country
      FROM
        events
      LEFT JOIN
        code_types ON code_types.id=events.code_type_id
      LEFT JOIN
        codes ON codes.id=code_types.code_id
      LEFT JOIN
        venues ON venues.id=events.venue_id
      LEFT JOIN
        clubs ON clubs.id=events.host_club_id
      LEFT JOIN
        regions ON regions.id=events.region_id
      LEFT JOIN
        countries ON countries.id=regions.country_id
    ),assets AS (
      SELECT
        assets.id,
        ROW_TO_JSON((SELECT assets FROM (
          SELECT
            assets.id,
            assets.slots - COALESCE(booked_assets.slots, 0) slots_available,
            assets.event_id,
            CASE WHEN events.is_fta THEN asset_units.price_fta ELSE asset_units.price_ppv END rate,
            (CASE WHEN events.is_fta THEN asset_units.price_fta ELSE asset_units.price_ppv END + COALESCE(asset_units.fee_installation, 0) + COALESCE(asset_units.fee_production, 0)) price,
            ROW_TO_JSON((SELECT assetType FROM (SELECT asset_types.id,asset_types.name) assetType)) asset_type,
            ROW_TO_JSON((SELECT assetUnit FROM (
              SELECT
                asset_units.id,
                asset_units.name,
                asset_units.cost,
                asset_units.links,
                asset_units.duration,
                asset_units.price_fta,
                asset_units.price_ppv,
                asset_units.price_min,
                asset_units.fee_production,
                asset_units.fee_installation) assetUnit
            )) asset_unit,
            ROW_TO_JSON(events) asset_event
          ) assets)) asset
      FROM
        assets
      INNER JOIN
        asset_types ON asset_types.id=assets.asset_type_id
      INNER JOIN
        asset_units ON asset_units.id=assets.asset_unit_id
      INNER JOIN
        events ON events.id=assets.event_id
      LEFT JOIN
        (SELECT
          packages_assets.asset_id,
          SUM(packages_assets.slots) slots
        FROM
          packages_assets
        INNER JOIN
          packages ON packages.id=packages_assets.package_id
        INNER JOIN
          package_statuses ON package_statuses.id=packages.package_status_id
        WHERE
          package_statuses.name='approved'
        GROUP BY
          packages_assets.asset_id) booked_assets ON booked_assets.asset_id=assets.id
    ),packages AS (
      SELECT
        packages.id,
        packages.name,
        packages.reference_id,
        packages.notes,
        packages.package_status_id,
        packages.user_id,
        packages.archive,
        packages.created_at,
        packages.client_id,
        MIN(asset_event_startend.event_first_date) event_first_date,
        MAX(asset_event_startend.event_last_date) event_last_date,
        json_agg((SELECT packages_assets FROM (
          SELECT
            packages_assets.id,
            packages_assets.asset_id,
            packages_assets.slots,
            packages_assets.bonus,
            packages_assets.production_cost,
            packages_assets.installation_cost,
            packages_assets.market_rate,
            assets.asset
        ) packages_assets)) selected_assets
      FROM
        packages
      INNER JOIN
        packages_assets ON packages_assets.package_id=packages.id
      INNER JOIN
        assets ON assets.id=packages_assets.asset_id
      INNER JOIN
        (SELECT
          assets.id,
          LEAST(events.start_date,events.end_date) event_first_date,
          GREATEST(events.start_date,events.end_date) event_last_date
        FROM
          public.assets
        INNER JOIN
          events ON events.id=assets.event_id) asset_event_startend ON asset_event_startend.id=packages_assets.asset_id
      ${search}
      GROUP BY
        packages.id
    )
    SELECT
      packages.id,
      packages.name,
      packages.reference_id,
      packages.notes,
      packages.event_first_date,
      packages.event_last_date,
      ARRAY_TO_JSON(COALESCE(packages_brand_categories.brand_categories, '{}')) brand_categories,
      ROW_TO_JSON((SELECT client FROM (
        SELECT
          clients.id,
          clients.company_name,
          clients.firstname,
          clients.lastname,
          clients.agency_name
      ) client)) client,
      package_statuses.name status,
      packages.selected_assets,
      packages.user_id,
      packages.archive,
      ROW_TO_JSON((SELECT "user" FROM (
        SELECT
          users.id,
          users.email,
          users.firstname,
          users.lastname,
          users.region_id
      ) "user")) "user"
    FROM
      packages
    INNER JOIN
      package_statuses ON package_statuses.id=packages.package_status_id
    LEFT JOIN
      packages_brand_categories ON packages_brand_categories.package_id=packages.id
    INNER JOIN
      clients ON clients.id=packages.client_id
    INNER JOIN
      users ON users.id=packages.user_id
    ${conditionsString}
    ORDER BY
      ${orderByColumn}
    ${limitStatement}`
}

function createClient (trx, statusName) {
  return ([client]) => {
    return new Promise(function (resolve) {
      trx('package_statuses')
        .where('name', statusName)
        .then(([packageStatus]) => resolve({
          client,
          packageStatus
        }))
    })
  }
}

function createPackage (trx, name, notes, user) {
  return (clientAndStatus) => {
    return trx('packages')
      .returning('*')
      .insert({
        name,
        package_status_id: clientAndStatus.packageStatus.id,
        user_id: user.id,
        client_id: clientAndStatus.client.id,
        reference_id: randid(),
        notes
      })
  }
}

function bindBrandCategoriesToPackage (trx, brandCategoryIds) {
  return ([insertedPackage]) => {
    return new Promise((resolve) => {
      const data = []
      for (const brandCategoryId of brandCategoryIds) {
        data.push({
          package_id: insertedPackage.id,
          brand_category_id: brandCategoryId
        })
      }
      trx('packages_brand_categories')
        .insert(data)
        .then((ignored) => {
          insertedPackage.brand_categories = brandCategoryIds
          return resolve([insertedPackage])
        })
    })
  }
}

function bindAssetToPackage (trx, assets) {
  return ([insertedPackage]) => {
    const preparedAssets = assets.map((asset) => (
      {
        package_id: insertedPackage.id,
        asset_id: asset.asset_id,
        slots: asset.slots,
        bonus: asset.bonus,
        market_rate: asset.rate,
        production_cost: asset.fees.production,
        installation_cost: asset.fees.installation
      }
    ))
    return new Promise(function (resolve) {
      trx('packages_assets')
        .returning('*')
        .insert(preparedAssets)
        .then((insertedAssets) => {
          insertedPackage.assets = insertedAssets.map((asset) => removeTimestamps(asset))
          resolve(insertedPackage)
        })
    })
  }
}

function countAll (packageRepository, ownerUserId, search, archive) {
  let builder = packageRepository.getConnection()('packages')
  builder = builder.where('archive', archive.length !== 0 ? archive : 'FALSE')
  builder = builder.whereRaw('LOWER(name) LIKE ?', [`%${search.toLowerCase()}%`])
  if (ownerUserId) {
    builder = builder.where('user_id', ownerUserId)
  }
  return builder.count('id').first()
}

function list (packageRepository, ownerUserId, page, itemsPerPage, orderBy, search, archive) {
  const connection = packageRepository.getConnection()
  const params = []
  let filterUser = ''
  let filterPackageName = ''
  if (ownerUserId) {
    filterUser = `WHERE packages.user_id=? AND packages.archive=${archive === 'TRUE' ? 'TRUE' : 'FALSE'}`
    params.unshift(ownerUserId)
  }
  if (!ownerUserId) {
    filterUser = 'WHERE packages.archive=?'
    params.unshift(archive === 'TRUE' ? 'TRUE' : 'FALSE')
  }
  if (search) {
    filterPackageName = connection.raw('WHERE LOWER(packages.name) LIKE ?', ['%' + search.toLowerCase() + '%'])
  }
  const sql = createPackagesSql(
    connection.raw(filterUser, ...params),
    orderBy,
    `LIMIT ${itemsPerPage} OFFSET ${itemsPerPage} * ${page - 1}`,
    filterPackageName
  )
  return connection.raw(sql)
}

async function archive (id) {
  const updated = await packageRepository.getConnection()('packages')
    .returning('*')
    .where('id', id)
    .update({
      archive: true
    })
  return updated[0]
}

async function restore (id) {
  const updated = await packageRepository.getConnection()('packages')
    .returning('*')
    .where('id', id)
    .update({
      archive: false
    })
  return updated[0]
}

function exportList (packageRepository, ownerUserId, page, itemsPerPage, orderBy, search) {
  const connection = packageRepository.getConnection()
  const params = []
  const filterUser = 'WHERE packages.package_status_id = 3 '
  let filterPackageName = ''
  if (search) {
    filterPackageName = connection.raw('WHERE LOWER(packages.name) LIKE ?', ['%' + search.toLowerCase() + '%'])
  }
  const sql = createPackagesSql(
    connection.raw(filterUser, ...params),
    orderBy,
    `LIMIT ${itemsPerPage} OFFSET ${itemsPerPage} * ${page - 1}`,
    filterPackageName
  )
  return connection.raw(sql)
}

function getPackageStatus (trx, statusName) {
  return () => trx('package_statuses')
    .where('name', statusName)
    .first()
}

function deletePackagesAssets (trx, packageId) {
  return () => trx('packages_assets')
    .where('package_id', packageId)
    .delete()
}

function deletePackagesBrandCategories (trx, packageId) {
  return () => trx('packages_brand_categories')
    .where('package_id', packageId)
    .delete()
}

function updatePackages (trx, packageId, name, notes, newPackageStatusId = 0) {
  const data = {
    name,
    notes,
    updated_at: trx.fn.now()
  }
  if (newPackageStatusId) {
    data.package_status_id = newPackageStatusId
  }
  return () => trx('packages')
    .returning('*')
    .where('id', packageId)
    .update(data)
}
