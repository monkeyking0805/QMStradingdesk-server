'use strict'

module.exports = {
  app: {
    start: 'app started successfully',
    health: {
      path: '/health'
    }
  },
  /*
  Available rules
  {
    min: 10,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 2,
  }
  */
  passwordRules: {
    min: 8,
    numeric: 1,
    requirementCount: 3
  },
  roleKeys: {
    admin: 'admin',
    sales: 'sales'
  },
  email: {
    passwordReset: {
      subject: 'Password reset instruction'
    },
    emailUpdate: {
      subject: 'Email changing confirmation'
    },
    scheduleSubmitted: {
      subject: (packageName) => `Schedule Submitted - ${packageName}`
    },
    scheduleConfirmed: {
      subject: (packageName) => `Schedule Confirmed - ${packageName}`
    }
  },
  // These will be used to generate link to client forms
  clientRequestPaths: {
    passwordReset: (uuid) => `/resetpassword/${uuid}`,
    emailUpdate: (uuid) => `/profile/resetemail/${uuid}`,
    packageView: (packageId) => `/packages/view/${packageId}`
  },
  validSearchParameters: {
    asset: [
      'brand_category_id',
      'code_id',
      'start_date',
      'end_date',
      'region_id',
      'club_id',
      'venue_id',
      'asset_type_id',
      'only_available_asset'
    ]
  },
  packageStatuses: {
    draft: 'draft',
    submitted: 'submitted',
    approved: 'approved'
  },
  packageListOrderByColumns: {
    id: 'packages.id DESC',
    name: 'LOWER(packages.name)',
    created_at: 'packages.created_at',
    name_desc: 'LOWER(packages.name) DESC',
    created_at_desc: 'packages.created_at DESC',
    client: 'LOWER(clients.company_name),LOWER(clients.firstname),LOWER(COALESCE(clients.lastname,\'\'))',
    client_desc: 'LOWER(clients.company_name) DESC,LOWER(clients.firstname) DESC,LOWER(COALESCE(clients.lastname,\'\')) DESC',
    user: 'LOWER(users.firstname),LOWER(users.lastname)',
    user_desc: 'LOWER(users.firstname) DESC,LOWER(users.lastname) DESC',
    status: 'package_statuses.name',
    status_desc: 'package_statuses.name DESC',
    bookingdate: 'packages.event_first_date,packages.event_last_date',
    bookingdate_desc: 'packages.event_first_date DESC,packages.event_last_date DESC'
  },
  paginateDefault: {
    itemsPerPage: {
      min: 10,
      max: 100
    }
  },
  routeNames: {
    packages: {
      update: 'package-update',
      archive: 'package-archive',
      submitUpdate: 'package-submit-update',
      saveNew: 'package-save-new',
      submitNew: 'package-submit-new'
    }
  },
  userListOrderByColumns: {
    name: 'LOWER(users.firstname), LOWER(COALESCE(users.lastname, \'\'))',
    name_desc: 'LOWER(users.firstname) DESC, LOWER(COALESCE(users.lastname, \'\')) DESC',
    role: 'roles.name',
    role_desc: 'roles.name DESC'
  },
  userUpdatableColumns: {
    firstname: 'firstname',
    lastname: 'lastname',
    country: 'country_id',
    region: 'region_id',
    timezone: 'timezone_id',
    language: 'language_id',
    is_disabled: 'is_disabled',
    phone: 'phone'
  },
  assetUnitsOrderByColumns: {
    id: 'id DESC',
    name: 'LOWER(asset_units.name)',
    name_desc: 'LOWER(asset_units.name) DESC',
    price_fta: 'asset_units.price_fta',
    price_fta_desc: 'asset_units.price_fta DESC',
    price_ppv: 'asset_units.price_ppv',
    price_ppv_desc: 'asset_units.price_ppv DESC'
  },
  assetsOrderByColumns: {
    id: 'id DESC',
    asset_type: 'LOWER(asset_types.name)',
    asset_type_desc: 'LOWER(asset_types.name) DESC',
    asset_unit: 'LOWER(asset_units.name)',
    asset_unit_desc: 'LOWER(asset_units.name) DESC',
    event: 'LOWER(events.name)',
    event_desc: 'LOWER(events.name) DESC'
  },
  eventsOrderByColumns: {
    id: 'id DESC',
    name: 'LOWER(events.name)',
    name_desc: 'LOWER(events.name) DESC',
    start_date: 'events.start_date'
  }
}
