exports.seed = async function (knex, Promise) {
  // Manipulate sequence to be synced with manually seed data
  await knex.raw('SELECT setval(\'brand_categories_id_seq\', 428)')

  return knex('brand_categories').insert([
    {
      id: 1,
      parent_brand_category_id: null,
      name: 'Accessories'
    },
    {
      id: 2,
      parent_brand_category_id: null,
      name: 'Accounting, Legal, Taxation Services'
    },
    {
      id: 3,
      parent_brand_category_id: null,
      name: 'Adult Clubs'
    },
    {
      id: 4,
      parent_brand_category_id: null,
      name: 'Adult Shops'
    },
    {
      id: 5,
      parent_brand_category_id: null,
      name: 'Agricultural'
    },
    {
      id: 6,
      parent_brand_category_id: null,
      name: 'Agricultural Products & Services'
    },
    {
      id: 7,
      parent_brand_category_id: null,
      name: 'Air Conditioning'
    },
    {
      id: 8,
      parent_brand_category_id: null,
      name: 'Air Conditioning - Insulation'
    },
    {
      id: 9,
      parent_brand_category_id: null,
      name: 'Airlines'
    },
    {
      id: 10,
      parent_brand_category_id: null,
      name: 'Alcohol - Beer'
    },
    {
      id: 11,
      parent_brand_category_id: null,
      name: 'Alcohol - Cider'
    },
    {
      id: 12,
      parent_brand_category_id: null,
      name: 'Alcohol - Distributor'
    },
    {
      id: 13,
      parent_brand_category_id: null,
      name: 'Alcohol - Liquor Stores'
    },
    {
      id: 14,
      parent_brand_category_id: null,
      name: 'Alcohol - Mixers'
    },
    {
      id: 15,
      parent_brand_category_id: null,
      name: 'Alcohol - Spirits'
    },
    {
      id: 16,
      parent_brand_category_id: null,
      name: 'Alcohol - Wine'
    },
    {
      id: 17,
      parent_brand_category_id: null,
      name: 'Ambulance Services'
    },
    {
      id: 18,
      parent_brand_category_id: null,
      name: 'Amusements, Exhibitions and Zoos'
    },
    {
      id: 19,
      parent_brand_category_id: null,
      name: 'Animal Insurance'
    },
    {
      id: 20,
      parent_brand_category_id: null,
      name: 'Animal Remedies & Veterinary Services'
    },
    {
      id: 21,
      parent_brand_category_id: null,
      name: 'Apparel - Corporate'
    },
    {
      id: 22,
      parent_brand_category_id: null,
      name: 'Apparel - Kids'
    },
    {
      id: 23,
      parent_brand_category_id: null,
      name: "Apparel - Men's"
    },
    {
      id: 24,
      parent_brand_category_id: null,
      name: 'Apparel - Sport'
    },
    {
      id: 25,
      parent_brand_category_id: null,
      name: 'apparel - Sportswear'
    },
    {
      id: 26,
      parent_brand_category_id: null,
      name: 'Apparel - Swimwear'
    },
    {
      id: 27,
      parent_brand_category_id: null,
      name: "Apparel - Women's"
    },
    {
      id: 28,
      parent_brand_category_id: null,
      name: 'Apparel - Workwear'
    },
    {
      id: 29,
      parent_brand_category_id: null,
      name: 'Appliances'
    },
    {
      id: 30,
      parent_brand_category_id: null,
      name: 'Architect & Re-furbishment Companies'
    },
    {
      id: 31,
      parent_brand_category_id: null,
      name: 'Art Galleries & Museums'
    },
    {
      id: 32,
      parent_brand_category_id: null,
      name: 'Art Suppliers & Picture Framers'
    },
    {
      id: 33,
      parent_brand_category_id: null,
      name: 'Auctioneer'
    },
    {
      id: 34,
      parent_brand_category_id: null,
      name: 'Automotive - Batteries, Exhausts - Suppliers & Services'
    },
    {
      id: 35,
      parent_brand_category_id: null,
      name: 'Automotive - Car'
    },
    {
      id: 36,
      parent_brand_category_id: null,
      name: 'Automotive - Commercial & Utility Vehicles'
    },
    {
      id: 37,
      parent_brand_category_id: null,
      name: 'Automotive - Dealers, Sales & Service'
    },
    {
      id: 38,
      parent_brand_category_id: null,
      name: 'Automotive - Equipment'
    },
    {
      id: 39,
      parent_brand_category_id: null,
      name: 'Automotive - Exhausts'
    },
    {
      id: 40,
      parent_brand_category_id: null,
      name: 'Automotive - Fuels, Oils & Lubricants'
    },
    {
      id: 41,
      parent_brand_category_id: null,
      name: 'Automotive - Motor Cars'
    },
    {
      id: 42,
      parent_brand_category_id: null,
      name: 'Automotive - Motorbikes'
    },
    {
      id: 43,
      parent_brand_category_id: null,
      name: 'Automotive - Online Car Sales'
    },
    {
      id: 44,
      parent_brand_category_id: null,
      name: 'Automotive - Repairs'
    },
    {
      id: 45,
      parent_brand_category_id: null,
      name: 'Automotive - Suppliers & Services'
    },
    {
      id: 46,
      parent_brand_category_id: null,
      name: 'Automotive - SUV'
    },
    {
      id: 47,
      parent_brand_category_id: null,
      name: 'Automotive - Trucks'
    },
    {
      id: 48,
      parent_brand_category_id: null,
      name: 'Automotive - Tyers'
    },
    {
      id: 49,
      parent_brand_category_id: null,
      name: 'Automotive - Ute'
    },
    {
      id: 50,
      parent_brand_category_id: null,
      name: 'Baby Supplies'
    },
    {
      id: 51,
      parent_brand_category_id: null,
      name: 'Banking - Commercial'
    },
    {
      id: 52,
      parent_brand_category_id: null,
      name: 'Banking - Corporate'
    },
    {
      id: 53,
      parent_brand_category_id: null,
      name: 'Banking - Credit Cards'
    },
    {
      id: 54,
      parent_brand_category_id: null,
      name: 'Banking - Financial services'
    },
    {
      id: 55,
      parent_brand_category_id: null,
      name: 'Banking - General'
    },
    {
      id: 56,
      parent_brand_category_id: null,
      name: 'Banking - Home Loans'
    },
    {
      id: 57,
      parent_brand_category_id: null,
      name: 'Banking - Personal'
    },
    {
      id: 58,
      parent_brand_category_id: null,
      name: 'Banking Services'
    },
    {
      id: 59,
      parent_brand_category_id: null,
      name: 'Bar Ware & Accessories'
    },
    {
      id: 60,
      parent_brand_category_id: null,
      name: 'Bars'
    },
    {
      id: 61,
      parent_brand_category_id: null,
      name: 'Bathroom Home Improvements'
    },
    {
      id: 62,
      parent_brand_category_id: null,
      name: 'Batteries'
    },
    {
      id: 63,
      parent_brand_category_id: null,
      name: 'Beauty Range Corporate'
    },
    {
      id: 64,
      parent_brand_category_id: null,
      name: 'Bed and Bath Linen'
    },
    {
      id: 65,
      parent_brand_category_id: null,
      name: 'Bedding Retailer'
    },
    {
      id: 66,
      parent_brand_category_id: null,
      name: 'Betting - Gamble Responsibly'
    },
    {
      id: 67,
      parent_brand_category_id: null,
      name: 'Betting - Gaming/Lottery'
    },
    {
      id: 68,
      parent_brand_category_id: null,
      name: 'Betting - Wagering'
    },
    {
      id: 69,
      parent_brand_category_id: null,
      name: 'Beverages - Bottles water'
    },
    {
      id: 70,
      parent_brand_category_id: null,
      name: 'Beverages - Coffee'
    },
    {
      id: 71,
      parent_brand_category_id: null,
      name: 'Beverages - Kombucha'
    },
    {
      id: 72,
      parent_brand_category_id: null,
      name: 'Beverages - Milk'
    },
    {
      id: 73,
      parent_brand_category_id: null,
      name: 'Beverages - Non Alcoholic'
    },
    {
      id: 74,
      parent_brand_category_id: null,
      name: 'Beverages - Soft Drink'
    },
    {
      id: 75,
      parent_brand_category_id: null,
      name: 'Beverages - Sport'
    },
    {
      id: 76,
      parent_brand_category_id: null,
      name: 'Beverages / FMCG - Energy Drinks'
    },
    {
      id: 77,
      parent_brand_category_id: null,
      name: 'Birth Control/Condoms'
    },
    {
      id: 78,
      parent_brand_category_id: null,
      name: 'Boating and Marine'
    },
    {
      id: 79,
      parent_brand_category_id: null,
      name: 'Books'
    },
    {
      id: 80,
      parent_brand_category_id: null,
      name: 'Booksellers'
    },
    {
      id: 81,
      parent_brand_category_id: null,
      name: 'Bread'
    },
    {
      id: 82,
      parent_brand_category_id: null,
      name: 'Broadcasters - Streaming'
    },
    {
      id: 83,
      parent_brand_category_id: null,
      name: 'Broadcasters - Television Companies'
    },
    {
      id: 84,
      parent_brand_category_id: null,
      name: 'Building - Commercial'
    },
    {
      id: 85,
      parent_brand_category_id: null,
      name: 'Building - Residential'
    },
    {
      id: 86,
      parent_brand_category_id: null,
      name: 'Building & Construction Companies'
    },
    {
      id: 87,
      parent_brand_category_id: null,
      name: 'Building & Construction Material Suppliers'
    },
    {
      id: 88,
      parent_brand_category_id: null,
      name: 'Business Services'
    },
    {
      id: 89,
      parent_brand_category_id: null,
      name: 'Campervans, Caravans, Tents'
    },
    {
      id: 90,
      parent_brand_category_id: null,
      name: 'Car Accessories'
    },
    {
      id: 91,
      parent_brand_category_id: null,
      name: 'Car Hire'
    },
    {
      id: 92,
      parent_brand_category_id: null,
      name: 'Car Parks'
    },
    {
      id: 93,
      parent_brand_category_id: null,
      name: 'Car Wash Services'
    },
    {
      id: 94,
      parent_brand_category_id: null,
      name: 'Card & Gift Manufacturers'
    },
    {
      id: 95,
      parent_brand_category_id: null,
      name: 'Cash & Carry Services'
    },
    {
      id: 96,
      parent_brand_category_id: null,
      name: 'Casinos & On-line Casinos'
    },
    {
      id: 97,
      parent_brand_category_id: null,
      name: 'Central Government Departments, Services'
    },
    {
      id: 98,
      parent_brand_category_id: null,
      name: 'Charities'
    },
    {
      id: 99,
      parent_brand_category_id: null,
      name: 'Childcare'
    },
    {
      id: 100,
      parent_brand_category_id: null,
      name: 'Cinemas & Film Releases'
    },
    {
      id: 101,
      parent_brand_category_id: null,
      name: 'Cleaning Products & Services'
    },
    {
      id: 102,
      parent_brand_category_id: null,
      name: 'Cleaning Services - Commercial'
    },
    {
      id: 103,
      parent_brand_category_id: null,
      name: 'Cleaning Services - Residential'
    },
    {
      id: 104,
      parent_brand_category_id: null,
      name: 'Club Night & Event Promoters'
    },
    {
      id: 105,
      parent_brand_category_id: null,
      name: 'Competitions'
    },
    {
      id: 106,
      parent_brand_category_id: null,
      name: 'Compression Garments'
    },
    {
      id: 107,
      parent_brand_category_id: null,
      name: 'Computer Hardware Manufacturers/Retailers'
    },
    {
      id: 108,
      parent_brand_category_id: null,
      name: 'Computer Hardware Repair Services'
    },
    {
      id: 109,
      parent_brand_category_id: null,
      name: 'Computers and Technology'
    },
    {
      id: 110,
      parent_brand_category_id: null,
      name: 'Construction/Development'
    },
    {
      id: 111,
      parent_brand_category_id: null,
      name: 'Construction/Property'
    },
    {
      id: 112,
      parent_brand_category_id: null,
      name: 'Convenience - Foods'
    },
    {
      id: 113,
      parent_brand_category_id: null,
      name: 'Convenience - Stores'
    },
    {
      id: 114,
      parent_brand_category_id: null,
      name: 'Cooking & Baking Products'
    },
    {
      id: 115,
      parent_brand_category_id: null,
      name: 'Corrective Services'
    },
    {
      id: 116,
      parent_brand_category_id: null,
      name: 'Council - local'
    },
    {
      id: 117,
      parent_brand_category_id: null,
      name: 'Counselling Services'
    },
    {
      id: 118,
      parent_brand_category_id: null,
      name: 'Courier Services'
    },
    {
      id: 119,
      parent_brand_category_id: null,
      name: 'Credit Cards'
    },
    {
      id: 120,
      parent_brand_category_id: null,
      name: 'Cruise Ships'
    },
    {
      id: 121,
      parent_brand_category_id: null,
      name: 'Data and Insights'
    },
    {
      id: 122,
      parent_brand_category_id: null,
      name: 'Decorating Products'
    },
    {
      id: 123,
      parent_brand_category_id: null,
      name: 'Dental Care'
    },
    {
      id: 124,
      parent_brand_category_id: null,
      name: 'Dental Practices'
    },
    {
      id: 125,
      parent_brand_category_id: null,
      name: 'Developers/Builders'
    },
    {
      id: 126,
      parent_brand_category_id: null,
      name: 'Dieting & Health Clinics'
    },
    {
      id: 127,
      parent_brand_category_id: null,
      name: 'Digital Solutions'
    },
    {
      id: 128,
      parent_brand_category_id: null,
      name: 'Digital Television'
    },
    {
      id: 129,
      parent_brand_category_id: null,
      name: 'Dips & Spreads'
    },
    {
      id: 130,
      parent_brand_category_id: null,
      name: 'Disability Services'
    },
    {
      id: 131,
      parent_brand_category_id: null,
      name: 'Discounters & Warehouses'
    },
    {
      id: 132,
      parent_brand_category_id: null,
      name: 'Distribution Services'
    },
    {
      id: 133,
      parent_brand_category_id: null,
      name: 'DIY, Industrial & Construction Hire'
    },
    {
      id: 134,
      parent_brand_category_id: null,
      name: 'Doors & Windows'
    },
    {
      id: 135,
      parent_brand_category_id: null,
      name: 'Driving Instructors'
    },
    {
      id: 136,
      parent_brand_category_id: null,
      name: 'Dry Cleaning & Laundries'
    },
    {
      id: 137,
      parent_brand_category_id: null,
      name: 'Education - Schools'
    },
    {
      id: 138,
      parent_brand_category_id: null,
      name: 'Education - Tafe'
    },
    {
      id: 139,
      parent_brand_category_id: null,
      name: 'Education - University'
    },
    {
      id: 140,
      parent_brand_category_id: null,
      name: 'Education & Learning'
    },
    {
      id: 141,
      parent_brand_category_id: null,
      name: 'EFTPOS / Card Services'
    },
    {
      id: 142,
      parent_brand_category_id: null,
      name: 'Electrical - Retail'
    },
    {
      id: 143,
      parent_brand_category_id: null,
      name: 'Electrical - White goods'
    },
    {
      id: 144,
      parent_brand_category_id: null,
      name: 'Electronic - Computer Games'
    },
    {
      id: 145,
      parent_brand_category_id: null,
      name: 'Employment & Recruitment Services'
    },
    {
      id: 146,
      parent_brand_category_id: null,
      name: 'Energy'
    },
    {
      id: 147,
      parent_brand_category_id: null,
      name: 'Energy Providers - Electricity, Water, Oil and Gas'
    },
    {
      id: 148,
      parent_brand_category_id: null,
      name: 'Engineering and Technology'
    },
    {
      id: 149,
      parent_brand_category_id: null,
      name: 'Entertainment & The Media'
    },
    {
      id: 150,
      parent_brand_category_id: null,
      name: 'Equipment Hire'
    },
    {
      id: 151,
      parent_brand_category_id: null,
      name: 'Event Planning'
    },
    {
      id: 152,
      parent_brand_category_id: null,
      name: 'Event Venue'
    },
    {
      id: 153,
      parent_brand_category_id: null,
      name: 'Eyewear'
    },
    {
      id: 154,
      parent_brand_category_id: null,
      name: 'Facial & Toilet Tissue'
    },
    {
      id: 155,
      parent_brand_category_id: null,
      name: 'Farm Machinery'
    },
    {
      id: 156,
      parent_brand_category_id: null,
      name: 'Fast Food Chains, Restaurants & Cafes'
    },
    {
      id: 157,
      parent_brand_category_id: null,
      name: 'Fence Hire'
    },
    {
      id: 158,
      parent_brand_category_id: null,
      name: 'Ferry Services/Freight'
    },
    {
      id: 159,
      parent_brand_category_id: null,
      name: 'Festivals and Events'
    },
    {
      id: 160,
      parent_brand_category_id: null,
      name: 'Financial Services - Advisors'
    },
    {
      id: 161,
      parent_brand_category_id: null,
      name: 'Financial Services - Brokers'
    },
    {
      id: 162,
      parent_brand_category_id: null,
      name: 'Financial Services - Planning'
    },
    {
      id: 163,
      parent_brand_category_id: null,
      name: 'Financial Services & Investment'
    },
    {
      id: 164,
      parent_brand_category_id: null,
      name: 'Fire Brigades'
    },
    {
      id: 165,
      parent_brand_category_id: null,
      name: 'Fixed Line Providers'
    },
    {
      id: 166,
      parent_brand_category_id: null,
      name: 'Flooring'
    },
    {
      id: 167,
      parent_brand_category_id: null,
      name: 'Florist'
    },
    {
      id: 168,
      parent_brand_category_id: null,
      name: 'FMCG - Biscuits & Crackers'
    },
    {
      id: 169,
      parent_brand_category_id: null,
      name: 'FMCG - Butter'
    },
    {
      id: 170,
      parent_brand_category_id: null,
      name: 'FMCG - Cereals'
    },
    {
      id: 171,
      parent_brand_category_id: null,
      name: 'FMCG - Cheese'
    },
    {
      id: 172,
      parent_brand_category_id: null,
      name: 'FMCG - Coffee'
    },
    {
      id: 173,
      parent_brand_category_id: null,
      name: 'FMCG - Confectionary'
    },
    {
      id: 174,
      parent_brand_category_id: null,
      name: 'FMCG - Confectionery Chocolate'
    },
    {
      id: 175,
      parent_brand_category_id: null,
      name: 'FMCG - Crisps, Corn Chips, Corn Snacks'
    },
    {
      id: 176,
      parent_brand_category_id: null,
      name: 'FMCG - Dairy/Milk'
    },
    {
      id: 177,
      parent_brand_category_id: null,
      name: 'FMCG - Desserts'
    },
    {
      id: 178,
      parent_brand_category_id: null,
      name: 'FMCG - Detergents & Cleaning Products'
    },
    {
      id: 179,
      parent_brand_category_id: null,
      name: 'FMCG - Food'
    },
    {
      id: 180,
      parent_brand_category_id: null,
      name: 'FMCG - Fruit'
    },
    {
      id: 181,
      parent_brand_category_id: null,
      name: 'FMCG - Fruit Juice'
    },
    {
      id: 182,
      parent_brand_category_id: null,
      name: 'FMCG - Hair Removal Products'
    },
    {
      id: 183,
      parent_brand_category_id: null,
      name: 'FMCG - Hair Style Products'
    },
    {
      id: 184,
      parent_brand_category_id: null,
      name: 'FMCG - Health Cereals, Bars, Wraps'
    },
    {
      id: 185,
      parent_brand_category_id: null,
      name: 'FMCG - Milk'
    },
    {
      id: 186,
      parent_brand_category_id: null,
      name: 'FMCG - Pies & Pastries'
    },
    {
      id: 187,
      parent_brand_category_id: null,
      name: 'FMCG - Rice'
    },
    {
      id: 188,
      parent_brand_category_id: null,
      name: 'FMCG - Sauce, Marinades, Herbs and spices'
    },
    {
      id: 189,
      parent_brand_category_id: null,
      name: 'FMCG - Sauces, Dressings, Herbs & Oils'
    },
    {
      id: 190,
      parent_brand_category_id: null,
      name: 'FMCG - Shampoo & Conditioner'
    },
    {
      id: 191,
      parent_brand_category_id: null,
      name: 'FMCG - Skin Care'
    },
    {
      id: 192,
      parent_brand_category_id: null,
      name: 'FMCG - Snack Foods'
    },
    {
      id: 193,
      parent_brand_category_id: null,
      name: 'FMCG - Soft Drinks'
    },
    {
      id: 194,
      parent_brand_category_id: null,
      name: 'FMCG - Soups'
    },
    {
      id: 195,
      parent_brand_category_id: null,
      name: 'FMCG - Sports Drinks'
    },
    {
      id: 196,
      parent_brand_category_id: null,
      name: 'FMCG - Tea'
    },
    {
      id: 197,
      parent_brand_category_id: null,
      name: 'FMCG - Toiletries/Cosmetics'
    },
    {
      id: 198,
      parent_brand_category_id: null,
      name: 'FMCG - Vegetable Juice'
    },
    {
      id: 199,
      parent_brand_category_id: null,
      name: 'FMCG - Yoghurt'
    },
    {
      id: 200,
      parent_brand_category_id: null,
      name: 'FMCG- Pasta and Noodles'
    },
    {
      id: 201,
      parent_brand_category_id: null,
      name: 'Food Wholesalers'
    },
    {
      id: 202,
      parent_brand_category_id: null,
      name: 'Footwear'
    },
    {
      id: 203,
      parent_brand_category_id: null,
      name: 'Foreign Exchange'
    },
    {
      id: 204,
      parent_brand_category_id: null,
      name: 'Fragrance'
    },
    {
      id: 205,
      parent_brand_category_id: null,
      name: 'Freight Services'
    },
    {
      id: 206,
      parent_brand_category_id: null,
      name: 'Fuel'
    },
    {
      id: 207,
      parent_brand_category_id: null,
      name: 'Funeral Services'
    },
    {
      id: 208,
      parent_brand_category_id: null,
      name: 'Furnishing and Flooring'
    },
    {
      id: 209,
      parent_brand_category_id: null,
      name: 'Furniture and Homeware'
    },
    {
      id: 210,
      parent_brand_category_id: null,
      name: 'Garden Centres and Retailers'
    },
    {
      id: 211,
      parent_brand_category_id: null,
      name: 'Garden Products and Manufacturing'
    },
    {
      id: 212,
      parent_brand_category_id: null,
      name: 'Gardening & Outdoors'
    },
    {
      id: 213,
      parent_brand_category_id: null,
      name: 'Gibson Steps'
    },
    {
      id: 214,
      parent_brand_category_id: null,
      name: 'Glazing/Glass - Commercial'
    },
    {
      id: 215,
      parent_brand_category_id: null,
      name: 'Government - Messaging'
    },
    {
      id: 216,
      parent_brand_category_id: null,
      name: 'Government - Tourism'
    },
    {
      id: 217,
      parent_brand_category_id: null,
      name: 'Government Departments, Services & Community'
    },
    {
      id: 218,
      parent_brand_category_id: null,
      name: 'Government Funded Health Initiatives'
    },
    {
      id: 219,
      parent_brand_category_id: null,
      name: 'Grooming - Mens'
    },
    {
      id: 220,
      parent_brand_category_id: null,
      name: 'Grooming - Womens'
    },
    {
      id: 221,
      parent_brand_category_id: null,
      name: 'Gym/Fitness'
    },
    {
      id: 222,
      parent_brand_category_id: null,
      name: 'Hair & Beauty Salons & Day Spas'
    },
    {
      id: 223,
      parent_brand_category_id: null,
      name: 'Hardware - Tools'
    },
    {
      id: 224,
      parent_brand_category_id: null,
      name: 'Health - Pharmaceutical'
    },
    {
      id: 225,
      parent_brand_category_id: null,
      name: 'Health - Physiotherapy'
    },
    {
      id: 226,
      parent_brand_category_id: null,
      name: 'Health Funds'
    },
    {
      id: 227,
      parent_brand_category_id: null,
      name: 'Health Services, Hospitals, First Aid'
    },
    {
      id: 228,
      parent_brand_category_id: null,
      name: 'Heating'
    },
    {
      id: 229,
      parent_brand_category_id: null,
      name: 'Higher Education - Universities & Tafes'
    },
    {
      id: 230,
      parent_brand_category_id: null,
      name: 'Hobby, Arts & Crafts'
    },
    {
      id: 231,
      parent_brand_category_id: null,
      name: 'Home Improvements'
    },
    {
      id: 232,
      parent_brand_category_id: null,
      name: 'Hospitals & Emergency Departments'
    },
    {
      id: 233,
      parent_brand_category_id: null,
      name: 'Household Electrical Products'
    },
    {
      id: 234,
      parent_brand_category_id: null,
      name: 'Household Furnishings'
    },
    {
      id: 235,
      parent_brand_category_id: null,
      name: 'Household Products and Cleaners'
    },
    {
      id: 236,
      parent_brand_category_id: null,
      name: 'Household Sundries'
    },
    {
      id: 237,
      parent_brand_category_id: null,
      name: 'Hydration'
    },
    {
      id: 238,
      parent_brand_category_id: null,
      name: 'Ice Cream'
    },
    {
      id: 239,
      parent_brand_category_id: null,
      name: 'Industrial'
    },
    {
      id: 240,
      parent_brand_category_id: null,
      name: 'Industry Training'
    },
    {
      id: 241,
      parent_brand_category_id: null,
      name: 'Insurance - Car'
    },
    {
      id: 242,
      parent_brand_category_id: null,
      name: 'Insurance - General (All)'
    },
    {
      id: 243,
      parent_brand_category_id: null,
      name: 'Insurance - Health'
    },
    {
      id: 244,
      parent_brand_category_id: null,
      name: 'Insurance - Life'
    },
    {
      id: 245,
      parent_brand_category_id: null,
      name: 'Insurance - Travel'
    },
    {
      id: 246,
      parent_brand_category_id: null,
      name: 'Insurance Brokers, Agents'
    },
    {
      id: 247,
      parent_brand_category_id: null,
      name: 'International Student Services'
    },
    {
      id: 248,
      parent_brand_category_id: null,
      name: 'Internet Service Providers'
    },
    {
      id: 249,
      parent_brand_category_id: null,
      name: 'Internet / Technologies'
    },
    {
      id: 250,
      parent_brand_category_id: null,
      name: 'Investment, Finance, Banking'
    },
    {
      id: 251,
      parent_brand_category_id: null,
      name: 'IT'
    },
    {
      id: 252,
      parent_brand_category_id: null,
      name: 'Jewellery Galleries & Stores'
    },
    {
      id: 253,
      parent_brand_category_id: null,
      name: 'Kitchen Home Improvements'
    },
    {
      id: 254,
      parent_brand_category_id: null,
      name: 'Kwinana Council'
    },
    {
      id: 255,
      parent_brand_category_id: null,
      name: 'Labour Services'
    },
    {
      id: 256,
      parent_brand_category_id: null,
      name: 'Land'
    },
    {
      id: 257,
      parent_brand_category_id: null,
      name: 'Legal Services'
    },
    {
      id: 258,
      parent_brand_category_id: null,
      name: 'Leisure & Entertainment'
    },
    {
      id: 259,
      parent_brand_category_id: null,
      name: 'Libraries'
    },
    {
      id: 260,
      parent_brand_category_id: null,
      name: 'Lightbulbs'
    },
    {
      id: 261,
      parent_brand_category_id: null,
      name: 'Lighting - Retail'
    },
    {
      id: 262,
      parent_brand_category_id: null,
      name: 'Lighting - Wholesale'
    },
    {
      id: 263,
      parent_brand_category_id: null,
      name: 'Limousine Services'
    },
    {
      id: 264,
      parent_brand_category_id: null,
      name: 'Local Government & Services'
    },
    {
      id: 265,
      parent_brand_category_id: null,
      name: 'Logistics - Domestic'
    },
    {
      id: 266,
      parent_brand_category_id: null,
      name: 'Logistics - International'
    },
    {
      id: 267,
      parent_brand_category_id: null,
      name: 'Lotteries, Competitions, Gaming'
    },
    {
      id: 268,
      parent_brand_category_id: null,
      name: 'Loyalty Cards'
    },
    {
      id: 269,
      parent_brand_category_id: null,
      name: 'Magazines'
    },
    {
      id: 270,
      parent_brand_category_id: null,
      name: 'Makeup'
    },
    {
      id: 271,
      parent_brand_category_id: null,
      name: 'Management Consultants'
    },
    {
      id: 272,
      parent_brand_category_id: null,
      name: 'Marketing & Advertising'
    },
    {
      id: 273,
      parent_brand_category_id: null,
      name: 'Markets'
    },
    {
      id: 274,
      parent_brand_category_id: null,
      name: 'Material Handling Equipment'
    },
    {
      id: 275,
      parent_brand_category_id: null,
      name: 'Meals'
    },
    {
      id: 276,
      parent_brand_category_id: null,
      name: 'Meat, Smallgoods'
    },
    {
      id: 277,
      parent_brand_category_id: null,
      name: 'Medical Research'
    },
    {
      id: 278,
      parent_brand_category_id: null,
      name: 'Medical Supplies'
    },
    {
      id: 279,
      parent_brand_category_id: null,
      name: 'Medicines & Remedies'
    },
    {
      id: 280,
      parent_brand_category_id: null,
      name: 'Metricon Homes'
    },
    {
      id: 281,
      parent_brand_category_id: null,
      name: 'Mining'
    },
    {
      id: 282,
      parent_brand_category_id: null,
      name: 'Miscellaneous'
    },
    {
      id: 283,
      parent_brand_category_id: null,
      name: 'MMM - Southern Cross Audio'
    },
    {
      id: 284,
      parent_brand_category_id: null,
      name: 'Mobile Phones & Accessories'
    },
    {
      id: 285,
      parent_brand_category_id: null,
      name: 'Money Transfer Services'
    },
    {
      id: 286,
      parent_brand_category_id: null,
      name: 'Motivational Training'
    },
    {
      id: 287,
      parent_brand_category_id: null,
      name: 'Motorsports'
    },
    {
      id: 288,
      parent_brand_category_id: null,
      name: "Music, Audio, CD's, Records, DVD's"
    },
    {
      id: 289,
      parent_brand_category_id: null,
      name: 'National Newspapers'
    },
    {
      id: 290,
      parent_brand_category_id: null,
      name: 'Navigation Systems'
    },
    {
      id: 291,
      parent_brand_category_id: null,
      name: 'News - Classifieds'
    },
    {
      id: 292,
      parent_brand_category_id: null,
      name: 'Newspaper'
    },
    {
      id: 293,
      parent_brand_category_id: null,
      name: 'Nightclubs'
    },
    {
      id: 294,
      parent_brand_category_id: null,
      name: 'Non Profit'
    },
    {
      id: 295,
      parent_brand_category_id: null,
      name: 'Nurseries & Daycare/Childcare Facilities'
    },
    {
      id: 296,
      parent_brand_category_id: null,
      name: 'Office Equipment, Supplies & Stationery'
    },
    {
      id: 297,
      parent_brand_category_id: null,
      name: 'Oil & Gas'
    },
    {
      id: 298,
      parent_brand_category_id: null,
      name: 'Online Auction Sites'
    },
    {
      id: 299,
      parent_brand_category_id: null,
      name: 'Online Consumer Advice'
    },
    {
      id: 300,
      parent_brand_category_id: null,
      name: 'Online Newspaper'
    },
    {
      id: 301,
      parent_brand_category_id: null,
      name: 'Online Real Estate'
    },
    {
      id: 302,
      parent_brand_category_id: null,
      name: 'Optometrists'
    },
    {
      id: 303,
      parent_brand_category_id: null,
      name: 'Oral Hygiene'
    },
    {
      id: 304,
      parent_brand_category_id: null,
      name: 'Outdoor Digital'
    },
    {
      id: 305,
      parent_brand_category_id: null,
      name: "Outdoor Furniture and BBQ's"
    },
    {
      id: 306,
      parent_brand_category_id: null,
      name: 'Paint and Woodcare Products'
    },
    {
      id: 307,
      parent_brand_category_id: null,
      name: 'Paint Company'
    },
    {
      id: 308,
      parent_brand_category_id: null,
      name: 'Paper'
    },
    {
      id: 309,
      parent_brand_category_id: null,
      name: 'Parking'
    },
    {
      id: 310,
      parent_brand_category_id: null,
      name: 'Party & Event Suppliers'
    },
    {
      id: 311,
      parent_brand_category_id: null,
      name: 'Patient Transport'
    },
    {
      id: 312,
      parent_brand_category_id: null,
      name: 'Pawnbroker'
    },
    {
      id: 313,
      parent_brand_category_id: null,
      name: 'Personal Hygiene'
    },
    {
      id: 314,
      parent_brand_category_id: null,
      name: 'Personnel, Employment & Training Services'
    },
    {
      id: 315,
      parent_brand_category_id: null,
      name: 'Pesticides and Rat Poison'
    },
    {
      id: 316,
      parent_brand_category_id: null,
      name: 'Pet Food'
    },
    {
      id: 317,
      parent_brand_category_id: null,
      name: 'Petcare'
    },
    {
      id: 318,
      parent_brand_category_id: null,
      name: 'Petrol/Fuel'
    },
    {
      id: 319,
      parent_brand_category_id: null,
      name: 'Pharma Retail'
    },
    {
      id: 320,
      parent_brand_category_id: null,
      name: 'Pharmaceuticals - Supplements'
    },
    {
      id: 321,
      parent_brand_category_id: null,
      name: 'Pharmaceuticals - Vitamins'
    },
    {
      id: 322,
      parent_brand_category_id: null,
      name: 'Pharmacy'
    },
    {
      id: 323,
      parent_brand_category_id: null,
      name: 'Photographic Equipment'
    },
    {
      id: 324,
      parent_brand_category_id: null,
      name: 'Plumbing Services'
    },
    {
      id: 325,
      parent_brand_category_id: null,
      name: 'Plumbing Supplies'
    },
    {
      id: 326,
      parent_brand_category_id: null,
      name: 'Police Services'
    },
    {
      id: 327,
      parent_brand_category_id: null,
      name: 'Political Parties'
    },
    {
      id: 328,
      parent_brand_category_id: null,
      name: 'Postal Services'
    },
    {
      id: 329,
      parent_brand_category_id: null,
      name: 'Poultry'
    },
    {
      id: 330,
      parent_brand_category_id: null,
      name: 'Powertools'
    },
    {
      id: 331,
      parent_brand_category_id: null,
      name: 'Pre Mixed'
    },
    {
      id: 332,
      parent_brand_category_id: null,
      name: 'Printers'
    },
    {
      id: 333,
      parent_brand_category_id: null,
      name: 'Printing Companies'
    },
    {
      id: 334,
      parent_brand_category_id: null,
      name: 'Printing/Office Technology'
    },
    {
      id: 335,
      parent_brand_category_id: null,
      name: 'Private & Cosmetic Surgery Services'
    },
    {
      id: 336,
      parent_brand_category_id: null,
      name: 'Private Healthcare Insurance'
    },
    {
      id: 337,
      parent_brand_category_id: null,
      name: 'Private Investigators'
    },
    {
      id: 338,
      parent_brand_category_id: null,
      name: 'Promotional Product Suppliers'
    },
    {
      id: 339,
      parent_brand_category_id: null,
      name: 'Promotions, Sponsorships & Competitions'
    },
    {
      id: 340,
      parent_brand_category_id: null,
      name: 'Property Developer - Commercial'
    },
    {
      id: 341,
      parent_brand_category_id: null,
      name: 'Property Developer - Residential'
    },
    {
      id: 342,
      parent_brand_category_id: null,
      name: 'Public Transport Infrastructure Management'
    },
    {
      id: 343,
      parent_brand_category_id: null,
      name: 'Public Transport Online'
    },
    {
      id: 344,
      parent_brand_category_id: null,
      name: 'Publishers'
    },
    {
      id: 345,
      parent_brand_category_id: null,
      name: 'QSR'
    },
    {
      id: 346,
      parent_brand_category_id: null,
      name: 'Radio'
    },
    {
      id: 347,
      parent_brand_category_id: null,
      name: 'Radio Stations'
    },
    {
      id: 348,
      parent_brand_category_id: null,
      name: 'Rail Corp Charity'
    },
    {
      id: 349,
      parent_brand_category_id: null,
      name: 'Railways'
    },
    {
      id: 350,
      parent_brand_category_id: null,
      name: 'Real Estate'
    },
    {
      id: 351,
      parent_brand_category_id: null,
      name: 'Real Estate Agents'
    },
    {
      id: 352,
      parent_brand_category_id: null,
      name: 'Recruitment'
    },
    {
      id: 353,
      parent_brand_category_id: null,
      name: 'Recruitment Internet Sites'
    },
    {
      id: 354,
      parent_brand_category_id: null,
      name: 'Regional Newspapers'
    },
    {
      id: 355,
      parent_brand_category_id: null,
      name: 'Regulatory Bodies'
    },
    {
      id: 356,
      parent_brand_category_id: null,
      name: 'Religious Associations'
    },
    {
      id: 357,
      parent_brand_category_id: null,
      name: 'Removals & Storage'
    },
    {
      id: 358,
      parent_brand_category_id: null,
      name: 'Rental Cars'
    },
    {
      id: 359,
      parent_brand_category_id: null,
      name: 'Retail - Department Stores'
    },
    {
      id: 360,
      parent_brand_category_id: null,
      name: 'Retail - Electronics, inc White goods'
    },
    {
      id: 361,
      parent_brand_category_id: null,
      name: 'Retail - Furniture'
    },
    {
      id: 362,
      parent_brand_category_id: null,
      name: 'Retail - Hardware'
    },
    {
      id: 363,
      parent_brand_category_id: null,
      name: 'Retail - Online'
    },
    {
      id: 364,
      parent_brand_category_id: null,
      name: 'Retail - Outdoor Department Store'
    },
    {
      id: 365,
      parent_brand_category_id: null,
      name: 'Retail - Sports'
    },
    {
      id: 366,
      parent_brand_category_id: null,
      name: 'Retail - Toys, Games and Toy Retailers'
    },
    {
      id: 367,
      parent_brand_category_id: null,
      name: 'Retails- Business Bank'
    },
    {
      id: 368,
      parent_brand_category_id: null,
      name: 'Reward Points & Loyalty Cards'
    },
    {
      id: 369,
      parent_brand_category_id: null,
      name: 'Roading & Infrastructure'
    },
    {
      id: 370,
      parent_brand_category_id: null,
      name: 'Roadside Assistance'
    },
    {
      id: 371,
      parent_brand_category_id: null,
      name: 'RSL & RSA'
    },
    {
      id: 372,
      parent_brand_category_id: null,
      name: 'Safety Equipment'
    },
    {
      id: 373,
      parent_brand_category_id: null,
      name: 'Salary packaging/Novated Leasing'
    },
    {
      id: 374,
      parent_brand_category_id: null,
      name: 'Search Engines'
    },
    {
      id: 375,
      parent_brand_category_id: null,
      name: 'Security Companies'
    },
    {
      id: 376,
      parent_brand_category_id: null,
      name: 'Service Stations'
    },
    {
      id: 377,
      parent_brand_category_id: null,
      name: 'Shipping & Cruises'
    },
    {
      id: 378,
      parent_brand_category_id: null,
      name: 'Shop Fittings and Shelving'
    },
    {
      id: 379,
      parent_brand_category_id: null,
      name: 'Shopping Centres'
    },
    {
      id: 380,
      parent_brand_category_id: null,
      name: 'Sign Writing'
    },
    {
      id: 381,
      parent_brand_category_id: null,
      name: 'Social Clubs'
    },
    {
      id: 382,
      parent_brand_category_id: null,
      name: 'Social Organisations & Community Service'
    },
    {
      id: 383,
      parent_brand_category_id: null,
      name: 'Software'
    },
    {
      id: 384,
      parent_brand_category_id: null,
      name: 'Solicitors/Lawyers/Barristers'
    },
    {
      id: 385,
      parent_brand_category_id: null,
      name: 'Sporting Clubs, Associations and Events'
    },
    {
      id: 386,
      parent_brand_category_id: null,
      name: 'Sports Grounds, Stadiums and Arenas'
    },
    {
      id: 387,
      parent_brand_category_id: null,
      name: 'Stationery Suppliers'
    },
    {
      id: 388,
      parent_brand_category_id: null,
      name: 'Statutory Authorities'
    },
    {
      id: 389,
      parent_brand_category_id: null,
      name: 'Stock & Sauce Mixes'
    },
    {
      id: 390,
      parent_brand_category_id: null,
      name: 'Stockbroking'
    },
    {
      id: 391,
      parent_brand_category_id: null,
      name: 'Storage'
    },
    {
      id: 392,
      parent_brand_category_id: null,
      name: 'Superannuation'
    },
    {
      id: 393,
      parent_brand_category_id: null,
      name: 'Supermarkets'
    },
    {
      id: 394,
      parent_brand_category_id: null,
      name: 'Surveyors & House Appraisal Services'
    },
    {
      id: 395,
      parent_brand_category_id: null,
      name: 'Swimming Pools & Accessories'
    },
    {
      id: 396,
      parent_brand_category_id: null,
      name: 'Tattoo Parlours'
    },
    {
      id: 397,
      parent_brand_category_id: null,
      name: 'Taxi, Bus & Ferry Services'
    },
    {
      id: 398,
      parent_brand_category_id: null,
      name: 'Taxis / Rideshare'
    },
    {
      id: 399,
      parent_brand_category_id: null,
      name: 'Technology Partner'
    },
    {
      id: 400,
      parent_brand_category_id: null,
      name: 'Technology Providers'
    },
    {
      id: 401,
      parent_brand_category_id: null,
      name: 'Telecommunications'
    },
    {
      id: 402,
      parent_brand_category_id: null,
      name: 'Television Companies'
    },
    {
      id: 403,
      parent_brand_category_id: null,
      name: 'Television, Video & DVD Recorders'
    },
    {
      id: 404,
      parent_brand_category_id: null,
      name: 'Theatre, Shows & Concerts'
    },
    {
      id: 405,
      parent_brand_category_id: null,
      name: 'Ticket Company'
    },
    {
      id: 406,
      parent_brand_category_id: null,
      name: 'Tourism Authorities'
    },
    {
      id: 407,
      parent_brand_category_id: null,
      name: 'Tourist Attractions'
    },
    {
      id: 408,
      parent_brand_category_id: null,
      name: 'Trade Dollars'
    },
    {
      id: 409,
      parent_brand_category_id: null,
      name: 'Transport - Driveshare'
    },
    {
      id: 410,
      parent_brand_category_id: null,
      name: 'Transport - Taxi'
    },
    {
      id: 411,
      parent_brand_category_id: null,
      name: 'Travel - Accommodation'
    },
    {
      id: 412,
      parent_brand_category_id: null,
      name: 'Travel - Agents'
    },
    {
      id: 413,
      parent_brand_category_id: null,
      name: 'Travel - Airline'
    },
    {
      id: 414,
      parent_brand_category_id: null,
      name: 'Travel - Online Aggregator'
    },
    {
      id: 415,
      parent_brand_category_id: null,
      name: 'Underwear & Hosiery'
    },
    {
      id: 416,
      parent_brand_category_id: null,
      name: 'Unions'
    },
    {
      id: 417,
      parent_brand_category_id: null,
      name: 'Utilities'
    },
    {
      id: 418,
      parent_brand_category_id: null,
      name: 'Vehicle Testing'
    },
    {
      id: 419,
      parent_brand_category_id: null,
      name: 'Video & DVD Releases'
    },
    {
      id: 420,
      parent_brand_category_id: null,
      name: 'Video and DVD Hire'
    },
    {
      id: 421,
      parent_brand_category_id: null,
      name: 'Video Conferencing'
    },
    {
      id: 422,
      parent_brand_category_id: null,
      name: 'Vitamins & Supplements'
    },
    {
      id: 423,
      parent_brand_category_id: null,
      name: 'Waste Management'
    },
    {
      id: 424,
      parent_brand_category_id: null,
      name: 'Web Design'
    },
    {
      id: 425,
      parent_brand_category_id: null,
      name: 'Weekend Newspapers'
    },
    {
      id: 426,
      parent_brand_category_id: null,
      name: 'Wineries & Vineyards'
    },
    {
      id: 427,
      parent_brand_category_id: null,
      name: 'Youth Groups'
    }
  ])
}
