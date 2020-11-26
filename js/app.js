new Vue({
    el: '#app',
    data: {
        categories: [],
        sourceItems: [],
        filteredItems: [],
        searchTerm: ''
    },
    mounted: function() {
        var self = this;
        let url = 'https://api.konimbo.co.il/v1/items?token=9c1a92bf8cefc59e4ec9fa7c53bba0f90dd8b15850bef1062dbf32c5e8fd3a08';
        $.get(url, function(res) {
            for(let i in res) {
                let itemData = res[i];
                let category = itemData.store_category_title;
                // add it as a json object to items list
                let item = {
                   id: i,
                   title: itemData.title,
                   image: itemData.images[0] ? itemData.images[0].url : '',
                   content : itemData.desc,
                   category: category
                };
                self.sourceItems.push(item);
                // map categories
                if (self.categories.indexOf(category) == -1) {
                    self.categories.push(category);
                }
            }
            self.resetFilter();
          });        
    },
    methods: {
        filterByCategory: function(category) {
            let newList = this.sourceItems.filter(item => {
                return item.category == category;
            });
            this.filteredItems = newList;
        },
        filterBySearchTerm: function() {
            let search = this.searchTerm;
            if (search.length == 0) {
                return this.resetFilter();
            }
            let newList = this.sourceItems.filter(item => {
                return item.category.includes(search) || item.title.includes(search) || item.content.includes(search);
            });
            this.filteredItems = newList;
        },
        resetFilter: function() {
            this.filteredItems = this.sourceItems.slice();
        }
    }, computed: {
    }
})