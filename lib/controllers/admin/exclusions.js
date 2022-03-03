'use strict'

const debug = require('debug')('qms-tradingdesk-server:controller:admin:exclusions')
const error = require('debug')('qms-tradingdesk-server:controller:admin:exclusions:error')
const paginateHelper = require('../../helpers/paginate')
const exclusionRepository = require('../../repositories/exclusion')
const brandCategoryRepository = require('../../repositories/brandCategory')
const brandRepository = require('../../repositories/brand')
const codeTypeRepository = require('../../repositories/codeType')
const clubRepository = require('../../repositories/club')
const venueRepository = require('../../repositories/venue')
const assetTypeRepository = require('../../repositories/assetType')
const { removeTimestamps } = require('../../helpers/transformer')
const { processSimilarity, processBestMatch } = require('../../helpers/similarity')

module.exports = {
  create,
  view,
  update,
  list,
  del,
  validateImport
}

async function create (ctx, next) {
  debug(create.name)
  try {
    const created = await exclusionRepository.create(ctx.request.body)
    ctx.created(await exclusionRepository.findById(created.id))
  } catch (err) {
    error(create.name, err.inner || err)
    err.expose = true
    err.status = err.hasOwnProperty('status') ? err.status : 500
    throw err
  }
}

async function view (ctx, next) {
  debug(view.name)
  try {
    ctx.ok(ctx.state.exclusion)
  } catch (err) {
    error(view.name, err.inner || err)
    err.expose = true
    err.status = err.hasOwnProperty('status') ? err.status : 500
    throw err
  }
}

async function update (ctx, next) {
  debug(update.name)
  try {
    const { id } = ctx.params
    await exclusionRepository.update(id, ctx.request.body)
    ctx.ok(await exclusionRepository.findById(id))
  } catch (err) {
    error(update.name, err.inner || err)
    err.expose = true
    err.status = err.hasOwnProperty('status') ? err.status : 500
    throw err
  }
}

function getListParameters (ctx) {
  const { page, itemsPerPage } = paginateHelper.getUrlParameters(ctx)
  const {
    brandCategories,
    brands,
    codeTypes,
    codes,
    clubs,
    venues,
    assetTypes
  } = ctx.request.body
  return {
    page,
    itemsPerPage,
    brandCategories,
    brands,
    codeTypes,
    codes,
    clubs,
    venues,
    assetTypes
  }
}

async function list (ctx, next) {
  debug(list.name)
  try {
    const params = getListParameters(ctx)
    const result = await exclusionRepository.list(params.brandCategories, params.brands, params.codeTypes, params.codes, params.clubs, params.venues, params.assetTypes, params.page, params.itemsPerPage)
    ctx.ok({
      ...result,
      parameters: {
        ...ctx.request.query,
        ...ctx.request.body
      }
    })
  } catch (err) {
    error(list.name, err.inner || err)
    err.expose = true
    throw err
  }
}

async function del (ctx, next) {
  debug(del.name)
  try {
    const { id } = ctx.params
    await exclusionRepository.del(id)
    ctx.ok()
  } catch (err) {
    error(del.name, err.inner || err)
    err.expose = true
    throw err
  }
}

async function validateImport (ctx, next) {
  debug(validateImport.name)
  // ctx.request.body
  // Fetch all important flag to validate data
  const rowResult = await processImportCSV(ctx.request.body)

  // If validate pass then allow bulk upload
  if (rowResult.allowUpload) {
    rowResult.validateResult.map(result => {
      const request = {
        note: result.note,
        brandCategories: result.brandCategories.result.map(item => item.brandCategory.id),
        brands: result.brands.result.map(item => item.brand.id),
        clubs: result.clubs.result.map(item => item.club.id),
        codeTypes: result.codeTypes.result.map(item => item.codeType.id),
        venues: result.venues.result.map(item => item.venue.id),
        assetTypes: result.assetTypes.result.map(item => item.assetType.id)
      }
      exclusionRepository.create(request)
    })
  }

  ctx.ok(rowResult)
}

const processImportCSV = async (requestBody) => {
  debug(processImportCSV.name)
  const [
    rawBrandCategories,
    brands,
    codeTypes,
    clubs,
    venues,
    assetTypes
  ] = await Promise.all([
    // Fetch All BrandCategories
    await brandCategoryRepository.all(),
    // Fetch All Brands
    await brandRepository.all(),
    // Fetch All code types (event types)
    await codeTypeRepository.all(),
    // Fetch All Clubs
    await clubRepository.all(),
    // Fetch All venues
    await venueRepository.all(),
    // Fetch All Asset Types
    await assetTypeRepository.all()
  ])
  // Transform brandCategories
  const brandCategories = removeTimestamps(rawBrandCategories.rows.map((cat) => {
    cat.display_name = cat.parent_brand_category_id ? `${cat.parent_name} - ${cat.name}` : cat.name
    cat.name = cat.display_name
    return cat
  }))
  const rowResult = []
  let allowUpload = true
  let totalAutoApplyRecommend = 0
  requestBody.forEach(exclusion => {
    if (exclusion.length === 7) {
      // Index 0 is Brand Category
      // Index 1 is brands
      // Index 2 is codeTypes
      // Index 3 is clubs
      // Index 4 is venues
      // Index 5 is assetTyoes
      // Index 6 is Node
      const validatedResult = {
        rowError: false,
        rowRecommend: false,
        brandCategories: {
          request: exclusion[0],
          result: []
        },
        brands: {
          request: exclusion[1],
          result: []
        },
        codeTypes: {
          request: exclusion[2],
          result: []
        },
        clubs: {
          request: exclusion[3],
          result: []
        },
        venues: {
          request: exclusion[4],
          result: []
        },
        assetTypes: {
          request: exclusion[5],
          result: []
        },
        note: ''
      }
      // Check if not empty string and
      if (exclusion[0] !== '') {
        exclusion[0].split(';').map((brandCategory, index) => {
          const matchedResult = processBestMatch(brandCategory.toLowerCase(), brandCategories.map(brandCategory => brandCategory.display_name.toLowerCase()))
          const result = processSimilarity('brandCategory', matchedResult, brandCategory, brandCategories)
          validatedResult.brandCategories.result.push(result)
          if (result.isNotfound) {
            allowUpload = false
            validatedResult.rowError = true
          }

          if (result.recommend) {
            validatedResult.rowRecommend = true
            totalAutoApplyRecommend++
          }
        })
      }

      // Index 1 is Brand
      if (exclusion[1] !== '') {
        exclusion[1].split(';').map(importBrand => {
          const matchedResult = processBestMatch(importBrand.toLowerCase(), brands.map(brand => brand.name.toLowerCase()))
          const result = processSimilarity('brand', matchedResult, importBrand, brands)
          validatedResult.brands.result.push(result)
          if (result.isNotfound) {
            allowUpload = false
            validatedResult.rowError = true
          }

          if (result.recommend) {
            validatedResult.rowRecommend = true
            totalAutoApplyRecommend++
          }
        })
      }

      // Index 2 is Event Type
      if (exclusion[2] !== '') {
        exclusion[2].split(';').map(importEventType => {
          const matchedResult = processBestMatch(importEventType.toLowerCase(), codeTypes.map(codeType => codeType.name.toLowerCase()))
          const result = processSimilarity('codeType', matchedResult, importEventType, codeTypes)
          validatedResult.codeTypes.result.push(result)
          if (result.isNotfound) {
            allowUpload = false
            validatedResult.rowError = true
          }

          if (result.recommend) {
            validatedResult.rowRecommend = true
            totalAutoApplyRecommend++
          }
        })
      }

      // Index 3 is Club
      if (exclusion[3] !== '') {
        exclusion[3].split(';').map(importClub => {
          const matchedResult = processBestMatch(importClub.toLowerCase(), clubs.map(club => club.name.toLowerCase()))
          const result = processSimilarity('club', matchedResult, importClub, clubs)
          validatedResult.clubs.result.push(result)
          if (result.isNotfound) {
            allowUpload = false
            validatedResult.rowError = true
          }

          if (result.recommend) {
            validatedResult.rowRecommend = true
            totalAutoApplyRecommend++
          }
        })
      }

      // Index 4 is Venue
      if (exclusion[4] !== '') {
        exclusion[4].split(';').map(importVenue => {
          const matchedResult = processBestMatch(importVenue.toLowerCase(), venues.map(venues => venues.name.toLowerCase()))
          const result = processSimilarity('venue', matchedResult, importVenue, venues)
          validatedResult.venues.result.push(result)
          if (result.isNotfound) {
            allowUpload = false
            validatedResult.rowError = true
          }

          if (result.recommend) {
            validatedResult.rowRecommend = true
            totalAutoApplyRecommend++
          }
        })
      }
      // Index 5 is Asset Type
      if (exclusion[5] !== '') {
        exclusion[5].split(';').map(importAssetType => {
          const matchedResult = processBestMatch(importAssetType.toLowerCase(), assetTypes.map(assetType => assetType.name.toLowerCase()))
          const result = processSimilarity('assetType', matchedResult, importAssetType, assetTypes)
          validatedResult.assetTypes.result.push(result)
          if (result.isNotfound) {
            allowUpload = false
            validatedResult.rowError = true
          }

          if (result.recommend) {
            validatedResult.rowRecommend = true
            totalAutoApplyRecommend++
          }
        })
      }
      validatedResult.note = exclusion[6]
      rowResult.push(validatedResult)
    } else if (exclusion.length !== 1) {
      allowUpload = false
    }
  })
  return {
    allowUpload,
    totalAutoApplyRecommend,
    validateResult: rowResult
  }
}
