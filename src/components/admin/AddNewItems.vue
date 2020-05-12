<template>
    <v-container>
        <v-row>
            <v-col offset-md="1" md="5">
                <h1> Add new item</h1>
                <div class="pa-2" id="info">
                    <v-text-field
                    label="Name of Bagel"
                    required
                    v-model="name"
                    >
                    </v-text-field>
                    </div>
                    
                    <div class="pa-2" id="info">
                    <v-text-field
                    label="Description"
                    required
                    v-model="description"
                    >
                    </v-text-field>
                    </div>

                    <div class="pa-2" id="info">
                    <v-text-field
                    label="Price"
                    required
                    v-model="price"
                    >
                    </v-text-field>

                    <v-file-input label="File input" @change="uploadImage"></v-file-input>
                    <input type="file"/>
                    <v-btn
                    color="complete"
                    @click="addNewMenuItem()"
                    :disabled="btnDisable">
                        Add item
                    </v-btn>

                    <v-btn
                    color="incomplete">
                        Cancel
                    </v-btn>
                    </div>
            </v-col>
            <v-col offset-md="1" md="4">
                <h1> Current Basket </h1>
                <div class="pa-2" id="info">
                    
                    <v-simple-table id="menu-table">
                        <t-head>
                            <tr>
                                <th class="text-left" style="width:70%">Name</th>
                                <th class="text-left" style="width:100px">Price DKK</th>
                            </tr>
                        </t-head>
                        <tbody>
                            <tr>
                                <td>
                                    <span id="td_name">{{name}}</span><br>
                                    <span id="menu_item_description">{{description}}</span>
                                </td>
                                <td id="preview_menuitem_price"> {{ price }} </td>
                            </tr>
                        </tbody>

                    </v-simple-table>
                    </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
/*eslint-disable*/

import { dbMenuAdd, fb } from '../../../firebase'

  export default {
        data () {
            return {
            name: '',
            description: '',
            price: '',
            image: null,
            btnDisable: true
        }
    },
    methods: {
        uploadImage(e) {
            let file = e;
            console.log(e);
            var storageRef = fb.storage().ref('products/'+ file.name);

            let uploadTask = storageRef.put(file);

            uploadTask.on('state_changed', (snapshot) =>{
            }, (error) =>{
            // Handle unsuccessful uploads
            }, () =>{
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{
                this.image = downloadURL;
                this.btnDisable = false;
                console.log('File available at', downloadURL);
            });
            });

        },

        addNewMenuItem() {
            dbMenuAdd.add({
                name: this.name,
                description: this.description,
                price: this.price,
                image: this.image
            })
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