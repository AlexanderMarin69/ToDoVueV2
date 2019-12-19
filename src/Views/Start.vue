<template>
    <div>
        <div v-if="LoadingSuccessfull">
            <v-alert type="success">
                Operation completed successfully

            </v-alert>
        </div>
        <div v-if="LoadingError">
            <v-alert type="error">
                Error encountered while loading
            </v-alert>
        </div>



        <RegisterUserForm v-if="mannenKanin"></RegisterUserForm>
        <Login v-if="!mannenKanin"></Login>

        <div v-if="isUserLoggedIn"><p>logged in</p></div>
        <div v-if="!isUserLoggedIn"><p>not logged in</p></div>

        <div v-if="mannenKanin"><p>kanin logged in</p></div>
        <div v-if="!mannenKanin"><p>kanin not logged in</p></div>

        {{isUserLoggedIn}}
        kanin {{ mannenKanin }}

        <v-card shaped raised class="mt-5 pa-3 mx-auto"
                max-width="344">
            <v-text-field type="text"
                          v-model="newTodo.title"
                          placeholder="Add a new todo"
                          @keyup.enter="add()">
            </v-text-field>
            <v-btn tile color="accent" elevation="10" @click="add()" :loading="loading">
                <v-icon class="pr-3">mdi-plus-circle</v-icon> Lägg till Todo
            </v-btn>
        </v-card>
        <v-btn @click="showCart"><h1>{{title}} {{cart.length}}</h1></v-btn>
        <Todos :listOfTodos="listOfTodos" @addToCart="addToCart" @openRemoveDialog="openRemoveDialogModal" @done="markAsDone"></Todos>
        <!--REMOVE CONFIRMATION MODAL-->
        <v-dialog v-model="showRemoveDialog"
                  max-width="310">
            <v-card>
                <v-card-title class="headline">Är du säker att du vill ta bort?</v-card-title>
                <v-card-text>
                    Detta kan inte ångras ;)
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text
                           color="success"
                           @click="showRemoveDialog = false">
                        AVBRYT
                    </v-btn>
                    <v-btn color="error"
                           @click="removeFromList(removeTodoId)">
                        <v-icon class="pr-1">mdi-delete-circle</v-icon> TA BORT
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!--CART MODAL-->
        <v-dialog v-model="showCartDialog"
                  max-width="400">
            <v-card>
                <v-card-title class="headline">Kundvagn</v-card-title>
                <v-card-text>
                    <div v-for="(product, index) in cart" v-bind:key="index" class="pa-1">
                        hello

                        <div style="color: black; font-weight: bold; font-size: 24px; padding: 10px;">
                            <v-layout wrap>
                                <v-flex>
                                    <v-card class="pa-2">
                                        <p class="subtitle-2 font-weight-thin">Artnr. {{product.id}}</p>
                                        <p class="display-1" style="text-transform: uppercase; font-weight: normal;">{{product.name}}</p>
                                        <p class="subtitle-2">Tillgänglighet:  {{product.published}}</p>
                                        <v-card max-width="190">
                                            <v-card-actions>
                                                <v-btn text small color="error"><v-icon>mdi-plus-circle</v-icon></v-btn>
                                                <v-btn text small disabled color="error">{{product.id - 50}}</v-btn>
                                                <v-btn text small color="error"><v-icon>mdi-minus-circle</v-icon></v-btn>
                                            </v-card-actions>
                                        </v-card>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn text small @click="removeProduct(index)" color="error">Ta bort</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </div>

                        <!--<div v-if="cart.length < 1" style="color: black; font-weight: bold; font-size: 24px; padding: 10px;">
                        <h6>cart is empty :)</h6>
                    </div>-->

                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text
                           color="secondary">
                        fortsätt handla
                    </v-btn>
                    <v-btn color="orange" style="color:white;">
                        <v-icon class="pr-1">mdi-delete-circle</v-icon> till kassan
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import Todos from '@/components/Todos'
    import generic from '@/services/generic'
    import Login from '@/components/Login'
    import RegisterUserForm from '@/components/RegisterUserForm'
    import axios from 'axios'
    import { mapState, mapMutations, mapActions} from 'vuex';
    export default {
        components: {
            Todos,
            Login,
            RegisterUserForm,
        },
        data: function () {
            return {
                //isUserLoggedInForVShow: false,
                //loggedin: false,
                mannenKanin: false,
                loading: false,
                ShowTodos: false,
                ShowInvoices: false,
                LoadingSuccessfull: false,
                LoadingError: false,
                apiAdress: 'api/Categories/CreateNewCategory',
                listOfTodos: [],
                newTodo: {
                    title:''
                },
                showRemoveDialog: false,
                showCartDialog: false,
                removeTodoId: null,
            }
        },
        methods: {
            checkIfUserIsLoggedIn() {
                if (this.isUserLoggedIn) {
                    this.mannenKanin = true
                } else {
                    this.mannenKanin = false

                }
            },
            showCart() {
                this.showCartDialog = true;
            },
            ...mapMutations([
                'SET_NEW_CART_ITEM'
            ]),
            ...mapActions({
                removeProductFromCart: 'REMOVE_PRODUCT_FROM_BASKET',
            }),
            removeProduct(id) {
                this.removeProductFromCart(id);
            },
            addToCart(product) {
                this.SET_NEW_CART_ITEM(product);
            },
            add() {
                this.loading = true,
                this.listOfTodos.push({
                    id: this.nextId,
                    title: this.newTodo.title
                });

                let vm = {
                    name: this.newTodo.title,
                    published: false
                }
                generic.add('Home/CreateNewCategory', vm).then(() => this.getAllTodos());
                
                this.newTodo.title = '';
            },
            alertFunctionRemoveAlert() {
                this.LoadingSuccessfull = false
            },

            alertFunctionInitialize() {
                this.LoadingSuccessfull = true
                setTimeout(() => { this.alertFunctionRemoveAlert() }, 2000)
            },

            alertFunctionSetAlert() {
                setTimeout(() => { this.alertFunctionInitialize() }, 150)
            },

            getAllTodos() {
                axios.get('api/Home/GetConfigurations')
                    .then((response) => {
                        this.listOfTodos = response.data;
                    }
                ); 
                this.loading = false
            },
            removeFromList(id) {
                generic.delete('Home/DeleteById', id)
                    .then(() => this.getAllTodos() );
            this.showRemoveDialog = false;
            },
            openRemoveDialogModal(id) {
                this.showRemoveDialog = true;
                this.removeTodoId = id;  
            },
            markAsDone(todo) {
                generic.update('Home/MarkAsDone', todo)
                .then(() => this.getAllTodos());
            },
        },
        computed: {
            nextId() {  
                if (this.listOfTodos.length - 1 > 0) {
                    return this.listOfTodos[this.listOfTodos.length - 1].id + 1;

                } else {
                    return 1
                }
            },
            ...mapState({
                title: state => state.title,
                cart: state => state.cart,
                isUserLoggedIn: state => state.login.isUserLoggedIn,
                
            })
        },
        mounted() {
          this.getAllTodos();
          this.checkIfUserIsLoggedIn();
        }
    }
    
</script>

<style scoped>
    .LF {
        background-color:black;
        color:white;
    }

    .HF {
        background-color: orange;
        color: white;
    }
</style>
