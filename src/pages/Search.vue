<template>
    <el-row>
        <div class="title">
        <h2>Search</h2>
      </div>
      <div class="inner-row">
        <el-row :gutter="10" class="justify-center">
          <el-col class="filter-column" :xs="22">
              <el-select v-model="filters" multiple placeholder="Filter options">
                <el-option
                  v-for="item in search.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-col>
        </el-row>
        <el-row class="select-columns" :gutter="10">
          <el-col :xs="22" :sm="6" :md="4">
            <el-select v-model="industries" collapse-tags multiple placeholder="All Industries" >
              <el-option
                v-for="item in search.industries"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :xs="22" :sm="6" :md="4">
            <el-select v-model="countries" collapse-tags multiple placeholder="All Countries">
              <el-option
                v-for="item in search.countries"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :xs="22" :sm="6" :md="4">
            <el-select v-model="cities" collapse-tags multiple placeholder="All Cities">
              <el-option
                v-for="item in search.cities"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :xs="22" :sm="6" :md="4" class="margin-left-auto">
            <el-select v-model="sortBy" placeholder="Sort By">
              <el-option
                v-for="item in sortByOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <SearchResult />
      </div>
    </el-row>
</template>
<script>
import SearchResult from '@/components/search/results.vue'
export default {
  name: 'Search',
  components: {
    SearchResult
  },
  data () {
    return {
      filters: [],
      industries: [],
      cities: [],
      countries: [],
      search: {
        options: [
          {
            label: 'Trade Shows',
            value: 'tradeShows'
          },
          {
            label: 'Brands',
            value: 'brands'
          },
          {
            label: 'Retailers: Webshop',
            value: 'retailersWeb'
          },
          {
            label: 'Retailers: Stores',
            value: 'retailersStores'
          },
          {
            label: 'Listings: Brands',
            value: 'listingsBrand'
          },
          {
            label: 'Listings: Retailers',
            value: 'listingsRetailers'
          }
        ],
        cities: [
          {
            label: 'Stockholm',
            value: 'stockholm'
          },
          {
            label: 'Gothenburg',
            value: 'gothenburg'
          },
          {
            label: 'Malmö',
            value: 'malmo'
          },
          {
            label: 'Floda',
            value: 'floda'
          },
          {
            label: 'Lerum',
            value: 'lerum'
          }
        ],
        countries: [
          {
            label: 'Sweden',
            value: 'sweden'
          },
          {
            label: 'Norway',
            value: 'norway'
          },
          {
            label: 'Denmark',
            value: 'denmark'
          }
        ],
        industries: [
          {
            label: 'Fashion',
            value: 'fashion'
          },
          {
            label: 'Jewelery',
            value: 'jewels'
          },
          {
            label: 'Interiors',
            value: 'interior'
          }
        ]
      },
      sortBy: 'default',
      sortByOptions: [
        {
          label: 'Default',
          value: 'default'
        },
        {
          label: 'Newest',
          value: 'new'
        },
        {
          label: 'Oldest',
          value: 'old'
        },
        {
          label: 'Popular',
          value: 'popular'
        }
      ]
    }
  }
}
</script>
