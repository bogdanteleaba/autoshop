<template>
    <v-container>

        <v-snackbar
        top
      v-model="updatedSuccess"
    >
      {{ updatedText }}
      <v-btn
        color="pink"
        text
        @click="updatedSuccess = false"
      >
        Close
      </v-btn>
    </v-snackbar>


        <v-row>
            <v-col offset-md="1" md="5">
                <h1> Current Bagels in menu items </h1>
                <div class="pa-2" id="info">
                    <v-simple-table id="menu-table">
                        <thead>
                            <tr>
                                <th class="text-left" style="width:70%;">Name
                                    <v-btn color="orange" small text to="/addNew">
                                        <v-icon>add</v-icon><span style="padding:0 10px;">Add Item</span>
                                    </v-btn>
                            <th class="text-left" style="width:100px;">Price</th>
                            <th class="text-left" style="width:100px;">Edit</th>
                            <th class="text-left" style="width:100px;">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in menuItems" :key="item.name">
                            <td>
                                <span id="td_name">{{ item.name }}</span><br>
                                <span id="menu_item_description">{{ item.description }}</span>
                            </td>
                            <td>{{ item.price }}</td>
                            <td>
                                <v-btn small text @click.stop="dialog = true" @click="editItem(item)">
                                    <v-icon color="orange">edit</v-icon>
                                </v-btn>
                            </td>
                            <td>
                                <v-btn small text @click="deleteItem(item.id)">
                                    <v-icon color="incomplete">delete</v-icon>
                                </v-btn>
                            </td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                    
                    </div>
            </v-col>
            <v-col offset-md="1" md="4">
                <h1> Current Basket </h1>
                <div class="pa-2" id="info">
                    <v-simple-table>
                        <p>Right</p>
                    </v-simple-table>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-dialog
      v-model="dialog"
      max-width="400"
    >
      <v-card>
                <h1> Edit item</h1>
                <div class="pa-5" id="info">
                    <v-text-field required v-model="item.name"></v-text-field>
                    <v-text-field required v-model="item.description"></v-text-field>
                    <v-text-field required v-model="item.price" ></v-text-field>
                    <v-btn
                    color="complete"
                    @click="updateItem()"
                    @click.stop="dialog = false"
                    >
                        Edit item
                    </v-btn>

                    <v-btn
                    color="incomplete"
                    @click.stop="dialog = false"
                    >
                        Close
                    </v-btn>
                    </div>



      </v-card>
    </v-dialog>
        </v-row>
    </v-container>
</template>

<script>
import { dbMenuAdd } from '../../firebase'

  export default {
    data () {
      return {
        basket: [],
        dialog: false,
        item: [],
        activeEditItem: null,
        updatedSuccess: false,
        updatedText: 'Menu Item has been updated'
      }
    },
    beforeCreate() {
        this.$store.dispatch('setMenuItems')
    },
    methods:{
        editItem(item) {
            this.item = item,
            this.activeEditItem = item.id
        },
        updateItem() {

        dbMenuAdd.doc(this.activeEditItem).update(this.item)
        .then(() => {
            this.updatedSuccess = true;
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });

        },
        deleteItem(id) {
            dbMenuAdd.doc(id).delete().then(function() {
               // console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        },
        addToBasket(item) {
            if(this.basket.find(itemInArray => item.name === itemInArray.name)) {
                item = this.basket.find(itemInArray => item.name === itemInArray.name);
                this.increaseQtn(item);
            }
            else {
                this.basket.push ({
                    name: item.name,
                    price: item.price,
                    quantity: 1
                })
            }
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
    .col h1{
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