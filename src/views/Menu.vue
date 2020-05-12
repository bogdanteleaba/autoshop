<template>
    <v-container>
        <v-row>
            <v-col offset-md="1" md="5">
                <h1> Menu items </h1>
                <div class="pa-2" id="info">
                    <v-simple-table id="menu-table">
                        <template v-slot:default>
                        <thead>
                            <tr>
                            <th></th>
                            <th class="text-left" style="width:70%;">Name of item</th>
                            <th class="text-left" style="width:100px;">Price</th>
                            <th class="text-left" style="width:100px;">Add to basket</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in menuItems" :key="item.name">
                                <td id="td_menuitem_img">
                                    <v-img v-bind:src="item.image"></v-img>
                                </td>
                            <td>
                                <span id="td_name">{{ item.name }}</span><br>
                                <span id="menu_item_description">{{ item.description }}</span>
                            </td>
                            <td>{{ item.price }}</td>
                            <td>
                                <v-btn small text @click="addToBasket(item)">
                                    <v-icon color="black">add_box</v-icon>
                                </v-btn>
                            </td>
                            </tr>
                        </tbody>
                        </template>
                    </v-simple-table>
                    
                    </div>
            </v-col>
            <v-col offset-md="1" md="4">
                <h1> Current Basket </h1>
                <div class="pa-2" id="info">
                    <v-simple-table id="menu-table" v-if="basket.length > 0">
                        <template v-slot:default>
                        <thead>
                            <tr>
                            <th class="text-left" style="width:30%;">Quantity</th>
                            <th class="text-left" style="width:100px;">Name of item</th>
                            <th class="text-left" style="width:20%;">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in basket" :key="item.name">
                            <td>
                                <v-icon color="black" @click="increaseQtn(item)">add_box</v-icon>
                                {{ item.quantity }}
                                <v-icon color="black" @click="decreaseQtn(item)">indeterminate_check_box</v-icon>
                            </td>
                            <td>{{ item.name }}</td>
                            <td>
                                {{ item.price }}
                            </td>
                            </tr>
                        </tbody>
                        </template>
                    </v-simple-table>
                    <v-simple-table v-else>
                        <p>The basket is empty</p>
                    </v-simple-table>



                    <v-divider>
                    </v-divider>
                    <v-row id="basket_checkout" class="mt-5" style="margin:0;">
                        <v-col>
                            <p>Subtotal:</p>
                            <p>Delivery:</p>
                            <p>Total amount:</p>
                        </v-col>
                        <v-col class="text-right">
                            <p> {{ subTotal }} DKK</p>
                            <p>10 DKK</p>
                            <p><b>{{ total }} DKK</b></p>
                        </v-col>
                    </v-row>
                    <v-row style="margin:0;">
                        
                            <v-spacer></v-spacer>
                            <v-btn color="blue" @click="addCheckoutItem()">
                                Checkout
                            </v-btn>
                        
                    </v-row>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>


  export default {
    data () {
      return {
          basketDump: [],
      }
    },

    beforeCreate() {
        this.$store.dispatch('setMenuItems')
    },

    methods:{
        addCheckoutItem() {
            this.$store.dispatch('setCheckoutItem')
        },
        addToBasket(item) {
           /*  if(this.basket.find(itemInArray => item.name === itemInArray.name)) {
                item = this.basket.find(itemInArray => item.name === itemInArray.name);
                this.increaseQtn(item);
            }
            else {
                this.basket.push ({
                    name: item.name,
                    price: item.price,
                    quantity: 1
                })
            } */
            this.basketDump.push ({
                    name: item.name,
                    price: item.price,
                    quantity: 1
            }),
            this.$store.commit('addBasketItems', this.basketDump);
            this.basketDump = [];
        },
        increaseQtn(item){
            item.quantity++
        },
        decreaseQtn(item){
            item.quantity--;

            if (item.quantity === 0) {
                this.basket.splice(this.basket.indexOf(item), 1)
            }
        }
    },
    computed: {
        basket() {
            //return this.$store.state.basketItems
            return this.$store.getters.getBasketItems
        },
        menuItems() {
            return this.$store.getters.getMenuItems
        },
        subTotal () {
            var subCost = 0;
            for (var items in this.basket) {
                var individualItem = this.basket[items];
                subCost += individualItem.quantity * individualItem.price;
            }
            return subCost
        },
        total () {
            var deliveryPrice = 10;
            var totalCost = this.subTotal
            return totalCost + deliveryPrice
        }
    }
  }
</script>

<style lang="scss" scoped>
    h1{
    border: 5px white solid;
    text-align:right;
    color:white;
    text-transform:uppercase;
    margin:bottom;
    padding:15px;
}
    .col:last-child h1{
    text-align:left;
}
    #info {
        background-color:white;
    }
    tr th {
        font-weight:300;
    }
    tr td{
        padding:10px 10px 10px 16px;
    }
    #td_name{
        font-weight:bold;
    }
    #menu_item_description{
        font-style: italic;
        font-weight:300;
        color:darkgrey;
        font-size:13px;
    }

    #td_menuitem_img {
        max-width:40px;
        max-height: 40px;
        padding:0;
    }
    .info_box .flex h1{
    border: 5px white solid;
    text-align:center;
    color:white;
    text-transform:uppercase;
}

#basket_checkout{
    font-size:13px;
}
#basket_checkout p:first-child{
    line-height:2px;
}
</style>